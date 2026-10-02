/** Illustrative scenarios and scoping guidance; these are not client case studies or guaranteed outcomes. */
export type ServiceEditorial = {
  scenario: string;
  moment: string;
  journey: [string, string][];
  decisions: [string, string][];
  firstRelease: string;
};

export const SERVICE_EDITORIAL: Record<string, ServiceEditorial> = {
  "web-applications": {
    scenario: "A customer submits a request. Your team sees it, assigns an owner, and gives the customer a clear status without another email thread.",
    moment: "A connected workspace for the work that used to live across forms, inboxes, and spreadsheets.",
    journey: [["01 / REQUEST", "Collect the right information once, with validation at the point of entry."], ["02 / ACTION", "Route the request to the person who can act on it, with context attached."], ["03 / VISIBILITY", "Give staff and customers an appropriate view of progress and history."]],
    decisions: [["Who uses it?", "Separate customer, staff, and administrator journeys before designing permissions."], ["What already exists?", "Identify source systems and APIs so information has one reliable home."], ["What matters first?", "Choose one complete workflow for the first release, not a dashboard of unfinished features."]],
    firstRelease: "Start with one user journey: request, review, resolution, and status. Add reporting and adjacent workflows after that path works end to end.",
  },
  "e-commerce": {
    scenario: "A shopper finds a product, understands the options, checks out, and receives a useful order update. Your team sees the same order in its fulfillment view.",
    moment: "A buying journey is only as strong as the operations behind the purchase.",
    journey: [["01 / DISCOVER", "Organize categories, search, and variants around how customers actually shop."], ["02 / PURCHASE", "Make shipping, totals, payment, and confirmation understandable before commitment."], ["03 / FULFILL", "Keep orders, stock, and customer updates connected after checkout."]],
    decisions: [["Catalog complexity", "Define variants, pricing, availability, and how product data will be maintained."], ["Payment and delivery", "Confirm providers, supported regions, returns, and fulfillment handoffs."], ["Existing systems", "Check whether inventory and orders need to sync with tools your team already uses."]],
    firstRelease: "Launch with a manageable catalog and a tested purchase-to-fulfillment path. Expand merchandising and automation from real shopper behavior.",
  },
  marketplaces: {
    scenario: "A customer discovers a provider, compares availability, makes a booking, and both sides see the same confirmed details.",
    moment: "Two-sided products need two clear experiences and one trusted transaction.",
    journey: [["01 / MATCH", "Help buyers filter relevant listings without overwhelming discovery."], ["02 / COMMIT", "Make pricing, availability, and booking terms clear to both sides."], ["03 / OPERATE", "Give your team the tools to review listings, handle exceptions, and resolve issues."]],
    decisions: [["Supply first", "Decide how providers join and what information makes a listing useful."], ["Transaction model", "Define booking, payment, cancellation, and commission rules up front."], ["Trust and control", "Plan moderation, disputes, permissions, and support ownership before launch."]],
    firstRelease: "Prove one category, one market, and one transaction type before multiplying listing formats or regions.",
  },
  "web-development": {
    scenario: "A prospective customer arrives with a question, finds the right service, understands what happens next, and sends an enquiry without hunting for a contact link.",
    moment: "A useful website turns business information into a clear next step.",
    journey: [["01 / UNDERSTAND", "Lead with the offer and organize pages around real visitor questions."], ["02 / EXPLORE", "Make services, proof, and practical details easy to scan across devices."], ["03 / ACT", "Connect forms or enquiries to a follow-up process your team can manage."]],
    decisions: [["Content ownership", "Agree who supplies, reviews, and updates copy and imagery."], ["Conversion path", "Choose the primary action on each page and what happens after submission."], ["Search foundations", "Plan page structure, metadata, accessibility, and performance from the start."]],
    firstRelease: "Begin with the pages customers need to decide and enquire. Add content sections only when they answer a distinct question.",
  },
  "mobile-app-development": {
    scenario: "A user opens the app between tasks, sees the one thing that needs attention, completes it in a few taps, and gets a clear confirmation.",
    moment: "Mobile products should respect small screens, interruptions, and the way people use them on the move.",
    journey: [["01 / ARRIVE", "Make onboarding and sign-in proportional to the task ahead."], ["02 / COMPLETE", "Keep the primary action obvious, with forgiving forms and useful feedback."], ["03 / RETURN", "Use notifications and saved state only where they help people pick up work."]],
    decisions: [["Native capabilities", "Identify camera, location, offline use, or push needs before choosing the build approach."], ["Existing services", "Review APIs, authentication, and account data that the app must reuse."], ["Release requirements", "Account for store review, device testing, privacy disclosures, and updates."]],
    firstRelease: "Build around one repeatable task and test it on actual devices before broadening the feature set.",
  },
  "custom-software": {
    scenario: "A request enters once, moves through approval with a clear owner, and appears in the team's shared record instead of disappearing into chat.",
    moment: "The best internal software reflects decisions and responsibilities, not just fields on a screen.",
    journey: [["01 / CAPTURE", "Replace duplicate entry with a structured intake that matches the real process."], ["02 / DECIDE", "Give each role the context and permissions needed for the next action."], ["03 / TRACE", "Keep changes, decisions, and status visible to the people who need them."]],
    decisions: [["Process reality", "Map exceptions and handoffs, not only the ideal workflow."], ["Access boundaries", "Identify who can view, approve, change, and export information."], ["Migration", "Assess source data quality and ownership before importing old records."]],
    firstRelease: "Choose one painful operational loop and make it reliable. Expand only after staff can complete it without parallel spreadsheets.",
  },
  "saas-development": {
    scenario: "A new customer signs up, sets up a workspace, invites a colleague, and reaches the product's core value before they need help.",
    moment: "A SaaS product is more than screens: onboarding, access, billing, and daily use must agree.",
    journey: [["01 / JOIN", "Help users understand the first action after account creation."], ["02 / ADOPT", "Make roles and workspace setup part of a coherent product journey."], ["03 / CONTINUE", "Connect billing and account changes to the access users expect."]],
    decisions: [["First user", "Define the specific user and problem the MVP must serve."], ["Tenancy and roles", "Plan how organizations, invitations, and data boundaries work."], ["Billing model", "Agree what plans include and what happens when subscriptions change."]],
    firstRelease: "Ship one valuable repeatable workflow with account setup and support essentials. Let usage inform the next release.",
  },
  "ai-automation": {
    scenario: "A customer request arrives, relevant details are identified, the right system is checked, and a person reviews the cases that need judgment.",
    moment: "Useful AI has a defined job, known inputs, a way to check its output, and a safe handoff.",
    journey: [["01 / INTAKE", "Define what the system may read and what task it should perform."], ["02 / REASON", "Ground responses in approved data and test ambiguous or incomplete requests."], ["03 / HANDOFF", "Route low-confidence or sensitive cases to a person with context preserved."]],
    decisions: [["Quality bar", "Decide what a correct result looks like and how failures are detected."], ["Data boundaries", "Review access, retention, and provider constraints before connecting business data."], ["Human oversight", "Choose which actions need approval and how errors can be corrected."]],
    firstRelease: "Pilot one measurable task with a human fallback. Expand automation only after quality has been evaluated on realistic inputs.",
  },
  "ui-ux-design": {
    scenario: "A user reaches a complex task, knows where to start, sees what's required, and recovers easily when something goes wrong.",
    moment: "Good product design makes the next decision feel obvious without hiding important detail.",
    journey: [["01 / MAP", "Understand who uses the product and what they need to finish."], ["02 / SHAPE", "Test structure, labels, and the critical path before polishing screens."], ["03 / REFINE", "Design responsive layouts and all the states between empty and complete."]],
    decisions: [["Research inputs", "Use existing feedback, analytics, and conversations where available."], ["Constraints", "Identify brand, accessibility, technical, and operational requirements early."], ["Handoff", "Agree how components, behavior, and edge states will be documented."]],
    firstRelease: "Prioritize the journeys that carry the most value or friction, then establish reusable patterns for the rest.",
  },
  "cloud-integrations": {
    scenario: "An order is completed in one system, an update reaches another, and the team can tell when the connection fails instead of discovering it days later.",
    moment: "Integrations are operational workflows, not just connections between two APIs.",
    journey: [["01 / DEFINE", "Specify what data moves, when, and which system owns it."], ["02 / CONNECT", "Handle authentication, mapping, retries, and duplicate events deliberately."], ["03 / OBSERVE", "Make failures visible and give operators a way to recover."]],
    decisions: [["System ownership", "Determine which tool is authoritative for each record."], ["Failure behavior", "Plan timeouts, rate limits, retries, and reconciliation."], ["Deployment", "Decide on environments, access, monitoring, and handoff responsibilities."]],
    firstRelease: "Connect one important flow end to end and verify both the success path and the recovery path.",
  },
  "maintenance-support": {
    scenario: "An issue is reported, its impact is understood, a fix is checked against the affected journey, and the change is released with a clear record.",
    moment: "A live product needs a sensible way to learn, prioritize, and improve.",
    journey: [["01 / OBSERVE", "Collect issues and feedback with enough context to reproduce them."], ["02 / PRIORITIZE", "Separate urgent defects from enhancements and agree what comes next."], ["03 / RELEASE", "Validate changes, communicate impact, and watch the product after delivery."]],
    decisions: [["Ownership", "Clarify who has access to code, hosting, providers, and production logs."], ["Priority", "Agree how severity and business impact affect response planning."], ["Continuity", "Keep documentation and dependencies current so future work is easier."]],
    firstRelease: "Begin with a product review and a prioritized backlog. Fix the most consequential issues before adding features.",
  },
};
