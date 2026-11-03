type BookingNotification = {
  reference: string;
  name: string;
  phone: string;
  service: string;
  brand?: string | null;
  timeline: string;
  description: string | null;
  source: string;
};

// Called only by the booking server function after the database insert succeeds.
// Sender and recipient are fixed: public form data cannot choose an email destination.
export async function notifyRepairTeam(
  booking: BookingNotification,
  apiKey: string | undefined,
  send: typeof fetch = fetch,
): Promise<"sent" | "unconfigured" | "failed"> {
  if (!apiKey?.trim()) return "unconfigured";
  const callback = booking.name === "Callback request";
  const kind = callback ? "Callback requested" : "Repair enquiry";
  const text = [
    `${kind} — ${booking.reference}`,
    "",
    `Reference: ${booking.reference}`,
    `Name: ${booking.name}`,
    `Mobile: ${booking.phone}`,
    `Repair service: ${booking.service}`,
    `Brand: ${booking.brand || "Not provided"}`,
    `Preferred timing: ${booking.timeline}`,
    `Originating page: ${booking.source}`,
    "",
    "Request details:",
    booking.description || "No additional details provided.",
    "",
    "Manage this request: https://www.numunix.com/admin/dashboard",
  ].join("\n");
  try {
    const response = await send("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey.trim()}`,
        "Content-Type": "application/json",
        "Idempotency-Key": `repair-booking/${booking.reference}`,
      },
      signal: AbortSignal.timeout(6000),
      body: JSON.stringify({
        from: "Numunix Repairs <onboarding@resend.dev>",
        to: ["numunix@gmail.com"],
        subject: `${kind} | ${booking.reference}`,
        text,
      }),
    });
    if (!response.ok) return "failed";
    const result: unknown = await response.json();
    return result && typeof result === "object" && "id" in result && typeof result.id === "string" && result.id ? "sent" : "failed";
  } catch {
    // A timeout/provider failure must never turn a saved booking into a failed submission.
    return "failed";
  }
}
