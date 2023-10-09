import { fail, redirect } from "@sveltejs/kit";
// import fs from "fs";

import path from 'path';

import { ocr } from "$lib/ocr";
import { getQuestions } from "$lib/chatbot";

export const actions = {
  default: async ({ request }) => {
    const file = path.resolve(process.cwd(), 'node_modules/tesseract.js-core/tesseract-core-simd.wasm');
    console.log('FILE', file);

    const data = await request.formData();
    const { fileToUpload } = Object.fromEntries(data);
    // const path = `uploads/${fileToUpload.name}`;

    // try {
    const buffer = Buffer.from(await fileToUpload.arrayBuffer());
    // fs.writeFileSync(path, buffer);

    // extract text from image
    const text = await ocr(buffer);
    console.log(text);
    // fs.unlinkSync(path);

    // create questions from text
    const questions = await getQuestions(text);
    console.log(questions);

    // save questions to database, in table "quizzes" in column "data"

    return { body: questions };
    // } catch (e) {
    //   return fail(e);
    // }
  },
};

export const load = async ({ cookies, locals, url }) => {
  const { error: err } = await locals.supabase.auth.getUser(cookies.get("access_token"));

  if (err) {
    throw redirect(303, `/login?redirectTo=${url.pathname}`);
  }
};
