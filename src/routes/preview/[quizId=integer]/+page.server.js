import { error } from "@sveltejs/kit";

// get quiz id from params, url is /preview/[quizId]/+page
export const load = async ({ locals, params }) => {
  const { data } = await locals.supabase.from("quizzes").select("*").eq("id", params.quizId).single();

  if (!data) {
    throw error(500, {
      message: "No quiz exists on this page",
      hint: "Try a different ID",
    });
  }

  return { quiz: data };
};
