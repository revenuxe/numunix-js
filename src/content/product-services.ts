import type { Feature } from "./features";

const DELIVERY_STEPS: Feature["steps"] = [
  { step: "01", title: "Define", body: "Map users, business rules, and the first release." },
  { step: "02", title: "Design", body: "Shape key journeys and validate the interface." },
  { step: "03", title: "Build", body: "Develop the product, connect systems, and test critical flows." },
  { step: "04", title: "Launch", body: "Prepare production, hand over the product, and plan improvements." },
];

export const PRODUCT_SERVICES: Feature[] = [
  {
    slug: "web-applications", label: "WEB APPLICATIONS", name: "Web Applications",
    title: "Complex workflows. Simple experiences.", accentWord: "Simple experiences.",
    intro: "Dashboards, portals, and browser-based tools that make everyday work easier.",
    metaTitle: "Custom Web Application Development | Numunix",
    metaDescription: "Build customer portals, dashboards, booking platforms, and internal tools with Numunix. Custom web applications designed around your workflows.",
    demo: "jobs",
    stats: [["INTERFACE", "React"], ["LANGUAGE", "TypeScript"], ["BACKEND", "APIs"], ["ACCESS", "Role-based"]],
    capabilities: [
      { title: "Customer portals", body: "Give customers a clear place to manage accounts, requests, documents, and activity." },
      { title: "Dashboards and internal tools", body: "Bring approvals, reporting, assignments, and key data into a connected workspace." },
      { title: "Booking and workflows", body: "Model scheduling, availability, and business rules around your product." },
      { title: "Connected architecture", body: "Connect authentication, databases, APIs, and existing systems with clear permissions and data flows." },
    ],
    steps: DELIVERY_STEPS,
    outcomes: ["A focused interface for important tasks", "Shared data across connected workflows", "A maintainable foundation for new capabilities"],
    faq: [
      { q: "How does a web application differ from a website?", a: "A website primarily presents information. A web application lets users complete tasks, manage data, and interact with business workflows." },
      { q: "Can you connect our existing systems?", a: "Yes. We review available APIs, data, permissions, and business rules before defining integrations." },
    ],
  },
  {
    slug: "e-commerce", label: "E-COMMERCE", name: "E-commerce Development",
    title: "A better way to shop. And sell.", accentWord: "shop. And sell.",
    intro: "Online stores that connect a clear shopping experience with the tools behind your business.",
    metaTitle: "E-commerce Website & Platform Development | Numunix",
    metaDescription: "Numunix builds online stores with product catalogs, checkout, payments, inventory, order management, and business integrations.",
    demo: "invoice",
    stats: [["CATALOG", "Products"], ["CHECKOUT", "Payments"], ["OPERATIONS", "Orders"], ["INTEGRATION", "Inventory"]],
    capabilities: [
      { title: "Product discovery", body: "Organize catalogs, variants, search, and filters so shoppers can find the right products." },
      { title: "Cart and checkout", body: "Design a clear purchase journey with payment integration and useful order confirmations." },
      { title: "Order management", body: "Connect stock, orders, fulfillment updates, and returns around your operating process." },
      { title: "Commerce integrations", body: "Link shipping providers, inventory systems, CRMs, and analytics as your project requires." },
    ],
    steps: DELIVERY_STEPS,
    outcomes: ["A consistent journey from discovery to checkout", "Connected order and inventory information", "A storefront that can evolve with your catalog"],
    faq: [
      { q: "Can you improve an existing store?", a: "Yes. We assess your platform, catalog, integrations, and customer journey to scope a redesign or migration." },
      { q: "Which payment and shipping providers can you integrate?", a: "We choose integrations around your market and requirements, after checking APIs, provider availability, and account prerequisites." },
    ],
  },
  {
    slug: "marketplaces", label: "MARKETPLACES", name: "Marketplace Development",
    title: "Bring buyers and sellers together.", accentWord: "together.",
    intro: "Multi-vendor platforms built around discovery, transactions, and the people on both sides.",
    metaTitle: "Custom Marketplace Platform Development | Numunix",
    metaDescription: "Build a multi-vendor marketplace with Numunix: buyer and seller accounts, listings, search, transactions, and platform management tools.",
    demo: "booking",
    stats: [["USERS", "Buyers"], ["PARTNERS", "Sellers"], ["DISCOVERY", "Listings"], ["CONTROL", "Admin"]],
    capabilities: [
      { title: "Buyer and seller journeys", body: "Build distinct onboarding, profiles, and account tools for each side of the marketplace." },
      { title: "Listings and discovery", body: "Make products or services searchable with categories, filters, details, and availability." },
      { title: "Transactions and bookings", body: "Plan checkout, bookings, commissions, and payment connections around your business model." },
      { title: "Platform administration", body: "Give your team tools for listing review, user management, issue handling, and reporting." },
    ],
    steps: DELIVERY_STEPS,
    outcomes: ["Clear experiences for customers and providers", "Business rules reflected in the transaction flow", "Admin tools for daily platform management"],
    faq: [
      { q: "Can we start with a marketplace MVP?", a: "Yes. We scope one core transaction, a focused audience, and essential buyer, seller, and admin workflows for the first release." },
      { q: "Can the platform support services as well as products?", a: "Yes. Listings, availability, fulfillment, and payments are designed around whether you offer products, services, or bookings." },
    ],
  },
];
