export type IndustryLanding = {
  slug: string;
  audience: string;
  headline: string;
  accent: string;
  intro: string;
  tension: string;
  perspective: string;
  capabilities: [string, string][];
  workflow: [string, string][];
  scenario: string;
  firstRelease: string;
  decisions: [string, string][];
  integrations: string[];
  faq: [string, string][];
  services: { slug: string; name: string }[];
};

// Illustrative product scenarios and scoping guidance, separate from delivery claims.
export const industryLandings: IndustryLanding[] = [
  {
    slug: "banking-financial-services",
    audience: "FOR BANKS, LENDERS & FINTECH TEAMS",
    headline: "Move money forward.",
    accent: "Keep control close.",
    intro:
      "Digital banking experiences, lending workflows, and payment operations that connect the customer journey to the teams and systems behind it.",
    tension: "One customer action. A whole chain of systems.",
    perspective:
      "A loan application is not complete when a form is submitted. Documents need review, decisions need ownership, and customers need a useful next step. We shape financial software around those handoffs, with clear access boundaries and a traceable record of change.",
    capabilities: [
      [
        "Digital banking experiences",
        "Account views, service requests, customer portals, and mobile journeys connected to approved core banking APIs.",
      ],
      [
        "Lending & origination",
        "Application intake, document collection, review queues, eligibility rules, and decision handoffs shaped around your lending model.",
      ],
      [
        "Payment operations",
        "Transaction status, reconciliation queues, and exception handling with explicit retry and duplicate-prevention rules.",
      ],
      [
        "Operations workspaces",
        "Role-based tools for service teams to investigate requests, manage approvals, and work from a shared customer context.",
      ],
      [
        "Reporting foundations",
        "Structured data capture and reviewable reporting workflows mapped to requirements supplied by your finance and compliance teams.",
      ],
      [
        "System modernization",
        "New interfaces and API layers around existing systems, introduced in manageable increments with a defined migration path.",
      ],
    ],
    scenario:
      "A small business applies for credit. Its application, documents, review comments, and decision status stay connected from the first submission to the final handoff.",
    workflow: [
      [
        "Apply",
        "Collect business details and documents with validation and save-and-resume support.",
      ],
      ["Review", "Route the application, surface missing information, and record review actions."],
      ["Decide", "Apply approved decision rules and escalation paths with clear human ownership."],
      [
        "Follow through",
        "Connect the decision to downstream systems and give the applicant an appropriate status update.",
      ],
    ],
    firstRelease:
      "Start with one application type, one review team, and a complete intake-to-decision path. Confirm source systems, decision authority, and exception handling before adding more products.",
    decisions: [
      [
        "Where is the source of truth?",
        "Identify the authoritative customer, account, and transaction systems before defining sync behavior.",
      ],
      [
        "Who can approve what?",
        "Map access, approval limits, separation of duties, and evidence requirements with internal owners.",
      ],
      [
        "What happens when a system fails?",
        "Define pending states, timeouts, reconciliation, and recovery before exposing a money-movement workflow.",
      ],
    ],
    integrations: [
      "Core banking APIs",
      "Payment providers",
      "Identity verification",
      "Document stores",
      "Data warehouses",
      "Reporting systems",
    ],
    faq: [
      [
        "Can you work with our existing banking systems?",
        "We review available APIs, access restrictions, test environments, and system ownership. The integration approach depends on what those systems support; a read-only portal or focused workflow can be a sensible first phase.",
      ],
      [
        "How do you handle regulatory requirements?",
        "Your legal, risk, and compliance owners define the applicable requirements. We translate agreed requirements into controls, workflows, and validation criteria. Regulatory approval and certifications are not implied by a software build.",
      ],
      [
        "Can you build a lending MVP?",
        "An initial scope can cover application intake, document review, decision tracking, and customer status. Automated decisions, disbursement, and third-party verification are scoped around your operating model.",
      ],
    ],
    services: [
      { slug: "custom-software", name: "Custom software" },
      { slug: "mobile-app-development", name: "Mobile banking experiences" },
      { slug: "cloud-integrations", name: "API & system integrations" },
    ],
  },
  {
    slug: "insurance",
    audience: "FOR INSURERS, BROKERS & DISTRIBUTION PLATFORMS",
    headline: "Less friction in the process.",
    accent: "More clarity in the claim.",
    intro:
      "Policy, claims, and partner platforms designed to keep customers informed and give insurance teams the context to move work forward.",
    tension: "The customer sees one claim. Your team sees a chain of handoffs.",
    perspective:
      "Documents arrive through different channels. Policy details live elsewhere. Partners ask for updates. We bring the workflow into focus with structured intake, shared status, and explicit ownership of each next action.",
    capabilities: [
      [
        "Policy administration",
        "Policy records, endorsements, renewals, servicing requests, and document access around your product rules.",
      ],
      [
        "Claims management",
        "First notification of loss, evidence collection, assignment, assessment, and decision tracking in one connected journey.",
      ],
      [
        "B2B2C distribution",
        "Partner onboarding, embedded quote journeys, proposal capture, and policy handoffs across approved channels.",
      ],
      [
        "Broker & agent portals",
        "Role-based access to customer requests, policy documents, outstanding actions, and renewal follow-ups.",
      ],
      [
        "Fraud review workflows",
        "Rule-based flags presented with evidence and review history to support accountable investigation.",
      ],
      [
        "Customer self-service",
        "Status views, document submissions, service requests, and notifications that explain what happens next.",
      ],
    ],
    scenario:
      "A policyholder reports damage, uploads documents, and follows the claim while an assessor and the servicing team work from the same record.",
    workflow: [
      [
        "Notify",
        "Capture incident details against the policy and explain the information needed next.",
      ],
      [
        "Validate",
        "Check document completeness and route coverage questions to the right reviewer.",
      ],
      ["Assess", "Coordinate assessment, evidence, and approvals with a visible history."],
      [
        "Resolve",
        "Record the decision and connect settlement or follow-up actions to authorized systems.",
      ],
    ],
    firstRelease:
      "Choose one insurance product and one claims or servicing workflow. Establish status definitions, document rules, and review ownership before expanding partner channels.",
    decisions: [
      [
        "Which rules vary by product?",
        "Separate coverage, documents, and approval rules so new products do not require copying entire workflows.",
      ],
      [
        "What can each partner see?",
        "Define insurer, broker, agent, assessor, and customer permissions at the record and action level.",
      ],
      [
        "How are exceptions reviewed?",
        "Agree how missing evidence, fraud flags, disputed decisions, and reopened claims move through the team.",
      ],
    ],
    integrations: [
      "Policy administration",
      "Claims systems",
      "Payment services",
      "Partner APIs",
      "Document management",
      "Messaging providers",
    ],
    faq: [
      [
        "Can the portal sit alongside our policy system?",
        "Where the required interfaces and access are available, yes. We map policy identifiers, data ownership, update frequency, and error handling before connecting customer or partner experiences.",
      ],
      [
        "Can you automate claims decisions?",
        "We can implement approved rules and decision support. The scope distinguishes administrative automation from decisions requiring an authorized reviewer, with traceability and exception handling defined up front.",
      ],
      [
        "Can different partners have different journeys?",
        "Partner roles, product access, branding, and permissions can be configured around a shared foundation rather than maintained as unrelated applications.",
      ],
    ],
    services: [
      { slug: "web-applications", name: "Customer & partner portals" },
      { slug: "custom-software", name: "Claims operations software" },
      { slug: "ai-automation", name: "Workflow automation" },
    ],
  },
  {
    slug: "automotive-mobility",
    audience: "FOR AUTO-TECH, DEALER, EV & FLEET TEAMS",
    headline: "Connect every vehicle.",
    accent: "Coordinate every move.",
    intro:
      "Dealer systems, fleet workspaces, and EV experiences that bring vehicles, people, and operational decisions into one connected product.",
    tension: "Vehicles move in real time. Operations often run on yesterday’s information.",
    perspective:
      "Fleet managers need availability, drivers need their next task, and dealers need reliable customer and vehicle records. We design around each role’s decisions, including what happens when location data is delayed or connectivity drops.",
    capabilities: [
      [
        "Fleet operations",
        "Vehicle records, assignment, availability, trip status, maintenance schedules, and exception queues.",
      ],
      [
        "Dealer workspaces",
        "Lead handling, inventory, test-drive scheduling, service bookings, and customer follow-ups.",
      ],
      [
        "EV platforms",
        "Charging session views, station discovery, vehicle status, and operator tools connected to supported providers.",
      ],
      [
        "Driver & field apps",
        "Assigned tasks, checklists, proof of completion, and location-aware workflows for use on the move.",
      ],
      [
        "Connected vehicle interfaces",
        "Telemetry views and operational alerts designed around the accuracy and freshness of device data.",
      ],
      [
        "Service & aftersales",
        "Appointment intake, job cards, parts handoffs, and service history connecting front-desk and workshop teams.",
      ],
    ],
    scenario:
      "A dispatcher assigns an EV to a delivery route. The driver receives the task, while operations follows trip progress alongside battery and service information.",
    workflow: [
      ["Plan", "Match available vehicles and drivers to a route, task, or service booking."],
      ["Dispatch", "Share the assignment and essential details with the person doing the work."],
      ["Monitor", "Show supported vehicle signals with clear freshness and exception indicators."],
      [
        "Close the loop",
        "Record completion, flag issues, and hand off maintenance or charging needs.",
      ],
    ],
    firstRelease:
      "Start with one fleet group or dealer workflow. Connect vehicle records, assignment, and completion before introducing route optimization or multiple telemetry providers.",
    decisions: [
      [
        "How reliable is the device data?",
        "Confirm provider coverage, update intervals, identifiers, and behavior when telemetry is missing.",
      ],
      [
        "What must work offline?",
        "Define tasks drivers can complete without a connection and how conflicts resolve after sync.",
      ],
      [
        "Which alerts deserve action?",
        "Tie alerts to a clear owner and response rather than filling a dashboard with raw events.",
      ],
    ],
    integrations: [
      "Telematics providers",
      "Maps & routing",
      "Dealer systems",
      "Charging providers",
      "Inventory systems",
      "Messaging services",
    ],
    faq: [
      [
        "Can you integrate our GPS or telematics provider?",
        "We review its API, identifiers, update rate, and access. Tracking accuracy depends on the hardware and provider; the interface should make data freshness visible.",
      ],
      [
        "Can the driver app work offline?",
        "Selected tasks can support offline capture and later sync. We scope local storage, location needs, conflict handling, and device security for the specific workflow.",
      ],
      [
        "Can you build dealer and customer experiences?",
        "Dealer operations and customer journeys can share approved records while keeping internal notes, pricing controls, and role permissions appropriately separated.",
      ],
    ],
    services: [
      { slug: "mobile-app-development", name: "Driver & customer apps" },
      { slug: "custom-software", name: "Fleet & dealer software" },
      { slug: "cloud-integrations", name: "Connected system integrations" },
    ],
  },
  {
    slug: "retail-e-commerce",
    audience: "FOR RETAILERS, BRANDS & MARKETPLACE OPERATORS",
    headline: "Make buying effortless.",
    accent: "Keep operations connected.",
    intro:
      "Commerce platforms and order workflows that connect product discovery, checkout, inventory, and fulfilment across your sales channels.",
    tension: "A beautiful storefront needs a connected order journey.",
    perspective:
      "The real product includes stock accuracy, variant selection, payment exceptions, delivery updates, and returns. We shape the customer experience and operational system together, so the promise made at checkout has a process behind it.",
    capabilities: [
      [
        "Brand storefronts",
        "Responsive shopping journeys with useful categories, search, product information, and clear checkout steps.",
      ],
      [
        "Marketplace platforms",
        "Seller onboarding, listing controls, buyer journeys, order allocation, and operational tools.",
      ],
      [
        "Order management",
        "Shared order views, fulfilment queues, cancellation rules, returns, and customer communication.",
      ],
      [
        "Catalog & inventory",
        "Variants, location-level availability, pricing rules, and workflows for teams maintaining complex catalogs.",
      ],
      [
        "Category-specific experiences",
        "Jewellery specifications, FMCG pack sizes, and baby care attributes shaped around the actual catalog.",
      ],
      [
        "Omnichannel connections",
        "Storefront, marketplace, warehouse, and business-system integrations with explicit stock and order ownership.",
      ],
    ],
    scenario:
      "A shopper selects a variant, sees availability, completes payment, and receives updates while the warehouse works from the same fulfilment record.",
    workflow: [
      [
        "Discover",
        "Make categories, search, product details, and variant choices useful on every screen.",
      ],
      ["Purchase", "Explain delivery, pricing, and payment status before and after checkout."],
      ["Fulfil", "Route confirmed orders to the right location and track packing and dispatch."],
      ["Support", "Connect returns, refunds, and delivery exceptions to the original order."],
    ],
    firstRelease:
      "Launch one catalog segment and one fulfilment model with a tested checkout-to-dispatch path. Add channels and sophisticated merchandising after stock and order flows are reliable.",
    decisions: [
      [
        "Who owns inventory?",
        "Choose the stock system and define reservations, sync timing, and oversell handling.",
      ],
      [
        "How complex is the catalog?",
        "Map variants, bundles, attributes, price changes, and the people maintaining them.",
      ],
      [
        "What happens after checkout?",
        "Agree partial shipments, cancellation windows, returns, and refund ownership.",
      ],
    ],
    integrations: [
      "Payment gateways",
      "ERP & inventory",
      "Shipping providers",
      "Marketplace APIs",
      "Product information systems",
      "Customer messaging",
    ],
    faq: [
      [
        "Should we use an existing platform or build custom?",
        "We assess catalog complexity, business rules, integrations, and operating cost. An existing platform may cover the core journey, with custom components for the parts that need differentiation.",
      ],
      [
        "Can you handle jewellery, FMCG, or baby care catalogs?",
        "We model the attributes, variants, pricing, and merchandising each category needs. Product data quality and catalog ownership are part of initial scoping.",
      ],
      [
        "Can orders sync across sales channels?",
        "Where channel APIs permit it, yes. We define stock ownership, sync timing, rate limits, and recovery paths for failed updates.",
      ],
    ],
    services: [
      { slug: "e-commerce", name: "E-commerce development" },
      { slug: "marketplaces", name: "Marketplace development" },
      { slug: "cloud-integrations", name: "Commerce integrations" },
    ],
  },
  {
    slug: "edtech",
    audience: "FOR EDUCATION PROVIDERS & LEARNING PLATFORMS",
    headline: "Open the door to learning.",
    accent: "Make progress visible.",
    intro:
      "Admissions portals, learning platforms, and skills products that help learners take the next step and give educators the tools to support them.",
    tension: "Enrolment is only the beginning of the learner journey.",
    perspective:
      "Applicants need clarity, learners need a path, and educators need useful context. We connect intake, content, assessment, and support around the people using them, with accessibility and content operations considered from the start.",
    capabilities: [
      [
        "Admissions & enrolment",
        "Applications, document review, course selection, fee handoffs, and applicant status views.",
      ],
      [
        "Learning management",
        "Course structures, lesson access, assignments, assessments, and instructor workspaces around your teaching model.",
      ],
      [
        "Skills platforms",
        "Learning paths, practice tasks, project submissions, and feedback tied to defined skill goals.",
      ],
      [
        "Learner experiences",
        "Responsive portals and mobile apps with clear next actions, saved progress, and appropriate reminders.",
      ],
      [
        "Educator operations",
        "Cohort management, content publishing, feedback queues, attendance inputs, and learner support tools.",
      ],
      [
        "Progress & reporting",
        "Understandable completion and assessment views with clear definitions for each metric.",
      ],
    ],
    scenario:
      "A learner joins a cohort, follows a structured course, submits a practical assignment, and receives feedback that helps them choose the next lesson.",
    workflow: [
      ["Join", "Guide applicants through eligibility, course selection, and enrolment."],
      [
        "Learn",
        "Present content in a clear sequence with accessible navigation and saved progress.",
      ],
      ["Practice", "Capture assignments with transparent submission and review states."],
      [
        "Improve",
        "Return feedback, show meaningful progress, and connect learners to the next activity.",
      ],
    ],
    firstRelease:
      "Choose one learner group and one learning format. Deliver enrolment, core lessons, one assessment type, and instructor feedback before adding a broad course marketplace.",
    decisions: [
      [
        "What does progress mean?",
        "Distinguish content viewed, work submitted, skills assessed, and credentials awarded.",
      ],
      [
        "Who maintains the content?",
        "Define authoring, review, publishing, versioning, and ownership of course materials.",
      ],
      [
        "Who needs access?",
        "Map learner, instructor, administrator, and guardian roles where applicable, with privacy requirements from your team.",
      ],
    ],
    integrations: [
      "Student information systems",
      "Video & live classrooms",
      "Payment providers",
      "Content storage",
      "Identity providers",
      "Notification services",
    ],
    faq: [
      [
        "Can you connect an existing LMS?",
        "We review supported APIs, authentication, content structure, and reporting access. A learner portal or admissions layer can sit around an existing LMS where its interfaces support the required journey.",
      ],
      [
        "Can the platform support live and self-paced learning?",
        "Each format needs its own scheduling, access, attendance, and progress rules. We define these before combining the formats in one learner experience.",
      ],
      [
        "Do you create educational content?",
        "The software scope covers content structures, publishing tools, and learner experiences. Course material, assessment standards, and academic approval need a designated content owner.",
      ],
    ],
    services: [
      { slug: "web-applications", name: "Learning & admissions portals" },
      { slug: "mobile-app-development", name: "Learner mobile apps" },
      { slug: "ui-ux-design", name: "Learning experience design" },
    ],
  },
  {
    slug: "saas-enterprise-tech",
    audience: "FOR SAAS FOUNDERS, ISVS & ENTERPRISE PRODUCT TEAMS",
    headline: "Build the product people need.",
    accent: "Give it room to grow.",
    intro:
      "Multi-tenant platforms and enterprise products with a clear path from onboarding to everyday value, supported by the foundations a software business needs.",
    tension: "A feature becomes a product when customers can use it independently.",
    perspective:
      "Onboarding, permissions, billing, tenant boundaries, and support tools shape the product as much as its main screen. We treat them as connected decisions, so the first release can serve a real customer without hiding manual work behind the interface.",
    capabilities: [
      [
        "Multi-tenant architecture",
        "Tenant-aware data access, configuration, workspace management, and isolation choices matched to product constraints.",
      ],
      [
        "Onboarding & activation",
        "Signup, invitations, setup, and guided first actions that lead users toward core value.",
      ],
      [
        "Roles & access",
        "Workspace permissions, administrator controls, and identity integrations around your customer segments.",
      ],
      [
        "Subscriptions & entitlements",
        "Plan access, billing integration, trials, upgrades, and cancellation with clearly defined rules.",
      ],
      [
        "ISV product engineering",
        "New modules, integration layers, interface modernization, and release work within an existing roadmap.",
      ],
      [
        "Product operations",
        "Support views, configuration tools, usage instrumentation, and operational visibility for the team running the service.",
      ],
    ],
    scenario:
      "A customer creates a workspace, invites a colleague, chooses a plan, and completes a meaningful task while support can diagnose issues without crossing tenant boundaries.",
    workflow: [
      ["Activate", "Guide a new workspace from signup to the first useful result."],
      ["Collaborate", "Invite teammates and apply permissions appropriate to their work."],
      ["Subscribe", "Connect the chosen plan to billing events and feature entitlements."],
      [
        "Operate",
        "Support accounts, observe issues, and release improvements with the right operational tools.",
      ],
    ],
    firstRelease:
      "Choose one customer segment and one repeatable core workflow. Include tenant boundaries, onboarding, and operations before multiplying plans or enterprise customization.",
    decisions: [
      [
        "Where are tenant boundaries?",
        "Decide what is shared, what is isolated, and how administrators access customer environments.",
      ],
      [
        "What is the unit of value?",
        "Define the action that makes the product useful before selecting pricing or usage metrics.",
      ],
      [
        "What belongs in configuration?",
        "Separate reusable settings from requests that would fragment the codebase.",
      ],
    ],
    integrations: [
      "Identity & SSO",
      "Billing providers",
      "Email & notifications",
      "Customer business tools",
      "Analytics pipelines",
      "Cloud infrastructure",
    ],
    faq: [
      [
        "Can you build an MVP for multiple customers?",
        "We scope the core workflow with tenant-aware access, onboarding, and essential operations. The isolation model depends on data sensitivity, expected customers, and infrastructure constraints.",
      ],
      [
        "Can you join an existing ISV product?",
        "We start with architecture, repository, release-process, and integration reviews. A focused module can establish a working delivery path before broader roadmap ownership.",
      ],
      [
        "Should billing be in the first release?",
        "Self-service products often need billing early. A sales-led pilot may use a simpler commercial process while still defining entitlements clearly.",
      ],
    ],
    services: [
      { slug: "saas-development", name: "SaaS development" },
      { slug: "ui-ux-design", name: "Product experience design" },
      { slug: "cloud-integrations", name: "Cloud & integrations" },
    ],
  },
  {
    slug: "travel-hospitality",
    audience: "FOR TRAVEL BUSINESSES, HOSPITALITY & TOURISM TEAMS",
    headline: "Make the journey memorable.",
    accent: "Make the booking clear.",
    intro:
      "Booking experiences, travel commerce platforms, and hospitality workspaces that connect discovery, availability, confirmation, and service delivery.",
    tension: "The journey breaks when availability and confirmation disagree.",
    perspective:
      "Travellers need clear choices and dependable status. Operators need to handle supplier responses, changes, and cancellations. We design the purchase and operational handoff together, including when a provider does not respond as expected.",
    capabilities: [
      [
        "Booking platforms",
        "Search, availability, options, guest information, payment handoffs, and confirmation journeys.",
      ],
      [
        "Hospitality experiences",
        "Property discovery, room or experience selection, guest requests, and operator workspaces.",
      ],
      [
        "Travel commerce",
        "Packages, experiences, add-ons, and itinerary components around your commercial model.",
      ],
      [
        "Supplier & partner portals",
        "Listing updates, availability inputs, booking responses, and support requests with defined access.",
      ],
      [
        "Tourism discovery",
        "Destination content, experience directories, maps, and enquiry journeys with editorial ownership.",
      ],
      [
        "Service operations",
        "Changes, cancellations, refund queues, and customer communications connected to the original itinerary.",
      ],
    ],
    scenario:
      "A traveller selects a stay and experience, sees the terms, completes payment, and receives a clear itinerary while the operator manages supplier confirmations.",
    workflow: [
      [
        "Explore",
        "Present destinations, stays, and experiences with useful filters and clear inclusions.",
      ],
      ["Check", "Validate dates, availability, prices, and supplier conditions before commitment."],
      ["Book", "Handle payment and confirmation with visible pending and failed states."],
      ["Travel", "Keep itinerary details, support, changes, and service updates within reach."],
    ],
    firstRelease:
      "Start with one booking category and one supplier model. Prove search, availability, confirmation, and cancellation handling before combining complex itineraries.",
    decisions: [
      [
        "Who confirms availability?",
        "Distinguish live supplier inventory from request-to-book products and manually managed capacity.",
      ],
      [
        "When is a booking final?",
        "Define payment authorization, supplier confirmation, timeouts, and customer messages for each state.",
      ],
      [
        "How are changes handled?",
        "Map cancellation rules, refund responsibility, intervention, and supported supplier APIs.",
      ],
    ],
    integrations: [
      "Booking & inventory APIs",
      "Property management",
      "Payment providers",
      "Maps",
      "Supplier feeds",
      "Guest messaging",
    ],
    faq: [
      [
        "Can you integrate travel inventory providers?",
        "We review provider access, agreements, documentation, sandboxes, and supported booking actions. Scope reflects the provider’s actual confirmation and cancellation capabilities.",
      ],
      [
        "Can we start with request-to-book?",
        "A request, operator review, and confirmation workflow can be a sensible first release without live inventory. The interface must distinguish a request from a confirmed booking.",
      ],
      [
        "Can the platform serve a tourism organization?",
        "Destination publishing, experience directories, partner submissions, and visitor enquiries can be scoped separately from transactional booking features.",
      ],
    ],
    services: [
      { slug: "web-applications", name: "Booking platforms" },
      { slug: "marketplaces", name: "Travel marketplaces" },
      { slug: "web-development", name: "Hospitality websites" },
    ],
  },
  {
    slug: "government-psu",
    audience: "FOR PUBLIC-SECTOR, TOURISM & CITIZEN-SERVICE TEAMS",
    headline: "Public services, easier to access.",
    accent: "Progress, easier to follow.",
    intro:
      "Citizen portals, departmental workflows, and tourism platforms designed around clear information, accountable handoffs, and practical administration.",
    tension: "A digital form needs a connected service behind it.",
    perspective:
      "Citizens need to know what to submit, where their request stands, and how to resolve a problem. Departmental teams need manageable queues and reliable records. We connect these needs without assuming every service follows the same approval path.",
    capabilities: [
      [
        "Citizen service portals",
        "Service discovery, eligibility guidance, applications, document uploads, and status tracking.",
      ],
      [
        "Departmental workflows",
        "Review queues, assignment, approvals, clarification requests, and escalation based on ownership.",
      ],
      [
        "Tourism platforms",
        "Destination publishing, experience directories, partner submissions, and visitor information tools.",
      ],
      [
        "Public information websites",
        "Structured content, accessible navigation, notices, search, and publishing controls.",
      ],
      [
        "Administrative workspaces",
        "Role-based access, operational reporting, change history, and export workflows.",
      ],
      [
        "Legacy connections",
        "Integrations and staged migration around existing records, identity systems, and approved hosting constraints.",
      ],
    ],
    scenario:
      "A citizen finds a service, submits an application, responds to a clarification request, and follows progress without repeating information to different teams.",
    workflow: [
      [
        "Understand",
        "Explain eligibility, documents, fees where applicable, and the service steps.",
      ],
      ["Submit", "Collect structured information and provide a reference for later use."],
      [
        "Review",
        "Route work to the responsible team and make clarification requests understandable.",
      ],
      [
        "Resolve",
        "Record the outcome, notify the applicant, and retain the required decision history.",
      ],
    ],
    firstRelease:
      "Choose one service and one department. Agree the application, review, clarification, and outcome path before expanding to additional services or agencies.",
    decisions: [
      [
        "Who owns each service step?",
        "Map responsibilities, delegated approvals, and escalation when an application stalls.",
      ],
      [
        "What must be accessible?",
        "Define languages, assistive-technology needs, low-bandwidth use, and acceptance criteria with project owners.",
      ],
      [
        "Where can the platform run?",
        "Confirm hosting, identity, retention, procurement, and handover requirements before selecting infrastructure.",
      ],
    ],
    integrations: [
      "Approved identity systems",
      "Departmental APIs",
      "Document repositories",
      "Payment services",
      "Notification gateways",
      "Reporting systems",
    ],
    faq: [
      [
        "Can you work within prescribed hosting requirements?",
        "We assess the environment, access process, documentation, and acceptance criteria during discovery. The technical approach and scope are agreed within those constraints.",
      ],
      [
        "Can the portal be accessible and multilingual?",
        "We define criteria, languages, content ownership, and review during scoping. Validation includes keyboard navigation, assistive-technology checks, and the actual language content.",
      ],
      [
        "Can existing departmental records be migrated?",
        "We review record formats, data quality, ownership, and retention requirements before planning a migration. A staged approach can include field mapping, trial imports, reconciliation, and an agreed cutover with the department’s team.",
      ],
    ],
    services: [
      { slug: "web-applications", name: "Citizen & departmental portals" },
      { slug: "web-development", name: "Public information websites" },
      { slug: "custom-software", name: "Departmental workflow systems" },
    ],
  },
];

export const industryLandingBySlug = (slug: string) =>
  industryLandings.find((page) => page.slug === slug);
