// delete account page

import { AuthApiError } from "@supabase/supabase-js";
import { fail, redirect } from "@sveltejs/kit";

export const actions = {
  default: async ({ request, locals }) => {
    const formData = await request.formData();

    // check password
    const password = formData.get("password");
    const { data: passwordCorrect } = await locals.supabase.rpc("right_password", { password });
    if (!passwordCorrect) {
      return fail(400, { message: "Wrong password." });
    }

    // check delete confirmation
    const deleteConfirm = formData.get("deleteConfirm");
    if (deleteConfirm.toLowerCase() !== "delete my account") {
      return fail(400, { message: 'Please type "delete my account" to confirm.' });
    }

    // delete account
    const { error: err } = await locals.supabase.rpc("delete_account");

    if (err) {
      if (err instanceof AuthApiError) {
        return fail(400, {
          message: err.message,
        });
      }
      return fail(500, {
        message: "Server error. Please try again later.",
      });
    }

    // sign out
    await locals.supabase.auth.signOut();

    throw redirect(303, "/?message=Account deleted.");
  },
};

// check if user is logged in
export const load = async ({ locals, url }) => {
  if (!(await locals.getSession())) {
    throw redirect(303, `/login?redirectTo=${url.pathname}`);
  }
};
