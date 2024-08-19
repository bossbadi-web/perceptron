const API = "https://api.gopubby.com/chatbot?text=";

const get_mcq_query_pre = (
  count
) => `In English, create ${count} different multiple choice questions in this json format. The answer should be the 0-based index of the correct option. For example:

[
  {
    "question": "question 1",
    "options": ["A", "B", "C", "D"],
    "answer": 2
  },
  {
    "question": "question 2",
    "options": ["A", "B", "C", "D"],
    "answer": 0
  }
]
`;

const toJSON = (text) => {
  try {
    const start = text.indexOf("[");
    const end = text.lastIndexOf("]");
    const jsonPart = text.substring(start, end + 1);
    return JSON.parse(jsonPart);
  } catch (err) {
    return [];
  }
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

export const getQuestions = async (text, count) => {
  return await chatbot(get_mcq_query_pre(count) + text);
};
