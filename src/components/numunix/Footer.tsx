import { Facebook, Instagram, Linkedin, type LucideIcon } from "lucide-react";
import { BrandLogo } from "./BrandLogo";
import { CONTACT } from "@/content/site";

const SOCIAL_LINKS: { Icon: LucideIcon; label: string; href: string }[] = [
  { Icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/company/numunix/" },
  { Icon: Instagram, label: "Instagram", href: "https://www.instagram.com/numunix" },
  { Icon: Facebook, label: "Facebook", href: "https://www.facebook.com/people/Numunix/61592696692436/" },
];

const COLUMNS: [string, [string, string][]][] = [
  ["PLATFORM", [["Overview", "/#approach"], ["Lead management", "/lead-management"], ["Workflow", "/workflow"], ["Operations", "/operations"], ["Team workspace", "/team-workspace"], ["Access and records", "/access-and-records"]]],
  ["FEATURES", [["Leads", "/features/leads"], ["Bookings", "/features/bookings"], ["Customers", "/features/customers"], ["Technicians", "/features/technicians"], ["Jobs", "/features/jobs"], ["Invoicing", "/features/invoicing"], ["Dashboard", "/features/dashboard"]]],
  ["TEAMS", [["Owners", "/industries/service-business-owners"], ["Operations", "/industries/operations-managers"], ["Support", "/industries/customer-support-teams"], ["Booking coordinators", "/industries/booking-coordinators"], ["Field technicians", "/industries/field-technicians"], ["Service managers", "/industries/service-managers"], ["Billing teams", "/industries/billing-teams"], ["Growing teams", "/industries/growing-service-teams"]]],
  ["RESOURCES", [["Playbooks", "/resources"], ["Contact", "/contact"], ["Privacy Policy", "/privacy"], ["Terms", "/terms"]]],
];

export function Footer() {
  return (
    <footer className="border-t border-white/8 bg-[#05070c] pt-16 pb-10 sm:pt-20">
      <div className="shell grid gap-12 lg:grid-cols-[1.1fr_2.4fr]">
        <div>
          <BrandLogo className="w-[200px] sm:w-[220px]" />
          <p className="mt-5 max-w-[36ch] text-[15px] leading-relaxed text-white/50">A shared workspace for service enquiries, bookings, teams, jobs and invoices.</p>
          <p className="mt-3 max-w-[36ch] text-[13px] leading-relaxed text-white/35">Questions? <a href={CONTACT.emailHref} className="underline underline-offset-4 hover:text-white/70">{CONTACT.email}</a></p>
          <div className="mt-8 flex gap-3">
            {SOCIAL_LINKS.map(({ Icon, label, href }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 text-white/60 transition-colors hover:border-[#3b82f6]/50 hover:text-white"><Icon size={15} /></a>
            ))}
          </div>
        </div>
        <div className="grid gap-9 sm:grid-cols-2 lg:grid-cols-4">
          {COLUMNS.map(([title, items]) => (
            <div key={title}>
              <div className="label-mono text-white/40">{title}</div>
              <ul className="mt-5 space-y-3">
                {items.map(([label, href]) => <li key={label}><a href={href} className="text-[15px] text-white/65 transition-colors hover:text-white">{label}</a></li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="shell mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-white/8 pt-8">
        <span className="label-mono text-white/35">(c) 2026 NUMUNIX. ALL RIGHTS RESERVED.</span>
        <div className="flex flex-wrap gap-6">{[["Privacy Policy", "/privacy"], ["Terms", "/terms"]].map(([label, href]) => <a key={label} href={href} className="text-[14px] text-white/45 transition-colors hover:text-white">{label}</a>)}</div>
      </div>
    </footer>
  );
}

export default Footer;
