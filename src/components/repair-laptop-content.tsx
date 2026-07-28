"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Check,
  ChevronDown,
  CircleDollarSign,
  Laptop,
  MapPin,
  Search,
  ShieldCheck,
  Sparkles,
  Truck,
  Cog,
} from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { WhatsAppIcon } from "@/components/whatsapp-icon";
import { ServiceBookingForm } from "@/components/service-booking-form";
import { REPAIR_LAPTOP_FAQS } from "@/lib/faq-data";
import {
  BANGALORE_AREAS,
  buildAreaCopy,
  getNearbyAreas,
  type BangaloreArea,
} from "@/lib/bangalore-areas";
import {
  NOT_LISTED_BRAND_LOGO,
  REPAIR_LAPTOP_BRANDS,
  buildBrandCopy,
  buildBrandDisclaimer,
  buildServiceCenterCopy,
  heroProductName,
  type RepairLaptopBrand,
} from "@/lib/repair-laptop-brands";
import heroHandoff from "@/assets/hero-handoff.webp";

const whatsapp =
  "https://wa.me/919886579923?text=" +
  encodeURIComponent(
    "Hi Numunix, I want to get my laptop repaired in Bangalore. Please help me book a service.",
  );
const steps: [string, string, typeof Laptop][] = [
  [
    "Book a repair slot",
    "Tell us the issue, share your laptop's brand and pick a pickup slot that works for you.",
    Laptop,
  ],
  [
    "Free doorstep pickup",
    "A certified Numunix engineer collects your laptop, diagnoses the fault and shares a transparent price before any work starts.",
    Truck,
  ],
  [
    "Fast, warrantied repair",
    "We fix it with genuine or certified-compatible parts and return it fully tested — most repairs done in 24-48 hours.",
    ShieldCheck,
  ],
];
const benefits: [string, string, typeof Laptop][] = [
  [
    "Certified technicians",
    "Trained and experienced across every major laptop brand and model.",
    Cog,
  ],
  [
    "Genuine parts & warranty",
    "Certified-compatible or genuine parts, backed by a warranty on every repair.",
    ShieldCheck,
  ],
  ["Free pickup & drop", "Doorstep collection and return across all Bangalore localities.", Truck],
  [
    "Transparent pricing",
    "See your quote before we start work — no surprises at drop-off.",
    CircleDollarSign,
  ],
];

export function RepairLaptopContent({
  area,
  brandSeo,
  variant = "repair",
}: {
  area?: BangaloreArea;
  brandSeo?: RepairLaptopBrand;
  // "service-center" renders the dedicated "{Brand} Service Center" landing
  // pages (/repair-laptop/service-center/[brand]) — same layout as the plain
  // repair pages, but with service-center framed copy, brand-grid links that
  // stay within the service-center section, and the independent-provider
  // disclaimer. Ignored unless brandSeo is set.
  variant?: "repair" | "service-center";
}) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(0);
  const isServiceCenter = Boolean(brandSeo) && variant === "service-center";
  const filtered = useMemo(
    () => REPAIR_LAPTOP_BRANDS.filter((b) => b.name.toLowerCase().includes(query.toLowerCase())),
    [query],
  );
  const nearbyAreas = useMemo(() => (area ? getNearbyAreas(area) : BANGALORE_AREAS), [area]);
  const areaCopy = useMemo(() => (area ? buildAreaCopy(area) : null), [area]);
  const brandCopy = useMemo(
    () =>
      brandSeo
        ? isServiceCenter
          ? buildServiceCenterCopy(brandSeo)
          : buildBrandCopy(brandSeo)
        : null,
    [brandSeo, isServiceCenter],
  );
  const brandDisclaimer = useMemo(
    () => (brandSeo && isServiceCenter ? buildBrandDisclaimer(brandSeo) : null),
    [brandSeo, isServiceCenter],
  );
  const faqs = useMemo(() => {
    const extra = areaCopy?.faqs ?? brandCopy?.faqs ?? [];
    return [...extra, ...REPAIR_LAPTOP_FAQS];
  }, [areaCopy, brandCopy]);
  const serviceName = brandSeo
    ? `${heroProductName(brandSeo)} ${isServiceCenter ? "Service" : "Repair"}`
    : area
      ? `Laptop Repair in ${area.name}`
      : "Laptop Repair";
  const brandHref = (slug: string) =>
    isServiceCenter ? `/repair-laptop/service-center/${slug}` : `/repair-laptop/brand/${slug}`;

  return (
    <main className="bg-white text-ink">
      <SiteNav variant="dark" />

      {brandSeo ? (
        <section className="relative flex min-h-[100svh] flex-col overflow-hidden bg-ink text-white">
          <Image
            src={heroHandoff}
            alt={`Numunix engineer repairing a ${brandSeo.name} laptop`}
            priority
            className="absolute inset-0 h-full w-full object-cover object-center opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/40 lg:to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent" />

          <div className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-4 pb-6 pt-28 md:px-8 md:pb-8 md:pt-32 lg:pb-10 lg:pt-32">
            <div className="grid gap-7 md:grid-cols-[minmax(0,1fr)_minmax(300px,380px)] md:items-center md:gap-8 lg:gap-12">
              <div>
                <div className="max-w-2xl">
                  <h1 className="mt-6 text-[2rem] font-extrabold leading-[1.05] tracking-tight sm:text-6xl lg:mt-8 lg:text-6xl">
                    {isServiceCenter ? (
                      <>
                        <span className="text-brand">
                          {brandSeo.serviceCenterName.replace(" Service Center", "")}
                        </span>{" "}
                        Service Center
                      </>
                    ) : (
                      <>
                        Repair Your <span className="text-brand">{heroProductName(brandSeo)}</span>{" "}
                        in Bangalore
                      </>
                    )}
                  </h1>
                  <p className="mt-4 max-w-xl text-sm text-white/75 sm:mt-6 sm:text-lg">
                    {isServiceCenter ? (
                      <>
                        Certified expert technicians, transparent pricing, fast turnaround —{" "}
                        {heroProductName(brandSeo)} service with free doorstep pickup across
                        Bangalore.
                      </>
                    ) : (
                      <>
                        Certified technicians, transparent pricing, fast turnaround — free doorstep
                        pickup, genuine parts and a warranty on every {heroProductName(brandSeo)}{" "}
                        repair.
                      </>
                    )}
                  </p>

                  <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap lg:mt-8">
                    <a
                      href="#hero-booking-form"
                      className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-ink shadow-soft transition hover:bg-white/90 sm:w-auto lg:h-[62px] lg:px-8 lg:text-base"
                    >
                      Book Service
                      <ArrowRight className="h-4 w-4" />
                    </a>
                    <a
                      href={whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/25 bg-ink/60 px-6 py-3.5 text-sm font-semibold text-white shadow-soft backdrop-blur transition hover:bg-white hover:text-ink sm:w-auto lg:h-[62px] lg:px-8 lg:text-base"
                    >
                      <WhatsAppIcon className="h-4 w-4" />
                      Reach us on WhatsApp
                    </a>
                  </div>
                </div>

                <div className="mt-8 hidden flex-nowrap gap-2 lg:mt-10 lg:flex">
                  {(
                    [
                      ["Certified Technicians", Cog],
                      ["Genuine Parts", ShieldCheck],
                      ["Free Pickup", Truck],
                      ["Warranty Included", Check],
                    ] as [string, typeof Cog][]
                  ).map(([label, Icon]) => (
                    <div
                      key={label}
                      className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full bg-white/10 px-3 py-2 text-xs font-medium text-white ring-1 ring-white/20 backdrop-blur-md lg:h-[52px] lg:px-4 lg:text-sm"
                    >
                      <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand text-brand-foreground lg:h-7 lg:w-7">
                        <Icon className="h-3.5 w-3.5" />
                      </span>
                      {label}
                    </div>
                  ))}
                </div>
              </div>

              <div id="hero-booking-form" className="w-full md:max-w-[380px] md:justify-self-end">
                <ServiceBookingForm serviceName={serviceName} />
              </div>
            </div>
          </div>
        </section>
      ) : (
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
              Repair your{" "}
              <span className="bg-gradient-to-r from-sky-400 via-brand to-indigo-500 bg-clip-text text-transparent">
                laptop
              </span>{" "}
              in {area?.name ?? "Bangalore"}
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-white/75 md:text-lg">
              Get your laptop repaired by certified technicians. Free doorstep pickup across
              Bengaluru, transparent pricing and warrantied repairs — most done in 24-48 hours.
            </p>

            <div className="mx-auto mt-8 max-w-xl text-left">
              <ServiceBookingForm serviceName={serviceName} />
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
              Book instantly on WhatsApp
            </a>
          </div>
        </section>
      )}

      <section id="brands" className="scroll-mt-20 px-4 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                Choose your laptop brand
              </h2>
              <p className="mt-3 text-muted-foreground">
                Choose a brand to see repair details and book a service.
              </p>
            </div>
            <label className="flex items-center gap-2 rounded-xl border border-border px-3 py-2.5 shadow-soft md:w-72">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search laptop brands…"
                className="w-full text-sm outline-none"
              />
            </label>
          </div>
          <div className="mt-9 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {filtered.map((b) => (
              <Link
                key={b.slug}
                href={brandHref(b.slug)}
                className="flex min-h-28 flex-col items-center justify-center rounded-2xl border border-border bg-white p-4 shadow-soft transition duration-200 hover:-translate-y-1 hover:border-brand"
              >
                {b.logo ? (
                  <span className="grid h-16 w-16 place-items-center overflow-hidden rounded-xl">
                    <Image src={b.logo} alt={b.name} className="h-full w-full object-contain" />
                  </span>
                ) : (
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-secondary text-lg font-extrabold text-brand">
                    {b.name[0]}
                  </span>
                )}
                <span className="mt-3 text-sm font-bold">{b.name}</span>
              </Link>
            ))}
            {!query && (
              <Link
                href="/repair-laptop/brand/not-listed"
                className="flex min-h-28 flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-white p-4 shadow-soft transition duration-200 hover:-translate-y-1 hover:border-brand"
              >
                <span className="grid h-16 w-16 place-items-center overflow-hidden rounded-xl">
                  <Image
                    src={NOT_LISTED_BRAND_LOGO}
                    alt="Brand not listed"
                    className="h-full w-full object-contain"
                  />
                </span>
                <span className="mt-3 text-sm font-bold">Not Listed</span>
              </Link>
            )}
          </div>
        </div>
      </section>

      {(areaCopy || brandCopy) && (
        <section className="px-4 py-16 md:px-8 md:py-20">
          <div className="mx-auto max-w-4xl">
            <p className="text-xs font-extrabold tracking-[.16em] text-brand">
              {area
                ? `LAPTOP REPAIR IN ${area.name.toUpperCase()}`
                : isServiceCenter
                  ? `${brandSeo?.name.toUpperCase()} SERVICE CENTER`
                  : `REPAIR ${brandSeo?.name.toUpperCase()} LAPTOPS`}
            </p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
              {area
                ? `Repair your laptop in ${area.name}, Bangalore`
                : isServiceCenter
                  ? `${brandSeo?.serviceCenterName} in Bangalore`
                  : `Repair your ${heroProductName(brandSeo!)} in Bangalore`}
            </h2>
            <div className="mt-6 space-y-4 text-muted-foreground">
              {(areaCopy ?? brandCopy)!.intro.map((paragraph, i) => (
                <p key={i} className="leading-7">
                  {paragraph}
                </p>
              ))}
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {(areaCopy ?? brandCopy)!.whyBullets.map((bullet) => (
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
      )}

      <section className="bg-brand/5 px-4 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-extrabold tracking-[.16em] text-brand">
            REPAIR LAPTOP NEAR YOU
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
            {area ? `Areas near ${area.name} we also cover` : "Repair laptops across Bangalore"}
          </h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            {area
              ? `Free doorstep laptop repair pickup in ${area.name} and every neighbouring locality. Tap an area for its dedicated local page and instant booking.`
              : "Free doorstep laptop repair pickup in every major Bangalore locality. Tap your area for a dedicated local page and instant booking."}
          </p>
          <div className="mt-8 flex gap-3 overflow-x-auto pb-3">
            {nearbyAreas.map((a) => (
              <Link
                href={`/repair-laptop/${a.slug}`}
                key={a.slug}
                className="flex min-w-28 flex-col items-center gap-3 rounded-2xl bg-white p-4 text-center text-sm font-semibold shadow-soft transition hover:-translate-y-1 hover:text-brand"
              >
                <span className="grid h-11 w-11 place-items-center rounded-full bg-emerald-50 text-brand">
                  <MapPin className="h-5 w-5" />
                </span>
                {a.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-secondary/55 px-4 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-6xl text-center">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            How laptop repair works
          </h2>
          <p className="mt-3 text-muted-foreground">
            Three simple steps to a fully working laptop, anywhere in Bangalore.
          </p>
          <div className="mt-10 grid gap-5 text-left md:grid-cols-3">
            {steps.map(([t, d, I], i) => (
              <article
                key={t}
                className="relative overflow-hidden rounded-2xl bg-white p-6 shadow-soft"
              >
                <span className="absolute right-5 top-1 text-7xl font-extrabold text-brand/10">
                  0{i + 1}
                </span>
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
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            A more trustworthy way to repair
          </h2>
          <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map(([t, d, I]) => (
              <article key={t} className="rounded-2xl border border-border p-5">
                <I className="h-6 w-6 text-brand" />
                <h3 className="mt-4 font-bold">{t}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{d}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-secondary/55 px-4 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-center text-3xl font-extrabold tracking-tight sm:text-4xl">
            Frequently asked questions
          </h2>
          <div className="mt-9 space-y-3">
            {faqs.map(([q, a], i) => (
              <article key={q} className="rounded-2xl bg-white p-5 shadow-soft">
                <button
                  onClick={() => setOpen(i)}
                  className="flex w-full items-center justify-between gap-4 text-left font-bold"
                >
                  <span>{q}</span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-brand transition ${open === i ? "rotate-180" : ""}`}
                  />
                </button>
                {open === i && <p className="mt-4 text-sm leading-6 text-muted-foreground">{a}</p>}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border px-4 py-16 md:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-extrabold tracking-tight">
            {isServiceCenter
              ? "Laptop service center by brand in Bangalore"
              : "Repair laptop by brand in Bangalore"}
          </h2>
          <p className="mt-3 text-muted-foreground">
            {isServiceCenter
              ? "Explore dedicated service center pages and book a service for every laptop brand we support in Bengaluru."
              : "Explore detailed repair guides and book a service for every laptop brand we support in Bengaluru."}
          </p>
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3">
            {REPAIR_LAPTOP_BRANDS.map((b) => (
              <Link
                href={brandHref(b.slug)}
                key={b.slug}
                className="text-sm font-semibold underline-offset-4 hover:text-brand hover:underline"
              >
                {isServiceCenter ? b.serviceCenterName : `Repair ${b.name} laptop`}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-6xl rounded-3xl bg-[radial-gradient(circle_at_20%_20%,rgba(30,201,150,.2),transparent_24%),linear-gradient(135deg,#12203b,#0e2d34)] px-6 py-14 text-center text-white shadow-card">
          <Sparkles className="mx-auto h-7 w-7 text-emerald-300" />
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Ready to get your laptop repaired?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-white/70">
            Book a certified Numunix engineer in minutes. We will diagnose the issue at your
            doorstep and fix it with a transparent, upfront price.
          </p>
          <a
            href="#service-booking-form"
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-ink"
          >
            Book a Repair Now <ArrowRight className="h-4 w-4" />
          </a>
          <div className="mt-8 flex flex-wrap justify-center gap-x-7 gap-y-3 text-sm text-white/80">
            {["Free pickup & drop", "Genuine parts", "Warranty included"].map((t) => (
              <span key={t} className="flex items-center gap-2">
                <Check className="h-4 w-4 text-emerald-300" />
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {brandDisclaimer && (
        <section className="border-t border-border px-4 py-10 md:px-8">
          <div className="mx-auto max-w-4xl rounded-2xl bg-secondary/55 p-6 text-sm leading-6 text-muted-foreground md:p-7">
            <h2 className="text-sm font-bold text-ink">{brandDisclaimer.heading}</h2>
            <p className="mt-2">{brandDisclaimer.body}</p>
          </div>
        </section>
      )}

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
    </main>
  );
}
