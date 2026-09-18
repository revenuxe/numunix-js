import { Label, Heading, Accent, Reveal } from "./primitives";

const NODES: [string, string, string][] = [
  ["LEAD", "12", "NEW"],
  ["AI CALL", "8", "QUALIFIED"],
  ["BOOKING", "5", "CONFIRMED"],
  ["TECHNICIAN", "7", "AVAILABLE"],
  ["SERVICE JOB", "14", "ACTIVE"],
  ["INVOICE", "₹48,250", "RAISED"],
  ["PAYMENT", "₹36,800", "COLLECTED"],
  ["AMC RENEWAL", "9", "DUE"],
];

export function PlatformIntro() {
  return (
    <section className="section-pad bg-[#f1f5f9]">
      <div className="shell">
        <Reveal>
          <Label tone="light">THE NUMUNIX PLATFORM</Label>
        </Reveal>
        <div className="mt-10 grid gap-12 lg:grid-cols-[1.25fr_0.75fr] lg:gap-20">
          <Reveal delay={60}>
            <Heading tone="light">
              Everything your
              <br />
              service business needs,
              <br />
              <Accent>working together.</Accent>
            </Heading>
          </Reveal>
          <Reveal delay={140}>
            <p className="max-w-[44ch] text-[18px] leading-relaxed text-[#5d76a3] lg:pt-6 lg:text-[20px]">
              One intelligent platform for leads, customers, technicians, jobs,
              invoices and everything in between.
            </p>
          </Reveal>
        </div>

        <Reveal delay={120}>
          <WorkflowVisualization />
        </Reveal>
      </div>
    </section>
  );
}

export function WorkflowVisualization() {
  return (
    <div className="mt-12 overflow-hidden rounded-[28px] border border-[#0d2247] bg-[#05070c] lg:mt-20 shadow-[0_60px_160px_-70px_rgba(5,14,40,0.9)]">
      {/* head */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.07] px-5 py-5 sm:px-8">
        <div className="flex items-baseline gap-4">
          <span className="label-mono text-[#3b82f6]">NUMUNIX OPERATIONS</span>
          <span className="label-mono hidden text-white/25 sm:inline">/ LEAD → RENEWAL</span>
        </div>
        <span className="label-mono flex items-center gap-2 text-white/40">
          <span
            className="h-1.5 w-1.5 rounded-full bg-[#38bdf8]"
            style={{ animation: "nx-pulse-dot 2.4s ease-in-out infinite" }}
          />
          SYNCED 12s AGO
        </span>
      </div>

      {/* flow rail */}
      <div className="relative">
        <div className="pointer-events-none absolute inset-x-0 top-1/2 hidden h-px bg-[linear-gradient(90deg,transparent,#1b3a72,transparent)] xl:block" />
        <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-8">
          {NODES.map(([n, v, u], i) => (
            <div
              key={n}
              className="group relative flex flex-col justify-between overflow-hidden border-r border-b border-white/[0.06] px-4 py-5 transition-colors duration-300 hover:bg-white/[0.03] sm:px-6 sm:py-6"
            >
              <span className="pointer-events-none absolute inset-x-0 -top-px h-px scale-x-0 bg-gradient-to-r from-transparent via-[#38bdf8] to-transparent transition-transform duration-500 group-hover:scale-x-100" />

              <div className="flex items-center gap-2">
                <span className="label-mono text-white/25">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="truncate text-[12px] tracking-[0.06em] text-white/60 sm:text-[12.5px]">
                  {n}
                </span>
              </div>

              <div className="mt-5">
                <div className="font-mono text-[22px] leading-none font-light tracking-[-0.02em] text-white sm:text-[26px]">
                  {v}
                </div>
                <div className="label-mono mt-2 truncate text-[#38bdf8]">{u}</div>
              </div>

              <div className="mt-4 h-px w-full bg-white/[0.08]">
                <div
                  className="h-px bg-gradient-to-r from-[#1e4ed8] to-[#38bdf8]"
                  style={{ width: `${38 + i * 7}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* pulse line */}
      <div className="border-t border-white/[0.07] px-5 py-5 sm:px-8">
        <svg viewBox="0 0 1200 24" className="h-auto w-full">
          <line x1="0" y1="12" x2="1200" y2="12" stroke="#11274d" strokeWidth="1" />
          <line
            x1="0"
            y1="12"
            x2="1200"
            y2="12"
            stroke="#3b82f6"
            strokeWidth="1.5"
            strokeDasharray="10 26"
            style={{ animation: "nx-dash 5s linear infinite" }}
          />
          {NODES.map((_, i) => (
            <circle key={i} cx={75 + i * 150} cy={12} r="3.5" fill="#38bdf8" opacity={0.85} />
          ))}
        </svg>
      </div>
    </div>
  );
}

export default PlatformIntro;
