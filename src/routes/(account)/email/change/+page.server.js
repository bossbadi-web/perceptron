import { AuthApiError } from "@supabase/supabase-js";
import { redirect } from "sveltekit-flash-message/server";

export const actions = {
  default: async ({ cookies, request, locals, url }) => {
    const formData = await request.formData();

    // check password
    const password = formData.get("password");
    const { data: passwordCorrect } = await locals.supabase.rpc("right_password", { password });
    if (!passwordCorrect) {
      throw redirect(303, url.pathname, { type: "danger", message: "Wrong password." }, cookies);
    }

    // check if emails match
    const email = formData.get("email");
    const emailConfirm = formData.get("emailConfirm");
    if (email !== emailConfirm) {
      throw redirect(303, url.pathname, { type: "danger", message: "Emails do not match." }, cookies);
    }

    // update email
    const { error: err } = await locals.supabase.auth.updateUser({ email });

    if (err) {
      if (err instanceof AuthApiError) {
        throw redirect(303, url.pathname, { type: "danger", message: err.message }, cookies);
      }
      throw redirect(303, url.pathname, { type: "danger", message: "Internal Server Error." }, cookies);
    }

    throw redirect(
      303,
      url.pathname,
      { type: "success", message: "Check your new email for a confirmation link." },
      cookies
    );
  },
};

// check if user is logged in
export const load = async ({ locals, url }) => {
  const session = await locals.getSession();

  if (!session) {
    throw redirect(303, `/login?redirectTo=${url.pathname}`);
  }

  return {
    email: session.user.email,
  };
};
