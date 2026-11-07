export type ServiceManagementFeature = {
  slug: string;
  nav: string;
  eyebrow: string;
  title: string;
  description: string;
  metaTitle: string;
  metaDescription: string;
  steps: [string, string][];
  planned?: boolean;
};

export const SERVICE_MANAGEMENT_FEATURES: ServiceManagementFeature[] = [
  {
    slug: "leads",
    nav: "Lead management",
    eyebrow: "ENQUIRIES",
    title: "Turn service enquiries into organized work.",
    description: "Capture customer and equipment details, review new requests and keep follow-up tied to the next service step.",
    metaTitle: "Lead Management Software for Service Teams | Numunix",
    metaDescription: "Capture service enquiries, organize customer details and track follow-up in Numunix service management software.",
    steps: [["Capture", "Record the request and contact details."], ["Review", "Check the service information and decide the next action."], ["Follow up", "Keep the request moving toward a booking."]],
  },
  {
    slug: "bookings",
    nav: "Booking management",
    eyebrow: "SCHEDULING",
    title: "Keep service bookings clear for the team.",
    description: "Organize customer requests, appointment details and service information in a shared booking workflow.",
    metaTitle: "Service Booking Management Software | Numunix",
    metaDescription: "Organize service requests, appointment details and customer information in one booking workflow for service teams.",
    steps: [["Review", "Keep the request and service details together."], ["Schedule", "Record the appointment information the team needs."], ["Connect", "Carry the booking details into the service job."]],
  },
  {
    slug: "customers",
    nav: "Customer records",
    eyebrow: "CUSTOMERS",
    title: "Keep customer context connected to service work.",
    description: "Find contact details and service history alongside enquiries, bookings and job records.",
    metaTitle: "Customer Records for Service Businesses | Numunix",
    metaDescription: "Keep customer contact details and service history connected to enquiries, bookings and jobs in Numunix.",
    steps: [["Find", "Review customer contact information."], ["Understand", "Keep service requests and bookings in context."], ["Continue", "Use the customer record to follow the next service step."]],
  },
  {
    slug: "technicians",
    nav: "Technician workspace",
    eyebrow: "FIELD TEAM",
    title: "Connect technician assignments to the job.",
    description: "Keep assigned work, service details and progress updates together for technicians and coordinators.",
    metaTitle: "Technician Management Software for Service Teams | Numunix",
    metaDescription: "Coordinate technician assignments, service details and job progress in a shared field-service workspace.",
    steps: [["Assign", "Connect a technician to service work."], ["Review", "Keep the job details available with the assignment."], ["Update", "Record progress and completion for the team."]],
  },
  {
    slug: "jobs",
    nav: "Job tracking",
    eyebrow: "SERVICE JOBS",
    title: "Follow service jobs from assignment to completion.",
    description: "Track job ownership, customer context and status updates through a consistent service workflow.",
    metaTitle: "Service Job Tracking Software | Numunix",
    metaDescription: "Track assignments, job status and completion records for service work in one shared workspace.",
    steps: [["Create", "Start a job from service work that needs tracking."], ["Progress", "Keep assignment and status updates connected."], ["Complete", "Record the outcome and retain the job history."]],
  },
  {
    slug: "quotations",
    nav: "Quotations",
    eyebrow: "QUOTATIONS",
    title: "Bring quotations into the service workflow.",
    description: "Keep proposed work and customer approval aligned before a service job moves forward.",
    metaTitle: "Service Quotations and Estimates | Numunix",
    metaDescription: "Plan a connected quotation workflow for service requests, customer approval and job records with Numunix.",
    steps: [["Prepare", "Set out the proposed service work."], ["Review", "Keep the customer decision with the request."], ["Continue", "Connect approved work to the next service step."]],
    planned: true,
  },
  {
    slug: "invoicing",
    nav: "Invoicing",
    eyebrow: "BILLING",
    title: "Keep service invoices connected to the job.",
    description: "Prepare invoice records from completed service work and keep customer and job details close by.",
    metaTitle: "Service Invoicing Software | Numunix",
    metaDescription: "Prepare service invoices and keep billing records connected to customer and job information in Numunix.",
    steps: [["Review", "Open the service and customer record."], ["Prepare", "Enter the invoice details for completed work."], ["Record", "Keep the billing status with the job history."]],
  },
  {
    slug: "dashboard",
    nav: "Operations dashboard",
    eyebrow: "OVERVIEW",
    title: "See the next actions across service operations.",
    description: "Review enquiries, bookings, job assignments and invoice follow-up through a single team overview.",
    metaTitle: "Service Management Dashboard | Numunix",
    metaDescription: "Review service enquiries, bookings, job assignments and invoice follow-up from one operations dashboard.",
    steps: [["Review", "See incoming requests and upcoming work."], ["Coordinate", "Follow job assignments and active work."], ["Follow up", "Keep outstanding service and billing actions in view."]],
  },
];

export function serviceManagementFeature(slug: string) {
  return SERVICE_MANAGEMENT_FEATURES.find((feature) => feature.slug === slug);
}
