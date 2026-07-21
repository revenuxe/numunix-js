import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RepairLaptopContent } from "@/components/repair-laptop-content";
import { REPAIR_LAPTOP_FAQS } from "@/lib/faq-data";
import {
  REPAIR_LAPTOP_BRANDS,
  buildBrandCopy,
  getRepairLaptopBrand,
  heroProductName,
} from "@/lib/repair-laptop-brands";
import { SITE_URL } from "@/lib/site";

export const revalidate = 3600;

type Params = { brand: string };

export function generateStaticParams() {
  return REPAIR_LAPTOP_BRANDS.map((brand) => ({ brand: brand.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { brand: brandSlug } = await params;
  const brand = getRepairLaptopBrand(brandSlug);
  if (!brand) return {};
  const product = heroProductName(brand);
  return {
    title: { absolute: `Repair Your ${product} in Bangalore - Numunix` },
    description: `Get your ${product} repaired in Bangalore by certified technicians. Free doorstep pickup, genuine parts, transparent pricing and fast turnaround.`,
    alternates: { canonical: `/repair-laptop/brand/${brand.slug}` },
    openGraph: {
      title: `Repair Your ${product} in Bangalore - Numunix`,
      url: `/repair-laptop/brand/${brand.slug}`,
    },
  };
}

export default async function RepairLaptopBrandPage({ params }: { params: Promise<Params> }) {
  const { brand: brandSlug } = await params;
  const brand = getRepairLaptopBrand(brandSlug);
  if (!brand) notFound();

  const brandCopy = buildBrandCopy(brand);
  const product = heroProductName(brand);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [...brandCopy.faqs, ...REPAIR_LAPTOP_FAQS].map(([question, answer]) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${product} Repair Service in Bangalore`,
    description: `Certified ${product} repair with free doorstep pickup in Bangalore.`,
    provider: { "@type": "LocalBusiness", name: "Numunix" },
    areaServed: { "@type": "Place", name: "Bangalore, Karnataka" },
    url: `${SITE_URL}/repair-laptop/brand/${brand.slug}`,
  };

  return (
    <>
      <RepairLaptopContent brandSeo={brand} />
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
