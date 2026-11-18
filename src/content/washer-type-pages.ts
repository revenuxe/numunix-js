import { REPAIR_PAGES, repairPageHref, type RepairService } from "./repair-services";

type Fault = { title: string; label: string; body: string };
export type WasherTypePage = {
  slug: string;
  name: string;
  machineType: string;
  description: string;
  intro: string;
  assessmentIntro: string;
  faults: Fault[];
  scope: { title: string; body: string }[];
  preparation: string[];
  faqs: [string, string][];
};

// Specific enquiry guidance, not promised diagnoses, availability or repair outcomes.
export const WASHER_TYPE_PAGES: WasherTypePage[] = [
  {
    slug: "front-load-washing-machine-repair",
    name: "Front-Load Washing Machine Repair",
    machineType: "Front-load",
    description: "Front-load washing machine repair in Bangalore for door, drainage, spin and leak faults. Discuss model-specific assessment, parts and a clear repair estimate.",
    intro: "Independent front-load washing machine repair enquiries in Bangalore. Share door, drainage, spin or leak symptoms, discuss the assessment and review the estimate before approving work.",
    assessmentIntro: "A front-load washer can stop with water in the drum, keep its door locked or interrupt a spin programme. These symptoms can overlap, so describe the sequence rather than choosing a replacement part. Include the full model, programme, display message and whether the drum drained before the interruption. The assessment should explain the findings and proposed work for that appliance.",
    faults: [
      { title: "Door stays locked after a cycle", label: "DOOR & INTERLOCK", body: "Tell us whether the programme finished, water remains visible and the display still responds. Include any power interruption and the complete message. Do not force the handle or try an emergency release without the instructions for your exact model and safe conditions." },
      { title: "Water remains in the drum", label: "DRAINAGE", body: "Describe the last completed stage and whether the washer makes a new sound when it attempts to drain. A drain warning does not identify the pump as the cause. Avoid opening a filter with hot water inside; discuss safe assessment arrangements if the machine cannot be emptied normally." },
      { title: "Leaks at the door or detergent drawer", label: "LEAKS & SEALS", body: "Record where water first appears and whether it starts during filling, tumbling or draining. Mention a recent detergent change, trapped clothing or a visible change to the door seal. A photo of the first wet area is more useful than running repeated leaking cycles." },
      { title: "Spin stops or clothes remain soaked", label: "SPIN & BALANCE", body: "Explain whether the washer drained, whether the drum attempts to accelerate and if the issue occurs with every load. Include the selected spin setting and a description of the load. Assessment should distinguish the reported behaviour before motor, drive or control work is proposed." },
      { title: "Heavy vibration or a rumbling drum", label: "DRUM & INSTALLATION", body: "Note whether the sound occurs while tumbling or only at faster spin speeds. Mention a recent delivery, relocation or installation and whether the machine moves across the floor. Do not move a heavy washer alone or remove panels to investigate the noise." },
      { title: "Programme stalls or water does not warm", label: "PROGRAMME & TEMPERATURE", body: "Share the programme, selected temperature and the point where progress changes. Include the full error message rather than a shortened code. Programme duration and temperature behaviour vary by model; internal heater, sensor and electrical checks belong in a qualified assessment." },
    ],
    scope: [
      { title: "Door, seal and water path", body: "Describe the door condition and where water first appears. Ask how the findings distinguish a sealing problem from another water-path issue before approving parts. Confirm any door, drawer or hose work in the written scope." },
      { title: "Drum movement and spin", body: "Share load conditions, whether drainage completed and the stage where vibration starts. The proposal should explain what was found, which mechanical or drive checks are needed and how the affected function would be reviewed afterwards." },
      { title: "Washer-dryers and fitted installations", body: "If the machine also dries, identify washing and drying symptoms separately. Mention a stacked dryer, fitted cabinet or tight utility space. Confirm model coverage, safe access and any separate arrangements before a visit is agreed." },
    ],
    preparation: [
      "Share the model and serial label, programme name, temperature selection and full display message.",
      "Note whether water remains inside and whether the door is locked. Do not force it open.",
      "Describe the first location of any leak and whether it begins while filling, washing or draining.",
      "Mention a stacked dryer, fitted cabinet, recent relocation or earlier repair without moving the washer yourself.",
      "Share your Bangalore locality and access restrictions. Stop use for leaks near electrics, a burning smell or electrical tripping; avoid wet plugs.",
    ],
    faqs: [
      ["How much does front-load washing machine repair in Bangalore cost?", "The full model, diagnosed fault, labour, access and compatible parts determine the estimate. Confirm assessment charges, proposed parts, exclusions and any further inspection before approval. A locked door or error code alone is not a reliable basis for a fixed repair price."],
      ["Can a front-load washer be assessed at home?", "Share your Bangalore locality, model and installation details to discuss a visit. Mention stacked equipment or restricted access. Confirm coverage, visit charges and what can be assessed on site; some work may need specialist facilities or a separate arrangement."],
      ["Why is my front-load washer door still locked?", "Tell us whether the cycle ended and whether water remains in the drum. The reason depends on the appliance and its condition. Follow only the permitted user instructions for your model and do not force the handle or bypass the lock."],
      ["Does a rumbling spin mean the bearings need replacing?", "A sound description alone cannot confirm a bearing fault. Explain when the noise occurs, the load and any recent installation changes. Ask which assessment findings support the repair and whether the proposed work is practical for the exact machine."],
      ["Can I enquire about Bosch, IFB, LG or Samsung front-load washers?", "Yes, share the complete model and machine type. The brand links on this page provide further model-identification and repair guidance, including other listed brands. Confirm compatibility and parts availability for your exact washer; a brand listing does not cover every model."],
      ["Can you assess the drying function of a washer-dryer?", "Include the full washer-dryer model and identify whether the fault affects washing, spinning, drying or more than one function. Confirm support for the drying function and any separate checks before booking."],
      ["Is this manufacturer-authorized repair?", "Numunix is an independent repair provider. Check existing manufacturer cover before authorizing independent work. For official warranty service, contact the appliance manufacturer directly."],
      ["What should be checked after a front-load repair?", "Ask which affected functions were reviewed, such as door operation, drainage, spin or the repaired water path where relevant. Confirm any remaining limitations, aftercare and written labour or parts terms. Keep the diagnosis, approval and completed-work details."],
    ],
  },
  {
    slug: "top-load-washing-machine-repair",
    name: "Top-Load Washing Machine Repair",
    machineType: "Top-load",
    description: "Top-load washing machine repair in Bangalore for filling, lid, wash-action, drainage and spin faults. Review assessment scope, compatible parts and repair costs.",
    intro: "Independent top-load washing machine repair enquiries in Bangalore. Describe filling, lid, wash-action, drainage or spin problems and agree the assessment and estimate before repair work.",
    assessmentIntro: "For a top-load washer, the last completed stage matters: did it fill, begin washing, drain or attempt to spin? Describe lid behaviour, load conditions and any repeated message. The exact model determines the relevant checks; a lid warning, weak wash action or interrupted spin does not establish which part needs replacement.",
    faults: [
      { title: "The lid warning prevents a programme", label: "LID & CONTROLS", body: "Record the full message and whether the interruption happens before washing or spinning. Mention visible damage or a change in lid behaviour. Do not hold down, bypass or modify the lid mechanism to make the machine operate." },
      { title: "The tub fills slowly or will not fill", label: "FILLING & WATER LEVEL", body: "Mention whether household water is available, if any water enters and which programme was selected. Include recent plumbing work and whether the appliance stops with a message. Avoid dismantling valves or changing internal level controls to test the complaint." },
      { title: "Water enters but washing does not start", label: "WASH ACTION", body: "Tell us whether the machine fills and whether any wash movement or sound follows. Explain whether the behaviour differs with the load or programme. Pulsator, agitator and drive arrangements vary by model, so the mechanism and fault need identification before parts are proposed." },
      { title: "Spin interrupts or clothes stay wet", label: "SPIN & LOAD", body: "Describe whether water drained, whether the tub begins spinning and whether the display shows an imbalance or lid message. Mention bulky items and whether the problem repeats with different loads. Keep clear of moving parts and do not reach into a moving tub." },
      { title: "Water stays in the tub or leaks below", label: "DRAINAGE & LEAKS", body: "Explain whether water remains after the programme, where a leak first appears and whether it occurs during filling or draining. Drain layout and internal components require model-specific assessment. Stop use if water is reaching electrical connections." },
      { title: "Banging, movement or unusual noise", label: "TUB & SUPPORT", body: "Note whether the noise occurs during wash movement or spinning and whether the machine shifts position. Mention a recent move, installation or change in load behaviour. Do not tilt the washer, reach underneath or repeatedly run a violent spin to demonstrate the problem." },
    ],
    scope: [
      { title: "Fully automatic or twin-tub?", body: "A top-opening lid alone does not identify the machine. Say whether the appliance runs a complete programme in one tub or has separate wash and spin tubs. This page focuses on fully automatic top-load enquiries; twin-tub symptoms should identify the affected tub." },
      { title: "Wash action, drainage and spin", body: "Describe each stage separately so an interrupted spin is not confused with a filling or washing fault. Ask how the findings support the proposed lid, water-path, drive or support work, and how any further inspection would be approved." },
      { title: "Installation and safe access", body: "Share the location, available space, water connection and any recent move or plumbing change. Confirm visit coverage and access requirements. Leave lifting, internal checks and disconnection arrangements to the agreed assessment scope." },
    ],
    preparation: [
      "Identify a fully automatic top-load or semi-automatic twin-tub washer and share the full model label.",
      "List the last completed stage: filling, washing, draining or spinning. Include the complete display message.",
      "Describe lid behaviour, the selected programme and whether the fault changes with different loads.",
      "Mention recent plumbing, installation, relocation or earlier repair, without tilting or opening the appliance.",
      "Share your Bangalore locality and access details. Keep clear of moving parts, never bypass the lid mechanism and stop use for leaks near electrics or electrical tripping.",
    ],
    faqs: [
      ["How much does top-load washing machine repair in Bangalore cost?", "Cost depends on the full model, assessment findings, labour and any compatible parts required. Confirm the visit charge, repair estimate and exclusions before work. A spin interruption or lid message does not establish a fixed price or a particular replacement part."],
      ["Can I request a doorstep top-load washer assessment?", "Share your Bangalore locality, model, symptoms and access details. Confirm coverage, assessment charges and the work that can be checked at your premises. Specialist repairs or additional inspection may require another arrangement."],
      ["Why does my top-load washer stop before spinning?", "Describe whether drainage completed, whether the lid is closed normally, the load and any display message. Several conditions can interrupt spinning. Do not bypass the lid mechanism; model-specific assessment should establish the cause before parts are chosen."],
      ["Is a top-load washer the same as a semi-automatic machine?", "No. A fully automatic top-load washer normally runs the wash, rinse and spin programme in one tub. A semi-automatic twin-tub appliance has separate washing and spinning areas. Share the model and configuration so the repair enquiry identifies the correct machine and affected function."],
      ["Can you assess weak wash action or a pulsator problem?", "Describe whether filling completes and whether the wash mechanism moves or makes a new sound. Share the complete model because designs differ. The assessment should identify the mechanism and explain the findings before drive or wash-component work is proposed."],
      ["Which top-load washing machine brands can I enquire about?", "Share the full model for LG, Samsung, Whirlpool, Godrej, Panasonic, Haier or another brand using the form. The existing washer brand pages provide identification and repair guidance. Confirm support and parts compatibility for the particular model rather than assuming all appliances from a brand are covered."],
      ["Is Numunix an authorized top-load service center?", "Numunix provides independent repair assessment. For manufacturer warranty work, contact the appliance brand and check existing cover before approving independent work."],
      ["What should I confirm before the repair is closed?", "Ask how the affected filling, wash, drain, lid or spin functions were reviewed, as applicable to the work. Confirm any remaining issue, care instructions and written parts or labour terms. Keep the estimate and completed-work record for a recurring symptom."],
    ],
  },
];

export function washerTypePage(category: string, slug: string) {
  return category === "appliances" ? WASHER_TYPE_PAGES.find((page) => page.slug === slug) : undefined;
}

export function washerTypeHref(page: Pick<WasherTypePage, "slug">) {
  return `/appliances/repairs/${page.slug}`;
}

export function washerTypeService(page: WasherTypePage): RepairService {
  const parent = REPAIR_PAGES.find((service) => service.slug === "washing-machine-repair");
  if (!parent) throw new Error("Missing washing machine repair catalogue entry");
  return { ...parent, slug: page.slug, name: page.name, headline: page.name, intro: page.intro,
    faults: page.faults.map((fault) => fault.title), preparation: page.preparation };
}

export const WASHER_PARENT_PATH = repairPageHref(REPAIR_PAGES.find((service) => service.slug === "washing-machine-repair")!);
