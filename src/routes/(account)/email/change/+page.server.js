// update email page

import { AuthApiError } from "@supabase/supabase-js";
import { fail, redirect } from "@sveltejs/kit";

export const actions = {
  default: async ({ request, locals }) => {
    const formData = await request.formData();

    // check if password is correct
    const password = formData.get("password");
    const { data: passwordCorrect } = await locals.supabase.rpc("right_password", { password });
    if (!passwordCorrect) {
      return fail(400, { message: "Wrong password." });
    }

    // check if emails match
    const email = formData.get("email");
    const emailConfirm = formData.get("emailConfirm");
    if (email !== emailConfirm) {
      return fail(400, { message: "Emails do not match." });
    }

    // update email
    const { error: err } = await locals.supabase.auth.updateUser({ email });

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

    return { status: 200, message: "Check your new email for a confirmation link." };
  },
};

// check if user is logged in
export const load = async ({ locals, url }) => {
  const session = await locals.getSession();

  if (!session) {
    throw redirect(303, `/login?redirectTo=${url.pathname}`);
  }

  return {
    email: session.user.email,
  };
};
