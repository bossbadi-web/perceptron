import { fail, redirect } from "@sveltejs/kit";
import { ocrSpace } from "ocr-space-api-wrapper";

import { getQuestions } from "$lib/chatbot";
import { LIMITS } from "$lib/consts";
import { OCR_API_KEY } from "$env/static/private";

const createQuiz = async ({ request, locals }) => {
  const formData = await request.formData();
  const { title, description, fileToUpload } = Object.fromEntries(formData);

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

  const session = await locals.getSession();

  const base64 = new Buffer.from(await fileToUpload.arrayBuffer()).toString("base64");
  const ocrData = await ocrSpace(`data:image/png;base64,${base64}`, { apiKey: OCR_API_KEY, language: "ita" });

  const text = ocrData?.ParsedResults[0]?.ParsedText;
  console.log(text);
  if (!text) {
    return fail(400, {
      message: "No text found in the image.",
    });
  }

  const questions = await getQuestions(text);
  console.log(questions);

  // const questions = [
  //   {
  //     question: "Who is known for his work in classical conditioning?",
  //     options: ["David Myers", "Socrates", "Ivan Pavlov", "William James"],
  //     answer: "Ivan Pavlov",
  //   },
  //   {
  //     question: "Who is known for his work in behaviorism and the Little Albert experiment?",
  //     options: ["John Locke", "B.F. Skinner", "Carl Rogers", "John Watson"],
  //     answer: "John Watson",
  //   },
  //   {
  //     question: "Who is known for his work in humanistic psychology and the concept of self-actualization?",
  //     options: ["Abraham Maslow", "Wilhelm Wundt", "Edward Titchener", "Margaret Washburn"],
  //     answer: "Abraham Maslow",
  //   },
  //   {
  //     question:
  //       "Which perspective in psychology focuses on the biological and neurological processes that underlie behavior?",
  //     options: ["Humanistic Perspective", "Behavioral P.", "Biological/Neuroscience P.", "Cognitive P."],
  //     answer: "Biological/Neuroscience P.",
  //   },
  //   {
  //     question: "Which perspective in psychology focuses on the unconscious and early childhood experiences?",
  //     options: ["Psychodynamic P.", "Social-Cultural P.", "Evolutionary P.", "Counseling Psychology"],
  //     answer: "Psychodynamic P.",
  //   },
  // ];

  const { data, error: err } = await locals.supabase
    .from("quizzes")
    .insert([
      {
        owner: session.user.id,
        data: questions,
        title,
        description,
      },
    ])
    .select();

  console.log("data", data);
  console.log("err", err);

  return { data, err };
};

export const actions = {
  play: async ({ request, locals }) => {
    const { data, err, inputError } = await createQuiz({ request, locals });

    if (inputError) {
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
    const { data, err } = await createQuiz({ request, locals });

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
    const { data, err } = await createQuiz({ request, locals });

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
