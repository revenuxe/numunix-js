import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowRight, BadgeCheck, Check, Headset } from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { WhatsAppIcon } from "@/components/whatsapp-icon";
import { ServiceBookingForm } from "@/components/service-booking-form";
import { CONTACT } from "@/lib/contact";
import { CCTV_BRANDS, buildCctvBrandCopy, getCctvBrand } from "@/lib/cctv-brands";
import { SITE_URL } from "@/lib/site";
import { buildBreadcrumbJsonLd } from "@/lib/breadcrumb";
import heroHandoff from "@/assets/hero-handoff.webp";

export const revalidate = 3600;

type Params = { brand: string };

export function generateStaticParams() {
  return CCTV_BRANDS.map((brand) => ({ brand: brand.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { brand: brandSlug } = await params;
  const brand = getCctvBrand(brandSlug);
  if (!brand) return {};
  return {
    title: { absolute: `${brand.name} CCTV Installation & Repair in Bangalore | Numunix` },
    description: `Professional ${brand.name} CCTV camera installation, DVR/NVR setup, remote mobile viewing and repair in Bangalore by Numunix certified engineers. Free doorstep visit and transparent pricing.`,
    alternates: { canonical: `/services/cctv-installation/brand/${brand.slug}` },
    openGraph: {
      title: `${brand.name} CCTV Installation & Repair in Bangalore | Numunix`,
      url: `/services/cctv-installation/brand/${brand.slug}`,
    },
  };
}

export default async function CctvBrandPage({ params }: { params: Promise<Params> }) {
  const { brand: brandSlug } = await params;
  const brand = getCctvBrand(brandSlug);
  if (!brand) notFound();

  const copy = buildCctvBrandCopy(brand);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: copy.faqs.map(([question, answer]) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${brand.name} CCTV Installation & Repair in Bangalore`,
    description: `Certified ${brand.name} CCTV camera installation, DVR/NVR setup and repair with free doorstep visit in Bangalore.`,
    provider: { "@type": "LocalBusiness", name: "Numunix" },
    areaServed: { "@type": "Place", name: "Bangalore, Karnataka" },
    url: `${SITE_URL}/services/cctv-installation/brand/${brand.slug}`,
  };

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "CCTV Installation", path: "/services/cctv-installation" },
    { name: brand.name, path: `/services/cctv-installation/brand/${brand.slug}` },
  ]);

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
              {brand.name}{" "}
              <span className="bg-gradient-to-r from-sky-400 via-brand to-indigo-500 bg-clip-text text-transparent">
                CCTV
              </span>{" "}
              Installation &amp; Repair in Bangalore
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-white/75 md:text-lg">
              Certified {brand.name} camera installation, DVR/NVR setup, remote mobile viewing and
              repair for homes and businesses across Bangalore.
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
            <ServiceBookingForm serviceName={`${brand.name} CCTV Installation`} />
          </div>
        </div>
      </section>

      <section className="px-4 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-4xl">
          <p className="text-xs font-extrabold tracking-[.16em] text-brand">
            {brand.name.toUpperCase()} CCTV IN BANGALORE
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
            {brand.name} camera installation, AMC and repair
          </h2>
          <div className="mt-6 space-y-4 text-muted-foreground">
            {copy.intro.map((paragraph, i) => (
              <p key={i} className="leading-7">
                {paragraph}
              </p>
            ))}
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {copy.whyBullets.map((bullet) => (
              <div
                key={bullet}
                className="flex items-start gap-3 rounded-2xl border border-border bg-white p-4 text-sm"
              >
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                <span>{bullet}</span>
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
              A CCTV installation you can rely on.
            </h2>
            <div className="mt-8 grid gap-4">
              {[
                `Site visit to plan ${brand.name} camera placement for full coverage`,
                "Clean, secure cabling with no exposed wiring",
                "Remote mobile viewing configured before we leave",
                "AMC and repair support after installation",
              ].map((benefit) => (
                <div key={benefit} className="flex items-start gap-3 text-sm text-white/80">
                  <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
                  {benefit}
                </div>
              ))}
            </div>
          </div>
          <div id="book-service" className="rounded-3xl bg-white/10 p-6 ring-1 ring-white/15">
            <h3 className="text-2xl font-bold">Book a {brand.name} CCTV visit</h3>
            <p className="mt-3 text-sm leading-6 text-white/75">
              Tell us about your property and our team will help you choose the right {brand.name}{" "}
              camera setup.
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
              {brand.name} CCTV questions, answered.
            </h2>
          </div>
          <div className="mt-12 space-y-4">
            {copy.faqs.map(([question, answer]) => (
              <article key={question} className="rounded-3xl bg-white p-6 ring-1 ring-border">
                <h3 className="text-lg font-bold text-ink">{question}</h3>
                <p className="mt-3 leading-7 text-muted-foreground">{answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 md:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl font-extrabold tracking-tight">
            CCTV installation by brand in Bangalore
          </h2>
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3">
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
        </div>
      </section>

      <SiteFooter />
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
