export type ServiceGuide = { heading: string; paragraphs: string[]; checklist: string[] };

const GUIDES: Record<string, ServiceGuide> = {
  "laptop-repair": {
    heading: "A repair decision should feel simple.",
    paragraphs: [
      "A laptop that is slow, damaged or unreliable does not always need replacing. The useful first step is to identify whether the issue sits with the screen, battery, storage, cooling, software or a deeper board-level fault.",
      "We explain the diagnosis and repair route clearly, so you can decide with the expected work, parts and turnaround in mind.",
    ],
    checklist: [
      "Laptop brand and model",
      "What changed before the fault started",
      "Any error code, heat or unusual sound",
      "Whether important files are already backed up",
    ],
  },
  "desktop-repair": {
    heading: "Keep a good PC useful for longer.",
    paragraphs: [
      "Desktop problems can often be isolated efficiently because individual parts can be tested and replaced. A no-boot issue, display fault, noise or performance problem may have a straightforward fix or be an opportunity for a worthwhile upgrade.",
      "We look at the condition of the existing PC and its intended use before recommending repair, upgrade or replacement.",
    ],
    checklist: [
      "Whether the PC powers on",
      "Any lights, beeps or display messages",
      "Your main use: work, study, gaming or office",
      "Age and recent changes to the PC",
    ],
  },
  "cctv-installation": {
    heading: "Security works best when it is planned around your property.",
    paragraphs: [
      "The right CCTV system is not simply the one with the most cameras. Coverage, lighting, cable routes, recording retention and who needs mobile access all influence the setup.",
      "We help turn those decisions into a tidy, usable system—whether you need a new installation, an upgrade or a repair to an existing setup.",
    ],
    checklist: [
      "Key areas to cover",
      "Indoor or outdoor camera locations",
      "Need for phone viewing and recordings",
      "Existing cameras or cabling, if any",
    ],
  },
  networking: {
    heading: "A dependable network starts with the way you work.",
    paragraphs: [
      "Slow Wi-Fi, dead zones and unreliable connections have many possible causes, from placement and interference to cabling, equipment or configuration. A useful visit starts with how people use the connection and where it falls short.",
      "We assess the practical environment and explain options that suit the space, rather than suggesting equipment without context.",
    ],
    checklist: [
      "Rooms or desks with weak signal",
      "Number of users and devices",
      "Current router or internet plan",
      "Any printers, cameras or shared systems involved",
    ],
  },
  "appliances-repair": {
    heading: "Get clarity before replacing an appliance.",
    paragraphs: [
      "An appliance failure can disrupt a household quickly, but not every fault requires a new machine. Symptoms such as poor cooling, drainage trouble, unusual noise or power loss need an assessment of the component involved.",
      "We explain what the issue means, what the repair involves and what to consider before you decide.",
    ],
    checklist: [
      "Appliance brand and model",
      "The exact symptom and when it happens",
      "Any visible leak, noise or error code",
      "Whether the appliance is still safe to use",
    ],
  },
  "washing-machine-repair": {
    heading: "A clear diagnosis gets wash day back on track.",
    paragraphs: [
      "Drainage, spinning, noise, vibration and leakage can come from several parts of a washing machine. Explaining exactly when the problem occurs helps narrow down the right inspection.",
      "We assess the machine before recommending work and share simple care advice to help avoid repeat issues.",
    ],
    checklist: [
      "Front-load, top-load or semi-automatic model",
      "Whether it fills, drains and spins",
      "Any error code or unusual noise",
      "A photo of the model label if available",
    ],
  },
  "business-amc": {
    heading: "IT support should prevent problems, not only respond to them.",
    paragraphs: [
      "An AMC is most useful when it matches the devices, people and working hours that matter to your business. It can bring routine checks, clearer ownership and a predictable support path across computers, networking and agreed equipment.",
      "We start by understanding your current setup and the disruptions you want to avoid, then discuss suitable support coverage.",
    ],
    checklist: [
      "Number and type of devices",
      "Network, CCTV or printer support needs",
      "Current recurring issues",
      "Preferred response times and visit schedule",
    ],
  },
  "data-recovery": {
    heading: "Protect the data before attempting a fix.",
    paragraphs: [
      "When a drive is failing or files have disappeared, continued use can reduce the chance of a successful recovery. The first priority is to preserve the current state and understand what happened.",
      "We assess the drive or laptop carefully, explain realistic options and handle your data with discretion.",
    ],
    checklist: [
      "Stop using a failing drive where possible",
      "What files or folders matter most",
      "Whether the drive is detected",
      "What happened before the data became unavailable",
    ],
  },
  "hardware-upgrades": {
    heading: "Upgrade for the work you actually do.",
    paragraphs: [
      "An SSD, RAM or storage upgrade can make a laptop or desktop feel dramatically better, but compatibility and the condition of the existing system matter. The best option depends on your use, budget and the machine's limitations.",
      "We recommend compatible improvements that deliver a practical benefit, then help move data safely where appropriate.",
    ],
    checklist: [
      "Current laptop or desktop model",
      "What feels slow or limiting",
      "Important data to transfer",
      "Your expected use and budget",
    ],
  },
};

export function getServiceGuide(slug: string): ServiceGuide | undefined {
  return GUIDES[slug];
}
