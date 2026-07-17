import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Phone, Mail, MapPin, Clock } from "lucide-react";
import { SiteNav, SiteFooter, PageHero } from "@/components/site-chrome";
import { WhatsAppIcon } from "@/components/whatsapp-icon";
import { CONTACT } from "@/lib/contact";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
  head: () => ({
    meta: [
      { title: "Contact Numunix — Book IT Support & Repairs" },
      {
        name: "description",
        content: `Get in touch with Numunix. Call ${CONTACT.phoneDisplay}, email ${CONTACT.email} or send a WhatsApp message for laptop repair, CCTV, networking and business IT support.`,
      },
      { property: "og:title", content: "Contact Numunix" },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
});

function ContactPage() {
  return (
    <main className="bg-white text-ink">
      <SiteNav variant="dark" />
      <PageHero
        eyebrow="Contact Us"
        title="Talk to a real"
        accent="Numunix engineer."
        description="Call, WhatsApp, email or send a request — we'll get back to you fast. No call centres, no bots."
      />

      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-6 md:px-8 md:py-28">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          {/* Info cards */}
          <div className="mx-auto w-full max-w-xl space-y-5 pr-6 sm:pr-8 lg:mx-0 lg:max-w-none lg:pr-0">
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
                <p className="text-sm opacity-80">Mon–Sat · 9:00 AM – 8:00 PM</p>
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
                <p className="mt-3 text-sm font-semibold text-ink">Service Area</p>
                <p className="mt-1 text-sm text-muted-foreground">{CONTACT.address}</p>
              </div>
              <div className="rounded-3xl bg-secondary/60 p-5 ring-1 ring-border">
                <Clock className="h-5 w-5 text-brand" />
                <p className="mt-3 text-sm font-semibold text-ink">Working Hours</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Mon–Sat · 9 AM – 8 PM<br />
                  Sun · Emergency only
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <form
            onSubmit={(e) => e.preventDefault()}
            className="rounded-[2rem] bg-ink p-6 text-white shadow-card md:p-10"
          >
            <h2 className="text-2xl font-extrabold tracking-tight md:text-3xl">
              Send us a <span className="text-brand">quick request</span>
            </h2>
            <p className="mt-2 text-sm text-white/70">
              Tell us what you need — a certified engineer will call you back.
            </p>
            <div className="mt-6 space-y-4">
              <label className="block">
                <span className="text-xs font-semibold text-white/80">Full name</span>
                <input
                  type="text"
                  required
                  maxLength={100}
                  placeholder="Your name"
                  className="mt-1.5 w-full rounded-xl bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/50 ring-1 ring-white/20 focus:outline-none focus:ring-brand"
                />
              </label>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="text-xs font-semibold text-white/80">Phone</span>
                  <input
                    type="tel"
                    required
                    maxLength={15}
                    placeholder="+91 …"
                    className="mt-1.5 w-full rounded-xl bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/50 ring-1 ring-white/20 focus:outline-none focus:ring-brand"
                  />
                </label>
                <label className="block">
                  <span className="text-xs font-semibold text-white/80">Email</span>
                  <input
                    type="email"
                    required
                    maxLength={255}
                    placeholder="you@example.com"
                    className="mt-1.5 w-full rounded-xl bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/50 ring-1 ring-white/20 focus:outline-none focus:ring-brand"
                  />
                </label>
              </div>
              <label className="block">
                <span className="text-xs font-semibold text-white/80">Service needed</span>
                <select
                  required
                  className="mt-1.5 w-full rounded-xl bg-white/10 px-4 py-3 text-sm text-white ring-1 ring-white/20 focus:outline-none focus:ring-brand"
                  defaultValue=""
                >
                  <option value="" disabled className="bg-ink">Choose a service</option>
                  <option className="bg-ink">Laptop Repair</option>
                  <option className="bg-ink">Desktop Repair</option>
                  <option className="bg-ink">CCTV Installation</option>
                  <option className="bg-ink">Networking</option>
                  <option className="bg-ink">Business AMC</option>
                  <option className="bg-ink">Other</option>
                </select>
              </label>
              <label className="block">
                <span className="text-xs font-semibold text-white/80">Message</span>
                <textarea
                  rows={4}
                  maxLength={1000}
                  placeholder="Describe the issue…"
                  className="mt-1.5 w-full rounded-xl bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/50 ring-1 ring-white/20 focus:outline-none focus:ring-brand"
                />
              </label>
            </div>
            <button
              type="submit"
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand px-5 py-3.5 text-sm font-semibold text-brand-foreground shadow-brand transition hover:brightness-110"
            >
              Send request <ArrowRight className="h-4 w-4" />
            </button>
            <p className="mt-3 text-center text-xs text-white/60">
              We reply within a few hours during working days.
            </p>
          </form>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
