import { useRef, useState } from "react";
import NumunixRibbonScene from "./NumunixRibbonScene";
import AICallDemo from "./AICallDemo";
import { Btn, Reveal } from "./primitives";

const FLOW = ["LEAD", "AI CALL", "BOOK", "ASSIGN", "SERVICE", "INVOICE"];

export function Hero() {
  const boost = useRef(0);
  const [held, setHeld] = useState(false);
  const holdTimer = useRef<number | null>(null);

  const start = () => {
    setHeld(true);
    holdTimer.current = window.setInterval(() => {
      boost.current = Math.min(1, boost.current + 0.08);
    }, 40);
  };
  const stop = () => {
    setHeld(false);
    if (holdTimer.current) window.clearInterval(holdTimer.current);
  };

  return (
    <section
      id="top"
      className="grain relative min-h-[850px] overflow-hidden bg-[#05070c] lg:min-h-[100vh]"
    >
      <div className="pointer-events-none absolute inset-0">
        <NumunixRibbonScene className="h-full w-full" boostRef={boost} ribbons={6} />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_80%_at_10%_20%,rgba(5,7,12,0.94),rgba(5,7,12,0.2)_60%,transparent)]" />

      <div className="shell relative flex min-h-[850px] flex-col justify-center pt-36 pb-20 lg:min-h-[100vh] lg:pt-40">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div>
            <Reveal>
              <div className="label-mono text-[#8fb4e8]">AI SERVICE OPERATIONS</div>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="mt-7 font-light leading-[0.98] tracking-[-0.035em] text-white text-[clamp(2.9rem,7.2vw,6.6rem)]">
                <span className="text-[#3b82f6]">AI-powered</span>
                <br />
                operations for
                <br />
                service businesses
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-8 max-w-[46ch] text-[18px] leading-relaxed text-white/65 lg:text-[20px]">
                From the first customer call to the final invoice, Numunix automates
                the work behind every service job.
              </p>
            </Reveal>

            <Reveal delay={220}>
              <div className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-3 border-t border-white/10 pt-6">
                {FLOW.map((f, i) => (
                  <span key={f} className="flex items-center gap-3">
                    <span className="label-mono text-white/70">{f}</span>
                    {i < FLOW.length - 1 && (
                      <span className="text-[#3b82f6]/70">→</span>
                    )}
                  </span>
                ))}
              </div>
            </Reveal>

            <Reveal delay={280}>
              <div className="mt-10 flex flex-wrap gap-3">
                <Btn as="a" href="#cta">
                  GET STARTED
                </Btn>
                <Btn as="a" href="#cta" variant="ghostDark">
                  BOOK A DEMO
                </Btn>
              </div>
            </Reveal>
          </div>

          <div className="relative">
            <div
              className="absolute -top-16 right-2 hidden select-none flex-col items-center lg:flex"
              onMouseDown={start}
              onMouseUp={stop}
              onMouseLeave={stop}
              onTouchStart={start}
              onTouchEnd={stop}
            >
              <div
                className="grid h-28 w-28 cursor-pointer place-items-center rounded-full border border-white/20 transition-all duration-300"
                style={{
                  boxShadow: held
                    ? "0 0 60px -10px rgba(59,130,246,0.8)"
                    : "0 0 0 rgba(0,0,0,0)",
                  transform: held ? "scale(0.96)" : "scale(1)",
                }}
              >
                <span
                  className="h-5 w-5 rounded-md bg-gradient-to-br from-[#60a5fa] to-[#1e4ed8] transition-transform duration-300"
                  style={{ transform: held ? "scale(1.6)" : "scale(1)" }}
                />
              </div>
              <span className="label-mono mt-3 text-white/55">CLICK AND HOLD</span>
            </div>

            <Reveal delay={200}>
              <div
                className="transition-transform duration-500"
                style={{ transform: held ? "translateY(-6px)" : "none" }}
              >
                <AICallDemo />
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
