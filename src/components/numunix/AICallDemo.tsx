import { useEffect, useState } from "react";
import { Phone, Check, CalendarCheck } from "lucide-react";
import { Waveform, Pill } from "./primitives";

const STEPS = [
  "Customer identified",
  "Service address confirmed",
  "Issue captured",
  "Technician availability checked",
];

export function AICallDemo({
  customer = "Rahul Sharma",
  issue = "Washing machine isn't draining.",
  reply = "Sure, I can help you schedule a technician.",
  phone = "+91 98XX XXX XXX",
}: {
  customer?: string;
  issue?: string;
  reply?: string;
  phone?: string;
}) {
  const [n, setN] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setN((v) => (v + 1) % (STEPS.length + 2)), 1400);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="w-full rounded-[22px] border border-white/10 bg-gradient-to-b from-white to-[#eef3f8] p-5 shadow-[0_40px_120px_-40px_rgba(2,8,23,0.9)] sm:p-6">
      <div className="flex items-center justify-between">
        <div className="flex min-w-0 items-center gap-3">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#1e4ed8] text-white">
            <Phone size={15} />
          </span>
          <div className="min-w-0">
            <div className="label-mono text-[#5d76a3]">INCOMING CALL</div>
            <div className="truncate font-mono text-sm text-[#08152e]">{phone}</div>
          </div>
        </div>
        <Pill tone="blue">LIVE</Pill>
      </div>

      <div className="mt-5 rounded-xl border border-[#dfe7f1] bg-white p-4">
        <div className="flex items-center justify-between">
          <span className="label-mono text-[#1747b8]">AI SERVICE AGENT</span>
          <span className="label-mono text-[#8190aa]">Listening…</span>
        </div>
        <div className="mt-3">
          <Waveform />
        </div>
      </div>

      <div className="mt-4 grid grid-cols-[minmax(0,1fr)_auto] gap-3 sm:flex sm:justify-between">
        <div className="min-w-0">
          <div className="label-mono text-[#8190aa]">CUSTOMER</div>
          <div className="truncate text-[15px] text-[#08152e]">{customer}</div>
        </div>
        <div className="min-w-0 sm:text-right">
          <div className="label-mono text-[#8190aa]">ISSUE</div>
          <div className="truncate text-[15px] text-[#08152e]">“{issue}”</div>
        </div>
      </div>

      <div className="mt-4 rounded-xl bg-[#0b1b38] p-4">
        <div className="label-mono text-[#8fb4e8]">AI AGENT</div>
        <p className="mt-1.5 text-[15px] leading-relaxed text-white/90">“{reply}”</p>
      </div>

      <ul className="mt-4 space-y-2">
        {STEPS.map((s, i) => (
          <li
            key={s}
            className="flex items-center gap-2 text-[14px] transition-opacity duration-500"
            style={{ opacity: i < n ? 1 : 0.3 }}
          >
            <Check size={14} className="text-[#1f7a52]" />
            <span className="text-[#102a63]">{s}</span>
          </li>
        ))}
      </ul>

      <div
        className="mt-5 rounded-xl border border-[#c9dcf7] bg-[#e7eefb] p-4 transition-all duration-500"
        style={{ opacity: n >= STEPS.length ? 1 : 0.35 }}
      >
        <div className="flex items-center gap-2">
          <CalendarCheck size={15} className="text-[#1747b8]" />
          <span className="label-mono text-[#1747b8]">APPOINTMENT CONFIRMED</span>
        </div>
        <div className="mt-3 grid grid-cols-3 gap-3">
          <div>
            <div className="label-mono text-[#8190aa]">TODAY</div>
            <div className="text-lg text-[#08152e]">4:30 PM</div>
          </div>
          <div>
            <div className="label-mono text-[#8190aa]">TECHNICIAN</div>
            <div className="text-[15px] text-[#08152e]">Arjun Kumar</div>
          </div>
          <div>
            <div className="label-mono text-[#8190aa]">STATUS</div>
            <div className="mt-0.5">
              <Pill tone="green">BOOKED</Pill>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AICallDemo;
