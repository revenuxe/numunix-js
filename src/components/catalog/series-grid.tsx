"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Search, Tag } from "lucide-react";
import type { Series } from "@/lib/quote-types";

export function SeriesGrid({
  brandSlug,
  brandName,
  series,
}: {
  brandSlug: string;
  brandName: string;
  series: Series[];
}) {
  const [query, setQuery] = useState("");
  const filtered = useMemo(
    () => series.filter((s) => s.name.toLowerCase().includes(query.toLowerCase())),
    [series, query],
  );

  return (
    <div>
      <label className="mx-auto flex max-w-md items-center gap-2 rounded-xl border border-border bg-white px-3 py-2.5 shadow-soft">
        <Search className="h-4 w-4 text-muted-foreground" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={`Search ${brandName} series…`}
          className="w-full text-sm outline-none"
        />
      </label>

      {series.length === 0 ? (
        <div className="mt-9 rounded-3xl bg-white p-8 text-center text-sm text-muted-foreground ring-1 ring-border">
          No series available for this brand yet.
          <div className="mt-4">
            <Link href="/sell/laptops" className="text-sm font-semibold text-brand">
              Back to brands
            </Link>
          </div>
        </div>
      ) : (
        <div className="mt-9 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {filtered.map((s) => (
            <Link
              key={s.id}
              href={`/sell/laptops/${brandSlug}/${s.slug}`}
              className="group rounded-2xl border border-border bg-white p-5 shadow-soft ring-0 ring-brand/10 transition duration-200 hover:-translate-y-1 hover:border-brand hover:ring-4"
            >
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand/10 text-brand transition group-hover:bg-brand group-hover:text-brand-foreground">
                <Tag className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-bold text-ink">{s.name}</h3>
              <span className="mt-4 flex items-center gap-1 text-xs font-semibold text-brand">
                View <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
