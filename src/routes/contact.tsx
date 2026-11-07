import { createFileRoute } from "@tanstack/react-router";
import Header from "@/components/numunix/Header";
import Footer from "@/components/numunix/Footer";
import Hero from "@/components/numunix/Hero";
import { ProductContactSection } from "@/components/numunix/ContactFormSection";
import { repairPageHead } from "@/content/repair-seo";

const TITLE = "Contact Numunix Service Management | Numunix";
const DESC = "Contact Numunix about service management for your team. Ask about the workspace, team access, bookings, jobs and invoicing.";

export const Route = createFileRoute("/contact")({
  head: () => repairPageHead({ title: TITLE, description: DESC, path: "/contact", type: "ContactPage", breadcrumbs: [{ name: "Contact", path: "/contact" }] }),
  component: ContactPage,
});

function ContactPage() {
  return <div className="bg-[#05070c]"><Header/><main><Hero headline="Talk to Numunix." accent="Plan your service workspace." intro="Ask us about coordinating enquiries, bookings, technicians, service jobs and invoicing in one place." primaryLabel="EMAIL OUR TEAM" primaryHref="mailto:numunix@gmail.com?subject=Numunix%20service%20management" secondaryLabel="OPEN WORKSPACE" secondaryHref="https://app.numunix.com"/><ProductContactSection/></main><Footer/></div>;
}
