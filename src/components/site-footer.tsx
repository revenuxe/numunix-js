import Link from "next/link";
import { Facebook, Instagram, Youtube, Twitter, Mail, MapPin, Phone } from "lucide-react";
import { LogoMark } from "@/components/logo-mark";
import { CONTACT } from "@/lib/contact";
import { REPAIR_LAPTOP_BRANDS } from "@/lib/repair-laptop-brands";

const BASE_FOOTER_COLUMNS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Why Us", href: "/why-us" },
      { label: "Blog", href: "/blog" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "Laptop Repair", href: "/services/laptop-repair" },
      { label: "Desktop Repair", href: "/services/desktop-repair" },
      { label: "CCTV Installation", href: "/services/cctv-installation" },
      { label: "Networking & AMC", href: "/services/networking" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms & Conditions", href: "/terms" },
      { label: "Laptop Buyback Terms", href: "/sell/laptops/terms" },
    ],
  },
];

const REPAIR_LAPTOP_COLUMN = {
  title: "Repair Your Laptop",
  links: REPAIR_LAPTOP_BRANDS.map((b) => ({
    label: b.footerLabel,
    href: `/repair-laptop/brand/${b.slug}`,
  })),
};

// The "Repair Your Laptop" brand links only make sense in the context of the
// repair flow, so they only show on repair-laptop pages, not the footer used
// by the rest of the site (homepage, services, legal pages, etc.).
export function SiteFooter({ showRepairLaptopMenu = false }: { showRepairLaptopMenu?: boolean }) {
  const columns = showRepairLaptopMenu
    ? [BASE_FOOTER_COLUMNS[0], BASE_FOOTER_COLUMNS[1], REPAIR_LAPTOP_COLUMN, BASE_FOOTER_COLUMNS[2]]
    : BASE_FOOTER_COLUMNS;

  return (
    <footer className="relative overflow-hidden bg-white px-4 pt-20 pb-8 md:px-8">
      <div
        className={`mx-auto grid max-w-6xl gap-10 md:grid-cols-3 ${
          showRepairLaptopMenu
            ? "lg:grid-cols-[1.2fr_1fr_1fr_1fr_1fr]"
            : "lg:grid-cols-[1.2fr_1fr_1fr_1fr]"
        }`}
      >
        <div>
          <LogoMark className="h-10 w-auto" />
          <p className="mt-4 max-w-xs text-sm text-muted-foreground">
            Reliable IT support, hardware services and business AMC. Serving since {CONTACT.founded}
            . We Keep IT Running.
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
            <p className="flex items-start gap-2 text-muted-foreground">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
              <span>{CONTACT.fullAddress}</span>
            </p>
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
        {columns.map((c) => (
          <div key={c.title}>
            <h4 className="text-sm font-semibold text-ink">{c.title}</h4>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              {c.links.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="transition hover:text-ink">
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
        <p>
          Since {CONTACT.founded} · Online since {CONTACT.onlineSince}
        </p>
      </div>
    </footer>
  );
}
