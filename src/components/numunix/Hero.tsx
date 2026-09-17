import NumunixRibbonScene from "./NumunixRibbonScene";
import { Btn, Reveal } from "./primitives";

export function Hero() {
  return (
    <section
      id="top"
      className="grain relative min-h-[88svh] overflow-hidden bg-[#05070c] lg:min-h-[100vh]"
    >
      <div className="pointer-events-none absolute inset-0">
        <NumunixRibbonScene className="h-full w-full" ribbons={6} />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,#05070c_0%,rgba(5,7,12,0.94)_34%,rgba(5,7,12,0.45)_58%,transparent_82%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(5,7,12,0.9)_0%,transparent_40%)]" />

      <div className="shell relative flex min-h-[88svh] flex-col justify-end pt-28 pb-12 lg:min-h-[100vh] lg:pt-40 lg:pb-24">
        <div className="grid items-end gap-10 lg:grid-cols-[1.35fr_0.65fr] lg:gap-20">
          <Reveal>
            <h1 className="font-light leading-[0.98] tracking-[-0.035em] text-white text-[clamp(2.5rem,7.4vw,6.8rem)]">
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
              <div className="mt-6 flex flex-wrap gap-3 lg:mt-8">
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
