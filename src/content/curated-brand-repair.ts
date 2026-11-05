import { BRAND_REPAIR_ADVICE } from "./brand-repair-advice";
import { BRAND_REPAIR_FOCUS } from "./brand-repair-focus";
import { MOBILE_EDITORIAL } from "./mobile-brand-editorial";
import { LAPTOP_EDITORIAL } from "./laptop-brand-editorial";
import { CCTV_EDITORIAL } from "./cctv-brand-editorial";
import { washerRepairGuidance } from "./washer-repair-guidance";

export type BrandPageEditorial = {
  topic: string;
  subject: string;
  paragraphs: string[];
  example: string;
  decision: { title: string; body: string };
  handover: { title: string; body: string };
};

type BrandPage = {
  service: string; brand: string; slug: string; title: string; intro: string;
  description: string; modelIntro: string; diagnosticTitle: string; diagnosticBody: string;
  faults: { title: string; label: string; body: string }[];
  faqs: string[][];
  acGuidance?: { subject: string; paragraphs: string[]; example: string };
  guidance?: { subject: string; paragraphs: string[]; example: string };
};

// Every supported page must have real editorial coverage. Never silently publish a name-swapped fallback.
export function curateBrandRepair<T extends BrandPage>(page: T): T & { editorial: BrandPageEditorial } {
  const advice = BRAND_REPAIR_ADVICE.find(item => item.service === page.service && item.slug === page.slug);
  if (!advice) throw new Error(`Missing curated brand advice: ${page.service}/${page.slug}`);
  const focus = BRAND_REPAIR_FOCUS[page.service]?.[page.slug];
  const mobile = page.service === "Mobile Repair" ? MOBILE_EDITORIAL[page.slug] : undefined;
  const laptop = page.service === "Laptop Repair" ? LAPTOP_EDITORIAL[page.slug] : undefined;
  const cctv = page.service === "CCTV Installation & Repair" ? CCTV_EDITORIAL[page.slug] : undefined;
  const guidance = page.acGuidance ?? page.guidance ?? (page.service === "Washing Machine Repair" ? washerRepairGuidance(page.slug) : undefined);
  const topic = focus?.topic ?? page.diagnosticTitle.replace(/\?$/, "");
  const diagnosticBody = mobile?.focus ?? laptop?.focus ?? cctv?.focus ?? page.diagnosticBody;
  const subject = mobile?.subject ?? guidance?.subject ?? topic;
  const paragraphs = guidance?.paragraphs.slice(1) ?? [diagnosticBody];
  const example = mobile?.example ?? laptop?.example ?? cctv?.example ?? guidance?.example;
  if (!example) throw new Error(`Missing brand enquiry example: ${page.service}/${page.slug}`);
  const serviceName = page.service === "AC Service & Repair" ? "AC repair" : page.service === "CCTV Installation & Repair" ? "CCTV repair" : page.service.toLowerCase();
  const description = focus
    ? `Independent ${page.brand} ${serviceName} in Bangalore. Discuss ${focus.symptom}, model-specific diagnosis and an estimate before approving work.`
    : page.description;
  return {
    ...page,
    description,
    intro: `${page.brand} ${serviceName} in Bangalore. ${diagnosticBody}`,
    diagnosticTitle: topic,
    diagnosticBody,
    faults: [
      { title: topic, label: "OBSERVE THE FAULT", body: diagnosticBody },
      { title: advice.decision.title, label: "BEFORE PARTS OR RESETS", body: advice.decision.body },
      { title: advice.handover.title, label: "CHECK THE REPAIRED FUNCTION", body: advice.handover.body },
    ],
    faqs: [
      page.faqs[0] ?? [],
      [advice.decision.title, advice.decision.body],
      [advice.handover.title, advice.handover.body],
      ...page.faqs.filter(([question]) => /cost|warranty|data stay|password|gas refill|water resistant/.test(question?.toLowerCase() ?? "")).slice(0, 4),
    ],
    editorial: { topic, subject, paragraphs, example, decision: advice.decision, handover: advice.handover },
  };
}