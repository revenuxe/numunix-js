export type CompanyPageData = {
  slug: string;
  label: string;
  title: string;
  accent: string;
  intro: string;
  metaTitle: string;
  metaDescription: string;
  stats: [string, string][];
  sections: {
    label: string;
    title: string;
    accent?: string;
    body?: string;
    tone?: "light" | "dark";
    bg?: string;
    items: [string, string][];
  }[];
  ctaTitle?: string;
  ctaAccent?: string;
  ctaBody?: string;
};

export type LegalPageData = {
  slug: string;
  label: string;
  title: string;
  accent: string;
  intro: string;
  metaTitle: string;
  metaDescription: string;
  updated: string;
  sections: { heading: string; paragraphs: string[] }[];
};

export const APPROACH: CompanyPageData = {
  slug: "approach",
  label: "OUR APPROACH",
  title: "From idea to a product your team can use.",
  accent: "your team can use.",
  intro:
    "One team for discovery, design, development, and launch, so your website, app, or software stays connected from the first conversation to the first release.",
  metaTitle: "Our Approach | Numunix",
  metaDescription:
    "See how Numunix takes digital products from idea to launch with one team for discovery, design, development, and ongoing improvement.",
  stats: [
    ["START", "Discovery"],
    ["SHAPE", "Design"],
    ["BUILD", "Engineering"],
    ["SHIP", "Launch"],
  ],
  sections: [
    {
      label: "HOW WE WORK",
      title: "A practical path, not a generic template.",
      accent: "not a generic template.",
      body: "We begin with the business problem, then choose the product shape, experience, and technology that can actually be delivered.",
      items: [
        ["Business first", "Scope follows your users, operations, and commercial goals, not a pre-set stack."],
        ["One connected team", "Design, engineering, and delivery stay on the same plan so handoffs do not stall the work."],
        ["Clear decisions", "You see the options, trade-offs, and next step before we commit to a build phase."],
        ["Built to continue", "The first release is designed so maintenance, integrations, and new features have a path."],
      ],
    },
    {
      label: "WHAT YOU GET",
      title: "Alignment before we write production software.",
      accent: "production software.",
      tone: "dark",
      bg: "#07111f",
      items: [
        ["Shared understanding", "A documented view of users, requirements, and what success looks like."],
        ["A defined first release", "Priorities that fit the timeline, so the product can ship and then grow."],
        ["A technical approach", "Architecture and integrations chosen for the problem you actually have."],
        ["A working rhythm", "Reviews, validation, and launch planning baked into the engagement."],
      ],
    },
  ],
  ctaTitle: "Ready to shape the next product?",
  ctaAccent: "the next product?",
  ctaBody: "Tell us the idea, the users, and the outcome you need. We will help define the right first step.",
};

export const PROCESS: CompanyPageData = {
  slug: "process",
  label: "OUR PROCESS",
  title: "From the business problem to product growth.",
  accent: "product growth.",
  intro:
    "Eight connected stages take a product from discovery to launch and improvement, with a clear owner, deliverable, and decision at each step.",
  metaTitle: "Our Process | Numunix",
  metaDescription:
    "Numunix product process: discover, define, design, develop, integrate, validate, launch, and grow websites, apps, and software.",
  stats: [
    ["STAGES", "08"],
    ["FOCUS", "Delivery"],
    ["REVIEWS", "Ongoing"],
    ["AFTER LAUNCH", "Iterate"],
  ],
  sections: [
    {
      label: "THE STAGES",
      title: "Each step has a purpose and an output.",
      accent: "an output.",
      items: [
        ["01 Discover", "Understand the idea, users, business model, constraints, and what already exists."],
        ["02 Define", "Shape scope, priorities, success criteria, and the technical approach."],
        ["03 Design", "Turn the concept into user flows, structure, and interfaces the team can build from."],
        ["04 Develop", "Implement the agreed product with maintainable, scalable software."],
        ["05 Integrate", "Connect APIs, data, payments, AI, and the business systems you already use."],
        ["06 Validate", "Check usability, functionality, performance, and security before release."],
        ["07 Launch", "Deploy with a planned rollout, environments, and operational basics in place."],
        ["08 Grow", "Maintain, optimize, and add features as usage and the roadmap evolve."],
      ],
    },
    {
      label: "WORKING TOGETHER",
      title: "You stay involved without owning every technical detail.",
      accent: "every technical detail.",
      tone: "dark",
      bg: "#07111f",
      items: [
        ["Kickoff clarity", "We need goals, audience, examples, and any current product or content you already have."],
        ["Regular checkpoints", "Reviews happen at definition, design, and pre-launch, not only at the end."],
        ["Decisions in writing", "Scope changes and priorities are captured so the build stays aligned."],
        ["Handoff that lasts", "Documentation, credentials, and next-step options are part of launch, not an afterthought."],
      ],
    },
  ],
};

export const TECHNOLOGY: CompanyPageData = {
  slug: "technology",
  label: "TECHNOLOGY",
  title: "Modern stacks chosen for the product, not the trend.",
  accent: "not the trend.",
  intro:
    "We use proven web, mobile, cloud, and AI tools, selected for maintainability, integrations, and the kind of product you need to run.",
  metaTitle: "Technology | Numunix",
  metaDescription:
    "Numunix technology for web, mobile, SaaS, custom software, cloud, integrations, and AI, chosen around your product requirements.",
  stats: [
    ["WEB", "React"],
    ["LANGUAGE", "TypeScript"],
    ["MOBILE", "Cross-platform"],
    ["CLOUD", "Production-ready"],
  ],
  sections: [
    {
      label: "WHAT WE BUILD WITH",
      title: "Capable foundations for products that need to last.",
      accent: "need to last.",
      items: [
        ["Web platforms", "React, TypeScript, and modern frameworks for websites, portals, and web applications."],
        ["Mobile products", "Cross-platform apps designed for everyday tasks on iOS and Android."],
        ["APIs and data", "Services, databases, and integrations that keep business tools connected."],
        ["Cloud and delivery", "Environments, deployment, and operational setup so a product can actually ship."],
        ["AI where it fits", "Assistants and automation tied to a real workflow, not a disconnected demo."],
        ["Design systems", "Reusable interface patterns so the product stays consistent as it grows."],
      ],
    },
    {
      label: "HOW WE CHOOSE",
      title: "The stack follows the problem.",
      accent: "the problem.",
      tone: "dark",
      bg: "#07111f",
      items: [
        ["Fit over fashion", "We recommend tools your team can operate and extend after launch."],
        ["Integration first", "CRM, payments, analytics, and internal systems are planned into the architecture."],
        ["Security-conscious defaults", "Authentication, roles, and data handling are part of the technical plan."],
        ["Room to grow", "The first version should not block the second, we design for iteration."],
      ],
    },
  ],
  ctaBody: "Share the product you have in mind. We will recommend an approach that matches the requirements.",
};

export const SECURITY: CompanyPageData = {
  slug: "security",
  label: "SECURITY",
  title: "Secure, reliable software built for business use.",
  accent: "built for business use.",
  intro:
    "Security is part of how we design products, authentication, permissions, data handling, and operational visibility, not a checklist added at the end.",
  metaTitle: "Security | Numunix",
  metaDescription:
    "How Numunix approaches product security: authentication, role-based access, data handling, logging, and maintainable systems.",
  stats: [
    ["ACCESS", "Role-based"],
    ["DATA", "Handled with care"],
    ["OPS", "Observable"],
    ["GROWTH", "Maintainable"],
  ],
  sections: [
    {
      label: "IN THE PRODUCT",
      title: "Protections designed around real users.",
      accent: "real users.",
      items: [
        ["Authentication", "Sign-in and session handling planned for the product’s actual users and devices."],
        ["Role-based access", "Permissions that match responsibilities, so people see what they should."],
        ["Data handling", "Collection, storage, and sharing scoped to what the product needs to do."],
        ["Auditability", "Logging and monitoring that help your team understand activity and issues."],
      ],
    },
    {
      label: "IN DELIVERY",
      title: "Reliability is part of the same conversation.",
      accent: "the same conversation.",
      tone: "dark",
      bg: "#07111f",
      items: [
        ["Architecture with intent", "We plan how data moves, who can change it, and where it lives."],
        ["Validation before launch", "Security, performance, and core journeys are checked as part of release."],
        ["Shared responsibility", "You own accounts, policies, and infrastructure choices; we build to those constraints."],
        ["Ongoing care", "Updates, reviews, and improvements can continue after the first release."],
      ],
    },
  ],
};

export const SUPPORT: CompanyPageData = {
  slug: "support",
  label: "SUPPORT",
  title: "Help after launch, when the product is in real use.",
  accent: "in real use.",
  intro:
    "Support is for existing products as much as new ones, issues, improvements, security updates, and the next set of features once customers are already using the software.",
  metaTitle: "Support | Numunix",
  metaDescription:
    "Get Numunix support for maintenance, issues, optimizations, and new features on websites, apps, and custom software.",
  stats: [
    ["CHANNEL", "Email"],
    ["HOURS", "Mon–Sat"],
    ["FOCUS", "Live products"],
    ["NEXT STEP", "Scoped work"],
  ],
  sections: [
    {
      label: "WHAT WE HELP WITH",
      title: "Keep the product healthy and moving.",
      accent: "and moving.",
      items: [
        ["Issues and defects", "Investigate problems that appear after release and plan a fix."],
        ["Performance and reliability", "Address slow journeys, fragile integrations, and operational gaps."],
        ["Improvements", "Add features or refine flows once you know how people actually use the product."],
        ["Security updates", "Plan patches and dependency work as part of ongoing care."],
      ],
    },
    {
      label: "HOW TO REACH US",
      title: "A short brief is enough to start.",
      accent: "enough to start.",
      tone: "dark",
      bg: "#07111f",
      items: [
        ["Email first", "Write to hello@numunix.com with the product, what’s happening, and how urgent it is."],
        ["Include context", "Links, screenshots, environments, and recent changes help us diagnose faster."],
        ["Existing customers", "If we built the product, mention the project so we can pick up the right history."],
        ["New to Numunix", "We can still review an existing system and propose a maintenance or improvement plan."],
      ],
    },
  ],
  ctaTitle: "Need help with a live product?",
  ctaAccent: "a live product?",
  ctaBody: "Email the issue or the improvement you want. We will come back with questions and a practical next step.",
};

export const COMPANY_PAGES = [APPROACH, PROCESS, TECHNOLOGY, SECURITY, SUPPORT] as const;

export const PRIVACY: LegalPageData = {
  slug: "privacy",
  label: "PRIVACY POLICY",
  title: "How we handle information you share with us.",
  accent: "you share with us.",
  intro:
    "This policy explains what Numunix collects when you use this website or contact us, why we use it, and how you can reach us with questions.",
  metaTitle: "Privacy Policy | Numunix",
  metaDescription:
    "Numunix privacy policy: what information we collect through the website and project enquiries, how we use it, and how to contact us.",
  updated: "29 September 2026",
  sections: [
    {
      heading: "Who we are",
      paragraphs: [
        "Numunix designs and develops websites, mobile apps, SaaS products, custom software, and related digital services. This website and the contact channels listed on it are operated by Numunix.",
        "If you have questions about this policy, email hello@numunix.com.",
      ],
    },
    {
      heading: "Information we collect",
      paragraphs: [
        "When you contact us, you may provide your name, email address, organisation, project details, and any files or links you choose to share.",
        "This website may collect standard technical information such as browser type, device, pages viewed, and approximate location derived from IP address. That information is used to operate, secure, and improve the site.",
        "We do not require an account to browse the public pages of this website.",
      ],
    },
    {
      heading: "How we use information",
      paragraphs: [
        "We use enquiry details to respond, scope work, prepare proposals, and deliver services you ask for.",
        "We may use aggregated, non-identifying analytics to understand how the site is used.",
        "We do not sell your personal information.",
      ],
    },
    {
      heading: "Sharing",
      paragraphs: [
        "We share information with service providers who help us operate email, hosting, analytics, or project delivery, and only as needed for those purposes.",
        "We may disclose information if required by law or to protect the rights, safety, and security of Numunix, our clients, or the public.",
      ],
    },
    {
      heading: "Retention",
      paragraphs: [
        "We keep enquiry and project records for as long as needed to provide the service, meet legal obligations, and resolve disputes. You can ask us to update or delete information we hold, subject to those obligations.",
      ],
    },
    {
      heading: "Your choices",
      paragraphs: [
        "You can email us to request access, correction, or deletion of personal information we hold about you.",
        "You can choose not to send optional project files. If you do send them, treat them as business correspondence.",
      ],
    },
    {
      heading: "Changes",
      paragraphs: [
        "We may update this policy as our services or legal requirements change. The date at the top of this page shows when it was last revised.",
      ],
    },
  ],
};

export const TERMS: LegalPageData = {
  slug: "terms",
  label: "TERMS",
  title: "Terms for using this website and working with us.",
  accent: "working with us.",
  intro:
    "These terms cover use of the Numunix website. Project work is governed by a written proposal, statement of work, or contract once we agree scope together.",
  metaTitle: "Terms | Numunix",
  metaDescription:
    "Terms of use for the Numunix website and how project engagements are agreed after an enquiry.",
  updated: "29 September 2026",
  sections: [
    {
      heading: "Using this website",
      paragraphs: [
        "This site is provided for information about Numunix services. Content may change without notice and is not a binding offer until we confirm work in writing.",
        "You may not misuse the site, attempt to disrupt it, or copy substantial content for commercial use without permission.",
      ],
    },
    {
      heading: "Enquiries are not a contract",
      paragraphs: [
        "Sending a message, email, or project brief does not create an engagement. We will discuss fit, scope, timeline, and commercial terms before work starts.",
        "Any estimate shared in conversation is indicative until it is included in an agreed proposal.",
      ],
    },
    {
      heading: "Project work",
      paragraphs: [
        "Deliverables, timelines, fees, intellectual property, confidentiality, and support after launch are defined in the documents we sign with you.",
        "You are responsible for providing timely access, decisions, content, and approvals that the work depends on.",
      ],
    },
    {
      heading: "Intellectual property",
      paragraphs: [
        "The design, text, and software of this website belong to Numunix or its licensors. Client project IP is handled in the project agreement.",
      ],
    },
    {
      heading: "Limitation",
      paragraphs: [
        "The website is provided as-is. To the extent permitted by law, Numunix is not liable for losses arising from use of this site or reliance on general marketing descriptions of services.",
      ],
    },
    {
      heading: "Contact",
      paragraphs: [
        "Questions about these terms: hello@numunix.com.",
      ],
    },
  ],
};
