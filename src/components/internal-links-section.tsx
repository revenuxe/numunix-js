"use client";

import Link from "next/link";
import { ArrowRight, MapPin, Wrench } from "lucide-react";
import { BANGALORE_AREAS } from "@/lib/bangalore-areas";
import { SERVICES } from "@/lib/services";

const FEATURED_SERVICE_SLUGS = [
  "laptop-repair",
  "desktop-repair",
  "cctv-installation",
  "networking",
  "appliances-repair",
  "business-amc",
  "data-recovery",
  "hardware-upgrades",
];

const FEATURED_AREA_SLUGS = [
  "whitefield",
  "koramangala",
  "hsr-layout",
  "indiranagar",
  "electronic-city",
  "marathahalli",
];

export function InternalLinksSection({
  currentServiceSlug,
  currentAreaSlug,
}: {
  currentServiceSlug?: string;
  currentAreaSlug?: string;
}) {
  const services = FEATURED_SERVICE_SLUGS.filter((slug) => slug !== currentServiceSlug)
    .map((slug) => ({ slug, service: SERVICES[slug] }))
    .filter((item): item is { slug: string; service: NonNullable<(typeof SERVICES)[string]> } =>
      Boolean(item.service),
    )
    .slice(0, 6);
  const areas = FEATURED_AREA_SLUGS.filter((slug) => slug !== currentAreaSlug)
    .map((slug) => BANGALORE_AREAS.find((area) => area.slug === slug))
    .filter((area): area is NonNullable<typeof area> => Boolean(area))
    .slice(0, 5);

  return (
    <section className="border-t border-border bg-white px-4 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <div className="flex items-center gap-2 text-brand">
              <Wrench className="h-4 w-4" />
              <p className="text-sm font-semibold uppercase tracking-[0.2em]">Related services</p>
            </div>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
              Explore other ways we can help.
            </h2>
            <div className="mt-6 flex flex-wrap gap-3">
              {services.map(({ slug, service }) => (
                <Link
                  key={slug}
                  href={`/services/${slug}`}
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-2.5 text-sm font-semibold text-ink transition hover:border-brand hover:text-brand"
                >
                  {service.name} <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              ))}
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2 text-brand">
              <MapPin className="h-4 w-4" />
              <p className="text-sm font-semibold uppercase tracking-[0.2em]">Service areas</p>
            </div>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
              Find laptop repair near you.
            </h2>
            <div className="mt-6 flex flex-wrap gap-3">
              {areas.map((area) => (
                <Link
                  key={area.slug}
                  href={`/repair-laptop/${area.slug}`}
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-2.5 text-sm font-semibold text-ink transition hover:border-brand hover:text-brand"
                >
                  Laptop Repair in {area.name} <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
