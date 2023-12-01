// delete account page

import { AuthApiError } from "@supabase/supabase-js";
import { fail, redirect } from "@sveltejs/kit";

export const actions = {
  default: async ({ cookies, request, locals }) => {
    const formData = await request.formData();
    const password = formData.get("password");
    const deleteConfirm = formData.get("deleteConfirm");

    // check password
    const session = await locals.getSession();
    const email = session.user.email;
    const { data, error: loginErr } = await locals.supabase.auth.signInWithPassword({ email, password });
    cookies.set("access_token", data.session.access_token, { maxAge: 604800 });

    if (loginErr) {
      if (loginErr instanceof AuthApiError && loginErr.status === 400) {
        return fail(400, {
          message: "Invalid password.",
        });
      }
      return fail(500, {
        message: "Server error. Please try again later.",
      });
    }

    // check delete confirmation
    if (deleteConfirm.toLowerCase() !== "delete my account") {
      return fail(400, { message: 'Please type "delete my account" to confirm.' });
    }

    // sign out
    cookies.delete("access_token", { path: "/" });
    await locals.supabase.auth.signOut();

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

    throw redirect(303, "/?message=Account deleted.");
  },
};

// check if user is logged in
export const load = async ({ locals, url }) => {
  if (!(await locals.getSession())) {
    throw redirect(303, `/login?redirectTo=${url.pathname}`);
  }
};
