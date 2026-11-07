import { useEffect, useRef, useState } from "react";
import { Label, Reveal } from "./primitives";
import { ArrowUpRight, Users, CalendarDays, BriefcaseBusiness, Wrench, FileText, LayoutDashboard, UserRoundCheck, ClipboardCheck, type LucideIcon } from "lucide-react";

const AUDIENCES: { label: string; name: string; description: string; icon: LucideIcon; view: string; detail: string }[] = [
  { label: "OWNERS", name: "Service business owners", description: "Keep a clear view of enquiries, bookings, active jobs and invoices as the business grows.", icon: LayoutDashboard, view: "Operations overview", detail: "Enquiries · Bookings · Jobs" },
  { label: "OPERATIONS", name: "Operations managers", description: "Coordinate the daily flow of requests, scheduled work and job handovers across your team.", icon: ClipboardCheck, view: "Daily work queue", detail: "Review · Schedule · Follow up" },
  { label: "CUSTOMER TEAM", name: "Customer support teams", description: "Keep customer requests and service context together when reviewing and following up enquiries.", icon: Users, view: "Lead inbox", detail: "New · In review · Follow up" },
  { label: "SCHEDULING", name: "Booking coordinators", description: "Organize appointment details and connect confirmed bookings to the next service step.", icon: CalendarDays, view: "Booking schedule", detail: "Request · Schedule · Confirm" },
  { label: "FIELD TEAM", name: "Technicians", description: "Open assigned jobs, review customer and appointment details, then update job status and completion for the organization.", icon: Wrench, view: "Technician workspace", detail: "Assigned · In progress · Complete" },
  { label: "SERVICE DESK", name: "Service desk teams", description: "Track service jobs from assignment through progress updates and completion records.", icon: BriefcaseBusiness, view: "Job tracking", detail: "Assign · Update · Complete" },
  { label: "FINANCE", name: "Billing teams", description: "Keep service invoices connected to the completed jobs and their customer records.", icon: FileText, view: "Invoice records", detail: "Prepare · Share · Record" },
  { label: "TEAM LEADS", name: "Growing service teams", description: "Give each role a shared workflow for moving customer work forward together.", icon: UserRoundCheck, view: "Team workflow", detail: "People · Work · Updates" },
];

function WorkspaceScene({ audience }: { audience: (typeof AUDIENCES)[number] }) {
  const Icon = audience.icon;
  const isTechnician = audience.name === "Technicians";
  return <div className="repair-audience-stage"><div className="mx-auto flex h-full w-[min(82%,480px)] items-center justify-center"><div className="w-full overflow-hidden rounded-2xl border border-[#d8e2ef] bg-white shadow-[0_24px_64px_-38px_rgba(16,42,99,0.5)]"><div className="flex items-center gap-2 border-b border-[#e7edf5] px-5 py-4"><span className="grid h-8 w-8 place-items-center rounded-lg bg-[#eaf2fe] text-[#1747b8]"><Icon size={17}/></span><span className="text-[13px] font-medium text-[#102a63]">{audience.view}</span><span className="ml-auto h-2 w-12 rounded-full bg-[#e7edf5]"/></div>{isTechnician ? <div className="p-4 sm:p-5"><div className="rounded-xl border border-[#e5ebf3] bg-[#f8faff] p-4"><div className="flex items-center justify-between gap-3"><span className="text-[11px] text-[#8190aa]">Assigned service job</span><span className="rounded-full bg-[#eaf2fe] px-2.5 py-1 font-mono text-[9px] text-[#1747b8]">IN PROGRESS</span></div><div className="mt-4 text-[15px] font-medium text-[#102a63]">Job and customer details</div><div className="mt-3 grid grid-cols-2 gap-2"><div className="rounded-lg bg-white p-3"><span className="block text-[10px] text-[#8190aa]">Appointment</span><span className="mt-1 block text-[11px] text-[#5d76a3]">Schedule and visit notes</span></div><div className="rounded-lg bg-white p-3"><span className="block text-[10px] text-[#8190aa]">Service record</span><span className="mt-1 block text-[11px] text-[#5d76a3]">Customer and job context</span></div></div><div className="mt-3 flex items-center justify-between rounded-lg bg-[#102a63] px-3 py-2.5 text-[10px] font-medium text-white"><span>Update job status</span><ArrowUpRight size={13}/></div></div><div className="mt-3 flex flex-wrap items-center justify-between gap-2 px-1 text-[10px] text-[#5d76a3]"><span>Assigned <span className="px-1 text-[#a5b5cc]">›</span> In progress <span className="px-1 text-[#a5b5cc]">›</span> Complete</span><span className="h-1.5 w-10 rounded-full bg-[#38bdf8]"/></div></div> : <><div className="grid grid-cols-3 gap-3 p-4 sm:p-5">{["Open", "In progress", "Ready"].map((status, i) => <div key={status} className="min-h-[72px] rounded-xl border border-[#e5ebf3] bg-[#f8faff] p-3"><div className="text-[10px] text-[#8190aa]">{status}</div><div className="mt-3 h-2 rounded-full bg-[#dbe7f7]"/><div className="mt-2 h-2 w-2/3 rounded-full bg-[#e5edf8]"/><span className={`mt-3 block h-1 w-8 rounded-full ${i === 1 ? "bg-[#38bdf8]" : "bg-[#c5d7f2]"}`}/></div>)}</div><div className="mx-4 mb-4 rounded-lg bg-[#f4f8fd] px-4 py-3 text-[11px] text-[#5d76a3]">{audience.detail}</div></>}</div></div></div>;
}

export default function IndustriesSection() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      let best = 0;
      let distance = Infinity;
      refs.current.forEach((el, index) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const next = Math.abs(rect.top + rect.height / 2 - window.innerHeight * 0.45);
        if (next < distance) { best = index; distance = next; }
      });
      setActive(best);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); if (raf) cancelAnimationFrame(raf); };
  }, []);

  return <section id="industries" aria-label="Who uses Numunix" className="bg-[#f7f9fc] py-16 sm:py-20 lg:py-[104px]"><div className="shell"><div className="grid gap-14 lg:grid-cols-[0.82fr_1.18fr] lg:gap-24"><div><div className="lg:sticky lg:top-32"><Label tone="light">BUILT FOR SERVICE TEAMS</Label><p className="mt-6 max-w-[42ch] text-[15px] leading-[1.65] text-[#5d76a3]">Organization teams coordinate the workload. Technicians get assigned jobs, keep status current and record completion in the same service workflow.</p><div className="mt-8 hidden lg:block">{AUDIENCES.map((audience, index) => <button key={audience.label} type="button" aria-controls={`industry-panel-${index}`} aria-current={active === index ? "true" : undefined} onClick={() => refs.current[index]?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth", block: "center" })} className="block w-full rounded-sm text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2459e0]"><span className={`block py-[6px] text-[clamp(1.6rem,2.5vw,2.45rem)] font-light leading-[1.22] tracking-[-0.035em] uppercase transition-colors duration-500 ${active === index ? "text-[#0b1b38]" : "text-[#c2cfe2]"}`}>{audience.label}</span></button>)}</div></div></div><div className="min-w-0 space-y-24 lg:space-y-[170px]">{AUDIENCES.map((audience, index) => <div key={audience.name} id={`industry-panel-${index}`} ref={el => { refs.current[index] = el; }}><Reveal><div className="mb-4 flex items-center justify-between gap-4 lg:hidden"><span className="label-mono text-[#1747b8]">{audience.label}</span><span className="label-mono text-[#8190aa]">{String(index + 1).padStart(2, "0")} / 08</span></div><a href="https://app.numunix.com" aria-label={`Open workspace for ${audience.name}`} className="block rounded-[24px] transition-transform hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2459e0] motion-reduce:transform-none"><div className="overflow-hidden rounded-[24px] border border-border bg-card text-card-foreground"><div className="repair-audience-heading"><div><span className="label-mono text-blue">{audience.label} / SERVICE WORKSPACE</span><h4>{audience.view}</h4></div><span className="text-mutedtext text-[28px] font-light">{String(index + 1).padStart(2, "0")}</span></div><WorkspaceScene audience={audience}/><div className="repair-audience-footer"><span>{audience.detail}</span><span>Illustrative workspace</span></div></div></a><h3 className="mt-8 max-w-[620px] text-[1.3rem] font-normal leading-[1.28] tracking-[-0.02em] text-[#0b1b38] lg:mt-10 lg:text-[clamp(1.35rem,1.9vw,1.75rem)]">{audience.name}</h3><p className="mt-3 max-w-[560px] text-[15px] leading-[1.65] text-[#5d76a3] lg:mt-4 lg:text-[17px]">{audience.description}</p><a href="https://app.numunix.com" className="mt-5 inline-flex items-center gap-2 text-sm text-[#1e4ed8]">Open workspace <ArrowUpRight size={16}/></a></Reveal></div>)}</div></div></div></section>;
}
