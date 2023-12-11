import { redirect } from "@sveltejs/kit";

export const load = async ({ locals, url }) => {
  const session = await locals.getSession();

  if (!session) {
    throw redirect(303, `/login?redirectTo=${url.pathname}`);
  }
  console.log(session);
  return {
    username: session.user.username,
    email: session.user.email,
    id: session.user.id,
  };
};
