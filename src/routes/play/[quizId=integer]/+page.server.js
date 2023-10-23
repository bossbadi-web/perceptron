import { error, redirect } from "@sveltejs/kit";

// get quiz id from params, url is /play/[quizId]/+page
export const load = async ({ cookies, locals, params, url }) => {
  const { data } = await locals.supabase.from("quizzes").select("*").eq("id", params.quizId).single();

  if (!data) {
    throw error(500, {
      message: "No quiz exists on this page",
      hint: "Try a different ID",
    });
  }

  if (data.visibility === "private") {
    const { data: sessionData, error: err } = await locals.supabase.auth.getUser(cookies.get("access_token"));

    if (err) {
      throw redirect(303, `/login?redirectTo=${url.pathname}`);
    }

    if (data.owner !== sessionData.user.id) {
      throw error(403, {
        message: "Unauthorized",
        hint: "You are not the owner of this quiz",
      });
    }
  }

  // randomize the order of the questions
  data.data = data.data.sort(() => Math.random() - 0.5);

  // randomize the order of the options
  data.data.forEach((q) => {
    let correctAnswer = q.options[q.answer];
    q.options = q.options.sort(() => Math.random() - 0.5);
    q.answer = q.options.indexOf(correctAnswer);
  });

  return { quiz: data };
};
