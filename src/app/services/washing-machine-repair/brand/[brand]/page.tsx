import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, BadgeCheck, Check, Headset } from "lucide-react";

import { ServiceBookingForm } from "@/components/service-booking-form";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { WhatsAppIcon } from "@/components/whatsapp-icon";
import { WashingMachineServiceDisclaimer } from "@/components/washing-machine-service-disclaimer";
import { FloatingCallWidget } from "@/components/floating-call-widget";
import { ServiceContentCta } from "@/components/service-content-cta";
import { buildBreadcrumbJsonLd } from "@/lib/breadcrumb";
import { CONTACT } from "@/lib/contact";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import {
  getWashingMachineBrand,
  getWashingMachineBrandCopy,
  WASHING_MACHINE_BRANDS,
} from "@/lib/washing-machine-brands";
import heroHandoff from "@/assets/hero-handoff.webp";

type Params = { brand: string };

export function generateStaticParams() {
  return WASHING_MACHINE_BRANDS.map((brand) => ({ brand: brand.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { brand: slug } = await params;
  const brand = getWashingMachineBrand(slug);
  if (!brand) return {};
  const title = `${brand.name} Washing Machine Service Center Bangalore | Numunix`;
  return {
    title: { absolute: title },
    description: `Professional ${brand.name} washing machine repair and service in Bangalore for front-load, top-load and semi-automatic models. Diagnosis, repair and maintenance by Numunix.`,
    alternates: { canonical: `/services/washing-machine-repair/brand/${brand.slug}` },
    openGraph: { title, url: `/services/washing-machine-repair/brand/${brand.slug}` },
  };
}

export default async function WashingMachineBrandPage({ params }: { params: Promise<Params> }) {
  const { brand: slug } = await params;
  const brand = getWashingMachineBrand(slug);
  if (!brand) notFound();
  const brandCopy = getWashingMachineBrandCopy(slug);
  if (!brandCopy) notFound();

  const pagePath = `/services/washing-machine-repair/brand/${brand.slug}`;
  const faqs = [
    [
      `Do you repair ${brand.name} washing machines in Bangalore?`,
      `Yes. Numunix provides ${brand.name} washing machine service and repair in Bangalore for common front-load, top-load and semi-automatic machine faults.`,
    ],
    [
      `Why is my ${brand.name} washing machine not spinning or draining?`,
      `A blocked drain, pump issue, belt, motor or control fault can affect spinning and drainage. Our technician checks the machine and explains the right repair.`,
    ],
    [
      `Can you fix a leaking ${brand.name} washing machine?`,
      `Yes. We inspect the inlet, hoses, door seal, drain system and internal connections to locate the leak before recommending a repair.`,
    ],
    brandCopy.faq,
  ];
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${brand.name} Washing Machine Service Center Bangalore`,
    description: `${brand.name} washing machine repair and service for homes in Bangalore.`,
    provider: { "@type": "LocalBusiness", name: SITE_NAME },
    areaServed: { "@type": "City", name: "Bangalore" },
    url: `${SITE_URL}${pagePath}`,
  };
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(([question, answer]) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };

  return (
    <main className="bg-white text-ink">
      <section className="relative isolate overflow-hidden bg-ink text-white">
        <Image
          src={heroHandoff}
          alt=""
          priority
          className="absolute inset-0 -z-20 h-full w-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/80 via-black/55 to-black/70" />
        <SiteNav variant="dark" />
        <div className="mx-auto grid max-w-7xl gap-8 px-4 pb-10 pt-24 md:px-8 md:pb-14 md:pt-28 lg:grid-cols-[1.1fr_.9fr] lg:items-center lg:gap-12">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              {brand.name} Washing Machine{" "}
              <span className="text-[#0168fd]">Service Center Bangalore</span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-white/75 md:text-lg">
              {brand.name} washing machine repair at home in Bangalore.
            </p>
          </div>
          <div>
            <a
              href={CONTACT.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mb-4 inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/30 bg-ink/45 px-5 py-4 text-sm font-semibold backdrop-blur transition hover:bg-white hover:text-ink"
            >
              <WhatsAppIcon className="h-4 w-4" /> Reach us on WhatsApp
            </a>
            <ServiceBookingForm serviceName={`${brand.name} Washing Machine Repair`} />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-20 md:px-8 md:py-28">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand">
          {brand.name} repair specialists
        </p>
        <h2 className="mt-3 text-4xl font-extrabold tracking-tight">
          {brand.name} washing machine repair in Bangalore
        </h2>
        <div className="mt-6 space-y-5 leading-7 text-muted-foreground">
          <p>
            Looking for a {brand.name} washing machine service center in Bangalore? Numunix helps
            households with professional diagnostics and repair for {brand.name} front-load,
            top-load and semi-automatic washing machines. We focus on finding the actual fault,
            explaining the repair clearly and restoring reliable daily use.
          </p>
          <p>
            Our {brand.name} washing machine service covers machines that do not start, fail to fill
            or drain water, stop during the wash cycle, make unusual noise, vibrate excessively,
            leak, or leave clothes too wet after spinning. We also assist with routine servicing,
            installation checks and maintenance guidance.
          </p>
          <p>
            Our service experience includes {brand.repairFocus} Share the model number and the
            symptoms you notice when booking so our technician can plan the right inspection.
          </p>
          <p>{brandCopy.details}</p>
          <p>{brandCopy.tip}</p>
        </div>
        <div className="mt-10 grid gap-3 sm:grid-cols-2">
          {[
            "Front-load, top-load and semi-automatic machine support",
            "Drainage, pump, motor, belt and drum fault diagnosis",
            "Door-lock, inlet, leakage and spin-cycle repairs",
            "Clear repair advice and quality replacement parts when required",
          ].map((item) => (
            <div key={item} className="flex gap-3 rounded-2xl border border-border p-4 text-sm">
              <Check className="h-5 w-5 shrink-0 text-brand" />
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="bg-secondary/45 px-4 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-6xl grid gap-10 lg:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand">
              Common repairs
            </p>
            <h2 className="mt-3 text-4xl font-extrabold tracking-tight">
              What we fix on {brand.name} washing machines.
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {brandCopy.issues.map((item) => (
              <div key={item} className="rounded-2xl bg-white p-5 shadow-soft">
                <BadgeCheck className="h-5 w-5 text-brand" />
                <h3 className="mt-4 font-bold">{item}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Careful assessment and a practical repair recommendation.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ServiceContentCta
        eyebrow="Make the visit useful"
        title={`Help us understand your ${brand.name} washing machine issue.`}
        description="A short description can save time on the day. Let us know the model, whether the machine fills, drains or spins, and any error code or unusual sound. We will use that information to plan the right inspection and explain the repair in simple terms."
        points={[
          "Share the model number if it is easy to find.",
          "Note when in the wash cycle the problem occurs.",
          "Do not keep running a leaking or unusually noisy machine.",
          "Ask about the repair, parts and care advice before deciding.",
        ]}
        bookingLabel={`Discuss your ${brand.name} machine`}
      />

      <section className="mx-auto max-w-6xl px-4 py-20 md:px-8 md:py-28">
        <div className="grid gap-10 rounded-[2rem] bg-ink p-7 text-white md:p-12 lg:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand">
              Book a visit
            </p>
            <h2 className="mt-4 text-4xl font-extrabold">
              Need {brand.name} washing machine service?
            </h2>
            <p className="mt-4 leading-7 text-white/75">
              Tell us your model and the issue you are seeing. Our team will help you arrange the
              right next step.
            </p>
          </div>
          <div className="rounded-3xl bg-white/10 p-6">
            <Link
              href="/contact"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand px-5 py-3.5 text-sm font-semibold text-brand-foreground"
            >
              Request a callback <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={CONTACT.telUrl}
              className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/20 px-5 py-3.5 text-sm font-semibold"
            >
              <Headset className="h-4 w-4" /> Call {CONTACT.phoneDisplay}
            </a>
          </div>
        </div>
      </section>

      <section className="bg-secondary/45 px-4 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-4xl">
          <p className="text-center text-sm font-semibold uppercase tracking-[0.2em] text-brand">
            FAQs
          </p>
          <h2 className="mt-3 text-center text-4xl font-extrabold tracking-tight">
            {brand.name} washing machine questions, answered.
          </h2>
          <div className="mt-12 space-y-4">
            {faqs.map(([question, answer]) => (
              <article key={question} className="rounded-3xl bg-white p-6 ring-1 ring-border">
                <h3 className="text-lg font-bold">{question}</h3>
                <p className="mt-3 leading-7 text-muted-foreground">{answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <WashingMachineServiceDisclaimer brandName={brand.name} />
      <SiteFooter />
      <FloatingCallWidget />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            buildBreadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Washing Machine Repair", path: "/services/washing-machine-repair" },
              { name: brand.name, path: pagePath },
            ]),
          ),
        }}
      />
    </main>
  );
}
