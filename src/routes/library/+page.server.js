// get quizzes for specific user

import { redirect } from "@sveltejs/kit";

export const load = async ({ cookies, locals, url }) => {
  const { error: err } = await locals.supabase.auth.getUser(cookies.get("access_token"));

  if (err) {
    throw redirect(303, `/login?redirectTo=${url.pathname}`);
  }

  const session = await locals.getSession();

  const { data: quizzes } = await locals.supabase
    .from("quizzes")
    .select("*")
    .eq("owner", session.user.id)
    .order("created_at", { ascending: false });

  if (!quizzes) {
    throw error(500, {
      message: "That didn't work",
      hint: "Try again later",
    });
  }

  return { quizzes };
};
