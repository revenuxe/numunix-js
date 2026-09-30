import { loadEnvFile } from "node:process";
import { isPublicSupabaseKey } from "../src/lib/supabase-config.ts";

loadEnvFile(".env");
const url = process.env.VITE_SUPABASE_URL?.trim();
const key = process.env.VITE_SUPABASE_PUBLISHABLE_KEY?.trim();
if (!url?.startsWith("https://") || !isPublicSupabaseKey(key)) {
  console.error("Set a valid Supabase project URL and public API key in .env.");
  process.exit(1);
}
const headers = { apikey: key, ...(!key.startsWith("sb_publishable_") ? { Authorization: `Bearer ${key}` } : {}) };
try {
  const auth = await fetch(`${url}/auth/v1/settings`, { headers, signal: AbortSignal.timeout(15000) });
  console.log(`Supabase Auth connection: ${auth.status === 200 ? "OK" : `HTTP ${auth.status}`}`);
  for (const table of ["contact_enquiries", "admin_users"]) {
    // limit=0 probes table availability without reading any records.
    const response = await fetch(`${url}/rest/v1/${table}?select=*&limit=0`, { headers, signal: AbortSignal.timeout(15000) });
    const result = await response.json();
    console.log(`${table}: HTTP ${response.status}${result.code ? ` (${result.code})` : ""}`);
  }
} catch {
  console.error("Connection check failed. Check network access and the Supabase project URL.");
  process.exit(1);
}
