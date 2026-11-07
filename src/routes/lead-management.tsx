import { createFileRoute } from "@tanstack/react-router";
import { CompanyPage } from "@/components/numunix/CompanyPage";
import ServiceDemo from "@/components/numunix/ServiceDemo";
import { Section, SectionHead } from "@/components/numunix/PageShell";
import { Reveal } from "@/components/numunix/primitives";
import { APPROACH } from "@/content/company";
import { repairPageHead } from "@/content/repair-seo";

export const Route = createFileRoute("/lead-management")({
  head: () => repairPageHead({ title: APPROACH.metaTitle, description: APPROACH.metaDescription, path: "/lead-management", breadcrumbs: [{ name: "Lead management", path: "/lead-management" }] }),
  component: () => <CompanyPage page={APPROACH}><Section bg="#f7f9fc"><SectionHead label="ENQUIRY MANAGEMENT" title="Keep the request and the next action together." accent="the next action together." body="Capture service requests, review customer and equipment details, and move suitable enquiries into bookings without losing context."/><Reveal delay={80}><ServiceDemo slug="fault-intake" preset="workspace-leads" href="https://app.numunix.com"/></Reveal></Section><Section bg="#07111f"><div className="mx-auto max-w-2xl text-center"><h2 className="text-[clamp(28px,4vw,42px)] font-light leading-tight text-white">A clearer starting point for <span className="text-[#60a5fa]">service work.</span></h2><p className="mx-auto mt-5 max-w-[48ch] text-[17px] leading-relaxed text-white/60">Use one shared lead view to coordinate customer requests and the next service step.</p></div></Section></CompanyPage>,
});
