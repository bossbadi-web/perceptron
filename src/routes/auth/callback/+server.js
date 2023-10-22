import { redirect } from "@sveltejs/kit";

export const GET = async ({ cookies, url, locals }) => {
  const code = url.searchParams.get("code");

  if (code) {
    const { data } = await locals.supabase.auth.exchangeCodeForSession(code);
    cookies.set("access_token", data.session.access_token, { maxAge: 604800 });
  }

  const next = url.searchParams.get("next");
  throw redirect(303, next || "/login");
};
