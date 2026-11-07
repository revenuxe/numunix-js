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
import { ProductContactSection } from "@/components/numunix/ContactFormSection";
export function RepairHomepage() {
  return <HomepageContent />;
}

function HomepageContent() {
  return (
    <div className="bg-ink-900">
      <Header />
      <main>
        <Hero
          headline="Service Management"
          accent="for the work ahead."
          intro="Coordinate enquiries, bookings, customers, technicians, job progress and invoices from one connected workspace. Quotation management is planned."
          primaryLabel="GET STARTED"
          primaryHref="/contact"
          secondaryLabel="EXPLORE PLATFORM"
          secondaryHref="#approach"
        />
        <LogoMarquee />
        <PlatformIntro />
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
        <ProductContactSection />
      </main>
      <Footer />
    </div>
  );
}
