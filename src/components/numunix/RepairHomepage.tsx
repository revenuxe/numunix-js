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
  return <CategoryProvider category={category}><HomepageContent /></CategoryProvider>;
}

function HomepageContent() {
  const category = useCategory()?.category ?? "electronics";
  const content = HOMEPAGE_REPAIR[category];
  return (
    <div className="bg-ink-900" data-repair-category={category}>
      <Header />
      <main>
        <Hero
          headline={content.headline}
          accent={content.accent}
          intro={content.intro}
          primaryLabel="BOOK A REPAIR"
          secondaryLabel="WHAT WE REPAIR"
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
        <ContactFormSection />
      </main>
      <Footer />
    </div>
  );
}
