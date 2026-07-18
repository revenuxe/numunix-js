import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Eye, LoaderCircle, LogOut, Trash2, X } from "lucide-react";
import { supabase } from "@/lib/supabase";

type Lead = { id: string; created_at: string; name: string; email: string | null; phone: string | null; postal_code: string | null; service: string; message: string | null; source: string };

export const Route = createFileRoute("/admin/dashboard")({ component: AdminDashboard });

function AdminDashboard() {
  const navigate = useNavigate();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Lead | null>(null);
  const [error, setError] = useState("");

  async function loadLeads() {
    setLoading(true);
    const { data, error: fetchError } = await supabase.from("leads").select("*").order("created_at", { ascending: false });
    if (fetchError) setError(fetchError.message);
    else setLeads((data ?? []) as Lead[]);
    setLoading(false);
  }

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user?.email !== "admin@numunix.com") navigate({ to: "/admin/login" });
      else void loadLeads();
    });
  }, []);

  async function deleteLead(id: string) {
    if (!window.confirm("Delete this lead permanently?")) return;
    const { error: deleteError } = await supabase.from("leads").delete().eq("id", id);
    if (deleteError) setError(deleteError.message);
    else { setLeads((current) => current.filter((lead) => lead.id !== id)); setSelected((current) => current?.id === id ? null : current); }
  }

  async function signOut() { await supabase.auth.signOut(); navigate({ to: "/admin/login" }); }

  return <main className="min-h-screen bg-secondary/40 text-ink"><header className="border-b border-border bg-white"><div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5 md:px-8"><div><p className="text-xs font-semibold uppercase tracking-[.2em] text-brand">Numunix admin</p><h1 className="mt-1 text-2xl font-extrabold">Lead dashboard</h1></div><button onClick={signOut} className="inline-flex items-center gap-2 rounded-xl border border-border bg-white px-4 py-2.5 text-sm font-semibold transition hover:bg-secondary"><LogOut className="h-4 w-4" />Sign out</button></div></header><section className="mx-auto max-w-6xl px-4 py-8 md:px-8"><div className="mb-6 flex items-center justify-between"><p className="text-sm text-muted-foreground">{leads.length} saved lead{leads.length === 1 ? "" : "s"}</p><button onClick={() => void loadLeads()} className="text-sm font-semibold text-brand">Refresh</button></div>{error && <p className="mb-5 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700 ring-1 ring-red-200">{error}</p>}{loading ? <div className="grid place-items-center py-20 text-muted-foreground"><LoaderCircle className="h-6 w-6 animate-spin" /></div> : leads.length === 0 ? <div className="rounded-3xl bg-white p-8 text-center text-sm text-muted-foreground ring-1 ring-border">No leads yet.</div> : <div className="grid gap-3">{leads.map((lead) => <article key={lead.id} className="rounded-2xl bg-white p-4 shadow-soft ring-1 ring-border sm:flex sm:items-center sm:justify-between sm:gap-4"><div className="min-w-0"><div className="flex flex-wrap items-center gap-2"><h2 className="font-bold text-ink">{lead.name}</h2><span className="rounded-full bg-brand/10 px-2.5 py-1 text-xs font-semibold text-brand">{lead.service}</span></div><p className="mt-1 truncate text-sm text-muted-foreground">{lead.phone || lead.email || "No mobile number"}</p><p className="mt-1 text-xs text-muted-foreground">{new Date(lead.created_at).toLocaleString()} · {lead.source}</p></div><div className="mt-4 flex gap-2 sm:mt-0"><button onClick={() => setSelected(lead)} aria-label={`View ${lead.name} lead`} className="grid h-10 w-10 place-items-center rounded-xl bg-secondary text-ink transition hover:bg-brand hover:text-brand-foreground"><Eye className="h-4 w-4" /></button><button onClick={() => void deleteLead(lead.id)} aria-label={`Delete ${lead.name} lead`} className="grid h-10 w-10 place-items-center rounded-xl bg-red-50 text-red-700 transition hover:bg-red-600 hover:text-white"><Trash2 className="h-4 w-4" /></button></div></article>)}</div>}</section>{selected && <div className="fixed inset-0 z-50 flex items-end bg-ink/45 p-3 sm:items-center sm:justify-center" role="dialog" aria-modal="true"><section className="w-full max-w-sm rounded-[2rem] bg-white p-6 shadow-card"><div className="flex items-start justify-between gap-4"><div><p className="text-xs font-semibold uppercase tracking-[.2em] text-brand">Lead details</p><h2 className="mt-1 text-2xl font-extrabold">{selected.name}</h2></div><button onClick={() => setSelected(null)} aria-label="Close details" className="grid h-9 w-9 place-items-center rounded-full bg-secondary"><X className="h-4 w-4" /></button></div><dl className="mt-6 space-y-4 text-sm"><Detail label="Service" value={selected.service} /><Detail label="Mobile number" value={selected.phone} /><Detail label="Postal code" value={selected.postal_code} /><Detail label="Source" value={selected.source} /><Detail label="Message" value={selected.message} /><Detail label="Received" value={new Date(selected.created_at).toLocaleString()} /></dl><button onClick={() => void deleteLead(selected.id)} className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-3 text-sm font-semibold text-white"><Trash2 className="h-4 w-4" />Delete lead</button></section></div>}</main>;
}
function Detail({ label, value }: { label: string; value: string | null }) { return <div><dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</dt><dd className="mt-1 break-words text-ink">{value || "—"}</dd></div>; }
