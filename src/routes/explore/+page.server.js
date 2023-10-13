import { error } from "@sveltejs/kit";

// get all quizzes
export const load = async ({ locals }) => {
  const { data: quizzes } = await locals.supabase.from("quizzes").select("*");
  console.log(quizzes);
  if (!quizzes) {
    throw error(500, {
      message: "That didn't work",
      hint: "Try again later",
    });
  }

  return { quizzes };
};
