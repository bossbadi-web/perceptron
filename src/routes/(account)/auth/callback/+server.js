import { getSafeRedirect } from "$lib/utils";
import { redirect } from "@sveltejs/kit";

export const GET = async ({ url, locals }) => {
  const code = url.searchParams.get("code");

  if (code) {
    await locals.supabase.auth.exchangeCodeForSession(code);
  }

  throw redirect(303, getSafeRedirect(url.searchParams.get("next"), "/login"));
};
