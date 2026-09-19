export type Solution = {
  slug: string;
  label: string;
  name: string;
  title: string;
  accentWord: string;
  intro: string;
  metaTitle: string;
  metaDescription: string;
  stats: [string, string][];
  challenges: string[];
  wins: string[];
  workflow: { step: string; title: string; body: string }[];
  faq: { q: string; a: string }[];
};

const s = (x: Solution) => x;

export const SOLUTIONS: Solution[] = [
  s({
    slug: "appliance-repair",
    label: "APPLIANCE REPAIR",
    name: "Appliance Repair",
    title: "Appliance repair operations that run themselves.",
    accentWord: "run themselves.",
    intro:
      "Washing machines, refrigerators, ovens and chimneys — Numunix answers the call, captures the appliance and fault, books the visit and bills the job before the technician leaves the door.",
    metaTitle: "Appliance Repair Software with AI Call Agents | Numunix",
    metaDescription:
      "Numunix runs appliance repair businesses end to end: AI call answering, booking, technician dispatch, job tracking, invoicing and AMC renewals.",
    stats: [
      ["CALLS ANSWERED", "24/7"],
      ["BOOKING TIME", "< 2 min"],
      ["REPEAT VISITS", "Fewer"],
      ["INVOICE DELAY", "None"],
    ],
    challenges: [
      "Peak-season calls ring out while technicians are on site",
      "Appliance brand, model and fault are rarely captured properly",
      "Warranty and paid jobs get mixed up in the same notebook",
    ],
    wins: [
      "Every enquiry answered and qualified on the first ring",
      "Appliance, fault and address land straight on the job card",
      "Warranty, paid and AMC work tracked separately and billed correctly",
    ],
    workflow: [
      { step: "01", title: "Call captured", body: "The AI agent answers, identifies the customer and records the appliance and fault." },
      { step: "02", title: "Visit booked", body: "A slot is offered from live technician availability and confirmed on WhatsApp." },
      { step: "03", title: "Job completed", body: "Parts, labour and notes are captured at the customer's home." },
      { step: "04", title: "Billed and followed up", body: "The invoice goes out instantly and feedback is requested automatically." },
    ],
    faq: [
      { q: "Can we track parts used per repair?", a: "Yes — parts and labour are recorded on the job and flow into the invoice." },
      { q: "Does it handle multiple technicians?", a: "Yes, with availability, skill and workload considered on every assignment." },
    ],
  }),
  s({
    slug: "ac-hvac",
    label: "AC & HVAC",
    name: "AC & HVAC",
    title: "Handle the summer rush without adding staff.",
    accentWord: "without adding staff.",
    intro:
      "Installations, servicing and seasonal maintenance contracts — Numunix keeps the enquiry flood, the technician schedule and the AMC calendar under control through peak months.",
    metaTitle: "AC & HVAC Service Management Software | Numunix",
    metaDescription:
      "Numunix helps AC and HVAC businesses answer peak-season calls, schedule installations and servicing, dispatch certified technicians and renew AMC contracts on time.",
    stats: [
      ["PEAK CALLS", "All answered"],
      ["SAME-DAY SLOTS", "Auto-offered"],
      ["AMC TRACKING", "Built in"],
      ["ROUTE WASTE", "Reduced"],
    ],
    challenges: [
      "Enquiry volume triples for three months and then collapses",
      "Certified HVAC jobs get assigned to general technicians",
      "Annual maintenance contracts lapse without anyone noticing",
    ],
    wins: [
      "Seasonal spikes absorbed without hiring temporary front desk staff",
      "Specialist jobs routed only to qualified technicians",
      "AMC visits scheduled ahead of peak and renewals raised before expiry",
    ],
    workflow: [
      { step: "01", title: "Enquiry qualified", body: "Installation, service or breakdown identified on the call itself." },
      { step: "02", title: "Right skill matched", body: "Only certified HVAC technicians are recommended for specialist work." },
      { step: "03", title: "Route balanced", body: "Distance, workload and ETA are weighed before the job is assigned." },
      { step: "04", title: "Contract protected", body: "AMC visits are tracked and renewals raised well before expiry." },
    ],
    faq: [
      { q: "Can installation and service jobs use different flows?", a: "Yes — each service type can carry its own duration, checklist and pricing." },
      { q: "Do we get seasonal reporting?", a: "Yes, with month-on-month job, revenue and conversion views." },
    ],
  }),
  s({
    slug: "electronics-repair",
    label: "ELECTRONICS REPAIR",
    name: "Electronics Repair",
    title: "Bench work and field work on one board.",
    accentWord: "on one board.",
    intro:
      "Board-level repairs, display replacements and component service — Numunix tracks every unit from intake to collection, with the full service history attached to the customer.",
    metaTitle: "Electronics Repair Shop Management Software | Numunix",
    metaDescription:
      "Numunix tracks electronics repair jobs from intake to collection — bench queue, field jobs, parts, status updates, invoicing and customer history in one system.",
    stats: [
      ["UNITS TRACKED", "Every one"],
      ["STATUS UPDATES", "Automatic"],
      ["HISTORY", "Per device"],
      ["BILLING", "Instant"],
    ],
    challenges: [
      "Units sit on the bench with no clear owner or status",
      "Customers call repeatedly to ask what is happening",
      "Parts cost is forgotten by the time the bill is written",
    ],
    wins: [
      "One queue showing every unit, stage and technician",
      "Status updates sent automatically at each stage",
      "Parts and labour captured on the job and billed accurately",
    ],
    workflow: [
      { step: "01", title: "Intake logged", body: "Device, fault and accessories recorded against the customer." },
      { step: "02", title: "Assigned to bench", body: "The job lands with the technician who handles that category." },
      { step: "03", title: "Progress shared", body: "Diagnosis, estimate approval and completion go out automatically." },
      { step: "04", title: "Collected and billed", body: "Invoice raised on handover with the full repair history stored." },
    ],
    faq: [
      { q: "Can we send estimates before repair?", a: "Yes — estimates can be shared and approved before work starts." },
      { q: "Is past service history visible?", a: "Yes, per customer and per device." },
    ],
  }),
  s({
    slug: "mobile-laptop-repair",
    label: "MOBILE & LAPTOP",
    name: "Mobile & Laptop Repair",
    title: "Walk-in and doorstep repair, one system.",
    accentWord: "one system.",
    intro:
      "Counter jobs, pickups and doorstep visits all move through the same workflow — with status messages, estimates and invoices sent without a single manual WhatsApp.",
    metaTitle: "Mobile & Laptop Repair Management Software | Numunix",
    metaDescription:
      "Numunix manages mobile and laptop repair businesses: walk-ins, pickup and drop, repair status updates, estimates, invoicing and customer history.",
    stats: [
      ["WALK-INS", "Logged"],
      ["PICKUPS", "Scheduled"],
      ["UPDATES", "Automatic"],
      ["PAYMENTS", "Tracked"],
    ],
    challenges: [
      "Counter jobs are written in a register and never followed up",
      "Pickup and drop slots clash with in-store repairs",
      "Customers keep calling for a status nobody can see",
    ],
    wins: [
      "Every job — counter, pickup or doorstep — on one live board",
      "Pickup slots booked against real technician availability",
      "Status, estimate and invoice delivered on WhatsApp automatically",
    ],
    workflow: [
      { step: "01", title: "Job created", body: "Device, issue and customer captured at the counter or on the call." },
      { step: "02", title: "Slot or bench", body: "Doorstep visits are scheduled; store jobs join the bench queue." },
      { step: "03", title: "Estimate approved", body: "The quote goes out and approval is recorded on the job." },
      { step: "04", title: "Handover", body: "Invoice sent, payment tracked and feedback requested." },
    ],
    faq: [
      { q: "Can we manage more than one store?", a: "Yes — multi-location operations are supported with per-branch views." },
      { q: "Can customers be reminded to collect?", a: "Yes, automatic reminders can be triggered on ready-for-collection." },
    ],
  }),
  s({
    slug: "automotive",
    label: "AUTOMOTIVE",
    name: "Automotive Service",
    title: "Bay capacity, jobs and billing in sync.",
    accentWord: "in sync.",
    intro:
      "Garages, roadside assistance and mobile mechanics — Numunix books only what your bays and mechanics can actually deliver, then turns the job card into an itemised invoice.",
    metaTitle: "Garage & Automotive Service Software | Numunix",
    metaDescription:
      "Numunix runs automotive service operations: booking against real bay capacity, mechanic assignment, job cards, estimates, parts, invoicing and service reminders.",
    stats: [
      ["BAY CLASHES", "Prevented"],
      ["JOB CARDS", "Digital"],
      ["ESTIMATES", "Approved fast"],
      ["REMINDERS", "Automatic"],
    ],
    challenges: [
      "Slots are promised twice because capacity is not visible",
      "Job cards live on paper and get lost before billing",
      "Service reminders are never sent, so customers drift away",
    ],
    wins: [
      "Bookings respect bay and mechanic capacity in real time",
      "Digital job cards with parts, labour and approvals",
      "Periodic service reminders sent on their own",
    ],
    workflow: [
      { step: "01", title: "Booking taken", body: "The AI agent captures vehicle, issue and preferred time." },
      { step: "02", title: "Bay assigned", body: "Work is slotted where capacity and skill actually exist." },
      { step: "03", title: "Work approved", body: "Estimate shared, approval recorded, parts added to the card." },
      { step: "04", title: "Billed and recalled", body: "Invoice issued and the next service reminder scheduled." },
    ],
    faq: [
      { q: "Can we store vehicle history?", a: "Yes — every visit is kept against the vehicle and the owner." },
      { q: "Does it work for roadside teams?", a: "Yes, mobile mechanics are dispatched by distance and availability." },
    ],
  }),
  s({
    slug: "home-services",
    label: "HOME SERVICES",
    name: "Home Services",
    title: "Plumbing, electrical and handyman work, organised.",
    accentWord: "organised.",
    intro:
      "Multi-technician teams covering a city need more than a chat group. Numunix takes the booking, sends the right person, tracks the visit and collects the payment.",
    metaTitle: "Home Services Business Management Software | Numunix",
    metaDescription:
      "Numunix organises plumbing, electrical and handyman teams: automated booking, technician dispatch, job tracking, invoicing, follow-ups and recurring plans.",
    stats: [
      ["JOBS/DAY", "More per tech"],
      ["TRAVEL", "Shorter routes"],
      ["FOLLOW-UP", "Automatic"],
      ["PLANS", "Renewed"],
    ],
    challenges: [
      "Jobs are handed out on a WhatsApp group with no record",
      "Technicians criss-cross the city all day",
      "Recurring plans are renewed only if someone remembers",
    ],
    wins: [
      "Every job assigned with distance, skill and workload considered",
      "Shorter routes and more completed visits per technician",
      "Annual plans tracked and renewed with one confirmation",
    ],
    workflow: [
      { step: "01", title: "Request captured", body: "Service type, address and urgency recorded on the call." },
      { step: "02", title: "Technician sent", body: "The nearest qualified, available technician is recommended." },
      { step: "03", title: "Visit tracked", body: "Status, notes and photos are captured on site." },
      { step: "04", title: "Closed out", body: "Invoice, payment and feedback handled automatically." },
    ],
    faq: [
      { q: "Can one job need two technicians?", a: "Yes — multi-technician jobs are coordinated on a single record." },
      { q: "Do you support subscription plans?", a: "Yes, recurring plans and their visits are tracked and renewed." },
    ],
  }),
  s({
    slug: "service-centers",
    label: "SERVICE CENTERS",
    name: "Service Centers",
    title: "Multi-location service operations under one roof.",
    accentWord: "under one roof.",
    intro:
      "Authorised and multi-branch service operations get one process, one customer record and one reporting view — across every location and every technician team.",
    metaTitle: "Multi-Location Service Center Management | Numunix",
    metaDescription:
      "Numunix gives multi-location service centers one workflow: centralised call handling, branch-level dispatch, job tracking, billing, AMC contracts and reporting.",
    stats: [
      ["LOCATIONS", "Unlimited"],
      ["PROCESS", "Identical"],
      ["REPORTING", "Consolidated"],
      ["ACCESS", "Role-based"],
    ],
    challenges: [
      "Every branch runs its own process and its own spreadsheet",
      "Head office cannot see load or revenue until month end",
      "Corporate AMC accounts span sites and machines with no tracking",
    ],
    wins: [
      "One workflow enforced across branches and teams",
      "Live consolidated view of jobs, technicians and revenue",
      "Contracts tracked per site, per machine and per visit",
    ],
    workflow: [
      { step: "01", title: "Centralised intake", body: "Calls and enquiries land in one queue regardless of branch." },
      { step: "02", title: "Routed to branch", body: "Work is assigned to the right location and technician team." },
      { step: "03", title: "Executed locally", body: "Branch teams work the same job board and job card." },
      { step: "04", title: "Reported centrally", body: "Head office sees load, SLA and revenue across locations." },
    ],
    faq: [
      { q: "Can branch managers see only their data?", a: "Yes — role-based access controls what each person can view." },
      { q: "Is reporting per branch available?", a: "Yes, per branch and consolidated." },
    ],
  }),
];

export const solutionBySlug = (slug: string) =>
  SOLUTIONS.find((x) => x.slug === slug);
