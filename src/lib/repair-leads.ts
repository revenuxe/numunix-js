import { REPAIR_PAGES } from "@/content/repair-services";
import type { Lead } from "./leads";

export function repairLeadCategory(lead: Pick<Lead, "service" | "source">) {
  const service = REPAIR_PAGES.find(item => item.name === lead.service);
  if (service) return service.category;
  if (lead.source.startsWith("/appliances")) return "appliances";
  if (lead.source.startsWith("/electronic/")) return "electronics";
  return "other";
}

export function repairLeadWhatsApp(phone: string) {
  let digits = phone.replace(/\D/g, "");
  if (digits.length === 10) digits = `91${digits}`;
  return `https://wa.me/${digits}`;
}