import { createWorker } from "tesseract.js";
import {} from "tesseract.js-core";

export const ocr = async (buffer) => {
  console.log(buffer);
  const worker = await createWorker("eng");
  const {
    data: { text },
  } = await worker.recognize(buffer);

  await worker.terminate();

  return text;
};

// import Tesseract from "tesseract.js";

// export const ocr = async (path) => {
//   const {
//     data: { text },
//   } = await Tesseract.recognize(path, "eng", { logger: (m) => console.log(m) });

//   return text;
// };
