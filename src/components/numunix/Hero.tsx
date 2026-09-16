import NumunixRibbonScene from "./NumunixRibbonScene";
import { Btn, Reveal } from "./primitives";

export function Hero() {
  return (
    <section
      id="top"
      className="grain relative min-h-[780px] overflow-hidden bg-[#05070c] lg:min-h-[100vh]"
    >
      <div className="pointer-events-none absolute inset-0">
        <NumunixRibbonScene className="h-full w-full" ribbons={6} />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(130%_90%_at_5%_15%,rgba(5,7,12,0.96),rgba(5,7,12,0.35)_55%,transparent)]" />

      <div className="shell relative flex min-h-[780px] flex-col justify-end pt-40 pb-20 lg:min-h-[100vh] lg:pb-24">
        <div className="grid items-end gap-10 lg:grid-cols-[1.35fr_0.65fr] lg:gap-20">
          <Reveal>
            <h1 className="font-light leading-[0.98] tracking-[-0.035em] text-white text-[clamp(2.9rem,7.4vw,6.8rem)]">
              AI-powered operations
              <br />
              for <span className="text-[#3b82f6]">service businesses</span>
            </h1>
          </Reveal>

          <Reveal delay={120}>
            <div className="lg:pb-3">
              <p className="max-w-[40ch] text-[17px] leading-relaxed text-white/70 lg:text-[18px]">
                From the first customer call to the final invoice, Numunix
                automates the work behind every service job.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Btn as="a" href="#cta">
                  GET STARTED
                </Btn>
                <Btn as="a" href="#cta" variant="ghostDark">
                  BOOK A DEMO
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
