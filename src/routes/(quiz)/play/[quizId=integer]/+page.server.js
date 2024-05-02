import { cleanQuiz } from "$lib/utils";
import { error } from "@sveltejs/kit";
import { getRedirectLoginParams } from "$lib/utils";
import { redirect } from "sveltekit-flash-message/server";

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
    const session = await locals.getSession();

    if (!session) {
      throw redirect(...getRedirectLoginParams({ cookies, url }));
    }

    if (data.owner !== session.user.id) {
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

  // get last score
  const session = await locals.getSession();
  if (session) {
    var { data: dataScore } = await locals.supabase
      .from("scores")
      .select("question_count, questions_wrong, time_taken, finished_at")
      .eq("player_id", session.user.id)
      .eq("quiz_id", params.quizId)
      .single();
  } else {
    var dataScore = null;
  }

  // get owner username
  const { data: dataOwner } = await locals.supabase.from("profiles").select("username").eq("id", data.owner).single();

  return {
    quiz: cleanQuiz({ ...data, username: dataOwner?.username }),
    lastScore: dataScore,
  };
};
