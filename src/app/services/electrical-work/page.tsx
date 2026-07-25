import type { Metadata } from "next";
import { ElectricalWorkContent } from "@/components/electrical-work-content";
import { ELECTRICAL_WORK_FAQS } from "@/lib/faq-data";
import { SITE_NAME } from "@/lib/site";
import { buildBreadcrumbJsonLd } from "@/lib/breadcrumb";

const path = "/services/electrical-work";

export const metadata: Metadata = {
  title: { absolute: "Electricians in Bangalore | Electrical Repair & Installation | Numunix" },
  description:
    "Trusted electricians in Bangalore for switchboard repair, fan & light installation, wiring, MCB, inverter and water motor services. Book a certified electrician today.",
  keywords:
    "Electricians in Bangalore, Electrical work, Switchboard repair, Fan installation, MCB repair, Inverter installation, Water motor installation, Numunix",
  alternates: { canonical: path },
  openGraph: {
    title: "Electricians in Bangalore | Electrical Repair & Installation | Numunix",
    description:
      "Trusted electricians in Bangalore for switchboard repair, fan & light installation, wiring, MCB, inverter and water motor services.",
    type: "website",
    url: path,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Electrical Work",
  description:
    "Electrician services in Bangalore covering consultation, installation, repair and maintenance of switchboards, fans, lights, wiring, inverters and water motors.",
  provider: { "@type": "LocalBusiness", name: SITE_NAME },
  areaServed: "Bengaluru, Karnataka, India",
  url: path,
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: ELECTRICAL_WORK_FAQS.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
};

const breadcrumbJsonLd = buildBreadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Electrical Work", path },
]);

export default function ElectricalWorkPage() {
  return (
    <>
      <ElectricalWorkContent />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
    </>
  );
}
