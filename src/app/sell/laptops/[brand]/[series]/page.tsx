import type { Metadata } from "next";
import Image from "next/image";
import { Laptop } from "lucide-react";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { CatalogBreadcrumb } from "@/components/catalog/catalog-breadcrumb";
import { CatalogNotFound } from "@/components/catalog/catalog-not-found";
import { ModelGrid } from "@/components/catalog/model-grid";
import {
  getActiveBrands,
  getActiveModels,
  getActiveSeries,
  getBrandBySlug,
  getLaptopCategory,
  getSeriesBySlug,
} from "@/lib/catalog";

export const revalidate = 60;

type Params = { brand: string; series: string };

export async function generateStaticParams() {
  const category = await getLaptopCategory();
  if (!category) return [];
  const brands = await getActiveBrands(category.id);
  const params: Params[] = [];
  for (const brand of brands) {
    const series = await getActiveSeries(brand.id);
    for (const s of series) {
      params.push({ brand: brand.slug, series: s.slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { brand: brandSlug, series: seriesSlug } = await params;
  const category = await getLaptopCategory();
  const brand = category ? await getBrandBySlug(category.id, brandSlug) : null;
  const series = brand ? await getSeriesBySlug(brand.id, seriesSlug) : null;
  if (!brand || !series) return {};
  return {
    title: { absolute: `${brand.name} ${series.name} Models — Instant Buyback Price | Numunix` },
    description: `Select your ${brand.name} ${series.name} model to get an instant laptop buyback price.`,
    alternates: { canonical: `/sell/laptops/${brand.slug}/${series.slug}` },
  };
}

export default async function SeriesModelsPage({ params }: { params: Promise<Params> }) {
  const { brand: brandSlug, series: seriesSlug } = await params;
  const category = await getLaptopCategory();
  const brand = category ? await getBrandBySlug(category.id, brandSlug) : null;
  const series = brand ? await getSeriesBySlug(brand.id, seriesSlug) : null;
  const models = series ? await getActiveModels(series.id) : [];

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
