import { fail } from "@sveltejs/kit";
import { getSafeRedirect } from "$lib/utils";
import { redirect, setFlash } from "sveltekit-flash-message/server";
import { verifyCapcha } from "$lib/recaptchaServer";

export const actions = {
  default: async ({ cookies, request, locals, url }) => {
    const { status, message } = await verifyCapcha(cookies);
    if (status !== 200) {
      return { status, message };
    }

    // sign in with google
    const provider = url.searchParams.get("provider");
    if (provider === "google") {
      const { data } = await locals.supabase.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo: `${url.origin}${getSafeRedirect(url.searchParams.get("redirectTo"))}` },
      });

      if (!data) {
        setFlash({ type: "error", message: "Failed to sign in with Google." }, cookies);
        return fail(400);
      }

      throw redirect(303, data.url);
    }

    const formData = await request.formData();
    const email = formData.get("email");
    const password = formData.get("password");

    const { error: err } = await locals.supabase.auth.signInWithPassword({ email, password });

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

    throw redirect(303, getSafeRedirect(url.searchParams.get("redirectTo")));
  },
};

export const load = async ({ locals }) => {
  if (await locals.getSession()) {
    throw redirect(303, "/");
  }
};
