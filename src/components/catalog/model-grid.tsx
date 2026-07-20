"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Laptop, Search } from "lucide-react";
import type { Model } from "@/lib/quote-types";

export function ModelGrid({
  brandSlug,
  seriesSlug,
  brandName,
  seriesName,
  models,
}: {
  brandSlug: string;
  seriesSlug: string;
  brandName: string;
  seriesName: string;
  models: Model[];
}) {
  const [query, setQuery] = useState("");
  const filtered = useMemo(
    () => models.filter((m) => m.name.toLowerCase().includes(query.toLowerCase())),
    [models, query],
  );

  return (
    <div>
      <label className="mx-auto flex max-w-md items-center gap-2 rounded-xl border border-border bg-white px-3 py-2.5 shadow-soft">
        <Search className="h-4 w-4 text-muted-foreground" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={`Search ${brandName} ${seriesName} models…`}
          className="w-full text-sm outline-none"
        />
      </label>

      {models.length === 0 ? (
        <div className="mt-9 rounded-3xl bg-white p-8 text-center text-sm text-muted-foreground ring-1 ring-border">
          No models available for this series yet.
          <div className="mt-4">
            <Link href={`/sell/laptops/${brandSlug}`} className="text-sm font-semibold text-brand">
              Back to series
            </Link>
          </div>
        </div>
      ) : (
        <div className="mt-9 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {filtered.map((m) => (
            <Link
              key={m.id}
              href={`/sell/laptops/${brandSlug}/${seriesSlug}/${m.slug}`}
              className="group rounded-2xl border border-border bg-white p-4 shadow-soft transition duration-200 hover:-translate-y-1 hover:border-emerald-400"
            >
              <div className="grid aspect-square place-items-center overflow-hidden rounded-xl bg-secondary/60">
                {m.image ? (
                  <Image
                    src={m.image}
                    alt={m.name}
                    width={160}
                    height={160}
                    className="h-full w-full object-contain p-4"
                  />
                ) : (
                  <Laptop className="h-10 w-10 text-muted-foreground" />
                )}
              </div>
              <p className="mt-3 text-center text-sm font-bold text-ink">{m.name}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
