"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { createLead } from "@/lib/leads";

export function BookingForm() {
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setBusy(true);
    setMessage("");
    try {
      const bookingId = await createLead({
        name: String(data.get("name")),
        phone: String(data.get("phone")),
        postalCode: String(data.get("postalCode")),
        service: "General IT Support",
        source: "hero",
      });
      window.location.assign(`/thank-you?bookingId=${encodeURIComponent(bookingId)}`);
    } catch {
      setMessage("We could not send your request. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-3xl bg-slate-800/75 p-5 ring-1 ring-white/20 backdrop-blur-xl shadow-card sm:p-6"
    >
      <h3 className="text-lg font-bold text-white sm:text-xl">Book a Service</h3>
      <p className="mt-1 text-xs text-white/70">
        Get a free callback from a certified Numunix engineer.
      </p>
      <div className="mt-4 space-y-3">
        <label className="block">
          <span className="text-xs font-semibold text-white/80">Name</span>
          <input
            name="name"
            type="text"
            required
            maxLength={100}
            placeholder="Your full name"
            className="mt-1.5 w-full rounded-2xl bg-white/20 px-4 py-3 text-sm text-white placeholder:text-white/55 ring-1 ring-white/10 backdrop-blur focus:outline-none focus:ring-brand"
          />
        </label>
        <label className="block">
          <span className="text-xs font-semibold text-white/80">Mobile Number</span>
          <input
            name="phone"
            type="tel"
            required
            maxLength={20}
            inputMode="tel"
            placeholder="+91 98765 43210"
            className="mt-1.5 w-full rounded-2xl bg-white/20 px-4 py-3 text-sm text-white placeholder:text-white/55 ring-1 ring-white/10 backdrop-blur focus:outline-none focus:ring-brand"
          />
        </label>
        <label className="block">
          <span className="text-xs font-semibold text-white/80">Postal Code</span>
          <input
            name="postalCode"
            type="text"
            required
            maxLength={12}
            placeholder="Enter your PIN / ZIP"
            className="mt-1.5 w-full rounded-2xl bg-white/20 px-4 py-3 text-sm text-white placeholder:text-white/55 ring-1 ring-white/10 backdrop-blur focus:outline-none focus:ring-brand"
          />
        </label>
      </div>
      {message && <p className="mt-3 text-xs text-white/80">{message}</p>}
      <button
        type="submit"
        disabled={busy}
        className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-brand px-5 py-3.5 text-sm font-semibold text-brand-foreground shadow-brand transition hover:brightness-110 disabled:opacity-60"
      >
        {busy ? "Sending..." : "Schedule Service"}
        <ArrowRight className="h-4 w-4" />
      </button>
    </form>
  );
}
