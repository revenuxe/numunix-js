import { CONTACT } from "./site";

export type CompanyPageData = {
  slug: string;
  label: string;
  title: string;
  accent: string;
  intro: string;
  metaTitle: string;
  metaDescription: string;
  stats: [string, string][];
  sections: {
    label: string;
    title: string;
    accent?: string;
    body?: string;
    tone?: "light" | "dark";
    bg?: string;
    items: [string, string][];
  }[];
  ctaTitle?: string;
  ctaAccent?: string;
  ctaBody?: string;
};

export type LegalPageData = {
  slug: string;
  label: string;
  title: string;
  accent: string;
  intro: string;
  metaTitle: string;
  metaDescription: string;
  updated: string;
  sections: { heading: string; paragraphs: string[] }[];
};

const sharedCTA = {
  ctaTitle: "Bring your service work together.",
  ctaAccent: "service work together.",
  ctaBody: "Use one workspace to coordinate enquiries, bookings, technicians, jobs and invoices.",
};

export const APPROACH: CompanyPageData = {
  slug: "repair-assessment",
  label: "LEAD MANAGEMENT",
  title: "Turn each service enquiry into a clear next step.",
  accent: "a clear next step.",
  intro: "Capture customer and equipment details, review incoming requests and keep follow-up connected to the service work that comes next.",
  metaTitle: "Service Lead Management Software | Numunix",
  metaDescription: "Capture service enquiries, organize customer details and keep follow-up connected to bookings and job records in Numunix.",
  stats: [["CAPTURE", "New enquiries"], ["REVIEW", "Customer details"], ["FOLLOW UP", "Next action"], ["CONVERT", "Service booking"]],
  sections: [{
    label: "FROM REQUEST TO BOOKING",
    title: "Keep the enquiry in context.",
    items: [
      ["Collect useful details", "Record customer contact information, the requested service and the equipment details needed by your team."],
      ["Review new requests", "Use a shared lead view to see what has arrived and what needs a response."],
      ["Track follow-up", "Keep the next action and request status with its customer record."],
      ["Move work forward", "Connect a suitable enquiry to a booking and continue the service record."],
    ],
  }],
  ...sharedCTA,
};

export const PROCESS: CompanyPageData = {
  slug: "repair-process",
  label: "SERVICE WORKFLOW",
  title: "From first request to completed service.",
  accent: "completed service.",
  intro: "Numunix brings the steps service teams coordinate every day into one connected operational workflow.",
  metaTitle: "Service Management Workflow Software | Numunix",
  metaDescription: "Coordinate service enquiries, bookings, technician assignments, job progress and invoices through one connected workflow.",
  stats: [["ENQUIRY", "Capture"], ["BOOKING", "Schedule"], ["JOB", "Track"], ["INVOICE", "Record"]],
  sections: [{
    label: "A CONNECTED SERVICE JOURNEY",
    title: "One record, shared across the work.",
    items: [
      ["01 Capture", "Add a new enquiry and keep customer and service details together."],
      ["02 Schedule", "Organize the booking and the appointment information your team needs."],
      ["03 Assign", "Connect the job to a technician and its service record."],
      ["04 Update", "Follow job status as work moves through the team."],
      ["05 Complete", "Record completion and retain the service history."],
      ["06 Invoice", "Keep billing records connected to the completed service job."],
    ],
  }],
  ...sharedCTA,
};

export const TECHNOLOGY: CompanyPageData = {
  slug: "repair-diagnostics",
  label: "OPERATIONS OVERVIEW",
  title: "See what needs attention across the team.",
  accent: "across the team.",
  intro: "Bring leads, bookings, job progress and invoice follow-up into a shared view designed for day-to-day service operations.",
  metaTitle: "Service Operations Dashboard | Numunix",
  metaDescription: "Review service enquiries, bookings, jobs, technicians and invoice records through one service operations dashboard.",
  stats: [["LEADS", "Review"], ["BOOKINGS", "Schedule"], ["JOBS", "Track"], ["INVOICES", "Follow up"]],
  sections: [{
    label: "TEAM VISIBILITY",
    title: "Find the next useful action.",
    items: [
      ["New enquiries", "Review incoming requests and the customer details attached to each one."],
      ["Upcoming bookings", "Keep scheduled service work visible to the people coordinating it."],
      ["Jobs in progress", "See assigned jobs and their latest recorded status."],
      ["Invoice records", "Keep billing activity connected to customer and job information."],
    ],
  }],
  ...sharedCTA,
};

export const SECURITY: CompanyPageData = {
  slug: "repair-safety",
  label: "ACCESS & RECORDS",
  title: "Keep work information organized by role.",
  accent: "organized by role.",
  intro: "Numunix provides administrator and team sign-in for the service workspace. Keep customer, booking and job records available to the people coordinating that work.",
  metaTitle: "Service Workspace Access & Records | Numunix",
  metaDescription: "Learn how Numunix organizes service enquiries, bookings and job records in an administrator and team workspace.",
  stats: [["SIGN IN", "Team access"], ["CUSTOMERS", "Service context"], ["ASSIGNMENTS", "Clear ownership"], ["HISTORY", "Job records"]],
  sections: [{
    label: "WORKSPACE PRACTICES",
    title: "Clear access, useful records.",
    items: [
      ["Use individual sign-in", "Team members sign in to reach the workspace functions available to them."],
      ["Keep service context together", "Customer and equipment details stay associated with their service requests and jobs."],
      ["Record job changes", "Status updates help the team understand where work stands."],
      ["Handle customer data thoughtfully", "Only enter information your team needs to coordinate and complete the requested service work."],
    ],
  }],
  ...sharedCTA,
};

export const SUPPORT: CompanyPageData = {
  slug: "repair-aftercare",
  label: "TEAM WORKSPACE",
  title: "Keep the team aligned as work moves forward.",
  accent: "moves forward.",
  intro: "Give coordinators and technicians a shared view of assignments, customer context and service job updates.",
  metaTitle: "Service Team Management Workspace | Numunix",
  metaDescription: "Coordinate technician assignments, job updates, customer context and service completion in the Numunix team workspace.",
  stats: [["ASSIGN", "Share work"], ["REVIEW", "Job details"], ["UPDATE", "Track progress"], ["COMPLETE", "Keep a record"]],
  sections: [{
    label: "COORDINATION",
    title: "Keep the service record moving.",
    items: [
      ["Review assigned work", "Keep technician assignments connected to their service job details."],
      ["Share the right context", "Make customer and equipment information available alongside the job."],
      ["Record progress", "Update the service status as work moves through the team."],
      ["Close the loop", "Record completion and keep the job history available for later reference."],
    ],
  }],
  ...sharedCTA,
};

export const COMPANY_PAGES = [APPROACH, PROCESS, TECHNOLOGY, SECURITY, SUPPORT] as const;

export const PRIVACY: LegalPageData = {
  slug: "privacy",
  label: "PRIVACY",
  title: "Your information, handled with care.",
  accent: "handled with care.",
  intro: "This policy explains information Numunix handles through the service-management workspace and public enquiry forms.",
  metaTitle: "Privacy Policy | Numunix Service Management",
  metaDescription: "Read how Numunix handles customer, team and service information submitted through its service-management workspace and public enquiry forms.",
  updated: "7 November 2026",
  sections: [
    { heading: "Who we are", paragraphs: ["Numunix provides a service-management workspace for service businesses and may also receive public service enquiries through this website."] },
    { heading: "Information you share", paragraphs: ["Depending on how you use the website, information may include contact details, customer and equipment details, service requests, booking information, job notes, invoice records and account sign-in information. Do not submit passwords, payment credentials or one-time codes in public enquiry forms."] },
    { heading: "How information is used", paragraphs: ["Information is used to operate the workspace, respond to service enquiries, coordinate bookings and jobs, maintain service records, provide support and protect the website and account access."] },
    { heading: "Access and service providers", paragraphs: ["Information may be processed by providers needed to host the website, store operational records and deliver requested communications. Access should be limited to people and providers involved in operating the service."] },
    { heading: "Retention", paragraphs: ["Records are retained for as long as needed to operate the workspace, respond to requests, meet applicable obligations and resolve disputes. Retention can vary by record type and the service relationship."] },
    { heading: "Your choices", paragraphs: [`For questions or requests about personal information, contact ${CONTACT.email}. Some records may need to be retained where legal or operational obligations apply.`] },
  ],
};

export const TERMS: LegalPageData = {
  slug: "terms",
  label: "TERMS",
  title: "Clear terms for a shared workspace.",
  accent: "shared workspace.",
  intro: "These terms cover use of the Numunix website and service-management workspace.",
  metaTitle: "Terms of Use | Numunix Service Management",
  metaDescription: "Review the terms for using the Numunix service-management workspace and website, including account access, records and service availability.",
  updated: "7 November 2026",
  sections: [
    { heading: "Workspace use", paragraphs: ["Use the workspace for lawful service-management activity. Do not attempt to disrupt the website, access another account or misuse customer information."] },
    { heading: "Account access", paragraphs: ["Keep account credentials private and notify Numunix if you believe an account has been accessed without permission. Users are responsible for activity carried out through their access."] },
    { heading: "Records and decisions", paragraphs: ["The workspace helps organize enquiries, bookings, jobs and invoice records. The service business remains responsible for the accuracy of information entered and for decisions made using those records."] },
    { heading: "Availability and changes", paragraphs: ["Features and website content may change as the service develops. No specific uptime, response time or uninterrupted availability is promised by this page."] },
    { heading: "Contact", paragraphs: [`Questions about these terms can be sent to ${CONTACT.email}.`] },
  ],
};
