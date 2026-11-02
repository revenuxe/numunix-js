export function isPublicSupabaseKey(key: string | undefined): key is string {
  if (!key) return false;
  if (key.startsWith("sb_publishable_")) return true;
  // Legacy anon JWTs are also public. Never accept a service-role or secret key.
  try {
    const encoded = key.split(".")[1];
    if (!encoded) return false;
    const base64 = encoded.replace(/-/g, "+").replace(/_/g, "/");
    const payload = JSON.parse(atob(base64.padEnd(Math.ceil(base64.length / 4) * 4, "=")));
    return payload.role === "anon";
  } catch {
    return false;
  }
}
