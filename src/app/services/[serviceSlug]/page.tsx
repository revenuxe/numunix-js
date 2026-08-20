import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  AirVent,
  ArrowRight,
  BadgeCheck,
  Clock3,
  Cog,
  Droplets,
  Headset,
  Microwave,
  Refrigerator,
  ShieldCheck,
  UtensilsCrossed,
  WashingMachine,
} from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { WhatsAppIcon } from "@/components/whatsapp-icon";
import { HeroWhatsAppCta } from "@/components/hero-whatsapp-cta";
import { ServiceBookingForm } from "@/components/service-booking-form";
import { CctvBrandSelect } from "@/components/cctv-brand-select";
import { WashingMachineBrandSelect } from "@/components/washing-machine-brand-select";
import { WashingMachineServiceDisclaimer } from "@/components/washing-machine-service-disclaimer";
import { FloatingCallWidget } from "@/components/floating-call-widget";
import { InternalLinksSection } from "@/components/internal-links-section";
import { ServiceContentCta } from "@/components/service-content-cta";
import { RepairLaptopContent } from "@/components/repair-laptop-content";
import { CONTACT } from "@/lib/contact";
import { getService, getServiceSlugs } from "@/lib/services";
import { REPAIR_LAPTOP_FAQS } from "@/lib/faq-data";
import { getServiceGuide } from "@/lib/service-guides";
import { getSubserviceHref } from "@/lib/computer-subservices";
import { SITE_NAME } from "@/lib/site";
import { buildBreadcrumbJsonLd } from "@/lib/breadcrumb";
import heroHandoff from "@/assets/hero-handoff.webp";

const APPLIANCE_SERVICE_ICONS = {
  "Washing Machine Repair": WashingMachine,
  "Refrigerator Repair": Refrigerator,
  "AC Repair": AirVent,
  "Microwave Oven Repair": Microwave,
  "Dishwasher Repair": UtensilsCrossed,
  "Water Purifier Repair": Droplets,
};

export function generateStaticParams() {
  return getServiceSlugs().map((serviceSlug) => ({ serviceSlug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ serviceSlug: string }>;
}): Promise<Metadata> {
  const { serviceSlug } = await params;
  const service = getService(serviceSlug);
  if (!service) return {};

  const path = `/services/${serviceSlug}`;
  return {
    title: { absolute: service.seoTitle },
    description: service.seoDescription,
    keywords: `${service.name}, ${service.keywords.join(", ")}, Numunix`,
    alternates: { canonical: path },
    openGraph: {
      title: service.seoTitle,
      description: service.seoDescription,
      type: "website",
      url: path,
    },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ serviceSlug: string }>;
}) {
  const { serviceSlug } = await params;
  const service = getService(serviceSlug);
  if (!service) notFound();

  // This is the canonical commercial laptop-repair page. Keep the complete
  // model, brand, service-centre, locality and booking hub here rather than
  // splitting that content between /repair-laptop and /services/laptop-repair.
  if (serviceSlug === "laptop-repair") {
    const path = "/services/laptop-repair";
    const faqJsonLd = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: REPAIR_LAPTOP_FAQS.map(([question, answer]) => ({
        "@type": "Question",
        name: question,
        acceptedAnswer: { "@type": "Answer", text: answer },
      })),
    };
    return (
      <>
        <RepairLaptopContent />
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
                { name: "Laptop Repair", path },
              ]),
            ),
          }}
        />
      </>
    );
  }
  const guide = getServiceGuide(serviceSlug);

  const accentIndex = service.heroAccent ? service.hero.indexOf(service.heroAccent) : -1;
  const heroBefore = accentIndex >= 0 ? service.hero.slice(0, accentIndex) : service.hero;
  const heroAfter =
    accentIndex >= 0 ? service.hero.slice(accentIndex + (service.heroAccent?.length ?? 0)) : "";

  const path = `/services/${serviceSlug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.seoDescription,
    provider: { "@type": "LocalBusiness", name: SITE_NAME },
    areaServed: "Bengaluru, Karnataka, India",
    url: path,
  };
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: service.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: service.name, path },
  ]);

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
              {heroBefore}
              {accentIndex >= 0 && <span className="text-[#0168fd]">{service.heroAccent}</span>}
              {heroAfter}
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-white/75 md:text-lg">
              {service.intro}
            </p>
          </div>
          <div className="w-full">
            <ServiceBookingForm serviceName={service.name} />
            <div className="mt-4">
              <HeroWhatsAppCta href={CONTACT.whatsappUrl} />
            </div>
          </div>
        </div>
      </section>

      {serviceSlug === "cctv-installation" && <CctvBrandSelect />}
      {serviceSlug === "washing-machine-repair" && <WashingMachineBrandSelect />}

      <section className="mx-auto grid max-w-6xl gap-12 px-4 py-20 md:px-8 md:py-28 lg:grid-cols-[.8fr_1.2fr] lg:items-start">
        <div className="lg:sticky lg:top-24">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand">What we do</p>
          <h2 className="mt-3 text-4xl font-extrabold tracking-tight text-ink">
            Complete {service.name.toLowerCase()} support.
          </h2>
          <p className="mt-5 leading-7 text-muted-foreground">
            Our service is designed around clear advice, skilled repair and a practical result you
            can rely on.
          </p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          {service.subServices.map((item, index) => {
            const ApplianceIcon =
              serviceSlug === "appliances-repair"
                ? APPLIANCE_SERVICE_ICONS[item as keyof typeof APPLIANCE_SERVICE_ICONS]
                : undefined;

            return (
              <Link
                key={item}
                href={
                  service.subServiceLinks?.[item] ??
                  getSubserviceHref(serviceSlug, item) ??
                  "#service-booking-form"
                }
                className="group relative min-w-0 overflow-hidden rounded-[1.75rem] border border-border bg-white p-6 shadow-soft transition duration-300 hover:-translate-y-1 hover:border-brand/50 hover:shadow-card"
              >
                <span
                  aria-hidden
                  className="absolute -right-8 -top-8 h-24 w-24 rounded-full border-[14px] border-brand/[0.07] transition duration-500 group-hover:scale-125 group-hover:border-brand/[0.12]"
                />
                <div className="relative flex items-start justify-between">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-brand/20 bg-brand/10 text-xs font-bold text-brand">
                    {ApplianceIcon ? (
                      <ApplianceIcon className="h-5 w-5" aria-hidden />
                    ) : (
                      `0${index + 1}`
                    )}
                  </span>
                  <ArrowRight className="h-5 w-5 shrink-0 text-brand transition duration-300 group-hover:translate-x-1" />
                </div>
                <h3 className="relative mt-7 break-words text-lg font-bold leading-snug text-ink">
                  {item}
                </h3>
                <p className="relative mt-3 text-sm leading-6 text-muted-foreground">
                  Professional assessment and dependable workmanship from a certified Numunix
                  engineer.
                </p>
                <span
                  aria-hidden
                  className="relative mt-6 block h-px w-12 bg-brand/40 transition-all duration-300 group-hover:w-full"
                />
              </Link>
            );
          })}
        </div>
      </section>

      {serviceSlug === "washing-machine-repair" && (
        <section className="mx-auto max-w-6xl px-4 py-20 md:px-8 md:py-28">
          <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand">
                Expert washing machine service
              </p>
              <h2 className="mt-3 text-4xl font-extrabold tracking-tight text-ink">
                A practical repair for every wash-day problem.
              </h2>
            </div>
            <div className="space-y-5 leading-7 text-muted-foreground">
              <p>
                A washing machine fault can disrupt an entire household. Whether you need front-load
                washing machine repair, top-load washing machine service or help with a
                semi-automatic model, Numunix starts with a careful inspection instead of guessing
                at the problem.
              </p>
              <p>
                We assess common faults such as drainage failure, spin-cycle issues, unusual noise,
                water leakage, door-lock errors, detergent dispenser problems and machines that will
                not power on. Once the cause is clear, we explain the recommended repair and any
                parts required, helping you make an informed decision.
              </p>
              <p>
                Regular washing machine maintenance can also prevent avoidable breakdowns. Our team
                can check hoses, filters, inlet connections, drum movement and general machine
                performance, then share simple care advice to help your appliance run reliably for
                longer.
              </p>
            </div>
          </div>
        </section>
      )}

      {guide && (
        <section className="mx-auto max-w-6xl px-4 py-20 md:px-8 md:py-28">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_.9fr] lg:gap-16">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand">
                Helpful before you book
              </p>
              <h2 className="mt-3 text-4xl font-extrabold tracking-tight text-ink">
                {guide.heading}
              </h2>
              <div className="mt-6 space-y-5 leading-7 text-muted-foreground">
                {guide.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
            <aside className="rounded-[2rem] bg-secondary/55 p-7 md:p-8">
              <h3 className="text-2xl font-bold text-ink">Useful details to share</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                A little context helps us guide you to the right next step.
              </p>
              <div className="mt-6 space-y-3">
                {guide.checklist.map((item) => (
                  <p key={item} className="flex gap-3 text-sm leading-6 text-ink">
                    <BadgeCheck className="h-5 w-5 shrink-0 text-brand" />
                    {item}
                  </p>
                ))}
              </div>
            </aside>
          </div>
        </section>
      )}

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
            {service.problems.map((problem) => (
              <div key={problem} className="rounded-3xl bg-white p-6 ring-1 ring-border">
                <Cog className="h-5 w-5 text-brand" />
                <h3 className="mt-5 font-bold text-ink">{problem}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Get a clear diagnosis and the right next step.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ServiceContentCta
        eyebrow="Before you book"
        title={`A straightforward way to arrange ${service.name.toLowerCase()}.`}
        description={`Start with the symptoms, not a guess at the repair. Tell Numunix what has changed, when it started and what you have already tried. We will explain the sensible options, expected work and next step in plain language.`}
        points={[
          "Share photos or error messages when you have them.",
          "Get the recommended work explained before it begins.",
          "Ask about timing, parts and after-service support.",
          "Choose a visit or callback that suits your schedule.",
        ]}
        bookingLabel={`Discuss your ${service.name.toLowerCase()}`}
      />

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
              {service.benefits.map((benefit) => (
                <div key={benefit} className="flex items-start gap-3 text-sm text-white/80">
                  <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
                  {benefit}
                </div>
              ))}
            </div>
          </div>
          <div id="book-service" className="rounded-3xl bg-white/10 p-6 ring-1 ring-white/15">
            <Clock3 className="h-6 w-6 text-brand" />
            <h3 className="mt-5 text-2xl font-bold">Book a {service.name} visit</h3>
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
              {service.name} questions, answered.
            </h2>
          </div>
          <div className="mt-12 space-y-4">
            {service.faqs.map((faq) => (
              <article key={faq.question} className="rounded-3xl bg-white p-6 ring-1 ring-border">
                <ShieldCheck className="h-5 w-5 text-brand" />
                <h3 className="mt-4 text-lg font-bold text-ink">{faq.question}</h3>
                <p className="mt-3 leading-7 text-muted-foreground">{faq.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <InternalLinksSection currentServiceSlug={serviceSlug} />
      {serviceSlug === "washing-machine-repair" && <WashingMachineServiceDisclaimer />}
      <SiteFooter />
      {serviceSlug === "washing-machine-repair" && <FloatingCallWidget />}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
    </main>
  );
}
