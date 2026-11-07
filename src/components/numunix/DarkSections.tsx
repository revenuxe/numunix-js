import { useState } from "react";
import NumunixRibbonScene from "./NumunixRibbonScene";
import { Heading, Accent, Btn, Reveal } from "./primitives";
import ServiceDemo from "./ServiceDemo";
import { ShieldCheck, Users, Activity, FileSearch } from "lucide-react";

export function AIAgentsSection() {
  return (
    <section className="grain relative overflow-hidden bg-[#05070c] py-14 sm:py-20 lg:py-[104px]">
      <div className="pointer-events-none absolute inset-0 opacity-90"><NumunixRibbonScene className="h-full w-full" ribbons={4} intensity={0.85} /></div>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(100%_70%_at_0%_50%,rgba(5,7,12,0.95),transparent_70%)]" />
      <div className="shell relative grid gap-14 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-20">
        <div>
          <Reveal delay={60}><Heading className="mt-8">A smarter way to <Accent>run service operations.</Accent></Heading></Reveal>
          <Reveal delay={120}><p className="mt-8 max-w-[50ch] text-[18px] leading-relaxed text-white/60 lg:text-[20px]">Numunix brings enquiries, bookings, technician assignments, jobs and invoices into one connected workspace. AI capabilities are planned for future development and are not available today.</p></Reveal>
          <Reveal delay={180}><div className="mt-10 flex flex-wrap gap-3"><Btn as="a" href="https://app.numunix.com">OPEN WORKSPACE</Btn><Btn as="a" href="#approach" variant="ghostDark">SEE HOW IT WORKS</Btn></div></Reveal>
        </div>
        <Reveal delay={140}><ServiceDemo slug="fault-intake" preset="workspace-overview" href="https://app.numunix.com" /></Reveal>
      </div>
    </section>
  );
}

export function DispatchSection() {
  return (
    <section className="relative overflow-hidden bg-[#07111f] py-14 sm:py-20 lg:py-[104px]">
      <div className="shell grid gap-14 lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-20">
        <div>
          <Reveal delay={60}><Heading className="mt-8">A focused workspace for <Accent>your field team.</Accent></Heading></Reveal>
          <Reveal delay={120}><p className="mt-8 max-w-[46ch] text-[18px] leading-relaxed text-white/60">Keep assignments, service details and progress updates connected, so technicians and coordinators can follow the same job record.</p></Reveal>
          <Reveal delay={160}><dl className="mt-10 grid grid-cols-2 gap-x-8 gap-y-6 border-t border-white/10 pt-8">{[["ASSIGNMENTS", "Assigned work in view"], ["JOB DETAILS", "Customer and service context"], ["PROGRESS", "Status updates in one record"], ["COMPLETION", "Close out the service job"]].map(([key, value]) => <div key={key}><dt className="label-mono text-[#8fb4e8]">{key}</dt><dd className="mt-2 text-[15px] text-white/70">{value}</dd></div>)}</dl></Reveal>
        </div>
        <Reveal delay={140}><ServiceDemo slug="fault-intake" preset="workspace-technicians" href="https://app.numunix.com" /></Reveal>
      </div>
    </section>
  );
}

const SECURITY = [
  [ShieldCheck, "CONTROLLED ACCESS", "Workspace access is managed through administrator and team sign-in."],
  [Users, "CLEAR OWNERSHIP", "Keep customer requests, bookings and assigned work connected to the team handling them."],
  [Activity, "VISIBLE PROGRESS", "Follow job status changes through the service workflow."],
  [FileSearch, "CONNECTED RECORDS", "Keep service details, job updates and invoice records together."],
] as const;

export function SecuritySection() {
  return (
    <section id="security" className="grain relative overflow-hidden bg-[#05070c] py-14 sm:py-20 lg:py-[104px]">
      <div className="pointer-events-none absolute inset-0"><NumunixRibbonScene className="h-full w-full" ribbons={5} intensity={0.8} /></div>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(110%_80%_at_20%_50%,rgba(5,7,12,0.95),transparent_72%)]" />
      <div className="shell relative grid gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div><Reveal delay={60}><Heading className="mt-8">One connected record <Accent>from start to finish.</Accent></Heading></Reveal></div>
        <div className="grid gap-10 sm:grid-cols-2">{SECURITY.map(([Icon, title, description], i) => <Reveal key={title} delay={60 + i * 60}><div><div className="flex items-center gap-2.5"><Icon size={17} className="text-[#6fb3ff]"/><h3 className="text-[19px] font-light tracking-[-0.01em] text-white">{title}</h3></div><p className="mt-3 text-[15px] leading-relaxed text-white/55">{description}</p></div></Reveal>)}</div>
      </div>
    </section>
  );
}

const MODULES = [
  ["LEADS", "Review incoming enquiries and keep each request moving toward a booking."],
  ["BOOKINGS", "Coordinate appointment details and service requests from one place."],
  ["JOB TRACKING", "Follow assignments and progress through to completed work."],
  ["INVOICING", "Prepare invoices and keep billing records tied to the service job."],
];

export function BuiltWithNumunix() {
  const [tab, setTab] = useState(0);
  return <section className="grain relative overflow-hidden bg-[#07111f] py-14 sm:py-20 lg:py-[104px]"><div className="pointer-events-none absolute inset-0 opacity-70"><NumunixRibbonScene className="h-full w-full" ribbons={3} intensity={0.6}/></div><div className="shell relative"><Reveal><Heading className="text-center">Made for connected service operations.</Heading></Reveal><Reveal delay={80}><div className="-mx-6 mt-10 overflow-x-auto px-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:flex sm:justify-center"><div className="flex w-max flex-nowrap justify-start gap-1 rounded-2xl border border-white/10 bg-white/[0.06] p-1 backdrop-blur-xl sm:mx-auto">{MODULES.map(([title], i) => <button key={title} onClick={(event) => { setTab(i); event.currentTarget.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" }); }} aria-pressed={tab === i} className={`label-mono shrink-0 snap-center rounded-xl px-3 py-3 sm:px-5 transition-colors ${tab === i ? "bg-white text-[#102a63]" : "text-white/65 hover:text-white"}`}>{title}</button>)}</div></div></Reveal><div className="mt-12 grid gap-5 md:mt-16 md:grid-cols-2">{[...MODULES.slice(tab), ...MODULES.slice(0, tab)].map(([title, description], i) => <Reveal key={title} delay={60 + i * 60}><a href="https://app.numunix.com" className="group block h-full rounded-[22px] bg-gradient-to-b from-white to-[#eef3f8] p-8 transition-all duration-250 hover:-translate-y-1 hover:shadow-[0_30px_70px_-40px_rgba(0,0,0,0.8)]"><div className="grid h-12 w-12 place-items-center rounded-xl bg-[#dbe6f8]"><span className="label-mono text-[#1747b8]">{String(i + 1).padStart(2, "0")}</span></div><h3 className="mt-8 text-[24px] font-light tracking-[-0.02em] text-[#08152e]">{title}</h3><p className="mt-3 max-w-[38ch] text-[15px] leading-relaxed text-[#5d76a3]">{description}</p><span className="label-mono mt-10 inline-flex items-center gap-2 text-[#1747b8]">OPEN WORKSPACE <span className="hover-arrow">→</span></span></a></Reveal>)}</div></div></section>;
}

export function FinalCTA() {
  return <section id="cta" className="grain relative overflow-hidden bg-[#05070c] py-14 sm:py-20 lg:py-[130px]"><div className="pointer-events-none absolute inset-0"><NumunixRibbonScene className="h-full w-full" ribbons={6}/></div><div className="pointer-events-none absolute inset-0 bg-[radial-gradient(100%_70%_at_50%_50%,rgba(5,7,12,0.82),rgba(5,7,12,0.4))]"/><div className="shell relative"><Reveal><Heading size="xl" className="max-w-[16ch]">Bring your service operation <Accent>together.</Accent></Heading></Reveal><Reveal delay={100}><p className="mt-10 max-w-[54ch] text-[18px] leading-relaxed text-white/60 lg:text-[20px]">Manage customer enquiries, bookings, technicians, jobs and invoices from one connected platform.</p></Reveal><Reveal delay={160}><div className="mt-12 flex flex-wrap gap-3"><Btn as="a" href="https://app.numunix.com">OPEN WORKSPACE</Btn><Btn as="a" href="#approach" variant="ghostDark">EXPLORE PLATFORM</Btn></div></Reveal></div></section>;
}
