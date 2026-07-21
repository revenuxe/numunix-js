import type { Metadata } from "next";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { PageHero } from "@/components/page-hero";
import { BrandGrid } from "@/components/catalog/brand-grid";
import { getActiveBrandsForLaptops } from "@/lib/catalog";

export const metadata: Metadata = {
  title: { absolute: "Sell Your Laptop — Choose a Brand | Numunix" },
  description:
    "Select your laptop brand to get an instant buyback quote and free doorstep pickup in Bangalore.",
  alternates: { canonical: "/sell/laptops" },
};

export const revalidate = 60;

export default async function SellLaptopsPage() {
  const brands = await getActiveBrandsForLaptops();

  return (
    <main className="bg-white text-ink">
      <SiteNav variant="dark" />
      <PageHero
        eyebrow="Sell Your Laptop"
        title="Select your"
        accent="laptop brand"
        description="Pick your brand to find your exact model and get an instant buyback price."
      />
      <section className="mx-auto max-w-6xl px-4 py-16 md:px-8 md:py-24">
        <BrandGrid brands={brands} />
      </section>
      <SiteFooter />
    </main>
  );
}
