import { error, redirect } from "@sveltejs/kit";

export const POST = async ({ cookies, locals }) => {
  // delete access_token cookie
  cookies.delete("access_token", { path: "/" });

  const { error: err } = await locals.supabase.auth.signOut();

  if (err) {
    throw error(500, "Something went wrong logging you out.");
  }

  throw redirect(303, "/");
};
