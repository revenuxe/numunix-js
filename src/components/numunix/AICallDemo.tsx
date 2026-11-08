"use client";
import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import { Waveform } from "./primitives";
import { Card, CardHead, MetricGrid, CardBody, Quote, CardAction } from "./cardkit";

const STEPS = [
  "Customer identified",
  "Product interest confirmed",
  "Requirements captured",
  "Calendar availability checked",
];

export function AICallDemo({
  customer = "Rahul Sharma",
  issue = "I’d like a walkthrough of your product.",
  reply = "Sure, I can help you book a product walkthrough.",
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
    <Card>
      <CardHead chip="AI CALL AGENT" status="EXAMPLE · 01:42" title={<span className="font-mono">{phone}</span>} />

      <MetricGrid
        items={[
          { k: "CUSTOMER", v: customer },
          { k: "CONTEXT", v: "Product enquiry" },
        ]}
      />

      <CardBody divide>
        <div className="mb-4">
          <Waveform />
        </div>
        <div className="space-y-3">
          <Quote>“{issue}”</Quote>
          <Quote>“{reply}”</Quote>
        </div>
      </CardBody>

      <div className="grid grid-cols-2 border-b border-[#eef3f8]">
        {STEPS.map((s, i) => (
          <div
            key={s}
            className={`flex items-start gap-2 px-5 py-4 transition-opacity duration-500 sm:px-6 ${
              i % 2 === 0 ? "border-r border-[#eef3f8]" : ""
            } ${i >= 2 ? "border-t border-[#eef3f8]" : ""}`}
            style={{ opacity: i < n ? 1 : 0.32 }}
          >
            <Check size={13} className="mt-1 shrink-0 text-[#1f7a52]" />
            <span className="text-[13px] leading-snug text-[#102a63]">{s}</span>
          </div>
        ))}
      </div>

      <MetricGrid
        cols={3}
        items={[
          { k: "TODAY", v: "4:30 PM" },
          { k: "HOST", v: "Product team" },
          { k: "STATUS", v: "BOOKED" },
        ]}
      />

      <CardAction>APPOINTMENT CONFIRMED</CardAction>
    </Card>
  );
}

export default AICallDemo;
