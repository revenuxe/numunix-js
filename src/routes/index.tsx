import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowUpRight,
  ArrowRight,
  Laptop,
  Monitor,
  Camera,
  Network,
  Printer,
  Briefcase,
  HardDrive,
  Cpu,
  ShieldCheck,
  Zap,
  BadgeCheck,
  Wallet,
  Headset,
  Wrench,
  CalendarClock,
  Menu,
  X,
  Plus,
  Minus,
  Facebook,
  Instagram,
  Youtube,
  Twitter,
} from "lucide-react";

import logoAsset from "@/assets/numunix-logo.asset.json";
import heroImg from "@/assets/hero-technician.webp";

import svcLaptop from "@/assets/service-laptop.webp";
import svcDesktop from "@/assets/service-desktop.webp";
import svcCctv from "@/assets/service-cctv.webp";
import svcBusiness from "@/assets/service-business.webp";
import whyImg from "@/assets/why-choose.webp";
import resSlow from "@/assets/res-slow-laptop.webp";
import resBsod from "@/assets/res-bsod.webp";
import resCctv from "@/assets/res-cctv.webp";
import findBanner from "@/assets/find-banner.webp";

export const Route = createFileRoute("/")({
  component: LandingPage,
  head: () => ({
    meta: [
      { title: "Numunix — Reliable IT Support & Hardware Services" },
      {
        name: "description",
        content:
          "Laptop repair, desktop repair, CCTV installation, networking, AMC and business IT support by Numunix certified engineers. We Keep IT Running.",
      },
    ],
  }),
});

const LOGO = logoAsset.url;

function LogoMark({ className = "h-8" }: { className?: string }) {
  return (
    <img
      src={LOGO}
      alt="Numunix — We Keep IT Running"
      className={className}
      width={200}
      height={50}
    />
  );
}

/* ---------- NAV ---------- */
function Nav() {
  const [open, setOpen] = useState(false);
  const links = [
    { label: "Services", href: "#services" },
    { label: "Business", href: "#showcase" },
    { label: "Why Us", href: "#why" },
    { label: "Resources", href: "#resources" },
    { label: "FAQ", href: "#faq" },
  ];
  return (
    <header className="absolute inset-x-0 top-0 z-30">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-5 md:px-8">
        <div className="flex items-center gap-3 rounded-full bg-white/95 px-4 py-2 shadow-soft backdrop-blur">
          <LogoMark className="h-7 md:h-8" />
        </div>

        <nav className="hidden items-center gap-1 rounded-full bg-white/10 px-2 py-2 backdrop-blur-md ring-1 ring-white/20 lg:flex">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-white/90 transition hover:bg-white/15 hover:text-white"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:block">
          <a
            href="#book"
            className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-ink shadow-soft transition hover:bg-white/90"
          >
            Book a Service
          </a>
        </div>

        <button
          onClick={() => setOpen(true)}
          className="grid h-11 w-11 place-items-center rounded-full bg-white/95 text-ink shadow-soft lg:hidden"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 bg-ink/95 backdrop-blur-xl lg:hidden">
          <div className="flex items-center justify-between px-4 py-5">
            <LogoMark className="h-7 invert" />
            <button
              onClick={() => setOpen(false)}
              className="grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="flex flex-col gap-2 px-6 py-8">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-2xl px-4 py-4 text-2xl font-semibold text-white hover:bg-white/10"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#book"
              onClick={() => setOpen(false)}
              className="mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-brand px-5 py-4 text-base font-semibold text-brand-foreground"
            >
              Book a Service
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

/* ---------- HERO ---------- */
function Hero() {
  const floating = [
    { label: "Laptop Repair", Icon: Laptop },
    { label: "Desktop Repair", Icon: Monitor },
    { label: "CCTV", Icon: Camera },
    { label: "Networking", Icon: Network },
    { label: "AMC", Icon: Briefcase },
  ];
  return (
    <section className="relative overflow-hidden bg-ink text-white">
      <img
        src={heroImg}
        alt="Numunix engineer repairing a laptop"
        width={1400}
        height={1200}
        className="absolute inset-0 h-full w-full object-cover object-center opacity-70"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />

      <Nav />

      <div className="relative mx-auto max-w-7xl px-4 pt-24 pb-32 md:px-8 md:pt-40 md:pb-40 lg:pt-52 lg:pb-52">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium ring-1 ring-white/20 backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-brand" />
            We Keep IT Running
          </span>
          <h1 className="mt-5 text-[2.25rem] font-extrabold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            Reliable IT Support
            <br className="hidden sm:block" />{" "}
            <span className="text-brand">& Hardware</span> Services
          </h1>
          <p className="mt-5 max-w-xl text-sm text-white/80 sm:mt-6 sm:text-lg">
            Numunix provides reliable onsite and business IT support with
            certified technicians, transparent pricing and fast turnaround —
            laptop repair, CCTV, networking, AMC and more.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3 sm:mt-8">
            <a
              href="#book"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-ink shadow-soft transition hover:bg-white/90"
            >
              Book Service
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#book"
              className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/10"
            >
              Get Free Consultation
            </a>
          </div>

          {/* Floating service chips — inline on mobile, absolute on desktop */}
          <div className="mt-8 flex flex-wrap gap-2 sm:mt-10 lg:absolute lg:right-12 lg:bottom-24 lg:mt-0 lg:max-w-md lg:justify-end">
            {floating.map(({ label, Icon }) => (
              <div
                key={label}
                className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 text-xs font-medium text-white ring-1 ring-white/20 backdrop-blur-md"
              >
                <span className="grid h-6 w-6 place-items-center rounded-full bg-brand text-brand-foreground">
                  <Icon className="h-3.5 w-3.5" />
                </span>
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}


/* ---------- COMMON PROBLEMS (matches reference layout with 3 cards + center) ---------- */
function CommonProblems() {
  return (
    <section id="services" className="relative bg-white px-4 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-4xl font-extrabold tracking-tight text-ink sm:text-5xl md:text-6xl">
          We Fix the Most <span className="text-brand">Common IT</span> Problems
        </h2>
        <p className="mt-5 text-muted-foreground">
          We diagnose and resolve the everyday issues that slow your business
          down — quickly, professionally and with certified engineers.
        </p>
      </div>

      <div className="relative mx-auto mt-14 grid max-w-6xl gap-5 sm:mt-16 md:gap-6 lg:grid-cols-3">
        <ProblemCard
          Icon={Laptop}
          title="Laptop Repair"
          desc="If your laptop keeps freezing or won't power on, our engineers diagnose it fast and get it running."
          bullets={[
            "Won't turn on or boot",
            "Overheating or fan noise",
            "Slow performance",
            "Broken screen or keyboard",
          ]}
        />
        <ProblemCard
          Icon={Network}
          title="Networking"
          desc="We design and troubleshoot business networks — Wi-Fi, LAN, routers and firewalls — for stable, secure connectivity."
          bullets={[
            "Slow or dropping Wi-Fi",
            "Router & firewall setup",
            "Structured LAN cabling",
            "VPN & remote access",
          ]}
          highlighted
        />
        <ProblemCard
          Icon={Camera}
          title="CCTV & Security"
          desc="We install and service CCTV systems for homes and businesses with clear footage and remote access."
          bullets={[
            "Camera not recording",
            "Blurry or offline feeds",
            "DVR / NVR issues",
            "Remote mobile access",
          ]}
        />
      </div>
    </section>
  );
}

function ProblemCard({
  Icon,
  title,
  desc,
  bullets,
  highlighted = false,
}: {
  Icon: typeof Laptop;
  title: string;
  desc: string;
  bullets: string[];
  highlighted?: boolean;
}) {
  return (
    <a
      href="#book"
      className={`group relative flex h-full flex-col rounded-3xl p-7 md:p-8 transition duration-300 ${
        highlighted
          ? "bg-brand text-brand-foreground ring-1 ring-brand shadow-brand hover:-translate-y-1"
          : "bg-white text-ink ring-1 ring-border hover:-translate-y-1 hover:border-brand hover:ring-brand/60 hover:shadow-card"
      }`}
    >
      <div className="flex items-start justify-between">
        <span
          className={`grid h-12 w-12 place-items-center rounded-2xl ${
            highlighted
              ? "bg-white/15 text-white"
              : "bg-brand/10 text-brand group-hover:bg-brand group-hover:text-brand-foreground"
          } transition`}
        >
          <Icon className="h-5 w-5" />
        </span>
        <span
          className={`grid h-9 w-9 place-items-center rounded-full transition ${
            highlighted
              ? "bg-white/15 text-white"
              : "bg-secondary text-ink group-hover:bg-ink group-hover:text-white"
          }`}
        >
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </div>
      <h3 className="mt-6 text-2xl font-bold">{title}</h3>
      <p
        className={`mt-3 text-sm ${
          highlighted ? "text-white/85" : "text-muted-foreground"
        }`}
      >
        {desc}
      </p>
      <ul
        className={`mt-6 space-y-3 text-sm ${
          highlighted ? "text-white/95" : "text-ink/80"
        }`}
      >
        {bullets.map((b) => (
          <li key={b} className="flex items-center gap-2">
            <BadgeCheck
              className={`h-4 w-4 ${highlighted ? "text-white" : "text-brand"}`}
            />
            {b}
          </li>
        ))}
      </ul>
    </a>
  );
}


/* ---------- ALL SERVICES GRID ---------- */
function ServicesGrid() {
  const items = [
    { title: "Laptop Repair", Icon: Laptop },
    { title: "Desktop Repair", Icon: Monitor },
    { title: "CCTV Installation", Icon: Camera },
    { title: "Networking", Icon: Network },
    { title: "Printer Repair", Icon: Printer },
    { title: "Business AMC", Icon: Briefcase },
    { title: "Data Recovery", Icon: HardDrive },
    { title: "Hardware Upgrades", Icon: Cpu },
  ];
  return (
    <section className="bg-secondary/40 px-4 py-24 md:px-8 md:py-28">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
          Everything IT, <span className="text-brand">One Team</span>
        </h2>
        <p className="mt-4 text-muted-foreground">
          From single-laptop fixes to complete business IT — we cover every
          layer so your team stays productive.
        </p>
      </div>
      <div className="mx-auto mt-14 grid max-w-6xl grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6 lg:grid-cols-4">
        {items.map(({ title, Icon }) => (
          <div
            key={title}
            className="group rounded-2xl bg-white p-6 ring-1 ring-border shadow-soft transition hover:-translate-y-1 hover:shadow-card"
          >
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand/10 text-brand transition group-hover:bg-brand group-hover:text-brand-foreground">
              <Icon className="h-5 w-5" />
            </span>
            <h3 className="mt-6 text-base font-semibold text-ink md:text-lg">
              {title}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Expert diagnostics & fast turnaround with genuine parts.
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------- SERVICE SHOWCASE (image cards, mixed sizes like reference) ---------- */
function Showcase() {
  return (
    <section id="showcase" className="bg-white px-4 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-4xl font-extrabold tracking-tight text-ink sm:text-5xl md:text-6xl">
          We Service All <br />
          <span className="text-brand">IT Environments</span>
        </h2>
        <p className="mt-5 text-muted-foreground">
          Quick, professional and reliable — for households, small offices and
          growing businesses across the region.
        </p>
      </div>

      <div className="mx-auto mt-14 grid max-w-6xl gap-6 md:grid-cols-2">
        <ShowcaseCard
          title="Laptop Repair"
          desc="Schedule your laptop repair with certified engineers and genuine parts."
          image={svcLaptop}
        />
        <ShowcaseCard
          title="Desktop Repair"
          desc="Expert desktop repair to restore full performance and stability."
          image={svcDesktop}
          badge="240+ engineers"
        />
        <ShowcaseCard
          title="CCTV Installation"
          desc="Fast, reliable CCTV installation and remote-access setup, anytime."
          image={svcCctv}
          cta="View All Services"
        />
        <ShowcaseCard
          title="Business IT Support"
          desc="Expert commercial IT support for offices, retail and workspaces."
          image={svcBusiness}
        />
      </div>
    </section>
  );
}

function ShowcaseCard({
  title,
  desc,
  image,
  cta,
  badge,
}: {
  title: string;
  desc: string;
  image: string;
  cta?: string;
  badge?: string;
}) {
  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-3xl bg-white ring-1 ring-border shadow-soft transition hover:-translate-y-1 hover:shadow-card">
      <div className="relative overflow-hidden">
        <img
          src={image}
          alt={title}
          width={1200}
          height={800}
          loading="lazy"
          className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-105"
        />
        {badge && (
          <div className="absolute bottom-3 right-3 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-ink shadow-soft">
            {badge}
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-xl font-bold text-ink md:text-2xl">{title}</h3>
        <p className="mt-3 text-sm text-muted-foreground">{desc}</p>
        <a
          href="#book"
          className="mt-auto inline-flex w-fit items-center gap-2 pt-6 text-sm font-semibold text-ink transition group-hover:text-brand"
        >
          {cta ?? "Learn more"} <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}


/* ---------- FIND / BOOK BANNER + WHY US ---------- */
function FindBanner() {
  return (
    <section id="book" className="bg-white px-4 pb-16 md:px-8">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl">
        <img
          src={findBanner}
          alt="Numunix data center"
          width={1600}
          height={700}
          loading="lazy"
          className="h-72 w-full object-cover md:h-80"
        />
        <div className="absolute inset-0 bg-ink/50" />
        <div className="absolute inset-0 flex items-center justify-center px-6">
          <div className="max-w-md rounded-3xl bg-white/10 p-6 text-center text-white ring-1 ring-white/20 backdrop-blur-md md:p-8">
            <h3 className="text-2xl font-bold md:text-3xl">
              Find Numunix Support Near You
            </h3>
            <p className="mt-2 text-sm text-white/80">
              Discover a Numunix engineer today for expert, reliable and
              friendly IT service.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="mt-5 flex items-center gap-2 rounded-full bg-white/10 p-1.5 ring-1 ring-white/25"
            >
              <input
                type="text"
                placeholder="Enter your PIN / ZIP"
                className="w-full bg-transparent px-4 py-2 text-sm text-white placeholder:text-white/60 focus:outline-none"
              />
              <button className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-ink">
                Find Now
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function WhyUs() {
  const items = [
    {
      Icon: BadgeCheck,
      title: "Certified Engineers",
      desc: "Our technicians are certified, insured and trained on the latest hardware & platforms.",
    },
    { Icon: Zap, title: "Quick Diagnosis", desc: "Fast, transparent diagnostics — usually within the same day." },
    { Icon: ShieldCheck, title: "Original Components", desc: "Only genuine, warrantied parts and licensed software." },
    { Icon: Wallet, title: "Transparent Pricing", desc: "Upfront estimates before any work begins — no surprises." },
    { Icon: CalendarClock, title: "Business AMC", desc: "Annual maintenance contracts with SLAs to keep IT running." },
    { Icon: Headset, title: "Onsite & Remote Support", desc: "Onsite visits or secure remote support — you choose." },
  ];
  const [open, setOpen] = useState(0);
  return (
    <section id="why" className="bg-white px-4 py-24 md:px-8 md:py-32">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:items-start">
        <div>
          <h2 className="text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
            Why Choose <span className="text-brand">Numunix</span> for IT
          </h2>
          <p className="mt-4 max-w-md text-muted-foreground">
            Reliable IT support with skilled engineers ensuring satisfaction on
            every ticket — from a single laptop to your entire office.
          </p>

          <div className="mt-8 space-y-3">
            {items.map(({ Icon, title, desc }, i) => {
              const isOpen = open === i;
              return (
                <button
                  key={title}
                  onClick={() => setOpen(i)}
                  className={`w-full rounded-2xl p-5 text-left ring-1 transition ${
                    isOpen
                      ? "bg-white ring-border shadow-card"
                      : "bg-secondary/50 ring-transparent hover:bg-secondary"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span
                      className={`grid h-10 w-10 shrink-0 place-items-center rounded-full ${
                        isOpen
                          ? "bg-brand text-brand-foreground"
                          : "bg-white text-ink ring-1 ring-border"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="flex-1 min-w-0 truncate text-base font-semibold text-ink">
                      {title}
                    </span>
                    <span
                      className={`grid h-8 w-8 shrink-0 place-items-center rounded-full ${
                        isOpen ? "bg-ink text-white" : "bg-white text-ink ring-1 ring-border"
                      }`}
                    >
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </div>
                  {isOpen && (
                    <p className="mt-3 pl-14 text-sm text-muted-foreground">
                      {desc}
                    </p>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <div className="relative">
          <img
            src={whyImg}
            alt="Numunix technician"
            width={900}
            height={1000}
            loading="lazy"
            className="aspect-[4/5] w-full rounded-3xl object-cover shadow-card"
          />
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-2xl bg-white/95 p-4 shadow-card backdrop-blur">
            <div>
              <p className="text-xs uppercase tracking-widest text-muted-foreground">
                Uptime SLA
              </p>
              <p className="text-lg font-bold text-ink">99.9% reliability</p>
            </div>
            <span className="grid h-11 w-11 place-items-center rounded-full bg-brand text-brand-foreground">
              <Wrench className="h-5 w-5" />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- RESOURCES ---------- */
function Resources() {
  const cards = [
    {
      image: resSlow,
      title: "Laptop Running Slow",
      desc: "Simple fixes that can bring your laptop back to speed without spending on new hardware.",
    },
    {
      image: resBsod,
      title: "Blue Screen Fixes",
      desc: "How to diagnose and safely fix the most common Windows blue-screen errors at home.",
    },
    {
      image: resCctv,
      title: "Best CCTV Guide",
      desc: "Choosing the right CCTV — resolution, storage and coverage for homes and small offices.",
    },
  ];
  return (
    <section id="resources" className="bg-white px-4 py-24 md:px-8 md:py-32">
      <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2 md:items-end">
        <h2 className="text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
          Quick Help &<br />
          <span className="text-brand">Useful Resources</span>
        </h2>
        <p className="text-muted-foreground md:max-w-md md:justify-self-end">
          Use our helpful resources to maintain performance, extend lifespan
          and avoid unnecessary IT replacements.
        </p>
      </div>

      <div className="mx-auto mt-12 grid max-w-6xl gap-6 md:grid-cols-3">
        {cards.map((c) => (
          <article
            key={c.title}
            className="group relative overflow-hidden rounded-3xl ring-1 ring-border shadow-soft"
          >
            <img
              src={c.image}
              alt={c.title}
              width={700}
              height={800}
              loading="lazy"
              className="aspect-[4/5] w-full object-cover transition duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/90 via-ink/50 to-transparent p-6 text-white">
              <h3 className="text-lg font-bold md:text-xl">{c.title}</h3>
              <p className="mt-2 text-sm text-white/80">{c.desc}</p>
            </div>
          </article>
        ))}
      </div>
      <div className="mt-10 flex justify-center">
        <a
          href="#resources"
          className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white"
        >
          View All Resources <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </section>
  );
}

/* ---------- FAQ ---------- */
function FAQ() {
  const faqs = [
    {
      q: "What makes Numunix different from other IT support providers?",
      a: "Certified engineers, transparent pricing, genuine parts, fast turnaround and dedicated support for both homes and businesses.",
    },
    {
      q: "What types of devices and systems do you repair and maintain?",
      a: "Laptops, desktops, printers, servers, CCTV, structured networks, Wi-Fi and business software environments.",
    },
    {
      q: "Do you offer onsite support for offices?",
      a: "Yes — we offer onsite visits, remote support and business AMC plans with defined SLAs.",
    },
    {
      q: "How quickly can you diagnose an issue?",
      a: "Most issues are diagnosed the same day. Complex hardware faults are diagnosed within 24–48 hours.",
    },
    {
      q: "Do you use genuine parts and offer warranty?",
      a: "Yes. Every repair uses genuine, warrantied components and comes with a Numunix service warranty.",
    },
  ];
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="bg-secondary/40 px-4 py-24 md:px-8 md:py-32">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:items-start">
        <div className="order-2 space-y-3 lg:order-1">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div
                key={f.q}
                className={`rounded-2xl bg-white p-5 ring-1 transition ${
                  isOpen ? "ring-brand/40 shadow-card" : "ring-border"
                }`}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center gap-4 text-left"
                >
                  <span className="flex-1 min-w-0 text-sm font-semibold text-ink md:text-base">
                    {f.q}
                  </span>
                  <span
                    className={`grid h-9 w-9 shrink-0 place-items-center rounded-full ${
                      isOpen ? "bg-ink text-white" : "bg-secondary text-ink"
                    }`}
                  >
                    {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                  </span>
                </button>
                {isOpen && (
                  <p className="mt-4 text-sm text-muted-foreground">{f.a}</p>
                )}
              </div>
            );
          })}
        </div>

        <div className="order-1 lg:order-2 lg:pl-12">
          <h2 className="text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
            Questions,
            <br />
            <span className="text-brand">Answered</span>
          </h2>
          <p className="mt-4 max-w-md text-muted-foreground">
            Our engineers provide professional and caring IT support you can
            always trust.
          </p>
          <a
            href="#faq"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand px-5 py-3 text-sm font-semibold text-brand-foreground"
          >
            View All FAQ
          </a>

          <div className="mt-10 rounded-2xl bg-white p-5 ring-1 ring-border shadow-soft">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-brand/10 text-brand">
                <Headset className="h-5 w-5" />
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-muted-foreground">
                  Have more questions?
                </p>
                <p className="text-sm font-semibold text-ink">
                  Book a free discovery call
                </p>
              </div>
            </div>
            <a
              href="#book"
              className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-ink px-4 py-3 text-sm font-semibold text-white"
            >
              Let's Talk Numunix
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- FOOTER ---------- */
function Footer() {
  const cols: { title: string; links: string[] }[] = [
    { title: "Company", links: ["About Us", "Why Us", "Careers", "Contact Us"] },
    { title: "Services", links: ["Laptop Repair", "Desktop Repair", "CCTV", "Networking"] },
    { title: "Resources", links: ["Expert Tips", "Guides", "Locations", "Site Map"] },
  ];
  return (
    <footer className="relative overflow-hidden bg-white px-4 pt-20 pb-8 md:px-8">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr_1fr]">
        <div>
          <LogoMark className="h-9" />
          <p className="mt-4 max-w-xs text-sm text-muted-foreground">
            Reliable nationwide IT support, hardware services and business AMC.
            We Keep IT Running.
          </p>
          <div className="mt-6 flex items-center gap-3">
            {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
              <a
                key={i}
                href="#"
                aria-label="social"
                className="grid h-9 w-9 place-items-center rounded-full bg-secondary text-ink transition hover:bg-brand hover:text-brand-foreground"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
        {cols.map((c) => (
          <div key={c.title}>
            <h4 className="text-sm font-semibold text-ink">{c.title}</h4>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              {c.links.map((l) => (
                <li key={l}>
                  <a href="#" className="transition hover:text-ink">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div
        aria-hidden
        className="pointer-events-none mt-16 select-none text-center text-[18vw] font-extrabold leading-none tracking-tighter text-ink/[0.04] md:text-[14vw]"
      >
        Numunix
      </div>

      <div className="mx-auto mt-8 flex max-w-6xl flex-col items-center justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row">
        <p>© {new Date().getFullYear()} Numunix. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <a href="#" className="hover:text-ink">Privacy Policy</a>
          <a href="#" className="hover:text-ink">Terms</a>
        </div>
      </div>
    </footer>
  );
}

/* ---------- PAGE ---------- */
function LandingPage() {
  return (
    <main className="bg-white text-ink">
      <Hero />
      <CommonProblems />
      <ServicesGrid />
      <Showcase />
      <FindBanner />
      <WhyUs />
      <Resources />
      <FAQ />
      <Footer />
    </main>
  );
}
