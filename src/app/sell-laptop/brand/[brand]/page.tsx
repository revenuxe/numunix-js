import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SellLaptopContent } from "@/components/sell-laptop-content";
import { getActiveBrands, getLaptopCategory } from "@/lib/catalog";
import { SELL_LAPTOP_FAQS } from "@/lib/faq-data";
import {
  SELL_LAPTOP_BRANDS,
  buildBrandCopy,
  getSellLaptopBrand,
  heroProductName,
} from "@/lib/sell-laptop-brands";
import { SITE_URL } from "@/lib/site";

export const revalidate = 3600;

type Params = { brand: string };

export function generateStaticParams() {
  return SELL_LAPTOP_BRANDS.map((brand) => ({ brand: brand.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { brand: brandSlug } = await params;
  const brand = getSellLaptopBrand(brandSlug);
  if (!brand) return {};
  const product = heroProductName(brand);
  return {
    title: { absolute: `Sell Used ${product} in Bangalore - Instant Cash | Numunix` },
    description: `Sell your used ${product} in Bangalore for instant cash. Get a free instant quote, free doorstep pickup and same-day payment from Numunix certified engineers.`,
    alternates: { canonical: `/sell-laptop/brand/${brand.slug}` },
    openGraph: {
      title: `Sell Used ${product} in Bangalore - Instant Cash | Numunix`,
      url: `/sell-laptop/brand/${brand.slug}`,
    },
  };
}

export default async function SellLaptopBrandPage({ params }: { params: Promise<Params> }) {
  const { brand: brandSlug } = await params;
  const brand = getSellLaptopBrand(brandSlug);
  if (!brand) notFound();

  const category = await getLaptopCategory();
  const brands = category ? await getActiveBrands(category.id) : [];
  const brandCopy = buildBrandCopy(brand);
  const product = heroProductName(brand);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [...brandCopy.faqs, ...SELL_LAPTOP_FAQS].map(([question, answer]) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${product} Buyback in Bangalore`,
    description: `Instant buyback and free doorstep pickup for used ${product} devices in Bangalore.`,
    provider: { "@type": "LocalBusiness", name: "Numunix" },
    areaServed: { "@type": "Place", name: "Bangalore, Karnataka" },
    url: `${SITE_URL}/sell-laptop/brand/${brand.slug}`,
  };

  return (
    <>
      <SellLaptopContent brands={brands} brandSeo={brand} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
    </>
  );
}
