import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from "$env/static/public";
import { createSupabaseLoadClient } from "@supabase/auth-helpers-sveltekit";
import { completeUser } from "$lib/utils";

export const load = async ({ fetch, data, depends }) => {
  depends("supabase:auth");

  const supabase = createSupabaseLoadClient({
    supabaseUrl: PUBLIC_SUPABASE_URL,
    supabaseKey: PUBLIC_SUPABASE_ANON_KEY,
    event: { fetch },
    serverSession: data.session,
  });

  let {
    data: { session },
  } = await supabase.auth.getSession();

  if (session?.user) {
    session.user = await completeUser(supabase, session.user);

    // check if user was signed out from somewhere else
    const { data: exists } = await supabase.rpc("session_exists", { session_id: session.user.session_id });
    if (!exists) {
      await supabase.auth.signOut();
    }
  }

  return { supabase, session };
};
