"use client";
import { Label, Heading, Accent, Reveal } from "./primitives";
import { REPAIR_PAGES, repairPageHref } from "@/content/repair-services";
import { HOMEPAGE_REPAIR } from "@/content/homepage-repairs";
import { useCategory } from "./category";
import { NODE_VIZ } from "./nodeviz";
import Link from "next/link";
import { resolveHref } from "@/lib/route-href";
import {
  ArrowUpRight,
  Smartphone,
  Laptop,
  Cctv,
  Tv,
  Tablet,
  HardDrive,
  Gamepad2,
  Monitor,
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

function SingleLineCardLabel({ text }: { text: string }) {
  return (
    <div
      data-card-label
      className="@container mt-3 min-w-0 whitespace-nowrap font-mono leading-[1.4] text-[#5d76a3]"
    >
      <span
        className="inline-block whitespace-nowrap tracking-[0.04em]"
        style={{ fontSize: `min(11px, calc((100cqw - 2px) / ${text.length * 0.66}))` }}
        title={text}
      >
        {text}
      </span>
    </div>
  );
}

type RepairNode = { slug: string; phase: string; name: string; category: string; icon: LucideIcon };

// Homepage panel shows the repair services we cover, switchable by category.
const ELECTRONICS_NODES: RepairNode[] = [
  {
    slug: "mobile-repair",
    phase: "REPAIR",
    name: "Mobile",
    category: "SCREENS · BATTERIES",
    icon: Smartphone,
  },
  {
    slug: "laptop-repair",
    phase: "REPAIR",
    name: "Laptop",
    category: "BOARDS · UPGRADES",
    icon: Laptop,
  },
  {
    slug: "cctv-service",
    phase: "INSTALL",
    name: "CCTV",
    category: "SETUP · MAINTENANCE",
    icon: Cctv,
  },
  {
    slug: "tv-audio-repair",
    phase: "REPAIR",
    name: "TV & Audio",
    category: "PANELS · SOUND",
    icon: Tv,
  },
  {
    slug: "tablet-repair",
    phase: "REPAIR",
    name: "Tablet",
    category: "IPAD · ANDROID",
    icon: Tablet,
  },
  {
    slug: "data-recovery",
    phase: "RECOVERY",
    name: "Data",
    category: "DRIVES · PHONES",
    icon: HardDrive,
  },
  {
    slug: "console-repair",
    phase: "REPAIR",
    name: "Console",
    category: "PS · XBOX",
    icon: Gamepad2,
  },
  {
    slug: "desktop-repair",
    phase: "REPAIR",
    name: "Desktop",
    category: "TOWERS · ALL-IN-ONES",
    icon: Monitor,
  },
];

const APPLIANCE_NODES: RepairNode[] = [
  {
    slug: "washing-machine-repair",
    phase: "REPAIR",
    name: "Washing",
    category: "DRUMS · MOTORS",
    icon: WashingMachine,
  },
  { slug: "ac-repair", phase: "SERVICE", name: "AC", category: "GAS · COOLING", icon: AirVent },
  {
    slug: "refrigerator-repair",
    phase: "REPAIR",
    name: "Fridge",
    category: "COOLING · GAS",
    icon: Refrigerator,
  },
  {
    slug: "microwave-repair",
    phase: "REPAIR",
    name: "Microwave",
    category: "OVENS · CHIMNEY",
    icon: Microwave,
  },
  {
    slug: "water-purifier-service",
    phase: "SERVICE",
    name: "Purifier",
    category: "RO · FILTERS",
    icon: Droplets,
  },
  {
    slug: "inverter-ups-repair",
    phase: "REPAIR",
    name: "Inverter",
    category: "UPS · BATTERIES",
    icon: BatteryCharging,
  },
  {
    slug: "fan-light-repair",
    phase: "WORK",
    name: "Fan & Light",
    category: "FITTING · REPAIR",
    icon: Fan,
  },
  {
    slug: "electrical-service",
    phase: "WORK",
    name: "Electrical",
    category: "WIRING · FITTINGS",
    icon: Zap,
  },
];

const REPAIR_TABS = [
  { label: "Electronics", nodes: ELECTRONICS_NODES },
  { label: "Appliances", nodes: APPLIANCE_NODES },
];

function repairNodeHref(slug: string, category: "electronics" | "appliances") {
  const service = REPAIR_PAGES.find((item) => item.slug === slug && item.category === category);
  if (!service) throw new Error("Repair card is missing its catalogue destination: " + slug);
  return repairPageHref(service);
}

type PanelNodes = {
  slug: string;
  phase: string;
  name: string;
  category: string;
  icon?: LucideIcon;
}[];

function RepairCategoryCard({
  name,
  phase,
  detail,
  slug,
  Icon,
  index,
  category,
}: {
  name: string;
  phase: string;
  detail: string;
  slug: string;
  Icon: LucideIcon | undefined;
  index: number;
  category: "electronics" | "appliances";
}) {
  return (
    <Link
      href={repairNodeHref(slug, category)}
      aria-label={`${phase}: ${name}, explore ${detail.toLowerCase()}`}
      className="group relative flex min-h-[232px] min-w-0 flex-col overflow-hidden rounded-[22px] border border-[#d5e1f1] bg-white px-4 py-4 shadow-[0_3px_12px_rgba(16,42,99,0.04)] transition duration-300 hover:-translate-y-1 hover:border-[#84aafa] hover:shadow-[0_12px_30px_-12px_rgba(37,99,235,0.24)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary motion-reduce:transform-none motion-reduce:transition-none sm:min-h-[272px] sm:px-5 sm:py-5"
    >
      <div className="flex min-w-0 items-center justify-between gap-1">
        <span className="flex min-w-0 items-center gap-1.5 whitespace-nowrap font-mono text-[8px] tracking-[0.06em] text-[#8394ae] min-[375px]:text-[9px] sm:gap-2 sm:text-[10px]">
          <span className="text-[#a8b7cc]">{String(index + 1).padStart(2, "0")}</span>
          {phase}
        </span>
        <span
          aria-hidden="true"
          className="grid size-6 shrink-0 place-items-center rounded-full border border-[#e1e9f5] bg-[#f8faff] text-[#6685b5] transition group-hover:border-primary group-hover:bg-primary group-hover:text-white sm:size-7"
        >
          <ArrowUpRight size={13} />
        </span>
      </div>
      <div className="flex flex-1 items-center justify-center py-5 sm:py-6">
        <span className="grid size-16 place-items-center rounded-[18px] border border-[#d8e5fb] bg-gradient-to-br from-[#f4f8ff] to-[#e8f0ff] text-[#265bd5] shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] transition duration-300 group-hover:border-[#2864e8] group-hover:from-[#2864e8] group-hover:to-[#1747b8] group-hover:text-white motion-reduce:transition-none sm:size-20 sm:rounded-[22px]">
          {Icon && <Icon aria-hidden="true" strokeWidth={1.5} className="size-8 sm:size-10" />}
        </span>
      </div>
      <div className="min-w-0 border-t border-[#e7edf6] pt-4 text-center sm:pt-5">
        <h3 className="whitespace-nowrap text-base font-medium leading-tight tracking-[-0.025em] text-[#102a3d] sm:text-xl lg:text-2xl">
          {name}
        </h3>
        <SingleLineCardLabel text={detail} />
      </div>
    </Link>
  );
}

export function PlatformIntro() {
  const category = useCategory()?.category ?? "electronics";
  return (
    <section id="approach" className="section-pad bg-[#f1f5f9]">
      <div className="shell">
        <Reveal>
          <Label tone="light">WHAT WE FIX</Label>
        </Reveal>
        <div className="mt-10 grid gap-12 lg:grid-cols-[1.25fr_0.75fr] lg:gap-20">
          <Reveal delay={60}>
            <Heading tone="light">
              {category === "appliances" ? "Every appliance," : "Every device,"}
              <br />
              <Accent>one workshop.</Accent>
            </Heading>
          </Reveal>
          <Reveal delay={140}>
            <p className="max-w-[44ch] text-[18px] leading-relaxed text-[#5d76a3] lg:pt-6 lg:text-[20px]">
              {HOMEPAGE_REPAIR[category].overview}
            </p>
          </Reveal>
        </div>
      </div>
      <Reveal delay={120}>
        <WorkflowVisualization
          tabs={REPAIR_TABS}
          label="OUR REPAIR"
          sub={category === "appliances" ? "/ WASHING → ELECTRICAL" : "/ MOBILE → DESKTOP"}
        />
      </Reveal>
    </section>
  );
}

export function WorkflowVisualization({
  nodes = NODES,
  tabs,
  label = "REPAIR PROCESS",
  sub = "/ INTAKE → AFTERCARE",
}: {
  nodes?: PanelNodes;
  tabs?: { label: string; nodes: PanelNodes }[];
  label?: string;
  sub?: string;
}) {
  const ctx = useCategory();
  // The header toggle drives the panel on the homepage.
  const tab = ctx?.category === "appliances" ? 1 : 0;
  const activeNodes = tabs ? (tabs[tab]?.nodes ?? nodes) : nodes;
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
        <div
          className={`grid grid-cols-2 gap-4 px-6 py-5 sm:gap-5 md:grid-cols-4 ${tabs ? "auto-rows-fr" : ""} ${tabs ? "" : "xl:grid-cols-8"} lg:px-12`}
        >
          {activeNodes.map(({ phase: n, name: v, category: u, slug, icon: Icon }, i) =>
            tabs ? (
              <RepairCategoryCard
                key={`${tab}-${slug}`}
                name={v}
                phase={n}
                detail={u}
                slug={slug}
                Icon={Icon}
                index={i}
                category={tab === 0 ? "electronics" : "appliances"}
              />
            ) : (
              <Link
                key={`${tab}-${slug}`}
                href={
                  tabs
                    ? repairNodeHref(slug, tab === 0 ? "electronics" : "appliances")
                    : resolveHref("/repair-process/$slug", { slug })
                }

                aria-label={`${n}: ${v}, explore ${u.toLowerCase()}`}
                className={`group relative ${tabs ? "grid min-h-[180px] grid-cols-[minmax(0,1fr)] grid-rows-[auto_1fr_auto] sm:min-h-[200px]" : "flex flex-col justify-between"} min-w-0 cursor-pointer overflow-hidden rounded-2xl border border-[#cdddf3] bg-white px-4 py-5 shadow-[0_4px_8px_-3px_rgba(16,42,99,0.08),0_12px_24px_-12px_rgba(30,78,216,0.22)] transition-all duration-300 hover:-translate-y-1.5 hover:border-[#7ea8e8] hover:bg-[#f5f8fd] hover:shadow-[0_18px_40px_-16px_rgba(30,78,216,0.35)] active:translate-y-0 active:scale-[0.98] active:shadow-[0_6px_16px_-10px_rgba(30,78,216,0.3)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563eb] motion-reduce:transform-none motion-reduce:transition-none sm:px-5 sm:py-6 coarse:border-[#c3d6f2] coarse:bg-[#fbfdff] coarse:shadow-[0_10px_24px_-14px_rgba(30,78,216,0.4)]`}
              >
                <span className="pointer-events-none absolute inset-x-0 -top-px h-px scale-x-0 bg-gradient-to-r from-transparent via-[#2563eb] to-transparent transition-transform duration-500 group-hover:scale-x-100" />
                <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_0%,rgba(37,99,235,0.08),transparent_60%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <div className="flex items-center gap-2">
                  <span className="label-mono text-[#b3c2d6]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={`text-[12px] tracking-[0.04em] text-[#5d76a3] sm:text-[12.5px] ${tabs ? "" : "xl:text-[11px]"}`}
                  >
                    {n}
                  </span>
                </div>

                <div className="mt-5 min-w-0">
                  <div
                    className={`font-mono leading-[1.05] font-light tracking-[-0.02em] text-[#08152e] sm:text-[24px] ${tabs ? "min-h-[2.1em] break-words whitespace-normal text-[clamp(0.875rem,5vw,1.1875rem)] md:min-h-0 md:whitespace-nowrap md:text-[clamp(0.875rem,1.25vw,1.5rem)]" : "text-[19px] whitespace-nowrap xl:text-[14px]"}`}
                  >
                    {v}
                  </div>
                  {tabs ? (
                    <SingleLineCardLabel text={u} />
                  ) : (
                    <div className="label-mono mt-2 truncate text-[#1747b8]">{u}</div>
                  )}
                </div>

                <div className="mt-4 flex items-center justify-between gap-2 opacity-90 transition-opacity duration-300 group-hover:opacity-100">
                  {Icon ? (
                    <span className="grid h-9 w-9 place-items-center rounded-lg border border-[#102a63] bg-[#102a63] text-white shadow-[0_4px_10px_-4px_rgba(16,42,99,0.4)] transition-all duration-300 group-hover:scale-110 group-hover:border-[#1e4ed8] group-hover:bg-[#1e4ed8] group-hover:shadow-[0_6px_14px_-6px_rgba(37,99,235,0.6)] motion-reduce:transform-none">
                      <Icon size={18} strokeWidth={1.6} aria-hidden="true" />
                    </span>
                  ) : (
                    (() => {
                      const V = NODE_VIZ[i];
                      return V ? <V /> : null;
                    })()
                  )}
                </div>
                <span
                  aria-hidden="true"
                  className="absolute right-2 top-2 grid h-6 w-6 place-items-center rounded-full border border-[#dbe5f2] bg-[#edf3ff] text-[#2563eb] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:border-[#2563eb] group-hover:bg-[#2563eb] group-hover:text-white group-focus-visible:border-[#2563eb] group-focus-visible:bg-[#2563eb] group-focus-visible:text-white motion-reduce:transform-none"
                >
                  <ArrowUpRight size={14} />
                </span>
              </Link>
            ),
          )}
        </div>
      </div>
    </div>
  );
}

export default PlatformIntro;
