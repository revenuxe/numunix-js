import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SellLaptopContent } from "@/components/sell-laptop-content";
import { BANGALORE_AREAS, getBangaloreArea } from "@/lib/bangalore-areas";
import { getActiveBrands, getLaptopCategory } from "@/lib/catalog";
import { SELL_LAPTOP_FAQS } from "@/lib/faq-data";

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
    description: `Sell your old or used laptop in ${area.name}, Bangalore for instant cash. Get a free instant quote, free doorstep pickup and same-day payment for Apple, Dell, HP, Lenovo and more.`,
    alternates: { canonical: `/sell-laptop/${area.slug}` },
    openGraph: {
      title: `Sell Old Laptop in ${area.name}, Bangalore - Instant Cash | Numunix`,
      url: `/sell-laptop/${area.slug}`,
    },
  };
}

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: SELL_LAPTOP_FAQS.map(([question, answer]) => ({
    "@type": "Question",
    name: question,
    acceptedAnswer: { "@type": "Answer", text: answer },
  })),
};

export default async function SellLaptopAreaPage({ params }: { params: Promise<Params> }) {
  const { area: areaSlug } = await params;
  const area = getBangaloreArea(areaSlug);
  if (!area) notFound();

  const category = await getLaptopCategory();
  const brands = category ? await getActiveBrands(category.id) : [];

  return (
    <>
      <SellLaptopContent brands={brands} area={area} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </>
  );
}
