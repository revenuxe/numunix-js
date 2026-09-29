import { Linkedin, Instagram, Youtube } from "lucide-react";

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
  "Our Approach": "/#approach",
  "Our Process": "/#process",
  "Technology": "/#technology",
  "Contact": "/contact",
  "Start a Project": "/contact",
  "All Services": "/features",
  "Integrations": "/features/cloud-integrations",
  "Maintenance": "/features/maintenance-support",
  "Security": "/#security",
  "Support": "/contact"
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
      "Contact",
      "Start a Project"
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
          <div className="flex items-center gap-2.5">
            <svg width="24" height="24" viewBox="0 0 26 26" fill="none" aria-hidden>
              <rect x="2" y="4" width="16" height="3" rx="1.5" fill="#3b82f6" />
              <rect x="2" y="11.5" width="11" height="3" rx="1.5" fill="#1e4ed8" />
              <rect x="2" y="19" width="19" height="3" rx="1.5" fill="#38bdf8" />
              <circle cx="22" cy="12.9" r="2.1" fill="#3b82f6" />
            </svg>
            <span className="text-[1.05rem] font-medium tracking-[-0.02em] text-white">
              NUMUNIX
            </span>
          </div>
          <p className="mt-5 max-w-[34ch] text-[15px] leading-relaxed text-white/50">
            Software, websites, apps, and digital products built for real-world growth.
          </p>
          <div className="mt-8 flex gap-3">
            {[Linkedin, Instagram, Youtube].map((Icon, i) => (
              <a
                key={i}
                href="#top"
                aria-label="Social link"
                className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 text-white/60 transition-colors hover:border-[#3b82f6]/50 hover:text-white"
              >
                <Icon size={15} />
              </a>
            ))}
            <a
              href="#top"
              aria-label="X"
              className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 text-[13px] text-white/60 transition-colors hover:border-[#3b82f6]/50 hover:text-white"
            >
              X
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
              href="#top"
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
