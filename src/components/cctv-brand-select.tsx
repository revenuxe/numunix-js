"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search } from "lucide-react";
import { CCTV_BRANDS, CCTV_NOT_SURE_LOGO } from "@/lib/cctv-brands";

export function CctvBrandSelect() {
  const [query, setQuery] = useState("");
  const filtered = useMemo(
    () => CCTV_BRANDS.filter((b) => b.name.toLowerCase().includes(query.toLowerCase())),
    [query],
  );

  return (
    <section id="brands" className="scroll-mt-20 px-4 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand">
              Brands we install &amp; service
            </p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Select your CCTV brand
            </h2>
            <p className="mt-3 text-muted-foreground">
              Choose your camera brand for installation, repair and AMC details specific to it.
            </p>
          </div>
          <label className="flex items-center gap-2 rounded-xl border border-border px-3 py-2.5 shadow-soft md:w-72">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search CCTV brands…"
              className="w-full text-sm outline-none"
            />
          </label>
        </div>
        <div className="mt-9 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {filtered.map((b) => (
            <Link
              key={b.slug}
              href={`/services/cctv-installation/brand/${b.slug}`}
              className="flex min-h-28 flex-col items-center justify-center rounded-2xl border border-border bg-white p-4 shadow-soft transition duration-200 hover:-translate-y-1 hover:border-brand"
            >
              <span className="grid h-16 w-16 place-items-center overflow-hidden rounded-xl">
                <Image src={b.logo} alt={b.name} className="h-full w-full object-contain" />
              </span>
              <span className="mt-3 text-sm font-bold">{b.name}</span>
            </Link>
          ))}
          {!query && (
            <Link
              href="/services/cctv-installation/brand/not-sure"
              className="flex min-h-28 flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-white p-4 shadow-soft transition duration-200 hover:-translate-y-1 hover:border-brand"
            >
              <span className="grid h-16 w-16 place-items-center overflow-hidden rounded-xl">
                <Image
                  src={CCTV_NOT_SURE_LOGO}
                  alt="Not sure of your CCTV brand"
                  className="h-full w-full object-contain"
                />
              </span>
              <span className="mt-3 text-sm font-bold">Not Sure</span>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
