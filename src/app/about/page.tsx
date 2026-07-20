import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ShieldCheck, Users, Wrench, Sparkles, Rocket, Heart } from "lucide-react";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { PageHero } from "@/components/page-hero";
import { WhatsAppIcon } from "@/components/whatsapp-icon";
import { CONTACT } from "@/lib/contact";
import teamImg from "@/assets/team-it.webp";
import whyImg from "@/assets/why-choose.webp";

export const metadata: Metadata = {
  title: { absolute: "About Numunix — Trusted IT Support Since 2020" },
  description:
    "Numunix has been serving customers with reliable laptop repair, desktop repair, CCTV and networking services since 2020, now available online since 2025.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Numunix",
    url: "/about",
  },
};

const VALUES = [
  {
    Icon: ShieldCheck,
    title: "Integrity first",
    desc: "Transparent estimates, honest diagnostics and genuine parts on every job — no upsells, no surprises.",
  },
  {
    Icon: Wrench,
    title: "Craftsmanship",
    desc: "Every repair is signed off by a certified engineer who takes personal responsibility for the work.",
  },
  {
    Icon: Heart,
    title: "Customer care",
    desc: "We speak your language, explain the fix and follow up after the work is done.",
  },
  {
    Icon: Sparkles,
    title: "Always learning",
    desc: "Continuous training on new hardware, security threats and business software keeps us sharp.",
  },
  {
    Icon: Users,
    title: "Local at heart",
    desc: "Numunix is proudly local. When you call us, a real engineer answers — not a call centre.",
  },
  {
    Icon: Rocket,
    title: "Built for growth",
    desc: "Whether you're a single laptop or a scaling office, our services grow with you.",
  },
];

export default function AboutPage() {
  const timeline = [
    {
      year: CONTACT.founded,
      title: "Numunix is founded",
      desc: "A small workbench with a big promise — reliable, honest IT service.",
    },
    {
      year: "2022",
      title: "Business AMC launched",
      desc: "We started supporting offices with annual maintenance contracts and dedicated SLAs.",
    },
    {
      year: "2023",
      title: "CCTV & Networking",
      desc: "Certified for CCTV installations and structured cabling for homes and small businesses.",
    },
    {
      year: CONTACT.onlineSince,
      title: "Numunix goes online",
      desc: "Book a certified engineer directly online — same care, wider reach.",
    },
  ];

  return (
    <main className="bg-white text-ink">
      <SiteNav variant="dark" />
      <PageHero
        eyebrow="About Numunix"
        title="Trusted IT partners"
        accent="since 2020."
        description="From a single workbench to a full-service IT company, we've spent years helping homes and businesses keep their technology running."
      />

      {/* Story */}
      <section className="mx-auto max-w-6xl px-4 py-20 md:px-8 md:py-28">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="overflow-hidden rounded-[2rem] ring-1 ring-border shadow-card">
            <Image src={teamImg} alt="Numunix team" className="h-full w-full object-cover" />
          </div>
          <div>
            <span className="text-sm font-semibold uppercase tracking-widest text-brand">
              Our Story
            </span>
            <h2 className="mt-3 text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
              A local IT shop that grew up with its customers.
            </h2>
            <div className="mt-6 space-y-4 text-muted-foreground">
              <p>
                Numunix began in {CONTACT.founded} as a small hands-on repair bench built around a
                simple idea — treat every laptop, every desktop and every business like it belongs
                to a friend. No jargon, no inflated quotes, just honest engineering.
              </p>
              <p>
                Word travelled. What started with laptop tune-ups and screen replacements grew into
                CCTV installations, structured networking and Annual Maintenance Contracts for
                growing offices across the city.
              </p>
              <p>
                In {CONTACT.onlineSince}, we took Numunix online so anyone can book a certified
                engineer in minutes — whether it's a sluggish home laptop or a full office rollout.
                The bench is bigger now, but the values haven't changed.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white hover:opacity-90"
              >
                Talk to us <ArrowRight className="h-4 w-4" />
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

      {/* Values */}
      <section className="bg-secondary/40 px-4 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-brand">
            What We Stand For
          </span>
          <h2 className="mt-3 text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
            The values that keep <span className="text-brand">IT running</span>.
          </h2>
        </div>
        <div className="mx-auto mt-14 grid max-w-6xl gap-6 md:grid-cols-3">
          {VALUES.map(({ Icon, title, desc }) => (
            <div
              key={title}
              className="rounded-3xl bg-white p-7 ring-1 ring-border shadow-soft transition hover:-translate-y-1 hover:shadow-card"
            >
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand/10 text-brand">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="mt-6 text-xl font-bold text-ink">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="mx-auto max-w-4xl px-4 py-20 md:px-8 md:py-28">
        <div className="text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-brand">
            Our Journey
          </span>
          <h2 className="mt-3 text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
            A brief timeline.
          </h2>
        </div>
        <ol className="mx-auto mt-12 max-w-2xl border-l border-border pl-8">
          {timeline.map((t) => (
            <li key={t.year} className="relative pb-10 last:pb-0">
              <span className="absolute -left-[41px] top-1 grid h-6 w-6 place-items-center rounded-full bg-brand text-[10px] font-bold text-brand-foreground">
                •
              </span>
              <p className="text-sm font-semibold text-brand">{t.year}</p>
              <h3 className="mt-1 text-xl font-bold text-ink">{t.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{t.desc}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* CTA banner */}
      <section className="px-4 pb-24 md:px-8">
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-ink px-6 py-14 text-white md:px-14 md:py-20">
          <Image
            src={whyImg}
            alt=""
            aria-hidden
            className="absolute inset-0 h-full w-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/80 to-ink/40" />
          <div className="relative max-w-2xl">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">
              Let's keep your <span className="text-brand">IT running</span>.
            </h2>
            <p className="mt-4 text-white/80">
              Book a certified Numunix engineer or send us a quick WhatsApp message — we usually
              reply within minutes.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-ink hover:bg-white/90"
              >
                Contact us <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={CONTACT.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand"
              >
                <WhatsAppIcon className="h-4 w-4" /> WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
