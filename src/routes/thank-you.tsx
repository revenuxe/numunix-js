import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  CheckCheck,
  Mail,
  MessageSquare,
  Sparkles,
} from "lucide-react";
import Header from "@/components/numunix/Header";
import Footer from "@/components/numunix/Footer";
import Hero from "@/components/numunix/Hero";
import { CONTACT } from "@/content/site";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Copy } from "lucide-react";

export const Route = createFileRoute("/thank-you")({
  validateSearch: z.object({ booking: z.string().regex(/^NU-[A-Z]{1,4}-[A-F0-9]{32}$/).optional().catch(undefined), service: z.string().max(100).optional().catch(undefined) }),
  head: () => ({
    meta: [
      { title: "Repair Enquiry Received | Numunix" },
      { property: "og:title", content: "Repair Enquiry Received | Numunix" },
      { property: "og:description", content: "Your enquiry has been received. Here is what happens next with Numunix." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "description",
        content: "Your enquiry has been received. Here is what happens next with Numunix.",
      },
      { name: "robots", content: "noindex, follow" },
    ],
  }),
  component: ThankYouPage,
});

const steps = [
  {
    number: "01",
    icon: CheckCheck,
    title: "We review your repair request",
    description: "Our team will read your enquiry and review the model and symptoms.",
  },
  {
    number: "02",
    icon: MessageSquare,
    title: "We start a conversation",
    description:
      "We’ll follow up using the contact details you shared to explore your requirements.",
  },
  {
    number: "03",
    icon: Sparkles,
    title: "We shape the next step",
    description: "We can discuss the fault assessment, repair options and estimate before work begins.",
  },
];

function ThankYouPage() {
  const { booking, service } = Route.useSearch();
  const [copied, setCopied] = useState(false);
  const actionClass =
    "inline-flex min-h-12 items-center justify-center gap-3 rounded-xl px-6 py-3.5 text-sm font-medium transition focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-400";
  return (
    <div className="bg-[#05070c]">
      <Header />
      <main id="main-content">
        <Hero headline={booking ? "Repair request received." : "Your next repair."} accent={booking ? "Thank you for booking." : "Starts with a request."} intro={booking ? `Your ${service ?? "repair"} request has been saved. Keep your booking reference for follow-up. A visit is confirmed only after our team agrees the details with you.` : "Send a repair enquiry to receive a booking reference. Our team can discuss assessment and service options."} primaryLabel="BACK TO HOME" primaryHref="/" secondaryLabel="EXPLORE SERVICES" secondaryHref="/services" breadcrumb={booking ? <div className="max-w-xl border-l-2 border-primary pl-4 text-primary-foreground"><p className="font-mono text-xs">BOOKING REFERENCE</p><div className="mt-2 flex min-w-0 items-start gap-3"><p className="min-w-0 break-all font-mono text-sm sm:text-base">{booking}</p><Button variant="ghost" size="icon" aria-label={copied ? "Booking reference copied" : "Copy booking reference"} className="shrink-0 text-primary-foreground hover:bg-primary hover:text-primary-foreground" onClick={async () => { try { await navigator.clipboard.writeText(booking); setCopied(true); } catch { setCopied(false); } }}>{copied ? <Check size={16} /> : <Copy size={16} />}</Button></div><p className="mt-2 text-sm text-primary-foreground/75">{service}</p></div> : undefined} />

        <section className="bg-[#f5f8fc] px-5 py-14 sm:px-8 sm:py-20">
          <div className="mx-auto max-w-[1200px]">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <p className="label-mono text-[#5d76a3]">THE NEXT CHAPTER</p>
                <h2 className="mt-3 text-3xl font-light tracking-tight text-[#102a63] sm:text-4xl">
                  Here’s what happens next.
                </h2>
              </div>
              <p className="max-w-[32ch] text-sm leading-relaxed text-[#5d76a3]">
                A clear assessment comes before repair approval.
              </p>
            </div>
            <ol className="mt-8 grid gap-4 lg:grid-cols-3">
              {steps.map(({ number, icon: Icon, title, description }) => (
                <li
                  key={number}
                  className="rounded-[22px] border border-[#dbe5f2] bg-white p-6 sm:p-8"
                >
                  <div className="flex items-center justify-between">
                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-[#edf3ff] text-[#2563eb]">
                      <Icon size={21} strokeWidth={1.5} aria-hidden="true" />
                    </span>
                    <span className="font-mono text-xs text-[#8190aa]">{number}</span>
                  </div>
                  <h3 className="mt-6 text-lg font-medium tracking-tight text-[#102a63]">
                    {title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#5d76a3]">{description}</p>
                </li>
              ))}
            </ol>
            <div className="mt-8 flex flex-col gap-5 rounded-[22px] border border-[#dbe5f2] bg-[#eaf1fc] p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
              <div>
                <h3 className="text-base font-medium text-[#102a63]">
                  Something else on your mind?
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#5d76a3]">
                  Send us any extra details or questions about your repair.
                </p>
              </div>
              <a
                href={CONTACT.emailHref}
                className={`${actionClass} shrink-0 border border-[#dbe5f2] bg-white text-[#1e4ed8] hover:bg-blue-50`}
              >
                <Mail size={17} aria-hidden="true" /> Email our team{" "}
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
