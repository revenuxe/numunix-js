import Link from "next/link";
import { ArrowRight, CheckCircle2, MessageCircle } from "lucide-react";

type ServiceContentCtaProps = {
  eyebrow: string;
  title: string;
  description: string;
  points: string[];
  bookingLabel: string;
};

/**
 * A useful closing section for landing pages. It gives visitors enough context
 * to decide whether to contact us, rather than repeating search phrases.
 */
export function ServiceContentCta({
  eyebrow,
  title,
  description,
  points,
  bookingLabel,
}: ServiceContentCtaProps) {
  return (
    <section className="border-y border-border bg-white px-4 py-16 md:px-8 md:py-24">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.15fr_.85fr] lg:items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand">{eyebrow}</p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            {title}
          </h2>
          <p className="mt-5 max-w-2xl leading-7 text-muted-foreground">{description}</p>
          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            {points.map((point) => (
              <p key={point} className="flex items-start gap-2 text-sm leading-6 text-ink">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                {point}
              </p>
            ))}
          </div>
        </div>
        <aside className="rounded-[1.75rem] bg-ink p-7 text-white shadow-card md:p-8">
          <MessageCircle className="h-6 w-6 text-brand" />
          <h3 className="mt-5 text-2xl font-bold">Not sure what you need?</h3>
          <p className="mt-3 text-sm leading-6 text-white/75">
            Tell us what is happening. We will ask a few simple questions and help you choose the
            right next step before you commit to a visit.
          </p>
          <Link
            href="#service-booking-form"
            className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand px-5 py-3.5 text-sm font-semibold text-brand-foreground transition hover:brightness-110"
          >
            {bookingLabel} <ArrowRight className="h-4 w-4" />
          </Link>
        </aside>
      </div>
    </section>
  );
}
