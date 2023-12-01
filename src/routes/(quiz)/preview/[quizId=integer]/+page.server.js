import { error, redirect } from "@sveltejs/kit";

// get quiz id from params, url is /preview/[quizId]/+page
export const load = async ({ locals, params, url }) => {
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
      throw redirect(303, `/login?redirectTo=${url.pathname}`);
    }

    if (data.owner !== session.user.id) {
      throw error(403, {
        message: "Unauthorized",
        hint: "You are not the owner of this quiz",
      });
    }
  }

  return { quiz: data };
};
