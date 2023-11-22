import OpenAI from "openai";
import { OPENAI_URL, OPENAI_KEY } from "$env/static/private";

// create openai client
const openai = new OpenAI({
  baseURL: OPENAI_URL,
  apiKey: OPENAI_KEY,
});

const MCQ_QUERY_PRE = `create multiple choice questions using this format:

1. a question
0) an option
1) an option
2) an option
3) an option
Answer: 0

2. a question
0) an option
1) an option
2) an option
3) an option
Answer: 1

and so on...
`;

const toJSON = (text) => {
  // to

  // [
  //   {
  //     "question": "The question",
  //     "options": ["A", "B", "C", "D"],
  //     "answer": 2  // index of the correct option
  //   }
  // ]
  let output = [];

  const question_chunks = text.split("\n\n");
  for (let i = 0; i < question_chunks.length; i++) {
    try {
      const question_chunk = question_chunks[i];
      const lines = question_chunk.split("\n");
      const question = lines[0].replace(/^\d+\. /, "");
      const options = lines.slice(1, 5).map((line) => line.replace(/^\w\) /, ""));
      const answer = Number(lines[5].replace(/^Answer: /, ""));
      output.push({
        question,
        options,
        answer,
      });
    } catch (err) {}
  }

  return output;
};

const chatbot = async (query) => {
  try {
    const chatCompletion = await openai.chat.completions.create({
      messages: [{ role: "user", content: query }],
      model: "gpt-3.5-turbo",
    });
    return toJSON(chatCompletion.choices[0].message.content);
  } catch (err) {
    return [];
  }
};

export const getQuestions = async (text) => {
  return await chatbot(MCQ_QUERY_PRE + text);
};
