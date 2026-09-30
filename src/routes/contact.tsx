import { createFileRoute } from "@tanstack/react-router";
import { Phone, Mail, Clock, MapPin } from "lucide-react";
import Header from "@/components/numunix/Header";
import Footer from "@/components/numunix/Footer";
import NumunixRibbonScene from "@/components/numunix/NumunixRibbonScene";
import {
  Label,
  Heading,
  Accent,
  Btn,
  Reveal,
} from "@/components/numunix/primitives";
import { CONTACT, SITE_URL } from "@/content/site";
import { ContactFormSection } from "@/components/numunix/ContactFormSection";

const TITLE = "Contact Numunix | Start Your Digital Product Project";
const DESC =
  "Contact Numunix to discuss web development, mobile apps, SaaS, custom software, AI, and design. Call +91 98862 85028 or email numunix@gmail.com.";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/contact` },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/contact` }],
  }),
  component: ContactPage,
});

const REASONS: [string, string][] = [
  ["NEW PROJECT", "Discuss your website, mobile app, SaaS, or software idea."],
  ["PROJECT SCOPE", "Define requirements, priorities, timeline, and budget."],
  ["MODERNIZATION", "Improve an existing product, migrate data, or connect systems."],
  ["ONGOING SUPPORT", "Maintenance, optimization, security updates, and new features."],
];

function ContactPage() {
  return (
    <div className="bg-[#05070c]">
      <Header />
      <main>
        <section className="relative flex min-h-[58svh] items-end overflow-hidden bg-[#05070c] pt-28 pb-14 lg:min-h-[64vh] lg:pt-40 lg:pb-24">
          <div className="absolute inset-0">
            <NumunixRibbonScene />
          </div>
          <div className="grain pointer-events-none absolute inset-0 opacity-[0.5]" />
          <div className="shell relative grid gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:items-end lg:gap-20">
            <Reveal>
              <Label>CONTACT</Label>
              <h1
                style={{ lineHeight: 1.04 }}
                className="mt-6 max-w-[15ch] font-light tracking-[-0.03em] text-white text-[clamp(2.4rem,6vw,5.6rem)]"
              >
                Let's talk about <Accent>your next product.</Accent>
              </h1>
            </Reveal>
            <Reveal delay={120}>
              <p className="max-w-[44ch] text-[17px] leading-relaxed text-white/60 lg:text-[19px]">
                Share your idea and goals. We’ll help shape the next step.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Btn as="a" href="#enquiry">
                  START YOUR ENQUIRY
                </Btn>
              </div>
            </Reveal>
          </div>
        </section>

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
                Send a short note with your idea, business goals, key requirements, and target timeline. Share any existing designs or product links that help explain your project.
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
              Your next product starts with <Accent>a conversation.</Accent>
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
