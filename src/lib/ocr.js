import { createWorker } from 'tesseract.js';

export const ocr = async (buffer) => {
  console.log(buffer);
  const worker = await createWorker("eng");
  // const {
  //   data: { text },
  // } = await worker.recognize(buffer);
  // above doesn't work Error: TypeError: Cannot read properties of null (reading 'SetImageFile')

  await worker.load();
  await worker.loadLanguage("eng");
  await worker.initialize("eng");
  const {
    data: { text },
  } = await worker.recognize(buffer);

  await worker.terminate();

  return text;
};
