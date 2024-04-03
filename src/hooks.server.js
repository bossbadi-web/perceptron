import { completeUser } from "$lib/utils";
import { createSupabaseServerClient } from "@supabase/auth-helpers-sveltekit";
import { dev } from "$app/environment";
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from "$env/static/public";

if (dev) {
  // disable SSL verification in dev mode
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
}

export const handle = async ({ event, resolve }) => {
  event.locals.supabase = createSupabaseServerClient({
    supabaseUrl: PUBLIC_SUPABASE_URL,
    supabaseKey: PUBLIC_SUPABASE_ANON_KEY,
    event,
  });

  /**
   * a little helper that is written for convenience so that instead
   * of calling `const { data: { session } } = await supabase.auth.getSession()`
   * you just call this `await getSession()`
   */
  event.locals.getSession = async () => {
    let {
      data: { session },
    } = await event.locals.supabase.auth.getSession();

    if (session?.user) {
      session.user = await completeUser(event.locals.supabase, session.user);
    }
    return session;
  };

  return resolve(event, {
    filterSerializedResponseHeaders(name) {
      return name === "content-range";
    },
  });
};
