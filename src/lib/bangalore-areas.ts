export type BangaloreArea = { name: string; slug: string };

export const BANGALORE_AREAS: BangaloreArea[] = [
  { name: "Whitefield", slug: "whitefield" },
  { name: "HSR Layout", slug: "hsr-layout" },
  { name: "Indiranagar", slug: "indiranagar" },
  { name: "Koramangala", slug: "koramangala" },
  { name: "Electronic City", slug: "electronic-city" },
  { name: "Jayanagar", slug: "jayanagar" },
  { name: "Marathahalli", slug: "marathahalli" },
  { name: "JP Nagar", slug: "jp-nagar" },
  { name: "HBR Layout", slug: "hbr-layout" },
  { name: "Nagawara", slug: "nagawara" },
  { name: "BTM Layout", slug: "btm-layout" },
  { name: "Banashankari", slug: "banashankari" },
  { name: "Bannerghatta Road", slug: "bannerghatta-road" },
  { name: "Bellandur", slug: "bellandur" },
  { name: "Sarjapur Road", slug: "sarjapur-road" },
  { name: "Yelahanka", slug: "yelahanka" },
  { name: "Hebbal", slug: "hebbal" },
  { name: "Rajajinagar", slug: "rajajinagar" },
  { name: "Malleshwaram", slug: "malleshwaram" },
  { name: "Basavanagudi", slug: "basavanagudi" },
  { name: "RT Nagar", slug: "rt-nagar" },
  { name: "Vijayanagar", slug: "vijayanagar" },
  { name: "KR Puram", slug: "kr-puram" },
  { name: "CV Raman Nagar", slug: "cv-raman-nagar" },
  { name: "Domlur", slug: "domlur" },
  { name: "Ulsoor", slug: "ulsoor" },
  { name: "Frazer Town", slug: "frazer-town" },
  { name: "Richmond Town", slug: "richmond-town" },
  { name: "Kalyan Nagar", slug: "kalyan-nagar" },
  { name: "Horamavu", slug: "horamavu" },
  { name: "Vidyaranyapura", slug: "vidyaranyapura" },
  { name: "Banaswadi", slug: "banaswadi" },
];

export function getBangaloreArea(slug: string): BangaloreArea | undefined {
  return BANGALORE_AREAS.find((area) => area.slug === slug);
}
