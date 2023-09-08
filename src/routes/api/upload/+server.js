import { fail } from "@sveltejs/kit";
import { writeFileSync } from "fs";

export const POST = async (request) => {
  // write file to /static/uploads
  const data = Object.fromEntries(await request.formData());
  const path = `static/uploads/${data.name}`;
  
  // write file to disk
  try {
    await fstat.mkdir("static/uploads");
    await fstat.writeFile(path, data);
  } catch (error) {
    return fail(error);
  }

  // return file path
  return {
    body: {
      path,
    },
  };
};
