import NumunixRibbonScene from "./NumunixRibbonScene";
import type { ReactNode } from "react";
import { Btn, Label, Reveal } from "./primitives";

type HeroProps = {
  headline?: string;
  accent?: string;
  intro?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  secondaryIcon?: ReactNode;
  eyebrow?: string;
  breadcrumb?: ReactNode;
  variant?: "homepage" | "industry";
};

export function Hero({
  headline = "Your next idea.",
  accent = "Built for growth.",
  intro = "Websites, apps, and custom software built around your business.",
  primaryLabel = "START YOUR PROJECT",
  primaryHref = "/contact",
  secondaryLabel = "EXPLORE SERVICES",
  secondaryHref = "/features",
  secondaryIcon,
  eyebrow,
  breadcrumb,
  variant = "homepage",
}: HeroProps = {}) {
  if (variant === "industry") {
    return (
      <section
        id="top"
        className="relative flex min-h-[74svh] items-end overflow-hidden bg-[#05070c] pt-28 pb-14 lg:min-h-[80vh] lg:pt-40 lg:pb-24"
      >
        <div className="pointer-events-none absolute inset-0">
          <NumunixRibbonScene className="h-full w-full" />
        </div>
        <div className="grain pointer-events-none absolute inset-0 opacity-[0.5]" />
        <div className="shell relative grid gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:items-end lg:gap-20">
          <Reveal ssrVisible>
            {eyebrow && <Label>{eyebrow}</Label>}
            <h1 className="mt-6 max-w-[16ch] text-[clamp(2.4rem,6vw,5.6rem)] leading-[1.04] font-light tracking-[-0.03em] text-white">
              {headline} <span className="text-[#3b82f6]">{accent}</span>
            </h1>
          </Reveal>
          <Reveal ssrVisible delay={120}>
            <p className="max-w-[46ch] text-[17px] leading-relaxed text-white/60 lg:text-[19px]">
              {intro}
            </p>
            <div className="hero-actions mt-6 flex flex-wrap gap-3">
              <Btn as="a" href={primaryHref}>
                {primaryLabel}
              </Btn>
              <Btn as="a" href={secondaryHref} variant="ghostDark">
                {secondaryIcon}
                {secondaryLabel}
              </Btn>
            </div>
          </Reveal>
        </div>
      </section>
    );
  }
  return (
    <section
      id="top"
      className="grain relative min-h-[100svh] overflow-hidden bg-[#05070c] lg:min-h-[100vh]"
    >
      <div className="pointer-events-none absolute inset-0">
        <NumunixRibbonScene className="h-full w-full" ribbons={6} />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,#05070c_0%,rgba(5,7,12,0.94)_34%,rgba(5,7,12,0.45)_58%,transparent_82%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(5,7,12,0.9)_0%,transparent_40%)]" />
      {breadcrumb && (
        <div className="shell absolute inset-x-0 top-28 z-10 lg:top-32">{breadcrumb}</div>
      )}

      <div className="shell relative flex min-h-[calc(88svh+48px)] flex-col justify-end pt-46 pb-6 lg:min-h-[100vh] lg:pt-40 lg:pb-24">
        <div className="grid items-end gap-10 lg:grid-cols-[1.35fr_0.65fr] lg:gap-20">
          <Reveal>
            {eyebrow && <Label className="mb-7">{eyebrow}</Label>}
            <h1 className="font-light leading-[0.98] tracking-[-0.035em] text-white text-[clamp(2.5rem,7.4vw,6.8rem)]">
              {headline}
              <br />
              <span className="text-[#3b82f6]">{accent}</span>
            </h1>
          </Reveal>

          <Reveal delay={120}>
            <div className="lg:pb-3">
              <p className="max-w-[40ch] text-[17px] leading-relaxed text-white/70 lg:text-[18px]">
                {intro}
              </p>
              <div className="hero-actions mt-6 flex flex-wrap gap-3 lg:mt-8">
                <Btn as="a" href={primaryHref}>
                  {primaryLabel}
                </Btn>
                <Btn as="a" href={secondaryHref} variant="ghostDark">
                  {secondaryIcon}
                  {secondaryLabel}
                </Btn>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export default Hero;
