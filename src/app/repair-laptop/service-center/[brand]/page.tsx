import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RepairLaptopContent } from "@/components/repair-laptop-content";
import { REPAIR_LAPTOP_FAQS } from "@/lib/faq-data";
import {
  REPAIR_LAPTOP_BRANDS,
  buildServiceCenterCopy,
  getRepairLaptopBrand,
  heroProductName,
} from "@/lib/repair-laptop-brands";
import { SITE_URL } from "@/lib/site";
import { buildBreadcrumbJsonLd } from "@/lib/breadcrumb";

export const revalidate = 3600;

type Params = { brand: string };

export function generateStaticParams() {
  return REPAIR_LAPTOP_BRANDS.map((brand) => ({ brand: brand.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { brand: brandSlug } = await params;
  const brand = getRepairLaptopBrand(brandSlug);
  if (!brand) return {};
  const canonicalPath = `/repair-laptop/brand/${brand.slug}`;
  return {
    // This URL is a useful navigation route, but it is an alternate framing
    // of the corresponding repair page and does not contain enough distinct
    // primary content to deserve a competing search result.
    robots: { index: false, follow: true },
    alternates: { canonical: canonicalPath },
  };
}

export default async function LaptopServiceCenterBrandPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { brand: brandSlug } = await params;
  const brand = getRepairLaptopBrand(brandSlug);
  if (!brand) notFound();

  const brandCopy = buildServiceCenterCopy(brand);
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
    name: `${brand.serviceCenterName} in Bangalore`,
    description: `Independent, certified ${product} service with free doorstep pickup in Bangalore. Numunix is not an authorized or brand-owned service center for ${brand.name}.`,
    provider: { "@type": "LocalBusiness", name: "Numunix" },
    areaServed: { "@type": "Place", name: "Bangalore, Karnataka" },
    url: `${SITE_URL}/repair-laptop/service-center/${brand.slug}`,
  };

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Repair Laptop", path: "/repair-laptop" },
    { name: brand.serviceCenterName, path: `/repair-laptop/service-center/${brand.slug}` },
  ]);

  return (
    <>
      <RepairLaptopContent brandSeo={brand} variant="service-center" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
    </>
  );
}
