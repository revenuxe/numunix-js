"use client";
import NumunixRibbonScene from "./NumunixRibbonScene";
import { useLayoutEffect, useRef, useState, type ReactNode } from "react";
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
};

export function Hero({
  headline = "Repair starts here.",
  accent = "Care for every day.",
  intro = "Electronics and appliance repair with model-specific assessment, clear estimates and function checks.",
  primaryLabel = "REQUEST ASSESSMENT",
  primaryHref = "/contact",
  secondaryLabel = "EXPLORE SERVICES",
  secondaryHref = "/services",
  secondaryIcon,
  eyebrow,
  breadcrumb,
}: HeroProps = {}) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const words = headline.trim().split(/\s+/);
  let splitAt = 1;
  for (let i = 1; i < words.length; i++) {
    if (
      Math.abs(words.slice(0, i).join(" ").length - words.slice(i).join(" ").length) <
      Math.abs(words.slice(0, splitAt).join(" ").length - words.slice(splitAt).join(" ").length)
    )
      splitAt = i;
  }
  const firstLine = accent || words.length < 2 ? headline : words.slice(0, splitAt).join(" ");
  const secondLine = accent || (words.length > 1 ? words.slice(splitAt).join(" ") : "");
  const headingKey = `${firstLine}\n${secondLine}`;
  const [fittedHeading, setFittedHeading] = useState<string | null>(null);

  useLayoutEffect(() => {
    const heading = headingRef.current;
    if (!heading) return;
    let active = true;
    const fit = () => {
      if (!active) return;
      heading.style.removeProperty("font-size");
      const baseSize = parseFloat(getComputedStyle(heading).fontSize);
      const widestLine = Math.max(
        ...Array.from(heading.children, (line) => line.getBoundingClientRect().width),
      );
      if (widestLine > heading.clientWidth) {
        heading.style.fontSize = `${Math.floor(((baseSize * (heading.clientWidth - 1)) / widestLine) * 100) / 100}px`;
      }
      if (document.fonts.status === "loaded") setFittedHeading(headingKey);
    };
    fit();
    window.addEventListener("resize", fit);
    const observer = new ResizeObserver(fit);
    if (heading.parentElement) observer.observe(heading.parentElement);
    document.fonts.ready.then(() => {
      if (active) fit();
    });
    return () => {
      active = false;
      observer.disconnect();
      window.removeEventListener("resize", fit);
    };
  }, [headingKey]);

  return (
    <section
      id="top"
      className="grain relative min-h-[100svh] overflow-hidden bg-ink-900 lg:min-h-[100vh]"
    >
      <div className="pointer-events-none absolute inset-0">
        <NumunixRibbonScene
          active={fittedHeading === headingKey}
          className="h-full w-full"
          ribbons={6}
        />
      </div>
      <div className="pointer-events-none absolute inset-0 hero-shade-side" />
      <div className="pointer-events-none absolute inset-0 hero-shade-top" />
      {breadcrumb && (
        <div className="shell absolute inset-x-0 top-28 z-10 lg:top-32">{breadcrumb}</div>
      )}

      <div className="shell relative flex min-h-[calc(88svh+48px)] flex-col justify-end pt-46 pb-6 lg:min-h-[100vh] lg:pt-40 lg:pb-24">
        <div className="grid min-w-0 items-end gap-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,0.65fr)] lg:gap-20">
          <Reveal className="min-w-0">
            {eyebrow && <Label className="mb-7">{eyebrow}</Label>}
            <noscript>
              <style>{`.hero-heading { visibility: visible !important; font-size: clamp(12px, 3.5vw, 48px) !important; } .hero-heading > span { max-width: 100%; white-space: normal; overflow-wrap: anywhere; }`}</style>
            </noscript>
            <h1
              ref={headingRef}
              className={`hero-heading ${fittedHeading === headingKey ? "visible" : "invisible"} font-light leading-[1.08] tracking-normal text-primary-foreground text-[40px] sm:text-[56px] lg:text-[80px] xl:text-[96px]`}
            >
              <span className="inline-block whitespace-nowrap">{firstLine}</span>
              {secondLine && (
                <>
                  <br />{" "}
                  <span
                    className={`inline-block whitespace-nowrap${accent ? " text-electric" : ""}`}
                  >
                    {secondLine}
                  </span>
                </>
              )}
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
