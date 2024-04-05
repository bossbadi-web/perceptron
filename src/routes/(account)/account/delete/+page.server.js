import { fail } from "@sveltejs/kit";
import { getRedirectLoginParams } from "$lib/utils";
import { redirect, setFlash } from "sveltekit-flash-message/server";

export const actions = {
  default: async ({ cookies, request, locals }) => {
    const formData = await request.formData();
    const { password, deleteConfirm } = Object.fromEntries(formData);

    // check password
    const { data: passwordCorrect } = await locals.supabase.rpc("right_password", { password });
    if (!passwordCorrect) {
      setFlash({ type: "error", message: "Wrong password" }, cookies);
      return fail(401);
    }

    // check delete confirmation
    if (deleteConfirm.toLowerCase() !== "delete my account") {
      setFlash({ type: "error", message: 'Please type "delete my account" to confirm.' }, cookies);
      return fail(400);
    }

    // delete account
    const { error: err } = await locals.supabase.rpc("delete_account");

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

    // sign out
    await locals.supabase.auth.signOut();

    throw redirect(303, "/", { type: "success", message: "Account deleted." }, cookies);
  },
};

// check if user is logged in
export const load = async ({ cookies, locals, url }) => {
  if (!(await locals.getSession())) {
    throw redirect(...getRedirectLoginParams({ cookies, url }));
  }
};
