import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, ArrowRight, Phone } from "lucide-react";
import { z } from "zod";
import { SiteNav, SiteFooter } from "@/components/site-chrome";
import { WhatsAppIcon } from "@/components/whatsapp-icon";
import { CONTACT } from "@/lib/contact";

const searchSchema = z.object({
  id: z.string().optional(),
  service: z.string().optional(),
});

export const Route = createFileRoute("/thank-you")({
  validateSearch: (search) => searchSchema.parse(search),
  component: ThankYouPage,
  head: () => ({
    meta: [
      { title: "Thank You — Numunix Booking Confirmed" },
      { name: "description", content: "Your booking request has been received. A Numunix engineer will contact you soon." },
      { name: "robots", content: "noindex" },
    ],
  }),
});

function ThankYouPage() {
  const { id, service } = Route.useSearch();
  return (
    <main className="bg-white text-ink min-h-screen flex flex-col">
      <SiteNav variant="dark" />
      <section className="flex-1 mx-auto flex w-full max-w-3xl flex-col items-center justify-center px-4 py-20 md:py-28 text-center">
        <div className="grid h-20 w-20 place-items-center rounded-full bg-brand/10 text-brand">
          <CheckCircle2 className="h-11 w-11" />
        </div>
        <h1 className="mt-6 text-4xl font-extrabold tracking-tight sm:text-5xl">
          Booking <span className="text-brand">Confirmed</span>
        </h1>
        <p className="mt-4 max-w-lg text-muted-foreground">
          Thank you! A certified Numunix engineer will reach out to you shortly to
          confirm your appointment and next steps.
        </p>

        <div className="mt-8 w-full max-w-md rounded-3xl bg-secondary/60 p-6 ring-1 ring-border text-left">
          <p className="text-xs uppercase tracking-widest text-muted-foreground">Your Booking ID</p>
          <p className="mt-1.5 font-mono text-2xl font-bold text-ink break-all">{id ?? "—"}</p>
          {service && (
            <div className="mt-4 flex items-center gap-2">
              <span className="text-xs uppercase tracking-widest text-muted-foreground">Service</span>
              <span className="inline-flex items-center rounded-full bg-brand/10 px-3 py-1 text-xs font-semibold text-brand ring-1 ring-brand/20">
                {service}
              </span>
            </div>
          )}
          <p className="mt-4 text-xs text-muted-foreground">
            Please keep this ID handy for any communication with our team.
          </p>
        </div>

        <div className="mt-8 flex w-full max-w-md flex-col gap-3 sm:flex-row">
          <a
            href={CONTACT.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-sm font-semibold text-white transition hover:brightness-110"
          >
            <WhatsAppIcon className="h-4 w-4" /> WhatsApp us
          </a>
          <a
            href={CONTACT.telUrl}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
          >
            <Phone className="h-4 w-4" /> Call now
          </a>
        </div>

        <Link
          to="/"
          className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-ink hover:text-brand"
        >
          Back to home <ArrowRight className="h-4 w-4" />
        </Link>
      </section>
      <SiteFooter />
    </main>
  );
}
