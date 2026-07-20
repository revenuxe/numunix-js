import { CONTACT } from "@/lib/contact";
import type { DeviceOrder } from "@/lib/quote-types";

// Renders with jsPDF's own vector text/shape APIs rather than an HTML +
// html2canvas snapshot. html2canvas can't parse the oklch() color functions
// this site's Tailwind theme uses on document.body/:root, and throws before
// ever producing a canvas — that was the root cause of the PDF download
// silently failing. Drawing directly with jsPDF sidesteps that entirely and
// also gives crisp (non-rasterized) text and reliable multi-page pagination.

const INK = "#111827";
const MUTED = "#6b7280";
const BORDER = "#e5e7eb";
const BRAND = "#0f6dfb";

function formatInr(value: number): string {
  return `Rs ${Math.round(value).toLocaleString("en-IN")}`;
}

async function loadLogoAsPngDataUrl(): Promise<{ dataUrl: string; ratio: number } | null> {
  try {
    const response = await fetch("/og-image.webp");
    if (!response.ok) return null;
    const blob = await response.blob();
    const bitmap = await createImageBitmap(blob);
    const canvas = document.createElement("canvas");
    canvas.width = bitmap.width;
    canvas.height = bitmap.height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;
    ctx.drawImage(bitmap, 0, 0);
    return { dataUrl: canvas.toDataURL("image/png"), ratio: bitmap.width / bitmap.height };
  } catch {
    return null;
  }
}

const TERMS: string[] = [
  "The amount quoted here is provisional. The final payout is confirmed only after our pickup agent physically inspects the device and verifies the condition, functioning and accessories declared in this booking.",
  "The seller confirms they are the rightful owner of this device. Numunix bears no responsibility for any legal dispute, theft claim or ownership issue linked to the device — full responsibility for a stolen, financed or disputed device rests solely with the seller.",
  "If the original purchase invoice or bill is not available, a valid government-issued photo ID (Aadhaar, PAN, passport or driving licence) must be produced at the time of pickup for verification.",
  "Please back up and sign out of all personal accounts and factory-reset the device before handover. Numunix is not responsible for any personal data left on a device at the time of pickup.",
  "Payment is released only after the device passes inspection at pickup and the seller confirms the final revised quote, if any.",
  "This booking can be rescheduled or cancelled any time before pickup at no cost.",
];

export async function generateInvoicePdf(order: DeviceOrder): Promise<void> {
  const { default: jsPDF } = await import("jspdf");
  const logo = await loadLogoAsPngDataUrl();

  const pdf = new jsPDF({ unit: "pt", format: "a4" });
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const marginX = 48;
  const contentWidth = pageWidth - marginX * 2;
  let y = 56;

  function ensureSpace(needed: number) {
    if (y + needed > pageHeight - 56) {
      pdf.addPage();
      y = 56;
    }
  }

  function text(
    value: string,
    x: number,
    options: {
      size?: number;
      color?: string;
      bold?: boolean;
      align?: "left" | "right" | "center";
      maxWidth?: number;
    } = {},
  ) {
    pdf.setFontSize(options.size ?? 10);
    pdf.setFont("helvetica", options.bold ? "bold" : "normal");
    pdf.setTextColor(options.color ?? INK);
    pdf.text(value, x, y, { align: options.align, maxWidth: options.maxWidth });
  }

  function wrapped(value: string, x: number, size: number, color: string, maxWidth: number) {
    pdf.setFontSize(size);
    pdf.setFont("helvetica", "normal");
    pdf.setTextColor(color);
    const lines = pdf.splitTextToSize(value, maxWidth) as string[];
    ensureSpace(lines.length * (size + 4));
    pdf.text(lines, x, y);
    y += lines.length * (size + 4);
  }

  function rule(color = BORDER) {
    pdf.setDrawColor(color);
    pdf.setLineWidth(1);
    pdf.line(marginX, y, pageWidth - marginX, y);
  }

  // Header
  if (logo) {
    const logoHeight = 34;
    const logoWidth = logoHeight * logo.ratio;
    pdf.addImage(logo.dataUrl, "PNG", marginX, y - 24, logoWidth, logoHeight);
  } else {
    text("NUMUNIX", marginX, { size: 18, bold: true, color: BRAND });
  }
  text("Booking ID", pageWidth - marginX, { size: 9, color: MUTED, align: "right" });
  y += 14;
  text(order.booking_id, pageWidth - marginX, { size: 13, bold: true, align: "right" });
  y += 18;
  text("Laptop buyback — pickup booking invoice", marginX, { size: 10, color: MUTED });
  y += 14;
  rule(INK);
  y += 22;

  // Customer + pickup
  text(order.customer_name, marginX, { size: 12, bold: true });
  text(`Pickup date: ${order.pickup_date}`, pageWidth - marginX, {
    size: 10,
    color: MUTED,
    align: "right",
  });
  y += 15;
  text(`${order.phone}${order.email ? `  ·  ${order.email}` : ""}`, marginX, {
    size: 10,
    color: MUTED,
  });
  text(`Time slot: ${order.pickup_slot}`, pageWidth - marginX, {
    size: 10,
    color: MUTED,
    align: "right",
  });
  y += 16;
  wrapped(`${order.address}, ${order.pincode}`, marginX, 10, MUTED, contentWidth - 160);
  y += 10;

  // Device + price box
  ensureSpace(90);
  pdf.setFillColor("#eff6ff");
  pdf.setDrawColor("#bfdbfe");
  pdf.roundedRect(marginX, y, contentWidth, 80, 10, 10, "FD");
  y += 22;
  text(`${order.brand_name} · ${order.series_name}`, marginX + 16, { size: 9, color: BRAND });
  y += 16;
  text(order.model_name, marginX + 16, { size: 13, bold: true });
  y += 22;
  text(formatInr(order.final_quote), marginX + 16, { size: 20, bold: true, color: BRAND });
  text("Confirmed after doorstep inspection", pageWidth - marginX - 16, {
    size: 8.5,
    color: MUTED,
    align: "right",
  });
  y += 30;

  // Terms & conditions
  ensureSpace(40);
  text("Booking terms & conditions", marginX, { size: 11, bold: true });
  y += 16;
  for (const term of TERMS) {
    ensureSpace(20);
    const bulletLines = pdf.splitTextToSize(term, contentWidth - 14) as string[];
    pdf.setFontSize(9);
    pdf.setFont("helvetica", "normal");
    pdf.setTextColor(MUTED);
    pdf.text("•", marginX, y);
    pdf.text(bulletLines, marginX + 14, y);
    y += bulletLines.length * 13 + 6;
  }
  y += 6;

  // Disclaimer callout
  ensureSpace(60);
  const disclaimer =
    "This is just a booking invoice, not a real pickup/sale invoice. It will not be considered as proof of sale or ownership transfer — it is provided for reference only.";
  const disclaimerLines = pdf.splitTextToSize(disclaimer, contentWidth - 24) as string[];
  const boxHeight = disclaimerLines.length * 13 + 22;
  pdf.setFillColor("#fef3c7");
  pdf.setDrawColor("#fde68a");
  pdf.roundedRect(marginX, y, contentWidth, boxHeight, 8, 8, "FD");
  y += 16;
  pdf.setFontSize(9);
  pdf.setFont("helvetica", "bold");
  pdf.setTextColor("#92400e");
  pdf.text(disclaimerLines, marginX + 12, y);
  y += disclaimerLines.length * 13 + 16;

  // Footer
  ensureSpace(24);
  text(
    `Generated ${new Date(order.created_at).toLocaleString("en-IN")} · ${CONTACT.phoneDisplay} · ${CONTACT.email}`,
    marginX,
    { size: 8, color: MUTED },
  );

  pdf.save(`numunix-booking-${order.booking_id}.pdf`);
}
