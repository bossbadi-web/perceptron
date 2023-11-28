// forgot password page

import { AuthApiError } from "@supabase/supabase-js";
import { fail } from "@sveltejs/kit";

export const actions = {
  default: async ({ request, locals, url }) => {
    const formData = await request.formData();
    const email = formData.get("email");

    const { error: err } = await locals.supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${url.origin}/auth/callback?next=/password/update`,
    });

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

    return { status: 200, message: "Check your email." };
  },
};
