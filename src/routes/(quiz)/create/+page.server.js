import { fail } from "@sveltejs/kit";
import { getQuestions } from "$lib/chatbot";
import { LIMITS } from "$lib/consts";
import { OCR_API_KEY } from "$env/static/private";
import { ocrSpace } from "ocr-space-api-wrapper";
import { redirect, setFlash } from "sveltekit-flash-message/server";
import { verifyCapcha } from "$lib/recaptchaServer";

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
    const ocrData = await ocrSpace(`data:image/png;base64,${base64}`, { apiKey: OCR_API_KEY, language: "ita" });

    const ocrText = ocrData?.ParsedResults[0]?.ParsedText;
    if (!ocrText) {
      return {
        inputError: "No text found in the image.",
      };
    }
    text += ocrText;
  }

  // add notes
  if (notes) {
    text += `\n\n${notes}`;
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
  play: async ({ cookies, request, locals }) => {
    const { status, message } = await verifyCapcha(cookies);
    if (status !== 200) {
      return { status, message };
    }

    const { data, err, inputError } = await createQuiz({ request, locals });

    if (inputError) {
      setFlash({ type: "error", message: inputError }, cookies);
      return fail(400);
    }
    if (!data || err) {
      setFlash({ type: "error", message: "Internal Server Error." }, cookies);
      return fail(500);
    }

    throw redirect(303, `/play/${data[0].id}`);
  },
  preview: async ({ cookies, request, locals }) => {
    const { status, message } = await verifyCapcha(cookies);
    if (status !== 200) {
      return { status, message };
    }

    const { data, err, inputError } = await createQuiz({ request, locals });

    if (inputError) {
      setFlash({ type: "error", message: inputError }, cookies);
      return fail(400);
    }
    if (!data || err) {
      setFlash({ type: "error", message: "Internal Server Error." }, cookies);
      return fail(500);
    }

    throw redirect(303, `/preview/${data[0].id}`);
  },
  edit: async ({ cookies, request, locals }) => {
    const { status, message } = await verifyCapcha(cookies);
    if (status !== 200) {
      return { status, message };
    }

    const { data, err, inputError } = await createQuiz({ request, locals });

    if (inputError) {
      setFlash({ type: "error", message: inputError }, cookies);
      return fail(400);
    }
    if (!data || err) {
      setFlash({ type: "error", message: "Internal Server Error." }, cookies);
      return fail(500);
    }

    throw redirect(303, `/edit/${data[0].id}`);
  },
};

export const load = async ({ locals, url }) => {
  if (!(await locals.getSession())) {
    throw redirect(303, `/login?redirectTo=${url.pathname}`);
  }

  return { LIMITS };
};
