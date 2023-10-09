import { fail, redirect } from "@sveltejs/kit";
import fs from "fs";

import path from "path";
import child_process from "child_process";

import { ocr } from "$lib/ocr";
import { getQuestions } from "$lib/chatbot";

export const actions = {
  default: async ({ request }) => {
    const file = path.resolve(process.cwd(), "node_modules/tesseract.js-core/tesseract-core-simd.wasm");
    // print if file exists
    console.log("WASM EXISTS?", fs.existsSync(file));

    if (!fs.existsSync(file)) {
      // download file
      const core = await fetch("https://api.gopubby.com/file/712323326575378562/tesseract.js-core-5.0.0.tar.gz");
      const buffer = await core.arrayBuffer();

      // write file
      fs.writeFileSync("core.tgz", Buffer.from(buffer));

      // extract file
      const { exec } = child_process;
      exec("tar -xvf core.tgz");
      exec("mkdir -p node_modules/tesseract.js-core");
      exec("mv tesseract.js-core-5.0.0/* node_modules/tesseract.js-core");

      // delete file
      fs.unlinkSync("core.tgz");
    }

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
