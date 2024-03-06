import { AuthApiError } from "@supabase/supabase-js";
import { fail } from "@sveltejs/kit";
import { redirect, setFlash } from "sveltekit-flash-message/server";

export const actions = {
  default: async ({ cookies, request, locals, url }) => {
    const formData = await request.formData();

    // check password
    const password = formData.get("password");
    const { data: passwordCorrect } = await locals.supabase.rpc("right_password", { password });
    if (!passwordCorrect) {
      setFlash({ type: "danger", message: "Wrong password" }, cookies);
      return fail(401);
    }

    // check if emails match
    const email = formData.get("email");
    const emailConfirm = formData.get("emailConfirm");
    if (email !== emailConfirm) {
      setFlash({ type: "danger", message: "Emails do not match." }, cookies);
      return fail(400);
    }

    // update email
    const { error: err } = await locals.supabase.auth.updateUser({ email });

    if (err) {
      if (err instanceof AuthApiError) {
        setFlash({ type: "danger", message: err.message }, cookies);
        return fail(400);
      }
      setFlash({ type: "danger", message: "Internal Server Error." }, cookies);
      return fail(500);
    }

    setFlash({ type: "success", message: "Check your new email for a confirmation link." }, cookies);
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
