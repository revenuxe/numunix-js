import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  BadgeCheck,
  Zap,
  ShieldCheck,
  Wallet,
  CalendarClock,
  Headset,
  Wrench,
  Users,
  Cpu,
  Sparkles,
} from "lucide-react";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { PageHero } from "@/components/page-hero";
import { WhatsAppIcon } from "@/components/whatsapp-icon";
import { CONTACT } from "@/lib/contact";
import { buildBreadcrumbJsonLd } from "@/lib/breadcrumb";
import whyImg from "@/assets/why-choose.webp";

export const metadata: Metadata = {
  title: { absolute: "Why Numunix — Certified IT Engineers You Can Trust" },
  description:
    "Certified engineers, transparent pricing, genuine parts and fast turnaround. Here's why Numunix has been the trusted choice for IT support since 2020.",
  alternates: { canonical: "/why-us" },
  openGraph: {
    title: "Why Numunix",
    url: "/why-us",
  },
};

const breadcrumbJsonLd = buildBreadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Why Us", path: "/why-us" },
]);

const REASONS = [
  {
    Icon: BadgeCheck,
    title: "Certified engineers",
    desc: "Every technician is background-checked, certified and trained on the latest hardware, operating systems and business platforms.",
  },
  {
    Icon: Zap,
    title: "Fast diagnosis, faster fixes",
    desc: "Most issues are diagnosed the same day. Common laptop, desktop and network fixes are turned around within 24 hours.",
  },
  {
    Icon: ShieldCheck,
    title: "Genuine parts & software",
    desc: "We use only original, warranty-backed parts and licensed software — never grey-market replacements.",
  },
  {
    Icon: Wallet,
    title: "Transparent pricing",
    desc: "You get a clear estimate before we begin. No hidden charges, no surprise labour fees, no upsells.",
  },
  {
    Icon: CalendarClock,
    title: "Business AMC & SLAs",
    desc: "Annual maintenance contracts with defined response times keep your office productive year-round.",
  },
  {
    Icon: Headset,
    title: "Onsite & remote support",
    desc: "Choose an onsite visit for hands-on work or a secure remote session for quick fixes — whichever suits you.",
  },
  {
    Icon: Wrench,
    title: "Service warranty",
    desc: "Every Numunix repair comes with a service warranty. If the same issue returns, we fix it — no charge.",
  },
  {
    Icon: Users,
    title: "Dedicated engineer",
    desc: "You get a real person assigned to your ticket, not a rotating call-centre queue.",
  },
  {
    Icon: Cpu,
    title: "Full-stack IT",
    desc: "Hardware, networking, CCTV, printers, software and security — one team, one point of contact.",
  },
];

const PROCESS = [
  {
    step: "01",
    title: "You reach out",
    desc: "WhatsApp, call, email or the online form — however works for you.",
  },
  {
    step: "02",
    title: "We diagnose",
    desc: "A certified engineer inspects your device or site and shares a transparent estimate.",
  },
  {
    step: "03",
    title: "You approve",
    desc: "No work starts without your green light. You always know the price up front.",
  },
  {
    step: "04",
    title: "We fix it right",
    desc: "Genuine parts, careful workmanship and a full test before we hand it back.",
  },
  {
    step: "05",
    title: "We follow up",
    desc: "We check in to make sure everything is running smoothly — and stand behind our work.",
  },
];

export default function WhyUsPage() {
  return (
    <main className="bg-white text-ink">
      <SiteNav variant="dark" />
      <PageHero
        eyebrow="Why Numunix"
        title="IT support that"
        accent="actually shows up."
        description="Nine reasons homes and businesses have trusted us since 2020 — and why we take every ticket personally."
      />

      {/* Reasons grid */}
      <section className="mx-auto max-w-6xl px-4 py-20 md:px-8 md:py-28">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {REASONS.map(({ Icon, title, desc }) => (
            <div
              key={title}
              className="rounded-3xl bg-white p-7 ring-1 ring-border shadow-soft transition hover:-translate-y-1 hover:border-brand hover:ring-brand/60 hover:shadow-card"
            >
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand/10 text-brand">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="mt-6 text-xl font-bold text-ink">{title}</h3>
              <p className="mt-3 text-sm text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="bg-secondary/40 px-4 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-brand">
            Our Process
          </span>
          <h2 className="mt-3 text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
            Simple, honest, <span className="text-brand">predictable</span>.
          </h2>
          <p className="mt-4 text-muted-foreground">
            Five steps between a broken device and a happy customer.
          </p>
        </div>
        <div className="mx-auto mt-14 grid max-w-6xl gap-5 md:grid-cols-2 lg:grid-cols-5">
          {PROCESS.map((p) => (
            <div key={p.step} className="rounded-3xl bg-white p-6 ring-1 ring-border shadow-soft">
              <span className="inline-flex rounded-full bg-brand/10 px-3 py-1 text-xs font-bold text-brand">
                {p.step}
              </span>
              <h3 className="mt-4 text-lg font-bold text-ink">{p.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Feature strip */}
      <section className="mx-auto max-w-6xl px-4 py-20 md:px-8 md:py-28">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="relative order-2 lg:order-1">
            <Image
              src={whyImg}
              alt="Numunix engineer at work"
              className="aspect-[4/5] w-full rounded-[2rem] object-cover shadow-card"
            />
            <div className="absolute -bottom-6 -right-4 hidden rounded-2xl bg-white p-4 shadow-card ring-1 ring-border sm:block">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand text-brand-foreground">
                  <Sparkles className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground">
                    Service warranty
                  </p>
                  <p className="text-sm font-bold text-ink">On every repair</p>
                </div>
              </div>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <span className="text-sm font-semibold uppercase tracking-widest text-brand">
              What you get
            </span>
            <h2 className="mt-3 text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
              A partner, not just a repair shop.
            </h2>
            <ul className="mt-8 space-y-4 text-sm text-ink/80">
              {[
                "One dedicated engineer for your ticket, start to finish.",
                "Free basic diagnosis before any billable work.",
                "Photos and updates during larger repairs so you're never in the dark.",
                "Doorstep pickup and drop for supported service areas.",
                "Business AMC with clear SLAs and monthly health reports.",
                "Post-repair follow-up so we know the fix actually stuck.",
              ].map((line) => (
                <li key={line} className="flex items-start gap-3">
                  <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white hover:opacity-90"
              >
                Book a service <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={CONTACT.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand"
              >
                <WhatsAppIcon className="h-4 w-4" /> WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
    </main>
  );
}
