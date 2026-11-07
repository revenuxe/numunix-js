import { ArrowUpRight, BriefcaseBusiness, CalendarDays, FileCheck2, FileText, LayoutDashboard, Users, Wrench, type LucideIcon } from "lucide-react";
import { Heading, Accent, Reveal } from "./primitives";

const WORKSPACE_MODULES: { slug: string; phase: string; name: string; detail: string; icon: LucideIcon }[] = [
  { slug: "leads", phase: "ENQUIRIES", name: "Leads", detail: "Capture and review", icon: Users },
  { slug: "bookings", phase: "SCHEDULING", name: "Bookings", detail: "Request and confirm", icon: CalendarDays },
  { slug: "jobs", phase: "OPERATIONS", name: "Jobs", detail: "Assign and track", icon: BriefcaseBusiness },
  { slug: "technicians", phase: "FIELD TEAM", name: "Technicians", detail: "Assign and update", icon: Wrench },
  { slug: "customers", phase: "CUSTOMERS", name: "Records", detail: "Details and history", icon: Users },
  { slug: "quotations", phase: "PLANNED", name: "Quotations", detail: "Planned capability", icon: FileCheck2 },
  { slug: "invoicing", phase: "BILLING", name: "Invoices", detail: "Prepare and record", icon: FileText },
  { slug: "dashboard", phase: "OVERVIEW", name: "Dashboard", detail: "Daily work view", icon: LayoutDashboard },
];

export function PlatformIntro() {
  return <section id="approach" className="section-pad bg-[#f1f5f9]"><div className="shell"><div className="mt-10 grid gap-12 lg:grid-cols-[1.25fr_0.75fr] lg:gap-20"><Reveal delay={60}><Heading tone="light">Every service job,<br/><Accent>one connected workspace.</Accent></Heading></Reveal><Reveal delay={140}><p className="max-w-[44ch] text-[18px] leading-relaxed text-[#5d76a3] lg:pt-6 lg:text-[20px]">Manage enquiries, bookings, customer records, technicians and invoices in one place. Quotation management is planned.</p></Reveal></div></div><Reveal delay={120}><WorkflowVisualization/></Reveal></section>;
}

export function WorkflowVisualization() {
  return <div className="mt-12 w-full lg:mt-20"><div className="flex items-center justify-between gap-4 px-6 py-5 lg:px-12"><div><p className="text-[15px] font-medium text-[#102a63]">Service workspace</p><p className="mt-1 text-[13px] text-[#8190aa]">Connected modules for the daily flow of work</p></div><span className="hidden items-center gap-2 text-[12px] text-[#8190aa] sm:flex"><span className="h-2 w-2 rounded-full bg-[#2563eb]"/>Shared workflow</span></div><div className="overflow-x-auto px-6 pb-6 [scrollbar-width:thin] [scrollbar-color:#c5d3e6_transparent] md:overflow-visible lg:px-12"><div className="flex snap-x snap-mandatory gap-4 md:grid md:grid-cols-4 md:gap-5 xl:grid-cols-8">{WORKSPACE_MODULES.map(({slug,phase,name,detail,icon:Icon},index)=><a key={slug} href={`/features/${slug}`} aria-label={`Explore ${name}: ${detail}`} className="group relative flex min-h-[220px] w-[min(78vw,17rem)] shrink-0 snap-start flex-col justify-between overflow-hidden rounded-2xl border border-[#cdddf3] bg-white px-5 py-5 shadow-[0_4px_8px_-3px_rgba(16,42,99,0.08),0_12px_24px_-12px_rgba(30,78,216,0.22)] transition-all duration-300 hover:-translate-y-1.5 hover:border-[#7ea8e8] hover:bg-[#f9fbff] hover:shadow-[0_18px_40px_-16px_rgba(30,78,216,0.35)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563eb] motion-reduce:transform-none motion-reduce:transition-none md:min-h-[230px] md:w-auto md:min-w-0"><span className="pointer-events-none absolute inset-x-0 -top-px h-px scale-x-0 bg-gradient-to-r from-transparent via-[#2563eb] to-transparent transition-transform duration-500 group-hover:scale-x-100"/><div className="flex items-center gap-2"><span className="font-mono text-[12px] text-[#b3c2d6]">{String(index+1).padStart(2,"0")}</span><span className="text-[11px] tracking-[0.08em] text-[#5d76a3]">{phase}</span></div><div className="mt-6"><h3 className="text-[22px] font-medium tracking-[-0.025em] text-[#08152e]">{name}</h3><p className="mt-2 text-[13px] text-[#1747b8]">{detail}</p></div><div className="flex items-center justify-between"><span className="grid h-10 w-10 place-items-center rounded-xl border border-[#dbe5f2] bg-[#edf3ff] text-[#1747b8] transition-all group-hover:border-[#102a63] group-hover:bg-[#102a63] group-hover:text-white"><Icon size={19} strokeWidth={1.7}/></span><span className="grid h-8 w-8 place-items-center rounded-full border border-[#dbe5f2] bg-white text-[#2563eb]"><ArrowUpRight size={15}/></span></div></a>)}</div></div><p className="px-6 text-[12px] text-[#8190aa] md:hidden">Swipe to explore the workspace</p></div>;
}

export default PlatformIntro;
