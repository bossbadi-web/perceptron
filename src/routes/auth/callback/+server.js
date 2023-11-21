import { getSafeRedirect } from "$lib/utils";
import { redirect } from "@sveltejs/kit";

export const GET = async ({ cookies, url, locals }) => {
  const code = url.searchParams.get("code");

  if (code) {
    const { data } = await locals.supabase.auth.exchangeCodeForSession(code);
    cookies.set("access_token", data.session.access_token, { maxAge: 604800 });
  }

  throw redirect(303, getSafeRedirect(url.searchParams.get("next"), "/login"));
};
