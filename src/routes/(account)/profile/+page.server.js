import { getRedirectLoginParams } from "$lib/utils";
import { redirect } from "sveltekit-flash-message/server";

export const load = async ({ cookies, locals, url }) => {
  const session = await locals.getSession();

  if (!session) {
    throw redirect(...getRedirectLoginParams({ cookies, url }));
  }

  return {
    username: session.user.username,
    email: session.user.email,
    id: session.user.id,
    theme: session.user.theme,
    font: session.user.font,
  };
};
