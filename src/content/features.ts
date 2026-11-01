import { PRODUCT_SERVICES } from "./product-services";

export type DemoKey = "call" | "booking" | "dispatch" | "jobs" | "invoice" | "voice" | "flow";

export type Feature = {
  slug: string;
  label: string; // mono micro-label
  name: string; // nav / card name
  title: string; // page H1 (accent applies to accentWord)
  accentWord: string;
  intro: string;
  metaTitle: string;
  metaDescription: string;
  demo: DemoKey;
  stats: [string, string][];
  capabilities: { title: string; body: string }[];
  steps: { step: string; title: string; body: string }[];
  outcomes: string[];
  faq: { q: string; a: string }[];
};

export const FEATURES: Feature[] = [
  ...PRODUCT_SERVICES,
  {
    slug: "web-development",
    label: "WEB DEVELOPMENT",
    name: "Web Development",
    title: "Websites built for growth.",
    accentWord: "built for growth.",
    intro: "Fast, responsive websites that make your business clear and easy to explore.",
    metaTitle: "Web Development Services | Numunix",
    metaDescription:
      "Modern, responsive, high-performance websites and web applications built for speed, usability, and scalability, from company websites to portals and complex platforms.",
    demo: "booking",
    stats: [
      ["FRONTEND", "React"],
      ["FRAMEWORK", "Next.js"],
      ["LANGUAGE", "TypeScript"],
      ["EXPERIENCE", "Responsive"],
    ],
    capabilities: [
      {
        title: "Business websites",
        body: "Corporate websites, landing pages, and service platforms with clear content and a strong user journey.",
      },
      {
        title: "Web applications",
        body: "Dashboards, portals, booking systems, and marketplaces built around your users and business rules.",
      },
      {
        title: "Performance and discovery",
        body: "Responsive interfaces, semantic pages, technical SEO foundations, and careful asset delivery.",
      },
      {
        title: "Modern frontend",
        body: "React, Next.js, Vite, JavaScript, TypeScript, and Tailwind CSS selected around the project requirements.",
      },
    ],
    steps: [
      {
        step: "01",
        title: "Discover",
        body: "Understand your users, business problem, and requirements.",
      },
      {
        step: "02",
        title: "Design",
        body: "Define the scope, experience, and technical approach.",
      },
      {
        step: "03",
        title: "Build and validate",
        body: "Develop the agreed solution and check the key user journeys.",
      },
      {
        step: "04",
        title: "Launch and improve",
        body: "Prepare for release and plan ongoing improvements.",
      },
    ],
    outcomes: [
      "A clear, responsive experience across screen sizes",
      "A website or application shaped around your goals",
      "A maintainable foundation for future features",
    ],
    faq: [
      {
        q: "Can you redesign an existing website?",
        a: "Yes. We can review the current content, user journeys, and technical setup, then scope a redesign or a focused improvement.",
      },
      {
        q: "Can the website connect to our existing tools?",
        a: "We can plan integrations with your CRM, payment provider, analytics, and other services based on their available APIs.",
      },
    ],
  },
  {
    slug: "mobile-app-development",
    label: "MOBILE DEVELOPMENT",
    name: "Mobile App Development",
    title: "Apps built around people.",
    accentWord: "around people.",
    intro: "Intuitive iOS and Android apps that put your product in your users’ hands.",
    metaTitle: "Mobile App Development Services | Numunix",
    metaDescription:
      "iOS and Android applications designed around your business goals and the way people use their phones. We build intuitive, connected experiences for consumer and business products.",
    demo: "dispatch",
    stats: [
      ["PLATFORMS", "iOS"],
      ["PLATFORMS", "Android"],
      ["FRAMEWORK", "React Native"],
      ["APPROACH", "Mobile-first"],
    ],
    capabilities: [
      {
        title: "Cross-platform development",
        body: "React Native applications with shared foundations and platform-aware interactions.",
      },
      {
        title: "User-centered experiences",
        body: "Navigation, onboarding, and core tasks designed for small screens and real usage.",
      },
      {
        title: "Connected applications",
        body: "Authentication, APIs, payments, and notifications integrated to fit your product.",
      },
      {
        title: "Release preparation",
        body: "Device testing, build configuration, and support for preparing store submissions.",
      },
    ],
    steps: [
      {
        step: "01",
        title: "Discover",
        body: "Understand your users, business problem, and requirements.",
      },
      {
        step: "02",
        title: "Design",
        body: "Define the scope, experience, and technical approach.",
      },
      {
        step: "03",
        title: "Build and validate",
        body: "Develop the agreed solution and check the key user journeys.",
      },
      {
        step: "04",
        title: "Launch and improve",
        body: "Prepare for release and plan ongoing improvements.",
      },
    ],
    outcomes: [
      "A consistent experience for iOS and Android users",
      "Core tasks designed for convenient mobile use",
      "An app foundation that can evolve with your roadmap",
    ],
    faq: [
      {
        q: "Do you develop for both iOS and Android?",
        a: "Yes. We use a cross-platform approach where it fits, and assess platform-specific requirements during discovery.",
      },
      {
        q: "Can an app use our existing backend?",
        a: "Yes. We review the API, authentication, data model, and mobile requirements before planning the integration.",
      },
    ],
  },
  {
    slug: "custom-software",
    label: "CUSTOM SOFTWARE",
    name: "Custom Software",
    title: "Software that fits your business.",
    accentWord: "fits your business.",
    intro: "Connected tools and workflows designed around the way your team works.",
    metaTitle: "Custom Software Services | Numunix",
    metaDescription:
      "Business software built around your exact workflows, requirements, and operational needs. Replace disconnected steps with tools that support the way your team works.",
    demo: "jobs",
    stats: [
      ["BACKEND", "Node.js"],
      ["INTEGRATION", "REST APIs"],
      ["DATA", "SQL / NoSQL"],
      ["ACCESS", "Role-based"],
    ],
    capabilities: [
      {
        title: "Business management",
        body: "CRM, ERP, inventory, quotation, and HR systems scoped around your organization.",
      },
      {
        title: "Workflow logic",
        body: "Approvals, assignments, reporting, and business rules modeled around actual processes.",
      },
      {
        title: "Database architecture",
        body: "PostgreSQL, MySQL, MongoDB, Supabase, and Redis chosen for the data and workload.",
      },
      {
        title: "Connected systems",
        body: "Authentication, APIs, and integrations that connect internal tools and existing services.",
      },
    ],
    steps: [
      {
        step: "01",
        title: "Discover",
        body: "Understand your users, business problem, and requirements.",
      },
      {
        step: "02",
        title: "Design",
        body: "Define the scope, experience, and technical approach.",
      },
      {
        step: "03",
        title: "Build and validate",
        body: "Develop the agreed solution and check the key user journeys.",
      },
      {
        step: "04",
        title: "Launch and improve",
        body: "Prepare for release and plan ongoing improvements.",
      },
    ],
    outcomes: [
      "Tools that reflect your processes and responsibilities",
      "Less duplicate entry across connected systems",
      "A clearer view of the information your team needs",
    ],
    faq: [
      {
        q: "Can you work with our current workflows?",
        a: "Yes. Discovery starts with your processes, users, and constraints so the software is designed around the business.",
      },
      {
        q: "Can you migrate data from existing systems?",
        a: "We can scope migration after reviewing the source data, export options, quality, and access requirements.",
      },
    ],
  },
  {
    slug: "saas-development",
    label: "SAAS DEVELOPMENT",
    name: "SaaS Development",
    title: "Your SaaS idea. Ready to grow.",
    accentWord: "Ready to grow.",
    intro: "From a focused MVP to a scalable platform, built with your next stage in mind.",
    metaTitle: "SaaS Development Services | Numunix",
    metaDescription:
      "We design and build SaaS platforms from architecture to launch. Validate the core product, support your first users, and create a technical foundation for growth.",
    demo: "invoice",
    stats: [
      ["FIRST RELEASE", "MVP"],
      ["PRODUCT", "B2B / B2C"],
      ["BILLING", "Subscriptions"],
      ["HOSTING", "Cloud"],
    ],
    capabilities: [
      {
        title: "MVP planning",
        body: "Prioritize the smallest useful release around your users, value proposition, and business model.",
      },
      {
        title: "Product architecture",
        body: "Accounts, roles, data boundaries, and backend services planned around the product.",
      },
      {
        title: "Subscriptions and payments",
        body: "Integrate billing providers, subscription lifecycles, and account management as required.",
      },
      {
        title: "Growth-ready foundations",
        body: "Maintainable code, deployment workflows, monitoring, and a roadmap for future features.",
      },
    ],
    steps: [
      {
        step: "01",
        title: "Discover",
        body: "Understand your users, business problem, and requirements.",
      },
      {
        step: "02",
        title: "Design",
        body: "Define the scope, experience, and technical approach.",
      },
      {
        step: "03",
        title: "Build and validate",
        body: "Develop the agreed solution and check the key user journeys.",
      },
      {
        step: "04",
        title: "Launch and improve",
        body: "Prepare for release and plan ongoing improvements.",
      },
    ],
    outcomes: [
      "A focused first release with clear priorities",
      "A connected product experience from signup to daily use",
      "A foundation for iteration as your customer base grows",
    ],
    faq: [
      {
        q: "Can you start with an MVP?",
        a: "Yes. We define the core use case and prioritize features so the first release can test the product with real users.",
      },
      {
        q: "Do you support the product after launch?",
        a: "We can scope ongoing maintenance, performance improvements, and new features around your product roadmap.",
      },
    ],
  },
  {
    slug: "ai-automation",
    label: "AI & AUTOMATION",
    name: "AI & Automation",
    title: "Less busywork. More possibility.",
    accentWord: "More possibility.",
    intro: "AI assistants and automation that solve practical problems in your product and workflows.",
    metaTitle: "AI & Automation Services | Numunix",
    metaDescription:
      "AI-powered applications, intelligent workflows, integrations, chatbots, and automation systems built around real business problems and the people who use them.",
    demo: "call",
    stats: [
      ["APPLICATIONS", "LLMs"],
      ["INTERACTION", "Agents"],
      ["KNOWLEDGE", "Search"],
      ["WORKFLOWS", "Automation"],
    ],
    capabilities: [
      {
        title: "AI applications",
        body: "Integrate language models into useful product experiences with clearly defined tasks.",
      },
      {
        title: "Assistants and agents",
        body: "Build conversational interfaces connected to appropriate business data and tools.",
      },
      {
        title: "Intelligent search",
        body: "Help users find and use information across documents and structured data.",
      },
      {
        title: "Workflow automation",
        body: "Connect events, APIs, and business rules to reduce repetitive processing and handoffs.",
      },
    ],
    steps: [
      {
        step: "01",
        title: "Discover",
        body: "Understand your users, business problem, and requirements.",
      },
      {
        step: "02",
        title: "Design",
        body: "Define the scope, experience, and technical approach.",
      },
      {
        step: "03",
        title: "Build and validate",
        body: "Develop the agreed solution and check the key user journeys.",
      },
      {
        step: "04",
        title: "Launch and improve",
        body: "Prepare for release and plan ongoing improvements.",
      },
    ],
    outcomes: [
      "AI features designed for a concrete business use case",
      "Connected workflows with clear human handoff points",
      "A practical approach to evaluating output quality",
    ],
    faq: [
      {
        q: "How do you choose the AI approach?",
        a: "We start with the task, data, quality expectations, and operating constraints, then select an appropriate model and integration approach.",
      },
      {
        q: "Can people review or take over an automated task?",
        a: "Yes. We can design review steps, approvals, and handoffs around the level of control the workflow requires.",
      },
    ],
  },
  {
    slug: "ui-ux-design",
    label: "UI/UX DESIGN",
    name: "UI/UX Design",
    title: "Complex products. Simple to use.",
    accentWord: "Simple to use.",
    intro: "Clear interfaces and thoughtful user journeys, from first interaction to finished task.",
    metaTitle: "UI/UX Design Services | Numunix",
    metaDescription:
      "Clean, intuitive interfaces designed around usability, clarity, and conversion. We connect business goals with complete user journeys, from the first screen to the final task.",
    demo: "flow",
    stats: [
      ["DISCOVERY", "Research"],
      ["STRUCTURE", "User flows"],
      ["EXPLORATION", "Wireframes"],
      ["DELIVERY", "Interfaces"],
    ],
    capabilities: [
      {
        title: "Product discovery",
        body: "Understand users, business goals, requirements, and the problems the product must solve.",
      },
      {
        title: "User flows and wireframes",
        body: "Map navigation, tasks, and information before committing to detailed visual design.",
      },
      {
        title: "Interface design",
        body: "Create consistent, responsive screens and component patterns with clear interactions.",
      },
      {
        title: "Prototype and handoff",
        body: "Explore key journeys, incorporate feedback, and document designs for development.",
      },
    ],
    steps: [
      {
        step: "01",
        title: "Discover",
        body: "Understand your users, business problem, and requirements.",
      },
      {
        step: "02",
        title: "Design",
        body: "Define the scope, experience, and technical approach.",
      },
      {
        step: "03",
        title: "Build and validate",
        body: "Develop the agreed solution and check the key user journeys.",
      },
      {
        step: "04",
        title: "Launch and improve",
        body: "Prepare for release and plan ongoing improvements.",
      },
    ],
    outcomes: [
      "Clearer journeys through complex product tasks",
      "Consistent interfaces across screens and states",
      "Design decisions connected to user and business needs",
    ],
    faq: [
      {
        q: "Can you design before development begins?",
        a: "Yes. We can scope discovery, user flows, wireframes, and interface design as the first phase of your project.",
      },
      {
        q: "Can you work with an existing brand?",
        a: "Yes. We can use your current brand and design system while improving the product experience.",
      },
    ],
  },
  {
    slug: "cloud-integrations",
    label: "CLOUD & INTEGRATIONS",
    name: "Cloud & Integrations",
    title: "Connected. Ready for launch.",
    accentWord: "Ready for launch.",
    intro: "Cloud infrastructure and integrations that bring your product and business systems together.",
    metaTitle: "Cloud & Integrations Services | Numunix",
    metaDescription:
      "Deployment, infrastructure, databases, storage, and integrations that support your product. Connect payment gateways, CRMs, AI models, third-party services, and internal systems.",
    demo: "dispatch",
    stats: [
      ["INFRASTRUCTURE", "AWS"],
      ["DEPLOYMENT", "Vercel"],
      ["DELIVERY", "CI/CD"],
      ["CONNECTIONS", "APIs"],
    ],
    capabilities: [
      {
        title: "Cloud deployment",
        body: "Configure hosting and environments around the application and its operational needs.",
      },
      {
        title: "API integrations",
        body: "Connect payments, authentication, business tools, and third-party services.",
      },
      {
        title: "Data and storage",
        body: "Plan database connections, file storage, access boundaries, and migration needs.",
      },
      {
        title: "Delivery and visibility",
        body: "Build deployment workflows, logging, and monitoring for ongoing operation.",
      },
    ],
    steps: [
      {
        step: "01",
        title: "Discover",
        body: "Understand your users, business problem, and requirements.",
      },
      {
        step: "02",
        title: "Design",
        body: "Define the scope, experience, and technical approach.",
      },
      {
        step: "03",
        title: "Build and validate",
        body: "Develop the agreed solution and check the key user journeys.",
      },
      {
        step: "04",
        title: "Launch and improve",
        body: "Prepare for release and plan ongoing improvements.",
      },
    ],
    outcomes: [
      "Connected systems with defined data flows",
      "A repeatable path from development to deployment",
      "Operational visibility as the product grows",
    ],
    faq: [
      {
        q: "Can you use our existing cloud account?",
        a: "Yes. We can review the current environment and plan work around your infrastructure, access, and deployment requirements.",
      },
      {
        q: "Which integrations can you build?",
        a: "We assess the available APIs, authentication, data formats, and provider limits for each service before defining the integration.",
      },
    ],
  },
  {
    slug: "maintenance-support",
    label: "MAINTENANCE & SUPPORT",
    name: "Maintenance & Support",
    title: "Keep your product moving forward.",
    accentWord: "moving forward.",
    intro: "Maintenance, performance improvements, and new features as your business evolves.",
    metaTitle: "Maintenance & Support Services | Numunix",
    metaDescription:
      "Continuous improvements, maintenance, optimization, new features, and technical support. Keep your software aligned with your business after the first release.",
    demo: "jobs",
    stats: [
      ["CARE", "Maintenance"],
      ["QUALITY", "Updates"],
      ["PERFORMANCE", "Optimize"],
      ["ROADMAP", "New features"],
    ],
    capabilities: [
      {
        title: "Product maintenance",
        body: "Investigate issues, update dependencies, and maintain the application over time.",
      },
      {
        title: "Performance optimization",
        body: "Review bottlenecks across interfaces, APIs, and data access to prioritize improvements.",
      },
      {
        title: "Product evolution",
        body: "Design and develop new capabilities as user feedback and business needs evolve.",
      },
      {
        title: "Technical support",
        body: "Agree a practical support scope, communication process, and priorities for your product.",
      },
    ],
    steps: [
      {
        step: "01",
        title: "Discover",
        body: "Understand your users, business problem, and requirements.",
      },
      {
        step: "02",
        title: "Design",
        body: "Define the scope, experience, and technical approach.",
      },
      {
        step: "03",
        title: "Build and validate",
        body: "Develop the agreed solution and check the key user journeys.",
      },
      {
        step: "04",
        title: "Launch and improve",
        body: "Prepare for release and plan ongoing improvements.",
      },
    ],
    outcomes: [
      "A clear process for product improvements",
      "Technical work prioritized around business needs",
      "Continuity beyond the initial launch",
    ],
    faq: [
      {
        q: "Can you support a product built by another team?",
        a: "We can review the codebase, documentation, infrastructure, and access before agreeing a support scope.",
      },
      {
        q: "Is support included automatically?",
        a: "Support, maintenance, and response expectations are agreed as part of the project or a separate ongoing engagement.",
      },
    ],
  },
];

// Keep existing bookmarked URLs working after the content transition.
const LEGACY_SLUGS: Record<string, string> = {
  "ai-call-agents": "ai-automation",
  "automated-booking": "web-development",
  "technician-dispatch": "mobile-app-development",
  "service-jobs": "custom-software",
  "invoicing-billing": "saas-development",
  "business-automation": "ai-automation",
  "amc-renewals": "maintenance-support",
  "whatsapp-communication": "cloud-integrations",
};

export const featureBySlug = (slug: string) =>
  FEATURES.find((f) => f.slug === (LEGACY_SLUGS[slug] ?? slug));
