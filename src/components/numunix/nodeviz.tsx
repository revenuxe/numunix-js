// Distinct micro-visualisations — one per operations node.
// Each is a tiny, calm, dark-surface instrument graphic (no generic progress bars).

const BLUE = "#3b82f6";
const CYAN = "#1747b8";

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 120 34" className="h-9 w-full" preserveAspectRatio="none">
      {children}
    </svg>
  );
}

/** 01 LEAD — incoming ticks stacking up */
export function VizLead() {
  const h = [8, 13, 10, 18, 15, 22, 19, 27, 24, 31];
  return (
    <Frame>
      {h.map((v, i) => (
        <rect
          key={i}
          x={i * 12 + 1}
          y={32 - v}
          width="4"
          height={v}
          fill={i > 6 ? CYAN : "#c7d7ef"}
          opacity={i > 6 ? 0.9 : 1}
        />
      ))}
    </Frame>
  );
}

/** 02 AI CALL — live voice waveform */
export function VizCall() {
  return (
    <div className="flex h-9 items-center gap-[2px]">
      {Array.from({ length: 26 }).map((_, i) => (
        <span
          key={i}
          className="w-[2px] rounded-full bg-[#2563eb]"
          style={{
            height: `${22 + Math.abs(Math.sin(i * 0.9)) * 70}%`,
            animation: `nx-pulse-dot ${850 + (i % 6) * 150}ms ease-in-out ${i * 45}ms infinite`,
          }}
        />
      ))}
    </div>
  );
}

/** 03 BOOKING — slot grid with confirmed cells */
export function VizBooking() {
  const filled = [1, 4, 6, 9, 12];
  return (
    <div className="grid h-9 grid-cols-7 grid-rows-2 gap-[3px]">
      {Array.from({ length: 14 }).map((_, i) => (
        <span
          key={i}
          className="rounded-[2px]"
          style={{
            background: filled.includes(i) ? BLUE : "#e2eaf5",
            boxShadow: filled.includes(i) ? `0 0 10px -2px ${BLUE}` : undefined,
          }}
        />
      ))}
    </div>
  );
}

/** 04 TECHNICIAN — availability dial */
export function VizTechnician() {
  return (
    <div className="flex h-9 items-center gap-2">
      <svg viewBox="0 0 36 36" className="h-9 w-9">
        <circle cx="18" cy="18" r="14" fill="none" stroke="#dde7f5" strokeWidth="3" />
        <circle
          cx="18"
          cy="18"
          r="14"
          fill="none"
          stroke={CYAN}
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="88"
          strokeDashoffset={88 - 88 * 0.7}
          transform="rotate(-90 18 18)"
        />
      </svg>
      <div className="flex flex-col gap-[3px]">
        {[1, 2, 3].map((i) => (
          <span
            key={i}
            className="h-[2px] rounded-full bg-[#c7d7ef]"
            style={{ width: 34 - i * 7 }}
          />
        ))}
      </div>
    </div>
  );
}

/** 05 SERVICE JOB — running job lanes */
export function VizJobs() {
  const lanes = [0.82, 0.54, 0.31];
  return (
    <div className="flex h-9 flex-col justify-center gap-[6px]">
      {lanes.map((w, i) => (
        <div key={i} className="relative h-[3px] w-full rounded-full bg-[#e2eaf5]">
          <span
            className="absolute inset-y-0 left-0 rounded-full"
            style={{
              width: `${w * 100}%`,
              background: `linear-gradient(90deg,#1747b8,${i === 0 ? CYAN : BLUE})`,
            }}
          />
        </div>
      ))}
    </div>
  );
}

/** 06 INVOICE — value trend line */
export function VizInvoice() {
  const pts = [10, 16, 13, 21, 18, 26, 24, 30];
  const d = pts
    .map((p, i) => `${i === 0 ? "M" : "L"}${(i / (pts.length - 1)) * 118 + 1},${33 - p}`)
    .join(" ");
  return (
    <Frame>
      <path d={`${d} L119,33 L1,33 Z`} fill="url(#nxg)" opacity="0.35" />
      <defs>
        <linearGradient id="nxg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={BLUE} stopOpacity="0.8" />
          <stop offset="100%" stopColor={BLUE} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={d} fill="none" stroke={CYAN} strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
    </Frame>
  );
}

/** 07 PAYMENT — collected vs pending split */
export function VizPayment() {
  return (
    <div className="flex h-9 flex-col justify-center gap-2">
      <div className="flex h-[6px] w-full overflow-hidden rounded-full bg-[#e2eaf5]">
        <span className="h-full" style={{ width: "76%", background: BLUE }} />
        <span className="h-full" style={{ width: "10%", background: CYAN, opacity: 0.6 }} />
      </div>
      <div className="label-mono flex justify-between text-[9px] text-[#8190aa]">
        <span>COLLECTED 76%</span>
        <span>DUE 24%</span>
      </div>
    </div>
  );
}

/** 08 AMC RENEWAL — renewal countdown pips */
export function VizAmc() {
  return (
    <div className="flex h-9 items-center gap-[5px]">
      {Array.from({ length: 9 }).map((_, i) => (
        <span
          key={i}
          className="h-2 w-2 rotate-45"
          style={{
            background: i < 4 ? CYAN : "transparent",
            border: i < 4 ? "none" : "1px solid #c7d7ef",
          }}
        />
      ))}
    </div>
  );
}

export const NODE_VIZ = [
  VizLead,
  VizCall,
  VizBooking,
  VizTechnician,
  VizJobs,
  VizInvoice,
  VizPayment,
  VizAmc,
];
