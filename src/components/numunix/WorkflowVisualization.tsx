import { Label, Heading, Accent, Reveal } from "./primitives";

const NODES = [
  ["LEAD", "12 NEW"],
  ["AI CALL", "8 QUALIFIED"],
  ["BOOKING", "5 CONFIRMED"],
  ["TECHNICIAN", "7 AVAILABLE"],
  ["SERVICE JOB", "14 ACTIVE"],
  ["INVOICE", "₹48,250"],
  ["PAYMENT", "₹36,800"],
  ["AMC RENEWAL", "9 DUE"],
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
    <div className="mt-12 overflow-hidden rounded-[28px] border border-[#dfe7f1] bg-white p-5 lg:mt-20 shadow-[0_50px_140px_-70px_rgba(16,42,99,0.55)] lg:p-12">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="label-mono text-[#8190aa]">NUMUNIX OPERATIONS</div>
          <div className="mt-1 text-[20px] font-light tracking-[-0.02em] text-[#08152e]">
            Live operational flow
          </div>
        </div>
        <div className="label-mono flex items-center gap-2 rounded-lg bg-[#e7eefb] px-3 py-2 text-[#1747b8]">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#1e4ed8]" />
          SYNCED 12s AGO
        </div>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-2.5 sm:gap-3 md:grid-cols-4 lg:mt-10 lg:grid-cols-7">
        {NODES.map(([n, v], i) => (
          <div key={n} className="relative">
            <div className="group h-full rounded-xl border border-[#e6ecf4] bg-[#f7f9fc] p-3.5 transition-all duration-250 hover:-translate-y-1 hover:border-[#3b82f6]/45 hover:bg-white hover:shadow-[0_18px_40px_-26px_rgba(16,42,99,0.5)] sm:rounded-2xl lg:p-5">
              <div className="label-mono text-[#8190aa]">
                {String(i + 1).padStart(2, "0")}
              </div>
              <div className="mt-3 text-[13px] tracking-[-0.01em] text-[#08152e] sm:text-[15px] lg:mt-6">
                {n}
              </div>
              <div className="label-mono mt-1.5 text-[#1747b8] lg:mt-2">{v}</div>
              <div className="mt-3.5 h-1 w-full overflow-hidden rounded-full bg-[#e2e9f3] lg:mt-5">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#1747b8] to-[#38bdf8]"
                  style={{ width: `${40 + i * 8}%` }}
                />
              </div>
            </div>
            {i < NODES.length - 1 && (
              <span className="pointer-events-none absolute top-1/2 -right-3 hidden text-[#9db4d6] lg:block">
                →
              </span>
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl bg-[#0b1b38] p-4 lg:mt-10 lg:p-6">
        <svg viewBox="0 0 1200 90" className="h-auto w-full">
          <line x1="0" y1="45" x2="1200" y2="45" stroke="#1b3a72" strokeWidth="1" />
          <line
            x1="0"
            y1="45"
            x2="1200"
            y2="45"
            stroke="#3b82f6"
            strokeWidth="2"
            strokeDasharray="14 22"
            style={{ animation: "nx-dash 5s linear infinite" }}
          />
          {NODES.map((_, i) => (
            <circle
              key={i}
              cx={60 + i * 180}
              cy={45}
              r="6"
              fill="#38bdf8"
              opacity={0.9}
            />
          ))}
        </svg>
      </div>
    </div>
  );
}

export default PlatformIntro;
