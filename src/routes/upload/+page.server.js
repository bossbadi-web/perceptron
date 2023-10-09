import { fail, redirect } from "@sveltejs/kit";
import fs from "fs";

import { ocr } from "$lib/ocr";
import { getQuestions } from "$lib/chatbot";

export const actions = {
  default: async ({ request }) => {
    const data = await request.formData();
    const { fileToUpload } = Object.fromEntries(data);
    // const path = `uploads/${fileToUpload.name}`;

    try {
      const buffer = Buffer.from(await fileToUpload.arrayBuffer());
      // fs.writeFileSync(path, buffer);

      // extract text from image
      const text = await ocr(buffer);
      console.log(text);
      // fs.unlinkSync(path);

      // create questions from text
      const data = await getQuestions(text);
      console.log(data);

      // save questions to database, in table "quizzes" in column "data"

      return { body: data };
    } catch (e) {
      return fail(e);
    }
  },
};

export const load = async ({ cookies, locals, url }) => {
  const { error: err } = await locals.supabase.auth.getUser(cookies.get("access_token"));

  if (err) {
    throw redirect(303, `/login?redirectTo=${url.pathname}`);
  }
};
