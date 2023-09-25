import { fail } from "@sveltejs/kit";
import fs from "fs";
import { ocr } from "$lib/ocr";

export const actions = {
  default: async ({ request }) => {
    const data = await request.formData();
    const { fileToUpload } = Object.fromEntries(data);
    const path = `static/uploads/${fileToUpload.name}`;

    try {
      const buffer = await fileToUpload.arrayBuffer();
      fs.writeFileSync(path, Buffer.from(buffer));

      const text = await ocr(path);

      fs.unlinkSync(path);

      return {
        message: text,
      };
    } catch (e) {
      return fail(e);
    }
  },
};
