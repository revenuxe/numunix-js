import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { isPublicSupabaseKey } from "./supabase-config";

export const supabaseUrl = import.meta.env["VITE_SUPABASE_URL"]?.trim();
export const supabaseKey = import.meta.env["VITE_SUPABASE_PUBLISHABLE_KEY"]?.trim();
export const supabaseConfigured = Boolean(
  supabaseUrl?.startsWith("https://") && isPublicSupabaseKey(supabaseKey),
);

let client: SupabaseClient | null = null;
export function getSupabase() {
  if (!supabaseConfigured || typeof window === "undefined") return null;
  client ??= createClient(supabaseUrl!, supabaseKey!, {
    auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: false },
  });
  return client;
}
