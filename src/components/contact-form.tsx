"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { createLead } from "@/lib/leads";

export function ContactForm() {
  const [busy, setBusy] = useState(false);
  const [formMessage, setFormMessage] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setBusy(true);
    setFormMessage("");
    try {
      const bookingId = await createLead({
        name: String(data.get("name")),
        phone: String(data.get("phone")),
        service: String(data.get("service")),
        message: String(data.get("message")),
        source: "contact",
      });
      window.location.assign(`/thank-you?bookingId=${encodeURIComponent(bookingId)}`);
    } catch {
      setFormMessage("We could not send your request. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="mx-auto w-full max-w-[calc(100vw-3rem)] rounded-[2rem] bg-ink p-6 text-white shadow-card md:p-10 lg:mx-0 lg:max-w-none"
    >
      <h2 className="text-2xl font-extrabold tracking-tight md:text-3xl">
        Send us a <span className="text-brand">quick request</span>
      </h2>
      <p className="mt-2 text-sm text-white/70">
        Tell us what you need - a certified engineer will call you back.
      </p>
      <div className="mt-6 space-y-4">
        <label className="block">
          <span className="text-xs font-semibold text-white/80">Full name</span>
          <input
            name="name"
            type="text"
            required
            maxLength={100}
            placeholder="Your name"
            className="mt-1.5 w-full rounded-xl bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/50 ring-1 ring-white/20 focus:outline-none focus:ring-brand"
          />
        </label>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="text-xs font-semibold text-white/80">Mobile Number</span>
            <input
              name="phone"
              type="tel"
              required
              maxLength={20}
              inputMode="tel"
              placeholder="+91 98765 43210"
              className="mt-1.5 w-full rounded-xl bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/50 ring-1 ring-white/20 focus:outline-none focus:ring-brand"
            />
          </label>
        </div>
        <label className="block">
          <span className="text-xs font-semibold text-white/80">Service needed</span>
          <select
            name="service"
            required
            className="mt-1.5 w-full rounded-xl bg-white/10 px-4 py-3 text-sm text-white ring-1 ring-white/20 focus:outline-none focus:ring-brand"
            defaultValue=""
          >
            <option value="" disabled className="bg-ink">
              Choose a service
            </option>
            <option className="bg-ink">Laptop Repair</option>
            <option className="bg-ink">Desktop Repair</option>
            <option className="bg-ink">CCTV Installation</option>
            <option className="bg-ink">Networking</option>
            <option className="bg-ink">Business AMC</option>
            <option className="bg-ink">Other</option>
          </select>
        </label>
        <label className="block">
          <span className="text-xs font-semibold text-white/80">Message</span>
          <textarea
            name="message"
            rows={4}
            maxLength={1000}
            placeholder="Describe the issue..."
            className="mt-1.5 w-full rounded-xl bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/50 ring-1 ring-white/20 focus:outline-none focus:ring-brand"
          />
        </label>
      </div>
      <button
        type="submit"
        disabled={busy}
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand px-5 py-3.5 text-sm font-semibold text-brand-foreground shadow-brand transition hover:brightness-110"
      >
        {busy ? "Sending..." : "Send request"} <ArrowRight className="h-4 w-4" />
      </button>
      {formMessage && <p className="mt-3 text-center text-xs text-white/80">{formMessage}</p>}
      <p className="mt-3 text-center text-xs text-white/60">
        We reply within a few hours during working days.
      </p>
    </form>
  );
}
