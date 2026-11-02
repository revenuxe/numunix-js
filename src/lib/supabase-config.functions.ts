import { createServerFn } from "@tanstack/react-start";
import { isPublicSupabaseKey } from "./supabase-config";

// Public-safe config only: the URL and publishable key are designed to be
// exposed to browsers. Never return the service-role key here.
export const getPublicSupabaseConfig = createServerFn({ method: "GET" }).handler(async () => {
  const url = process.env["SUPABASE_URL"] || process.env["VITE_SUPABASE_URL"];
  const key = process.env["SUPABASE_PUBLISHABLE_KEY"] || process.env["VITE_SUPABASE_PUBLISHABLE_KEY"];
  if (!url?.startsWith("https://") || !isPublicSupabaseKey(key)) return null;
  return { url, key };
});
