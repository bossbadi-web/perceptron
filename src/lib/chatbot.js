import fs from "fs";
import path from "path";

const MCQ_JSON_FORMAT = fs.readFileSync(path.join(process.cwd(), "static", "mcqFormat.json"), "utf8");
const MCQ_QUERY_PRE = `create multiple choice questions and answers

use this json format:
${MCQ_JSON_FORMAT}

NOTES:
`;

const chatbot = async (query) => {
  const response = await fetch(`https://api.gopubby.com/chatbot?text=${encodeURIComponent(query)}`);
  return await response.json();
};

export const getQuestions = async (text) => {
  return await chatbot(MCQ_QUERY_PRE + text);
};
