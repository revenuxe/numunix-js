"use client";

import { useState } from "react";
import Image from "next/image";
import {
  BadgeCheck,
  Zap,
  ShieldCheck,
  Wallet,
  CalendarClock,
  Headset,
  ArrowUpRight,
  Wrench,
} from "lucide-react";
import whyImg from "@/assets/why-choose.webp";

const ITEMS = [
  {
    Icon: BadgeCheck,
    title: "Certified Engineers",
    desc: "Our technicians are certified, insured and trained on the latest hardware & platforms.",
  },
  {
    Icon: Zap,
    title: "Quick Diagnosis",
    desc: "Fast, transparent diagnostics — usually within the same day.",
  },
  {
    Icon: ShieldCheck,
    title: "Original Components",
    desc: "Only genuine, warrantied parts and licensed software.",
  },
  {
    Icon: Wallet,
    title: "Transparent Pricing",
    desc: "Upfront estimates before any work begins — no surprises.",
  },
  {
    Icon: CalendarClock,
    title: "Business AMC",
    desc: "Annual maintenance contracts with SLAs to keep IT running.",
  },
  {
    Icon: Headset,
    title: "Onsite & Remote Support",
    desc: "Onsite visits or secure remote support — you choose.",
  },
];

export function WhyChooseUs() {
  const [open, setOpen] = useState(0);
  return (
    <section id="why" className="bg-white px-4 py-24 md:px-8 md:py-32">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:items-start">
        <div>
          <h2 className="text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
            Why Choose <span className="text-brand">Numunix</span> for IT
          </h2>
          <p className="mt-4 max-w-md text-muted-foreground">
            Reliable IT support with skilled engineers ensuring satisfaction on every ticket — from
            a single laptop to your entire office.
          </p>

          <div className="mt-8 space-y-3">
            {ITEMS.map(({ Icon, title, desc }, i) => {
              const isOpen = open === i;
              return (
                <button
                  key={title}
                  onClick={() => setOpen(i)}
                  className={`w-full rounded-2xl p-5 text-left ring-1 transition ${
                    isOpen
                      ? "bg-white ring-border shadow-card"
                      : "bg-secondary/50 ring-transparent hover:bg-secondary"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span
                      className={`grid h-10 w-10 shrink-0 place-items-center rounded-full ${
                        isOpen
                          ? "bg-brand text-brand-foreground"
                          : "bg-white text-ink ring-1 ring-border"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="flex-1 min-w-0 truncate text-base font-semibold text-ink">
                      {title}
                    </span>
                    <span
                      className={`grid h-8 w-8 shrink-0 place-items-center rounded-full ${
                        isOpen ? "bg-ink text-white" : "bg-white text-ink ring-1 ring-border"
                      }`}
                    >
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </div>
                  {isOpen && <p className="mt-3 pl-14 text-sm text-muted-foreground">{desc}</p>}
                </button>
              );
            })}
          </div>
        </div>

        <div className="relative">
          <Image
            src={whyImg}
            alt="Numunix technician"
            className="aspect-[4/5] w-full rounded-3xl object-cover shadow-card"
          />
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-2xl bg-white/95 p-4 shadow-card backdrop-blur">
            <div>
              <p className="text-xs uppercase tracking-widest text-muted-foreground">Uptime SLA</p>
              <p className="text-lg font-bold text-ink">99.9% reliability</p>
            </div>
            <span className="grid h-11 w-11 place-items-center rounded-full bg-brand text-brand-foreground">
              <Wrench className="h-5 w-5" />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
