import "server-only";
export async function GET(request: Request) {
  // Accept the managed cron secret or a user-set KEEPALIVE_KEY.
  const secrets = [process.env["KEEPALIVE_KEY"]].filter((s): s is string => Boolean(s));
  if (secrets.length === 0) {
    return Response.json({ ok: false, error: "not_configured" }, { status: 500 });
  }

  const url = new URL(request.url);
  const auth = request.headers.get("authorization");
  const provided = auth?.startsWith("Bearer ") ? auth.slice(7) : url.searchParams.get("key");

  if (!provided || !secrets.includes(provided)) {
    return Response.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  const supabaseUrl = process.env["SUPABASE_URL"];
  // Server-only service key: authorized regardless of table permissions.
  const supabaseKey = process.env["SUPABASE_SERVICE_ROLE_KEY"];
  if (!supabaseUrl || !supabaseKey) {
    return Response.json({ ok: false, error: "supabase_not_configured" }, { status: 500 });
  }

  try {
    // Harmless head-count read against PostgREST — enough activity for
    // Supabase to consider the project active.
    const res = await fetch(`${supabaseUrl}/rest/v1/contact_enquiries?select=id`, {
      method: "HEAD",
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
        Prefer: "count=exact",
      },
    });

    return Response.json({
      ok: res.ok || res.status === 406,
      status: res.status,
      at: new Date().toISOString(),
    });
  } catch {
    return Response.json({ ok: false, error: "ping_failed" }, { status: 502 });
  }
}
