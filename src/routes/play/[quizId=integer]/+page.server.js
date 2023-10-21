import { error } from "@sveltejs/kit";

// get quiz id from params, url is /play/[quizId]/+page
export const load = async ({ locals, params }) => {
  const { data } = await locals.supabase.from("quizzes").select("*").eq("id", params.quizId).single();

  if (!data) {
    throw error(500, {
      message: "No quiz exists on this page",
      hint: "Try a different ID",
    });
  }

  // randomize the order of the questions
  data.data = data.data.sort(() => Math.random() - 0.5);

  return { quiz: data };
};
