import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import {
  Eye,
  Trash2,
  LogOut,
  MapPin,
  Users,
  Plus,
  X,
  Phone,
  Mail,
  Check,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import {
  listLeads,
  deleteLead,
  updateLeadStatus,
} from "@/lib/leads.functions";
import {
  listPincodes,
  addPincode,
  deletePincode,
  togglePincode,
} from "@/lib/pincodes.functions";

export const Route = createFileRoute("/admin/dashboard")({
  component: AdminDashboardPage,
  head: () => ({
    meta: [
      { title: "Admin Dashboard — Numunix" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
});

type Lead = {
  id: string;
  booking_id: string;
  service: string;
  name: string;
  email: string | null;
  phone: string | null;
  postal_code: string | null;
  message: string | null;
  status: string;
  source: string;
  created_at: string;
};

type Pincode = {
  id: string;
  pincode: string;
  city: string | null;
  active: boolean;
};

function AdminDashboardPage() {
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);
  const [tab, setTab] = useState<"leads" | "pincodes">("leads");
  const [leads, setLeads] = useState<Lead[]>([]);
  const [pincodes, setPincodes] = useState<Pincode[]>([]);
  const [selected, setSelected] = useState<Lead | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchLeads = useServerFn(listLeads);
  const fetchPins = useServerFn(listPincodes);
  const rmLead = useServerFn(deleteLead);
  const setStatus = useServerFn(updateLeadStatus);
  const addPin = useServerFn(addPincode);
  const rmPin = useServerFn(deletePincode);
  const togPin = useServerFn(togglePincode);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getUser();
      if (!data.user) {
        navigate({ to: "/admin/login" });
        return;
      }
      setReady(true);
    })();
  }, [navigate]);

  async function refresh() {
    setLoading(true);
    try {
      const [ls, ps] = await Promise.all([fetchLeads(), fetchPins()]);
      setLeads(ls as Lead[]);
      setPincodes(ps as Pincode[]);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (ready) refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready]);

  async function onDeleteLead(id: string) {
    if (!confirm("Delete this lead permanently?")) return;
    await rmLead({ data: { id } });
    setSelected(null);
    refresh();
  }

  async function onStatusChange(id: string, status: string) {
    await setStatus({ data: { id, status } });
    refresh();
  }

  async function onLogout() {
    await supabase.auth.signOut();
    navigate({ to: "/admin/login" });
  }

  if (!ready) return <div className="grid min-h-screen place-items-center bg-ink text-white">Loading…</div>;

  return (
    <main className="min-h-screen bg-secondary/40">
      {/* Header */}
      <header className="sticky top-0 z-20 border-b border-border bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-brand">Numunix Admin</p>
            <h1 className="text-lg font-extrabold text-ink md:text-xl">Dashboard</h1>
          </div>
          <button
            onClick={onLogout}
            className="inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-xs font-semibold text-white hover:opacity-90"
          >
            <LogOut className="h-4 w-4" /> Sign out
          </button>
        </div>
        <div className="mx-auto flex max-w-7xl gap-2 px-4 pb-3 md:px-8">
          <TabBtn active={tab === "leads"} onClick={() => setTab("leads")} icon={<Users className="h-4 w-4" />}>
            Leads <span className="ml-1 rounded-full bg-brand/10 px-2 py-0.5 text-[10px] font-bold text-brand">{leads.length}</span>
          </TabBtn>
          <TabBtn active={tab === "pincodes"} onClick={() => setTab("pincodes")} icon={<MapPin className="h-4 w-4" />}>
            Pincodes <span className="ml-1 rounded-full bg-brand/10 px-2 py-0.5 text-[10px] font-bold text-brand">{pincodes.length}</span>
          </TabBtn>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-4 py-6 md:px-8">
        {loading && <p className="text-sm text-muted-foreground">Loading…</p>}

        {tab === "leads" && !loading && (
          <>
            {leads.length === 0 ? (
              <EmptyState label="No leads yet." />
            ) : (
              <div className="overflow-hidden rounded-2xl bg-white shadow-card ring-1 ring-border">
                <div className="hidden grid-cols-12 gap-3 border-b border-border bg-secondary/60 px-4 py-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground md:grid">
                  <div className="col-span-2">Booking ID</div>
                  <div className="col-span-2">Service</div>
                  <div className="col-span-2">Name</div>
                  <div className="col-span-3">Contact</div>
                  <div className="col-span-2">Status</div>
                  <div className="col-span-1 text-right">Actions</div>
                </div>
                <ul className="divide-y divide-border">
                  {leads.map((l) => (
                    <li key={l.id} className="grid grid-cols-12 items-center gap-3 px-4 py-4 text-sm">
                      <div className="col-span-12 md:col-span-2">
                        <p className="font-mono text-xs font-bold text-ink">{l.booking_id}</p>
                        <p className="text-[11px] text-muted-foreground">{new Date(l.created_at).toLocaleDateString()}</p>
                      </div>
                      <div className="col-span-6 md:col-span-2">
                        <span className="inline-flex rounded-full bg-brand/10 px-2.5 py-1 text-[11px] font-semibold text-brand ring-1 ring-brand/20">
                          {l.service}
                        </span>
                      </div>
                      <div className="col-span-6 md:col-span-2 font-semibold text-ink">{l.name}</div>
                      <div className="col-span-12 md:col-span-3 text-xs text-muted-foreground">
                        {l.phone && <p className="flex items-center gap-1"><Phone className="h-3 w-3" />{l.phone}</p>}
                        {l.email && <p className="flex items-center gap-1"><Mail className="h-3 w-3" />{l.email}</p>}
                      </div>
                      <div className="col-span-8 md:col-span-2">
                        <select
                          value={l.status}
                          onChange={(e) => onStatusChange(l.id, e.target.value)}
                          className="rounded-lg border border-border bg-white px-2 py-1 text-xs"
                        >
                          <option value="new">New</option>
                          <option value="contacted">Contacted</option>
                          <option value="scheduled">Scheduled</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </div>
                      <div className="col-span-4 flex justify-end gap-2 md:col-span-1">
                        <button
                          onClick={() => setSelected(l)}
                          className="grid h-9 w-9 place-items-center rounded-full bg-ink text-white hover:opacity-90"
                          aria-label="View"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => onDeleteLead(l.id)}
                          className="grid h-9 w-9 place-items-center rounded-full bg-red-50 text-red-600 ring-1 ring-red-200 hover:bg-red-100"
                          aria-label="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}

        {tab === "pincodes" && !loading && (
          <PincodesTab
            pincodes={pincodes}
            onAdd={async (p, c) => {
              await addPin({ data: { pincode: p, city: c, active: true } });
              refresh();
            }}
            onToggle={async (id, active) => {
              await togPin({ data: { id, active } });
              refresh();
            }}
            onDelete={async (id) => {
              if (!confirm("Remove this pincode?")) return;
              await rmPin({ data: { id } });
              refresh();
            }}
          />
        )}
      </section>

      {selected && <LeadModal lead={selected} onClose={() => setSelected(null)} onDelete={() => onDeleteLead(selected.id)} />}
    </main>
  );
}

function TabBtn({
  active,
  onClick,
  children,
  icon,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  icon: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold transition ${
        active ? "bg-ink text-white" : "bg-white text-ink ring-1 ring-border hover:bg-secondary"
      }`}
    >
      {icon}
      {children}
    </button>
  );
}

function EmptyState({ label }: { label: string }) {
  return <div className="rounded-2xl bg-white p-10 text-center text-sm text-muted-foreground ring-1 ring-border">{label}</div>;
}

function LeadModal({ lead, onClose, onDelete }: { lead: Lead; onClose: () => void; onDelete: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-4 backdrop-blur sm:items-center">
      <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-card ring-1 ring-border">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Booking</p>
            <p className="mt-1 font-mono text-lg font-bold text-ink">{lead.booking_id}</p>
          </div>
          <button onClick={onClose} className="grid h-9 w-9 place-items-center rounded-full bg-secondary text-ink hover:bg-secondary/80">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          <span className="inline-flex rounded-full bg-brand/10 px-3 py-1 text-xs font-semibold text-brand ring-1 ring-brand/20">
            {lead.service}
          </span>
          <span className="inline-flex rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-ink">
            {lead.status}
          </span>
        </div>

        <dl className="mt-5 space-y-3 text-sm">
          <Row label="Name" value={lead.name} />
          <Row label="Phone" value={lead.phone ?? "—"} />
          <Row label="Email" value={lead.email ?? "—"} />
          <Row label="Postal code" value={lead.postal_code ?? "—"} />
          <Row label="Source" value={lead.source} />
          <Row label="Received" value={new Date(lead.created_at).toLocaleString()} />
          {lead.message && (
            <div>
              <dt className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Message</dt>
              <dd className="mt-1 rounded-xl bg-secondary/60 p-3 text-sm text-ink">{lead.message}</dd>
            </div>
          )}
        </dl>

        <div className="mt-6 flex gap-2">
          {lead.phone && (
            <a
              href={`tel:${lead.phone}`}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-ink px-4 py-2.5 text-xs font-semibold text-white"
            >
              <Phone className="h-4 w-4" /> Call
            </a>
          )}
          <button
            onClick={onDelete}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-red-50 px-4 py-2.5 text-xs font-semibold text-red-600 ring-1 ring-red-200 hover:bg-red-100"
          >
            <Trash2 className="h-4 w-4" /> Delete
          </button>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-border pb-2">
      <dt className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{label}</dt>
      <dd className="text-right text-sm font-medium text-ink break-all">{value}</dd>
    </div>
  );
}

function PincodesTab({
  pincodes,
  onAdd,
  onToggle,
  onDelete,
}: {
  pincodes: Pincode[];
  onAdd: (pincode: string, city: string) => Promise<void>;
  onToggle: (id: string, active: boolean) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}) {
  const [pin, setPin] = useState("");
  const [city, setCity] = useState("");
  const [busy, setBusy] = useState(false);

  return (
    <div className="grid gap-6 lg:grid-cols-[380px_1fr]">
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          if (!pin.trim()) return;
          setBusy(true);
          await onAdd(pin.trim(), city.trim());
          setPin("");
          setCity("");
          setBusy(false);
        }}
        className="rounded-2xl bg-white p-5 shadow-card ring-1 ring-border"
      >
        <h3 className="text-base font-bold text-ink">Add serviceable pincode</h3>
        <p className="mt-1 text-xs text-muted-foreground">Visitors can check their pincode on the homepage.</p>
        <div className="mt-4 space-y-3">
          <input
            required
            placeholder="Pincode (e.g. 560001)"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            className="w-full rounded-xl border border-border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand"
          />
          <input
            placeholder="City (optional)"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full rounded-xl border border-border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand"
          />
        </div>
        <button
          type="submit"
          disabled={busy}
          className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand px-4 py-2.5 text-xs font-semibold text-brand-foreground shadow-brand hover:brightness-110 disabled:opacity-60"
        >
          <Plus className="h-4 w-4" /> Add pincode
        </button>
      </form>

      <div className="overflow-hidden rounded-2xl bg-white shadow-card ring-1 ring-border">
        {pincodes.length === 0 ? (
          <div className="p-10 text-center text-sm text-muted-foreground">No pincodes yet.</div>
        ) : (
          <ul className="divide-y divide-border">
            {pincodes.map((p) => (
              <li key={p.id} className="flex items-center gap-3 px-4 py-3">
                <div className="flex-1">
                  <p className="font-mono text-sm font-bold text-ink">{p.pincode}</p>
                  <p className="text-xs text-muted-foreground">{p.city ?? "—"}</p>
                </div>
                <button
                  onClick={() => onToggle(p.id, !p.active)}
                  className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-[11px] font-semibold ${
                    p.active
                      ? "bg-green-100 text-green-700 ring-1 ring-green-200"
                      : "bg-secondary text-muted-foreground ring-1 ring-border"
                  }`}
                >
                  {p.active ? <Check className="h-3 w-3" /> : null}
                  {p.active ? "Active" : "Inactive"}
                </button>
                <button
                  onClick={() => onDelete(p.id)}
                  className="grid h-8 w-8 place-items-center rounded-full bg-red-50 text-red-600 ring-1 ring-red-200 hover:bg-red-100"
                  aria-label="Delete"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
