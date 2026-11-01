import { Waveform } from "./primitives";
import { MapPin, Star } from "lucide-react";
import {
  Card,
  CardHead,
  MetricGrid,
  CardBody,
  Quote,
  Tag,
  CardAction,
  Chip,
} from "./cardkit";

export function BookingDemo() {
  const days = ["MON", "TUE", "WED", "THU", "FRI"];
  const slots = ["09:00", "11:00", "13:30", "16:30", "18:00"];
  return (
    <Card>
      <CardHead chip="BOOKING PLATFORM" status="EXAMPLE" title="Wednesday, 4:30 PM" />

      <CardBody divide tint={false}>
        <div className="grid grid-cols-5 gap-1.5">
          {days.map((d, i) => (
            <div
              key={d}
              className={`rounded-lg border px-1 py-3 text-center ${
                i === 2 ? "border-[#1e4ed8] bg-[#e7eefb]" : "border-[#eef3f8] bg-[#f7f9fc]"
              }`}
            >
              <div className="label-mono text-[#8190aa]">{d}</div>
              <div className="mt-1 text-[14px] text-[#102a63]">{12 + i}</div>
            </div>
          ))}
        </div>
        <div className="mt-2 grid grid-cols-5 gap-1.5">
          {slots.map((s) => (
            <div
              key={s}
              className={`rounded-lg px-1 py-2 text-center font-mono text-[10px] ${
                s === "16:30" ? "bg-[#1e4ed8] text-white" : "bg-[#f1f5f9] text-[#5d76a3]"
              }`}
            >
              {s}
            </div>
          ))}
        </div>
      </CardBody>

      <MetricGrid
        items={[
          { k: "CUSTOMER", v: "Rahul Sharma" },
          { k: "SESSION", v: "Product walkthrough" },
          { k: "HOST", v: "Product team" },
          { k: "STATUS", v: "CONFIRMED" },
        ]}
      />

      <CardAction>SLOT CONFIRMED</CardAction>
    </Card>
  );
}

const TECHS = [
  { n: "DESIGN", d: "User flows", s: "Ready", k: "UI/UX", r: 5 },
  { n: "BUILD", d: "Cross-platform", s: "Active", k: "React Native", r: 4 },
  { n: "RELEASE", d: "Device testing", s: "Next", k: "iOS + Android", r: 4 },
];

export function TechnicianDispatch({ compact = false }: { compact?: boolean }) {
  return (
    <Card>
      <CardHead chip="CONNECTED APP" status="EXAMPLE" title="Mobile product workspace" />

      <MetricGrid
        items={[
          {
            k: "EXPERIENCE",
            v: (
              <span className="inline-flex items-center gap-1.5">
                <MapPin size={13} className="text-[#1e4ed8]" /> Mobile-first
              </span>
            ),
          },
          { k: "PLATFORMS", v: "iOS + Android" },
        ]}
      />

      {!compact && (
        <div className="border-b border-[#eef3f8]">
          <AbstractMap />
        </div>
      )}

      <div className="border-b border-[#eef3f8]">
        {TECHS.map((t, i) => (
          <div
            key={t.n}
            className={`grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-5 py-4 sm:px-6 ${
              i > 0 ? "border-t border-[#eef3f8]" : ""
            } ${i === 0 ? "bg-[#f3f7fd]" : ""}`}
          >
            <div className="min-w-0">
              <div className="label-mono text-[#102a63]">{t.n}</div>
              <div className="mt-1 truncate text-[13px] text-[#8190aa]">
                {t.d} · {t.k}
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-3">
              <span className="hidden sm:flex">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star
                    key={j}
                    size={10}
                    className={j < t.r ? "fill-[#1e4ed8] text-[#1e4ed8]" : "text-[#c7d3e5]"}
                  />
                ))}
              </span>
              <span className="label-mono text-[#8190aa]">{t.s}</span>
            </div>
          </div>
        ))}
      </div>

      <CardAction>EXPLORE THE WORKFLOW</CardAction>
    </Card>
  );
}

export function AbstractMap() {
  const dots: { x: number; y: number }[] = [];
  for (let y = 0; y < 9; y++)
    for (let x = 0; x < 22; x++) dots.push({ x: x * 14 + 8, y: y * 14 + 8 });
  return (
    <div className="bg-[#f7f9fc] px-5 py-5 sm:px-6">
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
  ["10:00", "Customer portal", "Frontend · PRODUCT TEAM", "IN PROGRESS"],
  ["11:30", "Payment integration", "Backend · API TEAM", "IN REVIEW"],
  ["12:15", "Reporting dashboard", "Analytics · DATA TEAM", "SCHEDULED"],
] as const;

export function ServiceOperations() {
  return (
    <Card>
      <CardHead chip="BUSINESS SOFTWARE" status="EXAMPLE" title="Your team’s workspace" />

      <div className="border-b border-[#eef3f8]">
        {JOBS.map((j, i) => (
          <div
            key={j[0]}
            className={`grid grid-cols-[auto_minmax(0,1fr)] items-start gap-4 px-5 py-4 sm:px-6 ${
              i > 0 ? "border-t border-[#eef3f8]" : ""
            }`}
          >
            <span className="shrink-0 font-mono text-[13px] text-[#1747b8]">{j[0]}</span>
            <div className="min-w-0">
              <div className="truncate text-[15px] text-[#08152e]">{j[1]}</div>
              <div className="mt-1 truncate text-[13px] text-[#8190aa]">{j[2]}</div>
              <div className="mt-2">
                <Chip>{j[3]}</Chip>
              </div>
            </div>
          </div>
        ))}
      </div>

      <MetricGrid
        items={[
          { k: "TEAM MEMBERS", v: "7" },
          { k: "ACTIVE WORKFLOWS", v: "3" },
        ]}
      />

      <CardAction>EXPLORE THE WORKSPACE</CardAction>
    </Card>
  );
}

export function InvoiceDemo() {
  const rows = [
    ["Subscription", "₹850"],
    ["Usage", "₹1,250"],
    ["GST", "₹378"],
  ];
  return (
    <Card>
      <CardHead chip="SAAS BILLING" status="EXAMPLE" live={false} title="₹2,478" />

      <MetricGrid
        items={[
          { k: "CUSTOMER", v: "Rahul Sharma" },
          { k: "ACCOUNT", v: "Example workspace" },
        ]}
      />

      <CardBody divide>
        <div className="space-y-2 text-[14px]">
          {rows.map(([k, v]) => (
            <div key={k} className="flex justify-between">
              <span className="text-[#8190aa]">{k}</span>
              <span className="text-[#102a63]">{v}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <Tag dot="#1e4ed8">Auto-generated</Tag>
          <Tag dot="#38bdf8">Payment integration</Tag>
        </div>
      </CardBody>

      <CardAction>VIEW SAMPLE INVOICE</CardAction>
    </Card>
  );
}

export function VoiceAgentPanel() {
  return (
    <Card tone="dark">
      <CardHead tone="dark" chip="AI VOICE AGENT" status="EXAMPLE · 01:42" title="An assistant in your product" />

      <CardBody tone="dark" divide>
        <Waveform tone="dark" bars={34} />
        <div className="mt-5 space-y-3">
          <Quote tone="dark">“Can I book a walkthrough of your product?”</Quote>
          <Quote tone="dark">
            “Of course, there’s a slot today at 4:30 PM. Shall I book it?”
          </Quote>
        </div>
      </CardBody>

      <MetricGrid
        tone="dark"
        items={[
          { k: "CUSTOMER", v: "Identified" },
          { k: "INTEREST", v: "Captured" },
          { k: "CONTEXT", v: "Confirmed" },
          { k: "SLOT", v: "Available" },
        ]}
      />

      <CardAction tone="dark">CONFIRM BOOKING</CardAction>
    </Card>
  );
}
