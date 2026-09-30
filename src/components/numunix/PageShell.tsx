import type { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import NumunixRibbonScene from "./NumunixRibbonScene";
import { Label, Heading, Accent, Btn, Reveal } from "./primitives";

export function accented(title: string, accent?: string) {
  if (!accent) return <>{title}</>;
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

type HeroAction = {
  label: string;
  href: `/${string}` | `#${string}` | `mailto:${string}` | `https://${string}`;
};

export function PageHero({
  label,
  title,
  accent,
  body,
  primary = { label: "START YOUR PROJECT", href: "/contact" },
  secondary,
  compact = false,
}: {
  label: string;
  title: string;
  accent?: string;
  body: string;
  primary?: HeroAction;
  secondary?: HeroAction;
  compact?: boolean;
}) {
  return (
    <section
      className={`relative flex items-end overflow-hidden bg-[#05070c] pt-28 pb-14 lg:pt-40 lg:pb-24 ${
        compact ? "min-h-[54svh] lg:min-h-[58vh]" : "min-h-[70svh] lg:min-h-[78vh]"
      }`}
    >
      <div className="absolute inset-0">
        <NumunixRibbonScene />
      </div>
      <div className="grain pointer-events-none absolute inset-0 opacity-[0.5]" />
      <div className="shell relative grid gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:items-end lg:gap-20">
        <Reveal>
          <Label>{label}</Label>
          <h1
            style={{ lineHeight: 1.04 }}
            className="mt-6 max-w-[16ch] font-light tracking-[-0.03em] text-white text-[clamp(2.4rem,6vw,5.6rem)]"
          >
            {accented(title, accent)}
          </h1>
        </Reveal>
        <Reveal delay={120}>
          <p className="max-w-[46ch] text-[17px] leading-relaxed text-white/60 lg:text-[19px]">
            {body}
          </p>
          <div className="hero-actions mt-6 flex flex-wrap gap-3">
            <Btn as="a" href={primary.href}>
              {primary.label}
            </Btn>
            {secondary && (
              <Btn as="a" href={secondary.href} variant="ghostDark">
                {secondary.label}
              </Btn>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function StatStrip({ stats }: { stats: [string, string][] }) {
  return (
    <section className="border-y border-white/[0.07] bg-[#07111f]">
      <div className="shell grid grid-cols-2 lg:grid-cols-4">
        {stats.map(([k, v], i) => (
          <div
            key={k}
            className={`min-w-0 border-white/[0.07] px-3 py-5 sm:px-5 sm:py-7 lg:py-8 ${i % 2 === 0 ? "border-r" : ""} ${i < 2 ? "border-b lg:border-b-0" : ""} lg:border-r lg:last:border-r-0`}
          >
            <div className="font-mono text-[clamp(0.9375rem,3.8vw,1.125rem)] leading-snug font-light tracking-tight text-white [overflow-wrap:anywhere] sm:text-[22px] lg:text-[24px]">
              {v}
            </div>
            <div className="mt-2 font-mono text-[9px] leading-relaxed tracking-[0.12em] text-[#8fb4e8] uppercase [overflow-wrap:anywhere] sm:text-[10px] lg:text-[11px]">{k}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function Section({
  children,
  bg = "#f7f9fc",
  className = "",
}: {
  children: ReactNode;
  bg?: string;
  className?: string;
}) {
  return (
    <section className={`section-pad ${className}`} style={{ background: bg }}>
      <div className="shell">{children}</div>
    </section>
  );
}

export function SectionHead({
  label,
  title,
  accent,
  tone = "light",
  body,
}: {
  label: string;
  title: string;
  accent?: string;
  tone?: "light" | "dark";
  body?: string;
}) {
  return (
    <Reveal>
      <Label tone={tone}>{label}</Label>
      <Heading tone={tone} className="mt-6 max-w-[18ch]">
        {accented(title, accent)}
      </Heading>
      {body && (
        <p
          className={`mt-6 max-w-[58ch] text-[17px] leading-relaxed ${
            tone === "light" ? "text-[#5d76a3]" : "text-white/60"
          }`}
        >
          {body}
        </p>
      )}
    </Reveal>
  );
}

export function ClosingCTA({
  title = "Have an idea? Let’s turn it into software.",
  accent = "Let’s turn it into software.",
  body = "Websites, mobile apps, SaaS, custom software, and AI — designed and developed around your business.",
}: {
  title?: string;
  accent?: string;
  body?: string;
}) {
  return (
    <section
      id="cta"
      className="relative overflow-hidden bg-[#05070c] py-20 lg:py-[130px]"
    >
      <div className="absolute inset-0">
        <NumunixRibbonScene />
      </div>
      <div className="shell relative text-center">
        <Heading size="xl" className="mx-auto max-w-[18ch]">
          {accented(title, accent)}
        </Heading>
        <p className="mx-auto mt-7 max-w-[54ch] text-[17px] leading-relaxed text-white/55 lg:text-[19px]">
          {body}
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Btn as="a" href="/contact">
            START YOUR PROJECT
          </Btn>
          <Btn as="a" href="/features" variant="ghostDark">
            EXPLORE SERVICES
          </Btn>
        </div>
      </div>
    </section>
  );
}

export function Page({ children }: { children: ReactNode }) {
  return (
    <div className="bg-[#05070c]">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
