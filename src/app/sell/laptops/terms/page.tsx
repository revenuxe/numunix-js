import type { Metadata } from "next";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { PageHero } from "@/components/page-hero";
import { CONTACT } from "@/lib/contact";

export const metadata: Metadata = {
  title: { absolute: "Laptop Buyback Terms & Privacy Policy — Numunix" },
  description:
    "Terms and conditions and privacy policy that apply when you sell your used laptop to Numunix — ownership, condition verification, ID checks, payment and data handling.",
  alternates: { canonical: "/sell/laptops/terms" },
  openGraph: { url: "/sell/laptops/terms" },
};

const TERMS_SECTIONS: { heading: string; body: string[] }[] = [
  {
    heading: "1. Scope",
    body: [
      `These terms apply specifically when you request a quote, book a pickup or sell a used laptop to Numunix through our website, WhatsApp or phone ("the Buyback Service"). They sit alongside, and take priority over, our general Terms & Conditions for anything relating to selling a device to us.`,
    ],
  },
  {
    heading: "2. Instant Quote Is Provisional",
    body: [
      `The price shown after you answer our configuration and condition questions is an estimate based on the information you provide. It is not a final, binding offer.`,
      `The final payout is confirmed only after our pickup agent physically inspects the laptop at the time of pickup — checking the screen, body, keyboard, battery health, ports, boot-up and the specific configuration (RAM/storage/processor) you declared. If the device's actual condition or configuration differs from what was declared, the quote will be revised accordingly before you approve the sale.`,
    ],
  },
  {
    heading: "3. Ownership & Legal Responsibility",
    body: [
      `By booking a pickup, you confirm that you are the sole, rightful, legal owner of the laptop, or that you are fully authorised by the owner to sell it, and that the device is not stolen, lost, financed, pledged, under police complaint, or otherwise legally encumbered.`,
      `You are solely and fully responsible for any legal issue, ownership dispute, theft claim, police complaint or criminal liability that arises in connection with the device you sell to us. Numunix acts as a good-faith buyer and bears no responsibility for misrepresentations made by the seller regarding ownership or the legal status of the device.`,
      `Numunix reserves the right to refuse a purchase, pause payment, or hand a device over to the appropriate authorities if it has reasonable grounds to suspect the device is stolen or otherwise unlawfully held, without any liability to the seller.`,
    ],
  },
  {
    heading: "4. Identity Verification",
    body: [
      `If you have the original purchase invoice or bill for the device, please keep it ready at pickup — it helps us verify ownership quickly.`,
      `If the original invoice is not available, our pickup agent will request a valid government-issued photo ID (Aadhaar card, PAN card, passport or driving licence) to verify your identity before completing the purchase. We may note down the ID type and last few digits for our purchase records; we do not retain a photocopy beyond what is required for this verification.`,
      `We reserve the right to decline the purchase if satisfactory proof of identity or ownership cannot be provided.`,
    ],
  },
  {
    heading: "5. Device Condition & Data Wipe",
    body: [
      `You are responsible for backing up any data you wish to keep before the device is picked up. We strongly recommend you sign out of all personal accounts (Google/Apple ID, email, banking apps) and perform a factory reset before handover.`,
      `If a device is handed over without being wiped, Numunix will perform a factory reset / secure erase as part of standard processing before resale or refurbishment. Numunix is not responsible for any personal data, account access, photos or files left on a device at the time of pickup, and is not liable for any consequence of failing to remove such data before sale.`,
      `Any accessories, chargers or original boxes you choose to include should be declared at booking, as they may affect the final quote.`,
    ],
  },
  {
    heading: "6. Payment",
    body: [
      `Payment is released at the time of pickup, after the seller confirms acceptance of the final (possibly revised) quote following physical inspection.`,
      `Payment is made via UPI or bank transfer to an account held in the seller's own name, matching the ID provided, to help prevent fraud and keep a clear ownership trail.`,
    ],
  },
  {
    heading: "7. Cancellation",
    body: [
      `You may cancel or reschedule a pickup booking free of charge at any time before the pickup agent visits, by replying to our confirmation message, WhatsApp or calling ${CONTACT.phoneDisplay}.`,
    ],
  },
  {
    heading: "8. Booking Invoice",
    body: [
      `Any booking confirmation sent to you after booking is a booking reference document only. It confirms that a pickup has been scheduled and states the provisional quote — it is not a sale receipt, proof of ownership transfer, or legal proof of purchase, and cannot be used as such.`,
    ],
  },
  {
    heading: "9. Limitation Of Liability",
    body: [
      `To the maximum extent permitted by law, Numunix's liability in connection with the Buyback Service is limited to the amount actually paid to the seller for the device in question. Numunix is not liable for indirect or consequential losses.`,
    ],
  },
  {
    heading: "10. Contact",
    body: [
      `Questions about selling your laptop to Numunix? Reach us at ${CONTACT.email} or ${CONTACT.phoneDisplay}.`,
    ],
  },
];

const PRIVACY_SECTIONS: { heading: string; body: string[] }[] = [
  {
    heading: "1. What We Collect",
    body: [
      `When you request a quote or book a pickup, we collect your name, phone number, email (optional), pickup address and pincode, the device details and answers you provide, and the resulting quote.`,
      `If you provide a government ID for verification at pickup, we record only the ID type and the minimum information needed to confirm your identity for that purchase; we do not publish or share this information.`,
    ],
  },
  {
    heading: "2. How We Use It",
    body: [
      `To calculate your quote, schedule and complete your pickup, verify ownership, process payment, and provide customer support if you have a question about a booking.`,
    ],
  },
  {
    heading: "3. Sharing",
    body: [
      `We do not sell your personal information. Pickup details are shared only with the pickup agent assigned to your booking, strictly to complete the collection.`,
      `We may disclose information where required by law, a court order, or to a law-enforcement authority investigating a stolen or disputed device.`,
    ],
  },
  {
    heading: "4. Data On The Device Itself",
    body: [
      `We do not intentionally access, copy or use personal files, photos, accounts or data stored on a device you sell to us, beyond what is needed to confirm it powers on and functions as declared. Please wipe your device before handover — see the Terms above.`,
    ],
  },
  {
    heading: "5. Retention",
    body: [
      `We retain booking information for as long as needed to provide the Buyback Service, honour any related support request, and meet our legal and accounting obligations, after which it is securely deleted or anonymised.`,
    ],
  },
  {
    heading: "6. Your Rights",
    body: [
      `You can request a copy of, or the deletion of, your saved booking information at any time by contacting ${CONTACT.email}.`,
    ],
  },
];

export default function LaptopBuybackTermsPage() {
  return (
    <main className="bg-white text-ink">
      <SiteNav variant="dark" />
      <PageHero
        eyebrow="Legal · Laptop Buyback"
        title="Buyback Terms &"
        accent="Privacy Policy"
        description="The specific terms, ID checks and privacy commitments that apply when you sell your used laptop to Numunix."
      />
      <section className="mx-auto max-w-3xl px-4 py-20 md:px-8 md:py-28">
        <p className="text-xs uppercase tracking-widest text-muted-foreground">
          Last updated: 21 July 2026
        </p>

        <h2 className="mt-10 text-3xl font-extrabold text-ink">Terms & Conditions</h2>
        <div className="mt-8 space-y-10">
          {TERMS_SECTIONS.map((s) => (
            <div key={s.heading}>
              <h3 className="text-xl font-bold text-ink">{s.heading}</h3>
              <div className="mt-3 space-y-3 text-sm leading-relaxed text-muted-foreground md:text-base">
                {s.body.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>
          ))}
        </div>

        <h2 className="mt-16 text-3xl font-extrabold text-ink">Privacy Policy</h2>
        <div className="mt-8 space-y-10">
          {PRIVACY_SECTIONS.map((s) => (
            <div key={s.heading}>
              <h3 className="text-xl font-bold text-ink">{s.heading}</h3>
              <div className="mt-3 space-y-3 text-sm leading-relaxed text-muted-foreground md:text-base">
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
