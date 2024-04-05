import { cleanQuiz } from "$lib/utils";
import { error } from "@sveltejs/kit";
import { getRedirectLoginParams } from "$lib/utils";
import { redirect } from "sveltekit-flash-message/server";

// get quiz id from params, url is /preview/[quizId]/+page
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

  const { data: dataOwner } = await locals.supabase.from("profiles").select("username").eq("id", data.owner).single();

  return {
    quiz: cleanQuiz({ ...data, username: dataOwner?.username }),
  };
};
