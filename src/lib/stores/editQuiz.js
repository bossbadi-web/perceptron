import { writable } from "svelte/store";

export const createEditQuizStore = (data) => {
  const questions = writable({ data });

  function insertNewQuestion() {
    console.log("hereeee");
    questions.update((qs) => {
      console.log(qs.data);
      qs.data.push({
        question: "Who is known for his work in classical conditioning?",
        options: ["David Myers", "Socrates", "Ivan Pavlov", "William James"],
        answer: "Ivan Pavlov",
      });

      return qs;
    });

    console.log(questions.data);
  }

  return { ...questions, insertNewQuestion };
};
