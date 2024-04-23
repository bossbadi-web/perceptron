import { fail } from "@sveltejs/kit";
import { getRedirectLoginParams } from "$lib/utils";
import { LIMITS } from "$lib/consts";
import { redirect, setFlash } from "sveltekit-flash-message/server";
import { verifyCapcha } from "$lib/recaptchaServer";

const validateJSON = async (file) => {
  let data;

  // check integrity of JSON
  try {
    data = JSON.parse(await file.text());
  } catch (e) {
    throw new Error("Invalid JSON.");
  }

  // check for required fields
  const REQUIRED_FIELDS = ["data", "title", "description", "visibility", "bg"];
  for (const field of REQUIRED_FIELDS) {
    if (!data[field] && data[field] !== "") {
      throw new Error(`Missing required field in JSON: "${field}"`);
    }
  }

  // check for extraneous fields
  for (const field in data) {
    if (!REQUIRED_FIELDS.includes(field)) {
      throw new Error(`Extraneous field in JSON: "${field}"`);
    }
  }

  // validate metadata
  if (data.title.length > LIMITS.title) {
    throw new Error(`Title must be less than ${LIMITS.title} characters.`);
  }
  if (data.description.length > LIMITS.description) {
    throw new Error(`Description must be less than ${LIMITS.description} characters.`);
  }
  if (!LIMITS.visibilities.includes(data.visibility)) {
    throw new Error("Invalid visibility.");
  }
  if (data.bg && !data.bg.match(LIMITS.bg)) {
    throw new Error("Background image must be from Unsplash.");
  }

  // validate quiz questions
  if (!Array.isArray(data.data)) {
    throw new Error('Questions ("data") must be an array.');
  }
  for (const [i, question] of data.data.entries()) {
    // question
    if (typeof question.question !== "string" || question.question.length > LIMITS.question) {
      throw new Error(`Question ${i + 1}: Question must be a string of no more than ${LIMITS.question} characters.`);
    }

    // answer
    if (typeof question.answer !== "number" || question.answer < 0 || question.answer > 3) {
      throw new Error(`Question ${i + 1}: Answer must be an index between 0 and 3.`);
    }

    // options
    if (!Array.isArray(question.options) || question.options.length !== 4) {
      throw new Error(`Question ${i + 1}: Options must be an array of 4 strings.`);
    }
    for (const [j, option] of question.options.entries()) {
      if (typeof option !== "string" || option.length > LIMITS.option) {
        throw new Error(
          `Question ${i + 1}: Option ${j + 1} must be a string of no more than ${LIMITS.option} characters.`
        );
      }
    }
  }

  return data;
};

const createQuiz = async ({ request, locals }) => {
  const formData = await request.formData();
  const { fileToUpload } = Object.fromEntries(formData);

  if (!fileToUpload) {
    return { inputError: "Please upload a save file." };
  }
  if (fileToUpload.size > LIMITS.file) {
    return { inputError: `File must be less than ${LIMITS.file / 1024 / 1024} MB.` };
  }

  let saveData;

  try {
    saveData = await validateJSON(fileToUpload);
  } catch (e) {
    return { inputError: e.message };
  }

  // save to db
  const session = await locals.getSession();
  const { data, error: err } = await locals.supabase
    .from("quizzes")
    .insert([
      {
        ...saveData,
        owner: session.user.id,
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

export const load = async ({ cookies, locals, url }) => {
  if (!(await locals.getSession())) {
    throw redirect(...getRedirectLoginParams({ cookies, url }));
  }
};
