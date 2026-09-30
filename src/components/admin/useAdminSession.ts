import { useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { getSupabase, supabaseConfigured } from "@/lib/supabase";

export type AdminAccess =
  "loading" | "ready" | "signed-out" | "forbidden" | "error" | "unavailable";

export function useAdminSession() {
  const [session, setSession] = useState<Session | null>(null);
  const [initialized, setInitialized] = useState(false);
  const [access, setAccess] = useState<AdminAccess>(supabaseConfigured ? "loading" : "unavailable");

  useEffect(() => {
    const client = getSupabase();
    if (!client) return;
    const { data } = client.auth.onAuthStateChange((_event, next) => {
      setSession(next);
      setInitialized(true);
      setAccess(next ? "loading" : "signed-out");
    });
    return () => data.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const client = getSupabase();
    if (!initialized || !client || !session) return;
    let active = true;
    client
      .from("admin_users")
      .select("user_id")
      .eq("user_id", session.user.id)
      .maybeSingle()
      .then(({ data, error }) => {
        if (active) setAccess(error ? "error" : data ? "ready" : "forbidden");
      });
    return () => {
      active = false;
    };
  }, [initialized, session]);

  return { session, access };
}
