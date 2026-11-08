"use server";
import { isPublicSupabaseKey } from "./supabase-config";

// Public-safe config only: the URL and publishable key are designed to be
// exposed to browsers. Never return the service-role key here.
export async function getPublicSupabaseConfig() {
  const url = process.env["SUPABASE_URL"] || process.env["NEXT_PUBLIC_SUPABASE_URL"];
  const key =
    process.env["SUPABASE_PUBLISHABLE_KEY"] || process.env["NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY"];
  if (!url?.startsWith("https://") || !isPublicSupabaseKey(key)) return null;
  return { url, key };
}
