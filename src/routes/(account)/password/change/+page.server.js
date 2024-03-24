import { fail } from "@sveltejs/kit";
import { redirect, setFlash } from "sveltekit-flash-message/server";
import NodeCache from "node-cache";

const cache = new NodeCache();

export const actions = {
  default: async ({ cookies, locals, request }) => {
    const formData = await request.formData();

    if (cache.get("isResetLink")) {
      cache.del("isResetLink");
    } else {
      const password = formData.get("password");
      const { data: passwordCorrect } = await locals.supabase.rpc("right_password", { password });
      if (!passwordCorrect) {
        setFlash({ type: "error", message: "Wrong password" }, cookies);
        return fail(401);
      }
    }

    // check if new passwords match
    const newPassword = formData.get("newPassword");
    const newPasswordConfirm = formData.get("newPasswordConfirm");

    if (newPassword !== newPasswordConfirm) {
      setFlash({ type: "error", message: "Passwords do not match" }, cookies);
      return fail(400);
    }

    // update password
    const { error: err } = await locals.supabase.auth.updateUser({ password: newPassword });

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

    throw redirect(303, "/profile", { type: "success", message: "Password updated." }, cookies);
  },
};

// check if user is logged in
export const load = async ({ locals, request, url }) => {
  if (!locals.getSession()) {
    throw redirect(303, `/login?redirectTo=${url.pathname}`);
  }

  let isResetLink = false;

  const referer = request.headers.get("referer");
  if (!referer || typeof referer !== "string") {
    return { isResetLink };
  }

  const refUrl = new URL(referer);
  if (refUrl.searchParams.get("error")) {
    return { isResetLink };
  }

  const callbackUrl = new URL(`${url.origin}/auth/callback`);

  isResetLink = refUrl.hostname === callbackUrl.hostname && refUrl.pathname.startsWith(callbackUrl.pathname);

  cache.set("isResetLink", isResetLink);

  return { isResetLink };
};
