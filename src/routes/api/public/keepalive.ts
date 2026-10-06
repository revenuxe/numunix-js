import { createFileRoute } from "@tanstack/react-router";

// Keep-alive ping: a lightweight, read-only database query so the Supabase
// project records activity and is not auto-paused on the free plan.
// Protected by LOVABLE_CRON_SECRET — callers must send it as a Bearer token
// or ?key= query param. Returns no data, only a status.
export const Route = createFileRoute("/api/public/keepalive")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const secret = process.env["LOVABLE_CRON_SECRET"];
        if (!secret) {
          return Response.json({ ok: false, error: "not_configured" }, { status: 500 });
        }

        const url = new URL(request.url);
        const auth = request.headers.get("authorization");
        const provided = auth?.startsWith("Bearer ")
          ? auth.slice(7)
          : url.searchParams.get("key");

        if (!provided || provided !== secret) {
          return Response.json({ ok: false, error: "unauthorized" }, { status: 401 });
        }

        const supabaseUrl = process.env["SUPABASE_URL"];
        const supabaseKey = process.env["SUPABASE_PUBLISHABLE_KEY"];
        if (!supabaseUrl || !supabaseKey) {
          return Response.json({ ok: false, error: "supabase_not_configured" }, { status: 500 });
        }

        try {
          // Harmless head-count read against PostgREST — enough activity for
          // Supabase to consider the project active.
          const res = await fetch(
            `${supabaseUrl}/rest/v1/contact_enquiries?select=id`,
            {
              method: "HEAD",
              headers: {
                apikey: supabaseKey,
                Authorization: `Bearer ${supabaseKey}`,
                Prefer: "count=exact",
              },
            },
          );

          return Response.json({
            ok: res.ok || res.status === 406,
            status: res.status,
            at: new Date().toISOString(),
          });
        } catch {
          return Response.json({ ok: false, error: "ping_failed" }, { status: 502 });
        }
      },
    },
  },
});
