import { fail } from "@sveltejs/kit";
import { redirect, setFlash } from "sveltekit-flash-message/server";

export const actions = {
  default: async ({ cookies, request, locals }) => {
    const formData = await request.formData();

    // check password
    if (formData.get("isFromPasswordReset") == 0) {
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

    setFlash({ type: "success", message: "Password updated." }, cookies);
  },
};

// check if user is logged in
export const load = async ({ locals, url }) => {
  if (!(await locals.getSession())) {
    throw redirect(303, `/login?redirectTo=${url.pathname}`);
  }
};
