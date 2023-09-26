// read fmt.json from lib/

import fs from "fs";
import { base } from "$app/paths";

text = fs.readFileSync(`${base}/lib/fmt.json`, "utf8");
console.log(text);

// export const MCQ_QUERY = 'create multiple choice questions and answers based on these notes in this json format:

export const chatbot = async (text) => {
  const response = await fetch(`https://api.gopubby.com/chatbot?text=${encodeURIComponent(text)}`);
  return await response.text();
};

export const getQuestions = async (text) => {
  const query = `create multiple choice questions and answers based on these notes:\n\n${text}`;
  return await chatbot(query);
};
