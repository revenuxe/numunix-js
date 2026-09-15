const NAMES = [
  "APPLIANCE PRO",
  "SERVICEHUB",
  "FIXRIGHT",
  "TECHCARE",
  "HOMEFIX",
  "REPAIRFLOW",
  "SERVICE ONE",
];

export function LogoMarquee() {
  const row = [...NAMES, ...NAMES];
  return (
    <section className="relative overflow-hidden border-t border-white/10 bg-[#05070c] py-16">
      <div className="shell">
        <div className="label-mono text-[#8fb4e8]">BUILT FOR SERVICE TEAMS</div>
      </div>
      <div className="relative mt-10 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
        <div
          className="flex w-max items-center gap-20 whitespace-nowrap"
          style={{ animation: "marquee 48s linear infinite" }}
        >
          {row.map((n, i) => (
            <span
              key={`${n}-${i}`}
              className="text-[clamp(1.2rem,2vw,1.8rem)] font-medium tracking-[-0.02em] text-white/30"
            >
              {n}
            </span>
          ))}
        </div>
      </div>
      <div className="shell mt-8">
        <p className="label-mono text-white/25">
          CATEGORY PLACEHOLDERS — ILLUSTRATIVE SERVICE BUSINESS TYPES, NOT CUSTOMERS
        </p>
      </div>
    </section>
  );
}

export default LogoMarquee;
