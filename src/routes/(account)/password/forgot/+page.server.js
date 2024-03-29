import { fail } from "@sveltejs/kit";
import { setFlash } from "sveltekit-flash-message/server";

export const actions = {
  default: async ({ cookies, request, locals, url }) => {
    const formData = await request.formData();
    const { email } = Object.fromEntries(formData);

    const { error: err } = await locals.supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${url.origin}/auth/callback?next=/password/change`,
    });

    if (err) {
      setFlash(
        {
          type: "error",
          message: err.__isAuthError ? err.message : "Internal Server Error.",
        },
        cookies
      );
      return fail(err.status);
    }

    setFlash({ type: "success", message: "Check your email." }, cookies);
  },
};
