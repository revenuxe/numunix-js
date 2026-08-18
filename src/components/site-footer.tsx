import Link from "next/link";
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Star } from "lucide-react";
import { LogoMark } from "@/components/logo-mark";
import { CONTACT } from "@/lib/contact";
import { REPAIR_LAPTOP_BRANDS } from "@/lib/repair-laptop-brands";

function XIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 16 16"
      className={className}
    >
      <path d="M12.6 0.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867 -5.07 -4.425 5.07H0.316l5.733 -6.57L0 0.75h5.063l3.495 4.633L12.601 0.75Zm-0.86 13.028h1.36L4.323 2.145H2.865z" />
    </svg>
  );
}

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

const SERVICE_CENTER_COLUMN = {
  title: "Laptop Service Center",
  links: REPAIR_LAPTOP_BRANDS.map((b) => ({
    label: b.serviceCenterName,
    href: `/repair-laptop/service-center/${b.slug}`,
  })),
};

const CUSTOMER_REVIEWS = [
  {
    name: "Deen Express",
    service: "Laptop motherboard repair",
    quote: "I've got my laptop motherboard repair in very best price.",
  },
  {
    name: "Touheed Rahman",
    service: "CCTV service in HBR Layout",
    quote: "Best CCTV service provider in HBR Layout.",
  },
  {
    name: "Shaiz Md",
    service: "Numunix customer",
    quote: "Highly recommend.",
  },
];

// The "Repair Your Laptop" and "Laptop Service Center" brand link columns
// only make sense in the context of the repair flow, so they only show on
// repair-laptop pages, not the footer used by the rest of the site (homepage,
// services, legal pages, etc.).
export function SiteFooter({ showRepairLaptopMenu = false }: { showRepairLaptopMenu?: boolean }) {
  const columns = showRepairLaptopMenu
    ? [
        BASE_FOOTER_COLUMNS[0],
        BASE_FOOTER_COLUMNS[1],
        REPAIR_LAPTOP_COLUMN,
        SERVICE_CENTER_COLUMN,
        BASE_FOOTER_COLUMNS[2],
      ]
    : BASE_FOOTER_COLUMNS;

  return (
    <footer className="relative overflow-hidden bg-white px-4 pt-20 pb-8 md:px-8">
      <section className="mx-auto mb-16 max-w-6xl rounded-[2rem] bg-secondary/65 p-6 md:p-10">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand">
            Customer reviews
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            Trusted by local customers.
          </h2>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {CUSTOMER_REVIEWS.map((review) => (
            <article
              key={review.name}
              className="rounded-2xl bg-white p-5 shadow-soft ring-1 ring-border"
            >
              <div className="flex gap-1 text-amber-400" aria-label="5 out of 5 stars">
                {Array.from({ length: 5 }, (_, index) => (
                  <Star key={index} className="h-4 w-4 fill-current" aria-hidden />
                ))}
              </div>
              <blockquote className="mt-4 text-sm leading-6 text-ink">“{review.quote}”</blockquote>
              <p className="mt-5 text-sm font-bold text-ink">{review.name}</p>
              <p className="mt-1 text-xs text-muted-foreground">{review.service}</p>
            </article>
          ))}
        </div>
      </section>
      <div
        className={`mx-auto grid max-w-6xl gap-10 md:grid-cols-3 ${
          showRepairLaptopMenu
            ? "lg:grid-cols-[1.1fr_1fr_1fr_1fr_1fr_1fr]"
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
            {[
              { Icon: Instagram, href: "https://www.instagram.com/numunix/", label: "Instagram" },
              {
                Icon: Linkedin,
                href: "https://www.linkedin.com/company/numunix",
                label: "LinkedIn",
              },
              {
                Icon: Facebook,
                href: "https://www.facebook.com/people/Numunix/61592696692436/",
                label: "Facebook",
              },
              {
                Icon: XIcon,
                href: "https://x.com/Numunix",
                label: "X",
              },
            ].map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                aria-label={label}
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
