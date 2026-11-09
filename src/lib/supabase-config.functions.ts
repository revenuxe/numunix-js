"use server";
import { serverPublicSupabaseConfig } from "./supabase-config.server";

// Public-safe config only: the URL and publishable key are designed to be
// exposed to browsers. Never return the service-role key here.
export async function getPublicSupabaseConfig() {
  return serverPublicSupabaseConfig();
}
