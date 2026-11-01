export type Solution = {
  slug: string;
  label: string;
  name: string;
  title: string;
  accentWord: string;
  intro: string;
  metaTitle: string;
  metaDescription: string;
  stats: [string, string][];
  challenges: string[];
  wins: string[];
  workflow: { step: string; title: string; body: string }[];
  faq: { q: string; a: string }[];
};

export const SOLUTIONS: Solution[] = [
  {
    slug: "web-development",
    label: "WEB DEVELOPMENT",
    name: "Web Development",
    title: "Websites and web apps built for real-world growth.",
    accentWord: "real-world growth.",
    intro:
      "Modern, responsive, high-performance websites and web applications built for speed, usability, and scalability, from company websites to portals and complex platforms.",
    metaTitle: "Web Development | Numunix",
    metaDescription:
      "Modern, responsive, high-performance websites and web applications built for speed, usability, and scalability, from company websites to portals and complex platforms.",
    stats: [
      ["FRONTEND", "React"],
      ["FRAMEWORK", "Next.js"],
      ["LANGUAGE", "TypeScript"],
      ["EXPERIENCE", "Responsive"],
    ],
    challenges: [
      "Your website no longer reflects your business",
      "Slow or confusing journeys lose potential customers",
      "Your team needs functionality a template cannot provide",
    ],
    wins: [
      "A clear, responsive experience across screen sizes",
      "A website or application shaped around your goals",
      "A maintainable foundation for future features",
    ],
    workflow: [
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
    title: "Mobile apps designed around real users.",
    accentWord: "real users.",
    intro:
      "iOS and Android applications designed around your business goals and the way people use their phones. We build intuitive, connected experiences for consumer and business products.",
    metaTitle: "Mobile App Development | Numunix",
    metaDescription:
      "iOS and Android applications designed around your business goals and the way people use their phones. We build intuitive, connected experiences for consumer and business products.",
    stats: [
      ["PLATFORMS", "iOS"],
      ["PLATFORMS", "Android"],
      ["FRAMEWORK", "React Native"],
      ["APPROACH", "Mobile-first"],
    ],
    challenges: [
      "Users struggle to complete tasks on mobile",
      "Disconnected tools interrupt the customer journey",
      "An app idea needs a practical development plan",
    ],
    wins: [
      "A consistent experience for iOS and Android users",
      "Core tasks designed for convenient mobile use",
      "An app foundation that can evolve with your roadmap",
    ],
    workflow: [
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
    title: "Custom software designed around your business.",
    accentWord: "your business.",
    intro:
      "Business software built around your exact workflows, requirements, and operational needs. Replace disconnected steps with tools that support the way your team works.",
    metaTitle: "Custom Software | Numunix",
    metaDescription:
      "Business software built around your exact workflows, requirements, and operational needs. Replace disconnected steps with tools that support the way your team works.",
    stats: [
      ["BACKEND", "Node.js"],
      ["INTEGRATION", "REST APIs"],
      ["DATA", "SQL / NoSQL"],
      ["ACCESS", "Role-based"],
    ],
    challenges: [
      "Your business process is split across spreadsheets and chats",
      "Off-the-shelf tools force awkward workarounds",
      "Teams cannot find a reliable view of their work",
    ],
    wins: [
      "Tools that reflect your processes and responsibilities",
      "Less duplicate entry across connected systems",
      "A clearer view of the information your team needs",
    ],
    workflow: [
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
    title: "From your first MVP to a scalable SaaS platform.",
    accentWord: "scalable SaaS platform.",
    intro:
      "We design and build SaaS platforms from architecture to launch. Validate the core product, support your first users, and create a technical foundation for growth.",
    metaTitle: "SaaS Development | Numunix",
    metaDescription:
      "We design and build SaaS platforms from architecture to launch. Validate the core product, support your first users, and create a technical foundation for growth.",
    stats: [
      ["FIRST RELEASE", "MVP"],
      ["PRODUCT", "B2B / B2C"],
      ["BILLING", "Subscriptions"],
      ["HOSTING", "Cloud"],
    ],
    challenges: [
      "The product idea is too broad for a first release",
      "Billing, roles, and onboarding are disconnected",
      "Early architecture makes future changes difficult",
    ],
    wins: [
      "A focused first release with clear priorities",
      "A connected product experience from signup to daily use",
      "A foundation for iteration as your customer base grows",
    ],
    workflow: [
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
    title: "Practical AI built into your product and workflows.",
    accentWord: "product and workflows.",
    intro:
      "AI-powered applications, intelligent workflows, integrations, chatbots, and automation systems built around real business problems and the people who use them.",
    metaTitle: "AI & Automation | Numunix",
    metaDescription:
      "AI-powered applications, intelligent workflows, integrations, chatbots, and automation systems built around real business problems and the people who use them.",
    stats: [
      ["APPLICATIONS", "LLMs"],
      ["INTERACTION", "Agents"],
      ["KNOWLEDGE", "Search"],
      ["WORKFLOWS", "Automation"],
    ],
    challenges: [
      "Repetitive tasks consume time across the team",
      "Useful knowledge is difficult to search and access",
      "AI experiments are disconnected from real workflows",
    ],
    wins: [
      "AI features designed for a concrete business use case",
      "Connected workflows with clear human handoff points",
      "A practical approach to evaluating output quality",
    ],
    workflow: [
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
    title: "Make complex products simple to use.",
    accentWord: "simple to use.",
    intro:
      "Clean, intuitive interfaces designed around usability, clarity, and conversion. We connect business goals with complete user journeys, from the first screen to the final task.",
    metaTitle: "UI/UX Design | Numunix",
    metaDescription:
      "Clean, intuitive interfaces designed around usability, clarity, and conversion. We connect business goals with complete user journeys, from the first screen to the final task.",
    stats: [
      ["DISCOVERY", "Research"],
      ["STRUCTURE", "User flows"],
      ["EXPLORATION", "Wireframes"],
      ["DELIVERY", "Interfaces"],
    ],
    challenges: [
      "Users struggle to find the next step",
      "Screens look disconnected across the product",
      "Development starts before the experience is defined",
    ],
    wins: [
      "Clearer journeys through complex product tasks",
      "Consistent interfaces across screens and states",
      "Design decisions connected to user and business needs",
    ],
    workflow: [
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
    title: "Connect your product. Prepare it for production.",
    accentWord: "production.",
    intro:
      "Deployment, infrastructure, databases, storage, and integrations that support your product. Connect payment gateways, CRMs, AI models, third-party services, and internal systems.",
    metaTitle: "Cloud & Integrations | Numunix",
    metaDescription:
      "Deployment, infrastructure, databases, storage, and integrations that support your product. Connect payment gateways, CRMs, AI models, third-party services, and internal systems.",
    stats: [
      ["INFRASTRUCTURE", "AWS"],
      ["DEPLOYMENT", "Vercel"],
      ["DELIVERY", "CI/CD"],
      ["CONNECTIONS", "APIs"],
    ],
    challenges: [
      "Manual handoffs keep business tools disconnected",
      "Deployments depend on undocumented steps",
      "Infrastructure needs are unclear before launch",
    ],
    wins: [
      "Connected systems with defined data flows",
      "A repeatable path from development to deployment",
      "Operational visibility as the product grows",
    ],
    workflow: [
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
];

export const solutionBySlug = (slug: string) => SOLUTIONS.find((s) => s.slug === slug);
