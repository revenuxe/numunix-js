export type DemoKey =
  | "call"
  | "booking"
  | "dispatch"
  | "jobs"
  | "invoice"
  | "voice"
  | "flow";

export type Feature = {
  slug: string;
  label: string; // mono micro-label
  name: string; // nav / card name
  title: string; // page H1 (accent applies to accentWord)
  accentWord: string;
  intro: string;
  metaTitle: string;
  metaDescription: string;
  demo: DemoKey;
  stats: [string, string][];
  capabilities: { title: string; body: string }[];
  steps: { step: string; title: string; body: string }[];
  outcomes: string[];
  faq: { q: string; a: string }[];
};

export const FEATURES: Feature[] = [
  {
    slug: "ai-call-agents",
    label: "AI AGENTS",
    name: "AI Call Agents",
    title: "AI call agents that answer every service call.",
    accentWord: "answer every service call.",
    intro:
      "Numunix AI voice agents pick up on the first ring, understand the customer's problem in plain language, capture the service details and book the appointment — day, night, weekends and during peak load.",
    metaTitle: "AI Call Agents for Repair & Field Service | Numunix",
    metaDescription:
      "Numunix AI voice agents answer service calls 24/7, qualify the customer, capture the issue, check technician availability and confirm the booking automatically.",
    demo: "call",
    stats: [
      ["CALLS ANSWERED", "94%"],
      ["AVG HANDLE TIME", "01:42"],
      ["BOOKED ON CALL", "72%"],
      ["AFTER-HOURS COVER", "24/7"],
    ],
    capabilities: [
      {
        title: "Natural conversation",
        body: "Agents speak in everyday language, handle interruptions, repeat details back and switch between English and common regional phrasing.",
      },
      {
        title: "Issue capture",
        body: "The reported fault, appliance or equipment type, brand and symptom are written straight onto the service request — no note-taking afterwards.",
      },
      {
        title: "Live availability",
        body: "Before offering a slot, the agent checks technician shifts, existing jobs and travel time so the promise made on the call is one you can keep.",
      },
      {
        title: "Clean handover",
        body: "Anything outside the agent's scope is escalated to a human with full context — transcript, customer record and captured details attached.",
      },
    ],
    steps: [
      { step: "01", title: "Call lands", body: "Incoming call is picked up instantly, no queue and no missed ring." },
      { step: "02", title: "Customer identified", body: "Existing customers are matched by number; new callers get a record created." },
      { step: "03", title: "Issue captured", body: "The agent asks the right follow-up questions for that service category." },
      { step: "04", title: "Slot confirmed", body: "An available technician and time window are confirmed on the call itself." },
      { step: "05", title: "Confirmation sent", body: "A WhatsApp confirmation with the time, technician and job reference goes out." },
    ],
    outcomes: [
      "No missed calls during peak hours, lunch breaks or after closing",
      "Every enquiry becomes a structured service request, not a sticky note",
      "Office staff stop working the phone and start working the schedule",
    ],
    faq: [
      {
        q: "What happens if the AI agent cannot help?",
        a: "The call is handed to a person with the conversation summary already attached, so the customer never repeats themselves.",
      },
      {
        q: "Can it handle several calls at once?",
        a: "Yes — concurrent calls are answered in parallel, which is where most service businesses lose bookings today.",
      },
    ],
  },
  {
    slug: "automated-booking",
    label: "BOOKING",
    name: "Automated Booking",
    title: "Bookings that fill the calendar correctly.",
    accentWord: "fill the calendar correctly.",
    intro:
      "Every confirmed enquiry becomes a scheduled visit with the right slot, the right skill and realistic travel time — without anyone rebuilding the day by hand.",
    metaTitle: "Automated Service Booking & Scheduling Software | Numunix",
    metaDescription:
      "Numunix turns qualified enquiries into confirmed service appointments with live slot availability, skill matching, travel-time awareness and automatic reminders.",
    demo: "booking",
    stats: [
      ["SLOTS CONFIRMED", "5 TODAY"],
      ["NO-SHOW DROP", "-38%"],
      ["RESCHEDULES", "SELF-SERVE"],
      ["REMINDERS", "AUTOMATIC"],
    ],
    capabilities: [
      { title: "Live slot engine", body: "Availability reflects shifts, leave, existing jobs and buffer time, so double-booking stops being possible." },
      { title: "Skill matching", body: "A slot is only offered if a technician qualified for that service category is free in that window." },
      { title: "Reminders", body: "Confirmation, day-before and on-the-way messages go out on WhatsApp without staff involvement." },
      { title: "Easy rescheduling", body: "Customers move their own appointment through a link; the calendar and technician are updated instantly." },
    ],
    steps: [
      { step: "01", title: "Request received", body: "From a call, form, WhatsApp message or walk-in." },
      { step: "02", title: "Slot offered", body: "Only genuinely available windows are shown to the customer." },
      { step: "03", title: "Confirmed", body: "The appointment is locked with customer, service type and technician." },
      { step: "04", title: "Reminded", body: "Automated reminders reduce no-shows and wasted trips." },
    ],
    outcomes: [
      "Fewer wasted journeys and idle gaps between visits",
      "One calendar the whole team trusts",
      "Customers get a definite time instead of a vague window",
    ],
    faq: [
      { q: "Can we keep manual control?", a: "Yes — dispatchers can override any automated slot, and the calendar reflects the change everywhere." },
      { q: "Does it support multiple locations?", a: "Calendars can be run per branch, per team or across the whole business." },
    ],
  },
  {
    slug: "technician-dispatch",
    label: "SMART DISPATCH",
    name: "Technician Dispatch",
    title: "The right technician on every job.",
    accentWord: "right technician",
    intro:
      "Numunix ranks your technicians for each new job on distance, skill match, current workload and realistic ETA, then assigns in one tap.",
    metaTitle: "Smart Technician Dispatch & Assignment Software | Numunix",
    metaDescription:
      "Numunix assigns field technicians by distance, skill match, workload and ETA — with live job status, route awareness and multi-team dispatch.",
    demo: "dispatch",
    stats: [
      ["AVG ETA", "18 MIN"],
      ["ON SHIFT", "7"],
      ["FIRST-VISIT FIX", "+21%"],
      ["ROUTES OPTIMISED", "3"],
    ],
    capabilities: [
      { title: "Ranked recommendations", body: "Every open job shows the best-matched technicians with the reasoning beside each name." },
      { title: "Workload balance", body: "Jobs spread across the team instead of piling onto whoever answers fastest." },
      { title: "Live job state", body: "Assigned, en route, in progress and completed update as the technician works." },
      { title: "Multi-team, multi-city", body: "Dispatch by branch, zone or specialisation without separate tools." },
    ],
    steps: [
      { step: "01", title: "Job created", body: "From a booking, a call or a walk-in request." },
      { step: "02", title: "Candidates ranked", body: "Distance, skill, rating and current load are scored together." },
      { step: "03", title: "Assigned", body: "One tap sends the job, address and history to the technician." },
      { step: "04", title: "Tracked", body: "Status and completion notes flow back into the job record." },
    ],
    outcomes: [
      "Less time spent deciding who goes where",
      "Better first-visit fix rates through skill matching",
      "Fair, visible workload across the team",
    ],
    faq: [
      { q: "Do you use real map data?", a: "Dispatch works on distance and travel estimates inside Numunix; the visuals here are abstract, not live maps." },
      { q: "Can a dispatcher override the recommendation?", a: "Always. The ranking is advice, not a lock." },
    ],
  },
  {
    slug: "service-jobs",
    label: "OPERATIONS",
    name: "Service Job Management",
    title: "Every job, visible from start to close.",
    accentWord: "visible from start to close.",
    intro:
      "A single board for today's work: what is scheduled, who is on it, what is running late and what is finished — with the full service history behind every customer.",
    metaTitle: "Service Job Management Software for Repair Teams | Numunix",
    metaDescription:
      "Track every service job in Numunix: today's job board, live status, technician notes, parts used, photos and complete customer service history.",
    demo: "jobs",
    stats: [
      ["ACTIVE JOBS", "14"],
      ["COMPLETED TODAY", "9"],
      ["AVG ON-SITE", "42 MIN"],
      ["HISTORY", "FULL"],
    ],
    capabilities: [
      { title: "Today's board", body: "Time, service, location, technician and status in one readable line per job." },
      { title: "Field notes", body: "Technicians add findings, parts used and photos from the job itself." },
      { title: "Service history", body: "Every past visit, part and invoice sits on the customer record." },
      { title: "Escalation", body: "Jobs running long or blocked are flagged before the customer calls to complain." },
    ],
    steps: [
      { step: "01", title: "Scheduled", body: "The job appears on the board with everything the technician needs." },
      { step: "02", title: "In progress", body: "Status, arrival and on-site time are captured as it happens." },
      { step: "03", title: "Completed", body: "Findings, parts and time are recorded against the job." },
      { step: "04", title: "Billed", body: "The completed job flows straight into an invoice." },
    ],
    outcomes: [
      "No more calling technicians to ask where they are",
      "Accurate records for warranty and repeat faults",
      "Nothing finished on site but forgotten in billing",
    ],
    faq: [
      { q: "Can technicians use it on a phone?", a: "Yes — the job view is designed for a phone in the field first." },
      { q: "Does history carry across visits?", a: "Every visit for a customer and their equipment stays on one timeline." },
    ],
  },
  {
    slug: "invoicing-billing",
    label: "BILLING",
    name: "Invoicing & Billing",
    title: "Invoices raised the moment work is done.",
    accentWord: "the moment work is done.",
    intro:
      "Completed jobs turn into itemised invoices with labour, parts and tax calculated, delivered on WhatsApp, with payment status tracked until the money is in.",
    metaTitle: "Service Invoicing, Billing & Payment Tracking | Numunix",
    metaDescription:
      "Numunix generates itemised service invoices from completed jobs with parts, labour and tax, sends them on WhatsApp and tracks payment to collection.",
    demo: "invoice",
    stats: [
      ["RAISED TODAY", "₹48,250"],
      ["COLLECTED", "₹36,800"],
      ["AVG TIME TO BILL", "4 MIN"],
      ["DELIVERY", "WHATSAPP"],
    ],
    capabilities: [
      { title: "Auto-generated", body: "Labour, parts and tax pulled from the job — no re-entry, no missed line items." },
      { title: "Estimates first", body: "Send a quotation before work starts and convert it to an invoice on approval." },
      { title: "Payment tracking", body: "Paid, partial and overdue states with automatic polite reminders." },
      { title: "Clean records", body: "Every invoice sits against the job, the technician and the customer." },
    ],
    steps: [
      { step: "01", title: "Job closed", body: "The technician marks the work complete with parts and time." },
      { step: "02", title: "Invoice built", body: "Amounts and tax are calculated and checked." },
      { step: "03", title: "Sent", body: "Delivered on WhatsApp with a PDF copy." },
      { step: "04", title: "Collected", body: "Payment recorded and reminders stopped automatically." },
    ],
    outcomes: [
      "Billing happens the same day, not at the end of the week",
      "Fewer disputes because the invoice matches the job record",
      "Clear view of what is still outstanding",
    ],
    faq: [
      { q: "Can we edit an invoice before sending?", a: "Yes — every generated invoice can be reviewed and adjusted." },
      { q: "Is tax handled?", a: "Tax lines are calculated on the invoice; rates are configured for your business." },
    ],
  },
  {
    slug: "business-automation",
    label: "AUTOMATION",
    name: "Business Automation",
    title: "The repetitive work, handled quietly.",
    accentWord: "handled quietly.",
    intro:
      "Follow-ups, reminders, status updates, feedback requests and renewal nudges run on their own so your team spends its day on customers and technicians.",
    metaTitle: "Service Business Automation & Follow-Ups | Numunix",
    metaDescription:
      "Automate service follow-ups, reminders, WhatsApp updates, feedback requests and renewal nudges with Numunix — from lead to invoice and beyond.",
    demo: "flow",
    stats: [
      ["STEPS AUTOMATED", "8"],
      ["MESSAGES / DAY", "210"],
      ["MANUAL TOUCHES", "-64%"],
      ["CHANNEL", "WHATSAPP"],
    ],
    capabilities: [
      { title: "Lead to invoice flow", body: "Each stage triggers the next action without anyone chasing it." },
      { title: "Customer updates", body: "Booking, on-the-way, completion and payment messages sent at the right moment." },
      { title: "Feedback & reviews", body: "A short request goes out after a completed job, at the time people actually reply." },
      { title: "Renewal nudges", body: "Contracts and periodic services are picked up before they lapse." },
    ],
    steps: [
      { step: "01", title: "Trigger", body: "A job, call or payment changes state." },
      { step: "02", title: "Rule", body: "Numunix decides the right action for that customer and service." },
      { step: "03", title: "Action", body: "A message, task or record update is created." },
      { step: "04", title: "Record", body: "Everything is logged against the customer timeline." },
    ],
    outcomes: [
      "Customers stay informed without anyone typing updates",
      "Follow-ups stop depending on who remembers",
      "Repeat business arrives without a sales push",
    ],
    faq: [
      { q: "Can we turn individual automations off?", a: "Each automation can be enabled or paused independently." },
      { q: "Will customers get too many messages?", a: "Messaging is de-duplicated per customer and per job so nothing is sent twice." },
    ],
  },
  {
    slug: "amc-renewals",
    label: "CONTRACTS",
    name: "AMC & Renewals",
    title: "Service contracts that renew on time.",
    accentWord: "renew on time.",
    intro:
      "Track annual maintenance contracts, scheduled preventive visits and expiry dates, with renewal reminders that go out early enough to matter.",
    metaTitle: "AMC Management & Contract Renewals for Service Businesses | Numunix",
    metaDescription:
      "Manage annual maintenance contracts in Numunix: covered equipment, scheduled preventive visits, expiry tracking and automated renewal reminders.",
    demo: "booking",
    stats: [
      ["ACTIVE CONTRACTS", "126"],
      ["DUE THIS MONTH", "9"],
      ["RENEWAL RATE", "81%"],
      ["VISITS PLANNED", "AUTO"],
    ],
    capabilities: [
      { title: "Contract records", body: "Covered equipment, included visits, terms and value in one place." },
      { title: "Planned visits", body: "Preventive services are scheduled ahead and appear on the normal job board." },
      { title: "Expiry tracking", body: "Contracts approaching the end date surface well before they lapse." },
      { title: "Renewal outreach", body: "Reminders and renewal quotes go out automatically on your timeline." },
    ],
    steps: [
      { step: "01", title: "Contract created", body: "Terms, equipment and included visits recorded." },
      { step: "02", title: "Visits planned", body: "Preventive services scheduled across the contract period." },
      { step: "03", title: "Expiry flagged", body: "The renewal window opens on the operations board." },
      { step: "04", title: "Renewed", body: "Quote sent, accepted and the next period begins." },
    ],
    outcomes: [
      "Predictable recurring revenue instead of one-off jobs",
      "Preventive visits actually happen",
      "No contract quietly expiring unnoticed",
    ],
    faq: [
      { q: "Do AMC visits use the same dispatch?", a: "Yes — planned visits behave like any other job on the board." },
      { q: "Can contracts cover multiple machines?", a: "A contract can list several pieces of equipment at one or more sites." },
    ],
  },
  {
    slug: "whatsapp-communication",
    label: "CUSTOMER OPERATIONS",
    name: "WhatsApp Communication",
    title: "One thread for every customer.",
    accentWord: "every customer.",
    intro:
      "Bookings, reminders, on-the-way updates, invoices and follow-ups all reach the customer where they already read messages — and every reply lands on the job.",
    metaTitle: "WhatsApp Customer Communication for Service Teams | Numunix",
    metaDescription:
      "Send booking confirmations, technician updates, invoices and follow-ups on WhatsApp with Numunix, with every message logged against the service job.",
    demo: "voice",
    stats: [
      ["MESSAGES / DAY", "210"],
      ["READ RATE", "HIGH"],
      ["REPLIES LOGGED", "100%"],
      ["TEMPLATES", "READY"],
    ],
    capabilities: [
      { title: "Job-linked threads", body: "Every conversation is attached to the customer and the job it belongs to." },
      { title: "Prepared templates", body: "Confirmation, reminder, on-the-way, invoice and feedback messages ready to use." },
      { title: "Two-way", body: "Customer replies arrive in the same place your team already works." },
      { title: "Shared inbox", body: "No conversation trapped on one person's personal phone." },
    ],
    steps: [
      { step: "01", title: "Booked", body: "Confirmation with time, technician and reference." },
      { step: "02", title: "On the way", body: "Departure and ETA update sent automatically." },
      { step: "03", title: "Completed", body: "Summary of the work carried out." },
      { step: "04", title: "Invoiced", body: "Invoice and payment link in the same thread." },
    ],
    outcomes: [
      "Customers stop calling to ask for status",
      "Nothing lost in personal chats",
      "A complete written record per job",
    ],
    faq: [
      { q: "Do replies reach the right person?", a: "Messages route to the job owner and stay visible to the whole team." },
      { q: "Is there a message history?", a: "The full thread stays on the customer timeline." },
    ],
  },
];

export const featureBySlug = (slug: string) =>
  FEATURES.find((f) => f.slug === slug);
