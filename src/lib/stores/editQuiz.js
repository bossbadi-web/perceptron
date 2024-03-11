import { writable } from "svelte/store";

export const edited = writable(false);

export const createEditQuizStore = (initialValue = {}) => {
  const { subscribe, set, update } = writable(initialValue);

  const myUpdate = (fn) => {
    update((prev) => {
      edited.set(true);
      return fn(prev);
    });
  };

  const mySet = (value) => {
    set(value);
    edited.set(true);
  };

  const insertQuestion = (index) => {
    myUpdate((prev) => {
      return {
        ...prev,
        data: [
          ...prev.data.slice(0, index + 1),
          {
            question: "",
            options: ["", "", "", ""],
            answer: "",
          },
          ...prev.data.slice(index + 1),
        ],
      };
    });
  };

  const deleteQuestion = (index) => {
    myUpdate((prev) => {
      return {
        ...prev,
        data: [...prev.data.slice(0, index), ...prev.data.slice(index + 1)],
      };
    });
  };

  return { subscribe, set: mySet, insertQuestion, deleteQuestion };
};
