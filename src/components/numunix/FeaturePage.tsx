import { Link } from "@tanstack/react-router";
import { ArrowRight, Check, X } from "lucide-react";
import Header from "./Header";
import Footer from "./Footer";
import NumunixRibbonScene from "./NumunixRibbonScene";
import ContactBand from "./ContactBand";
import { StatStrip } from "./PageShell";
import { Label, Heading, Accent, Btn, Reveal } from "./primitives";
import ServiceDemo from "./ServiceDemo";
import { FEATURES, type Feature } from "@/content/features";
import { FEATURE_EXTRAS, DEFAULT_EXTRA, CONTACT } from "@/content/site";
import { SERVICE_EDITORIAL } from "@/content/service-editorial";

function headline(title: string, accent: string) {
  const i = title.indexOf(accent);
  if (i < 0) return <>{title}</>;
  return (
    <>
      {title.slice(0, i)}
      <Accent>{accent}</Accent>
      {title.slice(i + accent.length)}
    </>
  );
}

export function FeaturePage({ feature }: { feature: Feature }) {
  const related = FEATURES.filter((f) => f.slug !== feature.slug).slice(0, 3);
  const extra = FEATURE_EXTRAS[feature.slug] ?? DEFAULT_EXTRA;
  const editorial = SERVICE_EDITORIAL[feature.slug];

  return (
    <div className="bg-[#05070c]">
      <Header />
      <main>
        {/* HERO — dark */}
        <section className="relative flex min-h-[74svh] items-end overflow-hidden bg-[#05070c] pt-28 pb-14 lg:min-h-[80vh] lg:pt-40 lg:pb-24">
          <div className="absolute inset-0">
            <NumunixRibbonScene />
          </div>
          <div className="grain pointer-events-none absolute inset-0 opacity-[0.5]" />
          <div className="shell relative grid gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:items-end lg:gap-20">
            <Reveal>
              <Label>{feature.label}</Label>
              <h1
                style={{ lineHeight: 1.04 }}
                className="mt-6 max-w-[16ch] font-light tracking-[-0.03em] text-white text-[clamp(2.4rem,6vw,5.6rem)]"
              >
                {headline(feature.title, feature.accentWord)}
              </h1>
            </Reveal>
            <Reveal delay={120}>
              <p className="max-w-[46ch] text-[17px] leading-relaxed text-white/60 lg:text-[19px]">
                {feature.intro}
              </p>
              <div className="hero-actions mt-6 flex flex-wrap gap-3">
                <Btn as="a" href="/contact">
                  START YOUR PROJECT
                </Btn>
                <Btn as="a" href={CONTACT.whatsappHref} variant="ghostDark">
                  <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true"><path fillRule="evenodd" clipRule="evenodd" d="M3.50002 12C3.50002 7.30558 7.3056 3.5 12 3.5C16.6944 3.5 20.5 7.30558 20.5 12C20.5 16.6944 16.6944 20.5 12 20.5C10.3278 20.5 8.77127 20.0182 7.45798 19.1861C7.21357 19.0313 6.91408 18.9899 6.63684 19.0726L3.75769 19.9319L4.84173 17.3953C4.96986 17.0955 4.94379 16.7521 4.77187 16.4751C3.9657 15.176 3.50002 13.6439 3.50002 12ZM12 1.5C6.20103 1.5 1.50002 6.20101 1.50002 12C1.50002 13.8381 1.97316 15.5683 2.80465 17.0727L1.08047 21.107C0.928048 21.4637 0.99561 21.8763 1.25382 22.1657C1.51203 22.4552 1.91432 22.5692 2.28599 22.4582L6.78541 21.1155C8.32245 21.9965 10.1037 22.5 12 22.5C17.799 22.5 22.5 17.799 22.5 12C22.5 6.20101 17.799 1.5 12 1.5ZM14.2925 14.1824L12.9783 15.1081C12.3628 14.7575 11.6823 14.2681 10.9997 13.5855C10.2901 12.8759 9.76402 12.1433 9.37612 11.4713L10.2113 10.7624C10.5697 10.4582 10.6678 9.94533 10.447 9.53028L9.38284 7.53028C9.23954 7.26097 8.98116 7.0718 8.68115 7.01654C8.38113 6.96129 8.07231 7.046 7.84247 7.24659L7.52696 7.52195C6.76823 8.18414 6.3195 9.2723 6.69141 10.3741C7.07698 11.5163 7.89983 13.314 9.58552 14.9997C11.3991 16.8133 13.2413 17.5275 14.3186 17.8049C15.1866 18.0283 16.008 17.7288 16.5868 17.2572L17.1783 16.7752C17.4313 16.5691 17.5678 16.2524 17.544 15.9269C17.5201 15.6014 17.3389 15.308 17.0585 15.1409L15.3802 14.1409C15.0412 13.939 14.6152 13.9552 14.2925 14.1824Z" fill="currentColor"/></svg>
                  WHATSAPP NOW
                </Btn>
              </div>
            </Reveal>
          </div>
        </section>

        {/* STATS strip */}
        <StatStrip stats={feature.stats} />

        {/* LIVE DEMO — light */}
        <section className="section-pad bg-[#f1f5f9]">
          <div className="shell">
            <Reveal>
              <Label tone="light">PRODUCT EXAMPLE</Label>
            </Reveal>
            <div className="mt-8 grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-20">
              <Reveal delay={60}>
                <Heading tone="light">
                  A look at what
                  <br />
                  <Accent>we can build.</Accent>
                </Heading>
                <ul className="mt-8 space-y-4">
                  {feature.outcomes.map((o) => (
                    <li
                      key={o}
                      className="flex gap-3 border-b border-[#dde6f2] pb-4 text-[17px] text-[#5d76a3] last:border-0"
                    >
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#1e4ed8]" />
                      {o}
                    </li>
                  ))}
                </ul>
              </Reveal>
              <Reveal delay={140}>
                <ServiceDemo slug={feature.slug} />
              </Reveal>
            </div>
          </div>
        </section>

        {editorial && (
          <>
            <section className="section-pad bg-paper">
              <div className="shell grid gap-9 lg:grid-cols-[0.75fr_1.25fr] lg:gap-24">
                <Reveal><Label tone="light">IN PRACTICE / {feature.label}</Label></Reveal>
                <Reveal delay={80}>
                  <Heading tone="light" className="max-w-[20ch]">{editorial.moment}</Heading>
                  <p className="mt-8 max-w-[56ch] border-l-2 border-primary pl-6 text-[18px] leading-relaxed text-muted-foreground lg:text-[21px]">{editorial.scenario}</p>
                  <p className="mt-5 label-mono text-muted-foreground">ILLUSTRATIVE SCENARIO — NOT A CLIENT CASE STUDY</p>
                </Reveal>
              </div>
            </section>
            <section className="section-pad bg-ink-800">
              <div className="shell">
                <Reveal><Label>THE EXPERIENCE</Label><Heading className="mt-6 max-w-[19ch]">One complete journey. <Accent>No disconnected steps.</Accent></Heading></Reveal>
                <div className="mt-12 grid border-t border-foreground/15 lg:grid-cols-3">
                  {editorial.journey.map(([step, body], i) => (
                    <Reveal key={step} delay={i * 70} className="border-b border-foreground/15 lg:border-b-0 lg:border-r lg:last:border-r-0">
                      <div className="py-8 lg:px-8 lg:first:pl-0"><span className="label-mono text-cyan">{step}</span><p className="mt-6 max-w-[34ch] text-[19px] leading-snug text-primary-foreground/85">{body}</p></div>
                    </Reveal>
                  ))}
                </div>
              </div>
            </section>
          </>
        )}

        {/* BEFORE / AFTER — dark split */}
        <section className="section-pad bg-[#07111f]">
          <div className="shell">
            <Reveal>
              <Label>THE DIFFERENCE</Label>
              <Heading className="mt-6 max-w-[17ch]">
                A clearer path from <Accent>problem to product.</Accent>
              </Heading>
            </Reveal>
            <div className="mt-12 grid gap-5 lg:grid-cols-2">
              <Reveal>
                <div className="h-full rounded-[24px] border border-white/[0.07] bg-white/[0.02] p-7 lg:p-10">
                  <span className="label-mono text-white/40">THE CHALLENGE</span>
                  <ul className="mt-7 space-y-5">
                    {extra.pains.map((p) => (
                      <li key={p} className="flex gap-4 text-[16.5px] leading-relaxed text-white/45">
                        <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-lg bg-white/[0.06] text-white/40">
                          <X size={13} />
                        </span>
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
              <Reveal delay={100}>
                <div className="h-full rounded-[24px] border border-[#3b82f6]/30 bg-[#0b1b38]/60 p-7 lg:p-10">
                  <span className="label-mono text-[#8fb4e8]">OUR APPROACH</span>
                  <ul className="mt-7 space-y-5">
                    {extra.gains.map((g) => (
                      <li key={g} className="flex gap-4 text-[16.5px] leading-relaxed text-white/80">
                        <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-lg bg-[#1e4ed8] text-white">
                          <Check size={13} />
                        </span>
                        {g}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* CAPABILITIES — light */}
        <section className="section-pad bg-[#eef3f8]">
          <div className="shell">
            <Reveal>
              <Label tone="light">CAPABILITIES</Label>
              <Heading tone="light" className="mt-6 max-w-[18ch]">
                Built around your users and business goals.
              </Heading>
            </Reveal>
            <div className="mt-12 grid gap-px overflow-hidden rounded-[24px] border border-[#dbe5f2] bg-[#dbe5f2] sm:grid-cols-2">
              {feature.capabilities.map((c, i) => (
                <Reveal key={c.title} delay={i * 60}>
                  <div className="group h-full bg-white p-7 transition-colors duration-300 hover:bg-[#f7fafe] lg:p-10">
                    <span className="label-mono text-[#b3c2d6]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-5 text-[22px] font-light tracking-[-0.02em] text-[#102a63] lg:text-[26px]">
                      {c.title}
                    </h3>
                    <p className="mt-3 text-[16px] leading-relaxed text-[#5d76a3]">
                      {c.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* FLOW — dark */}
        <section className="section-pad bg-[#05070c]">
          <div className="shell">
            <Reveal>
              <Label>WORKFLOW</Label>
              <Heading className="mt-6 max-w-[16ch]">
                Step by step, <Accent>end to end.</Accent>
              </Heading>
            </Reveal>
            <div className="mt-12 grid gap-px overflow-hidden rounded-[24px] border border-[#0d2247] bg-[#0d2247] sm:grid-cols-2 lg:grid-cols-4">
              {feature.steps.map((s, i) => (
                <Reveal key={s.step} delay={i * 60}>
                  <div className="group relative h-full bg-[#05070c] p-7 transition-colors duration-300 hover:bg-[#07111f] lg:p-9">
                    <span className="pointer-events-none absolute inset-x-0 -top-px h-px scale-x-0 bg-gradient-to-r from-transparent via-[#38bdf8] to-transparent transition-transform duration-500 group-hover:scale-x-100" />
                    <span className="label-mono text-[#3b82f6]">{s.step}</span>
                    <h3 className="mt-5 text-[20px] font-light tracking-[-0.02em] text-white lg:text-[23px]">
                      {s.title}
                    </h3>
                    <p className="mt-3 text-[15.5px] leading-relaxed text-white/50">
                      {s.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* INCLUDED + USE CASES — light */}
        <section className="section-pad bg-[#f7f9fc]">
          <div className="shell grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <Reveal>
              <Label tone="light">PROJECT DELIVERY</Label>
              <Heading tone="light" className="mt-6 max-w-[14ch]">
                A clear scope, <Accent>from start to handoff.</Accent>
              </Heading>
              <ul className="mt-8 space-y-4">
                {extra.included.map((x) => (
                  <li key={x} className="flex gap-3 text-[16.5px] text-[#5d76a3]">
                    <span className="mt-0.5 grid h-5.5 w-5.5 shrink-0 place-items-center rounded-md bg-[#e7eefb] p-1 text-[#1747b8]">
                      <Check size={12} />
                    </span>
                    {x}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={100}>
              <Label tone="light">WHERE IT FITS</Label>
              <div className="mt-8 overflow-hidden rounded-[24px] border border-[#dbe5f2] bg-white">
                {extra.useCases.map((u) => (
                  <div
                    key={u.industry}
                    className="border-b border-[#e6edf7] px-6 py-7 transition-colors last:border-0 hover:bg-[#f4f8fd] lg:px-9"
                  >
                    <span className="label-mono text-[#1747b8]">{u.industry}</span>
                    <p className="mt-3 text-[16.5px] leading-relaxed text-[#5d76a3]">
                      {u.body}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {editorial && (
          <section className="section-pad bg-mist-2">
            <div className="shell grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
              <Reveal>
                <Label tone="light">BEFORE THE BUILD</Label>
                <Heading tone="light" className="mt-6 max-w-[14ch]">The decisions that shape the product.</Heading>
                <p className="mt-6 max-w-[45ch] text-[17px] leading-relaxed text-muted-foreground">{editorial.firstRelease}</p>
              </Reveal>
              <div className="border-t border-border">
                {editorial.decisions.map(([question, answer], i) => (
                  <Reveal key={question} delay={i * 60}>
                    <div className="grid gap-3 border-b border-border py-7 sm:grid-cols-[2rem_0.8fr_1.2fr] sm:gap-6">
                      <span className="label-mono text-primary">0{i + 1}</span>
                      <h3 className="text-[20px] font-light text-navytext">{question}</h3>
                      <p className="text-[16px] leading-relaxed text-muted-foreground">{answer}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* QUESTIONS — light */}
        <section className="section-pad bg-[#eef3f8]">
          <div className="shell grid gap-12 lg:grid-cols-[0.4fr_1.6fr] lg:gap-20">
            <Reveal>
              <Label tone="light">QUESTIONS</Label>
            </Reveal>
            <div>
              {feature.faq.map((f, i) => (
                <Reveal key={f.q} delay={i * 60}>
                  <div className="border-b border-[#dde6f2] py-7">
                    <h3 className="text-[21px] font-light tracking-[-0.02em] text-[#102a63] lg:text-[25px]">
                      {f.q}
                    </h3>
                    <p className="mt-3 max-w-[70ch] text-[16.5px] leading-relaxed text-[#5d76a3]">
                      {f.a}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <ContactBand
          title={`Let’s talk about ${feature.name.toLowerCase()}.`}
          accent={`${feature.name.toLowerCase()}.`}
          body="Share your idea, requirements, and goals. We will help you define the right scope and approach."
        />

        {/* RELATED — light */}
        <section className="section-pad bg-[#eef3f8]">
          <div className="shell">
            <Label tone="light">EXPLORE MORE</Label>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  to="/features/$slug"
                  params={{ slug: r.slug }}
                  className="group rounded-[20px] border border-[#dbe5f2] bg-white p-7 transition-all duration-250 hover:-translate-y-1 hover:border-[#3b82f6]/40 hover:shadow-[0_24px_60px_-34px_rgba(16,42,99,0.45)]"
                >
                  <span className="label-mono text-[#1747b8]">{r.label}</span>
                  <h3 className="mt-4 text-[22px] font-light tracking-[-0.02em] text-[#102a63]">
                    {r.name}
                  </h3>
                  <ArrowRight
                    size={18}
                    className="hover-arrow mt-6 text-[#1e4ed8]"
                  />
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section
          id="cta"
          className="relative overflow-hidden bg-[#05070c] py-24 lg:py-[130px]"
        >
          <div className="absolute inset-0">
            <NumunixRibbonScene />
          </div>
          <div className="shell relative text-center">
            <Heading size="xl" className="mx-auto max-w-[18ch]">
              Have an idea?{" "}
              <Accent>Let’s turn it into software.</Accent>
            </Heading>
            <p className="mx-auto mt-7 max-w-[54ch] text-[17px] leading-relaxed text-white/55 lg:text-[19px]">
              Design, development, integrations, deployment, and ongoing improvements — with one team focused on your product.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <Btn as="a" href="/contact">
                START YOUR PROJECT
              </Btn>
              <Btn as="a" href={CONTACT.whatsappHref} variant="ghostDark">
                <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true"><path fillRule="evenodd" clipRule="evenodd" d="M3.50002 12C3.50002 7.30558 7.3056 3.5 12 3.5C16.6944 3.5 20.5 7.30558 20.5 12C20.5 16.6944 16.6944 20.5 12 20.5C10.3278 20.5 8.77127 20.0182 7.45798 19.1861C7.21357 19.0313 6.91408 18.9899 6.63684 19.0726L3.75769 19.9319L4.84173 17.3953C4.96986 17.0955 4.94379 16.7521 4.77187 16.4751C3.9657 15.176 3.50002 13.6439 3.50002 12ZM12 1.5C6.20103 1.5 1.50002 6.20101 1.50002 12C1.50002 13.8381 1.97316 15.5683 2.80465 17.0727L1.08047 21.107C0.928048 21.4637 0.99561 21.8763 1.25382 22.1657C1.51203 22.4552 1.91432 22.5692 2.28599 22.4582L6.78541 21.1155C8.32245 21.9965 10.1037 22.5 12 22.5C17.799 22.5 22.5 17.799 22.5 12C22.5 6.20101 17.799 1.5 12 1.5ZM14.2925 14.1824L12.9783 15.1081C12.3628 14.7575 11.6823 14.2681 10.9997 13.5855C10.2901 12.8759 9.76402 12.1433 9.37612 11.4713L10.2113 10.7624C10.5697 10.4582 10.6678 9.94533 10.447 9.53028L9.38284 7.53028C9.23954 7.26097 8.98116 7.0718 8.68115 7.01654C8.38113 6.96129 8.07231 7.046 7.84247 7.24659L7.52696 7.52195C6.76823 8.18414 6.3195 9.2723 6.69141 10.3741C7.07698 11.5163 7.89983 13.314 9.58552 14.9997C11.3991 16.8133 13.2413 17.5275 14.3186 17.8049C15.1866 18.0283 16.008 17.7288 16.5868 17.2572L17.1783 16.7752C17.4313 16.5691 17.5678 16.2524 17.544 15.9269C17.5201 15.6014 17.3389 15.308 17.0585 15.1409L15.3802 14.1409C15.0412 13.939 14.6152 13.9552 14.2925 14.1824Z" fill="currentColor"/></svg>
                WHATSAPP NOW
              </Btn>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default FeaturePage;
