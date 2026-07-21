import type { Metadata } from "next";
import Image from "next/image";
import { Laptop } from "lucide-react";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { CatalogBreadcrumb } from "@/components/catalog/catalog-breadcrumb";
import { CatalogNotFound } from "@/components/catalog/catalog-not-found";
import { SeriesGrid } from "@/components/catalog/series-grid";
import { getActiveBrandsForLaptops, getBrandWithSeries } from "@/lib/catalog";

export const revalidate = 60;

type Params = { brand: string };

export async function generateStaticParams() {
  const brands = await getActiveBrandsForLaptops();
  return brands.map((brand) => ({ brand: brand.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { brand: brandSlug } = await params;
  const result = await getBrandWithSeries(brandSlug);
  if (!result) return {};
  const { brand } = result;
  return {
    title: { absolute: `${brand.name} Laptop Series — Sell Your ${brand.name} Laptop | Numunix` },
    description: `Select your ${brand.name} laptop series to get an instant buyback quote and free doorstep pickup in Bangalore.`,
    alternates: { canonical: `/sell/laptops/${brand.slug}` },
  };
}

export default async function BrandSeriesPage({ params }: { params: Promise<Params> }) {
  const { brand: brandSlug } = await params;
  const result = await getBrandWithSeries(brandSlug);
  const brand = result?.brand ?? null;
  const series = result?.series ?? [];

  return (
    <main className="min-h-screen bg-secondary/40 text-ink">
      <SiteNav />
      <section className="mx-auto max-w-[1024px] px-4 py-12 md:px-8">
        <CatalogBreadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Sell", href: "/sell/laptops" },
            { label: brand?.name ?? "Brand" },
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
                  {brand.name} laptop series
                </h1>
                <p className="mt-1 text-sm text-muted-foreground">
                  Select your series to find your exact model
                </p>
              </div>
            </div>

            <div className="mt-8">
              <SeriesGrid brandSlug={brand.slug} brandName={brand.name} series={series} />
            </div>
          </>
        )}
      </section>
      <SiteFooter />
    </main>
  );
}
