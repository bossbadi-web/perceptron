// src/routes/+layout.js
import { createSupabaseLoadClient } from "@supabase/auth-helpers-sveltekit";
import dotenv from "dotenv";

dotenv.config();

export const load = async ({ fetch, data, depends }) => {
  depends("supabase:auth");

  const supabase = createSupabaseLoadClient({
    supabaseUrl: process.env.SUPABASE_URL,
    supabaseKey: process.env.SUPABASE_ANON_KEY,
    event: { fetch },
    serverSession: data.session,
  });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return { supabase, session };
};
