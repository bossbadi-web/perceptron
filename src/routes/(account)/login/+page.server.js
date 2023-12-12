import { AuthApiError } from "@supabase/supabase-js";
import { fail, redirect } from "@sveltejs/kit";
import { getSafeRedirect } from "$lib/utils";

export const actions = {
  default: async ({ request, locals, url }) => {
    const formData = await request.formData();
    const email = formData.get("email");
    const password = formData.get("password");

    const { error: err } = await locals.supabase.auth.signInWithPassword({ email, password });

    if (err) {
      if (err instanceof AuthApiError && err.status === 400) {
        return fail(400, {
          message: "Invalid username or password.",
        });
      }
      return fail(500, {
        message: "Server error. Please try again later.",
      });
    }

    throw redirect(303, getSafeRedirect(url.searchParams.get("redirectTo")));
  },
};

export const load = async ({ locals }) => {
  if (await locals.getSession()) {
    throw redirect(303, "/");
  }
};
