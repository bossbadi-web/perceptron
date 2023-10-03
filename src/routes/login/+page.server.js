// src/routes/login/+page.server.js
import { fail } from "@sveltejs/kit";

export const actions = {
  default: async ({ request, locals: { supabase } }) => {
    console.log('received login request')

    const formData = await request.formData();
    const email = formData.get("email");
    const password = formData.get("password");

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      return fail(500, { message: "Server error. Try again later.", success: false, email });
    }

    return {
      message: "Please check your email for a magic link to log into the website.",
      success: true,
    };
  },
};
