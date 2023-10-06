// src/routes/login/+page.server.js
import { fail } from "@sveltejs/kit";

export const actions = {
  default: async ({ request, url, locals: { supabase } }) => {
    const formData = await request.formData();
    const email = formData.get("email");
    const password = formData.get("password");
    const passwordConfirm = formData.get("passwordConfirm");

    if (password !== passwordConfirm) {
      return fail(400, { message: "Passwords do not match."});
    }

    const { error: err } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${url.origin}/auth/callback`,
      },
    });

    if (err) {
      return fail(500, { message: "Server error. Try again later."});
    }

    return {
      status: 200,
      body: {
        success: true,
        message: "Check your email for the login link.",
        email,
      },
    };
  },
};
