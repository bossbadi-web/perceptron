// import { createWorker } from "tesseract.js";

// export const ocr = async (buffer) => {
//   console.log(buffer);
//   const worker = await createWorker();

//   await worker.loadLanguage("eng");
//   await worker.initialize();
//   const {
//     data: { text },
//   } = await worker.recognize(buffer);

//   await worker.terminate();

//   return text;
// };

import Tesseract from "tesseract.js";

export const ocr = async (path) => {
  const {
    data: { text },
  } = await Tesseract.recognize(path, "eng", { logger: (m) => console.log(m) });

  return text;
};
