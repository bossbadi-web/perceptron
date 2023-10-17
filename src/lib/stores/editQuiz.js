import { writable } from "svelte/store";

export const createEditQuizStore = (data) => {
  const { subscribe, set, update } = writable({
    data: data,
  });

  return { subscribe, set, update };
};

export const questionHandler = (store, index) => {
  console.log("here");
  // store.data.push({
  //   question: "bye",
  //   answer: "",
  //   options: [],
  // });

  // insert into index
  store.data.splice(index, 0, {
    question: "ez",
    answer: "",
    options: [],
  });
};
