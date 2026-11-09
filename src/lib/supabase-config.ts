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

type Environment = Record<string, string | undefined>;
export type PublicSupabaseConfig = { url: string; key: string };

// Migration aliases are read on the server only; no Vite runtime is needed.
export function resolvePublicSupabaseConfig(
  env: Environment,
  { allowLoopback = false }: { allowLoopback?: boolean } = {},
): PublicSupabaseConfig | null {
  const sources = [
    { url: env["SUPABASE_URL"], keys: [env["SUPABASE_PUBLISHABLE_KEY"], env["SUPABASE_ANON_KEY"]] },
    {
      url: env["NEXT_PUBLIC_SUPABASE_URL"],
      keys: [env["NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY"], env["NEXT_PUBLIC_SUPABASE_ANON_KEY"]],
    },
    {
      url: env["VITE_SUPABASE_URL"],
      keys: [env["VITE_SUPABASE_PUBLISHABLE_KEY"], env["VITE_SUPABASE_ANON_KEY"]],
    },
  ];
  const usable = (rawUrl: string | undefined, rawKey: string | undefined) => {
    const url = rawUrl?.trim().replace(/\/+$/, "");
    const key = rawKey?.trim();
    if (!url || !isPublicSupabaseKey(key)) return null;
    try {
      const parsed = new URL(url);
      const loopback =
        allowLoopback &&
        parsed.protocol === "http:" &&
        ["localhost", "127.0.0.1", "[::1]"].includes(parsed.hostname);
      if (
        (parsed.protocol !== "https:" && !loopback) ||
        parsed.username ||
        parsed.password ||
        parsed.search ||
        parsed.hash
      )
        return null;
      return { url, key };
    } catch {
      return null;
    }
  };
  // Prefer complete pairs so different projects' settings are not mixed.
  for (const source of sources)
    for (const key of source.keys) {
      const config = usable(source.url, key);
      if (config) return config;
    }
  // Preserve support for deployments splitting URL/key across the two current naming schemes.
  const present = sources.filter((source) => source.url?.trim());
  if (present.length === 1)
    for (const source of sources)
      for (const key of source.keys) {
        const config = usable(present[0]!.url, key);
        if (config) return config;
      }
  return null;
}
