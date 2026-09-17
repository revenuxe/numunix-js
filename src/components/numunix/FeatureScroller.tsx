import { useEffect, useRef, useState } from "react";
import { Label, Reveal } from "./primitives";
import AICallDemo from "./AICallDemo";
import {
  BookingDemo,
  TechnicianDispatch,
  ServiceOperations,
  InvoiceDemo,
} from "./demos";
import { Card, CardHead, MetricGrid, CardAction } from "./cardkit";

function AutomationPanel() {
  const rows = [
    ["JOB COMPLETED", "Invoice generated automatically"],
    ["INVOICE SENT", "Delivered on WhatsApp"],
    ["PAYMENT RECEIVED", "Marked paid · ₹2,478"],
    ["FOLLOW-UP", "Feedback request scheduled +2d"],
  ];
  return (
    <Card>
      <CardHead chip="BUSINESS AUTOMATION" status="RUNNING" title="Automation timeline" />
      <div className="border-b border-[#eef3f8]">
        {rows.map(([k, v], i) => (
          <div
            key={k}
            className={`flex gap-4 px-5 py-4 sm:px-6 ${i > 0 ? "border-t border-[#eef3f8]" : ""}`}
          >
            <div className="flex flex-col items-center">
              <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#1e4ed8]" />
              {i < rows.length - 1 && <span className="mt-1 w-px flex-1 bg-[#dbe5f2]" />}
            </div>
            <div className="min-w-0">
              <div className="label-mono text-[#102a63]">{k}</div>
              <div className="mt-1 text-[13px] text-[#8190aa]">{v}</div>
            </div>
          </div>
        ))}
      </div>
      <MetricGrid
        items={[
          { k: "WORKFLOWS TODAY", v: "4" },
          { k: "MANUAL STEPS", v: "0" },
        ]}
      />
      <CardAction>VIEW AUTOMATIONS</CardAction>
    </Card>
  );
}

type Item = {
  nav: string;
  title: string;
  body: string;
  panel: React.ReactNode;
};

const ITEMS: Item[] = [
  {
    nav: "AI CALL AGENTS",
    title: "Every call answered, qualified and booked.",
    body: "Numunix AI agents pick up instantly, understand the customer's issue, capture service details and confirm a slot — day, night or peak hours.",
    panel: (
      <AICallDemo
        customer="Ananya"
        issue="AC Repair"
        reply="Hi Ananya, I can help you schedule an AC technician."
      />
    ),
  },
  {
    nav: "AUTOMATED BOOKING",
    title: "Appointments that schedule themselves.",
    body: "Availability, service duration and technician coverage are checked in real time, so the slot offered to a customer is a slot you can actually deliver.",
    panel: <BookingDemo />,
  },
  {
    nav: "SMART TECHNICIAN ASSIGNMENT",
    title: "The right technician on every job.",
    body: "Distance, skill match, workload and current status are scored together, and the best technician is recommended before the job is dispatched.",
    panel: <TechnicianDispatch />,
  },
  {
    nav: "SERVICE OPERATIONS",
    title: "One live view of the working day.",
    body: "Track every service job from scheduled to in progress to complete, with technician, location and status visible across teams and locations.",
    panel: <ServiceOperations />,
  },
  {
    nav: "INVOICING & BILLING",
    title: "Invoices raised the moment work ends.",
    body: "Service, parts and tax are calculated automatically, sent over WhatsApp, and tracked through to payment without anyone chasing paperwork.",
    panel: <InvoiceDemo />,
  },
  {
    nav: "BUSINESS AUTOMATION",
    title: "The follow-up work runs itself.",
    body: "Reminders, confirmations, feedback requests and repeat-service nudges run on their own, so nothing is dropped after the job is closed.",
    panel: <AutomationPanel />,
  },
];

function MobileStage() {
  const wrap = useRef<HTMLDivElement>(null);
  const [i, setI] = useState(0);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = wrap.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const total = r.height - window.innerHeight;
      const p = total > 0 ? Math.min(1, Math.max(0, -r.top / total)) : 0;
      const idx = Math.min(ITEMS.length - 1, Math.floor(p * ITEMS.length * 0.999));
      setI(idx);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={wrap}
      className="lg:hidden"
      style={{ height: `${ITEMS.length * 95}vh` }}
    >
      <div className="sticky top-24 overflow-hidden">
        <div className="flex items-center justify-between">
          <span className="label-mono text-[#1747b8]">{ITEMS[i]?.nav}</span>
          <span className="label-mono text-[#8190aa]">
            {String(i + 1).padStart(2, "0")} / {String(ITEMS.length).padStart(2, "0")}
          </span>
        </div>

        <div className="mt-2 flex gap-1.5">
          {ITEMS.map((it, j) => (
            <span
              key={it.nav}
              className={`h-[2px] flex-1 rounded-full transition-colors duration-500 ${
                j <= i ? "bg-[#1e4ed8]" : "bg-[#dbe5f2]"
              }`}
            />
          ))}
        </div>

        <div className="mt-5 grid">
          {ITEMS.map((it, j) => (
            <div
              key={it.nav}
              className="[grid-area:1/1] transition-all duration-[650ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
              style={{
                opacity: j === i ? 1 : 0,
                transform:
                  j === i
                    ? "translateX(0) scale(1)"
                    : j > i
                      ? "translateX(34%) scale(0.95)"
                      : "translateX(-22%) scale(0.95)",
                pointerEvents: j === i ? "auto" : "none",
              }}
            >
              {it.panel}
            </div>
          ))}
        </div>

        <div className="mt-6 grid">
          {ITEMS.map((it, j) => (
            <div
              key={it.nav}
              className="[grid-area:1/1] transition-all duration-500"
              style={{
                opacity: j === i ? 1 : 0,
                transform: j === i ? "translateY(0)" : "translateY(10px)",
              }}
            >
              <h3 className="text-[1.3rem] font-normal leading-[1.3] tracking-[-0.025em] text-[#0b1b38]">
                {it.title}
              </h3>
              <p className="mt-3 text-[15px] leading-[1.65] text-[#5d76a3]">{it.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function FeatureScroller() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const mid = window.innerHeight * 0.45;
      let best = 0;
      let bestDist = Infinity;
      refs.current.forEach((el, i) => {
        if (!el) return;
        const r = el.getBoundingClientRect();
        const d = Math.abs(r.top + r.height / 2 - mid);
        if (d < bestDist) {
          bestDist = d;
          best = i;
        }
      });
      setActive(best);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="bg-[#f7f9fc] py-16 sm:py-24 lg:py-[140px]">
      <div className="shell">
        <div className="grid gap-14 lg:grid-cols-[0.82fr_1.18fr] lg:gap-24">
          {/* LEFT — sticky index */}
          <div>
            <div className="lg:sticky lg:top-32">
              <Label tone="light">WHY NUMUNIX</Label>
              <div className="mt-8 hidden lg:block">
                {ITEMS.map((it, i) => (
                  <button
                    key={it.nav}
                    onClick={() =>
                      refs.current[i]?.scrollIntoView({ behavior: "smooth", block: "center" })
                    }
                    className="block w-full text-left"
                  >
                    <span
                      className={`block py-[6px] text-[clamp(1.6rem,2.5vw,2.45rem)] font-light leading-[1.22] tracking-[-0.035em] transition-colors duration-500 ${
                        active === i ? "text-[#0b1b38]" : "text-[#c2cfe2]"
                      }`}
                    >
                      {it.nav}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* MOBILE — pinned stage, cards slide in from the right on scroll */}
          <MobileStage />


          {/* DESKTOP — continuous panel stack */}
          <div className="hidden lg:block lg:space-y-[170px]">
            {ITEMS.map((it, i) => (
              <div
                key={it.nav}
                data-i={i}
                ref={(el) => {
                  refs.current[i] = el;
                }}
              >
                <div>{it.panel}</div>
                <h3 className="mt-10 max-w-[620px] text-[clamp(1.35rem,1.9vw,1.75rem)] font-normal leading-[1.28] tracking-[-0.02em] text-[#0b1b38]">
                  {it.title}
                </h3>
                <p className="mt-4 max-w-[560px] text-[17px] leading-[1.65] text-[#5d76a3]">
                  {it.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default FeatureScroller;
