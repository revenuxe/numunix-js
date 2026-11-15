"use client";

import { PhoneIncoming, CheckCircle2 } from "lucide-react";
import { useRef, useState, type FormEvent, type ReactNode } from "react";
import { createRepairBooking } from "@/lib/bookings.functions";
import { useCategory } from "./category";

export function HeroCallback({ service = "Help me decide", brand, brandLogo }: { service?: string; brand?: string; brandLogo?: ReactNode } = {}) {
  const category = useCategory()?.category ?? "electronics";
  const lock = useRef(false);
  const [status, setStatus] = useState<"idle" | "pending" | "success" | "error">("idle");
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (lock.current) return;
    const form = event.currentTarget;
    const phone = String(new FormData(form).get("phone") ?? "").replace(/\D/g, "");
    if (!/^[6-9]\d{9}$/.test(phone)) {
      setError("Enter a valid 10-digit Indian mobile number.");
      setStatus("error");
      return;
    }
    lock.current = true;
    setStatus("pending");
    try {
      const receipt = await createRepairBooking({ data: {
        name: "Callback request",
        phone: `+91${phone}`,
        service,
        brand,
        timeline: "As soon as possible",
        description: `Callback requested about ${category} repair. Name, model and fault to be confirmed by phone.`,
        source: window.location.pathname,
      } });
      if ("error" in receipt) throw new Error(receipt.error);
      form.reset();
      setStatus("success");
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Unable to save your request. Please try again.");
      setStatus("error");
    } finally {
      lock.current = false;
    }
  }

  return (
    <aside aria-label="Request a repair callback" className="border-b border-blue-100 bg-blue-50/95">
      <div className="shell py-2">
        {status === "success" ? (
          <div role="status" className="flex min-h-16 items-center gap-2 text-xs text-navytext">
            <CheckCircle2 className="size-4 shrink-0 text-primary" /> Callback requested. Our team will contact you.
          </div>
        ) : (
          <form onSubmit={submit} aria-busy={status === "pending"} className="lg:flex lg:items-center lg:justify-between lg:gap-6">
            <div className="mb-1.5 flex items-center gap-2 lg:mb-0">
              {brandLogo && <span className="flex h-6 w-16 shrink-0 items-center justify-center">{brandLogo}</span>}
              <h2 className="flex items-center gap-1.5 text-[11px] font-medium text-navytext lg:text-xs"><PhoneIncoming className="size-3 text-primary" aria-hidden="true" /> Prefer a quick callback?</h2>
            </div>
            <div className="min-w-0 lg:w-[440px]">
              <div className="flex items-center gap-2">
                <div className="flex min-w-0 flex-1 items-center rounded-lg border border-border bg-white focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/15">
                  <span className="border-r border-border px-2 text-[11px] text-navytext" aria-hidden="true">+91</span>
                  <label htmlFor="hero-callback-phone" className="sr-only">Indian mobile number, without country code</label>
                  <input id="hero-callback-phone" name="phone" type="tel" inputMode="numeric" autoComplete="tel-national" placeholder="Mobile number" required maxLength={10} pattern="[6-9][0-9]{9}" disabled={status === "pending"} aria-invalid={status === "error"} aria-describedby={status === "error" ? "hero-callback-error" : "hero-callback-consent"} className="h-9 w-full min-w-0 rounded-r-lg bg-transparent px-2 text-base text-navytext outline-none placeholder:text-[12px] placeholder:text-slate-400" />
                </div>
                <button type="submit" disabled={status === "pending"} className="h-9 shrink-0 rounded-lg bg-primary px-3 text-[11px] font-medium text-primary-foreground transition-colors hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-wait disabled:opacity-60">{status === "pending" ? "Sending?" : "Request callback"}</button>
              </div>
              <p id="hero-callback-consent" className="mt-1 text-[10px] leading-snug text-slate-500">You agree to a repair callback. <a href="/privacy" className="underline underline-offset-2 hover:text-primary">Privacy</a></p>
              {status === "error" && <p id="hero-callback-error" role="alert" className="mt-1 text-xs text-red-700">{error}</p>}
            </div>
          </form>
        )}
      </div>
    </aside>
  );
}
