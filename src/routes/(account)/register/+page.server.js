import { fail } from "@sveltejs/kit";
import { LIMITS } from "$lib/consts";
import { redirect, setFlash } from "sveltekit-flash-message/server";
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
        setFlash({ type: "error", message: "Failed to sign in with Google." }, cookies);
        return fail(400);
      }

      throw redirect(303, data.url);
    }

    const formData = await request.formData();
    const { email, username, password, passwordConfirm } = Object.fromEntries(formData);

    if (!email) {
      setFlash({ type: "error", message: "Email is required." }, cookies);
      return fail(400);
    }
    if (!username) {
      setFlash({ type: "error", message: "Username is required." }, cookies);
      return fail(400);
    }
    if (username.length > LIMITS.username) {
      setFlash({ type: "error", message: `Username must be less than ${LIMITS.username} characters.` }, cookies);
      return fail(400);
    }
    if (!password) {
      setFlash({ type: "error", message: "Password is required." }, cookies);
      return fail(400);
    }
    if (!passwordConfirm) {
      setFlash({ type: "error", message: "Please confirm the password." }, cookies);
      return fail(400);
    }
    if (password !== passwordConfirm) {
      setFlash({ type: "error", message: "Passwords do not match." }, cookies);
      return fail(400);
    }

    // sign up
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
      setFlash(
        {
          type: "error",
          message: err.__isAuthError ? err.message : "Internal Server Error.",
        },
        cookies
      );
      return fail(err.status);
    }

    setFlash({ type: "success", message: "Success! Check your email for the login link." }, cookies);
  },
};

export const load = async ({ locals }) => {
  if (await locals.getSession()) {
    throw redirect(303, "/");
  }
};
