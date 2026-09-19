import { Phone, Mail, Clock } from "lucide-react";
import { CONTACT } from "@/content/site";
import { Label, Heading, Accent, Btn, Reveal } from "./primitives";

export function ContactBand({
  title = "Talk to the team behind Numunix.",
  accent = "behind Numunix.",
  body = "Tell us how your service operation runs today and we will show you exactly what Numunix automates first.",
}: {
  title?: string;
  accent?: string;
  body?: string;
}) {
  const i = title.indexOf(accent);
  const head =
    i < 0 ? (
      <>{title}</>
    ) : (
      <>
        {title.slice(0, i)}
        <Accent>{accent}</Accent>
        {title.slice(i + accent.length)}
      </>
    );

  return (
    <section className="section-pad bg-[#f7f9fc]">
      <div className="shell grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-20">
        <Reveal>
          <Label tone="light">GET IN TOUCH</Label>
          <Heading tone="light" className="mt-6 max-w-[16ch]">
            {head}
          </Heading>
          <p className="mt-6 max-w-[48ch] text-[17px] leading-relaxed text-[#5d76a3]">
            {body}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Btn as="a" href={CONTACT.phoneHref}>
              CALL {CONTACT.phone}
            </Btn>
            <Btn as="a" href="/contact" variant="ghostLight">
              BOOK A DEMO
            </Btn>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="overflow-hidden rounded-[24px] border border-[#dbe5f2] bg-white">
            {[
              [Phone, "PHONE", CONTACT.phone, CONTACT.phoneHref],
              [Mail, "EMAIL", CONTACT.email, CONTACT.emailHref],
              [Clock, "HOURS", CONTACT.hours, ""],
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
                  <span className="mt-1 block truncate text-[17px] text-[#102a63]">
                    {v}
                  </span>
                </span>
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default ContactBand;
