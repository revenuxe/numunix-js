import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Check, ShieldCheck, Wallet, Wrench } from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { WhatsAppIcon } from "@/components/whatsapp-icon";
import { ServiceBookingForm } from "@/components/service-booking-form";
import { CONTACT } from "@/lib/contact";
import { CCTV_BRANDS } from "@/lib/cctv-brands";
import { SITE_URL } from "@/lib/site";
import { buildBreadcrumbJsonLd } from "@/lib/breadcrumb";
import heroHandoff from "@/assets/hero-handoff.webp";

const whatsapp =
  "https://wa.me/919886285028?text=" +
  encodeURIComponent(
    "Hi Numunix, I'm not sure which CCTV brand I need. Can you help me choose and install one?",
  );

const REASONS: [string, string, typeof Wrench][] = [
  [
    "We help you choose the right brand",
    "Tell us your property size, budget and how many cameras you need — we'll recommend the right brand and models, not just the one we have in stock.",
    Wrench,
  ],
  [
    "Certified across every major brand",
    "CP Plus, Hikvision, Dahua, EZVIZ, Godrej, Hi-Focus, TP-Link and more — our engineers install and service them all to the same standard.",
    ShieldCheck,
  ],
  [
    "Transparent pricing, no pressure",
    "You'll see a clear quote for cameras, DVR/NVR, cabling and installation before you commit to anything.",
    Wallet,
  ],
];

const FAQS: [string, string][] = [
  [
    "I don't know which CCTV brand to choose — can you help?",
    "Yes. Tell us about your property (home, shop, office), how many cameras you need and your budget, and our engineer will recommend a brand and setup that fits — during a free doorstep visit if needed.",
  ],
  [
    "My existing CCTV camera's brand isn't listed on your site — can you still service it?",
    "In almost all cases, yes. Our engineers work across every major CCTV brand sold in India. Share a photo of your camera or DVR/NVR on WhatsApp and we'll confirm before booking a visit.",
  ],
  [
    "Do you install budget and premium CCTV brands both?",
    "Yes. We install and service everything from budget Indian brands to premium international ones, and we're upfront about the trade-offs so you can pick what suits your property and budget.",
  ],
];

export const metadata: Metadata = {
  title: { absolute: "Not Sure Which CCTV Brand? We'll Help You Choose | Numunix" },
  description:
    "Not sure which CCTV brand to install? Numunix installs and services every major CCTV brand in Bangalore — free doorstep visit, transparent pricing and expert brand advice.",
  alternates: { canonical: "/services/cctv-installation/brand/not-sure" },
  openGraph: {
    title: "Not Sure Which CCTV Brand? We'll Help You Choose | Numunix",
    url: "/services/cctv-installation/brand/not-sure",
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
  name: "CCTV Installation for Any Brand in Bangalore",
  description:
    "CCTV brand selection advice and installation for any camera brand, with free doorstep visit in Bangalore.",
  provider: { "@type": "LocalBusiness", name: "Numunix" },
  areaServed: { "@type": "Place", name: "Bangalore, Karnataka" },
  url: `${SITE_URL}/services/cctv-installation/brand/not-sure`,
};

const breadcrumbJsonLd = buildBreadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "CCTV Installation", path: "/services/cctv-installation" },
  { name: "Not Sure", path: "/services/cctv-installation/brand/not-sure" },
]);

export default function CctvNotSurePage() {
  return (
    <main className="bg-white text-ink">
      <SiteNav variant="dark" />

      <section className="relative isolate overflow-hidden bg-ink text-white">
        <Image
          src={heroHandoff}
          alt=""
          priority
          className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/80 via-black/55 to-black/70" />
        <div className="mx-auto grid max-w-7xl gap-8 px-4 pb-10 pt-24 md:px-8 md:pb-14 md:pt-28 lg:grid-cols-[1.1fr_.9fr] lg:items-center lg:gap-12">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Not Sure Which{" "}
              <span className="bg-gradient-to-r from-sky-400 via-brand to-indigo-500 bg-clip-text text-transparent">
                CCTV Brand
              </span>{" "}
              You Need?
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-white/75 md:text-lg">
              You don't need to know the brand to get started. Tell us about your property and we'll
              recommend, install and service the right CCTV setup for you in Bangalore.
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
            <ServiceBookingForm serviceName="CCTV Installation" />
          </div>
        </div>
      </section>

      <section className="px-4 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-4xl">
          <p className="text-xs font-extrabold tracking-[.16em] text-brand">
            CCTV FOR EVERY BUDGET AND BRAND
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
            You don&apos;t need to pick a brand before you book
          </h2>
          <div className="mt-6 space-y-4 text-muted-foreground">
            <p className="leading-7">
              Most customers don't know the difference between CP Plus, Hikvision, Dahua, EZVIZ,
              Godrej, Hi-Focus and TP-Link before they call us — and that's fine. Our engineers
              assess your property, explain the trade-offs in plain language, and recommend a brand
              and camera count that fits your space and budget.
            </p>
            <p className="leading-7">
              Already have a CCTV system installed but aren't sure what brand it is? We can usually
              identify it from a photo and take over repair, AMC or expansion from there.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-secondary/45 px-4 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Why it&apos;s fine to not know the brand yet
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
          <p className="text-xs font-extrabold tracking-[.16em] text-brand">OR PICK A BRAND</p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Already know your brand?
          </h2>
          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
            {CCTV_BRANDS.map((b) => (
              <Link
                href={`/services/cctv-installation/brand/${b.slug}`}
                key={b.slug}
                className="text-sm font-semibold underline-offset-4 hover:text-brand hover:underline"
              >
                {b.name} CCTV installation
              </Link>
            ))}
          </div>
          <Link
            href="/services/cctv-installation#brands"
            className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-brand"
          >
            View all CCTV brands we install <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="bg-secondary/45 px-4 py-16 md:px-8 md:py-24">
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

      <section className="px-4 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-6xl rounded-3xl bg-[radial-gradient(circle_at_20%_20%,rgba(30,201,150,.2),transparent_24%),linear-gradient(135deg,#12203b,#0e2d34)] px-6 py-14 text-center text-white shadow-card">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Ready to secure your property?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-white/70">
            Book a free doorstep visit. We&apos;ll recommend the right CCTV setup and give you a
            transparent quote before any work starts.
          </p>
          <a
            href="#service-booking-form"
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-ink"
          >
            Book a Free Visit <ArrowRight className="h-4 w-4" />
          </a>
          <div className="mt-8 flex flex-wrap justify-center gap-x-7 gap-y-3 text-sm text-white/80">
            {["Free doorstep visit", "Any major brand", "Transparent pricing"].map((t) => (
              <span key={t} className="flex items-center gap-2">
                <Check className="h-4 w-4 text-emerald-300" />
                {t}
              </span>
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
      <SiteFooter />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
    </main>
  );
}
