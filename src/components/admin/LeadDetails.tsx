import { useState, type FormEvent } from "react";
import { Mail, Phone, Save, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { repairLeadCategory, repairLeadWhatsApp } from "@/lib/repair-leads";
import { WhatsAppIcon } from "@/components/numunix/WhatsAppIcon";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { getSupabase } from "@/lib/supabase";
import { LEAD_STATUSES, STATUS_LABELS, type Lead, type LeadStatus } from "@/lib/leads";

export function LeadDetails({
  lead,
  onClose,
  onSaved,
  onDelete,
}: {
  lead: Lead;
  onClose: () => void;
  onSaved: () => void;
  onDelete: (lead: Lead) => void;
}) {
  const [status, setStatus] = useState<LeadStatus>(lead.status);
  const [notes, setNotes] = useState(lead.notes);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const client = getSupabase();
    if (!client || pending) return;
    setPending(true);
    setError("");
    try {
      const { data, error: updateError } = await client
        .from("contact_enquiries")
        .update({ status, notes: notes.trim() })
        .eq("id", lead.id)
        .eq("updated_at", lead.updated_at)
        .select("id")
        .single();
      if (updateError || !data)
        throw new Error(
          "Could not save changes. The lead may have been updated elsewhere. Close this panel, refresh, and try again.",
        );
      onSaved();
    } catch (cause) {
      setError(
        cause instanceof Error ? cause.message : "Could not save changes. Please try again.",
      );
    } finally {
      setPending(false);
    }
  }

  const initials = lead.name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
  const date = new Date(lead.created_at).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
  return (
    <Dialog
      open
      onOpenChange={(open) => {
        if (!open && !pending) onClose();
      }}
    >
      <DialogContent
        className="max-h-[88dvh] w-[calc(100%-24px)] max-w-xl gap-0 overflow-y-auto rounded-[24px] border-slate-200 bg-white p-0 text-slate-900 sm:rounded-[24px]"
        onEscapeKeyDown={(event) => {
          if (pending) event.preventDefault();
        }}
      >
        <div className="border-b border-slate-100 px-5 pb-5 pt-7 sm:px-7">
          <div className="mb-4 flex items-center gap-3">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-blue-50 text-sm font-semibold text-blue-600">
              {initials}
            </span>
            <div className="min-w-0 pr-6">
              <DialogTitle className="break-words text-xl tracking-tight">{lead.name}</DialogTitle>
              <DialogDescription className="mt-1 text-xs text-slate-500">
                Received {date}
              </DialogDescription>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button asChild size="sm"><a href={repairLeadWhatsApp(lead.phone)} target="_blank" rel="noopener noreferrer"><WhatsAppIcon className="size-4" />WhatsApp customer</a></Button>
            <a
              href={`tel:${lead.phone.replace(/[^+\d]/g, "")}`}
              className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50"
            >
              <Phone size={14} />
              {lead.phone}
            </a>
            {lead.email && (
              <a
                href={`mailto:${lead.email}`}
                className="inline-flex min-h-10 min-w-0 items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50"
              >
                <Mail size={14} className="shrink-0" />
                <span className="break-all">{lead.email}</span>
              </a>
            )}
          </div>
        </div>
        <div className="px-5 py-5 sm:px-7">
          <dl className="grid grid-cols-2 gap-x-5 gap-y-4 text-sm">
            {[
              ["Booking reference", lead.booking_reference ?? "Legacy request"],
              ["Repair service", lead.service],
              ["Preferred visit", lead.timeline],
              ["Category", repairLeadCategory(lead) === "appliances" ? "Appliances" : repairLeadCategory(lead) === "electronics" ? "Electronics" : "Other enquiry"],
              ["Enquiry page", lead.source],
            ].map(([label, value]) => (
              <div key={label} className="min-w-0">
                <dt className="text-xs text-slate-400">{label}</dt>
                <dd className="mt-1 break-words font-medium text-slate-700 [overflow-wrap:anywhere]">
                  {value}
                </dd>
              </div>
            ))}
          </dl>
          <div className="mt-5 rounded-2xl border border-slate-100 bg-slate-50 p-4">
            <h3 className="text-xs font-medium text-slate-500">FAULT & EQUIPMENT DETAILS</h3>
            <p className="mt-2 whitespace-pre-wrap break-words text-sm leading-relaxed text-slate-700 [overflow-wrap:anywhere]">
              {lead.description || "No additional details shared."}
            </p>
          </div>
          <form onSubmit={save} className="mt-6">
            <fieldset disabled={pending} className="space-y-4">
              <label htmlFor="lead-status" className="block text-sm font-medium text-slate-700">
                Repair request status
                <select
                  id="lead-status"
                  value={status}
                  onChange={(event) => setStatus(event.target.value as LeadStatus)}
                  className="mt-2 h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-base outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  {LEAD_STATUSES.map((value) => (
                    <option key={value} value={value}>
                      {STATUS_LABELS[value]}
                    </option>
                  ))}
                </select>
              </label>
              <label htmlFor="lead-notes" className="block text-sm font-medium text-slate-700">
                Repair notes
                <textarea
                  id="lead-notes"
                  value={notes}
                  onChange={(event) => setNotes(event.target.value)}
                  rows={3}
                  maxLength={5000}
                  placeholder="Model, visit location, assessment findings, estimate and next follow-up…"
                  className="mt-2 w-full resize-y rounded-xl border border-slate-200 bg-white p-3 text-base font-normal outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
                <span className="mt-1 block text-xs font-normal text-slate-400">
                  Visible only to your admin team.
                </span>
              </label>
            </fieldset>
            {error && (
              <p role="alert" className="mt-3 rounded-xl bg-red-50 p-3 text-sm text-red-700">
                {error}
              </p>
            )}
            <div className="mt-5 flex gap-3 border-t border-slate-100 pt-5">
              <Button
                type="button"
                disabled={pending}
                onClick={() => onDelete(lead)}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-red-100 px-3 text-sm text-red-600 hover:bg-red-50 disabled:opacity-50"
              >
                <Trash2 size={16} />
                <span>Delete</span>
              </Button>
              <Button
                disabled={pending}
                className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
              >
                <Save size={16} />
                {pending ? "Saving…" : "Save changes"}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
