import { Label, Heading, Accent, Reveal } from "./primitives";
import { NODE_VIZ } from "./nodeviz";
import { Link } from "@tanstack/react-router";
import {
  ArrowUpRight,
  Smartphone,
  Laptop,
  Cctv,
  Tv,
  WashingMachine,
  AirVent,
  Zap,
  Truck,
  type LucideIcon,
} from "lucide-react";
import { WORKFLOW_STAGES } from "@/content/workflow";

const NODES = WORKFLOW_STAGES;

// Homepage panel shows the repair services we cover, each with its own icon.
const REPAIR_NODES = [
  { slug: "idea", phase: "REPAIR", name: "Mobile", category: "SCREENS · BATTERIES", icon: Smartphone },
  { slug: "scope", phase: "REPAIR", name: "Laptop", category: "BOARDS · UPGRADES", icon: Laptop },
  { slug: "ux", phase: "INSTALL", name: "CCTV", category: "SETUP · MAINTENANCE", icon: Cctv },
  { slug: "code", phase: "REPAIR", name: "TV & Audio", category: "PANELS · SOUND", icon: Tv },
  { slug: "apis", phase: "REPAIR", name: "Washing", category: "DRUMS · MOTORS", icon: WashingMachine },
  { slug: "qa", phase: "SERVICE", name: "AC", category: "GAS · COOLING", icon: AirVent },
  { slug: "cloud", phase: "WORK", name: "Electrician", category: "WIRING · FITTINGS", icon: Zap },
  { slug: "grow", phase: "SERVICE", name: "Doorstep", category: "WE COME TO YOU", icon: Truck },
];

type PanelNodes = { slug: string; phase: string; name: string; category: string; icon?: LucideIcon }[];

export function PlatformIntro() {
  return (
    <section id="approach" className="section-pad bg-[#f1f5f9]">
      <div className="shell">
        <Reveal>
          <Label tone="light">WHAT WE FIX</Label>
        </Reveal>
        <div className="mt-10 grid gap-12 lg:grid-cols-[1.25fr_0.75fr] lg:gap-20">
          <Reveal delay={60}>
            <Heading tone="light">
              Every device,
              <br />
              <Accent>one workshop.</Accent>
            </Heading>
          </Reveal>
          <Reveal delay={140}>
            <p className="max-w-[44ch] text-[18px] leading-relaxed text-[#5d76a3] lg:pt-6 lg:text-[20px]">
              Mobiles, laptops, CCTV, home appliances, and electrical work — repaired by certified technicians, at our bench or your doorstep.
            </p>
          </Reveal>
        </div>
      </div>
      <Reveal delay={120}>
        <WorkflowVisualization nodes={REPAIR_NODES} label="REPAIR SERVICES" sub="/ MOBILE → ELECTRICAL" />
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
          {nodes.map(({ phase: n, name: v, category: u, slug, icon: Icon }, i) => (
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
                <div className="font-mono text-[22px] leading-[1.05] font-light tracking-[-0.02em] break-words text-[#08152e] sm:text-[26px] xl:text-[19px]">
                  {v}
                </div>
                <div className="label-mono mt-2 truncate text-[#1747b8]">{u}</div>
              </div>

              <div className="mt-4 opacity-90 transition-opacity duration-300 group-hover:opacity-100">
                {Icon ? (
                  <span className="grid h-9 w-9 place-items-center rounded-lg border border-[#dbe5f2] bg-[#f4f8fd] text-[#1e4ed8] transition-colors duration-300 group-hover:border-[#3b82f6]/45 group-hover:bg-[#eaf2fe]">
                    <Icon size={18} strokeWidth={1.6} aria-hidden="true" />
                  </span>
                ) : (
                  (() => {
                    const V = NODE_VIZ[i]!;
                    return <V />;
                  })()
                )}
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
