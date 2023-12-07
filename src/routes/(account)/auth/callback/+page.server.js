import { error } from "@sveltejs/kit";
import { getSafeRedirect } from "$lib/utils";

export const load = async ({ url, locals }) => {
  const code = url.searchParams.get("code");
  if (code) {
    try {
      await locals.supabase.auth.exchangeCodeForSession(code);
    } catch (err) {
      throw error(400, {
        message: "Bad Request",
        hint: "Please open the link in the same browser you used to request it. (You now need to get a new one.)",
      });
    }
  }

  const next = getSafeRedirect(url.searchParams.get("next"), "/login");
  return { next };
};
