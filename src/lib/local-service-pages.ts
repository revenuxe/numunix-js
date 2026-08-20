export type LocalServicePage = {
  serviceSlug: string;
  slug: string;
  location: string;
  title: string;
  description: string;
  localContext: string;
  coverage: string[];
  faqs: [string, string][];
};

export const LOCAL_SERVICE_PAGES: LocalServicePage[] = [
  {
    serviceSlug: "cctv-installation",
    slug: "hbr-layout",
    location: "HBR Layout",
    title: "CCTV Installation in HBR Layout",
    description:
      "CCTV installation planning, setup, recording and mobile viewing support for homes, shops and offices in HBR Layout, Bengaluru.",
    localContext:
      "HBR Layout properties range from independent homes to apartment blocks, shops and small offices along Hennur Bagalur Road. Camera placement needs to account for entry points, parking, shared access and lighting rather than simply adding cameras.",
    coverage: [
      "Home entrances, gates and parking",
      "Shops and office access points",
      "Recorder, storage and mobile-viewing setup",
    ],
    faqs: [
      [
        "Do you install CCTV for HBR Layout homes and shops?",
        "Yes. Share the property type, priority areas and existing equipment so the right coverage plan can be discussed.",
      ],
      [
        "Can I view cameras on my phone?",
        "Supported systems can be configured for secure remote viewing and tested with the owner after setup.",
      ],
    ],
  },
  {
    serviceSlug: "cctv-installation",
    slug: "nagawara",
    location: "Nagawara",
    title: "CCTV Installation in Nagawara",
    description:
      "CCTV installation and existing-system support for Nagawara homes, offices and shops, including recording and remote viewing.",
    localContext:
      "Nagawara sits at the Outer Ring Road and Hennur Road junction, where homes, retail spaces and offices have different access and cable-routing needs. A site discussion helps identify useful views and avoid blind spots.",
    coverage: [
      "Entry and perimeter coverage",
      "Cabling and recorder placement",
      "CCTV troubleshooting and maintenance",
    ],
    faqs: [
      [
        "Can you assess an existing Nagawara CCTV system?",
        "Yes. Cameras, power, cabling, recording and app access can be checked before a repair or upgrade is recommended.",
      ],
      [
        "How many cameras are needed?",
        "The count depends on the property layout, entry points, lighting and level of detail required.",
      ],
    ],
  },
  {
    serviceSlug: "cctv-installation",
    slug: "kammanahalli",
    location: "Kammanahalli",
    title: "CCTV Installation in Kammanahalli",
    description:
      "Practical CCTV installation, recording and mobile-viewing setup for homes, shops and offices in Kammanahalli, Bengaluru.",
    localContext:
      "Kammanahalli's mix of residences and busy commercial frontage makes camera angle, night lighting and cable protection important parts of a useful CCTV plan.",
    coverage: [
      "Home and apartment common-area planning",
      "Shop and office camera coverage",
      "Remote viewing and playback checks",
    ],
    faqs: [
      [
        "Can existing cameras be repositioned?",
        "Often yes. Mounting, cabling, power and the desired view are checked before moving a camera.",
      ],
      [
        "Do you repair CCTV systems installed by another provider?",
        "Yes. The system is assessed first and the practical repair or upgrade options are explained.",
      ],
    ],
  },
  {
    serviceSlug: "business-amc",
    slug: "north-bangalore",
    location: "North Bangalore",
    title: "Computer AMC Services in North Bangalore",
    description:
      "Computer annual maintenance and IT support planning for North Bangalore businesses, including workstations, networking, printers and agreed CCTV assets.",
    localContext:
      "North Bangalore businesses often operate across office, retail and service locations. An AMC can be scoped around the actual devices, network dependencies and agreed support priorities instead of a one-size-fits-all plan.",
    coverage: [
      "Workstation and laptop maintenance",
      "Network, printer and agreed CCTV support",
      "Preventive checks and documented support scope",
    ],
    faqs: [
      [
        "What can a computer AMC include?",
        "The scope can include agreed devices, maintenance, troubleshooting and onsite or remote support; the plan should state the included assets and terms.",
      ],
      [
        "Can an AMC cover networking and CCTV?",
        "Yes, when those assets and support expectations are included in the agreed scope.",
      ],
    ],
  },
];

export function getLocalServicePage(serviceSlug: string, slug: string) {
  return LOCAL_SERVICE_PAGES.find((page) => page.serviceSlug === serviceSlug && page.slug === slug);
}
