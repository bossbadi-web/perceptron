import { redirect } from "@sveltejs/kit";

export const load = async ({ cookies, locals, url }) => {
  const { error: err } = await locals.supabase.auth.getUser(cookies.get("access_token"));

  if (err) {
    throw redirect(303, `/login?redirectTo=${url.pathname}`);
  }

  const session = await locals.getSession();

  return {
    email: session.user.email,
    id: session.user.id,
  };
};
