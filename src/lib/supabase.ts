import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { isPublicSupabaseKey } from "./supabase-config";
import { getPublicSupabaseConfig } from "./supabase-config.functions";

export const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
export const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY?.trim();
export const supabaseConfigured = Boolean(
  supabaseUrl?.startsWith("https://") && isPublicSupabaseKey(supabaseKey),
);

let client: SupabaseClient | null = null;
let configPromise: Promise<SupabaseClient | null> | null = null;

function buildClient(url: string, key: string) {
  client ??= createClient(url, key, {
    auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: false },
  });
  return client;
}

// Sync path for callers that run after the session hook has initialized the client.
export function getSupabase() {
  if (client) return client;
  if (!supabaseConfigured || typeof window === "undefined") return null;
  return buildClient(supabaseUrl!, supabaseKey!);
}

// Resolve public configuration without exposing server credentials.
export function ensureSupabase(): Promise<SupabaseClient | null> {
  if (typeof window === "undefined") return Promise.resolve(null);
  const existing = getSupabase();
  if (existing) return Promise.resolve(existing);
  configPromise ??= getPublicSupabaseConfig()
    .then((config) => (config ? buildClient(config.url, config.key) : null))
    .catch(() => null);
  return configPromise;
}
