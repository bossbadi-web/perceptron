import { fail, redirect } from "@sveltejs/kit";

export const actions = {
  default: async ({ cookies, request, locals, url }) => {
    const formData = await request.formData();
    const email = formData.get("email");
    const password = formData.get("password");

    const { data, error: err } = await locals.supabase.auth.signInWithPassword({ email, password });
    if (err) {
      return fail(500, { message: "Server error. Try again later.", success: false, email });
    }

    // set cookie
    cookies.set("access_token", data.session.access_token, { path: "/" });
    throw redirect(303, url.searchParams.get("redirectTo") || "/");
  },
};
