import { Linkedin, Instagram } from "lucide-react";
import { BrandLogo } from "./BrandLogo";
import { CONTACT } from "@/content/site";

const FEATURE_LINKS: Record<string, string> = {
  "Web Development": "/features/web-development",
  "Mobile Apps": "/features/mobile-app-development",
  "Custom Software": "/features/custom-software",
  "SaaS Development": "/features/saas-development",
  "AI & Automation": "/features/ai-automation",
  "UI/UX Design": "/features/ui-ux-design",
  "Cloud & Integrations": "/features/cloud-integrations",
  "Business Websites": "/features/web-development",
  "Web Applications": "/features/web-applications",
  "Mobile Applications": "/features/mobile-app-development",
  "SaaS Platforms": "/features/saas-development",
  "Marketplaces": "/features/marketplaces",
  "Business Software": "/features/custom-software",
  "Our Approach": "/approach",
  "Our Process": "/process",
  "Technology": "/technology",
  "Contact": "/contact",
  "All Services": "/features",
  "Integrations": "/features/cloud-integrations",
  "Maintenance": "/features/maintenance-support",
  "Security": "/security",
  "Support": "/support",
  "Privacy Policy": "/privacy",
  "Terms": "/terms"
};

const COLS: [string, string[]][] = [
  [
    "SERVICES",
    [
      "Web Development",
      "Mobile Apps",
      "Custom Software",
      "SaaS Development",
      "AI & Automation",
      "UI/UX Design",
      "Cloud & Integrations"
    ]
  ],
  [
    "PRODUCTS",
    [
      "Business Websites",
      "Web Applications",
      "Mobile Applications",
      "SaaS Platforms",
      "Marketplaces",
      "Business Software"
    ]
  ],
  [
    "COMPANY",
    [
      "Our Approach",
      "Our Process",
      "Technology",
      "Contact"
    ]
  ],
  [
    "EXPLORE",
    [
      "All Services",
      "Integrations",
      "Maintenance",
      "Security",
      "Support"
    ]
  ]
];

export function Footer() {
  return (
    <footer className="border-t border-white/8 bg-[#05070c] pt-20 pb-10">
      <div className="shell grid gap-14 lg:grid-cols-[1.1fr_2.4fr]">
        <div>
          <BrandLogo className="w-[200px] sm:w-[220px]" />
          <p className="mt-5 max-w-[34ch] text-[15px] leading-relaxed text-white/50">
            Software, websites, apps, and digital products built for real-world growth.
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
          </div>
        </div>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {COLS.map(([title, items]) => (
            <div key={title}>
              <div className="label-mono text-white/40">{title}</div>
              <ul className="mt-5 space-y-3">
                {items.map((i) => (
                  <li key={i}>
                    <a
                      href={FEATURE_LINKS[i] ?? "/features"}
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
