import type { Metadata } from "next";
import { SiteFooter } from "@/components/site-footer";
import { Hero } from "@/components/home/hero";
import { CommonProblems } from "@/components/home/common-problems";
import { ServicesGrid } from "@/components/home/services-grid";
import { Showcase } from "@/components/home/showcase";
import { FindBanner } from "@/components/home/find-banner";
import { WhyChooseUs } from "@/components/home/why-choose-us";
import { Resources } from "@/components/home/resources";
import { FAQSection } from "@/components/home/faq-section";
import { DEFAULT_DESCRIPTION, DEFAULT_TITLE } from "@/lib/site";
import { HOME_FAQS } from "@/lib/faq-data";

export const metadata: Metadata = {
  title: DEFAULT_TITLE,
  description: DEFAULT_DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    url: "/",
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: HOME_FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function HomePage() {
  return (
    <main className="bg-white text-ink">
      <Hero />
      <CommonProblems />
      <ServicesGrid />
      <Showcase />
      <FindBanner />
      <WhyChooseUs />
      <Resources />
      <FAQSection />
      <SiteFooter />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </main>
  );
}
