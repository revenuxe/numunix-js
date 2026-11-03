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
  new: "bg-accent text-primary border-border",
  contacted: "bg-secondary text-foreground border-border",
  qualified: "bg-accent text-primary border-border",
  won: "bg-primary text-primary-foreground border-primary",
  closed: "bg-secondary text-muted-foreground border-border",
};

export function escapeLeadSearch(value: string) {
  // PostgREST OR expressions use commas/parentheses as syntax; allow plain text only.
  return value
    .replace(/[^\p{L}\p{N}@+ ._-]/gu, "")
    .replace(/[%_]/g, "")
    .trim()
    .slice(0, 100);
}
