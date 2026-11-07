import Header from "@/components/numunix/Header";
import Hero from "@/components/numunix/Hero";
import LogoMarquee from "@/components/numunix/LogoMarquee";
import PlatformIntro from "@/components/numunix/WorkflowVisualization";
import FeatureScroller from "@/components/numunix/FeatureScroller";
import IndustriesSection from "@/components/numunix/IndustriesSection";
import {
  AIAgentsSection,
  DispatchSection,
  SecuritySection,
  BuiltWithNumunix,
  FinalCTA,
} from "@/components/numunix/DarkSections";
import {
  AutomationWorkflow,
  IndustryCarousel,
  FeatureDirectory,
  AnalyticsDemo,
  BlogCards,
} from "@/components/numunix/LightSections";
import Footer from "@/components/numunix/Footer";
import { ContactFormSection } from "@/components/numunix/ContactFormSection";
import { HOMEPAGE_REPAIR, type RepairCategory } from "@/content/homepage-repairs";
import { useCategory, CategoryProvider } from "./category";

export function RepairHomepage({ category }: { category: RepairCategory }) {
  return (
    <CategoryProvider category={category}>
      <HomepageContent />
    </CategoryProvider>
  );
}

function HomepageContent() {
  const category = useCategory()?.category ?? "electronics";
  const content = HOMEPAGE_REPAIR[category];
  return (
    <div className="bg-ink-900" data-repair-category={category}>
      <Header />
      <main>
        <Hero
          headline="Building the Future"
          accent="of Repair Intelligence."
          intro="One connected platform to manage repair enquiries, appliance details, bookings, technician assignments, job progress and invoicing. Make repair operations simpler, faster and more organized."
          primaryLabel="GET STARTED"
          primaryHref="/contact"
          secondaryLabel="EXPLORE PLATFORM"
          secondaryHref="#approach"
        />
        <LogoMarquee />
        <PlatformIntro />
        <nav aria-label="Other repair category" className="border-y border-border bg-paper py-6">
          <div className="shell flex flex-wrap items-center justify-between gap-3">
            <p className="text-base text-navytext">
              {category === "electronics"
                ? "Manage appliance service operations?"
                : "Manage electronics service operations?"}
            </p>
            <a
              href={category === "electronics" ? "/appliances" : "/"}
              className="text-sm text-primary underline underline-offset-4"
            >
              {category === "electronics"
                ? "Explore the appliance workspace"
                : "Explore the electronics workspace"}
            </a>
          </div>
        </nav>
        <FeatureScroller />
        <AIAgentsSection />
        <AutomationWorkflow />
        <DispatchSection />
        <IndustryCarousel />
        <FeatureDirectory />
        <IndustriesSection />
        <SecuritySection />
        <BuiltWithNumunix />
        <AnalyticsDemo />
        <BlogCards />
        <FinalCTA />
        <ContactFormSection />
      </main>
      <Footer />
    </div>
  );
}
