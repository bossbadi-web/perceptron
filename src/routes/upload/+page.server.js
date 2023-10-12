import { fail, redirect } from "@sveltejs/kit";
import fs from "fs";

import { ocr } from "$lib/ocr";
import { getQuestions } from "$lib/chatbot";

export const actions = {
  default: async ({ request, locals }) => {
    const session = await locals.getSession();

    // const data = await request.formData();
    // const { fileToUpload } = Object.fromEntries(data);
    // // const path = `uploads/${fileToUpload.name}`;

    // // try {
    // const buffer = Buffer.from(await fileToUpload.arrayBuffer());
    // // fs.writeFileSync(path, buffer);

    // // extract text from image
    // const text = await ocr(buffer);
    // console.log(text);
    // // fs.unlinkSync(path);

    // // create questions from text
    // const questions = await getQuestions(text);
    // console.log(questions);
    const questions = [
      {
        question: "Who is known for his work in classical conditioning?",
        options: ["David Myers", "Socrates", "Ivan Pavlov", "William James"],
        answer: "Ivan Pavlov",
      },
      {
        question: "Who is known for his work in behaviorism and the Little Albert experiment?",
        options: ["John Locke", "B.F. Skinner", "Carl Rogers", "John Watson"],
        answer: "John Watson",
      },
      {
        question: "Who is known for his work in humanistic psychology and the concept of self-actualization?",
        options: ["Abraham Maslow", "Wilhelm Wundt", "Edward Titchener", "Margaret Washburn"],
        answer: "Abraham Maslow",
      },
      {
        question:
          "Which perspective in psychology focuses on the biological and neurological processes that underlie behavior?",
        options: ["Humanistic Perspective", "Behavioral P.", "Biological/Neuroscience P.", "Cognitive P."],
        answer: "Biological/Neuroscience P.",
      },
      {
        question: "Which perspective in psychology focuses on the unconscious and early childhood experiences?",
        options: ["Psychodynamic P.", "Social-Cultural P.", "Evolutionary P.", "Counseling Psychology"],
        answer: "Psychodynamic P.",
      },
    ];

    console.log(session.user);

    // create new row un quizzes table
    // put questions in 'data' column
    // foreign key is the user's id under 'owner' column
    // get back the id of the new quiz
    const { data, error: err } = await locals.supabase
      .from("quizzes")
      .insert([
        {
          owner: session.user.id,
          data: questions,
        },
      ])
      .select();

    console.log("data", data);
    console.log("err", err);

    if (!data || err) {
      return fail(500, {
        message: "Server error. Please try again later.",
      });
    }

    throw redirect(303, `/edit/${data[0].id}`);
  },
};

export const load = async ({ cookies, locals, url }) => {
  const { error: err } = await locals.supabase.auth.getUser(cookies.get("access_token"));

  if (err) {
    throw redirect(303, `/login?redirectTo=${url.pathname}`);
  }
};
