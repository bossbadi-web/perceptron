import { AuthApiError } from "@supabase/supabase-js";
import { redirect } from "sveltekit-flash-message/server";

export const actions = {
  default: async ({ cookies, request, locals, url }) => {
    const formData = await request.formData();
    const email = formData.get("email");

    const { error: err } = await locals.supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${url.origin}/auth/callback?next=/password/change`,
    });

    if (err) {
      if (err instanceof AuthApiError) {
        throw redirect(303, url.pathname, { type: "danger", message: err.message }, cookies);
      }
      throw redirect(303, url.pathname, { type: "danger", message: "Internal Server Error." }, cookies);
    }

    throw redirect(303, url.pathname, { type: "success", message: "Check your email." }, cookies);
  },
};
