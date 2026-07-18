import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, LockKeyhole } from "lucide-react";
import { supabase } from "@/lib/supabase";

export const Route = createFileRoute("/admin/login")({ component: AdminLogin });

function AdminLogin() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError("");
    const { data, error: loginError } = await supabase.auth.signInWithPassword({
      email: "admin@numunix.com",
      password,
    });
    if (loginError || data.user?.email !== "admin@numunix.com") {
      await supabase.auth.signOut();
      setError(loginError?.message || "This account is not allowed to access the dashboard.");
      setBusy(false);
      return;
    }
    navigate({ to: "/admin/dashboard" });
  }

  return (
    <main className="grid min-h-screen place-items-center bg-secondary/40 px-4 py-10 text-ink">
      <form onSubmit={onSubmit} className="w-full max-w-md rounded-[2rem] bg-ink p-7 text-white shadow-card ring-1 ring-white/10 sm:p-9">
        <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand text-brand-foreground"><LockKeyhole className="h-5 w-5" /></span>
        <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-white/55">Numunix administration</p>
        <h1 className="mt-2 text-3xl font-extrabold">Sign in</h1>
        <p className="mt-2 text-sm text-white/70">Use the password for admin@numunix.com.</p>
        <label className="mt-7 block"><span className="text-xs font-semibold text-white/80">Email</span><input value="admin@numunix.com" readOnly className="mt-1.5 w-full rounded-xl bg-white/10 px-4 py-3 text-sm text-white ring-1 ring-white/20 outline-none" /></label>
        <label className="mt-4 block"><span className="text-xs font-semibold text-white/80">Password</span><input type="password" required value={password} onChange={(event) => setPassword(event.target.value)} className="mt-1.5 w-full rounded-xl bg-white/10 px-4 py-3 text-sm text-white ring-1 ring-white/20 outline-none focus:ring-2 focus:ring-brand" /></label>
        {error && <p className="mt-4 rounded-xl bg-red-500/15 px-3 py-2 text-sm text-red-200 ring-1 ring-red-400/25">{error}</p>}
        <button disabled={busy} className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand px-5 py-3.5 text-sm font-semibold text-brand-foreground transition hover:brightness-110 disabled:opacity-60">{busy ? "Signing in…" : "Sign in"}<ArrowRight className="h-4 w-4" /></button>
      </form>
    </main>
  );
}
