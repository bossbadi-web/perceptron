import { writable } from "svelte/store";

export const createEditQuizStore = (initialValue = []) => {
  const { subscribe, set, update } = writable(initialValue);

  const EMPTY_QUESTION = {
    question: "",
    options: ["", "", "", ""],
    answer: "",
  };

  const insertQuestion = (index) => {
    update((prev) => {
      return [...prev.slice(0, index + 1), EMPTY_QUESTION, ...prev.slice(index + 1)];
    });
  };

  const deleteQuestion = (index) => {
    update((prev) => {
      return [...prev.slice(0, index), ...prev.slice(index + 1)];
    });
  };

  return { subscribe, set, insertQuestion, deleteQuestion };
};
