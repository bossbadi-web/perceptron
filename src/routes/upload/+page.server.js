import { fail } from "@sveltejs/kit";
import { writeFileSync } from "fs";

export const actions = {
  upload: async ({ request, cookies, url }) => {
    // get fileToUpload from request
    const data = await request.formData();
    console.log(data);
    const { fileToUpload } = Object.fromEntries(data);
    console.log(fileToUpload);
    const path = `static/uploads/${fileToUpload.name}`;
    console.log(path);

    // write file to disk
    // try {
    
    // write file to /static/uploads
    writeFileSync(path, fileToUpload.data);


    // } catch (error) {
      // return fail(400, error.message);
    // }

    // return file path
    return {
      body: {
        hi: "hi",
      },
    };
  },
};
