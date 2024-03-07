import { fail } from "@sveltejs/kit";
import { redirect, setFlash } from "sveltekit-flash-message/server";

export const actions = {
  default: async ({ cookies, request, locals }) => {
    const formData = await request.formData();

    // check password
    const password = formData.get("password");
    const { data: passwordCorrect } = await locals.supabase.rpc("right_password", { password });
    if (!passwordCorrect) {
      setFlash({ type: "danger", message: "Wrong password" }, cookies);
      return fail(401);
    }

    // check delete confirmation
    const deleteConfirm = formData.get("deleteConfirm");
    if (deleteConfirm.toLowerCase() !== "delete my account") {
      setFlash({ type: "danger", message: 'Please type "delete my account" to confirm.' }, cookies);
      return fail(400);
    }

    // delete account
    const { error: err } = await locals.supabase.rpc("delete_account");

    if (err) {
      setFlash(
        {
          type: "danger",
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
export const load = async ({ locals, url }) => {
  if (!(await locals.getSession())) {
    throw redirect(303, `/login?redirectTo=${url.pathname}`);
  }
};
