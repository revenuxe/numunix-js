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
    meta: [{ title: "Service Management Dashboard | Numunix" }, { name: "description", content: "Private workspace for managing service enquiries, bookings, customers, technicians, jobs and invoices." }, { property: "og:title", content: "Service Management Dashboard | Numunix" }, { property: "og:description", content: "Private operations workspace for service teams." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" }, { name: "robots", content: "noindex, nofollow" }],
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
    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-accent text-xs font-semibold text-primary">
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
  const [leadTab, setLeadTab] = useState<"all" | "callbacks">("all");
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
    if (access === "signed-out") window.location.replace("https://app.numunix.com");
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
    if (tab === "leads" && leadTab === "callbacks") request = request.eq("name", "Callback request");
    if (filter !== "all") request = request.eq("status", filter);
    if (serviceFilter !== "all") request = request.eq("service", serviceFilter);
    else if (categoryFilter !== "all") request = request.in("service", REPAIR_PAGES.filter(item => item.category === categoryFilter).map(item => item.name));
    if (query)
      request = request.or(
        `name.ilike.%${query}%,phone.ilike.%${query}%,service.ilike.%${query}%,brand.ilike.%${query}%,description.ilike.%${query}%,booking_reference.ilike.%${query}%`,
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
  }, [access, tab, leadTab, query, filter, categoryFilter, serviceFilter, sort, page, refresh]);

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
    } else window.location.replace("https://app.numunix.com");
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
      <main className="admin-workspace flex min-h-svh items-center justify-center bg-secondary px-5">
        <div className="w-full max-w-sm rounded-lg border border-border bg-card p-8 text-center">
          <ShieldCheck className="mx-auto text-primary" size={30} strokeWidth={1.5} />
          <h1 className="mt-5 text-xl font-semibold text-foreground">
            {access === "loading" || access === "signed-out"
              ? "Opening your workspace…"
              : access === "forbidden"
                ? "Admin access required"
                : "Workspace unavailable"}
          </h1>
          <p role="status" className="mt-3 text-sm leading-relaxed text-muted-foreground">
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
                href="https://app.numunix.com"
                className="rounded-md bg-primary px-4 py-3 text-sm text-primary-foreground"
              >
                Back to sign in
              </a>
              {session && (
                <Button onClick={signOut} className="min-h-11 text-sm text-muted-foreground">
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
      <Button variant="ghost"
        onClick={() => setSelected(lead)}
        aria-label={`View ${lead.name}`}
        className="grid h-11 w-11 place-items-center rounded-md text-muted-foreground transition hover:bg-accent hover:text-primary"
      >
        <Eye size={18} strokeWidth={1.6} />
      </Button>
      <Button variant="ghost"
        onClick={() => requestDelete(lead)}
        aria-label={`Delete ${lead.name}`}
        className="grid h-11 w-11 place-items-center rounded-md text-muted-foreground transition hover:bg-destructive/10 hover:text-destructive"
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
    <div className="admin-workspace min-h-svh bg-secondary text-foreground">
      {/* ── Sidebar ───────────────────────────────────────── */}
      <aside className="fixed inset-y-0 left-0 hidden w-[232px] flex-col bg-ink-900 p-6 text-primary-foreground xl:flex">
        <BrandLogo className="mt-3 w-36" />
        <p className="mb-3 mt-14 text-[10px] font-medium tracking-normal text-muted-foreground">
          WORKSPACE
        </p>
        {tabs.map((t) => (
          <Button variant="ghost"
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`mt-1 flex items-center gap-3 rounded-md px-4 py-3 text-sm transition-colors ${
              tab === t.key
                ? "border border-primary-foreground/5 bg-card/8 text-primary-foreground"
                : "text-muted-foreground hover:bg-card/5 hover:text-primary-foreground"
            }`}
          >
            <t.icon size={17} strokeWidth={1.6} />
            {t.label}
          </Button>
        ))}
        <a
          href="/"
          className="mt-3 flex items-center gap-3 rounded-md px-4 py-3 text-sm text-muted-foreground hover:bg-card/5 hover:text-primary-foreground"
        >
          <ArrowUpRight size={17} />
          View website
        </a>
        <div className="mt-auto rounded-lg border border-primary-foreground/8 bg-card/[0.03] p-4">
          <span className="flex items-center gap-2 text-xs text-muted-foreground">
            <ShieldCheck size={15} /> Private workspace
          </span>
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
            A little follow-up goes a long way.
          </p>
        </div>
        <Button variant="ghost"
          onClick={signOut}
          disabled={signingOut}
          className="mt-5 flex min-h-11 items-center gap-3 px-3 text-sm text-muted-foreground hover:text-primary-foreground"
        >
          <LogOut size={16} />
          {signingOut ? "Signing out…" : "Sign out"}
        </Button>
      </aside>

      {/* ── Main area ─────────────────────────────────────── */}
      <div className="xl:pl-[232px]">
        {/* Top bar */}
        <header className="sticky top-0 z-30 flex min-h-18 items-center justify-between gap-3 border-b border-border/80 bg-card/95 px-4 py-4 backdrop-blur-sm sm:px-8">
          <div className="flex min-w-0 items-center gap-3">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-md bg-primary text-primary-foreground xl:hidden">
              <LayoutDashboard size={18} />
            </span>
            <span className="text-sm font-medium text-muted-foreground">Repair lead desk</span>
            <span className="hidden text-xs text-muted-foreground sm:inline">/</span>
            <span className="hidden text-xs text-muted-foreground sm:inline">
              {tab === "overview" ? "Overview" : "Leads"}
            </span>
          </div>
          <div className="flex min-w-0 items-center gap-3">
            <div className="hidden min-w-0 text-right sm:block">
              <p className="max-w-52 truncate text-xs font-medium text-foreground">
                {session?.user.email}
              </p>
              <p className="mt-0.5 text-[10px] text-muted-foreground">Administrator</p>
            </div>
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-border bg-accent text-xs font-semibold text-primary">
              {session?.user.email?.slice(0, 2).toUpperCase()}
            </span>
            <Button variant="ghost"
              onClick={signOut}
              disabled={signingOut}
              aria-label="Sign out"
              className="grid h-11 w-11 place-items-center rounded-md text-muted-foreground hover:bg-secondary xl:hidden"
            >
              <LogOut size={17} />
            </Button>
          </div>
        </header>

        {/* Mobile tab bar */}
        <div className="flex border-b border-border/80 bg-card xl:hidden">
          {tabs.map((t) => (
            <Button variant="ghost"
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`flex flex-1 items-center justify-center gap-2 px-4 py-3 text-sm font-medium transition-colors ${
                tab === t.key
                  ? "border-b-2 border-primary text-primary"
                  : "text-muted-foreground hover:text-muted-foreground"
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
              className="mb-5 flex items-center justify-between gap-3 rounded-md border border-border bg-accent px-4 py-2 text-sm text-primary"
            >
              {notice}
              <Button variant="ghost"
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
                  <p className="text-[10px] font-semibold tracking-normal text-primary">
                    REPAIR ENQUIRIES AT A GLANCE
                  </p>
                  <h1 className="mt-2 text-2xl font-semibold tracking-normal sm:text-3xl">
                    Repair overview
                  </h1>
                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
                    Electronics & appliances
                  </p>
                </div>
                <Button variant="ghost"
                  onClick={() => setRefresh((value) => value + 1)}
                  disabled={loading}
                  aria-label="Refresh leads"
                  className="flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-md border border-border bg-card px-3 text-sm text-muted-foreground hover:bg-secondary disabled:opacity-50"
                >
                  <RefreshCw size={15} className={loading ? "animate-spin" : ""} />
                  <span className="hidden sm:inline">Refresh</span>
                </Button>
              </div>

              {/* Metric cards */}
              <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
                {[
                  {
                    key: "all" as const,
                    label: "Repair requests",
                    caption: "All repair enquiries",
                    icon: Users,
                    bgLight: "bg-accent",
                    textAccent: "text-primary",
                  },
                  {
                    key: "new" as const,
                    label: "New enquiries",
                    caption: "Ready for a first reply",
                    icon: Inbox,
                    bgLight: "bg-accent",
                    textAccent: "text-primary",
                  },
                  {
                    key: "qualified" as const,
                    label: "Assessment arranged",
                    caption: "Awaiting assessment",
                    icon: SlidersHorizontal,
                    bgLight: "bg-accent",
                    textAccent: "text-primary",
                  },
                  {
                    key: "won" as const,
                    label: "Repair booked",
                    caption: "Customer approved booking",
                    icon: Check,
                    bgLight: "bg-accent",
                    textAccent: "text-primary",
                  },
                ].map(({ key, label, caption, icon: Icon, bgLight, textAccent }) => (
                  <div
                    key={key}
                    className="group relative overflow-hidden rounded-lg border border-border/80 bg-card p-4 transition-all hover:border-primary/30 hover:shadow-sm"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-medium text-muted-foreground">{label}</span>
                      <span
                        className={`grid h-9 w-9 place-items-center rounded-md ${bgLight} ${textAccent}`}
                      >
                        <Icon size={16} strokeWidth={1.8} />
                      </span>
                    </div>
                    <p className="mt-3 text-3xl font-semibold tracking-normal text-foreground">
                      {countsError ? "—" : counts[key]}
                    </p>
                    <p className="mt-2 text-[11px] text-muted-foreground">{caption}</p>
                  </div>
                ))}
              </div>

              {/* Quick stats row */}
              <div className="mt-4 grid grid-cols-3 gap-2 lg:gap-4">
                <div className="flex flex-col items-start gap-2 rounded-lg border border-border bg-card p-3 sm:flex-row sm:items-center sm:gap-3 sm:p-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-md bg-accent text-primary">
                    <TrendingUp size={18} strokeWidth={1.8} />
                  </span>
                  <div>
                    <p className="text-2xl font-semibold tracking-normal text-foreground">
                      {countsError ? "—" : `${conversionRate}%`}
                    </p>
                    <p className="text-[11px] text-muted-foreground">Booking rate</p>
                  </div>
                </div>
                <div className="flex flex-col items-start gap-2 rounded-lg border border-border bg-card p-3 sm:flex-row sm:items-center sm:gap-3 sm:p-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-md bg-accent text-primary">
                    <Zap size={18} strokeWidth={1.8} />
                  </span>
                  <div>
                    <p className="text-2xl font-semibold tracking-normal text-foreground">
                      {countsError
                        ? "—"
                        : counts.all - counts.new - counts.qualified - counts.won}
                    </p>
                    <p className="text-[11px] text-muted-foreground">Contacted / closed</p>
                  </div>
                </div>
                <div className="flex flex-col items-start gap-2 rounded-lg border border-border bg-card p-3 sm:flex-row sm:items-center sm:gap-3 sm:p-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-md bg-accent text-primary">
                    <Clock size={18} strokeWidth={1.8} />
                  </span>
                  <div>
                    <p className="text-2xl font-semibold tracking-normal text-foreground">
                      {countsError ? "—" : counts.new}
                    </p>
                    <p className="text-[11px] text-muted-foreground">Awaiting first reply</p>
                  </div>
                </div>
              </div>

              {/* Recent leads + Quick actions */}
              <div className="mt-5 grid gap-5 lg:grid-cols-[2fr_1fr]">
                {/* Recent leads */}
                <section className="overflow-hidden rounded-lg border border-border/80 bg-card">
                  <div className="flex items-center justify-between border-b border-border px-5 py-4">
                    <h2 className="text-sm font-semibold text-foreground">Recent enquiries</h2>
                    <Button variant="ghost"
                      onClick={() => setTab("leads")}
                      className="flex items-center gap-1 text-xs font-medium text-primary hover:text-primary"
                    >
                      View all <ArrowUpRight size={13} />
                    </Button>
                  </div>
                  {loading ? (
                    <div className="space-y-3 p-5">
                      {[0, 1, 2, 3].map((v) => (
                        <div key={v} className="h-14 animate-pulse rounded-md bg-secondary" />
                      ))}
                    </div>
                  ) : recentLeads.length === 0 ? (
                    <div className="px-5 py-12 text-center">
                      <Inbox size={28} className="mx-auto text-muted-foreground" strokeWidth={1.4} />
                      <p className="mt-3 text-sm text-muted-foreground">No enquiries yet</p>
                    </div>
                  ) : (
                    <div className="divide-y divide-border">
                      {recentLeads.map((lead) => (
                        <Button variant="ghost"
                          key={lead.id}
                          onClick={() => setSelected(lead)}
                          className="h-auto min-h-20 w-full justify-start whitespace-normal rounded-none px-4 py-4 text-left transition-colors hover:bg-secondary"
                        >
                          <LeadAvatar name={lead.name} />
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between gap-2">
                              <p className="truncate text-sm font-medium text-foreground">
                                {lead.name}
                              </p>
                              <span className="shrink-0 text-[11px] text-muted-foreground">
                                {relativeTime(lead.created_at)}
                              </span>
                            </div>
                            <div className="mt-1 flex flex-wrap items-center gap-2">
                              <span className="truncate text-xs text-muted-foreground">
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
                <section className="rounded-lg border border-border/80 bg-card p-5">
                  <h2 className="text-sm font-semibold text-foreground">Repair request stages</h2>
                  <div className="mt-5 space-y-4">
                    {(
                      [
                        {
                          status: "new" as const,
                          color: "bg-accent0",
                          label: "New",
                        },
                        {
                          status: "qualified" as const,
                          color: "bg-accent0",
                          label: "Assessment arranged",
                        },
                        {
                          status: "won" as const,
                          color: "bg-accent0",
                          label: "Repair booked",
                        },
                      ] as const
                    ).map(({ status, color, label }) => {
                      const pct = counts.all > 0 ? (counts[status] / counts.all) * 100 : 0;
                      return (
                        <div key={status}>
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-medium text-muted-foreground">{label}</span>
                            <span className="text-muted-foreground">
                              {counts[status]} · {Math.round(pct)}%
                            </span>
                          </div>
                          <div className="mt-2 h-2 overflow-hidden rounded-full bg-secondary">
                            <div
                              className={`h-full rounded-full ${color} transition-all duration-500`}
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </section>
              </div>

              <p className="mt-7 text-center text-[11px] text-muted-foreground">
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
                  <p className="text-[10px] font-semibold tracking-normal text-primary">
                    REPAIR LEAD MANAGEMENT
                  </p>
                  <h1 className="mt-2 text-2xl font-semibold tracking-normal sm:text-3xl">
                    All repair enquiries
                  </h1>
                </div>
                <Button variant="ghost"
                  onClick={() => setRefresh((value) => value + 1)}
                  disabled={loading}
                  aria-label="Refresh leads"
                  className="flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-md border border-border bg-card px-3 text-sm text-muted-foreground hover:bg-secondary disabled:opacity-50"
                >
                  <RefreshCw size={15} className={loading ? "animate-spin" : ""} />
                  <span className="hidden sm:inline">Refresh</span>
                </Button>
              </div>

              <div aria-label="Lead type" className="mt-5 flex flex-wrap gap-2">
                {([{ key: "all", label: "All enquiries" }, { key: "callbacks", label: "Callback requested" }] as const).map(item => (
                  <Button key={item.key} variant={leadTab === item.key ? "default" : "outline"} aria-pressed={leadTab === item.key} onClick={() => { setLeadTab(item.key); setPage(0); }} className="min-h-11">
                    {item.label}
                  </Button>
                ))}
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
                  <Button variant="ghost"
                    key={key}
                    onClick={() => {
                      setFilter(key);
                      setPage(0);
                    }}
                    aria-pressed={filter === key}
                    className={`h-auto min-h-16 justify-start whitespace-normal gap-2 rounded-md border px-3 py-3 text-left transition ${
                      filter === key
                        ? "border-primary bg-accent/50 shadow-none"
                        : "border-border/80 bg-card hover:border-primary/30"
                    }`}
                  >
                    <Icon
                      size={16}
                      strokeWidth={1.6}
                      className={filter === key ? "text-primary" : "text-muted-foreground"}
                    />
                    <div>
                      <span
                        className={`text-lg font-bold ${filter === key ? "text-primary" : "text-foreground"}`}
                      >
                        {countsError ? "—" : counts[key]}
                      </span>
                      <span className="block text-xs text-muted-foreground">{label}</span>
                    </div>
                  </Button>
                ))}
              </div>

              {/* Leads table section */}
              <section
                aria-label="Lead enquiries"
                className="mt-5 overflow-hidden rounded-lg border border-border/80 bg-card"
              >
                {/* Search and filter bar */}
                <div className="border-b border-border p-4 sm:p-5">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <h2 className="text-base font-semibold">
                      {leadTab === "callbacks" ? "Callback requests" : "Enquiries"}{" "}
                      <span className="ml-2 rounded-md bg-secondary px-2 py-0.5 text-xs font-medium text-muted-foreground">
                        {loading ? "…" : total}
                      </span>
                    </h2>
                    <label className="relative w-full sm:w-72">
                      <Search size={16} className="absolute left-3.5 top-3.5 text-muted-foreground" />
                      <span className="sr-only">Search leads</span>
                      <input
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                        placeholder="Search name, phone, service…"
                        maxLength={100}
                        className="h-11 w-full rounded-md border border-border bg-secondary/50 pl-10 pr-3 text-base outline-none focus:border-primary focus:ring-2 focus:ring-ring/20 sm:text-sm"
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
                        <Button variant="ghost"
                          key={value}
                          aria-pressed={filter === value}
                          onClick={() => {
                            setFilter(value);
                            setPage(0);
                          }}
                          className={`min-h-10 rounded-lg px-3 text-xs font-medium transition ${filter === value ? "bg-accent text-primary" : "text-muted-foreground hover:bg-secondary"}`}
                        >
                          {value === "all" ? "All leads" : STATUS_LABELS[value]}
                        </Button>
                      ))}
                    </div>
                    <label className="flex min-h-10 items-center gap-2 text-xs text-muted-foreground">
                      <span>Sort:</span>
                      <select
                        aria-label="Sort leads"
                        value={sort}
                        onChange={(event) => {
                          setSort(event.target.value);
                          setPage(0);
                        }}
                        className="min-h-10 rounded-lg bg-card pr-2 text-xs font-medium text-muted-foreground outline-ring"
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
                      <div key={value} className="h-16 animate-pulse rounded-md bg-secondary" />
                    ))}
                  </div>
                ) : error ? (
                  <div role="alert" className="p-8 text-center">
                    <p className="text-sm text-destructive">{error}</p>
                    <Button variant="ghost"
                      onClick={() => setRefresh((value) => value + 1)}
                      className="mt-4 min-h-11 rounded-md bg-primary px-5 text-sm text-primary-foreground"
                    >
                      Try again
                    </Button>
                  </div>
                ) : leads.length === 0 ? (
                  <div className="px-5 py-16 text-center">
                    <span className="mx-auto grid h-14 w-14 place-items-center rounded-lg bg-secondary text-muted-foreground">
                      <Inbox size={25} strokeWidth={1.4} />
                    </span>
                    <h3 className="mt-4 text-base font-semibold">
                      {query || filter !== "all" || categoryFilter !== "all" || serviceFilter !== "all"
                        ? "No matching leads"
                        : "No repair requests yet"}
                    </h3>
                    <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
                      {query || filter !== "all" || categoryFilter !== "all" || serviceFilter !== "all"
                        ? "Try another search or clear your filters."
                        : "Enquiries from your homepage and contact form will appear here."}
                    </p>
                    {(query || filter !== "all" || categoryFilter !== "all" || serviceFilter !== "all") && (
                      <Button variant="ghost"
                        onClick={() => {
                          setSearch("");
                          setQuery("");
                          setFilter("all");
                          setCategoryFilter("all");
                          setServiceFilter("all");
                          setPage(0);
                        }}
                        className="mt-4 min-h-11 text-sm font-medium text-primary"
                      >
                        Clear filters
                      </Button>
                    )}
                  </div>
                ) : (
                  <>
                    {/* Mobile cards */}
                    <div className="divide-y divide-border md:hidden">
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
                                  <p className="mt-1 break-all font-mono text-xs text-muted-foreground">ID: {lead.booking_reference ?? lead.id}</p>
                                  <p className="mt-1 break-words text-xs text-muted-foreground">
                                    {lead.service}
                                    {lead.brand && <span className="mt-1 block">Brand: {lead.brand}</span>}
                                    <span className="mt-1 block text-muted-foreground">{repairLeadCategory(lead) === "appliances" ? "Appliances" : repairLeadCategory(lead) === "electronics" ? "Electronics" : "Other enquiry"} · {lead.timeline}</span>
                                  </p>
                                </div>
                                <StatusBadge status={lead.status} />
                              </div>
                              <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                                {lead.phone && (
                                  <a
                                    href={`tel:${lead.phone.replace(/[^\d+]/g, "")}`}
                                    className="inline-flex items-center gap-1 hover:text-primary"
                                  >
                                    <Phone size={12} /> {lead.phone}
                                  </a>
                                )}
                                {lead.email && (
                                  <a
                                    href={`mailto:${lead.email}`}
                                    className="inline-flex items-center gap-1 hover:text-primary"
                                  >
                                    <Mail size={12} />{" "}
                                    <span className="max-w-[160px] truncate">{lead.email}</span>
                                  </a>
                                )}
                              </div>
                              <div className="mt-2 flex items-center justify-between">
                                <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground">
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
                        <thead className="border-b border-border bg-secondary/60 text-[10px] uppercase tracking-normal text-muted-foreground">
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
                        <tbody className="divide-y divide-border">
                          {leads.map((lead) => (
                            <tr
                              key={lead.id}
                              className="group transition-colors hover:bg-secondary/50"
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
                                    <p className="mt-1 break-all font-mono text-xs text-muted-foreground">ID: {lead.booking_reference ?? lead.id}</p>
                                  </div>
                                </div>
                              </td>
                              <td className="px-5 py-4">
                                <div className="space-y-1 text-xs text-muted-foreground">
                                  {lead.phone && (
                                    <a
                                      href={`tel:${lead.phone.replace(/[^\d+]/g, "")}`}
                                      className="flex items-center gap-1.5 hover:text-primary"
                                    >
                                      <Phone size={12} className="shrink-0" /> {lead.phone}
                                    </a>
                                  )}
                                  {lead.email && (
                                    <a
                                      href={`mailto:${lead.email}`}
                                      className="flex items-center gap-1.5 hover:text-primary"
                                    >
                                      <Mail size={12} className="shrink-0" />
                                      <span className="max-w-36 truncate">{lead.email}</span>
                                    </a>
                                  )}
                                </div>
                              </td>
                              <td className="max-w-52 px-5 py-4 text-xs text-muted-foreground">
                                {lead.service}{lead.brand && <span className="mt-1 block">Brand: {lead.brand}</span>}<span className="mt-1 block text-muted-foreground">{lead.timeline}</span>
                              </td>
                              <td className="px-5 py-4">
                                <StatusBadge status={lead.status} />
                              </td>
                              <td className="whitespace-nowrap px-5 py-4">
                                <div className="text-xs text-muted-foreground">
                                  {formatDate(lead.created_at)}
                                </div>
                                <div className="mt-0.5 text-[11px] text-muted-foreground">
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
                <div className="flex items-center justify-between gap-3 border-t border-border px-4 py-3 sm:px-5">
                  <p className="text-[11px] text-muted-foreground">
                    {loading
                      ? "Loading…"
                      : error
                        ? "Results unavailable"
                        : `${total ? page * PAGE_SIZE + 1 : 0}–${Math.min((page + 1) * PAGE_SIZE, total)} of ${total} leads`}
                  </p>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost"
                      aria-label="Previous page"
                      disabled={page === 0 || loading}
                      onClick={() => setPage((value) => value - 1)}
                      className="grid h-10 w-10 place-items-center rounded-lg border border-border text-muted-foreground disabled:opacity-30"
                    >
                      <ChevronLeft size={16} />
                    </Button>
                    <span className="px-1 text-xs text-muted-foreground">{page + 1}</span>
                    <Button variant="ghost"
                      aria-label="Next page"
                      disabled={(page + 1) * PAGE_SIZE >= total || loading}
                      onClick={() => setPage((value) => value + 1)}
                      className="grid h-10 w-10 place-items-center rounded-lg border border-border text-muted-foreground disabled:opacity-30"
                    >
                      <ChevronRight size={16} />
                    </Button>
                  </div>
                </div>
              </section>

              <p className="mt-5 text-center text-[11px] text-muted-foreground">
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
        <AlertDialogContent className="admin-workspace w-[calc(100%_-_32px)] max-w-sm rounded-lg border-border bg-card p-6 sm:rounded-lg">
          <span className="grid h-12 w-12 place-items-center rounded-lg bg-destructive/10 text-destructive">
            <Trash2 size={22} strokeWidth={1.5} />
          </span>
          <AlertDialogTitle className="text-lg text-foreground">Delete this lead?</AlertDialogTitle>
          <AlertDialogDescription className="break-words text-sm leading-relaxed text-muted-foreground">
            This permanently removes {deleteLead?.name}'s enquiry and internal notes. This action
            cannot be undone.
          </AlertDialogDescription>
          {deleteError && (
            <p role="alert" className="text-sm text-destructive">
              {deleteError}
            </p>
          )}
          <div className="mt-2 grid grid-cols-2 gap-3">
            <AlertDialogCancel disabled={deleting} className="m-0 min-h-11 rounded-md">
              Keep lead
            </AlertDialogCancel>
            <Button variant="destructive"
              onClick={confirmDelete}
              disabled={deleting}
              className="min-h-11 rounded-md bg-destructive px-4 text-sm font-medium text-primary-foreground hover:bg-destructive disabled:opacity-50"
            >
              {deleting ? "Deleting…" : "Delete lead"}
            </Button>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
