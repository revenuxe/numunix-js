import { PRODUCT_SERVICES } from "./product-services";

/** Canonical base URL — no trailing slash */
export const SITE_URL = "https://numunix.com";

/** Default OG image used for social sharing when a page has no custom image */
export const OG_IMAGE = `${SITE_URL}/og-default.jpg`;

export const CONTACT = {
  phone: "+91 98862 85028",
  phoneHref: "tel:+919886285028",
  email: "numunix@gmail.com",
  emailHref: "mailto:numunix@gmail.com",
  whatsappHref: "https://wa.me/919886285028?text=Hi%20Numunix%2C%20I%27d%20like%20to%20discuss%20a%20project.",
  hours: "Mon – Sat · 9:00 AM – 8:00 PM IST",
  address: "11, 4th Cross, 2nd Main Rd, Shampura, Bengaluru, Karnataka 560045",
  addressLocality: "Bengaluru",
  addressRegion: "Karnataka",
  postalCode: "560045",
  addressCountry: "IN",
};

type Extra = {
  pains: string[];
  gains: string[];
  included: string[];
  useCases: { industry: string; body: string }[];
};

export const FEATURE_EXTRAS: Record<string, Extra> = {
  ...Object.fromEntries(PRODUCT_SERVICES.map((service) => [service.slug, {
    pains: service.slug === "e-commerce"
      ? ["Shoppers lose their way before checkout", "Orders and stock live in disconnected systems", "The store cannot support your next stage of growth"]
      : service.slug === "marketplaces"
        ? ["Buyers struggle to find the right provider", "Seller onboarding requires manual coordination", "Your team lacks a clear view of platform activity"]
        : ["Everyday tasks rely on spreadsheets and workarounds", "Users switch between disconnected tools", "Permissions and data flows are difficult to manage"],
    gains: service.outcomes,
    included: ["Requirements and release scope", "User flows and interface design", "Development and integration planning", "Validation and deployment handoff", "Options for maintenance and improvements"],
    useCases: service.capabilities.slice(0, 3).map((item) => ({ industry: item.title.toUpperCase(), body: item.body })),
  }])),
  "web-development": {
    pains: [
      "Your website no longer reflects your business",
      "Slow or confusing journeys lose potential customers",
      "Your team needs functionality a template cannot provide",
    ],
    gains: [
      "A clear, responsive experience across screen sizes",
      "A website or application shaped around your goals",
      "A maintainable foundation for future features",
    ],
    included: [
      "Discovery and requirements defined with your team",
      "Design and development scoped to your project",
      "Validation of agreed user journeys",
      "Deployment and handoff planning",
      "Options for ongoing improvements and support",
    ],
    useCases: [
      {
        industry: "BUSINESS WEBSITES",
        body: "Company sites, landing pages, and content-driven experiences.",
      },
      {
        industry: "WEB APPLICATIONS",
        body: "Customer portals, dashboards, and booking systems.",
      },
      {
        industry: "MARKETPLACES",
        body: "Multi-vendor experiences with accounts, search, and transactions.",
      },
    ],
  },
  "mobile-app-development": {
    pains: [
      "Users struggle to complete tasks on mobile",
      "Disconnected tools interrupt the customer journey",
      "An app idea needs a practical development plan",
    ],
    gains: [
      "A consistent experience for iOS and Android users",
      "Core tasks designed for convenient mobile use",
      "An app foundation that can evolve with your roadmap",
    ],
    included: [
      "Discovery and requirements defined with your team",
      "Design and development scoped to your project",
      "Validation of agreed user journeys",
      "Deployment and handoff planning",
      "Options for ongoing improvements and support",
    ],
    useCases: [
      {
        industry: "CONSUMER APPS",
        body: "Useful everyday experiences with clear onboarding.",
      },
      {
        industry: "BUSINESS APPS",
        body: "Connected tools for teams working away from a desk.",
      },
      {
        industry: "MARKETPLACES",
        body: "Mobile experiences linking customers and providers.",
      },
    ],
  },
  "custom-software": {
    pains: [
      "Your business process is split across spreadsheets and chats",
      "Off-the-shelf tools force awkward workarounds",
      "Teams cannot find a reliable view of their work",
    ],
    gains: [
      "Tools that reflect your processes and responsibilities",
      "Less duplicate entry across connected systems",
      "A clearer view of the information your team needs",
    ],
    included: [
      "Discovery and requirements defined with your team",
      "Design and development scoped to your project",
      "Validation of agreed user journeys",
      "Deployment and handoff planning",
      "Options for ongoing improvements and support",
    ],
    useCases: [
      {
        industry: "INTERNAL TOOLS",
        body: "Approvals, reporting, and team workflows.",
      },
      {
        industry: "BUSINESS SYSTEMS",
        body: "CRM, inventory, HR, and quotation platforms.",
      },
      {
        industry: "CUSTOMER PORTALS",
        body: "Shared records and self-service experiences.",
      },
    ],
  },
  "saas-development": {
    pains: [
      "The product idea is too broad for a first release",
      "Billing, roles, and onboarding are disconnected",
      "Early architecture makes future changes difficult",
    ],
    gains: [
      "A focused first release with clear priorities",
      "A connected product experience from signup to daily use",
      "A foundation for iteration as your customer base grows",
    ],
    included: [
      "Discovery and requirements defined with your team",
      "Design and development scoped to your project",
      "Validation of agreed user journeys",
      "Deployment and handoff planning",
      "Options for ongoing improvements and support",
    ],
    useCases: [
      {
        industry: "B2B SOFTWARE",
        body: "Tools that help businesses manage work and collaboration.",
      },
      {
        industry: "VERTICAL SAAS",
        body: "Products designed for a specific industry or workflow.",
      },
      {
        industry: "SUBSCRIPTION PRODUCTS",
        body: "Recurring-value products with accounts and billing.",
      },
    ],
  },
  "ai-automation": {
    pains: [
      "Repetitive tasks consume time across the team",
      "Useful knowledge is difficult to search and access",
      "AI experiments are disconnected from real workflows",
    ],
    gains: [
      "AI features designed for a concrete business use case",
      "Connected workflows with clear human handoff points",
      "A practical approach to evaluating output quality",
    ],
    included: [
      "Discovery and requirements defined with your team",
      "Design and development scoped to your project",
      "Validation of agreed user journeys",
      "Deployment and handoff planning",
      "Options for ongoing improvements and support",
    ],
    useCases: [
      {
        industry: "AI PRODUCTS",
        body: "Assistants and intelligent features inside your application.",
      },
      {
        industry: "BUSINESS WORKFLOWS",
        body: "Data processing, routing, and connected automation.",
      },
      {
        industry: "CUSTOMER EXPERIENCES",
        body: "Chat and voice interfaces with defined boundaries.",
      },
    ],
  },
  "ui-ux-design": {
    pains: [
      "Users struggle to find the next step",
      "Screens look disconnected across the product",
      "Development starts before the experience is defined",
    ],
    gains: [
      "Clearer journeys through complex product tasks",
      "Consistent interfaces across screens and states",
      "Design decisions connected to user and business needs",
    ],
    included: [
      "Discovery and requirements defined with your team",
      "Design and development scoped to your project",
      "Validation of agreed user journeys",
      "Deployment and handoff planning",
      "Options for ongoing improvements and support",
    ],
    useCases: [
      {
        industry: "NEW PRODUCTS",
        body: "Explore and shape the experience before development.",
      },
      {
        industry: "REDESIGNS",
        body: "Improve existing interfaces and user journeys.",
      },
      {
        industry: "DESIGN SYSTEMS",
        body: "Reusable patterns for a consistent product experience.",
      },
    ],
  },
  "cloud-integrations": {
    pains: [
      "Manual handoffs keep business tools disconnected",
      "Deployments depend on undocumented steps",
      "Infrastructure needs are unclear before launch",
    ],
    gains: [
      "Connected systems with defined data flows",
      "A repeatable path from development to deployment",
      "Operational visibility as the product grows",
    ],
    included: [
      "Discovery and requirements defined with your team",
      "Design and development scoped to your project",
      "Validation of agreed user journeys",
      "Deployment and handoff planning",
      "Options for ongoing improvements and support",
    ],
    useCases: [
      {
        industry: "PRODUCT LAUNCHES",
        body: "Prepare applications and environments for release.",
      },
      {
        industry: "CONNECTED BUSINESS",
        body: "Integrate CRMs, payments, and internal systems.",
      },
      {
        industry: "PLATFORM GROWTH",
        body: "Review infrastructure and bottlenecks as usage changes.",
      },
    ],
  },
  "maintenance-support": {
    pains: [
      "Issues accumulate after the initial release",
      "Performance suffers as product usage grows",
      "New features lack a clear implementation plan",
    ],
    gains: [
      "A clear process for product improvements",
      "Technical work prioritized around business needs",
      "Continuity beyond the initial launch",
    ],
    included: [
      "Discovery and requirements defined with your team",
      "Design and development scoped to your project",
      "Validation of agreed user journeys",
      "Deployment and handoff planning",
      "Options for ongoing improvements and support",
    ],
    useCases: [
      {
        industry: "EXISTING PRODUCTS",
        body: "Maintain and improve an application already in use.",
      },
      {
        industry: "GROWING PLATFORMS",
        body: "Prioritize optimization as requirements change.",
      },
      {
        industry: "LONG-TERM ROADMAPS",
        body: "Plan and deliver ongoing product enhancements.",
      },
    ],
  },
};

export const DEFAULT_EXTRA: Extra = FEATURE_EXTRAS["custom-software"]!;
