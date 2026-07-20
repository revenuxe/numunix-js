"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Laptop, Search } from "lucide-react";
import type { Brand } from "@/lib/quote-types";

export function BrandGrid({ brands }: { brands: Brand[] }) {
  const [query, setQuery] = useState("");
  const filtered = useMemo(
    () => brands.filter((b) => b.name.toLowerCase().includes(query.toLowerCase())),
    [brands, query],
  );

  return (
    <div>
      <label className="mx-auto flex max-w-md items-center gap-2 rounded-xl border border-border px-3 py-2.5 shadow-soft">
        <Search className="h-4 w-4 text-muted-foreground" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search laptop brands…"
          className="w-full text-sm outline-none"
        />
      </label>

      {brands.length === 0 ? (
        <div className="mt-9 rounded-3xl bg-white p-8 text-center text-sm text-muted-foreground ring-1 ring-border">
          No brands available yet. Please check back soon.
        </div>
      ) : (
        <div className="mt-9 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {filtered.map((brand) => (
            <Link
              key={brand.id}
              href={`/sell/laptops/${brand.slug}`}
              className="flex min-h-28 flex-col items-center justify-center gap-2 rounded-2xl border border-border bg-white p-4 shadow-soft transition duration-200 hover:-translate-y-1 hover:border-brand"
            >
              {brand.logo ? (
                <Image
                  src={brand.logo}
                  alt={brand.name}
                  width={40}
                  height={40}
                  className="h-10 w-10 rounded-xl object-contain"
                />
              ) : (
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-secondary text-lg font-extrabold text-brand">
                  <Laptop className="h-5 w-5" />
                </span>
              )}
              <span className="text-sm font-bold">{brand.name}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
