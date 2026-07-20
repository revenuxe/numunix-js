import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SellLaptopContent } from "@/components/sell-laptop-content";
import { BANGALORE_AREAS, buildAreaCopy, getBangaloreArea } from "@/lib/bangalore-areas";
import { getActiveBrands, getLaptopCategory } from "@/lib/catalog";
import { SELL_LAPTOP_FAQS } from "@/lib/faq-data";
import { SITE_URL } from "@/lib/site";

export const revalidate = 3600;

type Params = { area: string };

export function generateStaticParams() {
  return BANGALORE_AREAS.map((area) => ({ area: area.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { area: areaSlug } = await params;
  const area = getBangaloreArea(areaSlug);
  if (!area) return {};
  return {
    title: { absolute: `Sell Old Laptop in ${area.name}, Bangalore - Instant Cash | Numunix` },
    description: `Sell your old or used laptop in ${area.name}, Bangalore (PIN ${area.pincode}) for instant cash. Get a free instant quote, free doorstep pickup and same-day payment for Apple, Dell, HP, Lenovo and more.`,
    alternates: { canonical: `/sell-laptop/${area.slug}` },
    openGraph: {
      title: `Sell Old Laptop in ${area.name}, Bangalore - Instant Cash | Numunix`,
      url: `/sell-laptop/${area.slug}`,
    },
  };
}

export default async function SellLaptopAreaPage({ params }: { params: Promise<Params> }) {
  const { area: areaSlug } = await params;
  const area = getBangaloreArea(areaSlug);
  if (!area) notFound();

  const category = await getLaptopCategory();
  const brands = category ? await getActiveBrands(category.id) : [];
  const areaCopy = buildAreaCopy(area);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [...areaCopy.faqs, ...SELL_LAPTOP_FAQS].map(([question, answer]) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Laptop Buyback in ${area.name}, Bangalore`,
    description: `Instant laptop buyback and free doorstep pickup for used laptops in ${area.name}, Bangalore (PIN ${area.pincode}).`,
    provider: { "@type": "LocalBusiness", name: "Numunix" },
    areaServed: {
      "@type": "Place",
      name: `${area.name}, Bangalore`,
      address: {
        "@type": "PostalAddress",
        addressLocality: area.name,
        addressRegion: "Karnataka",
        postalCode: area.pincode,
        addressCountry: "IN",
      },
    },
    url: `${SITE_URL}/sell-laptop/${area.slug}`,
  };

  return (
    <>
      <SellLaptopContent brands={brands} area={area} />
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
