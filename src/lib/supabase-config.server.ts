import "server-only";
import { resolvePublicSupabaseConfig } from "./supabase-config";

export function serverPublicSupabaseConfig() {
  return resolvePublicSupabaseConfig(process.env);
}
