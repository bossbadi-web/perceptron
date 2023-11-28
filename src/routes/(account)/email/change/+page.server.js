// update email page

import { AuthApiError } from "@supabase/supabase-js";
import { fail, redirect } from "@sveltejs/kit";

export const actions = {
  default: async ({ request, locals }) => {
    const formData = await request.formData();
    const email = formData.get("email");
    const emailConfirm = formData.get("emailConfirm");

    if (email !== emailConfirm) {
      return fail(400, { message: "Emails do not match." });
    }

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

export const load = async ({ cookies, locals, url }) => {
  const { error: err } = await locals.supabase.auth.getUser(cookies.get("access_token"));

  if (err) {
    throw redirect(303, `/login?redirectTo=${url.pathname}`);
  }
};
