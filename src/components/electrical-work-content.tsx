"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  BatteryCharging,
  ChevronDown,
  Clock3,
  Droplets,
  Headset,
  MessageCircleQuestion,
  Plug,
  ShieldCheck,
  Wrench,
} from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { WhatsAppIcon } from "@/components/whatsapp-icon";
import { ServiceBookingForm } from "@/components/service-booking-form";
import { CONTACT } from "@/lib/contact";
import { ELECTRICAL_WORK_FAQS } from "@/lib/faq-data";
import heroHandoff from "@/assets/hero-handoff.webp";

const SUBCATEGORY_GROUPS: { title: string; Icon: typeof Plug; items: string[] }[] = [
  {
    title: "Electrician Consultation",
    Icon: MessageCircleQuestion,
    items: ["General Electrical Consultation"],
  },
  {
    title: "Installation Services",
    Icon: Plug,
    items: [
      "Socket & Switchboard Repair/Installation Consultation",
      "Fan Installation & Repair Consultation",
      "Light Installation & Repair Consultation",
      "Appliance Wiring & Installation Consultation",
    ],
  },
  {
    title: "Repair & Maintenance",
    Icon: Wrench,
    items: [
      "Wiring & Circuit Repairs Consultation",
      "MCB & Fuse Box Repair/Installation Consultation",
    ],
  },
  {
    title: "UPS Inverter",
    Icon: BatteryCharging,
    items: ["Inverter Installation", "Inverter Uninstallation", "Inverter Check up"],
  },
  {
    title: "Water Motor",
    Icon: Droplets,
    items: ["Water Motor Installation & Repair Consultation"],
  },
];

const PROBLEMS = [
  "Frequent power trips or MCB tripping",
  "Sockets or switches not working",
  "Fan, light or appliance not turning on",
  "Inverter or UPS not charging",
];

const BENEFITS = [
  "Safety-first diagnosis before any repair",
  "Licensed, experienced electricians",
  "Transparent pricing, no hidden charges",
  "Support for homes, offices and shops across Bangalore",
];

let offset = 0;
const SUBCATEGORY_GROUPS_WITH_OFFSETS = SUBCATEGORY_GROUPS.map((group) => {
  const start = offset;
  offset += group.items.length;
  return { ...group, start };
});

export function ElectricalWorkContent() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <main className="bg-white text-ink">
      <section className="relative isolate overflow-hidden bg-ink text-white">
        <Image
          src={heroHandoff}
          alt=""
          priority
          className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/80 via-black/55 to-black/70" />
        <SiteNav variant="dark" />
        <div className="mx-auto grid max-w-7xl gap-8 px-4 pb-10 pt-24 md:px-8 md:pb-14 md:pt-28 lg:grid-cols-[1.1fr_.9fr] lg:items-center lg:gap-12">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Trusted electricians in Bangalore for every home and office job.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-white/75 md:text-lg">
              From a flickering light to a full wiring fault, Numunix connects you with verified,
              certified electricians in Bangalore for safe, dependable repair and installation work
              — at home or in the office.
            </p>
          </div>
          <div className="w-full">
            <div className="mb-4 grid gap-3">
              <a
                href={CONTACT.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/30 bg-ink/45 px-5 py-4 text-sm font-semibold text-white backdrop-blur transition hover:bg-white hover:text-ink"
              >
                <WhatsAppIcon className="h-4 w-4" /> Reach us on WhatsApp
              </a>
            </div>
            <ServiceBookingForm serviceName="Electrical Work" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand">What we do</p>
          <h2 className="mt-3 text-4xl font-extrabold tracking-tight text-ink">
            Complete electrical support for every job, big or small.
          </h2>
          <p className="mt-5 leading-7 text-muted-foreground">
            Our service is designed around clear advice, safe workmanship and a practical result you
            can rely on.
          </p>
        </div>
        <div className="mt-14 space-y-14">
          {SUBCATEGORY_GROUPS_WITH_OFFSETS.map((group) => (
            <div key={group.title}>
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand/10 text-brand">
                  <group.Icon className="h-5 w-5" />
                </span>
                <h3 className="text-xl font-bold text-ink">{group.title}</h3>
              </div>
              <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6 lg:grid-cols-4">
                {group.items.map((item, i) => (
                  <Link
                    key={item}
                    href="#book-service"
                    className="group relative flex min-h-[220px] flex-col overflow-hidden rounded-[1.75rem] bg-white p-5 ring-1 ring-border shadow-soft transition duration-300 hover:-translate-y-1 hover:border-brand/50 hover:shadow-card md:min-h-[240px] md:p-6"
                  >
                    <span
                      aria-hidden
                      className="absolute -right-9 -top-9 h-28 w-28 rounded-full bg-brand/[0.07] transition duration-500 group-hover:scale-150 group-hover:bg-brand/[0.12]"
                    />
                    <div className="relative flex items-start justify-between">
                      <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand/10 text-brand transition duration-300 group-hover:scale-105 group-hover:bg-brand group-hover:text-brand-foreground">
                        <group.Icon className="h-5 w-5" />
                      </span>
                      <span className="flex items-center gap-1 text-[10px] font-bold tracking-[0.16em] text-muted-foreground">
                        {String(group.start + i + 1).padStart(2, "0")}
                        <ArrowUpRight className="h-4 w-4 text-brand transition duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </span>
                    </div>
                    <div className="relative mt-auto">
                      <h3 className="text-base font-bold text-ink md:text-lg">{item}</h3>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">
                        Expert diagnostics, genuine parts and fast turnaround.
                      </p>
                      <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-brand opacity-80 transition group-hover:opacity-100">
                        Book this service <ArrowRight className="h-3.5 w-3.5" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-secondary/45 px-4 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand">
              Common issues
            </p>
            <h2 className="mt-3 text-4xl font-extrabold tracking-tight text-ink">
              We solve the problems that interrupt your day.
            </h2>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {PROBLEMS.map((problem) => (
              <div key={problem} className="rounded-3xl bg-white p-6 ring-1 ring-border">
                <Wrench className="h-5 w-5 text-brand" />
                <h3 className="mt-5 font-bold text-ink">{problem}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Get a clear diagnosis and the right next step.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 md:px-8 md:py-28">
        <div className="grid gap-10 rounded-[2rem] bg-ink p-7 text-white shadow-card md:p-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand">
              The Numunix standard
            </p>
            <h2 className="mt-4 text-4xl font-extrabold tracking-tight">
              A service experience built around trust.
            </h2>
            <div className="mt-8 grid gap-4">
              {BENEFITS.map((benefit) => (
                <div key={benefit} className="flex items-start gap-3 text-sm text-white/80">
                  <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
                  {benefit}
                </div>
              ))}
            </div>
          </div>
          <div id="book-service" className="rounded-3xl bg-white/10 p-6 ring-1 ring-white/15">
            <Clock3 className="h-6 w-6 text-brand" />
            <h3 className="mt-5 text-2xl font-bold">Book an Electrician visit</h3>
            <p className="mt-3 text-sm leading-6 text-white/75">
              Tell us about the issue and our team will help you choose the best next step.
            </p>
            <Link
              href="/contact"
              className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand px-5 py-3.5 text-sm font-semibold text-brand-foreground transition hover:brightness-110"
            >
              Request a callback <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={CONTACT.telUrl}
              className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/20 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-white hover:text-ink"
            >
              <Headset className="h-4 w-4" /> Call {CONTACT.phoneDisplay}
            </a>
          </div>
        </div>
      </section>

      <section className="bg-secondary/45 px-4 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand">FAQs</p>
            <h2 className="mt-3 text-4xl font-extrabold tracking-tight text-ink">
              Electrical work questions, answered.
            </h2>
          </div>
          <div className="mt-12 space-y-4">
            {ELECTRICAL_WORK_FAQS.map((faq, i) => (
              <article key={faq.question} className="rounded-3xl bg-white p-6 ring-1 ring-border">
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="flex w-full items-start justify-between gap-4 text-left"
                >
                  <span className="flex items-start gap-4">
                    <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
                    <span className="text-lg font-bold text-ink">{faq.question}</span>
                  </span>
                  <ChevronDown
                    className={`mt-0.5 h-5 w-5 shrink-0 text-brand transition ${
                      open === i ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {open === i && (
                  <p className="mt-3 pl-9 leading-7 text-muted-foreground">{faq.answer}</p>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
