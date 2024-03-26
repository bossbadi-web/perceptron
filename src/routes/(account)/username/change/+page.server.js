import { fail } from "@sveltejs/kit";
import { LIMITS } from "$lib/consts";
import { redirect, setFlash } from "sveltekit-flash-message/server";

export const actions = {
  default: async ({ cookies, request, locals }) => {
    const formData = await request.formData();
    const { password, username } = Object.fromEntries(formData.entries());

    // check password
    const { data: passwordCorrect } = await locals.supabase.rpc("right_password", { password });
    if (!passwordCorrect) {
      setFlash({ type: "error", message: "Wrong password" }, cookies);
      return fail(401);
    }

    // check username
    if (!username) {
      setFlash({ type: "error", message: "A username is required." }, cookies);
      return fail(400);
    }
    if (username.length > LIMITS.username) {
      setFlash({ type: "error", message: `Username must be less than ${LIMITS.username} characters.` }, cookies);
      return fail(400);
    }

    const session = await locals.getSession();
    const { error: err } = await locals.supabase.from("profiles").update({ username }).eq("id", session.user.id);

    if (err) {
      setFlash(
        {
          type: "error",
          message: err.__isAuthError ? err.message : "Internal Server Error.",
        },
        cookies
      );
      return fail(err.status);
    }

    throw redirect(303, "/profile", { type: "success", message: "Username updated." }, cookies);
  },
};

// check if user is logged in
export const load = async ({ locals, url }) => {
  const session = await locals.getSession();

  if (!session) {
    throw redirect(303, `/login?redirectTo=${url.pathname}`);
  }

  return {
    username: session.user.username,
  };
};
