import { useEffect, useRef, useState } from "react";
import { Label, Reveal } from "./primitives";
import AICallDemo from "./AICallDemo";
import {
  BookingDemo,
  TechnicianDispatch,
  ServiceOperations,
  InvoiceDemo,
} from "./demos";

const ITEMS = [
  "AI CALL AGENTS",
  "AUTOMATED BOOKING",
  "SMART TECHNICIAN ASSIGNMENT",
  "SERVICE OPERATIONS",
  "INVOICING & BILLING",
  "BUSINESS AUTOMATION",
];

function AutomationPanel() {
  const rows = [
    ["JOB COMPLETED", "Invoice generated automatically"],
    ["INVOICE SENT", "Delivered on WhatsApp"],
    ["PAYMENT RECEIVED", "Marked paid · ₹2,478"],
    ["FOLLOW-UP", "Feedback request scheduled +2d"],
  ];
  return (
    <div className="w-full rounded-[22px] border border-[#dfe7f1] bg-white p-6 shadow-[0_30px_80px_-50px_rgba(16,42,99,0.6)]">
      <div className="label-mono text-[#5d76a3]">AUTOMATION TIMELINE</div>
      <div className="mt-6 space-y-4">
        {rows.map(([k, v], i) => (
          <div key={k} className="flex gap-4">
            <div className="flex flex-col items-center">
              <span className="mt-1 h-2.5 w-2.5 rounded-full bg-[#1e4ed8]" />
              {i < rows.length - 1 && <span className="mt-1 w-px flex-1 bg-[#dbe5f2]" />}
            </div>
            <div className="pb-2">
              <div className="label-mono text-[#102a63]">{k}</div>
              <div className="mt-1 text-[14px] text-[#5d76a3]">{v}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 rounded-xl bg-[#f1f5f9] p-4 text-[13px] text-[#5d76a3]">
        4 workflows ran today without manual input.
      </div>
    </div>
  );
}

const PANELS = [
  <AICallDemo key="a" customer="Ananya" issue="AC Repair" reply="Hi Ananya, I can help you schedule an AC technician." />,
  <BookingDemo key="b" />,
  <TechnicianDispatch key="c" />,
  <ServiceOperations key="d" />,
  <InvoiceDemo key="e" />,
  <AutomationPanel key="f" />,
];

export function FeatureScroller() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const i = Number((e.target as HTMLElement).dataset["i"]);
            setActive(i);
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    refs.current.forEach((r) => r && io.observe(r));
    return () => io.disconnect();
  }, []);

  return (
    <section className="bg-[#eef3f8] py-24 lg:py-[150px]">
      <div className="shell">
        <Label tone="light">WHY NUMUNIX</Label>

        <div className="mt-14 grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
          <div>
            {/* desktop: sticky scroll list */}
            <div className="hidden lg:block lg:sticky lg:top-32">
              {ITEMS.map((t, i) => (
                <button
                  key={t}
                  onClick={() => setActive(i)}
                  className="block w-full text-left"
                >
                  <span
                    className={`block py-3 text-[clamp(1.8rem,3.2vw,3.2rem)] font-light leading-[1.14] tracking-[-0.03em] transition-colors duration-500 ${
                      active === i ? "text-[#0b1b38]" : "text-[#b3c4dc]"
                    }`}
                  >
                    {t}
                  </span>
                </button>
              ))}
            </div>

            {/* mobile: stacked */}
            <div className="space-y-14 lg:hidden">
              {ITEMS.map((t, i) => (
                <div
                  key={t}
                  data-i={i}
                  ref={(el) => {
                    refs.current[i] = el;
                  }}
                >
                  <h3 className="text-[2rem] font-light leading-tight tracking-[-0.03em] text-[#0b1b38]">
                    {t}
                  </h3>
                  <div className="mt-6">{PANELS[i]}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="sticky top-28">
              <div key={active} style={{ animation: "nx-rise 500ms ease both" }}>
                {PANELS[active]}
              </div>
            </div>
          </div>
        </div>

        {/* desktop scroll drivers */}
        <div className="hidden lg:block">
          {ITEMS.map((t, i) => (
            <div
              key={t}
              data-i={i}
              ref={(el) => {
                refs.current[i] = el;
              }}
              className="h-[42vh]"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeatureScroller;

export function FeatureScrollerIntro() {
  return (
    <Reveal>
      <div />
    </Reveal>
  );
}
