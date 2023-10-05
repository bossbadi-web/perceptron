import { AuthApiError } from "@supabase/supabase-js";
import { fail, redirect } from "@sveltejs/kit";

export const actions = {
  default: async ({ cookies, request, locals, url }) => {
    const formData = await request.formData();
    const email = formData.get("email");
    const password = formData.get("password");

    const { data, error: err } = await locals.supabase.auth.signInWithPassword({ email, password });

    if (err) {
      if (err instanceof AuthApiError && err.status === 400) {
        console.log(400);
        return fail(400, {
          error: "Invalid credentials",
        });
      }
      console.log(500);
      return fail(500, {
        message: "Server error. Try again later.",
      });
    }

    // set cookie
    cookies.set("access_token", data.session.access_token, { path: "/" });
    throw redirect(303, url.searchParams.get("redirectTo") || "/");
  },
};
