const API = "https://api.gopubby.com/chatbot?text=";

const MCQ_QUERY_PRE = `Create 20 different multiple choice questions in this format. Do not use markdown or any other formatting. The questions should be separated by two newlines. The options should be separated by newlines. The correct answer should be specified at the end of each question. For example:

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
    const response = await fetch(API + encodeURIComponent(query));
    const text = await response.text();
    return toJSON(text);
  } catch (err) {
    return [];
  }
};

export const getQuestions = async (text) => {
  return await chatbot(MCQ_QUERY_PRE + text);
};
