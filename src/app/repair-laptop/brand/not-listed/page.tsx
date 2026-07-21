import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Check, MapPin, ShieldCheck, Wrench } from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { WhatsAppIcon } from "@/components/whatsapp-icon";
import { ServiceBookingForm } from "@/components/service-booking-form";
import { REPAIR_LAPTOP_BRANDS } from "@/lib/repair-laptop-brands";
import { SITE_URL } from "@/lib/site";
import { buildBreadcrumbJsonLd } from "@/lib/breadcrumb";
import heroHandoff from "@/assets/hero-handoff.webp";

const whatsapp =
  "https://wa.me/919886285028?text=" +
  encodeURIComponent("Hi Numunix, my laptop brand isn't on your website. Can you still repair it?");

const REASONS: [string, string, typeof Wrench][] = [
  [
    "Cross-brand expertise",
    "Our engineers diagnose and repair laptops from every manufacturer, not just the popular names — the fault-finding process is the same regardless of the badge on the lid.",
    Wrench,
  ],
  [
    "Genuine or certified-compatible parts",
    "For less common or discontinued brands we source genuine, OEM or certified-compatible parts, and always confirm availability before we quote you.",
    ShieldCheck,
  ],
  [
    "Same free pickup, same warranty",
    "A laptop from a brand you don't see listed gets exactly the same doorstep pickup, transparent pricing and repair warranty as any other device.",
    Check,
  ],
];

const FAQS: [string, string][] = [
  [
    "My laptop brand isn't listed on your website — can you still repair it?",
    "Yes. The brands listed on our site are just the most commonly searched ones — our engineers repair laptops from every manufacturer, including less common, regional or discontinued brands. Book a repair or message us on WhatsApp with your brand and model and we'll confirm right away.",
  ],
  [
    "What if I don't know my laptop's exact brand or model?",
    "That's fine — a photo of the laptop (especially the underside, where the model number is usually printed) is enough for our engineer to identify it and get started.",
  ],
  [
    "Do you repair old, discontinued or imported laptop brands?",
    "In most cases, yes. Our engineers can diagnose the fault regardless of brand; the main constraint is part availability, which we check and confirm with you before starting any work.",
  ],
  [
    "Will an unlisted brand cost more to repair?",
    "Not necessarily. Pricing depends on the actual fault and part needed, not the brand name. You'll always see a transparent quote before we start.",
  ],
];

export const metadata: Metadata = {
  title: { absolute: "Laptop Brand Not Listed? We Still Repair It | Numunix" },
  description:
    "Can't find your laptop brand on our list? Numunix repairs laptops from every manufacturer in Bangalore — free doorstep pickup, transparent pricing and a warranty on every repair, whatever the brand.",
  alternates: { canonical: "/repair-laptop/brand/not-listed" },
  openGraph: {
    title: "Laptop Brand Not Listed? We Still Repair It | Numunix",
    url: "/repair-laptop/brand/not-listed",
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map(([question, answer]) => ({
    "@type": "Question",
    name: question,
    acceptedAnswer: { "@type": "Answer", text: answer },
  })),
};

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Laptop Repair for Any Brand in Bangalore",
  description:
    "Certified laptop repair for any brand, including manufacturers not listed on the website, with free doorstep pickup in Bangalore.",
  provider: { "@type": "LocalBusiness", name: "Numunix" },
  areaServed: { "@type": "Place", name: "Bangalore, Karnataka" },
  url: `${SITE_URL}/repair-laptop/brand/not-listed`,
};

const breadcrumbJsonLd = buildBreadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Repair Laptop", path: "/repair-laptop" },
  { name: "Not Listed", path: "/repair-laptop/brand/not-listed" },
]);

export default function NotListedBrandPage() {
  return (
    <main className="bg-white text-ink">
      <SiteNav variant="dark" />

      <section className="relative isolate overflow-hidden bg-ink px-4 pt-28 pb-16 text-white md:px-8 md:pb-24 md:pt-36">
        <Image
          src={heroHandoff}
          alt=""
          priority
          className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(0,0,0,0.68)_0%,rgba(0,0,0,0.48)_45%,rgba(0,0,0,0.8)_100%)]" />
        <div className="absolute -right-28 -top-20 h-80 w-80 rounded-full bg-brand/25 blur-3xl" />
        <div className="absolute -bottom-40 -left-24 h-72 w-72 rounded-full bg-brand/15 blur-3xl" />
        <div className="relative mx-auto max-w-3xl text-center">
          <h1 className="mt-2 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl md:mt-3 md:text-6xl">
            Don&apos;t See Your{" "}
            <span className="bg-gradient-to-r from-sky-400 via-brand to-indigo-500 bg-clip-text text-transparent">
              Laptop Brand
            </span>
            ? We Repair It Anyway
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-white/75 md:text-lg">
            The brands on our site are just the most searched ones — our certified technicians
            repair laptops from every manufacturer in Bangalore, with the same free pickup,
            transparent pricing and warranty.
          </p>

          <div className="mx-auto mt-8 max-w-xl text-left">
            <ServiceBookingForm serviceName="Laptop Repair" />
          </div>

          <div className="mx-auto mt-4 flex max-w-xl items-center gap-3 text-xs text-white/45 before:h-px before:flex-1 before:bg-white/15 after:h-px after:flex-1 after:bg-white/15">
            OR
          </div>
          <a
            href={whatsapp}
            target="_blank"
            rel="noreferrer"
            className="mx-auto mt-4 flex max-w-xl items-center justify-center gap-2 rounded-xl bg-emerald-500 px-4 py-3 text-sm font-bold"
          >
            <WhatsAppIcon className="h-5 w-5" />
            Ask us on WhatsApp
          </a>
        </div>
      </section>

      <section className="px-4 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-4xl">
          <p className="text-xs font-extrabold tracking-[.16em] text-brand">ANY BRAND, ANY MODEL</p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Not every laptop brand fits on one page — that doesn&apos;t mean we can&apos;t fix it
          </h2>
          <div className="mt-6 space-y-4 text-muted-foreground">
            <p className="leading-7">
              We keep a short list of the most-searched laptop brands on our site, but our engineers
              are trained to diagnose and repair laptops across every manufacturer — regional
              brands, business-only brands, gaming brands and older or discontinued names included.
            </p>
            <p className="leading-7">
              If your laptop's brand isn't on our list, book a repair below or send us a photo on
              WhatsApp. We'll confirm we can help and give you a transparent quote before any work
              starts.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-secondary/55 px-4 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Why an unlisted brand is still in safe hands
          </h2>
          <div className="mt-10 grid gap-5 text-left md:grid-cols-3">
            {REASONS.map(([t, d, I]) => (
              <article
                key={t}
                className="relative overflow-hidden rounded-2xl bg-white p-6 shadow-soft"
              >
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-emerald-50 text-brand">
                  <I className="h-5 w-5" />
                </span>
                <h3 className="mt-5 text-lg font-bold">{t}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{d}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-extrabold tracking-[.16em] text-brand">SEE THE FULL LIST</p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Or check if your brand is already listed
          </h2>
          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
            {REPAIR_LAPTOP_BRANDS.map((b) => (
              <Link
                href={`/repair-laptop/brand/${b.slug}`}
                key={b.slug}
                className="text-sm font-semibold underline-offset-4 hover:text-brand hover:underline"
              >
                Repair {b.name} laptop
              </Link>
            ))}
          </div>
          <Link
            href="/repair-laptop#brands"
            className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-brand"
          >
            <MapPin className="h-4 w-4" />
            View all laptop brands we repair
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="bg-secondary/55 px-4 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-center text-3xl font-extrabold tracking-tight sm:text-4xl">
            Frequently asked questions
          </h2>
          <div className="mt-9 space-y-4">
            {FAQS.map(([q, a]) => (
              <article key={q} className="rounded-2xl bg-white p-5 shadow-soft">
                <h3 className="font-bold text-ink">{q}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{a}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <a
        href={whatsapp}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-5 right-5 z-20 grid h-14 w-14 place-items-center rounded-full bg-emerald-500 text-white shadow-card transition hover:scale-105"
      >
        <WhatsAppIcon className="h-7 w-7" />
      </a>
      <SiteFooter showRepairLaptopMenu />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
    </main>
  );
}
