import { useRef } from "react";
import { Heading, Accent, Reveal } from "./primitives";
import { ArrowRight, ArrowUpRight, Users, CalendarDays, BriefcaseBusiness, Wrench, FileText, LayoutDashboard, UserRoundCheck, ClipboardCheck, type LucideIcon } from "lucide-react";

const STEPS = [
  ["01", "CAPTURE", "Bring each new enquiry into one shared lead list."],
  ["02", "REVIEW", "Keep the request, customer and service details together."],
  ["03", "BOOK", "Turn a confirmed request into a scheduled booking."],
  ["04", "ASSIGN", "Match the job with a technician and share the details."],
  ["05", "START", "Give the team a clear view of work in progress."],
  ["06", "UPDATE", "Record status changes as the job moves forward."],
  ["07", "COMPLETE", "Close out the job with its service record."],
  ["08", "INVOICE", "Prepare and record the invoice from the workspace."],
] as const;

export function AutomationWorkflow() {
  return (
    <section id="process" className="section-pad bg-[#f7f9fc]">
      <div className="shell">
        <Reveal delay={60}>
          <Heading tone="light" className="mt-8 max-w-[18ch]">
            From first enquiry <Accent>to invoice.</Accent>
          </Heading>
        </Reveal>
        <div className="mt-20 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map(([n, title, description], i) => (
            <Reveal key={n} delay={i * 50}>
              <a href="https://app.numunix.com" aria-label={`${title}: ${description}`} className="group relative block h-full rounded-2xl border border-[#e2e9f3] bg-white p-7 transition-all duration-250 hover:-translate-y-1 hover:border-[#3b82f6]/45 hover:shadow-[0_24px_60px_-40px_rgba(16,42,99,0.6)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2563eb] motion-reduce:transform-none motion-reduce:transition-none">
                <span className="label-mono text-[#9db4d6]">{n}</span>
                <h3 className="mt-10 text-[19px] font-light tracking-[-0.01em] text-[#08152e]">{title}</h3>
                <p className="mt-3 text-[14px] leading-relaxed text-[#5d76a3]">{description}</p>
                <ArrowUpRight size={16} aria-hidden="true" className="absolute top-7 right-7 text-[#1e4ed8]" />
                <span aria-hidden="true" className="mt-8 block font-mono text-[10px] tracking-[0.12em] text-[#1e4ed8]">OPEN WORKSPACE</span>
                {i < STEPS.length - 1 && <span className="pointer-events-none absolute top-1/2 -right-2.5 hidden h-px w-5 bg-[#cfdcee] lg:block" />}
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const MODULES: { icon: LucideIcon; title: string; description: string }[] = [
  { icon: Users, title: "Lead management", description: "Review new enquiries, capture customer details and follow each request through its next step." },
  { icon: CalendarDays, title: "Booking management", description: "Organize service requests, appointment details and upcoming visits in one place." },
  { icon: BriefcaseBusiness, title: "Job tracking", description: "See assigned work, current progress and completed jobs across the team." },
  { icon: Wrench, title: "Technician workspace", description: "Give technicians a focused view of assignments, job details and updates." },
  { icon: FileText, title: "Invoicing", description: "Prepare service invoices and keep billing records connected to the work." },
  { icon: LayoutDashboard, title: "Operations dashboard", description: "Get a useful overview of enquiries, bookings, jobs and outstanding work." },
];

export function IndustryCarousel() {
  const ref = useRef<HTMLDivElement>(null);
  const scroll = (direction: number) => ref.current?.scrollBy({ left: direction * 420, behavior: "smooth" });
  return (
    <section id="products" className="bg-[#eef3f8] py-14 sm:py-20 lg:py-[104px]">
      <div className="shell">
        <div className="grid items-end gap-8 lg:grid-cols-[1fr_auto]">
          <Reveal><Heading tone="light" className="max-w-[14ch]">One workspace <Accent>for the whole team.</Accent></Heading></Reveal>
          <Reveal delay={80}><div className="flex gap-2">{[-1, 1].map((d) => <button key={d} aria-label={d < 0 ? "Previous" : "Next"} onClick={() => scroll(d)} className="grid h-12 w-12 place-items-center rounded-xl border border-[#dbe5f2] bg-white text-[#102a63] transition-all hover:-translate-y-0.5 hover:border-[#3b82f6]/50">{d < 0 ? "←" : "→"}</button>)}</div></Reveal>
        </div>
      </div>
      <div ref={ref} className="mt-16 flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-6 lg:px-12 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {MODULES.map(({ icon: Icon, title, description }) => (
          <a href="https://app.numunix.com" key={title} className="group w-[300px] shrink-0 snap-start rounded-[24px] border border-[#dfe7f1] bg-white p-7 transition-all duration-250 hover:-translate-y-1.5 hover:border-[#3b82f6]/45 hover:shadow-[0_30px_70px_-45px_rgba(16,42,99,0.6)] sm:w-[380px]">
            <div className="relative flex h-44 items-center justify-center overflow-hidden rounded-2xl bg-mist">
              <div className="absolute inset-4 rounded-xl border border-[#dbe5f2] bg-white/75 p-4 shadow-sm"><div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-[#38bdf8]"/><span className="h-2 w-20 rounded bg-[#dbe5f2]"/></div><div className="mt-4 grid grid-cols-3 gap-2"><span className="h-12 rounded-lg border border-[#e3eaf3] bg-white"/><span className="h-12 rounded-lg border border-[#e3eaf3] bg-white"/><span className="h-12 rounded-lg border border-[#e3eaf3] bg-white"/></div><div className="mt-3 h-2 w-3/4 rounded bg-[#edf3fb]"/><div className="mt-2 h-2 w-1/2 rounded bg-[#edf3fb]"/></div><span className="relative z-10 grid h-14 w-14 place-items-center rounded-2xl border border-[#cdddf3] bg-white text-[#1747b8] shadow-md"><Icon size={25} strokeWidth={1.6}/></span></div>
            <h3 className="mt-7 text-[20px] font-light tracking-[-0.02em] text-[#08152e]">{title}</h3><p className="mt-2 text-[14px] leading-relaxed text-[#5d76a3]">{description}</p><ArrowRight size={16} className="hover-arrow mt-8 text-[#1e4ed8]"/>
          </a>
        ))}
      </div>
    </section>
  );
}

function Row({ icon: Icon, label }: { icon: LucideIcon; label: string }) {
  return <a href="https://app.numunix.com" className="group flex items-center justify-between gap-6 border-b border-[#dde5f0] px-5 py-6 transition-all duration-250 hover:rounded-2xl hover:border-transparent hover:bg-white hover:shadow-[0_18px_44px_-30px_rgba(16,42,99,0.6)] hover:ring-1 hover:ring-[#3b82f6]/35"><span className="flex items-center gap-4"><span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-[#dbe5f2] bg-[#f4f8fd] text-[#1e4ed8] transition-colors duration-250 group-hover:border-[#3b82f6]/45 group-hover:bg-[#eaf2fe]"><Icon size={20} strokeWidth={1.6}/></span><span className="text-[clamp(1.05rem,1.8vw,1.45rem)] font-light tracking-[-0.02em] text-[#102a63]">{label}</span></span><ArrowRight size={18} className="hover-arrow shrink-0 text-[#1e4ed8]"/></a>;
}

export function FeatureDirectory() {
  const rows = MODULES.map(({ icon, title }) => [icon, title] as const);
  const half = Math.ceil(rows.length / 2);
  return <section className="section-pad bg-[#eef3f8]"><div className="shell grid gap-12 lg:grid-cols-[0.35fr_1.65fr] lg:gap-20"><div className="grid gap-x-10 md:grid-cols-2"><div>{rows.slice(0, half).map(([icon, label]) => <Row key={label} icon={icon} label={label}/>)}</div><div>{rows.slice(half).map(([icon, label]) => <Row key={label} icon={icon} label={label}/>)}</div></div></div></section>;
}

const WORK_AREAS = ["Enquiries", "Bookings", "Jobs", "Technicians", "Invoices"];
const TEAM_FOCUS: { label: string; Icon: LucideIcon }[] = [
  { label: "New requests", Icon: Users },
  { label: "Upcoming visits", Icon: CalendarDays },
  { label: "Active work", Icon: BriefcaseBusiness },
  { label: "Ready to invoice", Icon: FileText },
];

export function AnalyticsDemo() {
  return <section id="analytics" className="section-pad bg-[#f7f9fc]"><div className="shell"><Reveal delay={60}><Heading tone="light" className="mt-8 max-w-[18ch]">A clear view of <Accent>the work ahead.</Accent></Heading></Reveal><Reveal delay={120}><div className="mt-16 rounded-[28px] border border-[#dfe7f1] bg-white p-6 shadow-[0_50px_140px_-80px_rgba(16,42,99,0.6)] lg:p-10"><div className="mb-5 text-[14px] text-[#8190aa]">Workspace preview · illustrative content</div><div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-5">{WORK_AREAS.map((area, i) => <div key={area} className="rounded-2xl bg-[#f1f5f9] p-5"><div className="text-[15px] text-[#5d76a3]">{area}</div><div className="mt-3 text-[20px] font-light tracking-[-0.03em] text-[#08152e]">{["Review", "Schedule", "Track", "Assign", "Record"][i]}</div></div>)}</div><div className="mt-6 grid gap-6 lg:grid-cols-[1.6fr_1fr]"><div className="rounded-2xl border border-[#e6ecf4] p-6"><div className="text-[15px] text-[#102a63]">Connected service workflow</div><div className="mt-8 grid grid-cols-4 gap-2 sm:gap-4">{["Enquiry", "Booking", "Job", "Invoice"].map((step, i) => <div key={step} className="relative rounded-xl border border-[#e6ecf4] bg-[#f8faff] px-3 py-4 text-center text-[13px] text-[#102a63] sm:px-4 sm:py-5"><span className="mx-auto mb-2 grid h-7 w-7 place-items-center rounded-full bg-[#e5efff] text-[#1747b8]">{i + 1}</span>{step}{i < 3 && <span className="absolute top-1/2 -right-2 z-10 hidden h-px w-4 bg-[#91add6] sm:block"/>}</div>)}</div><p className="mt-5 text-[13px] leading-relaxed text-[#8190aa]">An illustrative view of how work can move through the platform.</p></div><div className="rounded-2xl border border-[#e6ecf4] p-6"><div className="text-[15px] text-[#102a63]">Team focus</div><div className="mt-6 space-y-4">{TEAM_FOCUS.map(({ label, Icon }) => <div key={label} className="flex items-center gap-3 rounded-xl bg-[#f8faff] p-3"><span className="grid h-9 w-9 place-items-center rounded-lg bg-[#e8f0ff] text-[#1747b8]"><Icon size={17}/></span><span className="text-[14px] text-[#102a63]">{label}</span><span className="ml-auto text-[12px] text-[#8190aa]">View</span></div>)}</div></div></div></div></Reveal></div></section>;
}

const POSTS = [
  [Users, "Lead management", "Capture new enquiries, keep customer details close and see which requests need a response."],
  [CalendarDays, "Bookings", "Bring appointment details and customer requests into a clear scheduling workflow."],
  [ClipboardCheck, "Jobs and invoices", "Connect technician assignments, job updates and billing records in one workspace."],
] as const;

export function BlogCards() {
  return <section className="section-pad bg-[#eef3f8]"><div className="shell"><Reveal><Heading tone="light">Tools for a connected service team.</Heading></Reveal><div className="mt-16 grid gap-6 md:grid-cols-3">{POSTS.map(([Icon, title, description], i) => <Reveal key={title} delay={i * 70}><a href="https://app.numunix.com" className="group block h-full overflow-hidden rounded-[22px] border border-[#dfe7f1] bg-white transition-all duration-250 hover:-translate-y-1.5 hover:border-[#3b82f6]/40 hover:shadow-[0_30px_70px_-45px_rgba(16,42,99,0.6)]"><div className="relative flex h-56 items-center justify-center overflow-hidden bg-mist"><div className="absolute inset-6 rounded-2xl border border-[#dbe5f2] bg-white/70 shadow-sm"><div className="m-5 h-3 w-1/3 rounded bg-[#dbe5f2]"/><div className="mx-5 grid grid-cols-2 gap-3"><div className="h-24 rounded-xl border border-[#e6ecf4] bg-[#f8faff]"/><div className="h-24 rounded-xl border border-[#e6ecf4] bg-[#f8faff]"/></div></div><span className="relative z-10 grid h-16 w-16 place-items-center rounded-2xl border border-[#cdddf3] bg-white text-[#1747b8] shadow-lg"><Icon size={29} strokeWidth={1.5}/></span></div><div className="p-7"><div className="text-[13px] text-[#8190aa]">NUMUNIX WORKSPACE</div><h3 className="mt-5 text-[22px] font-light leading-snug tracking-[-0.02em] text-[#08152e]">{title}</h3><p className="mt-3 text-[14px] leading-relaxed text-[#5d76a3]">{description}</p><ArrowRight size={17} className="hover-arrow mt-8 text-[#1e4ed8]"/></div></a></Reveal>)}</div></div></section>;
}
