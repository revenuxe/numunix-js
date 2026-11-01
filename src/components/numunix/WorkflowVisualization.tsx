import { useState } from "react";
import { Label, Heading, Accent, Reveal } from "./primitives";
import { useCategory } from "./category";
import { NODE_VIZ } from "./nodeviz";
import { Link } from "@tanstack/react-router";
import {
  ArrowUpRight,
  Smartphone,
  Laptop,
  Cctv,
  Tv,
  Tablet,
  HardDrive,
  Gamepad2,
  Truck,
  WashingMachine,
  AirVent,
  Refrigerator,
  Microwave,
  Droplets,
  BatteryCharging,
  Fan,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { WORKFLOW_STAGES } from "@/content/workflow";

const NODES = WORKFLOW_STAGES;

type RepairNode = { slug: string; phase: string; name: string; category: string; icon: LucideIcon };

// Homepage panel shows the repair services we cover, switchable by category.
const ELECTRONICS_NODES: RepairNode[] = [
  { slug: "idea", phase: "REPAIR", name: "Mobile", category: "SCREENS · BATTERIES", icon: Smartphone },
  { slug: "scope", phase: "REPAIR", name: "Laptop", category: "BOARDS · UPGRADES", icon: Laptop },
  { slug: "ux", phase: "INSTALL", name: "CCTV", category: "SETUP · MAINTENANCE", icon: Cctv },
  { slug: "code", phase: "REPAIR", name: "TV & Audio", category: "PANELS · SOUND", icon: Tv },
  { slug: "apis", phase: "REPAIR", name: "Tablet", category: "IPAD · ANDROID", icon: Tablet },
  { slug: "qa", phase: "RECOVERY", name: "Data", category: "DRIVES · PHONES", icon: HardDrive },
  { slug: "cloud", phase: "REPAIR", name: "Console", category: "PS · XBOX", icon: Gamepad2 },
  { slug: "grow", phase: "SERVICE", name: "Doorstep", category: "WE COME TO YOU", icon: Truck },
];

const APPLIANCE_NODES: RepairNode[] = [
  { slug: "idea", phase: "REPAIR", name: "Washing", category: "DRUMS · MOTORS", icon: WashingMachine },
  { slug: "scope", phase: "SERVICE", name: "AC", category: "GAS · COOLING", icon: AirVent },
  { slug: "ux", phase: "REPAIR", name: "Fridge", category: "COOLING · GAS", icon: Refrigerator },
  { slug: "code", phase: "REPAIR", name: "Microwave", category: "OVENS · CHIMNEY", icon: Microwave },
  { slug: "apis", phase: "SERVICE", name: "Purifier", category: "RO · FILTERS", icon: Droplets },
  { slug: "qa", phase: "REPAIR", name: "Inverter", category: "UPS · BATTERIES", icon: BatteryCharging },
  { slug: "cloud", phase: "WORK", name: "Fan & Light", category: "FITTING · REPAIR", icon: Fan },
  { slug: "grow", phase: "WORK", name: "Electrical", category: "WIRING · FITTINGS", icon: Zap },
];

const REPAIR_TABS = [
  { label: "Electronics", nodes: ELECTRONICS_NODES },
  { label: "Appliances", nodes: APPLIANCE_NODES },
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
        <WorkflowVisualization tabs={REPAIR_TABS} label="OUR REPAIR" sub="/ MOBILE → ELECTRICAL" />
      </Reveal>
    </section>
  );
}

export function WorkflowVisualization({
  nodes = NODES,
  tabs,
  label = "IDEA TO PRODUCT",
  sub = "/ BUSINESS → GROWTH",
}: {
  nodes?: PanelNodes;
  tabs?: { label: string; nodes: PanelNodes }[];
  label?: string;
  sub?: string;
}) {
  const [localTab, setLocalTab] = useState(0);
  const ctx = useCategory();
  // On the homepage the header toggle drives the panel; elsewhere local state.
  const tab = ctx ? (ctx.category === "electronics" ? 0 : 1) : localTab;
  const setTab = ctx
    ? (i: number) => ctx.setCategory(i === 0 ? "electronics" : "appliances")
    : setLocalTab;
  const activeNodes = tabs ? tabs[tab]!.nodes : nodes;
  return (
    <div className="mt-12 w-full lg:mt-20">
      {/* head */}
      <div className="flex flex-nowrap items-center justify-between gap-3 px-6 py-5 lg:px-12">
        <div className="flex min-w-0 items-baseline gap-4">
          <span className="label-mono shrink-0 text-[#1747b8]">{label}</span>
          <span className="label-mono hidden text-[#a8b7cc] sm:inline">{sub}</span>
        </div>
        <span className="label-mono flex shrink-0 items-center gap-2 text-[#8190aa]">
          <span
            className="h-1.5 w-1.5 rounded-full bg-[#2563eb]"
            style={{ animation: "nx-pulse-dot 2.4s ease-in-out infinite" }}
          />
          {tabs ? (tab === 0 ? "ELECTRONICS" : "APPLIANCES") : "CONNECTED AT EVERY STEP"}
        </span>
      </div>

      {/* flow rail */}
      <div>
        <div className="grid grid-cols-2 gap-4 px-6 py-5 sm:gap-5 md:grid-cols-4 xl:grid-cols-8 lg:px-12">
          {activeNodes.map(({ phase: n, name: v, category: u, slug, icon: Icon }, i) => (
            <Link
              key={`${tab}-${slug}`}
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
                <div className="font-mono text-[19px] leading-[1.05] font-light tracking-[-0.02em] whitespace-nowrap text-[#08152e] sm:text-[24px] xl:text-[14px]">
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
