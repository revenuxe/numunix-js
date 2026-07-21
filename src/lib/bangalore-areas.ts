export type AreaVibe = "it-hub" | "residential" | "commercial" | "old-bangalore" | "tech-corridor";

export type BangaloreArea = {
  name: string;
  slug: string;
  pincode: string;
  mainRoad: string;
  vibe: AreaVibe;
  nearbyAreaSlugs: string[];
};

export const BANGALORE_AREAS: BangaloreArea[] = [
  {
    name: "Whitefield",
    slug: "whitefield",
    pincode: "560066",
    mainRoad: "Whitefield Main Road and ITPL Road",
    vibe: "it-hub",
    nearbyAreaSlugs: ["marathahalli", "kr-puram", "bellandur"],
  },
  {
    name: "HSR Layout",
    slug: "hsr-layout",
    pincode: "560102",
    mainRoad: "Outer Ring Road, near Agara Lake",
    vibe: "residential",
    nearbyAreaSlugs: ["btm-layout", "koramangala", "bellandur"],
  },
  {
    name: "Indiranagar",
    slug: "indiranagar",
    pincode: "560038",
    mainRoad: "100 Feet Road and CMH Road",
    vibe: "commercial",
    nearbyAreaSlugs: ["domlur", "ulsoor", "cv-raman-nagar"],
  },
  {
    name: "Koramangala",
    slug: "koramangala",
    pincode: "560034",
    mainRoad: "Inner Ring Road and Sarjapur Road",
    vibe: "commercial",
    nearbyAreaSlugs: ["btm-layout", "hsr-layout", "indiranagar"],
  },
  {
    name: "Electronic City",
    slug: "electronic-city",
    pincode: "560100",
    mainRoad: "Hosur Road and NICE Road",
    vibe: "it-hub",
    nearbyAreaSlugs: ["btm-layout", "bannerghatta-road", "hsr-layout"],
  },
  {
    name: "Jayanagar",
    slug: "jayanagar",
    pincode: "560041",
    mainRoad: "Jayanagar 4th Block and Kanakapura Road",
    vibe: "residential",
    nearbyAreaSlugs: ["jp-nagar", "basavanagudi", "btm-layout"],
  },
  {
    name: "Marathahalli",
    slug: "marathahalli",
    pincode: "560037",
    mainRoad: "Outer Ring Road, near Marathahalli Bridge",
    vibe: "it-hub",
    nearbyAreaSlugs: ["whitefield", "bellandur", "kr-puram"],
  },
  {
    name: "JP Nagar",
    slug: "jp-nagar",
    pincode: "560078",
    mainRoad: "Bannerghatta Road and Sarakki",
    vibe: "residential",
    nearbyAreaSlugs: ["jayanagar", "banashankari", "bannerghatta-road"],
  },
  {
    name: "HBR Layout",
    slug: "hbr-layout",
    pincode: "560043",
    mainRoad: "Hennur Bagalur Road",
    vibe: "tech-corridor",
    nearbyAreaSlugs: ["kalyan-nagar", "nagawara", "horamavu"],
  },
  {
    name: "Nagawara",
    slug: "nagawara",
    pincode: "560045",
    mainRoad: "Outer Ring Road at the Hennur Road junction",
    vibe: "tech-corridor",
    nearbyAreaSlugs: ["hbr-layout", "kalyan-nagar", "hebbal"],
  },
  {
    name: "BTM Layout",
    slug: "btm-layout",
    pincode: "560068",
    mainRoad: "Bannerghatta Road and Outer Ring Road",
    vibe: "tech-corridor",
    nearbyAreaSlugs: ["hsr-layout", "koramangala", "jayanagar"],
  },
  {
    name: "Banashankari",
    slug: "banashankari",
    pincode: "560070",
    mainRoad: "Kanakapura Road and Bull Temple Road",
    vibe: "old-bangalore",
    nearbyAreaSlugs: ["jp-nagar", "basavanagudi", "vijayanagar"],
  },
  {
    name: "Bannerghatta Road",
    slug: "bannerghatta-road",
    pincode: "560076",
    mainRoad: "Bannerghatta Road, near Jayadeva Circle",
    vibe: "tech-corridor",
    nearbyAreaSlugs: ["jp-nagar", "electronic-city", "btm-layout"],
  },
  {
    name: "Bellandur",
    slug: "bellandur",
    pincode: "560103",
    mainRoad: "Outer Ring Road at the Sarjapur Road junction",
    vibe: "it-hub",
    nearbyAreaSlugs: ["hsr-layout", "whitefield", "sarjapur-road"],
  },
  {
    name: "Sarjapur Road",
    slug: "sarjapur-road",
    pincode: "560035",
    mainRoad: "Sarjapur Road, off the Outer Ring Road",
    vibe: "it-hub",
    nearbyAreaSlugs: ["bellandur", "hsr-layout", "whitefield"],
  },
  {
    name: "Yelahanka",
    slug: "yelahanka",
    pincode: "560064",
    mainRoad: "Bellary Road, Yelahanka New Town",
    vibe: "residential",
    nearbyAreaSlugs: ["hebbal", "vidyaranyapura", "rt-nagar"],
  },
  {
    name: "Hebbal",
    slug: "hebbal",
    pincode: "560024",
    mainRoad: "Hebbal Flyover and Bellary Road",
    vibe: "tech-corridor",
    nearbyAreaSlugs: ["yelahanka", "rt-nagar", "nagawara"],
  },
  {
    name: "Rajajinagar",
    slug: "rajajinagar",
    pincode: "560010",
    mainRoad: "Dr Rajkumar Road",
    vibe: "old-bangalore",
    nearbyAreaSlugs: ["malleshwaram", "vijayanagar", "basavanagudi"],
  },
  {
    name: "Malleshwaram",
    slug: "malleshwaram",
    pincode: "560003",
    mainRoad: "Sampige Road and 8th Cross",
    vibe: "old-bangalore",
    nearbyAreaSlugs: ["rajajinagar", "rt-nagar", "vijayanagar"],
  },
  {
    name: "Basavanagudi",
    slug: "basavanagudi",
    pincode: "560004",
    mainRoad: "Bull Temple Road and DVG Road",
    vibe: "old-bangalore",
    nearbyAreaSlugs: ["jayanagar", "banashankari", "rajajinagar"],
  },
  {
    name: "RT Nagar",
    slug: "rt-nagar",
    pincode: "560032",
    mainRoad: "RT Nagar Main Road and Hennur Road",
    vibe: "residential",
    nearbyAreaSlugs: ["hebbal", "malleshwaram", "banaswadi"],
  },
  {
    name: "Vijayanagar",
    slug: "vijayanagar",
    pincode: "560040",
    mainRoad: "Vijayanagar Metro corridor, near Attiguppe",
    vibe: "old-bangalore",
    nearbyAreaSlugs: ["rajajinagar", "malleshwaram", "banashankari"],
  },
  {
    name: "KR Puram",
    slug: "kr-puram",
    pincode: "560036",
    mainRoad: "Old Madras Road, near KR Puram Railway Station",
    vibe: "tech-corridor",
    nearbyAreaSlugs: ["whitefield", "marathahalli", "cv-raman-nagar"],
  },
  {
    name: "CV Raman Nagar",
    slug: "cv-raman-nagar",
    pincode: "560093",
    mainRoad: "Old Airport Road",
    vibe: "commercial",
    nearbyAreaSlugs: ["indiranagar", "kr-puram", "domlur"],
  },
  {
    name: "Domlur",
    slug: "domlur",
    pincode: "560071",
    mainRoad: "Old Airport Road, near Domlur flyover",
    vibe: "commercial",
    nearbyAreaSlugs: ["indiranagar", "cv-raman-nagar", "ulsoor"],
  },
  {
    name: "Ulsoor",
    slug: "ulsoor",
    pincode: "560008",
    mainRoad: "Halasuru, near Ulsoor Lake",
    vibe: "commercial",
    nearbyAreaSlugs: ["indiranagar", "domlur", "frazer-town"],
  },
  {
    name: "Frazer Town",
    slug: "frazer-town",
    pincode: "560005",
    mainRoad: "Coles Road",
    vibe: "old-bangalore",
    nearbyAreaSlugs: ["ulsoor", "richmond-town", "banaswadi"],
  },
  {
    name: "Richmond Town",
    slug: "richmond-town",
    pincode: "560025",
    mainRoad: "Richmond Road and Residency Road",
    vibe: "old-bangalore",
    nearbyAreaSlugs: ["frazer-town", "ulsoor", "basavanagudi"],
  },
  {
    name: "Kalyan Nagar",
    slug: "kalyan-nagar",
    pincode: "560043",
    mainRoad: "HRBR Layout and Banaswadi Road",
    vibe: "residential",
    nearbyAreaSlugs: ["hbr-layout", "nagawara", "horamavu"],
  },
  {
    name: "Horamavu",
    slug: "horamavu",
    pincode: "560043",
    mainRoad: "Kalyan Nagar extension, off Outer Ring Road",
    vibe: "residential",
    nearbyAreaSlugs: ["hbr-layout", "kalyan-nagar", "banaswadi"],
  },
  {
    name: "Vidyaranyapura",
    slug: "vidyaranyapura",
    pincode: "560097",
    mainRoad: "Bellary Road extension",
    vibe: "residential",
    nearbyAreaSlugs: ["yelahanka", "rt-nagar", "hebbal"],
  },
  {
    name: "Banaswadi",
    slug: "banaswadi",
    pincode: "560033",
    mainRoad: "Kammanahalli and Banaswadi Main Road",
    vibe: "residential",
    nearbyAreaSlugs: ["hbr-layout", "rt-nagar", "frazer-town"],
  },
];

export function getBangaloreArea(slug: string): BangaloreArea | undefined {
  return BANGALORE_AREAS.find((area) => area.slug === slug);
}

export function getNearbyAreas(area: BangaloreArea): BangaloreArea[] {
  return area.nearbyAreaSlugs
    .map((slug) => getBangaloreArea(slug))
    .filter((a): a is BangaloreArea => Boolean(a));
}

const VIBE_INTRO: Record<AreaVibe, (area: BangaloreArea) => string> = {
  "it-hub": (a) =>
    `${a.name} is one of Bangalore's busiest IT corridors, packed with tech parks, startups and the professionals who keep them running. That also means a steady stream of laptops needing screen replacements, battery swaps and quick software fixes to get back to work.`,
  "tech-corridor": (a) =>
    `${a.name} sits along ${a.mainRoad}, one of the city's key connector routes between Bangalore's tech clusters. With so many IT commuters and home offices in the neighbourhood, ${a.name} sees a steady flow of laptops that need a reliable repair, not a replacement.`,
  residential: (a) =>
    `${a.name} is one of Bangalore's well-established residential neighbourhoods along ${a.mainRoad}, home to families, students and working professionals who'd rather get a laptop repaired properly than pay for a costly replacement.`,
  commercial: (a) =>
    `${a.name} is one of Bangalore's most walkable commercial and residential neighbourhoods, centred around ${a.mainRoad}. Between the offices, cafes and apartments here, laptop issues come up fast — and ${a.name} residents want a certified repair without the hassle of hunting for a trustworthy technician.`,
  "old-bangalore": (a) =>
    `${a.name} is one of Bangalore's classic, tree-lined neighbourhoods around ${a.mainRoad}, where multi-generational households and long-time residents want a dependable local option to get an old laptop working again.`,
};

export type AreaCopy = {
  intro: string[];
  whyBullets: string[];
  faqs: [string, string][];
};

export function buildAreaCopy(area: BangaloreArea): AreaCopy {
  const nearby = getNearbyAreas(area);
  const nearbyNames = nearby.map((a) => a.name);
  const nearbyList =
    nearbyNames.length > 1
      ? `${nearbyNames.slice(0, -1).join(", ")} and ${nearbyNames[nearbyNames.length - 1]}`
      : (nearbyNames[0] ?? "nearby neighbourhoods");

  const intro = [
    VIBE_INTRO[area.vibe](area),
    `Numunix offers free doorstep laptop repair pickup across ${area.name} (PIN ${area.pincode}) and neighbouring areas like ${nearbyList}. Book online, get a transparent diagnosis and price, and our certified engineer collects the device, repairs it and returns it fully tested — no need to step outside ${area.name}.`,
  ];

  const whyBullets = [
    `Certified repair engineers cover every street in ${area.name}, ${area.mainRoad} included.`,
    `Transparent, upfront pricing — no lowball guesses when you repair a laptop in ${area.name}.`,
    `Genuine or certified-compatible parts, backed by a warranty on every repair.`,
    `Free doorstep pickup and drop once your ${area.name} repair is complete.`,
  ];

  const faqs: [string, string][] = [
    [
      `Do you offer laptop repair pickup in ${area.name}?`,
      `Yes. Numunix offers free doorstep laptop repair pickup across ${area.name} (PIN ${area.pincode}) and nearby localities including ${nearbyList}. Book online and choose a pickup slot that works for you.`,
    ],
    [
      `How fast can I get my laptop repaired in ${area.name}?`,
      `Most ${area.name} repairs are diagnosed within 24 hours of pickup, with most common repairs completed in 24-48 hours. We'll confirm the exact timeline once your device is diagnosed.`,
    ],
  ];

  return { intro, whyBullets, faqs };
}
