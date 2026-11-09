import { serverPublicSupabaseConfig } from "@/lib/supabase-config.server";

export const dynamic = "force-dynamic";

export function GET() {
  const config = serverPublicSupabaseConfig();
  return Response.json(config ?? { error: "workspace_unavailable" }, {
    status: config ? 200 : 503,
    headers: { "Cache-Control": "private, no-store", "X-Robots-Tag": "noindex, nofollow" },
  });
}
