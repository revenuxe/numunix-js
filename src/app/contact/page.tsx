import type { Metadata } from "next";
import { ArrowRight, Phone, Mail, MapPin, Clock } from "lucide-react";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { PageHero } from "@/components/page-hero";
import { WhatsAppIcon } from "@/components/whatsapp-icon";
import { ContactForm } from "@/components/contact-form";
import { CONTACT } from "@/lib/contact";
import { SITE_URL } from "@/lib/site";
import { buildBreadcrumbJsonLd } from "@/lib/breadcrumb";

export const metadata: Metadata = {
  title: { absolute: "Contact Numunix - Book IT Support & Repairs in Bangalore" },
  description: `Get in touch with Numunix in Bangalore. Call ${CONTACT.phoneDisplay}, email ${CONTACT.email} or send a WhatsApp message for laptop repair, CCTV, networking and business IT support.`,
  alternates: { canonical: "/contact" },
  openGraph: { title: "Contact Numunix", url: "/contact" },
};

const breadcrumbJsonLd = buildBreadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Contact", path: "/contact" },
]);

const contactPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact Numunix",
  url: `${SITE_URL}/contact`,
  mainEntity: { "@id": `${SITE_URL}/#organization` },
};

export default function ContactPage() {
  return (
    <main className="bg-white text-ink">
      <SiteNav variant="dark" />
      <PageHero
        eyebrow="Contact Us"
        title="Talk to a real"
        accent="Numunix engineer."
        description="Call, WhatsApp, email or send a request - we'll get back to you fast. No call centres, no bots."
      />

      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-6 md:px-8 md:py-28">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          {/* Info cards */}
          <div className="mx-auto w-full max-w-[calc(100vw-3rem)] min-w-0 space-y-5 lg:mx-0 lg:max-w-none">
            <a
              href={CONTACT.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-5 rounded-3xl bg-[#12347d] p-6 text-white shadow-card transition hover:bg-[#0d2863]"
            >
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-white/20">
                <WhatsAppIcon className="h-6 w-6" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-xs uppercase tracking-widest opacity-80">Fastest reply</p>
                <p className="mt-1 truncate text-lg font-bold">Chat on WhatsApp</p>
                <p className="text-sm opacity-90">{CONTACT.phoneDisplay}</p>
              </div>
              <ArrowRight className="h-5 w-5 shrink-0 transition group-hover:translate-x-1" />
            </a>

            <a
              href={CONTACT.telUrl}
              className="group flex items-center gap-5 rounded-3xl bg-ink p-6 text-white shadow-card transition hover:opacity-95"
            >
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-white/10">
                <Phone className="h-6 w-6" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-xs uppercase tracking-widest opacity-70">Call us</p>
                <p className="mt-1 truncate text-lg font-bold">{CONTACT.phoneDisplay}</p>
                <p className="text-sm opacity-80">Mon-Sat · 9:00 AM - 8:00 PM</p>
              </div>
              <ArrowRight className="h-5 w-5 shrink-0 transition group-hover:translate-x-1" />
            </a>

            <a
              href={CONTACT.mailUrl}
              className="group flex items-center gap-5 rounded-3xl bg-white p-6 ring-1 ring-border shadow-soft transition hover:shadow-card"
            >
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-brand/10 text-brand">
                <Mail className="h-6 w-6" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-xs uppercase tracking-widest text-muted-foreground">Email us</p>
                <p className="mt-1 truncate text-lg font-bold text-ink">{CONTACT.email}</p>
                <p className="text-sm text-muted-foreground">Reply within a few hours</p>
              </div>
              <ArrowRight className="h-5 w-5 shrink-0 text-ink transition group-hover:translate-x-1" />
            </a>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl bg-secondary/60 p-5 ring-1 ring-border">
                <MapPin className="h-5 w-5 text-brand" />
                <p className="mt-3 text-sm font-semibold text-ink">Our Address</p>
                <p className="mt-1 text-sm text-muted-foreground">{CONTACT.fullAddress}</p>
              </div>
              <div className="rounded-3xl bg-secondary/60 p-5 ring-1 ring-border">
                <Clock className="h-5 w-5 text-brand" />
                <p className="mt-3 text-sm font-semibold text-ink">Working Hours</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Mon-Sat · 9 AM - 8 PM
                  <br />
                  Sun · Emergency only
                </p>
              </div>
            </div>
          </div>

          <ContactForm />
        </div>
      </section>

      <SiteFooter />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
    </main>
  );
}
