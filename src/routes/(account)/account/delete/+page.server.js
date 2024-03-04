import { AuthApiError } from "@supabase/supabase-js";
import { redirect } from "sveltekit-flash-message/server";

export const actions = {
  default: async ({ cookies, request, locals, url }) => {
    const formData = await request.formData();

    // check password
    const password = formData.get("password");
    const { data: passwordCorrect } = await locals.supabase.rpc("right_password", { password });
    if (!passwordCorrect) {
      throw redirect(303, url.pathname, { type: "danger", message: "Wrong password." }, cookies);
    }

    // check delete confirmation
    const deleteConfirm = formData.get("deleteConfirm");
    if (deleteConfirm.toLowerCase() !== "delete my account") {
      throw redirect(
        303,
        url.pathname,
        { type: "danger", message: 'Please type "delete my account" to confirm.' },
        cookies
      );
    }

    // delete account
    const { error: err } = await locals.supabase.rpc("delete_account");

    if (err) {
      if (err instanceof AuthApiError) {
        throw redirect(303, url.pathname, { type: "danger", message: err.message }, cookies);
      }
      throw redirect(303, url.pathname, { type: "danger", message: "Internal Server Error." }, cookies);
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
