// delete account page

import { AuthApiError } from "@supabase/supabase-js";
import { fail, redirect } from "@sveltejs/kit";

export const actions = {
  default: async ({ cookies, request, locals }) => {
    const formData = await request.formData();
    const deleteConfirm = formData.get("deleteConfirm");

    if (deleteConfirm.toLowerCase() !== "delete my account") {
      return fail(400, { message: 'Please type "delete my account" to confirm.' });
    }

    // sign out
    cookies.delete("access_token", { path: "/" });
    await locals.supabase.auth.signOut();

    // call stored procedure
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

    throw redirect(303, "/?message=Account deleted.");
  },
};

export const load = async ({ cookies, locals, url }) => {
  const { error: err } = await locals.supabase.auth.getUser(cookies.get("access_token"));

  if (err) {
    throw redirect(303, `/login?redirectTo=${url.pathname}`);
  }
};
