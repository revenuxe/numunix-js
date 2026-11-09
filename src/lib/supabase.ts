import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { resolvePublicSupabaseConfig } from "./supabase-config";

const browserConfig = resolvePublicSupabaseConfig({
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
});
export const supabaseUrl = browserConfig?.url;
export const supabaseKey = browserConfig?.key;
export const supabaseConfigured = Boolean(browserConfig);

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
  configPromise ??= (async () => {
    try {
      const response = await fetch("/api/public/config", {
        cache: "no-store",
        credentials: "same-origin",
        signal: AbortSignal.timeout(10000),
      });
      if (!response.ok) return null;
      const value: unknown = await response.json();
      if (
        !value ||
        typeof value !== "object" ||
        !("url" in value) ||
        !("key" in value) ||
        typeof value.url !== "string" ||
        typeof value.key !== "string"
      )
        return null;
      const config = resolvePublicSupabaseConfig({
        SUPABASE_URL: value.url,
        SUPABASE_PUBLISHABLE_KEY: value.key,
      });
      return config ? buildClient(config.url, config.key) : null;
    } catch {
      return null;
    } finally {
      configPromise = null;
    }
  })();
  return configPromise;
}
