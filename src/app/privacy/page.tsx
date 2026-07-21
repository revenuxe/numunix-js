import type { Metadata } from "next";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { PageHero } from "@/components/page-hero";
import { CONTACT } from "@/lib/contact";
import { SITE_URL } from "@/lib/site";
import { buildBreadcrumbJsonLd } from "@/lib/breadcrumb";

export const metadata: Metadata = {
  title: { absolute: "Privacy Policy — Numunix" },
  description:
    "How Numunix collects, uses and protects your personal information. Read our full privacy policy.",
  alternates: { canonical: "/privacy" },
  openGraph: { url: "/privacy" },
  robots: { index: true, follow: true },
};

const breadcrumbJsonLd = buildBreadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Privacy Policy", path: "/privacy" },
]);

const webPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Privacy Policy",
  url: `${SITE_URL}/privacy`,
  isPartOf: { "@id": `${SITE_URL}/#website` },
};

const SECTIONS: { heading: string; body: string[] }[] = [
  {
    heading: "1. Introduction",
    body: [
      `This Privacy Policy explains how Numunix ("we", "us", "our") collects, uses, stores and shares personal information when you use our website, book a service, or interact with our engineers. Numunix has been serving customers since ${CONTACT.founded} and has been available online since ${CONTACT.onlineSince}.`,
      `By using our services, you agree to the practices described in this policy. If you do not agree, please do not use our services.`,
    ],
  },
  {
    heading: "2. Information We Collect",
    body: [
      `Contact details you share with us — name, phone number, email address and postal/ZIP code — when you book a service, request a callback or contact us via WhatsApp, email or phone.`,
      `Service details — the device, model, symptoms and any relevant history that helps our engineers diagnose and repair your equipment.`,
      `Payment information — when you pay for a service, we collect the amount and a transaction reference. We do not store card numbers or banking credentials on our servers.`,
      `Technical data — basic device, browser and network information collected automatically when you visit our website, used only to keep the site secure and reliable.`,
    ],
  },
  {
    heading: "3. How We Use Your Information",
    body: [
      `To schedule visits, diagnose issues, complete repairs and follow up on the work we do for you.`,
      `To send service updates, appointment reminders, invoices and receipts.`,
      `To improve our services, train our engineers and maintain the quality of our support.`,
      `To comply with applicable laws, respond to lawful requests and protect our rights.`,
    ],
  },
  {
    heading: "4. Data On Devices Sent For Repair",
    body: [
      `When you hand over a device for repair, our engineers may need to power it on and test it. We do not read, copy or extract personal files unless it is necessary to perform the requested work (for example, a data-recovery job) and you have authorised it.`,
      `We strongly recommend backing up your data before handing over any device. Numunix is not responsible for data loss caused by pre-existing faults, though we take reasonable care to preserve your data during service.`,
    ],
  },
  {
    heading: "5. Sharing Your Information",
    body: [
      `We do not sell your personal information. We share it only with trusted partners who help us deliver our services — for example, courier partners for device pickup or licensed vendors for genuine spare parts — and only to the extent required.`,
      `We may disclose information when required by law, a court order, or to protect the safety and rights of Numunix, our customers or the public.`,
    ],
  },
  {
    heading: "6. Data Retention",
    body: [
      `We keep your personal and service information only for as long as we need it to provide our services, honour warranties, comply with legal obligations and resolve disputes. When it is no longer needed, we securely delete or anonymise it.`,
    ],
  },
  {
    heading: "7. Security",
    body: [
      `We use reasonable technical and organisational measures to protect your information from unauthorised access, alteration, disclosure or destruction. No online system is perfectly secure, but we take security seriously and continually improve our practices.`,
    ],
  },
  {
    heading: "8. Your Rights",
    body: [
      `You may request access to the personal information we hold about you, ask us to correct inaccurate information, or request that we delete information we no longer need to keep. Contact us at ${CONTACT.email} or ${CONTACT.phoneDisplay} and we will respond within a reasonable time.`,
    ],
  },
  {
    heading: "9. Cookies",
    body: [
      `Our website uses a minimal set of cookies and similar technologies to keep the site working, remember your preferences and understand how visitors use it. You can control cookies through your browser settings.`,
    ],
  },
  {
    heading: "10. Third-Party Links",
    body: [
      `Our site may link to third-party websites. We are not responsible for the privacy practices of those sites — please read their policies before sharing information.`,
    ],
  },
  {
    heading: "11. Changes To This Policy",
    body: [
      `We may update this policy from time to time. When we do, we will update the "last updated" date below and, where appropriate, notify you directly.`,
    ],
  },
  {
    heading: "12. Contact Us",
    body: [
      `If you have questions or requests about this policy or your personal information, contact Numunix at ${CONTACT.email} or ${CONTACT.phoneDisplay}.`,
    ],
  },
];

export default function PrivacyPage() {
  return (
    <main className="bg-white text-ink">
      <SiteNav variant="dark" />
      <PageHero
        eyebrow="Legal"
        title="Privacy"
        accent="Policy"
        description="Your privacy matters to us. Here's exactly what we collect, why, and how we protect it."
      />
      <section className="mx-auto max-w-3xl px-4 py-20 md:px-8 md:py-28">
        <p className="text-xs uppercase tracking-widest text-muted-foreground">
          Last updated: 17 July 2026
        </p>
        <div className="mt-10 space-y-10">
          {SECTIONS.map((s) => (
            <div key={s.heading}>
              <h2 className="text-2xl font-bold text-ink">{s.heading}</h2>
              <div className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground md:text-base">
                {s.body.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
      <SiteFooter />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
    </main>
  );
}
