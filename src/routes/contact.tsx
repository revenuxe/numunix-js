import { createFileRoute } from "@tanstack/react-router";
import { Phone, Mail, Clock, MapPin } from "lucide-react";
import Header from "@/components/numunix/Header";
import Footer from "@/components/numunix/Footer";
import Hero from "@/components/numunix/Hero";
import NumunixRibbonScene from "@/components/numunix/NumunixRibbonScene";
import {
  Label,
  Heading,
  Accent,
  Btn,
  Reveal,
} from "@/components/numunix/primitives";
import { CONTACT, SITE_URL } from "@/content/site";
import { repairPageHead } from "@/content/repair-seo";
import { ContactFormSection } from "@/components/numunix/ContactFormSection";

const TITLE = "Contact Numunix Repairs in Bangalore | Location & Enquiries";
const DESC =
  "Contact Numunix for electronics and appliance repair enquiries. Share the model, fault and location to discuss assessment and service options.";

export const Route = createFileRoute("/contact")({
  head: () => repairPageHead({ title: TITLE, description: DESC, path: "/contact", type: "ContactPage", breadcrumbs: [{ name: "Repair enquiries", path: "/contact" }] }),
  component: ContactPage,
});

const REASONS: [string, string][] = [
  ["DEVICE REPAIR", "Phone, laptop, tablet, TV and console faults."],
  ["APPLIANCE CARE", "Washer, AC, refrigerator and kitchen-appliance assessment."],
  ["CCTV SERVICE", "Camera signal, recording, installation and remote-view checks."],
  ["AFTERCARE", "Completed work, recurring symptoms and maintenance."],
];

function ContactPage() {
  return (
    <div className="bg-[#05070c]">
      <Header />
      <main>
        <Hero headline="Tell us the fault." accent="Let’s take a look." intro="Share the model, symptoms and location. We’ll help clarify the assessment and repair options." primaryLabel="START YOUR ENQUIRY" primaryHref="#enquiry" secondaryLabel="EXPLORE SERVICES" secondaryHref="/services" />

        <ContactFormSection />

        <section className="section-pad border-t border-[#dbe5f2] bg-[#f7f9fc]">
          <div className="shell grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
            <Reveal>
              <Label tone="light">DIRECT LINES</Label>
              <Heading tone="light" className="mt-6 max-w-[14ch]">
                Reach a real person, <Accent>fast.</Accent>
              </Heading>
              <div className="mt-9 overflow-hidden rounded-[24px] border border-[#dbe5f2] bg-white">
                {[
                  [Phone, "PHONE", CONTACT.phone, CONTACT.phoneHref],
                  [Mail, "EMAIL", CONTACT.email, CONTACT.emailHref],
                  [Clock, "HOURS", CONTACT.hours, ""],
                  [MapPin, "ADDRESS", CONTACT.address, ""],
                ].map(([Icon, k, v, href]: any) => (
                  <a
                    key={k}
                    href={href || undefined}
                    className="flex items-center gap-4 border-b border-[#e6edf7] px-6 py-6 transition-colors last:border-0 hover:bg-[#f4f8fd] lg:px-8"
                  >
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#eaf1fd] text-[#1e4ed8]">
                      <Icon size={16} />
                    </span>
                    <span className="min-w-0">
                      <span className="label-mono block text-[#93a6c4]">{k}</span>
                      <span className="mt-1 block text-[17px] text-[#102a63]">
                        {v}
                      </span>
                    </span>
                  </a>
                ))}
              </div>
              <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CONTACT.address)}`} target="_blank" rel="noopener noreferrer" className="mt-6 inline-block text-sm text-primary underline underline-offset-4">Find this address on Google Maps</a>
            </Reveal>

            <Reveal delay={120}>
              <Label tone="light">WHAT TO ASK US</Label>
              <div className="mt-9 grid gap-px overflow-hidden rounded-[24px] border border-[#dbe5f2] bg-[#dbe5f2] sm:grid-cols-2">
                {REASONS.map(([k, v]) => (
                  <div
                    key={k}
                    className="h-full bg-white p-6 transition-colors hover:bg-[#f7fafe] lg:p-8"
                  >
                    <span className="label-mono text-[#1747b8]">{k}</span>
                    <p className="mt-3 text-[16px] leading-relaxed text-[#5d76a3]">
                      {v}
                    </p>
                  </div>
                ))}
              </div>
              <p className="mt-8 text-[16px] leading-relaxed text-[#5d76a3]">
                Send the model, fault history and location. Mention any error codes or recent damage, but do not send passwords or one-time codes.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="relative overflow-hidden bg-[#05070c] py-24 lg:py-[130px]">
          <div className="absolute inset-0">
            <NumunixRibbonScene />
          </div>
          <div className="shell relative text-center">
            <Heading size="xl" className="mx-auto max-w-[17ch]">
              Your next repair starts with <Accent>a conversation.</Accent>
            </Heading>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <Btn as="a" href={CONTACT.emailHref}>
                {CONTACT.email.toUpperCase()}
              </Btn>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
