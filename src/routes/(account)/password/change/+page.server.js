import { AuthApiError } from "@supabase/supabase-js";
import { redirect } from "sveltekit-flash-message/server";

export const actions = {
  default: async ({ cookies, request, locals, url }) => {
    const formData = await request.formData();

    // check password
    if (formData.get("isFromPasswordReset") == 0) {
      const password = formData.get("password");
      const { data: passwordCorrect } = await locals.supabase.rpc("right_password", { password });
      if (!passwordCorrect) {
        throw redirect(303, url.pathname, { type: "danger", message: "Wrong password." }, cookies);
      }
    }

    // check if new passwords match
    const newPassword = formData.get("newPassword");
    const newPasswordConfirm = formData.get("newPasswordConfirm");

    if (newPassword !== newPasswordConfirm) {
      throw redirect(303, url.pathname, { type: "danger", message: "Passwords do not match." }, cookies);
    }

    // update password
    const { error: err } = await locals.supabase.auth.updateUser({ password: newPassword });

    if (err) {
      if (err instanceof AuthApiError) {
        throw redirect(303, url.pathname, { type: "danger", message: err.message }, cookies);
      }
      throw redirect(303, url.pathname, { type: "danger", message: "Internal Server Error." }, cookies);
    }

    throw redirect(303, url.pathname, { type: "success", message: "Password updated." }, cookies);
  },
};

// check if user is logged in
export const load = async ({ locals, url }) => {
  if (!(await locals.getSession())) {
    throw redirect(303, `/login?redirectTo=${url.pathname}`);
  }
};
