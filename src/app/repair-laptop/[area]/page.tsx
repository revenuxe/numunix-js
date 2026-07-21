import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RepairLaptopContent } from "@/components/repair-laptop-content";
import { BANGALORE_AREAS, buildAreaCopy, getBangaloreArea } from "@/lib/bangalore-areas";
import { REPAIR_LAPTOP_FAQS } from "@/lib/faq-data";
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
    title: { absolute: `Laptop Repair in ${area.name}, Bangalore - Numunix` },
    description: `Get your laptop repaired in ${area.name}, Bangalore (PIN ${area.pincode}) by certified technicians. Free doorstep pickup, genuine parts and fast turnaround for Apple, Dell, HP, Lenovo and more.`,
    alternates: { canonical: `/repair-laptop/${area.slug}` },
    openGraph: {
      title: `Laptop Repair in ${area.name}, Bangalore - Numunix`,
      url: `/repair-laptop/${area.slug}`,
    },
  };
}

export default async function RepairLaptopAreaPage({ params }: { params: Promise<Params> }) {
  const { area: areaSlug } = await params;
  const area = getBangaloreArea(areaSlug);
  if (!area) notFound();

  const areaCopy = buildAreaCopy(area);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [...areaCopy.faqs, ...REPAIR_LAPTOP_FAQS].map(([question, answer]) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Laptop Repair in ${area.name}, Bangalore`,
    description: `Certified laptop repair with free doorstep pickup for used laptops in ${area.name}, Bangalore (PIN ${area.pincode}).`,
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
    url: `${SITE_URL}/repair-laptop/${area.slug}`,
  };

  return (
    <>
      <RepairLaptopContent area={area} />
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
