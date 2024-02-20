import { AuthApiError } from "@supabase/supabase-js";
import { fail, redirect } from "@sveltejs/kit";
import { verifyCapcha } from "$lib/recaptchaServer";

export const actions = {
  default: async ({ cookies, locals, request, url }) => {
    const { status, message } = await verifyCapcha(cookies);
    if (status !== 200) {
      return { status, message };
    }

    // sign in with google
    const provider = url.searchParams.get("provider");
    if (provider === "google") {
      const { data } = await locals.supabase.auth.signInWithOAuth({
        provider: "google",
      });

      if (!data) {
        return fail(500, {
          message: "Server error. Please try again later.",
        });
      }

      throw redirect(303, data.url);
    }

    const formData = await request.formData();

    // check if passwords match
    const password = formData.get("password");
    const passwordConfirm = formData.get("passwordConfirm");
    if (password !== passwordConfirm) {
      return fail(400, { message: "Passwords do not match." });
    }

    // sign up
    const email = formData.get("email");
    const username = formData.get("username");
    const { error: err } = await locals.supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${url.origin}/auth/callback`,
        data: {
          username,
        },
      },
    });

    if (err) {
      if (err instanceof AuthApiError) {
        return fail(400, { message: err.message });
      }
      return fail(500, { message: "Server error. Try again later." });
    }

    return {
      status: 200,
      message: "Success! Check your email for the login link.",
    };
  },
};

export const load = async ({ locals }) => {
  if (await locals.getSession()) {
    throw redirect(303, "/");
  }
};
