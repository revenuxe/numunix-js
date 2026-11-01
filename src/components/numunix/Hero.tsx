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
}: HeroProps = {}) {
  return (
    <section
      id="top"
      className="grain relative min-h-[100svh] overflow-hidden bg-ink-900 lg:min-h-[100vh]"
    >
      <div className="pointer-events-none absolute inset-0">
        <NumunixRibbonScene className="h-full w-full" ribbons={6} />
      </div>
      <div className="pointer-events-none absolute inset-0 hero-shade-side" />
      <div className="pointer-events-none absolute inset-0 hero-shade-top" />
      {breadcrumb && (
        <div className="shell absolute inset-x-0 top-28 z-10 lg:top-32">{breadcrumb}</div>
      )}

      <div className="shell relative flex min-h-[calc(88svh+48px)] flex-col justify-end pt-46 pb-6 lg:min-h-[100vh] lg:pt-40 lg:pb-24">
        <div className="grid items-end gap-10 lg:grid-cols-[1.35fr_0.65fr] lg:gap-20">
          <Reveal>
            {eyebrow && <Label className="mb-7">{eyebrow}</Label>}
            <h1 className="font-light leading-[0.98] tracking-normal text-primary-foreground text-[40px] sm:text-[56px] lg:text-[80px] xl:text-[96px]">
              {headline}
              {accent && <><br /><span className="text-electric">{accent}</span></>}
            </h1>
          </Reveal>

          <Reveal delay={120}>
            <div className="lg:pb-3">
              <p className="max-w-[40ch] text-[17px] leading-relaxed text-primary-foreground/70 lg:text-[18px]">
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
