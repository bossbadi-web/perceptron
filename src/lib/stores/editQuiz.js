import { writable } from "svelte/store";

export const createEditQuizStore = (initialValue = []) => {
  const { subscribe, set, update } = writable(initialValue);

  const insertQuestion = (index) => {
    update((prev) => {
      return [
        ...prev.slice(0, index + 1),
        {
          question: "",
          options: ["", "", "", ""],
          answer: "",
        },
        ...prev.slice(index + 1),
      ];
    });
  };

  const deleteQuestion = (index) => {
    update((prev) => {
      return [...prev.slice(0, index), ...prev.slice(index + 1)];
    });
  };

  return { subscribe, set, insertQuestion, deleteQuestion };
};
