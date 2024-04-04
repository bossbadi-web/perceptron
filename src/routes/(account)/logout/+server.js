import { error } from "@sveltejs/kit";
import { redirect } from "sveltekit-flash-message/server";

export const POST = async ({ cookies, locals }) => {
  const { error: err } = await locals.supabase.auth.signOut();

  if (err) {
    throw error(500, "Something went wrong logging you out.");
  }

  throw redirect(303, "/", { type: "success", message: "Logged out of all devices." }, cookies);
};
