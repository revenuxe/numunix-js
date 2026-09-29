import NumunixRibbonScene from "./NumunixRibbonScene";
import { Btn, Reveal } from "./primitives";

export function Hero() {
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

      <div className="shell relative flex min-h-[calc(88svh+48px)] flex-col justify-end pt-46 pb-6 lg:min-h-[100vh] lg:pt-40 lg:pb-24">
        <div className="grid items-end gap-10 lg:grid-cols-[1.35fr_0.65fr] lg:gap-20">
          <Reveal>
            <h1 className="font-light leading-[0.98] tracking-[-0.035em] text-white text-[clamp(2.5rem,7.4vw,6.8rem)]">
              Your next idea.
              <br />
              <span className="text-[#3b82f6]">Built for growth.</span>
            </h1>
          </Reveal>

          <Reveal delay={120}>
            <div className="lg:pb-3">
              <p className="max-w-[40ch] text-[17px] leading-relaxed text-white/70 lg:text-[18px]">
                Websites, apps, and custom software built around your business.
              </p>
              <div className="mt-6 flex flex-wrap gap-3 lg:mt-8">
                <Btn as="a" href="/contact">
                  START YOUR PROJECT
                </Btn>
                <Btn as="a" href="/contact" variant="ghostDark">
                  LET’S TALK
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
