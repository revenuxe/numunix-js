import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, useMemo } from "react";
import {
  ArrowUpRight,
  Calendar,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  Eye,
  Inbox,
  LayoutDashboard,
  LogOut,
  Mail,
  Phone,
  RefreshCw,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Trash2,
  TrendingUp,
  Users,
  X,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { REPAIR_PAGES } from "@/content/repair-services";
import { repairLeadCategory } from "@/lib/repair-leads";
import { BrandLogo } from "@/components/numunix/BrandLogo";
import { useAdminSession } from "@/components/admin/useAdminSession";
import { LeadDetails } from "@/components/admin/LeadDetails";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { getSupabase } from "@/lib/supabase";
import {
  escapeLeadSearch,
  LEAD_STATUSES,
  STATUS_CLASSES,
  STATUS_LABELS,
  type Lead,
  type LeadStatus,
} from "@/lib/leads";

export const Route = createFileRoute("/admin/dashboard")({
  head: () => ({
    meta: [{ title: "Repair Lead Dashboard | Numunix" }, { name: "description", content: "Private repair enquiry management for Numunix." }, { property: "og:title", content: "Repair Lead Dashboard | Numunix" }, { property: "og:description", content: "Private electronics and appliance repair leads." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" }, { name: "robots", content: "noindex, nofollow" }],
  }),
  component: AdminDashboard,
});

const PAGE_SIZE = 12;
const blankCounts = { all: 0, new: 0, qualified: 0, won: 0 };

type Tab = "overview" | "leads";

/* ── Tiny helpers ───────────────────────────────────────────── */

function StatusBadge({ status }: { status: LeadStatus }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium ${STATUS_CLASSES[status]}`}
    >
      <span className="h-1 w-1 rounded-full bg-current" />
      {STATUS_LABELS[status]}
    </span>
  );
}

function LeadAvatar({ name }: { name: string }) {
  return (
    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#eef3fc] text-xs font-semibold text-[#42649c]">
      {name
        .split(/\s+/)
        .slice(0, 2)
        .map((word) => word[0])
        .join("")
        .toUpperCase()}
    </span>
  );
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function relativeTime(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60_000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 7) return `${days}d ago`;
  return formatDate(iso);
}

/* ── Main component ─────────────────────────────────────────── */

function AdminDashboard() {
  const { session, access } = useAdminSession();
  const [tab, setTab] = useState<Tab>("overview");
  const [leads, setLeads] = useState<Lead[]>([]);
  const [counts, setCounts] = useState(blankCounts);
  const [countsError, setCountsError] = useState(false);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<LeadStatus | "all">("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [serviceFilter, setServiceFilter] = useState("all");
  const [sort, setSort] = useState("newest");
  const [page, setPage] = useState(0);
  const [refresh, setRefresh] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [selected, setSelected] = useState<Lead | null>(null);
  const [deleteLead, setDeleteLead] = useState<Lead | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState("");
  const [signingOut, setSigningOut] = useState(false);

  useEffect(() => {
    if (access === "signed-out") window.location.replace("/admin/login");
    if (access !== "ready") {
      setLeads([]);
      setSelected(null);
      setDeleteLead(null);
    }
  }, [access]);
  useEffect(() => {
    const timer = setTimeout(() => {
      setQuery(escapeLeadSearch(search));
      setPage(0);
    }, 300);
    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    const client = getSupabase();
    if (access !== "ready" || !client) return;
    const controller = new AbortController();
    setLoading(true);
    setError("");
    let request = client.from("contact_enquiries").select("*", { count: "exact" });
    if (filter !== "all") request = request.eq("status", filter);
    if (serviceFilter !== "all") request = request.eq("service", serviceFilter);
    else if (categoryFilter !== "all") request = request.in("service", REPAIR_PAGES.filter(item => item.category === categoryFilter).map(item => item.name));
    if (query)
      request = request.or(
        `name.ilike.%${query}%,phone.ilike.%${query}%,service.ilike.%${query}%,description.ilike.%${query}%`,
      );
    request
      .order("created_at", { ascending: sort === "oldest" })
      .order("id")
      .range(page * PAGE_SIZE, (page + 1) * PAGE_SIZE - 1)
      .abortSignal(controller.signal)
      .then(({ data, count, error: loadError }) => {
        if (controller.signal.aborted) return;
        if (loadError) {
          setError(
            "We couldn't load the leads. Check your connection and workspace access, then refresh.",
          );
          setLeads([]);
        } else {
          setLeads((data ?? []) as Lead[]);
          setTotal(count ?? 0);
          if (page > 0 && (data?.length ?? 0) === 0)
            setPage(Math.max(0, Math.ceil((count ?? 0) / PAGE_SIZE) - 1));
        }
        setLoading(false);
      });
    return () => controller.abort();
  }, [access, query, filter, categoryFilter, serviceFilter, sort, page, refresh]);

  useEffect(() => {
    const client = getSupabase();
    if (access !== "ready" || !client) return;
    let active = true;
    Promise.all(
      (["all", "new", "qualified", "won"] as const).map(async (status) => {
        let request = client.from("contact_enquiries").select("id", { count: "exact", head: true });
        if (status !== "all") request = request.eq("status", status);
        const { count, error: countError } = await request;
        return { status, count: count ?? 0, error: countError };
      }),
    ).then((results) => {
      if (!active) return;
      setCountsError(results.some((result) => Boolean(result.error)));
      setCounts(
        Object.fromEntries(
          results.map((result) => [result.status, result.count]),
        ) as typeof blankCounts,
      );
    });
    return () => {
      active = false;
    };
  }, [access, refresh]);

  async function signOut() {
    const client = getSupabase();
    if (!client || signingOut) return;
    setSigningOut(true);
    const { error: signOutError } = await client.auth.signOut({ scope: "local" });
    if (signOutError) {
      setNotice("Could not sign out. Please try again.");
      setSigningOut(false);
    } else window.location.replace("/admin/login");
  }
  async function confirmDelete() {
    const client = getSupabase();
    if (!client || !deleteLead || deleting) return;
    setDeleting(true);
    setDeleteError("");
    try {
      const { data, error: removeError } = await client
        .from("contact_enquiries")
        .delete()
        .eq("id", deleteLead.id)
        .select("id")
        .single();
      if (removeError || !data)
        throw new Error("Could not delete this lead. Refresh the dashboard and try again.");
      if (selected?.id === deleteLead.id) setSelected(null);
      setDeleteLead(null);
      setNotice("Lead deleted.");
      setRefresh((value) => value + 1);
    } catch (cause) {
      setDeleteError(cause instanceof Error ? cause.message : "Delete failed. Please try again.");
    } finally {
      setDeleting(false);
    }
  }
  function requestDelete(lead: Lead) {
    setDeleteError("");
    setDeleteLead(lead);
  }

  // Derived data for overview
  const recentLeads = useMemo(() => leads.slice(0, 5), [leads]);
  const conversionRate = useMemo(() => {
    if (counts.all === 0) return 0;
    return Math.round((counts.won / counts.all) * 100);
  }, [counts]);

  if (access !== "ready")
    return (
      <main className="flex min-h-svh items-center justify-center bg-[#f5f7fb] px-5">
        <div className="w-full max-w-sm rounded-3xl border border-slate-200 bg-white p-8 text-center">
          <ShieldCheck className="mx-auto text-blue-600" size={30} strokeWidth={1.5} />
          <h1 className="mt-5 text-xl font-semibold text-slate-900">
            {access === "loading" || access === "signed-out"
              ? "Opening your workspace…"
              : access === "forbidden"
                ? "Admin access required"
                : "Workspace unavailable"}
          </h1>
          <p role="status" className="mt-3 text-sm leading-relaxed text-slate-500">
            {access === "forbidden"
              ? "This account is not on the admin access list. Ask the workspace owner to grant access."
              : access === "error"
                ? "We couldn't verify your access. Please retry or contact the workspace owner."
                : access === "unavailable"
                  ? "The workspace connection is still being configured."
                  : "Checking your secure session."}
          </p>
          {!["loading", "signed-out"].includes(access) && (
            <div className="mt-6 flex flex-col gap-3">
              <a
                href="/admin/login"
                className="rounded-xl bg-blue-600 px-4 py-3 text-sm text-white"
              >
                Back to sign in
              </a>
              {session && (
                <Button onClick={signOut} className="min-h-11 text-sm text-slate-500">
                  Sign out
                </Button>
              )}
            </div>
          )}
        </div>
      </main>
    );

  const actionButtons = (lead: Lead) => (
    <div className="flex items-center justify-end gap-1">
      <Button
        onClick={() => setSelected(lead)}
        aria-label={`View ${lead.name}`}
        className="grid h-11 w-11 place-items-center rounded-xl text-slate-500 transition hover:bg-blue-50 hover:text-blue-600"
      >
        <Eye size={18} strokeWidth={1.6} />
      </Button>
      <Button
        onClick={() => requestDelete(lead)}
        aria-label={`Delete ${lead.name}`}
        className="grid h-11 w-11 place-items-center rounded-xl text-slate-400 transition hover:bg-red-50 hover:text-red-600"
      >
        <Trash2 size={17} strokeWidth={1.6} />
      </Button>
    </div>
  );

  const tabs: { key: Tab; label: string; icon: typeof LayoutDashboard }[] = [
    { key: "overview", label: "Overview", icon: LayoutDashboard },
    { key: "leads", label: "Leads", icon: Users },
  ];

  return (
    <div className="min-h-svh bg-[#f5f7fb] text-slate-900">
      {/* ── Sidebar ───────────────────────────────────────── */}
      <aside className="fixed inset-y-0 left-0 hidden w-[232px] flex-col bg-[#0b1730] p-6 text-white xl:flex">
        <BrandLogo className="mt-3 w-36" />
        <p className="mb-3 mt-14 text-[10px] font-medium tracking-[0.18em] text-slate-500">
          WORKSPACE
        </p>
        {tabs.map((t) => (
          <Button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`mt-1 flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition-colors ${
              tab === t.key
                ? "border border-white/5 bg-white/8 text-white"
                : "text-slate-400 hover:bg-white/5 hover:text-white"
            }`}
          >
            <t.icon size={17} strokeWidth={1.6} />
            {t.label}
          </Button>
        ))}
        <a
          href="/"
          className="mt-3 flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-400 hover:bg-white/5 hover:text-white"
        >
          <ArrowUpRight size={17} />
          View website
        </a>
        <div className="mt-auto rounded-2xl border border-white/8 bg-white/[0.03] p-4">
          <span className="flex items-center gap-2 text-xs text-slate-300">
            <ShieldCheck size={15} /> Private workspace
          </span>
          <p className="mt-2 text-xs leading-relaxed text-slate-500">
            A little follow-up goes a long way.
          </p>
        </div>
        <Button
          onClick={signOut}
          disabled={signingOut}
          className="mt-5 flex min-h-11 items-center gap-3 px-3 text-sm text-slate-400 hover:text-white"
        >
          <LogOut size={16} />
          {signingOut ? "Signing out…" : "Sign out"}
        </Button>
      </aside>

      {/* ── Main area ─────────────────────────────────────── */}
      <div className="xl:pl-[232px]">
        {/* Top bar */}
        <header className="sticky top-0 z-30 flex min-h-18 items-center justify-between gap-3 border-b border-slate-200/80 bg-white/95 px-4 py-4 backdrop-blur-sm sm:px-8">
          <div className="flex min-w-0 items-center gap-3">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-blue-600 text-white xl:hidden">
              <LayoutDashboard size={18} />
            </span>
            <span className="text-sm font-medium text-slate-600">Repair lead desk</span>
            <span className="hidden text-xs text-slate-300 sm:inline">/</span>
            <span className="hidden text-xs text-slate-400 sm:inline">
              {tab === "overview" ? "Overview" : "Leads"}
            </span>
          </div>
          <div className="flex min-w-0 items-center gap-3">
            <div className="hidden min-w-0 text-right sm:block">
              <p className="max-w-52 truncate text-xs font-medium text-slate-700">
                {session?.user.email}
              </p>
              <p className="mt-0.5 text-[10px] text-slate-400">Administrator</p>
            </div>
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-blue-100 bg-blue-50 text-xs font-semibold text-blue-600">
              {session?.user.email?.slice(0, 2).toUpperCase()}
            </span>
            <Button
              onClick={signOut}
              disabled={signingOut}
              aria-label="Sign out"
              className="grid h-11 w-11 place-items-center rounded-xl text-slate-500 hover:bg-slate-100 xl:hidden"
            >
              <LogOut size={17} />
            </Button>
          </div>
        </header>

        {/* Mobile tab bar */}
        <div className="flex border-b border-slate-200/80 bg-white xl:hidden">
          {tabs.map((t) => (
            <Button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`flex flex-1 items-center justify-center gap-2 px-4 py-3 text-sm font-medium transition-colors ${
                tab === t.key
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-slate-400 hover:text-slate-600"
              }`}
            >
              <t.icon size={16} />
              {t.label}
            </Button>
          ))}
        </div>

        <main className="mx-auto max-w-[1500px] px-4 py-7 sm:px-8 sm:py-9">
          {/* Notice toast */}
          {notice && (
            <div
              role="status"
              className="mb-5 flex items-center justify-between gap-3 rounded-xl border border-blue-100 bg-blue-50 px-4 py-2 text-sm text-blue-700"
            >
              {notice}
              <Button
                aria-label="Dismiss notification"
                className="grid h-9 w-9 place-items-center"
                onClick={() => setNotice("")}
              >
                <X size={15} />
              </Button>
            </div>
          )}

          {/* ═══════════════════════════════════════════════════
              OVERVIEW TAB
             ═══════════════════════════════════════════════════ */}
          {tab === "overview" && (
            <div className="animate-in fade-in duration-200">
              {/* Header */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[10px] font-semibold tracking-[0.18em] text-blue-600">
                    REPAIR ENQUIRIES AT A GLANCE
                  </p>
                  <h1 className="mt-2 text-[28px] font-semibold tracking-tight sm:text-3xl">
                    Every repair. One desk.
                  </h1>
                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-500">
                    Review faults, arrange assessments and follow up on electronics and appliance repairs.
                  </p>
                </div>
                <Button
                  onClick={() => setRefresh((value) => value + 1)}
                  disabled={loading}
                  aria-label="Refresh leads"
                  className="flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-600 hover:bg-slate-50 disabled:opacity-50"
                >
                  <RefreshCw size={15} className={loading ? "animate-spin" : ""} />
                  <span className="hidden sm:inline">Refresh</span>
                </Button>
              </div>

              {/* Metric cards */}
              <div className="mt-7 grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-5">
                {[
                  {
                    key: "all" as const,
                    label: "Repair requests",
                    caption: "All repair enquiries",
                    icon: Users,
                    gradient: "from-blue-500 to-blue-600",
                    bgLight: "bg-blue-50",
                    textAccent: "text-blue-600",
                  },
                  {
                    key: "new" as const,
                    label: "New enquiries",
                    caption: "Ready for a first reply",
                    icon: Inbox,
                    gradient: "from-amber-500 to-orange-500",
                    bgLight: "bg-amber-50",
                    textAccent: "text-amber-600",
                  },
                  {
                    key: "qualified" as const,
                    label: "Assessment arranged",
                    caption: "Awaiting assessment",
                    icon: SlidersHorizontal,
                    gradient: "from-violet-500 to-purple-600",
                    bgLight: "bg-violet-50",
                    textAccent: "text-violet-600",
                  },
                  {
                    key: "won" as const,
                    label: "Repair booked",
                    caption: "Customer approved booking",
                    icon: Check,
                    gradient: "from-emerald-500 to-green-600",
                    bgLight: "bg-emerald-50",
                    textAccent: "text-emerald-600",
                  },
                ].map(({ key, label, caption, icon: Icon, gradient, bgLight, textAccent }) => (
                  <div
                    key={key}
                    className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5 transition-all hover:border-slate-300 hover:shadow-sm"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-medium text-slate-500">{label}</span>
                      <span
                        className={`grid h-9 w-9 place-items-center rounded-xl ${bgLight} ${textAccent}`}
                      >
                        <Icon size={16} strokeWidth={1.8} />
                      </span>
                    </div>
                    <p className="mt-3 text-4xl font-bold tracking-tight text-slate-900">
                      {countsError ? "—" : counts[key]}
                    </p>
                    <p className="mt-2 text-[11px] text-slate-400">{caption}</p>
                    {/* Subtle gradient accent bar at bottom */}
                    <div
                      className={`absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r ${gradient} opacity-0 transition-opacity group-hover:opacity-100`}
                    />
                  </div>
                ))}
              </div>

              {/* Quick stats row */}
              <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3 lg:gap-5">
                <div className="flex items-center gap-4 rounded-2xl border border-slate-200/80 bg-white p-5">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-emerald-50 text-emerald-600">
                    <TrendingUp size={18} strokeWidth={1.8} />
                  </span>
                  <div>
                    <p className="text-2xl font-bold tracking-tight text-slate-900">
                      {countsError ? "—" : `${conversionRate}%`}
                    </p>
                    <p className="text-[11px] text-slate-400">Booking rate</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 rounded-2xl border border-slate-200/80 bg-white p-5">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-blue-50 text-blue-600">
                    <Zap size={18} strokeWidth={1.8} />
                  </span>
                  <div>
                    <p className="text-2xl font-bold tracking-tight text-slate-900">
                      {countsError
                        ? "—"
                        : counts.all - counts.new - counts.qualified - counts.won}
                    </p>
                    <p className="text-[11px] text-slate-400">Contacted / closed</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 rounded-2xl border border-slate-200/80 bg-white p-5">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-amber-50 text-amber-600">
                    <Clock size={18} strokeWidth={1.8} />
                  </span>
                  <div>
                    <p className="text-2xl font-bold tracking-tight text-slate-900">
                      {countsError ? "—" : counts.new}
                    </p>
                    <p className="text-[11px] text-slate-400">Awaiting first reply</p>
                  </div>
                </div>
              </div>

              {/* Recent leads + Quick actions */}
              <div className="mt-5 grid gap-5 lg:grid-cols-[2fr_1fr]">
                {/* Recent leads */}
                <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white">
                  <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
                    <h2 className="text-sm font-semibold text-slate-900">Recent enquiries</h2>
                    <Button
                      onClick={() => setTab("leads")}
                      className="flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-700"
                    >
                      View all <ArrowUpRight size={13} />
                    </Button>
                  </div>
                  {loading ? (
                    <div className="space-y-3 p-5">
                      {[0, 1, 2, 3].map((v) => (
                        <div key={v} className="h-14 animate-pulse rounded-xl bg-slate-50" />
                      ))}
                    </div>
                  ) : recentLeads.length === 0 ? (
                    <div className="px-5 py-12 text-center">
                      <Inbox size={28} className="mx-auto text-slate-300" strokeWidth={1.4} />
                      <p className="mt-3 text-sm text-slate-400">No enquiries yet</p>
                    </div>
                  ) : (
                    <div className="divide-y divide-slate-50">
                      {recentLeads.map((lead) => (
                        <Button
                          key={lead.id}
                          onClick={() => setSelected(lead)}
                          className="flex w-full items-center gap-3 px-5 py-3.5 text-left transition-colors hover:bg-slate-50/50"
                        >
                          <LeadAvatar name={lead.name} />
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between gap-2">
                              <p className="truncate text-sm font-medium text-slate-800">
                                {lead.name}
                              </p>
                              <span className="shrink-0 text-[11px] text-slate-400">
                                {relativeTime(lead.created_at)}
                              </span>
                            </div>
                            <div className="mt-1 flex items-center gap-2">
                              <span className="truncate text-xs text-slate-400">
                                {lead.service}
                              </span>
                              <StatusBadge status={lead.status} />
                            </div>
                          </div>
                        </Button>
                      ))}
                    </div>
                  )}
                </section>

                {/* Repair request stages */}
                <section className="rounded-2xl border border-slate-200/80 bg-white p-5">
                  <h2 className="text-sm font-semibold text-slate-900">Repair request stages</h2>
                  <div className="mt-5 space-y-4">
                    {(
                      [
                        {
                          status: "new" as const,
                          color: "bg-blue-500",
                          label: "New",
                        },
                        {
                          status: "qualified" as const,
                          color: "bg-violet-500",
                          label: "Assessment arranged",
                        },
                        {
                          status: "won" as const,
                          color: "bg-emerald-500",
                          label: "Repair booked",
                        },
                      ] as const
                    ).map(({ status, color, label }) => {
                      const pct = counts.all > 0 ? (counts[status] / counts.all) * 100 : 0;
                      return (
                        <div key={status}>
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-medium text-slate-600">{label}</span>
                            <span className="text-slate-400">
                              {counts[status]} · {Math.round(pct)}%
                            </span>
                          </div>
                          <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
                            <div
                              className={`h-full rounded-full ${color} transition-all duration-500`}
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="mt-6 rounded-xl border border-slate-100 bg-slate-50/50 p-4">
                    <p className="text-[10px] font-semibold tracking-[0.15em] text-slate-400">
                      PRO TIP
                    </p>
                    <p className="mt-2 text-xs leading-relaxed text-slate-500">
                      Review the model, fault, location and preferred timing before arranging an assessment.
                    </p>
                  </div>
                </section>
              </div>

              <p className="mt-7 text-center text-[11px] text-slate-400">
                Numunix workspace · Electronics and appliance repair enquiries.
              </p>
            </div>
          )}

          {/* ═══════════════════════════════════════════════════
              LEADS TAB
             ═══════════════════════════════════════════════════ */}
          {tab === "leads" && (
            <div className="animate-in fade-in duration-200">
              {/* Header */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[10px] font-semibold tracking-[0.18em] text-blue-600">
                    REPAIR LEAD MANAGEMENT
                  </p>
                  <h1 className="mt-2 text-[28px] font-semibold tracking-tight sm:text-3xl">
                    All repair enquiries
                  </h1>
                </div>
                <Button
                  onClick={() => setRefresh((value) => value + 1)}
                  disabled={loading}
                  aria-label="Refresh leads"
                  className="flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-600 hover:bg-slate-50 disabled:opacity-50"
                >
                  <RefreshCw size={15} className={loading ? "animate-spin" : ""} />
                  <span className="hidden sm:inline">Refresh</span>
                </Button>
              </div>

              {/* Quick filter cards */}
              <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:gap-4">
                {(
                  [
                    { key: "all" as const, label: "All leads", icon: Users },
                    { key: "new" as const, label: "New", icon: Inbox },
                    { key: "qualified" as const, label: "Assessment arranged", icon: SlidersHorizontal },
                    { key: "won" as const, label: "Repair booked", icon: Check },
                  ] as const
                ).map(({ key, label, icon: Icon }) => (
                  <Button
                    key={key}
                    onClick={() => {
                      setFilter(key);
                      setPage(0);
                    }}
                    aria-pressed={filter === key}
                    className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-left transition ${
                      filter === key
                        ? "border-blue-300 bg-blue-50/50 shadow-[0_2px_12px_-8px_rgba(37,99,235,0.3)]"
                        : "border-slate-200/80 bg-white hover:border-blue-200"
                    }`}
                  >
                    <Icon
                      size={16}
                      strokeWidth={1.6}
                      className={filter === key ? "text-blue-600" : "text-slate-400"}
                    />
                    <div>
                      <span
                        className={`text-lg font-bold ${filter === key ? "text-blue-600" : "text-slate-900"}`}
                      >
                        {countsError ? "—" : counts[key]}
                      </span>
                      <span className="ml-2 text-xs text-slate-400">{label}</span>
                    </div>
                  </Button>
                ))}
              </div>

              {/* Leads table section */}
              <section
                aria-label="Lead enquiries"
                className="mt-5 overflow-hidden rounded-[20px] border border-slate-200/80 bg-white"
              >
                {/* Search and filter bar */}
                <div className="border-b border-slate-100 p-4 sm:p-5">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <h2 className="text-base font-semibold">
                      Enquiries{" "}
                      <span className="ml-2 rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-500">
                        {loading ? "…" : total}
                      </span>
                    </h2>
                    <label className="relative w-full sm:w-72">
                      <Search size={16} className="absolute left-3.5 top-3.5 text-slate-400" />
                      <span className="sr-only">Search leads</span>
                      <input
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                        placeholder="Search name, phone, service…"
                        maxLength={100}
                        className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-10 pr-3 text-base outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 sm:text-sm"
                      />
                    </label>
                  </div>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <label className="text-xs text-muted-foreground">Repair category<select aria-label="Repair category" value={categoryFilter} onChange={event => {setCategoryFilter(event.target.value);setServiceFilter("all");setPage(0);}} className="mt-2 h-11 w-full rounded-md border border-border bg-card px-3 text-sm text-foreground"><option value="all">All categories</option><option value="electronics">Electronics</option><option value="appliances">Appliances</option></select></label>
                    <label className="text-xs text-muted-foreground">Repair service<select aria-label="Repair service" value={serviceFilter} onChange={event => {setServiceFilter(event.target.value);setPage(0);}} className="mt-2 h-11 w-full rounded-md border border-border bg-card px-3 text-sm text-foreground"><option value="all">All services</option>{REPAIR_PAGES.filter(item => categoryFilter === "all" || item.category === categoryFilter).map(item => <option key={item.slug} value={item.name}>{item.name}</option>)}</select></label>
                  </div>
                  <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                    <div aria-label="Filter by status" className="flex flex-wrap gap-1">
                      {(["all", ...LEAD_STATUSES] as const).map((value) => (
                        <Button
                          key={value}
                          aria-pressed={filter === value}
                          onClick={() => {
                            setFilter(value);
                            setPage(0);
                          }}
                          className={`min-h-10 rounded-lg px-3 text-xs font-medium transition ${filter === value ? "bg-[#edf3ff] text-blue-700" : "text-slate-500 hover:bg-slate-50"}`}
                        >
                          {value === "all" ? "All leads" : STATUS_LABELS[value]}
                        </Button>
                      ))}
                    </div>
                    <label className="flex min-h-10 items-center gap-2 text-xs text-slate-400">
                      <span>Sort:</span>
                      <select
                        aria-label="Sort leads"
                        value={sort}
                        onChange={(event) => {
                          setSort(event.target.value);
                          setPage(0);
                        }}
                        className="min-h-10 rounded-lg bg-white pr-2 text-xs font-medium text-slate-600 outline-blue-500"
                      >
                        <option value="newest">Newest first</option>
                        <option value="oldest">Oldest first</option>
                      </select>
                    </label>
                  </div>
                </div>

                {/* Table content */}
                {loading ? (
                  <div role="status" className="space-y-3 p-5">
                    <span className="sr-only">Loading leads</span>
                    {[0, 1, 2, 3].map((value) => (
                      <div key={value} className="h-16 animate-pulse rounded-xl bg-slate-50" />
                    ))}
                  </div>
                ) : error ? (
                  <div role="alert" className="p-8 text-center">
                    <p className="text-sm text-red-600">{error}</p>
                    <Button
                      onClick={() => setRefresh((value) => value + 1)}
                      className="mt-4 min-h-11 rounded-xl bg-blue-600 px-5 text-sm text-white"
                    >
                      Try again
                    </Button>
                  </div>
                ) : leads.length === 0 ? (
                  <div className="px-5 py-16 text-center">
                    <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-slate-50 text-slate-400">
                      <Inbox size={25} strokeWidth={1.4} />
                    </span>
                    <h3 className="mt-4 text-base font-semibold">
                      {query || filter !== "all" || categoryFilter !== "all" || serviceFilter !== "all"
                        ? "No matching leads"
                        : "No repair requests yet"}
                    </h3>
                    <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-slate-500">
                      {query || filter !== "all" || categoryFilter !== "all" || serviceFilter !== "all"
                        ? "Try another search or clear your filters."
                        : "Enquiries from your homepage and contact form will appear here."}
                    </p>
                    {(query || filter !== "all" || categoryFilter !== "all" || serviceFilter !== "all") && (
                      <Button
                        onClick={() => {
                          setSearch("");
                          setQuery("");
                          setFilter("all");
                          setCategoryFilter("all");
                          setServiceFilter("all");
                          setPage(0);
                        }}
                        className="mt-4 min-h-11 text-sm font-medium text-blue-600"
                      >
                        Clear filters
                      </Button>
                    )}
                  </div>
                ) : (
                  <>
                    {/* Mobile cards */}
                    <div className="divide-y divide-slate-100 md:hidden">
                      {leads.map((lead) => (
                        <article key={lead.id} className="p-4">
                          <div className="flex items-start gap-3">
                            <LeadAvatar name={lead.name} />
                            <div className="min-w-0 flex-1">
                              <div className="flex items-start justify-between gap-2">
                                <div className="min-w-0">
                                  <h3 className="break-words text-sm font-semibold">
                                    {lead.name}
                                  </h3>
                                  <p className="mt-1 break-words text-xs text-slate-500">
                                    {lead.service}
                                    <span className="mt-1 block text-muted-foreground">{repairLeadCategory(lead) === "appliances" ? "Appliances" : repairLeadCategory(lead) === "electronics" ? "Electronics" : "Other enquiry"} · {lead.timeline}</span>
                                  </p>
                                </div>
                                <StatusBadge status={lead.status} />
                              </div>
                              <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
                                {lead.phone && (
                                  <a
                                    href={`tel:${lead.phone.replace(/[^\d+]/g, "")}`}
                                    className="inline-flex items-center gap-1 hover:text-blue-600"
                                  >
                                    <Phone size={12} /> {lead.phone}
                                  </a>
                                )}
                                {lead.email && (
                                  <a
                                    href={`mailto:${lead.email}`}
                                    className="inline-flex items-center gap-1 hover:text-blue-600"
                                  >
                                    <Mail size={12} />{" "}
                                    <span className="max-w-[160px] truncate">{lead.email}</span>
                                  </a>
                                )}
                              </div>
                              <div className="mt-2 flex items-center justify-between">
                                <span className="inline-flex items-center gap-1 text-[11px] text-slate-400">
                                  <Calendar size={11} /> {formatDate(lead.created_at)}
                                </span>
                                {actionButtons(lead)}
                              </div>
                            </div>
                          </div>
                        </article>
                      ))}
                    </div>

                    {/* Desktop table */}
                    <div className="hidden overflow-x-auto md:block">
                      <table className="w-full text-left text-sm">
                        <thead className="border-b border-slate-100 bg-slate-50/60 text-[10px] uppercase tracking-wider text-slate-400">
                          <tr>
                            {["Customer", "Contact", "Repair service", "Status", "Received", "Actions"].map(
                              (heading) => (
                                <th
                                  scope="col"
                                  key={heading}
                                  className={`px-5 py-3 font-medium ${heading === "Actions" ? "text-right" : ""}`}
                                >
                                  {heading}
                                </th>
                              ),
                            )}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {leads.map((lead) => (
                            <tr
                              key={lead.id}
                              className="group transition-colors hover:bg-slate-50/50"
                            >
                              <td className="px-5 py-4">
                                <div className="flex items-center gap-3">
                                  <LeadAvatar name={lead.name} />
                                  <div className="min-w-0">
                                    <p
                                      className="max-w-48 truncate font-medium"
                                      title={lead.name}
                                    >
                                      {lead.name}
                                    </p>
                                  </div>
                                </div>
                              </td>
                              <td className="px-5 py-4">
                                <div className="space-y-1 text-xs text-slate-500">
                                  {lead.phone && (
                                    <a
                                      href={`tel:${lead.phone.replace(/[^\d+]/g, "")}`}
                                      className="flex items-center gap-1.5 hover:text-blue-600"
                                    >
                                      <Phone size={12} className="shrink-0" /> {lead.phone}
                                    </a>
                                  )}
                                  {lead.email && (
                                    <a
                                      href={`mailto:${lead.email}`}
                                      className="flex items-center gap-1.5 hover:text-blue-600"
                                    >
                                      <Mail size={12} className="shrink-0" />
                                      <span className="max-w-36 truncate">{lead.email}</span>
                                    </a>
                                  )}
                                </div>
                              </td>
                              <td className="max-w-52 px-5 py-4 text-xs text-slate-500">
                                {lead.service}<span className="mt-1 block text-muted-foreground">{lead.timeline}</span>
                              </td>
                              <td className="px-5 py-4">
                                <StatusBadge status={lead.status} />
                              </td>
                              <td className="whitespace-nowrap px-5 py-4">
                                <div className="text-xs text-slate-600">
                                  {formatDate(lead.created_at)}
                                </div>
                                <div className="mt-0.5 text-[11px] text-slate-400">
                                  {formatTime(lead.created_at)}
                                </div>
                              </td>
                              <td className="px-4 py-4">{actionButtons(lead)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </>
                )}

                {/* Pagination */}
                <div className="flex items-center justify-between gap-3 border-t border-slate-100 px-4 py-3 sm:px-5">
                  <p className="text-[11px] text-slate-400">
                    {loading
                      ? "Loading…"
                      : error
                        ? "Results unavailable"
                        : `${total ? page * PAGE_SIZE + 1 : 0}–${Math.min((page + 1) * PAGE_SIZE, total)} of ${total} leads`}
                  </p>
                  <div className="flex items-center gap-2">
                    <Button
                      aria-label="Previous page"
                      disabled={page === 0 || loading}
                      onClick={() => setPage((value) => value - 1)}
                      className="grid h-10 w-10 place-items-center rounded-lg border border-slate-200 text-slate-500 disabled:opacity-30"
                    >
                      <ChevronLeft size={16} />
                    </Button>
                    <span className="px-1 text-xs text-slate-500">{page + 1}</span>
                    <Button
                      aria-label="Next page"
                      disabled={(page + 1) * PAGE_SIZE >= total || loading}
                      onClick={() => setPage((value) => value + 1)}
                      className="grid h-10 w-10 place-items-center rounded-lg border border-slate-200 text-slate-500 disabled:opacity-30"
                    >
                      <ChevronRight size={16} />
                    </Button>
                  </div>
                </div>
              </section>

              <p className="mt-5 text-center text-[11px] text-slate-400">
                Numunix workspace · Electronics and appliance repair enquiries.
              </p>
            </div>
          )}
        </main>
      </div>

      {/* ── Lead detail dialog ────────────────────────────── */}
      {selected && (
        <LeadDetails
          key={selected.id}
          lead={selected}
          onClose={() => setSelected(null)}
          onSaved={() => {
            setSelected(null);
            setNotice("Lead updated.");
            setRefresh((value) => value + 1);
          }}
          onDelete={requestDelete}
        />
      )}

      {/* ── Delete confirmation ───────────────────────────── */}
      <AlertDialog
        open={Boolean(deleteLead)}
        onOpenChange={(open) => {
          if (!open && !deleting) setDeleteLead(null);
        }}
      >
        <AlertDialogContent className="w-[calc(100%-32px)] max-w-sm rounded-[24px] border-slate-200 bg-white p-6 sm:rounded-[24px]">
          <span className="grid h-12 w-12 place-items-center rounded-2xl bg-red-50 text-red-500">
            <Trash2 size={22} strokeWidth={1.5} />
          </span>
          <AlertDialogTitle className="text-lg text-slate-900">Delete this lead?</AlertDialogTitle>
          <AlertDialogDescription className="break-words text-sm leading-relaxed text-slate-500">
            This permanently removes {deleteLead?.name}'s enquiry and internal notes. This action
            cannot be undone.
          </AlertDialogDescription>
          {deleteError && (
            <p role="alert" className="text-sm text-red-600">
              {deleteError}
            </p>
          )}
          <div className="mt-2 grid grid-cols-2 gap-3">
            <AlertDialogCancel disabled={deleting} className="m-0 min-h-11 rounded-xl">
              Keep lead
            </AlertDialogCancel>
            <Button
              onClick={confirmDelete}
              disabled={deleting}
              className="min-h-11 rounded-xl bg-red-600 px-4 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-50"
            >
              {deleting ? "Deleting…" : "Delete lead"}
            </Button>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
