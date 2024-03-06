import { AuthApiError } from "@supabase/supabase-js";
import { fail } from "@sveltejs/kit";
import { setFlash } from "sveltekit-flash-message/server";

export const actions = {
  default: async ({ cookies, request, locals, url }) => {
    const formData = await request.formData();
    const email = formData.get("email");

    const { error: err } = await locals.supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${url.origin}/auth/callback?next=/password/change`,
    });

    if (err) {
      if (err instanceof AuthApiError) {
        setFlash({ type: "danger", message: err.message }, cookies);
        return fail(400);
      }
      setFlash({ type: "danger", message: "Internal Server Error." }, cookies);
      return fail(500);
    }

    setFlash({ type: "success", message: "Check your email." }, cookies);
  },
};
