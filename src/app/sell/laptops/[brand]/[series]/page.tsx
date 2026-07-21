import type { Metadata } from "next";
import Image from "next/image";
import { Laptop } from "lucide-react";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { CatalogBreadcrumb } from "@/components/catalog/catalog-breadcrumb";
import { CatalogNotFound } from "@/components/catalog/catalog-not-found";
import { ModelGrid } from "@/components/catalog/model-grid";
import { getActiveBrandsForLaptops, getBrandWithSeries, getSeriesWithModels } from "@/lib/catalog";

export const revalidate = 60;

type Params = { brand: string; series: string };

export async function generateStaticParams() {
  const brands = await getActiveBrandsForLaptops();
  const params: Params[] = [];
  for (const brand of brands) {
    const result = await getBrandWithSeries(brand.slug);
    for (const s of result?.series ?? []) {
      params.push({ brand: brand.slug, series: s.slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { brand: brandSlug, series: seriesSlug } = await params;
  const result = await getSeriesWithModels(brandSlug, seriesSlug);
  if (!result) return {};
  const { brand, series } = result;
  return {
    title: { absolute: `${brand.name} ${series.name} Models — Instant Buyback Price | Numunix` },
    description: `Select your ${brand.name} ${series.name} model to get an instant laptop buyback price.`,
    alternates: { canonical: `/sell/laptops/${brand.slug}/${series.slug}` },
  };
}

export default async function SeriesModelsPage({ params }: { params: Promise<Params> }) {
  const { brand: brandSlug, series: seriesSlug } = await params;
  const result = await getSeriesWithModels(brandSlug, seriesSlug);
  // Only hit the DB a second time in the rare not-found case, so we can
  // still tell "no such brand" apart from "no such series under this brand".
  const brandOnly = result ? null : await getBrandWithSeries(brandSlug);
  const brand = result?.brand ?? brandOnly?.brand ?? null;
  const series = result?.series ?? null;
  const models = result?.models ?? [];

  return (
    <main className="min-h-screen bg-secondary/40 text-ink">
      <SiteNav />
      <section className="mx-auto max-w-[1024px] px-4 py-12 md:px-8">
        <CatalogBreadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Sell", href: "/sell/laptops" },
            ...(brand ? [{ label: brand.name, href: `/sell/laptops/${brand.slug}` }] : []),
            { label: series?.name ?? "Series" },
          ]}
        />

        {!brand ? (
          <div className="mt-8">
            <CatalogNotFound
              message="We couldn't find that brand."
              backHref="/sell/laptops"
              backLabel="Back to brands"
            />
          </div>
        ) : !series ? (
          <div className="mt-8">
            <CatalogNotFound
              message="We couldn't find that series."
              backHref={`/sell/laptops/${brand.slug}`}
              backLabel="Back to series"
            />
          </div>
        ) : (
          <>
            <div className="mt-6 flex items-center gap-4">
              <span className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-white shadow-soft ring-1 ring-border sm:h-20 sm:w-20">
                {brand.logo ? (
                  <Image
                    src={brand.logo}
                    alt={brand.name}
                    width={48}
                    height={48}
                    className="h-12 w-12 object-contain"
                  />
                ) : (
                  <Laptop className="h-8 w-8 text-brand" />
                )}
              </span>
              <div>
                <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
                  {brand.name} {series.name} Models
                </h1>
                <p className="mt-1 text-sm text-muted-foreground">
                  Select your model to get an instant laptop buyback price
                </p>
              </div>
            </div>

            <div className="mt-8">
              <ModelGrid
                brandSlug={brand.slug}
                seriesSlug={series.slug}
                brandName={brand.name}
                seriesName={series.name}
                models={models}
              />
            </div>
          </>
        )}
      </section>
      <SiteFooter />
    </main>
  );
}
