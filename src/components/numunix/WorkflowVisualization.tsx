import { Label, Heading, Accent, Reveal } from "./primitives";
import { NODE_VIZ } from "./nodeviz";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { WORKFLOW_STAGES } from "@/content/workflow";

const NODES = WORKFLOW_STAGES;

export function PlatformIntro() {
  return (
    <section id="approach" className="section-pad bg-[#f1f5f9]">
      <div className="shell">
        <Reveal>
          <Label tone="light">OUR APPROACH</Label>
        </Reveal>
        <div className="mt-10 grid gap-12 lg:grid-cols-[1.25fr_0.75fr] lg:gap-20">
          <Reveal delay={60}>
            <Heading tone="light">
              From idea
              <br />
              <Accent>to launch.</Accent>
            </Heading>
          </Reveal>
          <Reveal delay={140}>
            <p className="max-w-[44ch] text-[18px] leading-relaxed text-[#5d76a3] lg:pt-6 lg:text-[20px]">
              One team for design, development, and everything it takes to launch.
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
    <div className="mt-12 overflow-hidden rounded-[28px] border border-[#dbe5f2] bg-white lg:mt-20 shadow-[0_50px_130px_-70px_rgba(16,42,99,0.45)]">
      {/* head */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#e6ecf5] px-5 py-5 sm:px-8">
        <div className="flex items-baseline gap-4">
          <span className="label-mono text-[#1747b8]">IDEA TO PRODUCT</span>
          <span className="label-mono hidden text-[#a8b7cc] sm:inline">/ BUSINESS → GROWTH</span>
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
      <div className="relative bg-[#f0f4fa]">
        <div className="pointer-events-none absolute inset-x-0 top-1/2 hidden h-px bg-[linear-gradient(90deg,transparent,#cddcf2,transparent)] xl:block" />
        <div className="grid grid-cols-2 gap-4 p-5 sm:gap-5 sm:p-6 md:grid-cols-4 xl:grid-cols-8">
          {NODES.map(({ phase: n, name: v, category: u, slug }, i) => (
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

      {/* pulse line */}
      <div className="border-t border-[#e6ecf5] px-5 py-5 sm:px-8">
        <svg viewBox="0 0 1200 24" className="h-auto w-full">
          <line x1="0" y1="12" x2="1200" y2="12" stroke="#e1e9f5" strokeWidth="1" />
          <line
            x1="0"
            y1="12"
            x2="1200"
            y2="12"
            stroke="#2563eb"
            strokeWidth="1.5"
            strokeDasharray="10 26"
            style={{ animation: "nx-dash 5s linear infinite" }}
          />
          {NODES.map((_, i) => (
            <circle key={i} cx={75 + i * 150} cy={12} r="3.5" fill="#1747b8" opacity={0.85} />
          ))}
        </svg>
      </div>
    </div>
  );
}

export default PlatformIntro;
