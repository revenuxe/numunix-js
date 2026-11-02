import { useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { ensureSupabase, getSupabase } from "@/lib/supabase";

export type AdminAccess =
  "loading" | "ready" | "signed-out" | "forbidden" | "error" | "unavailable";

export function useAdminSession() {
  const [session, setSession] = useState<Session | null>(null);
  const [initialized, setInitialized] = useState(false);
  const [access, setAccess] = useState<AdminAccess>("loading");

  useEffect(() => {
    let subscription: { unsubscribe: () => void } | null = null;
    let active = true;
    ensureSupabase().then((client) => {
      if (!active) return;
      if (!client) {
        setInitialized(true);
        setAccess("unavailable");
        return;
      }
      const { data } = client.auth.onAuthStateChange((_event, next) => {
        setSession(next);
        setInitialized(true);
        setAccess(next ? "loading" : "signed-out");
      });
      subscription = data.subscription;
    });
    return () => {
      active = false;
      subscription?.unsubscribe();
    };
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
