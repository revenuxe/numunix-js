import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react";
import { notFound } from "next/navigation";

import { ServiceBookingForm } from "@/components/service-booking-form";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { ServiceContentCta } from "@/components/service-content-cta";
import { WhatsAppIcon } from "@/components/whatsapp-icon";
import { buildBreadcrumbJsonLd } from "@/lib/breadcrumb";
import { CONTACT } from "@/lib/contact";
import {
  ELECTRICAL_SERVICES,
  getElectricalService,
  getElectricalServiceSlugs,
} from "@/lib/electrical-services";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import heroHandoff from "@/assets/hero-handoff.webp";

export function generateStaticParams() {
  return getElectricalServiceSlugs().map((service) => ({ service }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ service: string }>;
}): Promise<Metadata> {
  const { service: slug } = await params;
  const service = getElectricalService(slug);
  if (!service) return {};
  const path = `/services/electrical-work/${service.slug}`;
  return {
    title: { absolute: service.seoTitle },
    description: service.description,
    alternates: { canonical: path },
    openGraph: { title: service.seoTitle, description: service.description, url: path },
  };
}

export default async function ElectricalServicePage({
  params,
}: {
  params: Promise<{ service: string }>;
}) {
  const { service: slug } = await params;
  const service = getElectricalService(slug);
  if (!service) notFound();
  const path = `/services/electrical-work/${service.slug}`;
  const bangaloreSuffix = " in Bangalore";
  const titleHasBangalore = service.hero.endsWith(bangaloreSuffix);
  const titleLead = titleHasBangalore
    ? service.hero.slice(0, -bangaloreSuffix.length)
    : service.hero;
  const related = Object.values(ELECTRICAL_SERVICES).filter((item) => item.slug !== service.slug);
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: service.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.description,
    provider: { "@type": "LocalBusiness", name: SITE_NAME },
    areaServed: "Bengaluru, Karnataka, India",
    url: `${SITE_URL}${path}`,
  };

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
            <p className="text-sm font-semibold uppercase tracking-[.2em] text-brand">
              Numunix electrical services
            </p>
            <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
              <span className="text-white">{titleLead}</span>
              {titleHasBangalore && <span className="text-[#0168fd]">{bangaloreSuffix}</span>}
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-white/75 md:text-lg">
              {service.description}
            </p>
            <a
              href={CONTACT.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex items-center gap-2 rounded-full border border-white/25 px-5 py-3 text-sm font-semibold transition hover:bg-white hover:text-ink"
            >
              <WhatsAppIcon className="h-4 w-4" /> Ask on WhatsApp
            </a>
          </div>
          <ServiceBookingForm serviceName={service.name} />
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-16 md:px-8 md:py-24">
        <p className="text-sm font-semibold uppercase tracking-[.2em] text-brand">What to expect</p>
        <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
          Helpful advice before practical work.
        </h2>
        <div className="mt-7 space-y-5 leading-7 text-muted-foreground">
          {service.intro.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>

      <section className="bg-secondary/45 px-4 py-16 md:px-8 md:py-24">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[.2em] text-brand">
              This service can help with
            </p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Start with the issue you can see.
            </h2>
            <div className="mt-7 grid gap-3">
              {service.signs.map((item) => (
                <p key={item} className="flex gap-3 rounded-2xl bg-white p-4 text-sm">
                  <ShieldCheck className="h-5 w-5 shrink-0 text-brand" />
                  {item}
                </p>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[.2em] text-brand">
              What we cover
            </p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
              The right scope for the job.
            </h2>
            <div className="mt-7 grid gap-3">
              {service.included.map((item) => (
                <p
                  key={item}
                  className="flex gap-3 rounded-2xl border border-border bg-white p-4 text-sm"
                >
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-brand" />
                  {item}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 md:px-8 md:py-24">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[.2em] text-brand">
            How a visit works
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Clear steps, no guesswork.
          </h2>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {service.process.map((step, index) => (
            <article key={step.title} className="rounded-3xl border border-border p-6">
              <span className="text-sm font-bold text-brand">0{index + 1}</span>
              <h3 className="mt-5 text-xl font-bold">{step.title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{step.body}</p>
            </article>
          ))}
        </div>
      </section>

      <ServiceContentCta
        eyebrow="Book with useful details"
        title={`Need ${service.shortName} in Bangalore?`}
        description="Tell us the symptoms, the location of the affected point and anything that has changed recently. That gives us a clearer starting point and helps arrange the most appropriate visit."
        points={[
          "Share the room, appliance or system involved.",
          "Mention error lights, tripping or unusual sounds.",
          "Keep unsafe electrical points switched off and clear.",
          "Ask questions before agreeing to the recommended work.",
        ]}
        bookingLabel={`Book ${service.shortName}`}
      />

      <section className="bg-secondary/45 px-4 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-4xl">
          <p className="text-center text-sm font-semibold uppercase tracking-[.2em] text-brand">
            Questions answered
          </p>
          <h2 className="mt-3 text-center text-3xl font-extrabold tracking-tight sm:text-4xl">
            Common {service.shortName} questions.
          </h2>
          <div className="mt-10 space-y-4">
            {service.faqs.map((faq) => (
              <article key={faq.question} className="rounded-3xl bg-white p-6 ring-1 ring-border">
                <h3 className="text-lg font-bold">{faq.question}</h3>
                <p className="mt-3 leading-7 text-muted-foreground">{faq.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 md:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl font-extrabold tracking-tight">
            Explore other electrical services
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((item) => (
              <Link
                key={item.slug}
                href={`/services/electrical-work/${item.slug}`}
                className="group rounded-2xl border border-border p-5 transition hover:border-brand"
              >
                <h3 className="font-bold">{item.name}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.description}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand">
                  Explore service{" "}
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <SiteFooter />
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
              { name: "Electrical Work", path: "/services/electrical-work" },
              { name: service.name, path },
            ]),
          ),
        }}
      />
    </main>
  );
}
