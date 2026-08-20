import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { ServiceBookingForm } from "@/components/service-booking-form";
import { ServiceContentCta } from "@/components/service-content-cta";
import { HeroWhatsAppCta } from "@/components/hero-whatsapp-cta";
import {
  getComputerSubservice,
  getComputerSubserviceParams,
  COMPUTER_SUBSERVICES,
} from "@/lib/computer-subservices";
import { getService } from "@/lib/services";
import { buildBreadcrumbJsonLd } from "@/lib/breadcrumb";
import { CONTACT } from "@/lib/contact";

const LAPTOP_H1_ACCENTS: Record<string, string> = {
  "screen-hinge-repair": "Repair in Bangalore",
  "keyboard-trackpad-ports": "Port Repair",
  "battery-charging-power": "Power Repair",
  "ssd-data-speed": "Speed Optimisation",
  "overheating-fan-thermal": "Thermal Service",
  "windows-software": "Software Troubleshooting",
};

export function generateStaticParams() {
  return getComputerSubserviceParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ serviceSlug: string; subService: string }>;
}): Promise<Metadata> {
  const { serviceSlug, subService } = await params;
  const guide = getComputerSubservice(serviceSlug, subService);
  if (!guide) return {};
  const path = `/services/${serviceSlug}/${subService}`;
  return {
    title: { absolute: `${guide.title} | Numunix` },
    description: guide.description,
    alternates: { canonical: path },
    openGraph: { title: guide.title, description: guide.description, url: path },
  };
}

export default async function ComputerSubservicePage({
  params,
}: {
  params: Promise<{ serviceSlug: string; subService: string }>;
}) {
  const { serviceSlug, subService } = await params;
  const guide = getComputerSubservice(serviceSlug, subService);
  const parent = getService(serviceSlug);
  if (!guide || !parent) notFound();
  const accent =
    guide.parent === "laptop-repair"
      ? (LAPTOP_H1_ACCENTS[guide.slug] ?? "in Bangalore")
      : "in Bangalore";
  const titleHasAccent = guide.title.endsWith(` ${accent}`);
  const titleLead = titleHasAccent ? guide.title.slice(0, -(accent.length + 1)) : guide.title;
  const path = `/services/${serviceSlug}/${subService}`;
  const related = COMPUTER_SUBSERVICES.filter(
    (item) => item.parent === guide.parent && item.slug !== guide.slug,
  );
  return (
    <main className="bg-white text-ink">
      <section className="bg-ink text-white">
        <SiteNav variant="dark" />
        <div className="mx-auto grid max-w-7xl gap-8 px-4 pb-14 pt-28 md:px-8 lg:grid-cols-[1.1fr_.9fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[.2em] text-brand">
              {parent.name} in Bangalore
            </p>
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
              <span className="text-white">{titleLead}</span>
              {titleHasAccent && <span className="text-[#0168fd]"> {accent}</span>}
            </h1>
            <p className="mt-5 max-w-2xl leading-7 text-white/75">{guide.description}</p>
          </div>
          <div>
            <ServiceBookingForm serviceName={guide.title} />
            <div className="mt-4">
              <HeroWhatsAppCta href={CONTACT.whatsappUrl} />
            </div>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-5xl px-4 py-16 md:px-8 md:py-24">
        <p className="text-sm font-semibold uppercase tracking-[.2em] text-brand">
          A useful place to start
        </p>
        <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
          Understand the problem before choosing the fix.
        </h2>
        <div className="mt-7 space-y-5 leading-7 text-muted-foreground">
          {guide.overview.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </section>
      <section className="bg-secondary/45 px-4 py-16 md:px-8 md:py-24">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight">Signs this service may help</h2>
            <div className="mt-7 space-y-3">
              {guide.symptoms.map((item) => (
                <p key={item} className="flex gap-3 rounded-2xl bg-white p-4 text-sm">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-brand" />
                  {item}
                </p>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight">How we approach it</h2>
            <div className="mt-7 space-y-3">
              {guide.assessment.map((item, index) => (
                <article key={item} className="rounded-2xl border border-border bg-white p-5">
                  <p className="text-sm font-bold text-brand">0{index + 1}</p>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{item}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
      <ServiceContentCta
        eyebrow="Book with context"
        title={`Need help with ${guide.title.toLowerCase()}?`}
        description="Tell us the device model, the exact symptom and when it began. If the computer still works, back up important data before service; if it is overheating, smells unusual or has liquid damage, stop using it and let us know."
        points={[
          "Share any error message or unusual sound.",
          "Mention recent drops, spills, upgrades or updates.",
          "Bring the charger or relevant accessories where needed.",
          "Ask about parts, timing and warranty before work begins.",
        ]}
        bookingLabel="Book this service"
      />
      <section className="px-4 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-4xl">
          <p className="text-center text-sm font-semibold uppercase tracking-[.2em] text-brand">
            FAQs
          </p>
          <h2 className="mt-3 text-center text-3xl font-extrabold tracking-tight">
            Questions about this repair.
          </h2>
          <div className="mt-10 space-y-4">
            {guide.faqs.map(([q, a]) => (
              <article key={q} className="rounded-3xl border border-border p-6">
                <h3 className="text-lg font-bold">{q}</h3>
                <p className="mt-3 leading-7 text-muted-foreground">{a}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="border-t border-border px-4 py-16 md:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl font-extrabold">Related {parent.name.toLowerCase()} services</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <Link
                key={item.slug}
                href={`/services/${item.parent}/${item.slug}`}
                className="group rounded-2xl border border-border p-5 transition hover:border-brand"
              >
                <h3 className="font-bold">{item.title}</h3>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand">
                  Read guide <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <SiteFooter />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            buildBreadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: parent.name, path: `/services/${serviceSlug}` },
              { name: guide.title, path },
            ]),
          ),
        }}
      />
    </main>
  );
}
