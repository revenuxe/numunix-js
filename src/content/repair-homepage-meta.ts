import { repairPageHead } from "./repair-seo";
import { SITE_URL } from "./site";

export { SITE_URL } from "./site";

export function homepageHead() {
  const title = "Service Management Software for Service Businesses | Numunix";
  const description =
    "Coordinate leads, bookings, customer records, technician assignments, jobs and invoices across your service business in one workspace.";
  return repairPageHead({
    title,
    description,
    path: "/",
    type: "WebPage",
    about: [{ "@type": "SoftwareApplication", "@id": `${SITE_URL}/#service-management-software` }],
    entities: [{ "@type": "SoftwareApplication", "@id": `${SITE_URL}/#service-management-software` }],
  });
}
