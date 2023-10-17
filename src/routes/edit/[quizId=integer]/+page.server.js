import { error, redirect } from "@sveltejs/kit";

// make actions that adds a new question between two existing questions

// get quiz id from params, url is /edit/[quizId]/+page
export const load = async ({ cookies, locals, params, url }) => {
  const { data: sessionData, error: err } = await locals.supabase.auth.getUser(cookies.get("access_token"));

  if (err) {
    throw redirect(303, `/login?redirectTo=${url.pathname}`);
  }

  const { data } = await locals.supabase.from("quizzes").select("*").eq("id", params.quizId).single();

  if (!data) {
    throw error(500, {
      message: "No quiz exists on this page",
      hint: "Try a different ID",
    });
  }

  if (data.owner !== sessionData.user.id) {
    throw error(403, {
      message: "Unauthorized",
      hint: "You are not the owner of this quiz",
    });
  }

  const questions = data.data || [];
  return { questions };
};
