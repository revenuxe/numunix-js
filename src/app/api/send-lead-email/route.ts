import { NextResponse } from "next/server";
import { Resend } from "resend";
import { CONTACT } from "@/lib/contact";

type LeadEmailPayload = {
  bookingId?: string;
  name?: string;
  phone?: string;
  postalCode?: string;
  service?: string;
  message?: string;
  source?: string;
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // Not configured yet — fail quietly so the lead itself still succeeds.
    return NextResponse.json({ skipped: "RESEND_API_KEY is not set." }, { status: 200 });
  }

  const body = (await request.json().catch(() => null)) as LeadEmailPayload | null;
  if (!body || !body.name || !body.phone) {
    return NextResponse.json({ error: "Invalid lead payload." }, { status: 400 });
  }

  const { bookingId, name, phone, postalCode, service, message, source } = body;

  const rows: [string, string][] = [
    ["Booking reference", bookingId || "—"],
    ["Name", name],
    ["Phone", phone],
    ["Service", service || "—"],
    ["Postal code", postalCode || "—"],
    ["Source", source || "—"],
  ];

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 560px; margin: 0 auto;">
      <h2 style="margin-bottom: 4px;">New lead from numunix.com</h2>
      <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
        ${rows
          .map(
            ([label, value]) => `
          <tr>
            <td style="padding: 6px 12px 6px 0; color: #666; font-size: 13px; white-space: nowrap; vertical-align: top;">${escapeHtml(label)}</td>
            <td style="padding: 6px 0; font-size: 14px; font-weight: 600;">${escapeHtml(value)}</td>
          </tr>`,
          )
          .join("")}
      </table>
      ${
        message
          ? `<div style="margin-top: 16px;">
               <p style="color: #666; font-size: 13px; margin-bottom: 4px;">Message</p>
               <p style="font-size: 14px; white-space: pre-wrap;">${escapeHtml(message)}</p>
             </div>`
          : ""
      }
    </div>
  `;

  const resend = new Resend(apiKey);
  const from = process.env.RESEND_FROM_EMAIL || "Numunix Website <onboarding@resend.dev>";

  try {
    const { error } = await resend.emails.send({
      from,
      to: CONTACT.email,
      subject: `New lead: ${service || "General"} — ${name}`,
      html,
    });
    if (error) throw error;
  } catch (err) {
    console.error("Failed to send lead notification email", err);
    return NextResponse.json({ error: "Failed to send email." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
