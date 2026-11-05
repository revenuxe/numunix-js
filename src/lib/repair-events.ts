import { REPAIR_PAGES } from "@/content/repair-services";

export type RepairEventName =
  | "enquiry_start"
  | "enquiry_success"
  | "callback_start"
  | "callback_success"
  | "whatsapp_click"
  | "service_selection";

// Browser-local integration point. An approved analytics listener can consume it after consent.
// Never forward names, contact details, form text, booking references, queries or WhatsApp URLs.
export function emitRepairEvent(name: RepairEventName, service?: string) {
  if (typeof window === "undefined") return;
  const selected = REPAIR_PAGES.find((item) => item.name === service);
  window.dispatchEvent(
    new CustomEvent("numunix:repair-event", {
      detail: {
        name,
        page_path: window.location.pathname,
        ...(selected ? { service: selected.slug, category: selected.category } : {}),
      },
    }),
  );
}
