import Link from "next/link";
import {
  Laptop,
  Monitor,
  Camera,
  Network,
  Printer,
  Briefcase,
  HardDrive,
  Cpu,
  ArrowUpRight,
  ArrowRight,
} from "lucide-react";

const ITEMS = [
  { title: "Laptop Repair", slug: "laptop-repair", Icon: Laptop },
  { title: "Desktop Repair", slug: "desktop-repair", Icon: Monitor },
  { title: "CCTV Installation", slug: "cctv-installation", Icon: Camera },
  { title: "Networking", slug: "networking", Icon: Network },
  { title: "Printer Repair", slug: "printer-repair", Icon: Printer },
  { title: "Business AMC", slug: "business-amc", Icon: Briefcase },
  { title: "Data Recovery", slug: "data-recovery", Icon: HardDrive },
  { title: "Hardware Upgrades", slug: "hardware-upgrades", Icon: Cpu },
];

export function ServicesGrid() {
  return (
    <section className="bg-secondary/40 px-4 py-24 md:px-8 md:py-28">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
          Everything IT, <span className="text-brand">One Team</span>
        </h2>
        <p className="mt-4 text-muted-foreground">
          From single-laptop fixes to complete business IT — we cover every layer so your team stays
          productive.
        </p>
      </div>
      <div className="mx-auto mt-14 grid max-w-6xl grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6 lg:grid-cols-4">
        {ITEMS.map(({ title, slug, Icon }, index) => (
          <Link
            key={title}
            href={`/services/${slug}`}
            className="group relative flex min-h-[236px] flex-col overflow-hidden rounded-[1.75rem] bg-white p-5 ring-1 ring-border shadow-soft transition duration-300 hover:-translate-y-1 hover:border-brand/50 hover:shadow-card md:min-h-[260px] md:p-6"
          >
            <span
              aria-hidden
              className="absolute -right-9 -top-9 h-28 w-28 rounded-full bg-brand/[0.07] transition duration-500 group-hover:scale-150 group-hover:bg-brand/[0.12]"
            />
            <div className="relative flex items-start justify-between">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand/10 text-brand transition duration-300 group-hover:scale-105 group-hover:bg-brand group-hover:text-brand-foreground">
                <Icon className="h-5 w-5" />
              </span>
              <span className="flex items-center gap-1 text-[10px] font-bold tracking-[0.16em] text-muted-foreground">
                0{index + 1}
                <ArrowUpRight className="h-4 w-4 text-brand transition duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </div>
            <div className="relative mt-auto">
              <h3 className="text-base font-bold text-ink md:text-lg">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Expert diagnostics, genuine parts and fast turnaround.
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-brand opacity-80 transition group-hover:opacity-100">
                Explore service <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
