"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowRight, LogIn, UserPlus } from "lucide-react";
import { supabase } from "@/lib/supabase";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/account/orders";

  const [mode, setMode] = useState<"sign-in" | "sign-up">("sign-in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError("");
    setNotice("");

    if (mode === "sign-in") {
      const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
      if (signInError) {
        setError(signInError.message);
        setBusy(false);
        return;
      }
      router.push(redirectTo);
      return;
    }

    const { data, error: signUpError } = await supabase.auth.signUp({ email, password });
    if (signUpError) {
      setError(signUpError.message);
      setBusy(false);
      return;
    }
    if (data.session) {
      router.push(redirectTo);
      return;
    }
    setNotice("Account created. Check your email to confirm before signing in.");
    setBusy(false);
  }

  return (
    <form
      onSubmit={onSubmit}
      className="w-full max-w-md rounded-[2rem] bg-ink p-7 text-white shadow-card ring-1 ring-white/10 sm:p-9"
    >
      <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand text-brand-foreground">
        {mode === "sign-in" ? <LogIn className="h-5 w-5" /> : <UserPlus className="h-5 w-5" />}
      </span>
      <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-white/55">
        Numunix account
      </p>
      <h1 className="mt-2 text-3xl font-extrabold">
        {mode === "sign-in" ? "Sign in to continue" : "Create your account"}
      </h1>
      <p className="mt-2 text-sm text-white/70">
        {mode === "sign-in"
          ? "Sign in to save your quote and book pickup."
          : "Your selected model and answers will be kept after login."}
      </p>

      <label className="mt-7 block">
        <span className="text-xs font-semibold text-white/80">Email</span>
        <input
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="mt-1.5 w-full rounded-xl bg-white/10 px-4 py-3 text-sm text-white ring-1 ring-white/20 outline-none focus:ring-2 focus:ring-brand"
        />
      </label>
      <label className="mt-4 block">
        <span className="text-xs font-semibold text-white/80">Password</span>
        <input
          type="password"
          required
          minLength={6}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="mt-1.5 w-full rounded-xl bg-white/10 px-4 py-3 text-sm text-white ring-1 ring-white/20 outline-none focus:ring-2 focus:ring-brand"
        />
      </label>

      {error && (
        <p className="mt-4 rounded-xl bg-red-500/15 px-3 py-2 text-sm text-red-200 ring-1 ring-red-400/25">
          {error}
        </p>
      )}
      {notice && (
        <p className="mt-4 rounded-xl bg-emerald-500/15 px-3 py-2 text-sm text-emerald-200 ring-1 ring-emerald-400/25">
          {notice}
        </p>
      )}

      <button
        disabled={busy}
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand px-5 py-3.5 text-sm font-semibold text-brand-foreground transition hover:brightness-110 disabled:opacity-60"
      >
        {busy ? "Please wait…" : mode === "sign-in" ? "Sign in" : "Create account"}
        <ArrowRight className="h-4 w-4" />
      </button>

      <button
        type="button"
        onClick={() => {
          setMode(mode === "sign-in" ? "sign-up" : "sign-in");
          setError("");
          setNotice("");
        }}
        className="mt-4 w-full text-center text-xs font-semibold text-white/70 hover:text-white"
      >
        {mode === "sign-in" ? "New here? Create an account" : "Already have an account? Sign in"}
      </button>
    </form>
  );
}
