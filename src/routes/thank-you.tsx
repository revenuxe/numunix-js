import { Link, createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, Home, MessageCircle } from "lucide-react";
import { SiteFooter, SiteNav } from "@/components/site-chrome";
import { CONTACT } from "@/lib/contact";

export const Route = createFileRoute("/thank-you")({
  validateSearch: (search: Record<string, unknown>) => ({
    bookingId: typeof search.bookingId === "string" ? search.bookingId : "",
  }),
  component: ThankYouPage,
});

function ThankYouPage() {
  const { bookingId } = Route.useSearch();

  return <main className="min-h-screen bg-secondary/40 text-ink">
    <SiteNav variant="light" />
    <section className="mx-auto grid min-h-[70vh] max-w-3xl place-items-center px-5 py-16 sm:px-8">
      <div className="w-full rounded-[2rem] bg-white p-8 text-center shadow-card ring-1 ring-border sm:p-12">
        <CheckCircle2 className="mx-auto h-14 w-14 text-brand" aria-hidden="true" />
        <p className="mt-6 text-xs font-bold uppercase tracking-[.2em] text-brand">Request received</p>
        <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-5xl">Thank you for contacting Numunix.</h1>
        <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-muted-foreground">A certified engineer will review your request and contact you shortly.</p>
        {bookingId && <div className="mx-auto mt-7 max-w-md rounded-2xl bg-secondary px-5 py-4 text-left ring-1 ring-border"><p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Your booking reference</p><p className="mt-1 break-all font-mono text-lg font-bold text-ink">{bookingId}</p><p className="mt-2 text-xs text-muted-foreground">Please keep this reference for any follow-up.</p></div>}
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row"><Link to="/" className="inline-flex items-center justify-center gap-2 rounded-full bg-brand px-5 py-3 text-sm font-semibold text-brand-foreground"><Home className="h-4 w-4" />Back to home</Link><a href={CONTACT.whatsappUrl} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-white px-5 py-3 text-sm font-semibold text-ink"><MessageCircle className="h-4 w-4" />Message us</a></div>
      </div>
    </section>
    <SiteFooter />
  </main>;
}