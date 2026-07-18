import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { submitLead } from "@/lib/leads.functions";
import { checkPincode } from "@/lib/pincodes.functions";
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
  Plus,
  Minus,
} from "lucide-react";

import heroImg from "@/assets/hero-technician.webp";
import teamImg from "@/assets/team-it.webp";

import svcLaptop from "@/assets/service-laptop.webp";
import svcDesktop from "@/assets/service-desktop.webp";
import svcCctv from "@/assets/service-cctv.webp";
import svcBusiness from "@/assets/service-business.webp";
import whyImg from "@/assets/why-choose.webp";
import resSlow from "@/assets/res-slow-laptop.webp";
import resBsod from "@/assets/res-bsod.webp";
import resCctv from "@/assets/res-cctv.webp";
import findBanner from "@/assets/find-banner.webp";

import { SiteNav, SiteFooter } from "@/components/site-chrome";
import { WhatsAppIcon } from "@/components/whatsapp-icon";
import { CONTACT } from "@/lib/contact";

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
    <section className="relative flex min-h-[100svh] flex-col overflow-hidden bg-ink text-white">
      <img
        src={heroImg}
        alt="Numunix engineer repairing a laptop"
        width={1400}
        height={1200}
        className="absolute inset-0 h-full w-full object-cover object-center opacity-70"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/40 lg:to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent" />

      <SiteNav variant="dark" />

      <div className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-4 pb-8 pt-24 md:px-8 md:pt-32 md:pb-20 lg:pt-36 lg:pb-24">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-12">
          {/* Left column */}
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium ring-1 ring-white/20 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-brand" />
              We Keep IT Running
            </span>
            <h1 className="mt-4 text-[2rem] font-extrabold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
              Reliable IT Support{" "}
              <span className="text-brand">&amp; Hardware</span> Services
            </h1>
            <p className="mt-4 max-w-xl text-sm text-white/75 sm:mt-6 sm:text-lg">
              Certified engineers, transparent pricing, fast turnaround —
              laptop repair, CCTV, networking, AMC &amp; more.
            </p>

            {/* Mobile CTAs — full width */}
            <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap">
              <a
                href="#book"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-ink shadow-soft transition hover:bg-white/90 sm:w-auto"
              >
                Book Service
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href={CONTACT.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3.5 text-sm font-semibold text-white shadow-soft transition hover:brightness-110 sm:w-auto sm:bg-white/5 sm:text-white sm:ring-1 sm:ring-white/25 sm:backdrop-blur"
              >
                <WhatsAppIcon className="h-4 w-4" />
                Reach us on WhatsApp
              </a>
            </div>

            {/* Service chips — desktop / tablet only */}
            <div className="mt-8 hidden flex-wrap gap-2 sm:mt-10 sm:flex">
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

          {/* Right column — desktop booking form only */}
          <div className="hidden lg:block lg:w-[380px]">
            <BookingForm />
          </div>
        </div>
      </div>
    </section>
  );
}

const SERVICES = [
  "Laptop Repair",
  "Desktop Repair",
  "CCTV Installation",
  "Networking",
  "Printer Repair",
  "Data Recovery",
  "Business AMC",
  "Other",
];

function BookingForm({
  variant = "dark",
  defaultService = "Laptop Repair",
}: {
  variant?: "dark" | "light";
  defaultService?: string;
}) {
  const navigate = useNavigate();
  const submit = useServerFn(submitLead);
  const [service, setService] = useState(defaultService);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [postal, setPostal] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const dark = variant === "dark";
  const inputCls = dark
    ? "mt-1.5 w-full rounded-xl bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/50 ring-1 ring-white/20 backdrop-blur focus:outline-none focus:ring-brand"
    : "mt-1.5 w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-ink placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand";
  const labelCls = dark ? "text-xs font-semibold text-white/80" : "text-xs font-semibold text-muted-foreground";

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setErr(null);
    try {
      const res = await submit({
        data: { service, name, email, phone, postal_code: postal, source: "hero" },
      });
      navigate({ to: "/thank-you", search: { id: res.booking_id, service } });
    } catch (e) {
      setErr((e as Error).message || "Something went wrong.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className={
        dark
          ? "rounded-3xl bg-white/10 p-5 ring-1 ring-white/20 backdrop-blur-xl shadow-card sm:p-6"
          : "rounded-3xl bg-white p-6 shadow-card ring-1 ring-border"
      }
    >
      <h3 className={`text-lg font-bold sm:text-xl ${dark ? "text-white" : "text-ink"}`}>Book a Service</h3>
      <p className={`mt-1 text-xs ${dark ? "text-white/70" : "text-muted-foreground"}`}>
        Get a free callback from a certified Numunix engineer.
      </p>
      <div className="mt-4 space-y-3">
        <label className="block">
          <span className={labelCls}>Service needed</span>
          <select value={service} onChange={(e) => setService(e.target.value)} className={inputCls} required>
            {SERVICES.map((s) => (
              <option key={s} value={s} className="bg-ink text-white">
                {s}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className={labelCls}>Name</span>
          <input type="text" required maxLength={100} value={name} onChange={(e) => setName(e.target.value)} placeholder="Your full name" className={inputCls} />
        </label>
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="block">
            <span className={labelCls}>Phone</span>
            <input type="tel" required maxLength={15} value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+91 …" className={inputCls} />
          </label>
          <label className="block">
            <span className={labelCls}>Pincode</span>
            <input type="text" maxLength={12} value={postal} onChange={(e) => setPostal(e.target.value)} placeholder="PIN" className={inputCls} />
          </label>
        </div>
        <label className="block">
          <span className={labelCls}>Email (optional)</span>
          <input type="email" maxLength={255} value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className={inputCls} />
        </label>
      </div>
      {err && <p className={`mt-3 rounded-lg px-3 py-2 text-xs ${dark ? "bg-red-500/10 text-red-300 ring-1 ring-red-500/30" : "bg-red-50 text-red-700 ring-1 ring-red-200"}`}>{err}</p>}
      <button
        type="submit"
        disabled={busy}
        className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand px-5 py-3.5 text-sm font-semibold text-brand-foreground shadow-brand transition hover:brightness-110 disabled:opacity-60"
      >
        {busy ? "Sending…" : "Schedule Service"}
        <ArrowRight className="h-4 w-4" />
      </button>
    </form>
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

      <div className="relative mx-auto mt-14 max-w-6xl sm:mt-16">
        {/* Central floating team image — behind cards on desktop */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-0 hidden -translate-x-1/2 lg:block"
        >
          <div className="overflow-hidden rounded-[2rem] shadow-card ring-1 ring-border rotate-[-3deg]">
            <img
              src={teamImg}
              alt=""
              width={520}
              height={620}
              loading="lazy"
              className="h-[440px] w-[340px] object-cover"
            />
          </div>
        </div>

        {/* Mobile team image */}
        <div className="mb-8 overflow-hidden rounded-3xl shadow-card ring-1 ring-border lg:hidden">
          <img
            src={teamImg}
            alt="Numunix engineering team"
            width={1200}
            height={700}
            loading="lazy"
            className="h-56 w-full object-cover sm:h-72"
          />
        </div>

        <div className="relative grid gap-5 md:gap-6 lg:grid-cols-3 lg:gap-8">
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
            highlighted
          />
          {/* Spacer on desktop to reveal the central team image */}
          <div className="hidden lg:block" aria-hidden />
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
          {/* Networking card — sits below center image on desktop, overlapping */}
          <div className="lg:col-span-3 lg:mx-auto lg:-mt-24 lg:w-[380px] lg:rotate-[2deg]">
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
            />
          </div>
        </div>
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
  const check = useServerFn(checkPincode);
  const [pin, setPin] = useState("");
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<
    | { available: true; city: string | null }
    | { available: false; city: null }
    | null
  >(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!pin.trim()) return;
    setBusy(true);
    try {
      const res = await check({ data: { pincode: pin.trim() } });
      setResult(res as never);
    } finally {
      setBusy(false);
    }
  }

  return (
    <section id="find" className="bg-white px-4 pb-16 md:px-8">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem]">
        <img
          src={findBanner}
          alt="Numunix data center"
          width={1600}
          height={900}
          loading="lazy"
          className="h-[420px] w-full object-cover sm:h-[460px] md:h-[500px]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-ink/50 to-ink/30" />
        <div className="absolute inset-0 flex items-center px-6 md:px-12 lg:px-16">
          <div className="w-full max-w-lg rounded-3xl bg-white/10 p-7 text-white ring-1 ring-white/25 shadow-card backdrop-blur-xl md:p-10">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium ring-1 ring-white/20">
              <span className="h-1.5 w-1.5 rounded-full bg-brand" />
              Nearby Support
            </span>
            <h3 className="mt-4 text-2xl font-bold leading-tight md:text-3xl lg:text-4xl">
              Find Numunix Support <span className="text-brand">Near You</span>
            </h3>
            <p className="mt-3 text-sm text-white/80 md:text-base">
              Enter your pincode to check if we service your area.
            </p>
            <form
              onSubmit={onSubmit}
              className="mt-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-2 sm:rounded-full sm:bg-white/10 sm:p-1.5 sm:ring-1 sm:ring-white/25"
            >
              <input
                type="text"
                maxLength={12}
                value={pin}
                onChange={(e) => {
                  setPin(e.target.value);
                  setResult(null);
                }}
                placeholder="Enter your PIN / ZIP"
                className="w-full rounded-full bg-white/10 px-5 py-3 text-sm text-white ring-1 ring-white/20 placeholder:text-white/60 focus:outline-none focus:ring-brand sm:bg-transparent sm:ring-0 sm:focus:ring-0"
              />
              <button
                type="submit"
                disabled={busy}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-ink transition hover:bg-white/90 disabled:opacity-60"
              >
                {busy ? "Checking…" : "Find Now"}
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
            {result && (
              <div
                className={`mt-4 rounded-2xl px-4 py-3 text-sm ring-1 ${
                  result.available
                    ? "bg-green-500/15 text-green-100 ring-green-400/40"
                    : "bg-red-500/15 text-red-100 ring-red-400/40"
                }`}
              >
                {result.available ? (
                  <>✅ Great news — we service <b>{pin}</b>{result.city ? ` (${result.city})` : ""}. Book below!</>
                ) : (
                  <>Sorry, we don't service <b>{pin}</b> yet. Contact us on WhatsApp for special requests.</>
                )}
              </div>
            )}
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
      <SiteFooter />
    </main>
  );
}

