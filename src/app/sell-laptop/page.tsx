import type { Metadata } from "next";
import { SellLaptopContent } from "@/components/sell-laptop-content";
import { SELL_LAPTOP_FAQS } from "@/lib/faq-data";
import { getActiveBrands, getLaptopCategory } from "@/lib/catalog";

export const revalidate = 60;

export const metadata: Metadata = {
  title: { absolute: "Sell Old Laptop in Bangalore - Instant Cash | Numunix" },
  description:
    "Sell your old or used laptop in Bangalore for instant cash. Get a free instant quote, free doorstep pickup and same-day payment for Apple, Dell, HP, Lenovo and more.",
  alternates: { canonical: "/sell-laptop" },
  openGraph: {
    title: "Sell Old Laptop in Bangalore - Instant Cash | Numunix",
    url: "/sell-laptop",
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: SELL_LAPTOP_FAQS.map(([question, answer]) => ({
    "@type": "Question",
    name: question,
    acceptedAnswer: { "@type": "Answer", text: answer },
  })),
};

export default async function SellLaptopPage() {
  const category = await getLaptopCategory();
  const brands = category ? await getActiveBrands(category.id) : [];

  return (
    <>
      <SellLaptopContent brands={brands} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </>
  );
}
