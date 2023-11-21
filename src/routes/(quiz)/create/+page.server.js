import { fail, redirect } from "@sveltejs/kit";
import Tesseract from "tesseract.js";

import { getQuestions } from "$lib/chatbot";
import { LIMITS } from "$lib/consts";

const createQuiz = async ({ request, locals }) => {
  const formData = await request.formData();
  const { title, description, fileToUpload, visibility, bg, notes } = Object.fromEntries(formData);

  // validate input
  if (title.length > LIMITS.title) {
    return { inputError: `Title must be less than ${LIMITS.title} characters.` };
  }
  if (description.length > LIMITS.description) {
    return { inputError: `Description must be less than ${LIMITS.description} characters.` };
  }
  if (fileToUpload.size > LIMITS.file) {
    return { inputError: `File must be less than ${LIMITS.file / 1024 / 1024} MB.` };
  }
  if (!LIMITS.visibilities.includes(visibility)) {
    return { inputError: "Invalid visibility." };
  }
  if (bg && !bg.match(LIMITS.bg)) {
    return { inputError: "Background image must be from Unsplash." };
  }
  if (notes && notes.length > LIMITS.notes) {
    return { inputError: `Notes must be less than ${LIMITS.notes} characters.` };
  }

  let questions = [];
  let text = "";

  // extract text from image
  if (fileToUpload.size > 0) {
    if (!LIMITS.filetypes.includes(fileToUpload.type.split("/")[1])) {
      return { inputError: "Unsupported file type." };
    }

    const base64 = new Buffer.from(await fileToUpload.arrayBuffer()).toString("base64");
    const base64URL = `data:image/png;base64,${base64}`;

    const { data } = await Tesseract.recognize(base64URL, "eng");
    const ocrText = data.text.trim();

    if (!ocrText) {
      return {
        inputError: "No text found in the image.",
      };
    }
    text += ocrText;
  }

  // add notes
  if (notes) {
    text += `\n\nNOTES:\n${notes}`;
  }

  // generate questions
  if (text) {
    questions = await getQuestions(text);
  }

  // save to db
  const session = await locals.getSession();
  const { data, error: err } = await locals.supabase
    .from("quizzes")
    .insert([
      {
        owner: session.user.id,
        data: questions,
        title,
        description,
        visibility,
        bg,
      },
    ])
    .select();

  return { data, err };
};

export const actions = {
  play: async ({ request, locals }) => {
    const { data, err, inputError } = await createQuiz({ request, locals });

    if (inputError) {
      console.log(inputError);
      return fail(400, { message: inputError });
    }

    if (!data || err) {
      return fail(500, {
        message: "Server error. Please try again later.",
      });
    }

    throw redirect(303, `/play/${data[0].id}`);
  },
  preview: async ({ request, locals }) => {
    const { data, err, inputError } = await createQuiz({ request, locals });

    if (inputError) {
      return fail(400, { message: inputError });
    }

    if (!data || err) {
      return fail(500, {
        message: "Server error. Please try again later.",
      });
    }

    throw redirect(303, `/preview/${data[0].id}`);
  },
  edit: async ({ request, locals }) => {
    const { data, err, inputError } = await createQuiz({ request, locals });

    if (inputError) {
      return fail(400, { message: inputError });
    }

    if (!data || err) {
      return fail(500, {
        message: "Server error. Please try again later.",
      });
    }

    throw redirect(303, `/edit/${data[0].id}`);
  },
};

export const load = async ({ cookies, locals, url }) => {
  const { error: err } = await locals.supabase.auth.getUser(cookies.get("access_token"));

  if (err) {
    throw redirect(303, `/login?redirectTo=${url.pathname}`);
  }

  return { LIMITS };
};
