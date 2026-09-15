import { Pill, Waveform } from "./primitives";
import { MapPin, Star, Download, MessageCircle, Wrench } from "lucide-react";

const CARD =
  "w-full rounded-[22px] border border-[#dfe7f1] bg-white p-6 shadow-[0_30px_80px_-50px_rgba(16,42,99,0.6)]";

export function BookingDemo() {
  const days = ["MON", "TUE", "WED", "THU", "FRI"];
  const slots = ["09:00", "11:00", "13:30", "16:30", "18:00"];
  return (
    <div className={CARD}>
      <div className="flex items-center justify-between">
        <span className="label-mono text-[#5d76a3]">AUTOMATED BOOKING</span>
        <Pill tone="blue">CALENDAR</Pill>
      </div>
      <div className="mt-6 grid grid-cols-5 gap-2">
        {days.map((d, i) => (
          <div
            key={d}
            className={`rounded-xl border p-3 text-center ${
              i === 2
                ? "border-[#1e4ed8] bg-[#e7eefb]"
                : "border-[#e6ecf4] bg-[#f7f9fc]"
            }`}
          >
            <div className="label-mono text-[#8190aa]">{d}</div>
            <div className="mt-1 text-[15px] text-[#102a63]">{12 + i}</div>
          </div>
        ))}
      </div>
      <div className="mt-4 grid grid-cols-5 gap-2">
        {slots.map((s) => (
          <div
            key={s}
            className={`rounded-lg px-2 py-2 text-center font-mono text-[11px] ${
              s === "16:30"
                ? "bg-[#1e4ed8] text-white"
                : "bg-[#f1f5f9] text-[#5d76a3]"
            }`}
          >
            {s}
          </div>
        ))}
      </div>
      <div className="mt-6 rounded-xl border border-[#c9dcf7] bg-[#eef3f8] p-5">
        <div className="text-2xl font-light text-[#08152e]">4:30 PM</div>
        <dl className="mt-4 space-y-2 text-[14px]">
          {[
            ["CUSTOMER", "Rahul Sharma"],
            ["SERVICE", "Washing Machine Repair"],
            ["TECHNICIAN", "Arjun"],
          ].map(([k, v]) => (
            <div key={k} className="flex justify-between gap-4">
              <dt className="label-mono text-[#8190aa]">{k}</dt>
              <dd className="text-[#102a63]">{v}</dd>
            </div>
          ))}
          <div className="flex items-center justify-between gap-4 pt-1">
            <dt className="label-mono text-[#8190aa]">STATUS</dt>
            <dd>
              <Pill tone="green">CONFIRMED</Pill>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}

const TECHS = [
  { n: "ARJUN", d: "3.2 km", s: "Available", k: "AC Specialist", r: 5 },
  { n: "IMRAN", d: "5.8 km", s: "Available", k: "AC + HVAC", r: 4 },
  { n: "RAHUL", d: "8.1 km", s: "Busy", k: "Appliance", r: 4 },
];

export function TechnicianDispatch({ compact = false }: { compact?: boolean }) {
  return (
    <div className={CARD}>
      <div className="flex items-center justify-between">
        <span className="label-mono text-[#5d76a3]">SMART ASSIGNMENT</span>
        <Pill tone="amber">NEW JOB</Pill>
      </div>
      <div className="mt-5 flex flex-wrap items-center gap-x-8 gap-y-2">
        <div>
          <div className="label-mono text-[#8190aa]">JOB</div>
          <div className="text-[15px] text-[#08152e]">AC not cooling</div>
        </div>
        <div>
          <div className="label-mono text-[#8190aa]">LOCATION</div>
          <div className="flex items-center gap-1 text-[15px] text-[#08152e]">
            <MapPin size={13} className="text-[#1e4ed8]" /> HSR Layout
          </div>
        </div>
      </div>

      {!compact && <AbstractMap />}

      <div className="mt-5 space-y-2">
        {TECHS.map((t, i) => (
          <div
            key={t.n}
            className={`grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-xl border p-4 transition-colors ${
              i === 0
                ? "border-[#1e4ed8] bg-[#e7eefb]"
                : "border-[#e6ecf4] bg-[#f7f9fc]"
            }`}
          >
            <div className="min-w-0">
              <div className="label-mono text-[#102a63]">{t.n}</div>
              <div className="mt-1 truncate text-[13px] text-[#5d76a3]">
                {t.d} · {t.k}
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-3">
              <span className="flex">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star
                    key={j}
                    size={11}
                    className={j < t.r ? "fill-[#1e4ed8] text-[#1e4ed8]" : "text-[#c7d3e5]"}
                  />
                ))}
              </span>
              <Pill tone={t.s === "Available" ? "green" : "grey"}>{t.s}</Pill>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 flex items-center justify-between gap-3 border-t border-[#e6ecf4] pt-5">
        <div>
          <div className="label-mono text-[#8190aa]">RECOMMENDED</div>
          <div className="text-[15px] text-[#08152e]">ARJUN · ETA 18 min</div>
        </div>
        <span className="label-mono group inline-flex items-center gap-2 rounded-xl bg-[#1e4ed8] px-5 py-3 text-white">
          ASSIGN JOB <span className="hover-arrow">→</span>
        </span>
      </div>
    </div>
  );
}

export function AbstractMap() {
  const dots: { x: number; y: number }[] = [];
  for (let y = 0; y < 9; y++)
    for (let x = 0; x < 22; x++) dots.push({ x: x * 14 + 8, y: y * 14 + 8 });
  return (
    <div className="mt-5 overflow-hidden rounded-xl border border-[#e6ecf4] bg-[#f1f5f9] p-3">
      <svg viewBox="0 0 320 132" className="h-auto w-full">
        {dots.map((d, i) => (
          <circle key={i} cx={d.x} cy={d.y} r="1.4" fill="#c3d2e6" />
        ))}
        <path
          d="M60 96 C120 70 180 90 250 40"
          stroke="#1e4ed8"
          strokeWidth="1.4"
          fill="none"
          strokeDasharray="5 6"
          style={{ animation: "nx-dash 6s linear infinite" }}
        />
        <circle cx="60" cy="96" r="7" fill="#3b82f6" opacity="0.25" />
        <circle cx="60" cy="96" r="3.4" fill="#1e4ed8" />
        <circle cx="250" cy="40" r="9" fill="#38bdf8" opacity="0.25" />
        <circle cx="250" cy="40" r="4" fill="#1747b8" />
      </svg>
    </div>
  );
}

const JOBS = [
  ["10:00", "Washing Machine Repair", "Koramangala", "ARJUN", "IN PROGRESS", "blue"],
  ["11:30", "AC Service", "HSR Layout", "IMRAN", "ASSIGNED", "amber"],
  ["12:15", "Laptop Repair", "Indiranagar", "RAHUL", "SCHEDULED", "grey"],
] as const;

export function ServiceOperations() {
  return (
    <div className={CARD}>
      <div className="flex items-center justify-between">
        <span className="label-mono text-[#5d76a3]">TODAY&apos;S SERVICE JOBS</span>
        <Pill tone="blue">14 ACTIVE</Pill>
      </div>
      <div className="mt-5 divide-y divide-[#eef1f6]">
        {JOBS.map((j) => (
          <div
            key={j[0]}
            className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 py-4"
          >
            <span className="shrink-0 font-mono text-[13px] text-[#1747b8]">{j[0]}</span>
            <div className="min-w-0">
              <div className="truncate text-[15px] text-[#08152e]">{j[1]}</div>
              <div className="truncate text-[13px] text-[#8190aa]">
                {j[2]} · {j[3]}
              </div>
            </div>
            <Pill tone={j[5] as "blue"}>{j[4]}</Pill>
          </div>
        ))}
      </div>
      <div className="mt-2 flex items-center gap-2 rounded-xl bg-[#f7f9fc] p-4">
        <Wrench size={14} className="text-[#1e4ed8]" />
        <span className="text-[13px] text-[#5d76a3]">
          7 technicians on shift · 3 routes optimised this morning
        </span>
      </div>
    </div>
  );
}

export function InvoiceDemo() {
  const rows = [
    ["Service", "₹850"],
    ["Parts", "₹1,250"],
    ["GST", "₹378"],
  ];
  return (
    <div className={CARD}>
      <div className="flex items-start justify-between">
        <div>
          <div className="text-[15px] font-medium tracking-[-0.02em] text-[#08152e]">
            NUMUNIX
          </div>
          <div className="label-mono mt-1 text-[#8190aa]">SERVICE INVOICE</div>
        </div>
        <Pill tone="green">PAID</Pill>
      </div>

      <dl className="mt-6 space-y-2 border-y border-[#eef1f6] py-5 text-[14px]">
        {[
          ["CUSTOMER", "Rahul Sharma"],
          ["SERVICE", "Washing Machine Repair"],
          ["TECHNICIAN", "Arjun Kumar"],
        ].map(([k, v]) => (
          <div key={k} className="flex justify-between gap-4">
            <dt className="label-mono text-[#8190aa]">{k}</dt>
            <dd className="text-[#102a63]">{v}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-5 space-y-2 text-[15px]">
        {rows.map(([k, v]) => (
          <div key={k} className="flex justify-between">
            <span className="text-[#5d76a3]">{k}</span>
            <span className="text-[#102a63]">{v}</span>
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-end justify-between border-t border-[#e6ecf4] pt-4">
        <span className="label-mono text-[#8190aa]">TOTAL</span>
        <span className="text-3xl font-light text-[#08152e]">₹2,478</span>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        <span className="label-mono inline-flex items-center gap-2 rounded-xl border border-[#dbe5f2] px-4 py-3 text-[#102a63]">
          <Download size={13} /> DOWNLOAD PDF
        </span>
        <span className="label-mono inline-flex items-center gap-2 rounded-xl bg-[#1e4ed8] px-4 py-3 text-white">
          <MessageCircle size={13} /> SEND WHATSAPP
        </span>
      </div>
    </div>
  );
}

export function VoiceAgentPanel() {
  return (
    <div className="w-full rounded-[22px] border border-white/10 bg-[#07111f]/80 p-6 backdrop-blur-xl">
      <div className="flex items-center justify-between">
        <span className="label-mono text-[#8fb4e8]">AI VOICE AGENT</span>
        <span className="label-mono text-white/40">CALL TIME 01:42</span>
      </div>
      <div className="mt-6 rounded-xl border border-white/8 bg-white/[0.03] p-5">
        <Waveform tone="dark" bars={34} />
      </div>
      <div className="mt-6 space-y-3">
        <div className="rounded-xl bg-white/[0.04] p-4 text-[15px] text-white/75">
          “My AC stopped cooling since yesterday.”
        </div>
        <div className="rounded-xl bg-[#1e4ed8] p-4 text-[15px] text-white">
          “Got it — I can send an AC specialist today at 4:30 PM. Shall I confirm?”
        </div>
      </div>
      <div className="mt-6 grid grid-cols-2 gap-3">
        {[
          ["CUSTOMER", "IDENTIFIED"],
          ["ISSUE", "CAPTURED"],
          ["LOCATION", "CONFIRMED"],
          ["SLOT", "AVAILABLE"],
        ].map(([k, v]) => (
          <div
            key={k}
            className="rounded-xl border border-white/8 bg-white/[0.03] px-4 py-3"
          >
            <div className="label-mono text-white/40">{k}</div>
            <div className="label-mono mt-1 text-[#6fb3ff]">✓ {v}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
