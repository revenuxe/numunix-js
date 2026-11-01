import { createFileRoute } from "@tanstack/react-router";
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
import { SITE_URL, OG_IMAGE, CONTACT } from "@/content/site";
import { HOMEPAGE_REPAIR } from "@/content/homepage-repairs";
import { useCategory, CategoryProvider } from "@/components/numunix/category";

const TITLE = "Numunix | Mobile, Laptop, CCTV & Electronics Repair in Bangalore";
const DESC =
  "Expert repair for mobiles, laptops, CCTV, TVs, tablets, and home appliances. Walk in or book a doorstep visit — clear estimates, tested parts, and a service warranty on every job.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: SITE_URL },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: SITE_URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Numunix",
          url: SITE_URL,
          logo: `${SITE_URL}/numunix-logo.webp`,
          image: OG_IMAGE,
          description: DESC,
          contactPoint: {
            "@type": "ContactPoint",
            email: CONTACT.email,
            telephone: CONTACT.phone,
            contactType: "sales",
            availableLanguage: "English",
          },
          address: {
            "@type": "PostalAddress",
            streetAddress: "Shop No 1, 1st Floor, 10/1, 10th Cross, LR Bande C L Ramaiah Layout, RT Nagar Post",
            addressLocality: CONTACT.addressLocality,
            addressRegion: CONTACT.addressRegion,
            postalCode: CONTACT.postalCode,
            addressCountry: CONTACT.addressCountry,
          },
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <CategoryProvider>
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
          headline={content.headline}
          accent={content.accent}
          intro={content.intro}
          primaryLabel="BOOK A REPAIR"
          secondaryLabel="WHAT WE REPAIR"
          showCategoryToggle
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
