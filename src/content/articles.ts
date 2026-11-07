export type Article = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  excerpt: string;
  author: string;
  publishedAt: string;
  updatedAt?: string;
  cta?: { afterSection: number; title: string; body: string; label: string };
  readTime: string;
  category: string;
  tags: string[];
  highlights?: { value: string; label: string }[];
  content: ArticleSection[];
};

export type ArticleSection = { heading: string; body: string };

export const ARTICLES: Article[] = [
  {
    slug: "service-enquiry-management",
    title: "A practical workflow for service enquiries",
    metaTitle: "Service Enquiry Management Workflow | Numunix",
    metaDescription: "Learn how to capture service enquiries, keep customer context and follow the next action through a shared lead workflow.",
    excerpt: "A shared lead workflow helps a service team review incoming requests and keep follow-up tied to the customer and the work requested.",
    author: "Numunix",
    publishedAt: "2026-11-07",
    readTime: "5 min read",
    category: "Service operations",
    tags: ["Lead management", "Customer records", "Workflow"],
    cta: { afterSection: 2, title: "Connect enquiries to service work", body: "Explore the Numunix lead and booking workflow for service teams.", label: "EXPLORE LEAD MANAGEMENT" },
    content: [
      { heading: "Capture a useful request", body: "<p>Start with the details your team needs to understand and route the request: a way to contact the customer, the service requested, the relevant equipment or site information, and a concise description of the issue. Keep the intake focused so requests are easy to review.</p>" },
      { heading: "Give each request a clear next action", body: "<p>A lead list is most useful when the team can tell what should happen next. Use consistent statuses and assign follow-up ownership. Avoid treating a status as a substitute for the conversation itself; record enough context for another team member to continue the work.</p>" },
      { heading: "Connect the enquiry to the booking", body: "<p>When a request is ready to schedule, carry its customer and service details into the booking. This reduces repeated entry and gives coordinators a clear record of why the appointment was arranged.</p>" },
      { heading: "Review the workflow regularly", body: "<p>Look for requests with no next action, incomplete contact details or a status that has not changed after follow-up. Agree a simple team routine for reviewing these items. A useful process depends on accurate records and people acting on them.</p>" },
    ],
  },
  {
    slug: "service-booking-workflow",
    title: "Organizing bookings for service teams",
    metaTitle: "Service Booking Workflow Guide | Numunix",
    metaDescription: "Organize service bookings with clear customer details, appointment information, ownership and handover into the job workflow.",
    excerpt: "A booking record should give coordinators and technicians the same view of the request, appointment and next service step.",
    author: "Numunix",
    publishedAt: "2026-11-07",
    readTime: "5 min read",
    category: "Service operations",
    tags: ["Bookings", "Scheduling", "Handover"],
    content: [
      { heading: "Keep appointment details together", body: "<p>Store the requested service, customer contact, agreed time window and relevant access notes in one booking record. Include only information the team needs to prepare and complete the visit.</p>" },
      { heading: "Make ownership visible", body: "<p>Give each booking a clear coordinator or next responsible role. If the appointment changes, record the update where the rest of the team will see it instead of relying on a separate message thread.</p>" },
      { heading: "Prepare the job handover", body: "<p>Before work is assigned, confirm that the booking contains enough service context to create or update the job. The handover should carry forward the customer, appointment and requested scope without implying that unconfirmed work is already approved.</p>" },
      { heading: "Keep booking status meaningful", body: "<p>Use a small set of consistent states that match your team's process. Make it clear whether a time is requested, scheduled or confirmed, and who follows up when a booking needs attention.</p>" },
    ],
  },
  {
    slug: "technician-job-assignment",
    title: "Making technician job assignments clear",
    metaTitle: "Technician Job Assignment Guide | Numunix",
    metaDescription: "Create clearer technician handovers by connecting assigned work with customer context, job details and progress updates.",
    excerpt: "Clear assignments connect the person responsible, service details and the status updates coordinators need to follow.",
    author: "Numunix",
    publishedAt: "2026-11-07",
    readTime: "5 min read",
    category: "Team coordination",
    tags: ["Technicians", "Assignments", "Job tracking"],
    content: [
      { heading: "Assign work with enough context", body: "<p>An assignment should connect a technician to a specific job and include the service details needed to understand the task. Keep customer contact and appointment information associated with that job rather than scattering it across unrelated records.</p>" },
      { heading: "Set expectations for updates", body: "<p>Agree which status changes matter to coordinators, such as accepted, in progress, awaiting a decision or complete. A shared vocabulary makes the job list easier to scan and reduces guesswork during handovers.</p>" },
      { heading: "Record changes in the job history", body: "<p>If timing, ownership or scope changes, update the service record so the team has a current view. Use notes for relevant context and avoid adding sensitive information that is not needed to perform the work.</p>" },
      { heading: "Close the assignment clearly", body: "<p>When the job is complete, record its outcome and any next administrative action. This gives coordinators a reliable handover into completion review and invoicing.</p>" },
    ],
  },
  {
    slug: "service-job-tracking",
    title: "A consistent way to track service jobs",
    metaTitle: "Service Job Tracking Workflow | Numunix",
    metaDescription: "Set up service job statuses that show ownership, progress, blockers and completion without relying on scattered updates.",
    excerpt: "Job tracking works best when statuses describe real steps and every active job has a clear owner and next action.",
    author: "Numunix",
    publishedAt: "2026-11-07",
    readTime: "5 min read",
    category: "Service operations",
    tags: ["Job tracking", "Status workflow", "Operations"],
    content: [
      { heading: "Choose statuses your team can act on", body: "<p>Use status names that describe a meaningful state of work. A short workflow is usually easier to maintain than a long list of labels that teams interpret differently.</p>" },
      { heading: "Keep ownership and blockers visible", body: "<p>For active work, make it possible to see who is responsible and what is holding up the next step. Record a blocker with enough context to guide follow-up, without turning the status field into a long narrative.</p>" },
      { heading: "Review work by its next action", body: "<p>Daily reviews can focus on jobs that need assignment, customer confirmation, technician updates or completion review. This makes the job board useful for deciding what to do rather than only reporting what happened.</p>" },
      { heading: "Connect completion to records", body: "<p>When work is marked complete, retain the completion details with the job and identify any remaining administrative step, such as preparing an invoice or arranging a follow-up.</p>" },
    ],
  },
  {
    slug: "service-invoice-management",
    title: "Keeping service invoices connected to jobs",
    metaTitle: "Service Invoice Management Guide | Numunix",
    metaDescription: "Keep service invoice records tied to customer and job details, with a clear review and follow-up process for the team.",
    excerpt: "Invoice records are easier to follow when they remain connected to the customer and completed service work they relate to.",
    author: "Numunix",
    publishedAt: "2026-11-07",
    readTime: "5 min read",
    category: "Billing operations",
    tags: ["Invoicing", "Job records", "Billing"],
    content: [
      { heading: "Start from the service record", body: "<p>Before preparing an invoice, confirm which customer and completed job it relates to. Keeping the billing record connected to service details makes later questions easier to resolve.</p>" },
      { heading: "Review invoice details before recording", body: "<p>Use your business's own billing process to confirm the line items, amounts, tax treatment and payment terms. The workspace can organize invoice records, but the service business remains responsible for the accuracy and compliance of its invoices.</p>" },
      { heading: "Track the next billing action", body: "<p>Use a clear record status to distinguish an invoice that is being prepared from one that has been shared or recorded. Keep follow-up ownership visible to the team.</p>" },
      { heading: "Keep the history with the job", body: "<p>Retain the invoice reference and relevant status alongside the service job. This gives operations and billing teams a shared view without relying on a separate spreadsheet to reconnect the records.</p>" },
    ],
  },
];

export function articleBySlug(slug: string): Article | undefined {
  return ARTICLES.find((article) => article.slug === slug);
}
