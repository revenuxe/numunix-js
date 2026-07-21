import type { Metadata } from "next";
import { RepairLaptopContent } from "@/components/repair-laptop-content";
import { REPAIR_LAPTOP_FAQS } from "@/lib/faq-data";

export const metadata: Metadata = {
  title: { absolute: "Laptop Repair in Bangalore - Certified Technicians | Numunix" },
  description:
    "Get your laptop repaired in Bangalore by certified technicians. Free doorstep pickup, genuine parts, transparent pricing and fast turnaround for Apple, Dell, HP, Lenovo and more.",
  alternates: { canonical: "/repair-laptop" },
  openGraph: {
    title: "Laptop Repair in Bangalore - Certified Technicians | Numunix",
    url: "/repair-laptop",
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: REPAIR_LAPTOP_FAQS.map(([question, answer]) => ({
    "@type": "Question",
    name: question,
    acceptedAnswer: { "@type": "Answer", text: answer },
  })),
};

export default function RepairLaptopPage() {
  return (
    <>
      <RepairLaptopContent />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </>
  );
}
