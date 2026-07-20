"use client";

import { useState } from "react";
import { Headset, Minus, Plus } from "lucide-react";
import { HOME_FAQS } from "@/lib/faq-data";

export function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="bg-secondary/40 px-4 py-24 md:px-8 md:py-32">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:items-start">
        <div className="order-2 space-y-3 lg:order-1">
          {HOME_FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <div
                key={f.q}
                className={`rounded-2xl bg-white p-5 ring-1 transition ${
                  isOpen ? "ring-brand/40 shadow-card" : "ring-border"
                }`}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center gap-4 text-left"
                >
                  <span className="flex-1 min-w-0 text-sm font-semibold text-ink md:text-base">
                    {f.q}
                  </span>
                  <span
                    className={`grid h-9 w-9 shrink-0 place-items-center rounded-full ${
                      isOpen ? "bg-ink text-white" : "bg-secondary text-ink"
                    }`}
                  >
                    {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                  </span>
                </button>
                {isOpen && <p className="mt-4 text-sm text-muted-foreground">{f.a}</p>}
              </div>
            );
          })}
        </div>

        <div className="order-1 lg:order-2 lg:pl-12">
          <h2 className="text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
            Questions,
            <br />
            <span className="text-brand">Answered</span>
          </h2>
          <p className="mt-4 max-w-md text-muted-foreground">
            Our engineers provide professional and caring IT support you can always trust.
          </p>
          <a
            href="#faq"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand px-5 py-3 text-sm font-semibold text-brand-foreground"
          >
            View All FAQ
          </a>

          <div className="mt-10 rounded-2xl bg-white p-5 ring-1 ring-border shadow-soft">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-brand/10 text-brand">
                <Headset className="h-5 w-5" />
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-muted-foreground">Have more questions?</p>
                <p className="text-sm font-semibold text-ink">Book a free discovery call</p>
              </div>
            </div>
            <a
              href="#book"
              className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-ink px-4 py-3 text-sm font-semibold text-white"
            >
              Let&apos;s Talk Numunix
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
