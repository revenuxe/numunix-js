import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { ArrowRight, ArrowUpRight, Eye, EyeOff, LockKeyhole, PanelsTopLeft } from "lucide-react";
import { BrandLogo } from "@/components/numunix/BrandLogo";
import { getSupabase, supabaseConfigured } from "@/lib/supabase";
import { useAdminSession } from "@/components/admin/useAdminSession";

export const Route = createFileRoute("/admin/login")({
  head: () => ({
    meta: [{ title: "Admin login | Numunix" }, { name: "robots", content: "noindex, nofollow" }],
  }),
  component: AdminLogin,
});

function AdminLogin() {
  const { access } = useAdminSession();
  const [showPassword, setShowPassword] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    if (access === "ready") window.location.replace("/admin/dashboard");
  }, [access]);

  async function signIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const client = getSupabase();
    if (!client || pending) return;
    const form = new FormData(event.currentTarget);
    setPending(true);
    setError("");
    try {
      const { error: authError } = await client.auth.signInWithPassword({
        email: String(form.get("email")).trim(),
        password: String(form.get("password")),
      });
      if (authError) setError("Unable to sign in. Check your email and password and try again.");
    } catch {
      setError("Unable to connect. Check your connection and try again.");
    } finally {
      setPending(false);
    }
  }

  const accessError =
    access === "forbidden"
      ? "This account doesn’t have admin access. Contact the workspace owner."
      : access === "error"
        ? "We couldn’t verify your admin access. Please try again later."
        : "";
  return (
    <main className="min-h-svh bg-[#f5f7fb] lg:grid lg:grid-cols-[1fr_1fr]">
      <aside className="relative overflow-hidden bg-[#08152d] p-6 text-white sm:p-10 lg:flex lg:min-h-svh lg:flex-col lg:justify-between lg:p-14">
        <BrandLogo variant="header" className="relative z-10 w-40" />
        <div className="relative z-10 hidden max-w-lg py-20 lg:block">
          <div className="mb-8 grid h-14 w-14 place-items-center rounded-2xl border border-white/15 bg-white/5">
            <PanelsTopLeft size={25} strokeWidth={1.4} />
          </div>
          <span className="text-xs tracking-[0.2em] text-blue-300">NUMUNIX WORKSPACE</span>
          <h1 className="mt-5 text-5xl font-light leading-[1.12] tracking-tight">
            Good relationships
            <br />
            <span className="text-blue-400">start here.</span>
          </h1>
          <p className="mt-6 max-w-sm text-base leading-relaxed text-slate-400">
            One place to review enquiries, follow up with people, and turn conversations into
            projects.
          </p>
          <div className="mt-10 flex gap-3 text-xs text-slate-300">
            <span className="rounded-full border border-white/10 px-4 py-2">Capture</span>
            <span className="rounded-full border border-white/10 px-4 py-2">Connect</span>
            <span className="rounded-full border border-white/10 px-4 py-2">Grow</span>
          </div>
        </div>
        <p className="hidden text-xs text-slate-500 lg:block">
          A focused workspace for the Numunix team.
        </p>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full border border-blue-400/10 bg-blue-600/5 shadow-[0_0_0_70px_rgba(59,130,246,0.025),0_0_0_140px_rgba(59,130,246,0.02)]"
        />
      </aside>
      <section className="flex items-center justify-center px-5 py-12 sm:px-10 lg:py-16">
        <div className="w-full max-w-[400px]">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-500">
            <LockKeyhole size={13} /> Private workspace
          </div>
          <h2 className="text-[32px] font-semibold tracking-tight text-slate-900">Welcome back.</h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-500">
            Sign in to manage your leads and keep the next conversation moving.
          </p>
          {!supabaseConfigured && (
            <p
              role="status"
              className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900"
            >
              Admin sign-in is not available yet. The workspace connection is still being
              configured.
            </p>
          )}
          <form method="post" onSubmit={signIn} className="mt-8 space-y-5">
            <label className="block text-sm font-medium text-slate-700" htmlFor="admin-email">
              Email address
              <input
                id="admin-email"
                name="email"
                type="email"
                autoComplete="username"
                required
                placeholder="you@company.com"
                className="mt-2 h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-base outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
              />
            </label>
            <label className="block text-sm font-medium text-slate-700" htmlFor="admin-password">
              Password
            </label>
            <div className="relative !mt-2">
              <input
                id="admin-password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-4 pr-12 text-base outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                aria-pressed={showPassword}
                className="absolute inset-y-0 right-0 grid w-12 place-items-center rounded-r-xl text-slate-400 hover:text-slate-700"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {(error || accessError) && (
              <p
                role="alert"
                className="rounded-xl bg-red-50 p-3 text-sm leading-relaxed text-red-700"
              >
                {error || accessError}
              </p>
            )}
            <button
              disabled={
                !supabaseConfigured || pending || access === "ready" || access === "loading"
              }
              className="flex min-h-12 w-full items-center justify-center gap-3 rounded-xl bg-blue-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {pending ? "Signing in…" : "Sign in to workspace"}
              <ArrowRight size={17} />
            </button>
          </form>
          <p className="mt-6 text-xs leading-relaxed text-slate-500">
            Access is limited to approved team members. For password or access help, contact your
            workspace owner.
          </p>
          <a
            href="/"
            className="mt-10 inline-flex min-h-11 items-center gap-2 text-sm text-slate-500 hover:text-blue-600"
          >
            Back to website <ArrowUpRight size={15} />
          </a>
        </div>
      </section>
    </main>
  );
}
