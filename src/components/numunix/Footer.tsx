import { Linkedin, Instagram, Facebook } from "lucide-react";
import { BrandLogo } from "./BrandLogo";
import { CONTACT } from "@/content/site";
import { REPAIR_PAGES } from "@/content/repair-services";
import { useCategory } from "./category";
import { REPAIR_SERVICES, HOMEPAGE_REPAIR } from "@/content/homepage-repairs";

const FEATURE_LINKS: Record<string,string> = {"Our Approach":"/approach","Our Process":"/process","Diagnostics & Tools":"/technology","Contact":"/contact","Support":"/support","Privacy Policy":"/privacy","Terms":"/terms","Security":"/security","Repair Guides":"/articles"};

export function Footer() {
  const category = useCategory()?.category ?? "electronics";
  const columns: [string, string[]][] = [
    ["REPAIR SERVICES", REPAIR_PAGES.filter(service => service.category === category).map(service => service.name)],
    ["REPAIR CARE", ["Fault Assessment", "Repair Estimates", "Function Testing", "Maintenance Visits"]],
    ["NUMUNIX", ["Electronics", "Appliances", "Our Approach", "Our Process", "Diagnostics & Tools", "Repair Guides", "Contact"]],
    ["INFORMATION", ["Support", "Privacy Policy", "Terms"]],
  ];
  const repairLink = (label: string) => label === "Electronics" ? "/" : label === "Appliances" ? "/appliances" : (REPAIR_PAGES.find(service => service.category === category && service.name === label) ? `/repairs/${REPAIR_PAGES.find(service => service.category === category && service.name === label)?.slug}` : FEATURE_LINKS[label] ?? "#enquiry");
  return (
    <footer className="border-t border-white/8 bg-[#05070c] pt-20 pb-10">
      <div className="shell grid gap-14 lg:grid-cols-[1.1fr_2.4fr]">
        <div>
          <BrandLogo className="w-[200px] sm:w-[220px]" />
          <p className="mt-5 max-w-[34ch] text-[15px] leading-relaxed text-white/50">
            {HOMEPAGE_REPAIR[category].audienceIntro}
          </p>
          <p className="mt-3 max-w-[34ch] text-[13px] leading-relaxed text-white/35">
            {CONTACT.address}
          </p>
          <div className="mt-8 flex gap-3">
            <a
              href="https://www.linkedin.com/company/numunix/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 text-white/60 transition-colors hover:border-[#3b82f6]/50 hover:text-white"
            >
              <Linkedin size={15} />
            </a>
            <a
              href="https://www.instagram.com/numunix"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 text-white/60 transition-colors hover:border-[#3b82f6]/50 hover:text-white"
            >
              <Instagram size={15} />
            </a>
            <a
              href="https://www.facebook.com/people/Numunix/61592696692436/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 text-white/60 transition-colors hover:border-[#3b82f6]/50 hover:text-white"
            >
              <Facebook size={15} />
            </a>
          </div>
        </div>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {columns.map(([title, items]) => (
            <div key={title}>
              <div className="label-mono text-white/40">{title}</div>
              <ul className="mt-5 space-y-3">
                {items.map((i) => (
                  <li key={i}>
                    <a
                      href={category ? repairLink(i) : FEATURE_LINKS[i] ?? "/features"}
                      className="text-[15px] text-white/65 transition-colors hover:text-white"
                    >
                      {i}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="shell mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-white/8 pt-8">
        <span className="label-mono text-white/35">
          © 2026 NUMUNIX. ALL RIGHTS RESERVED.
        </span>
        <div className="flex flex-wrap gap-6">
          {["Privacy Policy", "Terms", "Security"].map((l) => (
            <a
              key={l}
              href={FEATURE_LINKS[l]}
              className="text-[14px] text-white/45 transition-colors hover:text-white"
            >
              {l}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
