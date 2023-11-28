// update password page

import { AuthApiError } from "@supabase/supabase-js";
import { fail, redirect } from "@sveltejs/kit";

export const actions = {
  default: async ({ request, locals }) => {
    const formData = await request.formData();
    const password = formData.get("password");
    const passwordConfirm = formData.get("passwordConfirm");

    if (password !== passwordConfirm) {
      return fail(400, { message: "Passwords do not match." });
    }

    const { error: err } = await locals.supabase.auth.updateUser({ password });

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

    return { status: 200, message: "Password updated." };
  },
};

export const load = async ({ cookies, locals, url }) => {
  const { error: err } = await locals.supabase.auth.getUser(cookies.get("access_token"));

  if (err) {
    throw redirect(303, `/login?redirectTo=${url.pathname}`);
  }
};
