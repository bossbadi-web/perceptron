import Tesseract from "tesseract.js";

export const ocr = async (path) => {
  const {
    data: { text },
  } = await Tesseract.recognize(path, "eng", { logger: (m) => console.log(m) });

  return text;
};
