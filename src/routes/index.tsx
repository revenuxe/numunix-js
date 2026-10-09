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

const TITLE = "Numunix | Software, Websites, Apps & Digital Products";
const DESC =
  "We design and develop software, websites, apps, and digital products built for real-world growth. Explore web, mobile, SaaS, custom software, AI, and UI/UX services.";

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
    <div className="bg-[#05070c]">
      <Header />
      <main>
        <Hero />
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
