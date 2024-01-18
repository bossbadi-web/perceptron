import { error, redirect } from "@sveltejs/kit";

export const actions = {
  like: async ({ locals, request }) => {
    const session = await locals.getSession();

    if (!session) {
      throw error(403, {
        message: "Unauthorized",
        hint: "You must be logged in to like a quiz",
      });
    }

    const formData = await request.formData();
    const { quizId, referrer } = Object.fromEntries(formData);

    const { error: err } = await locals.supabase.rpc("like_quiz", {
      quiz_id: quizId,
      voter_id: session.user.id,
    });

    if (err) {
      throw error(500, {
        message: "Server error. Please try again later.",
      });
    }

    throw redirect(303, referrer || "/");
  },
  dislike: async ({ locals, request }) => {
    const session = await locals.getSession();

    if (!session) {
      throw error(403, {
        message: "Unauthorized",
        hint: "You must be logged in to dislike a quiz",
      });
    }

    const formData = await request.formData();
    const { quizId, referrer } = Object.fromEntries(formData);

    const { error: err } = await locals.supabase.rpc("dislike_quiz", {
      quiz_id: quizId,
      voter_id: session.user.id,
    });

    if (err) {
      throw error(500, {
        message: "Server error. Please try again later.",
      });
    }

    throw redirect(303, referrer || "/");
  },
};
