import Tesseract from "tesseract.js";

export const ocr = async (buffer) => {
  const {
    data: { text },
  } = await Tesseract.recognize(buffer, "eng", { logger: (m) => console.log(m) });

  return text;
};
