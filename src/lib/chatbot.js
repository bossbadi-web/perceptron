import fs from "fs";
import path from "path";

const MCQ_FORMAT = fs.readFileSync(path.join(process.cwd(), "static", "mcqFormat.txt"), "utf8");
const MCQ_QUERY_PRE = `create multiple choice questions and answers

use this format:
${MCQ_FORMAT}

NOTES:
`;

const toJSON = (text) => {
  // 1. The question
  // A) Option A
  // B) Option B
  // C) Option C
  // D) Option D
  // Answer: C
  //
  // 2. The question
  // A) Option A
  // B) Option B
  // ...

  // to

  // [
  //   {
  //     "question": "The question",
  //     "options": ["A", "B", "C", "D"],
  //     "answer": "A"
  //   }
  // ]
  let output = [];

  const question_chunks = text.split("\n\n");
  for (let i = 0; i < question_chunks.length; i++) {
    const question_chunk = question_chunks[i];
    const lines = question_chunk.split("\n");
    const question = lines[0].replace(/^\d+\. /, "");
    const options = lines.slice(1, 5).map((line) => line.replace(/^\w\) /, ""));
    const answer = lines[5].replace(/^Answer: /, "");
    output.push({
      question,
      options,
      answer,
    });
  }
};

const chatbot = async (query) => {
  const response = await fetch(`https://api.gopubby.com/chatbot?text=${encodeURIComponent(query)}`);
  const text = await response.text();
  return toJSON(text);
};

export const getQuestions = async (text) => {
  return await chatbot(MCQ_QUERY_PRE + text);
};
