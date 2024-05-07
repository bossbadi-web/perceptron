import { redirect } from "sveltekit-flash-message/server";

export const POST = async ({ cookies, locals }) => {
  let redirectUrl = "/";

  const { error: err } = await locals.supabase.auth.signOut();

  if (err) {
    redirectUrl = "/?signOut";
  }

  throw redirect(303, redirectUrl, { type: "success", message: "Logged out of all devices." }, cookies);
};
