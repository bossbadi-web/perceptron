const MCQ_FORMAT = `
1. The question
0) Option
1) Option
2) Option
3) Option
Answer: 3

2. The question
0) Option
1) Option
2) Option
3) Option
Answer: 2
`;

const MCQ_QUERY_PRE = `create multiple choice questions and answers

use this format:
${MCQ_FORMAT}

NOTES:
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

  try {
    const question_chunks = text.split("\n\n");
    for (let i = 0; i < question_chunks.length; i++) {
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
    }
  } catch (e) {}

  return output;
};

const chatbot = async (query) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 20000);

  try {
    const response = await fetch(`https://api.gopubby.com/chatbot?text=${encodeURIComponent(query)}`, {
      signal: controller.signal,
    });
    const text = await response.text();
    return toJSON(text);
  } catch (err) {
    return [];
  }
};

export const getQuestions = async (text) => {
  return await chatbot(MCQ_QUERY_PRE + text);
};
