export type WorkflowStage = {
  slug: string;
  phase: string;
  name: string;
  category: string;
  title: string;
  accent: string;
  intro: string;
  outcome: string;
  deliverables: [string, string][];
  steps: [string, string][];
  faq: [string, string][];
};

export const WORKFLOW_STAGES: WorkflowStage[] = [
  {
    slug: "idea",
    phase: "DISCOVER",
    name: "Idea",
    category: "BUSINESS",
    title: "A strong product starts with a clear idea.",
    accent: "a clear idea.",
    intro:
      "Turn an early thought into a product direction. We work with you to understand the problem, the people experiencing it, and the business behind the solution.",
    outcome:
      "A shared understanding of what is worth building, who it serves, and which assumptions need evidence before you invest further.",
    deliverables: [
      [
        "Product opportunity brief",
        "The problem, target audience, and value proposition captured in one practical brief.",
      ],
      [
        "User and stakeholder map",
        "The people who use, buy, and operate the product, with their needs and constraints.",
      ],
      [
        "Assumptions to validate",
        "A prioritized list of business and product questions to investigate early.",
      ],
      [
        "Success criteria",
        "Agreed signals that help you judge whether the product is solving the right problem.",
      ],
    ],
    steps: [
      [
        "Start with the problem",
        "Bring your idea, existing workflow, or customer feedback. We map the friction and the opportunity.",
      ],
      [
        "Explore the context",
        "Review users, alternatives, and business constraints to separate evidence from assumptions.",
      ],
      [
        "Choose a direction",
        "Agree on a focused product hypothesis and the next questions to answer in scoping.",
      ],
    ],
    faq: [
      [
        "Do I need a finished business plan?",
        "No. A problem you understand or an idea you want to explore is enough to start. We help organize the missing pieces.",
      ],
      [
        "Can you help with an existing product?",
        "Yes. Discovery can focus on a new audience, a difficult workflow, or a feature whose value is still uncertain.",
      ],
    ],
  },
  {
    slug: "scope",
    phase: "DEFINE",
    name: "Scope",
    category: "PRODUCT",
    title: "The right features. A clearer path forward.",
    accent: "A clearer path forward.",
    intro:
      "Give your idea a buildable plan. We define the first release, connect requirements to user needs, and make dependencies visible before development begins.",
    outcome:
      "A prioritized release scope that gives design and engineering a common target, with clear boundaries and acceptance criteria.",
    deliverables: [
      [
        "Release roadmap",
        "A practical sequence for the first release and the improvements that can follow.",
      ],
      [
        "Prioritized backlog",
        "Features organized around user value, dependencies, and delivery constraints.",
      ],
      [
        "Acceptance criteria",
        "Concrete descriptions of how important workflows should behave when complete.",
      ],
      [
        "Delivery assumptions",
        "Integration needs, responsibilities, exclusions, and open questions documented for planning.",
      ],
    ],
    steps: [
      [
        "Map the essential journeys",
        "Identify what users must be able to accomplish and what your team needs to operate the product.",
      ],
      [
        "Make the tradeoffs",
        "Choose first-release priorities against budget, complexity, and the value of learning early.",
      ],
      [
        "Agree on the release",
        "Review the scope together and establish how new requests will be evaluated.",
      ],
    ],
    faq: [
      [
        "Can we start with an MVP?",
        "Yes. We can define a first release around a small set of valuable user journeys and keep later ideas in a separate backlog.",
      ],
      [
        "What happens if requirements change?",
        "We assess the effect on design, effort, and timing, then agree on the scope change before implementing it.",
      ],
    ],
  },
  {
    slug: "ux",
    phase: "DESIGN",
    name: "UX",
    category: "EXPERIENCE",
    title: "Make every interaction feel considered.",
    accent: "feel considered.",
    intro:
      "Shape an experience people can understand and use. We connect user journeys, interface design, and responsive behavior into a product that feels consistent from the first screen.",
    outcome:
      "A reviewable interface direction and connected user flows that give your team clarity before the screens become software.",
    deliverables: [
      [
        "User flows",
        "Clear paths through onboarding, core tasks, and the moments that need extra guidance.",
      ],
      [
        "Wireframes and prototypes",
        "Layouts and interactive concepts that make decisions easier to discuss and test.",
      ],
      [
        "Responsive interface design",
        "Screen designs with a consistent visual language across mobile and desktop.",
      ],
      [
        "Component and state guidance",
        "Reusable patterns, including loading, empty, error, and success states for implementation.",
      ],
    ],
    steps: [
      [
        "Organize the experience",
        "Map information and navigation around the tasks people come to complete.",
      ],
      [
        "Prototype the key moments",
        "Explore the important screens and review how the journey works as a whole.",
      ],
      [
        "Refine for delivery",
        "Resolve feedback, consider accessibility, and prepare design guidance for engineering.",
      ],
    ],
    faq: [
      [
        "Can you use our existing brand?",
        "Yes. We can work within your brand guidelines and existing component system, extending them where the product needs it.",
      ],
      [
        "Is user testing included?",
        "We agree on the validation approach during scoping. Prototype reviews, usability sessions, and participant recruitment can be planned to suit the project.",
      ],
    ],
  },
  {
    slug: "code",
    phase: "DEVELOP",
    name: "Code",
    category: "ENGINEERING",
    title: "Build the foundation for what comes next.",
    accent: "what comes next.",
    intro:
      "Bring the product to life with maintainable engineering. We build the interface, application logic, and data foundations around your agreed workflows and business requirements.",
    outcome:
      "Working software delivered in reviewable increments, with a codebase your team can operate and continue to develop.",
    deliverables: [
      [
        "Product implementation",
        "Responsive interfaces and application behavior aligned with the agreed designs and scope.",
      ],
      [
        "Application and data structure",
        "Clear models, permissions, and service boundaries suited to the product.",
      ],
      [
        "Meaningful automated checks",
        "Tests for important behavior and integration points, chosen around project risk.",
      ],
      [
        "Technical handoff",
        "Repository access and setup documentation, with deployment requirements and known limitations.",
      ],
    ],
    steps: [
      [
        "Set the foundations",
        "Choose the architecture and establish development environments, conventions, and review practices.",
      ],
      [
        "Build in increments",
        "Deliver connected workflows in manageable pieces so you can review real progress.",
      ],
      [
        "Prepare for validation",
        "Resolve implementation issues and bring the release together for end-to-end checking.",
      ],
    ],
    faq: [
      [
        "Can you work with our existing codebase?",
        "Yes. We first review its structure, dependencies, and constraints, then agree on a practical implementation approach.",
      ],
      [
        "Will we have access to the code?",
        "Repository access, ownership, and handoff arrangements are defined in the project agreement so responsibilities are clear before work starts.",
      ],
    ],
  },
  {
    slug: "apis",
    phase: "CONNECT",
    name: "APIs",
    category: "INTEGRATIONS",
    title: "Your tools, working together.",
    accent: "working together.",
    intro:
      "Connect your product to the services your business relies on. From payments and messaging to internal systems, we design integrations around reliable data flow and clear failure handling.",
    outcome:
      "Connected workflows with defined data ownership, visible errors, and less manual movement between systems.",
    deliverables: [
      [
        "Integration map",
        "The systems, events, and data exchanged, with a clear owner for each connection.",
      ],
      [
        "API and webhook connections",
        "Scoped integrations with authentication, validation, and environment configuration.",
      ],
      [
        "Failure and retry handling",
        "Appropriate safeguards for duplicate events, unavailable services, and partial failures.",
      ],
      [
        "Operational guidance",
        "Configuration notes and troubleshooting guidance for the team maintaining the connections.",
      ],
    ],
    steps: [
      [
        "Map the exchange",
        "Define what moves between systems, when it moves, and which system is the source of truth.",
      ],
      [
        "Build the connection",
        "Implement against available documentation and test environments, keeping credentials out of client code.",
      ],
      [
        "Verify real scenarios",
        "Check successful requests, rejected input, repeated events, and third-party outages where feasible.",
      ],
    ],
    faq: [
      [
        "Which services can you connect?",
        "We assess any service with a suitable API, webhook, or supported data exchange method. Feasibility depends on provider access and capabilities.",
      ],
      [
        "Are third-party fees included?",
        "Provider subscriptions and usage charges are separate unless specifically included in the project agreement. We identify these dependencies during scoping.",
      ],
    ],
  },
  {
    slug: "qa",
    phase: "VALIDATE",
    name: "QA",
    category: "QUALITY",
    title: "Move toward launch with confidence.",
    accent: "with confidence.",
    intro:
      "Check the journeys that matter before customers depend on them. We validate product behavior against the agreed scope and make release risks visible while there is time to act.",
    outcome:
      "An evidence-based view of release readiness, with tracked defects, verified fixes, and explicit decisions about remaining limitations.",
    deliverables: [
      [
        "Risk-based test plan",
        "Coverage focused on critical workflows, permissions, integrations, and likely failure points.",
      ],
      [
        "Browser and device checks",
        "Responsive and compatibility checks across the browser and device set agreed for the project.",
      ],
      [
        "Defect tracking",
        "Reproducible issues with clear priorities, expected behavior, and verification status.",
      ],
      [
        "Release readiness review",
        "A record of checks completed, outstanding issues, and the agreed launch decision.",
      ],
    ],
    steps: [
      [
        "Define what must work",
        "Turn requirements and important user journeys into a focused validation plan.",
      ],
      [
        "Exercise the product",
        "Check typical use, edge cases, and failures, combining manual and automated checks where useful.",
      ],
      ["Close the loop", "Retest fixes and review remaining risks with your team before release."],
    ],
    faq: [
      [
        "Does QA guarantee there will be no bugs?",
        "No test process can guarantee that. We reduce release risk through agreed coverage, clear reporting, and verification of important behavior.",
      ],
      [
        "Can you test a product built by another team?",
        "Yes. We need access to the application, its expected behavior, and appropriate test accounts to define a useful review.",
      ],
    ],
  },
  {
    slug: "cloud",
    phase: "LAUNCH",
    name: "Cloud",
    category: "DEPLOYMENT",
    title: "From ready to live, with a plan.",
    accent: "with a plan.",
    intro:
      "Make launch a deliberate step. We prepare hosting, configuration, and release procedures so your product reaches production with a clear operating and recovery plan.",
    outcome:
      "A deployed product with documented environment configuration, release checks, and an agreed path for responding when something needs attention.",
    deliverables: [
      [
        "Hosting and environment setup",
        "Production and supporting environments configured for the agreed platform and workload.",
      ],
      [
        "Release workflow",
        "A repeatable deployment process with configuration and migration steps documented.",
      ],
      [
        "Monitoring and recovery plan",
        "Agreed visibility into application health, plus backup and rollback procedures where supported.",
      ],
      [
        "Launch handoff",
        "Access, domain configuration, operating notes, and responsibilities reviewed with your team.",
      ],
    ],
    steps: [
      [
        "Prepare the environment",
        "Confirm hosting needs, access, domain settings, and production configuration.",
      ],
      [
        "Rehearse the release",
        "Validate the build and deployment steps in a suitable environment, including any data changes.",
      ],
      [
        "Launch and verify",
        "Deploy the agreed release, check core journeys, and hand over the operating information.",
      ],
    ],
    faq: [
      [
        "Can you deploy to our cloud account?",
        "Yes. We can work in your account with suitable access, subject to the platform and scope agreed for the project.",
      ],
      [
        "Is ongoing hosting support included?",
        "Launch support, monitoring responsibilities, and ongoing maintenance are agreed separately in the project scope. Cloud provider charges depend on usage and plan.",
      ],
    ],
  },
  {
    slug: "grow",
    phase: "IMPROVE",
    name: "Grow",
    category: "ITERATION",
    title: "Let real usage shape the next release.",
    accent: "the next release.",
    intro:
      "Keep improving after launch. We help turn customer feedback, product signals, and operational needs into focused changes that make the product more useful over time.",
    outcome:
      "A living improvement backlog tied to observable user needs, with a repeatable way to choose, deliver, and evaluate the next change.",
    deliverables: [
      [
        "Product health review",
        "A review of available usage signals, feedback, and recurring support or operational issues.",
      ],
      [
        "Improvement backlog",
        "Prioritized opportunities spanning user experience, performance, and product capabilities.",
      ],
      [
        "Focused release iterations",
        "Scoped updates with acceptance criteria and validation before deployment.",
      ],
      [
        "Learning and roadmap review",
        "A review of what changed and what the evidence suggests doing next.",
      ],
    ],
    steps: [
      [
        "Listen and measure",
        "Review available analytics and customer feedback, checking the quality of the evidence.",
      ],
      [
        "Choose a useful change",
        "Prioritize improvements by likely value, effort, and the cost of leaving the problem unresolved.",
      ],
      [
        "Ship and learn",
        "Validate the release and compare results with the intended outcome to guide the next iteration.",
      ],
    ],
    faq: [
      [
        "Can we start with a small improvement?",
        "Yes. A specific workflow, performance issue, or recurring customer request can be a useful starting point.",
      ],
      [
        "Do you guarantee growth results?",
        "No. Outcomes depend on your market, distribution, and product as well as implementation. We agree on measurable goals and evaluate changes against available evidence.",
      ],
    ],
  },
];

export const workflowBySlug = (slug: string) =>
  WORKFLOW_STAGES.find((stage) => stage.slug === slug);
