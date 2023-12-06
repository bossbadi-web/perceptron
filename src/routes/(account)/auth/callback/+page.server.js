import { getSafeRedirect } from "$lib/utils";

export const load = async ({ url, locals }) => {
  const code = url.searchParams.get("code");

  if (code) {
    await locals.supabase.auth.exchangeCodeForSession(code);
  }

  const next = getSafeRedirect(url.searchParams.get("next"), "/login");
  return { next };
};
