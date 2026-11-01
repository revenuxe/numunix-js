import { Label, Heading, Accent, Reveal } from "./primitives";
import { NODE_VIZ } from "./nodeviz";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { WORKFLOW_STAGES } from "@/content/workflow";

const NODES = WORKFLOW_STAGES;

// Homepage panel shows the same eight stages, relabelled for electronics repair.
const REPAIR_NODES = [
  { slug: "idea", phase: "INTAKE", name: "Walk-in", category: "BOOKED" },
  { slug: "scope", phase: "DIAGNOSE", name: "Fault", category: "IDENTIFIED" },
  { slug: "ux", phase: "ESTIMATE", name: "Quote", category: "APPROVED" },
  { slug: "code", phase: "REPAIR", name: "Bench", category: "IN REPAIR" },
  { slug: "apis", phase: "PARTS", name: "Spares", category: "SOURCED" },
  { slug: "qa", phase: "TESTING", name: "QC", category: "PASSED" },
  { slug: "cloud", phase: "HANDOVER", name: "Ready", category: "DELIVERED" },
  { slug: "grow", phase: "WARRANTY", name: "90 days", category: "COVERED" },
];

type PanelNodes = { slug: string; phase: string; name: string; category: string }[];

export function PlatformIntro() {
  return (
    <section id="approach" className="section-pad bg-[#f1f5f9]">
      <div className="shell">
        <Reveal>
          <Label tone="light">HOW A REPAIR WORKS</Label>
        </Reveal>
        <div className="mt-10 grid gap-12 lg:grid-cols-[1.25fr_0.75fr] lg:gap-20">
          <Reveal delay={60}>
            <Heading tone="light">
              From walk-in
              <br />
              <Accent>to working again.</Accent>
            </Heading>
          </Reveal>
          <Reveal delay={140}>
            <p className="max-w-[44ch] text-[18px] leading-relaxed text-[#5d76a3] lg:pt-6 lg:text-[20px]">
              One workshop for diagnostics, repair, and everything it takes to get your device back.
            </p>
          </Reveal>
        </div>
      </div>
      <Reveal delay={120}>
        <WorkflowVisualization nodes={REPAIR_NODES} label="DEVICE INTAKE TO HANDOVER" sub="/ BROKEN → FIXED" />
      </Reveal>
    </section>
  );
}

export function WorkflowVisualization({
  nodes = NODES,
  label = "IDEA TO PRODUCT",
  sub = "/ BUSINESS → GROWTH",
}: {
  nodes?: PanelNodes;
  label?: string;
  sub?: string;
}) {
  return (
    <div className="mt-12 w-full lg:mt-20">
      {/* head */}
      <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-5 lg:px-12">
        <div className="flex items-baseline gap-4">
          <span className="label-mono text-[#1747b8]">{label}</span>
          <span className="label-mono hidden text-[#a8b7cc] sm:inline">{sub}</span>
        </div>
        <span className="label-mono flex items-center gap-2 text-[#8190aa]">
          <span
            className="h-1.5 w-1.5 rounded-full bg-[#2563eb]"
            style={{ animation: "nx-pulse-dot 2.4s ease-in-out infinite" }}
          />
          CONNECTED AT EVERY STEP
        </span>
      </div>

      {/* flow rail */}
      <div>
        <div className="grid grid-cols-2 gap-4 px-6 py-5 sm:gap-5 md:grid-cols-4 xl:grid-cols-8 lg:px-12">
          {nodes.map(({ phase: n, name: v, category: u, slug }, i) => (
            <Link
              key={slug}
              to="/approach/$slug"
              params={{ slug }}
              aria-label={`${n}: ${v} — explore ${u.toLowerCase()}`}
              className="group relative flex min-w-0 flex-col justify-between overflow-hidden rounded-2xl border border-[#e1eaf5] bg-white px-4 py-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#b8ccec] hover:bg-[#f5f8fd] hover:shadow-[0_4px_20px_-10px_rgba(30,78,216,0.15)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563eb] motion-reduce:transform-none motion-reduce:transition-none sm:px-5 sm:py-6"
            >
              <span className="pointer-events-none absolute inset-x-0 -top-px h-px scale-x-0 bg-gradient-to-r from-transparent via-[#2563eb] to-transparent transition-transform duration-500 group-hover:scale-x-100" />

              <div className="flex items-center gap-2">
                <span className="label-mono text-[#b3c2d6]">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-[12px] tracking-[0.04em] text-[#5d76a3] sm:text-[12.5px] xl:text-[11px]">
                  {n}
                </span>
              </div>

              <div className="mt-5">
                <div className="font-mono text-[22px] leading-none font-light tracking-[-0.02em] text-[#08152e] sm:text-[26px]">
                  {v}
                </div>
                <div className="label-mono mt-2 truncate text-[#1747b8]">{u}</div>
              </div>

              <div className="mt-4 opacity-90 transition-opacity duration-300 group-hover:opacity-100">
                {(() => {
                  const V = NODE_VIZ[i]!;
                  return <V />;
                })()}
              </div>
              <span
                aria-hidden="true"
                className="absolute right-2 top-2 text-[#2563eb] transition-colors group-hover:text-[#1747b8] group-focus-visible:text-[#1747b8]"
              >
                <ArrowUpRight size={16} />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PlatformIntro;
