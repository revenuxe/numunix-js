export const CONTACT = {
  phone: "+91 98862 85028",
  phoneHref: "tel:+919886285028",
  email: "Numunix@gmail.com",
  emailHref: "mailto:Numunix@gmail.com",
  hours: "Mon – Sat · 9:00 AM – 8:00 PM IST",
};

type Extra = {
  pains: string[];
  gains: string[];
  included: string[];
  useCases: { industry: string; body: string }[];
};

const BASE_INCLUDED = [
  "Unlimited customer and service records",
  "Role-based access for owners, dispatchers and technicians",
  "Mobile-ready technician view",
  "WhatsApp and SMS notifications",
  "Exportable reports and audit trail",
];

export const FEATURE_EXTRAS: Record<string, Extra> = {
  "ai-call-agents": {
    pains: [
      "Calls ring out during jobs, lunch hours and after 7 PM",
      "Customer details are scribbled on paper and lost",
      "Enquiries go to whoever calls back first — usually a competitor",
    ],
    gains: [
      "Every call is answered on the first ring, all week",
      "Issue, address and appliance land straight on the job card",
      "Bookings are confirmed while the customer is still on the line",
    ],
    included: BASE_INCLUDED,
    useCases: [
      { industry: "APPLIANCE REPAIR", body: "Peak-season call spikes handled without extra front-desk staff." },
      { industry: "AC & HVAC", body: "Summer enquiry rushes captured and slotted into the same-day queue." },
      { industry: "SERVICE CENTRES", body: "Walk-in and phone enquiries logged under one customer record." },
    ],
  },
  "automated-booking": {
    pains: [
      "Slots are double-booked across WhatsApp, calls and notebooks",
      "Travel time between jobs is never accounted for",
      "Customers get no confirmation and forget the visit",
    ],
    gains: [
      "One live calendar across every technician and location",
      "Slots offered only when travel and shift time actually allow",
      "Automatic confirmation and reminder before every visit",
    ],
    included: BASE_INCLUDED,
    useCases: [
      { industry: "HOME SERVICES", body: "Recurring visits scheduled in one pass instead of one call at a time." },
      { industry: "MOBILE & LAPTOP", body: "Pickup and drop slots booked alongside in-store repairs." },
      { industry: "AUTOMOTIVE", body: "Bay capacity respected so no slot is promised twice." },
    ],
  },
  "technician-dispatch": {
    pains: [
      "Jobs are assigned by whoever picks up the phone first",
      "Technicians cross the city for jobs near someone else",
      "Skill mismatches force a second visit",
    ],
    gains: [
      "Distance, skill, workload and ETA weighed on every assignment",
      "Fewer wasted kilometres per technician per day",
      "First-visit fix rate rises because the right person shows up",
    ],
    included: BASE_INCLUDED,
    useCases: [
      { industry: "AC & HVAC", body: "Specialist HVAC jobs routed only to certified technicians." },
      { industry: "MULTI-LOCATION", body: "Work balanced across branches instead of overloading one team." },
      { industry: "ELECTRONICS", body: "Board-level repairs sent to the bench, field faults to the road team." },
    ],
  },
  "service-jobs": {
    pains: [
      "No single place shows what is running right now",
      "Job history lives in chat threads and photos on phones",
      "Completion notes arrive hours after the technician leaves",
    ],
    gains: [
      "One live board for every job, status and technician",
      "Complete service history per customer and per machine",
      "Field updates, parts and photos captured at the site",
    ],
    included: BASE_INCLUDED,
    useCases: [
      { industry: "APPLIANCE REPAIR", body: "Warranty and paid jobs tracked side by side with full history." },
      { industry: "SERVICE CENTRES", body: "Bench queue and field queue managed from the same board." },
      { industry: "HOME SERVICES", body: "Multi-technician jobs coordinated on a single record." },
    ],
  },
  "invoicing-billing": {
    pains: [
      "Invoices are typed out in the evening, days after the job",
      "Parts and labour get missed, so revenue leaks quietly",
      "Chasing payment means chasing people on WhatsApp",
    ],
    gains: [
      "Invoice generated the moment the job is marked complete",
      "Labour, parts and tax calculated from the job record itself",
      "Payment status tracked and reminders sent automatically",
    ],
    included: BASE_INCLUDED,
    useCases: [
      { industry: "APPLIANCE REPAIR", body: "On-site invoice shared on WhatsApp before the technician leaves." },
      { industry: "AUTOMOTIVE", body: "Estimate to final bill with parts and labour split clearly." },
      { industry: "AMC ACCOUNTS", body: "Contract visits billed against the agreement, not one-off rates." },
    ],
  },
  "business-automation": {
    pains: [
      "The same follow-up messages are typed every single day",
      "Steps get skipped whenever the team is busy",
      "Nobody knows where a job stalled until the customer calls",
    ],
    gains: [
      "Repetitive operational steps run on their own, every time",
      "Consistent follow-up regardless of how busy the day is",
      "Stalled jobs surface before the customer has to chase",
    ],
    included: BASE_INCLUDED,
    useCases: [
      { industry: "ALL SERVICE TEAMS", body: "Lead to invoice sequences run without manual chasing." },
      { industry: "MULTI-LOCATION", body: "The same process enforced at every branch." },
      { industry: "GROWING TEAMS", body: "New staff follow the workflow instead of learning tribal habits." },
    ],
  },
  "amc-renewals": {
    pains: [
      "Contract end dates live in a spreadsheet nobody opens",
      "Renewals are remembered only after they lapse",
      "Covered visits get billed as one-off jobs by mistake",
    ],
    gains: [
      "Every contract tracked with visits used and visits remaining",
      "Renewal reminders raised well before expiry",
      "Recurring revenue protected instead of quietly lost",
    ],
    included: BASE_INCLUDED,
    useCases: [
      { industry: "AC & HVAC", body: "Seasonal maintenance contracts scheduled ahead of peak months." },
      { industry: "SERVICE CENTRES", body: "Corporate AMC accounts tracked per site and per machine." },
      { industry: "HOME SERVICES", body: "Annual plans renewed with a single confirmation message." },
    ],
  },
  "whatsapp-communication": {
    pains: [
      "Customer conversations are scattered across personal phones",
      "Nobody can see what was promised to whom",
      "Updates stop the moment the team gets busy",
    ],
    gains: [
      "Every conversation attached to the customer and the job",
      "Confirmations, ETAs, invoices and feedback sent automatically",
      "One shared history when staff change or hand over",
    ],
    included: BASE_INCLUDED,
    useCases: [
      { industry: "APPLIANCE REPAIR", body: "Booking, ETA and invoice delivered in one thread." },
      { industry: "MOBILE & LAPTOP", body: "Repair status updates sent without a single manual message." },
      { industry: "HOME SERVICES", body: "Feedback requests sent right after the visit closes." },
    ],
  },
};

export const DEFAULT_EXTRA: Extra = {
  pains: [
    "Work is coordinated across calls, chats and notebooks",
    "Details fall through the gaps when the day gets busy",
    "Nobody has one clear view of the operation",
  ],
  gains: [
    "One connected record from the first call to payment",
    "Automatic follow-through on every operational step",
    "A live view of leads, jobs, technicians and revenue",
  ],
  included: BASE_INCLUDED,
  useCases: [
    { industry: "SERVICE TEAMS", body: "Built for repair and field-service operations of every size." },
    { industry: "MULTI-LOCATION", body: "One process across branches and technician teams." },
    { industry: "GROWING TEAMS", body: "Scales without adding back-office headcount." },
  ],
};
