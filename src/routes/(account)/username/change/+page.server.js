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

    const username = formData.get("username");

    const { error: err } = await locals.supabase.auth.updateUser({ data: { username } });

    if (err) {
      if (err instanceof AuthApiError) {
        throw redirect(303, url.pathname, { type: "danger", message: err.message }, cookies);
      }
      throw redirect(303, url.pathname, { type: "danger", message: "Internal Server Error." }, cookies);
    }

    throw redirect(
      303,
      url.pathname,
      { type: "success", message: "Username updated. Please sign in again to see your new name." },
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
    username: session.user.username,
  };
};
