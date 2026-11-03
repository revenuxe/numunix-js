import { CONTACT } from "./site";

/** Encode real newlines so WhatsApp opens a readable, editable enquiry. */
export function repairWhatsAppHref(subject: string, fields: readonly string[] = ["Model", "Issue", "Location"]) {
  const message = [
    `Hi Numunix, I would like to book ${subject}.`,
    "",
    ...fields.map(field => `${field}:`),
  ].join("\n");
  return `${CONTACT.whatsappHref.split("?")[0]}?text=${encodeURIComponent(message)}`;
}
