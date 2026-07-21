import type { Metadata } from "next";
import Image from "next/image";
import { Laptop } from "lucide-react";
import { SiteNav } from "@/components/site-nav";
import { CatalogBreadcrumb } from "@/components/catalog/catalog-breadcrumb";
import { CatalogNotFound } from "@/components/catalog/catalog-not-found";
import { QuoteFunnel } from "@/components/catalog/quote-funnel";
import {
  getActiveBrandsForLaptops,
  getBrandWithSeries,
  getModelWithContext,
  getSeriesWithModels,
} from "@/lib/catalog";

export const revalidate = 60;

type Params = { brand: string; series: string; model: string };

export async function generateStaticParams() {
  const brands = await getActiveBrandsForLaptops();
  const params: Params[] = [];
  for (const brand of brands) {
    const brandResult = await getBrandWithSeries(brand.slug);
    for (const series of brandResult?.series ?? []) {
      const seriesResult = await getSeriesWithModels(brand.slug, series.slug);
      for (const model of seriesResult?.models ?? []) {
        params.push({ brand: brand.slug, series: series.slug, model: model.slug });
      }
    }
  }
  return params;
}

async function loadContext(params: Params) {
  const result = await getModelWithContext(params.brand, params.series, params.model);
  if (result) return result;
  // Only hit the DB again in the rare not-found case, so we can still tell
  // "no such series" apart from "no such model under this series".
  const seriesResult = await getSeriesWithModels(params.brand, params.series);
  return {
    brand: seriesResult?.brand ?? null,
    series: seriesResult?.series ?? null,
    model: null,
  };
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const resolved = await params;
  const { brand, series, model } = await loadContext(resolved);
  if (!brand || !series || !model) return {};
  return {
    title: { absolute: `Sell ${brand.name} ${model.name} — Instant Buyback Quote | Numunix` },
    description: `Get an instant buyback quote for your ${brand.name} ${model.name}. Free doorstep pickup and instant payment in Bangalore.`,
    alternates: { canonical: `/sell/laptops/${brand.slug}/${series.slug}/${model.slug}` },
  };
}

export default async function ModelQuotePage({ params }: { params: Promise<Params> }) {
  const resolved = await params;
  const { brand, series, model } = await loadContext(resolved);

  return (
    <main className="min-h-screen bg-[#f3faf7] text-ink">
      <SiteNav />
      <div className="mx-auto max-w-[768px] px-4 pt-8 md:px-8">
        <CatalogBreadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Sell", href: "/sell/laptops" },
            ...(brand ? [{ label: brand.name, href: `/sell/laptops/${brand.slug}` }] : []),
            ...(brand && series
              ? [{ label: series.name, href: `/sell/laptops/${brand.slug}/${series.slug}` }]
              : []),
            { label: model?.name ?? "Model" },
          ]}
        />

        {!brand || !series ? (
          <div className="mt-8">
            <CatalogNotFound
              message="We couldn't find that series."
              backHref="/sell/laptops"
              backLabel="Back to brands"
            />
          </div>
        ) : !model ? (
          <div className="mt-8">
            <CatalogNotFound
              message="We couldn't find that model."
              backHref={`/sell/laptops/${brand.slug}/${series.slug}`}
              backLabel="Back to models"
            />
          </div>
        ) : (
          <div className="mt-6 flex items-center gap-3 rounded-2xl bg-white p-3 shadow-soft ring-1 ring-border">
            <span className="grid h-14 w-14 shrink-0 place-items-center overflow-hidden rounded-xl bg-secondary/60">
              {model.image ? (
                <Image
                  src={model.image}
                  alt={model.name}
                  width={56}
                  height={56}
                  className="h-full w-full object-contain p-1.5"
                />
              ) : (
                <Laptop className="h-6 w-6 text-muted-foreground" />
              )}
            </span>
            <div className="min-w-0">
              <p className="truncate text-xs text-muted-foreground">
                {brand.name} · {series.name}
              </p>
              <p className="truncate text-sm font-bold text-ink">{model.name}</p>
            </div>
          </div>
        )}
      </div>

      {brand && series && model && <QuoteFunnel brand={brand} series={series} model={model} />}
    </main>
  );
}
