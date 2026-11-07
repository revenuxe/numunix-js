import { Users, CalendarDays, BriefcaseBusiness, Wrench, FileText, LayoutDashboard } from "lucide-react";

export function LogoMarquee() {
  const modules = [
    [Users, "LEAD MANAGEMENT"],
    [CalendarDays, "BOOKINGS"],
    [BriefcaseBusiness, "JOB TRACKING"],
    [Wrench, "TECHNICIAN WORKSPACE"],
    [FileText, "INVOICING"],
    [LayoutDashboard, "OPERATIONS DASHBOARD"],
  ] as const;
  const row = [...modules, ...modules];
  return (
    <section className="relative overflow-hidden border-t border-white/10 bg-[#05070c] py-12">
      <div className="shell">
      </div>
      <div className="relative mt-10 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
        <div
          className="flex w-max items-center gap-20 whitespace-nowrap"
          style={{ animation: "marquee 48s linear infinite" }}
        >
          {row.map(([Icon, title], i) => (
            <span
              key={`${title}-${i}`}
              className="inline-flex items-center gap-4 text-[clamp(1.2rem,2vw,1.8rem)] font-medium tracking-[-0.02em] text-white/30"
            >
              <Icon
                aria-hidden="true"
                className="h-[1.15em] w-[1.15em] shrink-0 text-[#8fb4e8]/60"
                strokeWidth={1.5}
              />
              {title}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

export default LogoMarquee;
