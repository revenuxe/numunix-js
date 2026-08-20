export type AreaVibe = "it-hub" | "residential" | "commercial" | "old-bangalore" | "tech-corridor";

export type BangaloreArea = {
  name: string;
  slug: string;
  pincode: string;
  mainRoad: string;
  vibe: AreaVibe;
  // A short, area-specific line of local colour used to open that area's
  // page. Written per area (not derived from `vibe`) so the 30+ area pages
  // don't read as one template with the name swapped in — search engines
  // were treating the old shared-per-vibe paragraphs as near-duplicate
  // content and leaving most of these pages uncrawled.
  blurb: string;
  nearbyAreaSlugs: string[];
};

export const BANGALORE_AREAS: BangaloreArea[] = [
  {
    name: "Whitefield",
    slug: "whitefield",
    pincode: "560066",
    mainRoad: "Whitefield Main Road and ITPL Road",
    vibe: "it-hub",
    blurb:
      "Whitefield grew from a quiet colonial-era settlement into one of Bangalore's largest IT corridors, anchored by ITPL and the tech campuses lining Whitefield Main Road.",
    nearbyAreaSlugs: ["marathahalli", "kr-puram", "bellandur"],
  },
  {
    name: "HSR Layout",
    slug: "hsr-layout",
    pincode: "560102",
    mainRoad: "Outer Ring Road, near Agara Lake",
    vibe: "residential",
    blurb:
      "HSR Layout is one of Bangalore's most sought-after planned neighbourhoods, its numbered sectors built up around Agara Lake with a dense mix of apartments, startups and cafes.",
    nearbyAreaSlugs: ["btm-layout", "koramangala", "bellandur"],
  },
  {
    name: "Indiranagar",
    slug: "indiranagar",
    pincode: "560038",
    mainRoad: "100 Feet Road and CMH Road",
    vibe: "commercial",
    blurb:
      "Indiranagar's 100 Feet Road and CMH Road are lined with cafes, boutiques and offices, making it one of Bangalore's busiest commercial-residential stretches.",
    nearbyAreaSlugs: ["domlur", "ulsoor", "cv-raman-nagar"],
  },
  {
    name: "Koramangala",
    slug: "koramangala",
    pincode: "560034",
    mainRoad: "Inner Ring Road and Sarjapur Road",
    vibe: "commercial",
    blurb:
      "Koramangala's numbered blocks along the Inner Ring Road have made it a magnet for startups, co-working spaces and young professionals.",
    nearbyAreaSlugs: ["btm-layout", "hsr-layout", "indiranagar"],
  },
  {
    name: "Electronic City",
    slug: "electronic-city",
    pincode: "560100",
    mainRoad: "Hosur Road and NICE Road",
    vibe: "it-hub",
    blurb:
      "Electronic City's sprawling tech parks along Hosur Road are home to some of Bangalore's largest IT and engineering employers.",
    nearbyAreaSlugs: ["btm-layout", "bannerghatta-road", "hsr-layout"],
  },
  {
    name: "Jayanagar",
    slug: "jayanagar",
    pincode: "560041",
    mainRoad: "Jayanagar 4th Block and Kanakapura Road",
    vibe: "residential",
    blurb:
      "Jayanagar is one of Bangalore's oldest planned residential layouts, its numbered blocks built around the 4th Block shopping complex and Kanakapura Road.",
    nearbyAreaSlugs: ["jp-nagar", "basavanagudi", "btm-layout"],
  },
  {
    name: "Marathahalli",
    slug: "marathahalli",
    pincode: "560037",
    mainRoad: "Outer Ring Road, near Marathahalli Bridge",
    vibe: "it-hub",
    blurb:
      "Marathahalli sits at the junction of the Outer Ring Road and Marathahalli Bridge, a gateway between the Whitefield and Bellandur tech corridors.",
    nearbyAreaSlugs: ["whitefield", "bellandur", "kr-puram"],
  },
  {
    name: "JP Nagar",
    slug: "jp-nagar",
    pincode: "560078",
    mainRoad: "Bannerghatta Road and Sarakki",
    vibe: "residential",
    blurb:
      "JP Nagar's phases spread along Bannerghatta Road and Sarakki, a well-settled residential area popular with families and professionals commuting to nearby tech parks.",
    nearbyAreaSlugs: ["jayanagar", "banashankari", "bannerghatta-road"],
  },
  {
    name: "HBR Layout",
    slug: "hbr-layout",
    pincode: "560043",
    mainRoad: "Hennur Bagalur Road",
    vibe: "tech-corridor",
    blurb:
      "HBR Layout runs along Hennur Bagalur Road, a fast-growing residential belt feeding the tech offices further along the Outer Ring Road.",
    nearbyAreaSlugs: ["kalyan-nagar", "nagawara", "horamavu"],
  },
  {
    name: "Nagawara",
    slug: "nagawara",
    pincode: "560045",
    mainRoad: "Outer Ring Road at the Hennur Road junction",
    vibe: "tech-corridor",
    blurb:
      "Nagawara sits right at the Outer Ring Road-Hennur Road junction, a busy transit point linking north Bangalore's residential areas to the tech corridor.",
    nearbyAreaSlugs: ["hbr-layout", "kalyan-nagar", "hebbal"],
  },
  {
    name: "Banaswadi",
    slug: "banaswadi",
    pincode: "560043",
    mainRoad: "Banaswadi Main Road and CMR Road",
    vibe: "residential",
    blurb:
      "Banaswadi is an established north-east Bengaluru residential and commercial area, connected to nearby HRBR Layout, Kalyan Nagar and Outer Ring Road corridors.",
    nearbyAreaSlugs: ["hbr-layout", "kalyan-nagar", "horamavu"],
  },
  {
    name: "Kammanahalli",
    slug: "kammanahalli",
    pincode: "560084",
    mainRoad: "Kammanahalli Main Road and Outer Ring Road",
    vibe: "residential",
    blurb:
      "Kammanahalli is a busy north-east Bengaluru neighbourhood with homes, shops and offices along Kammanahalli Main Road, close to Banaswadi and HRBR Layout.",
    nearbyAreaSlugs: ["hbr-layout", "kalyan-nagar", "banaswadi"],
  },
  {
    name: "BTM Layout",
    slug: "btm-layout",
    pincode: "560068",
    mainRoad: "Bannerghatta Road and Outer Ring Road",
    vibe: "tech-corridor",
    blurb:
      "BTM Layout, where Bannerghatta Road meets the Outer Ring Road, is a dense residential and commercial hub next door to Koramangala and HSR Layout's tech offices.",
    nearbyAreaSlugs: ["hsr-layout", "koramangala", "jayanagar"],
  },
  {
    name: "Banashankari",
    slug: "banashankari",
    pincode: "560070",
    mainRoad: "Kanakapura Road and Bull Temple Road",
    vibe: "old-bangalore",
    blurb:
      "Banashankari is a well-established south Bangalore neighbourhood around Kanakapura Road and Bull Temple Road, known for its temple, market and long-time residents.",
    nearbyAreaSlugs: ["jp-nagar", "basavanagudi", "vijayanagar"],
  },
  {
    name: "Bannerghatta Road",
    slug: "bannerghatta-road",
    pincode: "560076",
    mainRoad: "Bannerghatta Road, near Jayadeva Circle",
    vibe: "tech-corridor",
    blurb:
      "Bannerghatta Road runs past Jayadeva Circle through a corridor of hospitals, apartments and offices connecting JP Nagar to Electronic City.",
    nearbyAreaSlugs: ["jp-nagar", "electronic-city", "btm-layout"],
  },
  {
    name: "Bellandur",
    slug: "bellandur",
    pincode: "560103",
    mainRoad: "Outer Ring Road at the Sarjapur Road junction",
    vibe: "it-hub",
    blurb:
      "Bellandur's stretch of the Outer Ring Road is packed with IT parks and high-rise apartments, making it one of Bangalore's densest tech corridors.",
    nearbyAreaSlugs: ["hsr-layout", "whitefield", "sarjapur-road"],
  },
  {
    name: "Sarjapur Road",
    slug: "sarjapur-road",
    pincode: "560035",
    mainRoad: "Sarjapur Road, off the Outer Ring Road",
    vibe: "it-hub",
    blurb:
      "Sarjapur Road branches off the Outer Ring Road into a fast-growing corridor of tech campuses and residential complexes.",
    nearbyAreaSlugs: ["bellandur", "hsr-layout", "whitefield"],
  },
  {
    name: "Yelahanka",
    slug: "yelahanka",
    pincode: "560064",
    mainRoad: "Bellary Road, Yelahanka New Town",
    vibe: "residential",
    blurb:
      "Yelahanka New Town, along Bellary Road in north Bangalore, is a well-planned residential area popular with families and professionals working near the airport corridor.",
    nearbyAreaSlugs: ["hebbal", "vidyaranyapura", "rt-nagar"],
  },
  {
    name: "Hebbal",
    slug: "hebbal",
    pincode: "560024",
    mainRoad: "Hebbal Flyover and Bellary Road",
    vibe: "tech-corridor",
    blurb:
      "Hebbal, at the flyover junction on Bellary Road, is a fast-developing hub of offices and apartments linking north Bangalore to the tech corridor.",
    nearbyAreaSlugs: ["yelahanka", "rt-nagar", "nagawara"],
  },
  {
    name: "Rajajinagar",
    slug: "rajajinagar",
    pincode: "560010",
    mainRoad: "Dr Rajkumar Road",
    vibe: "old-bangalore",
    blurb:
      "Rajajinagar, centred on Dr Rajkumar Road, is one of west Bangalore's established residential and commercial neighbourhoods.",
    nearbyAreaSlugs: ["malleshwaram", "vijayanagar", "basavanagudi"],
  },
  {
    name: "Malleshwaram",
    slug: "malleshwaram",
    pincode: "560003",
    mainRoad: "Sampige Road and 8th Cross",
    vibe: "old-bangalore",
    blurb:
      "Malleshwaram's Sampige Road and 8th Cross are lined with traditional homes, markets and some of Bangalore's oldest institutions.",
    nearbyAreaSlugs: ["rajajinagar", "rt-nagar", "vijayanagar"],
  },
  {
    name: "Basavanagudi",
    slug: "basavanagudi",
    pincode: "560004",
    mainRoad: "Bull Temple Road and DVG Road",
    vibe: "old-bangalore",
    blurb:
      "Basavanagudi, home to the Bull Temple and DVG Road, is one of Bangalore's oldest and most traditional neighbourhoods.",
    nearbyAreaSlugs: ["jayanagar", "banashankari", "rajajinagar"],
  },
  {
    name: "RT Nagar",
    slug: "rt-nagar",
    pincode: "560032",
    mainRoad: "RT Nagar Main Road and Hennur Road",
    vibe: "residential",
    blurb:
      "RT Nagar, along RT Nagar Main Road and Hennur Road, is a well-settled residential neighbourhood in north-central Bangalore.",
    nearbyAreaSlugs: ["hebbal", "malleshwaram", "banaswadi"],
  },
  {
    name: "Vijayanagar",
    slug: "vijayanagar",
    pincode: "560040",
    mainRoad: "Vijayanagar Metro corridor, near Attiguppe",
    vibe: "old-bangalore",
    blurb:
      "Vijayanagar, served by its own metro corridor near Attiguppe, is a busy residential and market neighbourhood in west Bangalore.",
    nearbyAreaSlugs: ["rajajinagar", "malleshwaram", "banashankari"],
  },
  {
    name: "KR Puram",
    slug: "kr-puram",
    pincode: "560036",
    mainRoad: "Old Madras Road, near KR Puram Railway Station",
    vibe: "tech-corridor",
    blurb:
      "KR Puram, around the railway station on Old Madras Road, is a key transit point linking east Bangalore's residential areas to the IT corridor.",
    nearbyAreaSlugs: ["whitefield", "marathahalli", "cv-raman-nagar"],
  },
  {
    name: "CV Raman Nagar",
    slug: "cv-raman-nagar",
    pincode: "560093",
    mainRoad: "Old Airport Road",
    vibe: "commercial",
    blurb:
      "CV Raman Nagar, along Old Airport Road, mixes defence establishments, residential layouts and offices in east Bangalore.",
    nearbyAreaSlugs: ["indiranagar", "kr-puram", "domlur"],
  },
  {
    name: "Domlur",
    slug: "domlur",
    pincode: "560071",
    mainRoad: "Old Airport Road, near Domlur flyover",
    vibe: "commercial",
    blurb:
      "Domlur, near the Old Airport Road flyover, is a compact commercial and residential neighbourhood right next to Indiranagar's business district.",
    nearbyAreaSlugs: ["indiranagar", "cv-raman-nagar", "ulsoor"],
  },
  {
    name: "Ulsoor",
    slug: "ulsoor",
    pincode: "560008",
    mainRoad: "Halasuru, near Ulsoor Lake",
    vibe: "commercial",
    blurb:
      "Ulsoor, around Halasuru and Ulsoor Lake, is a mixed residential and commercial neighbourhood close to Bangalore's central business district.",
    nearbyAreaSlugs: ["indiranagar", "domlur", "frazer-town"],
  },
  {
    name: "Frazer Town",
    slug: "frazer-town",
    pincode: "560005",
    mainRoad: "Coles Road",
    vibe: "old-bangalore",
    blurb:
      "Frazer Town, along Coles Road, is one of Bangalore's older, tree-lined residential neighbourhoods close to the city centre.",
    nearbyAreaSlugs: ["ulsoor", "richmond-town", "banaswadi"],
  },
  {
    name: "Richmond Town",
    slug: "richmond-town",
    pincode: "560025",
    mainRoad: "Richmond Road and Residency Road",
    vibe: "old-bangalore",
    blurb:
      "Richmond Town, around Richmond Road and Residency Road, is a quiet, established residential pocket close to Bangalore's central business district.",
    nearbyAreaSlugs: ["frazer-town", "ulsoor", "basavanagudi"],
  },
  {
    name: "Kalyan Nagar",
    slug: "kalyan-nagar",
    pincode: "560043",
    mainRoad: "HRBR Layout and Banaswadi Road",
    vibe: "residential",
    blurb:
      "Kalyan Nagar, part of the HRBR Layout off Banaswadi Road, is a well-settled residential neighbourhood in north-east Bangalore.",
    nearbyAreaSlugs: ["hbr-layout", "nagawara", "horamavu"],
  },
  {
    name: "Horamavu",
    slug: "horamavu",
    pincode: "560043",
    mainRoad: "Kalyan Nagar extension, off Outer Ring Road",
    vibe: "residential",
    blurb:
      "Horamavu, extending off Kalyan Nagar along the Outer Ring Road, is a fast-growing residential neighbourhood in north-east Bangalore.",
    nearbyAreaSlugs: ["hbr-layout", "kalyan-nagar", "banaswadi"],
  },
  {
    name: "Vidyaranyapura",
    slug: "vidyaranyapura",
    pincode: "560097",
    mainRoad: "Bellary Road extension",
    vibe: "residential",
    blurb:
      "Vidyaranyapura, along the Bellary Road extension, is a developing residential neighbourhood in north Bangalore.",
    nearbyAreaSlugs: ["yelahanka", "rt-nagar", "hebbal"],
  },
  {
    name: "Banaswadi",
    slug: "banaswadi",
    pincode: "560033",
    mainRoad: "Kammanahalli and Banaswadi Main Road",
    vibe: "residential",
    blurb:
      "Banaswadi, around Kammanahalli and Banaswadi Main Road, is a busy residential neighbourhood known for its markets and eateries.",
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

// Secondary, vibe-based sentence appended after each area's unique `blurb`.
// Since the opening sentence is now written per area, sibling areas sharing
// a vibe no longer end up with an identical intro paragraph.
const VIBE_FOLLOWUP: Record<AreaVibe, (area: BangaloreArea) => string> = {
  "it-hub": (a) =>
    `With so many tech park employees nearby, ${a.name} sees a steady stream of laptops needing screen replacements, battery swaps and quick software fixes to get back to work.`,
  "tech-corridor": (a) =>
    `With so many IT commuters and home offices in the neighbourhood, ${a.name} sees a steady flow of laptops that need a reliable repair, not a replacement.`,
  residential: (a) =>
    `${a.name} is home to families, students and working professionals who'd rather get a laptop repaired properly than pay for a costly replacement.`,
  commercial: (a) =>
    `Between the offices, cafes and apartments here, laptop issues come up fast — and ${a.name} residents want a certified repair without the hassle of hunting for a trustworthy technician.`,
  "old-bangalore": (a) =>
    `Multi-generational households and long-time ${a.name} residents want a dependable local option to get an old laptop working again rather than replacing it.`,
};

const AREA_FAQ_EXTRA: Record<AreaVibe, (area: BangaloreArea) => [string, string]> = {
  "it-hub": (a) => [
    `Can you repair a work laptop from a ${a.name} tech park during the day?`,
    `Yes — book a pickup slot that fits your work schedule and we'll collect the laptop from your ${a.name} office or home, diagnose it, and keep you updated without disrupting your day.`,
  ],
  "tech-corridor": (a) => [
    `Do you cover home offices along ${a.mainRoad} in ${a.name}?`,
    `Yes, every address along ${a.mainRoad} and the rest of ${a.name} is covered by our free doorstep pickup.`,
  ],
  residential: (a) => [
    `Is doorstep laptop repair available for families in ${a.name}?`,
    `Yes — we regularly collect laptops from homes across ${a.name}, diagnose the issue on the spot with a transparent quote, and repair it with a warranty before dropping it back.`,
  ],
  commercial: (a) => [
    `Can I get a laptop repaired near the shops and offices on ${a.mainRoad}?`,
    `Yes, ${a.mainRoad} and the surrounding ${a.name} area are within our regular doorstep pickup zone.`,
  ],
  "old-bangalore": (a) => [
    `Do you repair older laptop models for long-time ${a.name} residents?`,
    `Yes — our technicians regularly service older laptop models, sourcing genuine or certified-compatible parts even for discontinued models, with free pickup from anywhere in ${a.name}.`,
  ],
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
    `${area.blurb} ${VIBE_FOLLOWUP[area.vibe](area)}`,
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
    AREA_FAQ_EXTRA[area.vibe](area),
  ];

  return { intro, whyBullets, faqs };
}
