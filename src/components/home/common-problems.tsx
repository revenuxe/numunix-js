import Link from "next/link";
import Image from "next/image";
import { Laptop, Camera, Network, BadgeCheck, ArrowUpRight } from "lucide-react";
import teamImg from "@/assets/team-it.webp";
import svcLaptop from "@/assets/service-laptop.webp";

function ProblemCard({
  number,
  Icon,
  title,
  desc,
  bullets,
  highlighted = false,
  featured = false,
  href = "#book",
}: {
  number: string;
  Icon: typeof Laptop;
  title: string;
  desc: string;
  bullets: string[];
  highlighted?: boolean;
  featured?: boolean;
  href?: string;
}) {
  const dark = highlighted || featured;
  return (
    <Link
      href={href}
      className={`group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] p-6 shadow-card transition duration-300 hover:-translate-y-1 md:p-8 ${
        highlighted
          ? "bg-brand text-brand-foreground ring-1 ring-brand shadow-brand"
          : featured
            ? "bg-ink text-white ring-1 ring-ink"
            : "bg-white text-ink ring-1 ring-border hover:border-brand hover:ring-brand/60"
      }`}
    >
      <div className="absolute right-6 top-5 text-xs font-bold tracking-[0.2em] opacity-40 md:right-8 md:top-7">
        {number}
      </div>
      <div className="flex items-start justify-between">
        <span
          className={`grid h-12 w-12 place-items-center rounded-2xl ${
            dark ? "bg-white/15 text-white" : "bg-brand/10 text-brand"
          } transition group-hover:scale-105`}
        >
          <Icon className="h-5 w-5" />
        </span>
        <span
          className={`grid h-9 w-9 place-items-center rounded-full transition ${
            dark
              ? "bg-white/15 text-white"
              : "bg-secondary text-ink group-hover:bg-ink group-hover:text-white"
          }`}
        >
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </div>
      <h3 className="mt-6 text-2xl font-bold">{title}</h3>
      <p className={`mt-3 text-sm leading-6 ${dark ? "text-white/80" : "text-muted-foreground"}`}>
        {desc}
      </p>
      <ul className={`mt-6 grid gap-2 text-sm ${dark ? "text-white/95" : "text-ink/80"}`}>
        {bullets.map((b) => (
          <li key={b} className="flex items-center gap-2">
            <BadgeCheck className={`h-4 w-4 shrink-0 ${dark ? "text-white" : "text-brand"}`} />
            {b}
          </li>
        ))}
      </ul>
    </Link>
  );
}

export function CommonProblems() {
  return (
    <section id="services" className="relative bg-white px-4 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-4xl font-extrabold tracking-tight text-ink sm:text-5xl md:text-6xl">
          We Fix the Most <span className="text-brand">Common IT</span> Problems
        </h2>
        <p className="mt-5 text-muted-foreground">
          We diagnose and resolve the everyday issues that slow your business down — quickly,
          professionally and with certified engineers.
        </p>
      </div>

      <div className="relative mx-auto mt-14 max-w-6xl sm:mt-16">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-0 hidden -translate-x-1/2 lg:block"
        >
          <div className="overflow-hidden rounded-[2rem] shadow-card ring-1 ring-border rotate-[-3deg]">
            <Image src={teamImg} alt="" className="h-[440px] w-[340px] object-cover" />
          </div>
        </div>

        <div className="relative grid gap-5 md:gap-6 lg:grid-cols-3 lg:gap-8">
          <div className="relative pt-24 lg:pt-0">
            <div
              aria-hidden
              className="absolute inset-x-5 top-0 h-40 overflow-hidden rounded-[1.75rem] shadow-card ring-1 ring-border lg:hidden"
            >
              <Image src={svcLaptop} alt="" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-brand/80 via-brand/10 to-transparent" />
            </div>
            <div className="relative z-10">
              <ProblemCard
                number="01"
                Icon={Laptop}
                title="Laptop Repair"
                desc="If your laptop keeps freezing or won't power on, our engineers diagnose it fast and get it running."
                bullets={[
                  "Won't turn on or boot",
                  "Overheating or fan noise",
                  "Slow performance",
                  "Broken screen or keyboard",
                ]}
                highlighted
                href="/services/laptop-repair"
              />
            </div>
          </div>
          <div className="hidden lg:block" aria-hidden />
          <ProblemCard
            number="02"
            Icon={Camera}
            title="CCTV & Security"
            desc="We install and service CCTV systems for homes and businesses with clear footage and remote access."
            bullets={[
              "Camera not recording",
              "Blurry or offline feeds",
              "DVR / NVR issues",
              "Remote mobile access",
            ]}
            href="/services/cctv-installation"
          />

          <div className="relative pt-24 lg:col-span-3 lg:mx-auto lg:-mt-24 lg:w-[380px] lg:rotate-[2deg] lg:pt-0">
            <div
              aria-hidden
              className="absolute inset-x-5 top-0 h-40 overflow-hidden rounded-[1.75rem] shadow-card ring-1 ring-border lg:hidden"
            >
              <Image src={teamImg} alt="" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent" />
            </div>
            <div className="relative z-10">
              <ProblemCard
                number="03"
                Icon={Network}
                title="Networking"
                desc="We design and troubleshoot business networks — Wi-Fi, LAN, routers and firewalls — for stable, secure connectivity."
                bullets={[
                  "Slow or dropping Wi-Fi",
                  "Router & firewall setup",
                  "Structured LAN cabling",
                  "VPN & remote access",
                ]}
                featured
                href="/services/networking"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
