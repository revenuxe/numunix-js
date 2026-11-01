export const LEAD_STATUSES = ["new", "contacted", "qualified", "won", "closed"] as const;
export type LeadStatus = (typeof LEAD_STATUSES)[number];
export type Lead = {
  id: string;
  booking_reference?: string | null;
  created_at: string;
  updated_at: string;
  name: string;
  phone: string;
  email: string | null;
  service: string;
  timeline: string;
  description: string | null;
  source: string;
  status: LeadStatus;
  notes: string;
};
export const STATUS_LABELS: Record<LeadStatus, string> = {
  new: "New",
  contacted: "Contacted",
  qualified: "Assessment arranged",
  won: "Repair booked",
  closed: "Closed",
};
export const STATUS_CLASSES: Record<LeadStatus, string> = {
  new: "bg-blue-50 text-blue-700 border-blue-100",
  contacted: "bg-amber-50 text-amber-700 border-amber-100",
  qualified: "bg-accent text-primary border-border",
  won: "bg-emerald-50 text-emerald-700 border-emerald-100",
  closed: "bg-slate-100 text-slate-600 border-slate-200",
};

export function escapeLeadSearch(value: string) {
  // PostgREST OR expressions use commas/parentheses as syntax; allow plain text only.
  return value
    .replace(/[^\p{L}\p{N}@+ ._-]/gu, "")
    .replace(/[%_]/g, "")
    .trim()
    .slice(0, 100);
}
