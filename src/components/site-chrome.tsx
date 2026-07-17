import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X, Facebook, Instagram, Youtube, Twitter, Mail, Phone } from "lucide-react";
import logo from "@/assets/numunix-logo.webp";
import { CONTACT } from "@/lib/contact";
import { WhatsAppIcon } from "@/components/whatsapp-icon";

const LOGO = logo;

export function LogoMark({ className = "h-9 w-auto" }: { className?: string }) {
  return (
    <img
      src={LOGO}
      alt="Numunix — We Keep IT Running"
      className={`${className} object-contain`}
      width={200}
      height={50}
    />
  );
}

const NAV_LINKS: { label: string; to: string }[] = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Why Us", to: "/why-us" },
  { label: "Contact", to: "/contact" },
];

export function SiteNav({ variant = "light" }: { variant?: "light" | "dark" }) {
  const [open, setOpen] = useState(false);
  const isDark = variant === "dark";
  return (
    <header className={isDark ? "absolute inset-x-0 top-0 z-30" : "sticky top-0 z-30 border-b border-border bg-white/80 backdrop-blur-xl"}>
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 md:px-8 md:py-4">
        <Link
          to="/"
          className="flex h-12 items-center rounded-2xl bg-white/95 px-4 shadow-soft backdrop-blur md:h-14 md:rounded-full md:px-6"
        >
          <LogoMark className="h-7 w-auto md:h-9" />
        </Link>

        <nav
          className={`hidden h-14 items-center gap-1 rounded-full px-2 backdrop-blur-md lg:flex ${
            isDark ? "bg-white/10 ring-1 ring-white/20" : "bg-secondary ring-1 ring-border"
          }`}
        >
          {NAV_LINKS.map((l) => (
            <Link
              key={l.label}
              to={l.to}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                isDark
                  ? "text-white/90 hover:bg-white/15 hover:text-white"
                  : "text-ink/80 hover:bg-white hover:text-ink"
              }`}
              activeProps={{
                className: isDark
                  ? "rounded-full px-4 py-2 text-sm font-semibold bg-white/20 text-white"
                  : "rounded-full px-4 py-2 text-sm font-semibold bg-white text-ink shadow-soft",
              }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <a
            href={CONTACT.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex h-14 items-center gap-2 rounded-full border px-6 text-sm font-semibold shadow-soft transition ${
              isDark
                ? "border-white/30 bg-ink/55 text-white backdrop-blur hover:bg-white hover:text-ink"
                : "border-ink/20 bg-ink text-white hover:bg-brand"
            }`}
          >
            <WhatsAppIcon className="h-4 w-4" />
            WhatsApp Us
          </a>
        </div>

        <button
          onClick={() => setOpen(true)}
          className={`grid h-12 w-12 place-items-center rounded-2xl shadow-soft lg:hidden ${
            isDark ? "bg-white/95 text-ink" : "bg-ink text-white"
          }`}
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 bg-ink/95 backdrop-blur-xl lg:hidden">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex h-12 items-center rounded-2xl bg-white/95 px-4 shadow-soft">
              <LogoMark className="h-7 w-auto" />
            </div>
            <button
              onClick={() => setOpen(false)}
              className="grid h-12 w-12 place-items-center rounded-2xl bg-white/10 text-white"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="flex flex-col gap-2 px-6 py-8">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.label}
                to={l.to}
                onClick={() => setOpen(false)}
                className="rounded-2xl px-4 py-4 text-2xl font-semibold text-white hover:bg-white/10"
              >
                {l.label}
              </Link>
            ))}
            <a
              href={CONTACT.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-4 text-base font-semibold text-white"
            >
              <WhatsAppIcon className="h-5 w-5" />
              WhatsApp Us
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

export function SiteFooter() {
  const cols: { title: string; links: { label: string; to: string }[] }[] = [
    {
      title: "Company",
      links: [
        { label: "About Us", to: "/about" },
        { label: "Why Us", to: "/why-us" },
        { label: "Contact Us", to: "/contact" },
      ],
    },
    {
      title: "Services",
      links: [
        { label: "Laptop Repair", to: "/" },
        { label: "Desktop Repair", to: "/" },
        { label: "CCTV Installation", to: "/" },
        { label: "Networking & AMC", to: "/" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy Policy", to: "/privacy" },
        { label: "Terms & Conditions", to: "/terms" },
      ],
    },
  ];
  return (
    <footer className="relative overflow-hidden bg-white px-4 pt-20 pb-8 md:px-8">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr_1fr]">
        <div>
          <LogoMark className="h-10 w-auto" />
          <p className="mt-4 max-w-xs text-sm text-muted-foreground">
            Reliable IT support, hardware services and business AMC. Serving
            since {CONTACT.founded}. We Keep IT Running.
          </p>
          <div className="mt-5 space-y-2 text-sm">
            <a href={CONTACT.telUrl} className="flex items-center gap-2 text-ink hover:text-brand">
              <Phone className="h-4 w-4" />
              {CONTACT.phoneDisplay}
            </a>
            <a href={CONTACT.mailUrl} className="flex items-center gap-2 text-ink hover:text-brand">
              <Mail className="h-4 w-4" />
              {CONTACT.email}
            </a>
          </div>
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
                <li key={l.label}>
                  <Link to={l.to} className="transition hover:text-ink">
                    {l.label}
                  </Link>
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
        <p>Since {CONTACT.founded} · Online since {CONTACT.onlineSince}</p>
      </div>
    </footer>
  );
}

export function PageHero({
  eyebrow,
  title,
  accent,
  description,
}: {
  eyebrow: string;
  title: string;
  accent?: string;
  description?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-ink px-4 pt-28 pb-20 text-white md:px-8 md:pt-32 md:pb-28">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-brand/20 blur-3xl"
      />
      <div className="relative mx-auto max-w-4xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium ring-1 ring-white/20 backdrop-blur">
          <span className="h-1.5 w-1.5 rounded-full bg-brand" />
          {eyebrow}
        </span>
        <h1 className="mt-5 text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
          {title}
          {accent && (
            <>
              {" "}
              <span className="text-brand">{accent}</span>
            </>
          )}
        </h1>
        {description && (
          <p className="mx-auto mt-5 max-w-2xl text-base text-white/75 md:text-lg">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
