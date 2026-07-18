import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ShieldCheck, ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/admin/login")({
  component: AdminLoginPage,
  head: () => ({
    meta: [
      { title: "Admin Login — Numunix" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
});

function AdminLoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("admin@numunix.com");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setNotice(null);
    if (mode === "signup") {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: `${window.location.origin}/admin/dashboard` },
      });
      setLoading(false);
      if (error) return setError(error.message);
      setNotice("Account created. If email confirmation is enabled, check your inbox — otherwise sign in below.");
      setMode("signin");
      return;
    }
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) return setError(error.message);
    navigate({ to: "/admin/dashboard" });
  }

  return (
    <main className="grid min-h-screen place-items-center bg-ink p-4 text-white">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-md rounded-3xl bg-white/5 p-8 ring-1 ring-white/10 backdrop-blur-xl shadow-card"
      >
        <div className="grid h-14 w-14 place-items-center rounded-2xl bg-brand/20 text-brand">
          <ShieldCheck className="h-7 w-7" />
        </div>
        <h1 className="mt-5 text-2xl font-extrabold tracking-tight">Admin Login</h1>
        <p className="mt-1 text-sm text-white/60">Sign in to manage Numunix leads.</p>

        <div className="mt-6 space-y-3">
          <label className="block">
            <span className="text-xs font-semibold text-white/80">Email</span>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@numunix.com"
              className="mt-1.5 w-full rounded-xl bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/40 ring-1 ring-white/20 focus:outline-none focus:ring-brand"
            />
          </label>
          <label className="block">
            <span className="text-xs font-semibold text-white/80">Password</span>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="mt-1.5 w-full rounded-xl bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/40 ring-1 ring-white/20 focus:outline-none focus:ring-brand"
            />
          </label>
        </div>

        {error && (
          <p className="mt-4 rounded-lg bg-red-500/10 px-3 py-2 text-xs text-red-300 ring-1 ring-red-500/30">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand px-5 py-3.5 text-sm font-semibold text-brand-foreground shadow-brand transition hover:brightness-110 disabled:opacity-60"
        >
          {loading ? "Signing in…" : "Sign in"} <ArrowRight className="h-4 w-4" />
        </button>
      </form>
    </main>
  );
}
