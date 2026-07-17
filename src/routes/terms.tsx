import { createFileRoute } from "@tanstack/react-router";
import { SiteNav, SiteFooter, PageHero } from "@/components/site-chrome";
import { CONTACT } from "@/lib/contact";

export const Route = createFileRoute("/terms")({
  component: TermsPage,
  head: () => ({
    meta: [
      { title: "Terms & Conditions — Numunix" },
      {
        name: "description",
        content:
          "The terms and conditions that apply when you use Numunix services, including repairs, warranties, payments and liability.",
      },
      { property: "og:url", content: "/terms" },
    ],
    links: [{ rel: "canonical", href: "/terms" }],
  }),
});

const SECTIONS: { heading: string; body: string[] }[] = [
  {
    heading: "1. Agreement",
    body: [
      `These Terms & Conditions ("Terms") govern your use of Numunix services, including our website, phone and WhatsApp bookings, and any repairs or IT support delivered by our engineers. Numunix has served customers since ${CONTACT.founded} and has been available online since ${CONTACT.onlineSince}.`,
      `By booking a service, contacting us or using our website, you agree to these Terms. If you do not agree, please do not use our services.`,
    ],
  },
  {
    heading: "2. Services",
    body: [
      `Numunix provides laptop repair, desktop repair, CCTV installation, networking, printer repair, hardware upgrades, data recovery, business IT support and Annual Maintenance Contracts (AMC).`,
      `Availability of specific services depends on your location, the nature of the fault and the availability of genuine parts.`,
    ],
  },
  {
    heading: "3. Bookings & Estimates",
    body: [
      `When you book a service, we provide a basic estimate based on the information you share. A final quotation is provided after our engineer inspects the device or site.`,
      `Work only begins after you approve the final estimate. If you decline, a small diagnostic fee may apply, which will be disclosed up front.`,
    ],
  },
  {
    heading: "4. Payments",
    body: [
      `Fees are payable upon completion of the service, unless otherwise agreed in writing (for example, an AMC contract).`,
      `We accept cash, UPI, bank transfer and other digital payment methods. Invoices are issued for every completed service.`,
    ],
  },
  {
    heading: "5. Parts & Software",
    body: [
      `We use only genuine, warranty-backed parts and licensed software. If the specific part is not available, we will discuss suitable alternatives with you before proceeding.`,
      `Replaced faulty parts are typically returned to you or disposed of responsibly, at your choice.`,
    ],
  },
  {
    heading: "6. Service Warranty",
    body: [
      `Every repair carries a service warranty covering the specific work performed. The warranty period depends on the service and will be stated on your invoice.`,
      `The warranty covers defects in workmanship and, where applicable, the parts we install. It does not cover new or unrelated faults, physical damage, liquid damage, misuse, unauthorised modifications after our service, or software issues caused by user actions.`,
    ],
  },
  {
    heading: "7. Data & Backups",
    body: [
      `You are responsible for backing up your data before handing over a device for service. While we take reasonable care, Numunix is not liable for data loss caused by pre-existing faults, hardware failure during repair or the nature of the requested work.`,
      `Data-recovery jobs are performed on a best-effort basis; success is never guaranteed and depends on the condition of the storage media.`,
    ],
  },
  {
    heading: "8. Turnaround & Delays",
    body: [
      `We give reasonable turnaround estimates when you book, but genuine parts availability, courier delays and complex faults may extend the timeline. We keep you informed at every step.`,
    ],
  },
  {
    heading: "9. Uncollected Devices",
    body: [
      `If a device is not collected within 60 days of us notifying you that it is ready — and after two reminders — Numunix reserves the right to charge reasonable storage fees or, in extreme cases, dispose of the device to recover unpaid dues.`,
    ],
  },
  {
    heading: "10. AMC & Business Contracts",
    body: [
      `Annual Maintenance Contracts are governed by the specific contract document you sign with Numunix, which defines coverage, response times, exclusions and fees. These Terms apply where the AMC contract is silent.`,
    ],
  },
  {
    heading: "11. Cancellations & Refunds",
    body: [
      `You may cancel a booking free of charge before an engineer is dispatched. Once diagnostic work has started, the applicable diagnostic fee may be charged.`,
      `Refunds for completed services are considered on a case-by-case basis and only where a valid workmanship issue is reported within the warranty period.`,
    ],
  },
  {
    heading: "12. Limitation Of Liability",
    body: [
      `To the maximum extent permitted by law, Numunix's liability for any claim relating to a service is limited to the fees paid for that specific service. We are not liable for indirect, incidental or consequential losses such as business interruption, loss of profits or loss of data.`,
    ],
  },
  {
    heading: "13. Customer Responsibilities",
    body: [
      `You confirm that you are the rightful owner of any device handed to us, or that you are authorised to have it serviced. You agree to provide accurate information, safe site access for onsite work and timely payment for completed services.`,
    ],
  },
  {
    heading: "14. Intellectual Property",
    body: [
      `All content on the Numunix website — logos, text, images and design — is owned by Numunix or its licensors and may not be copied or reused without written permission.`,
    ],
  },
  {
    heading: "15. Governing Law",
    body: [
      `These Terms are governed by the laws of India. Any disputes will be handled by the competent courts of ${CONTACT.address}.`,
    ],
  },
  {
    heading: "16. Changes",
    body: [
      `We may update these Terms from time to time. The latest version will always be available on this page.`,
    ],
  },
  {
    heading: "17. Contact",
    body: [
      `Questions about these Terms? Contact Numunix at ${CONTACT.email} or ${CONTACT.phoneDisplay}.`,
    ],
  },
];

function TermsPage() {
  return (
    <main className="bg-white text-ink">
      <SiteNav variant="dark" />
      <PageHero
        eyebrow="Legal"
        title="Terms &"
        accent="Conditions"
        description="Clear, plain-language terms that apply when you use Numunix services."
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
    </main>
  );
}
