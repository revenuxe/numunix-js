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
  LocateFixed,
  MapPin,
  Search,
  ShieldCheck,
  Sparkles,
  Truck,
  Wallet,
} from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { WhatsAppIcon } from "@/components/whatsapp-icon";
import { SELL_LAPTOP_FAQS } from "@/lib/faq-data";
import {
  BANGALORE_AREAS,
  buildAreaCopy,
  getNearbyAreas,
  type BangaloreArea,
} from "@/lib/bangalore-areas";
import { setSavedPincode } from "@/lib/session-quote";
import type { Brand } from "@/lib/quote-types";

const whatsapp =
  "https://wa.me/919886285028?text=" +
  encodeURIComponent(
    "Hi Numunix, I want to sell my used laptop in Bangalore. Please help me get a quote.",
  );
const steps: [string, string, typeof Laptop][] = [
  [
    "Get an instant quote",
    "Select your laptop, answer a few condition questions and see your price instantly.",
    Laptop,
  ],
  [
    "Free doorstep pickup",
    "Book a slot. Our verified agent comes to your Bangalore address and verifies the device.",
    Truck,
  ],
  [
    "Instant payment",
    "Once verified, get paid instantly via UPI or bank transfer — no waiting.",
    Wallet,
  ],
];
const benefits: [string, string, typeof Laptop][] = [
  [
    "Best market price",
    "Live valuation benchmarked for the Bangalore resale market.",
    CircleDollarSign,
  ],
  ["Safe & data-wiped", "Certified data erasure on every device we collect.", ShieldCheck],
  ["Free pickup", "Doorstep collection across all Bangalore localities.", Truck],
  ["Instant payment", "Money in your account the moment we verify your device.", Wallet],
];

export function SellLaptopContent({ brands, area }: { brands: Brand[]; area?: BangaloreArea }) {
  const [pin, setPin] = useState("");
  const [status, setStatus] = useState<"available" | "unavailable" | null>(null);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(0);
  const filtered = useMemo(
    () => brands.filter((b) => b.name.toLowerCase().includes(query.toLowerCase())),
    [brands, query],
  );
  const nearbyAreas = useMemo(() => (area ? getNearbyAreas(area) : BANGALORE_AREAS), [area]);
  const areaCopy = useMemo(() => (area ? buildAreaCopy(area) : null), [area]);
  const faqs = useMemo(
    () => (areaCopy ? [...areaCopy.faqs, ...SELL_LAPTOP_FAQS] : SELL_LAPTOP_FAQS),
    [areaCopy],
  );

  function onPincodeSubmit(e: React.FormEvent) {
    e.preventDefault();
    const isAvailable = /^560\d{3}$/.test(pin);
    setStatus(isAvailable ? "available" : "unavailable");
    if (pin) setSavedPincode(pin);
  }

  return (
    <main className="bg-white text-ink">
      <SiteNav />

      <section className="relative isolate overflow-hidden bg-[linear-gradient(135deg,#111a34_0%,#182847_55%,#0c172d_100%)] px-4 py-16 text-white md:px-8 md:py-24">
        <div className="absolute -right-28 -top-20 h-80 w-80 rounded-full bg-brand/35 blur-3xl" />
        <div className="absolute -bottom-40 -left-24 h-72 w-72 rounded-full bg-emerald-400/20 blur-3xl" />
        <div className="relative mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl md:text-6xl">
            Sell your old{" "}
            <span className="bg-gradient-to-r from-brand to-emerald-300 bg-clip-text text-transparent">
              laptop
            </span>{" "}
            in {area?.name ?? "Bangalore"}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-white/75 md:text-lg">
            Get the best price for your used laptop in minutes. Free doorstep pickup across
            Bengaluru and instant payment the moment we collect it.
          </p>
          <form
            onSubmit={onPincodeSubmit}
            className="mx-auto mt-8 max-w-xl rounded-2xl border border-white/15 bg-white/10 p-4 text-left shadow-card backdrop-blur-xl"
          >
            <label className="text-sm font-semibold">Your Bangalore pincode</label>
            <div className="mt-2 flex flex-col gap-2 sm:flex-row">
              <div className="flex flex-1 items-center gap-2 rounded-xl bg-white px-3 text-ink">
                <MapPin className="h-4 w-4 text-brand" />
                <input
                  value={pin}
                  onChange={(e) => {
                    setPin(e.target.value.replace(/\D/g, "").slice(0, 6));
                    setStatus(null);
                  }}
                  inputMode="numeric"
                  placeholder="e.g. 560001"
                  className="w-full bg-transparent py-3 text-sm outline-none"
                />
              </div>
              <button
                disabled={pin.length === 0}
                className={`inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-bold text-white transition ${
                  pin.length === 0
                    ? "cursor-not-allowed bg-brand/30 text-white/60"
                    : "bg-brand hover:brightness-110"
                }`}
              >
                {status === "available" ? "Get quote" : "Check"}
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
            {status && (
              <p
                className={`mt-3 flex items-center gap-2 text-sm ${status === "available" ? "text-emerald-300" : "text-amber-300"}`}
              >
                {status === "available" ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <LocateFixed className="h-4 w-4" />
                )}
                {status === "available"
                  ? `Great news — we offer free pickup at ${pin}.`
                  : "Pincode not available yet — but you can still book and we'll reach out."}
              </p>
            )}
            <div className="my-4 flex items-center gap-3 text-xs text-white/45 before:h-px before:flex-1 before:bg-white/15 after:h-px after:flex-1 after:bg-white/15">
              OR
            </div>
            <a
              href={whatsapp}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-4 py-3 text-sm font-bold"
            >
              <WhatsAppIcon className="h-5 w-5" />
              Sell instantly on WhatsApp
            </a>
          </form>
        </div>
      </section>

      {areaCopy && area && (
        <section className="px-4 py-16 md:px-8 md:py-20">
          <div className="mx-auto max-w-4xl">
            <p className="text-xs font-extrabold tracking-[.16em] text-brand">
              LAPTOP BUYBACK IN {area.name.toUpperCase()}
            </p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Sell your laptop in {area.name}, Bangalore
            </h2>
            <div className="mt-6 space-y-4 text-muted-foreground">
              {areaCopy.intro.map((paragraph, i) => (
                <p key={i} className="leading-7">
                  {paragraph}
                </p>
              ))}
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {areaCopy.whyBullets.map((bullet) => (
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

      <section id="brands" className="scroll-mt-20 px-4 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                Select your laptop brand
              </h2>
              <p className="mt-3 text-muted-foreground">
                Choose a brand to find your exact model and get an instant price.
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
          {brands.length === 0 ? (
            <p className="mt-9 rounded-2xl bg-secondary/40 p-6 text-center text-sm text-muted-foreground">
              Brands are being added soon. Message us on WhatsApp to sell your laptop right away.
            </p>
          ) : (
            <div className="mt-9 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
              {filtered.map((b) => (
                <Link
                  key={b.id}
                  href={`/sell/laptops/${b.slug}`}
                  className="flex min-h-28 flex-col items-center justify-center rounded-2xl border border-border bg-white p-4 shadow-soft transition duration-200 hover:-translate-y-1 hover:border-brand"
                >
                  {b.logo ? (
                    <Image
                      src={b.logo}
                      alt={b.name}
                      width={40}
                      height={40}
                      className="h-10 w-10 rounded-xl object-contain"
                    />
                  ) : (
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-secondary text-lg font-extrabold text-brand">
                      {b.name[0]}
                    </span>
                  )}
                  <span className="mt-3 text-sm font-bold">{b.name}</span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="bg-emerald-50/55 px-4 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-extrabold tracking-[.16em] text-brand">SELL LAPTOP NEAR YOU</p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
            {area ? `Areas near ${area.name} we also cover` : "Sell used laptops across Bangalore"}
          </h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            {area
              ? `Free doorstep laptop pickup in ${area.name} and every neighbouring locality. Tap an area for its dedicated local page and instant quote.`
              : "Free doorstep laptop pickup in every major Bangalore locality. Tap your area for a dedicated local page and instant quote."}
          </p>
          <div className="mt-8 flex gap-3 overflow-x-auto pb-3">
            {nearbyAreas.map((a) => (
              <Link
                href={`/sell-laptop/${a.slug}`}
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
            How selling your laptop works
          </h2>
          <p className="mt-3 text-muted-foreground">
            Three simple steps to instant cash, anywhere in Bangalore.
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
            A more trustworthy way to sell
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

      {brands.length > 0 && (
        <section className="border-t border-border px-4 py-16 md:px-8">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-3xl font-extrabold tracking-tight">
              Sell used laptop by brand in Bangalore
            </h2>
            <p className="mt-3 text-muted-foreground">
              Explore detailed guides and instant prices for every laptop brand we buy in Bengaluru.
            </p>
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3">
              {brands.slice(0, 6).map((b) => (
                <Link
                  href={`/sell/laptops/${b.slug}`}
                  key={b.id}
                  className="text-sm font-semibold underline-offset-4 hover:text-brand hover:underline"
                >
                  Sell used {b.name} laptop
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="px-4 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-6xl rounded-3xl bg-[radial-gradient(circle_at_20%_20%,rgba(30,201,150,.2),transparent_24%),linear-gradient(135deg,#12203b,#0e2d34)] px-6 py-14 text-center text-white shadow-card">
          <Sparkles className="mx-auto h-7 w-7 text-emerald-300" />
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Ready to sell your old laptop?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-white/70">
            Get an instant Numunix quote in minutes. We will verify the device at your doorstep and
            pay you the same day.
          </p>
          <Link
            href="/sell/laptops"
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-ink"
          >
            Sell Laptop Now <ArrowRight className="h-4 w-4" />
          </Link>
          <div className="mt-8 flex flex-wrap justify-center gap-x-7 gap-y-3 text-sm text-white/80">
            {["Free pickup", "Data-wipe support", "Instant payment"].map((t) => (
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
    </main>
  );
}
