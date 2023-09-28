import { fail } from "@sveltejs/kit";
import fs from "fs";

import { ocr } from "$lib/ocr";
import { getQuestions } from "$lib/chatbot";

export const actions = {
  default: async ({ request }) => {
    const data = await request.formData();
    const { fileToUpload } = Object.fromEntries(data);
    const path = `static/uploads/${fileToUpload.name}`;

    try {
      // write file to disk
      const buffer = await fileToUpload.arrayBuffer();
      fs.writeFileSync(path, Buffer.from(buffer));

      // extract text from image
      const text = await ocr(path);

      // delete file
      fs.unlinkSync(path);

      // create questions from text
      const questions = await getQuestions(text);
      console.log(questions);
      return { body: questions };
    } catch (e) {
      return fail(e);
    }
  },
};
