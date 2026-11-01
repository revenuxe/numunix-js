import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  ArrowRight,
  Check,
  CheckCheck,
  ChevronRight,
  Cctv,
  Code2,
  Cpu,
  CreditCard,
  Database,
  Globe,
  HardDrive,
  Layers,
  LayoutDashboard,
  LockKeyhole,
  MousePointer2,
  Play,
  Search,
  ShieldCheck,
  ShoppingBag,
  Smartphone,
  Tv,
  Workflow,
  Wrench,
} from "lucide-react";
import "./ServiceDemo.css";

type Story =
  | "web"
  | "mobile"
  | "ai"
  | "software"
  | "saas"
  | "design"
  | "cloud"
  | "support"
  | "commerce"
  | "marketplace";
const STORIES: Record<
  Story,
  { eyebrow?: string; title: string; steps: string[]; captions: string[] }
> = {
  web: {
    title: "A website, ready for the world.",
    steps: ["Structure", "Build", "Adapt", "Launch"],
    captions: [
      "Start with a clear page structure and a focused message.",
      "Bring your brand to life with a polished interface.",
      "Adapt the experience to desktop, tablet, and mobile.",
      "Publish a responsive website built around your business.",
    ],
  },
  mobile: {
    title: "One idea. Every screen.",
    steps: ["Open", "Explore", "Act", "Sync"],
    captions: [
      "Give users a simple starting point.",
      "Make the next action easy to find.",
      "Turn a tap into a clear, useful result.",
      "Keep the experience connected across iOS and Android.",
    ],
  },
  ai: {
    title: "From a request to a result.",
    steps: ["Receive", "Understand", "Connect", "Complete"],
    captions: [
      "A customer asks a question in everyday language.",
      "The assistant identifies the intent and relevant details.",
      "Approved tools connect the answer to your business data.",
      "The customer gets an answer, with the next step handled.",
    ],
  },
  software: {
    title: "Your process. Working together.",
    steps: ["Request", "Review", "Approve", "Record"],
    captions: [
      "Capture a request once, with the details your team needs.",
      "Route it to the right person with clear permissions.",
      "Move approved work forward without re-entering data.",
      "Keep the decision and its history in one shared workspace.",
    ],
  },
  saas: {
    title: "A product people can grow into.",
    steps: ["Sign up", "Set up", "Subscribe", "Use"],
    captions: [
      "Welcome a new user into your product.",
      "Create a workspace with the right roles and access.",
      "Connect subscriptions to the features each plan includes.",
      "Bring onboarding, billing, and everyday work together.",
    ],
  },
  design: {
    title: "From a rough idea to a clear flow.",
    steps: ["Map", "Frame", "Refine", "Prototype"],
    captions: [
      "Map what the user needs to accomplish.",
      "Arrange the content before adding visual detail.",
      "Shape the typography, components, and visual hierarchy.",
      "Connect the screens into a journey ready for feedback.",
    ],
  },
  cloud: {
    title: "From your code to the cloud.",
    steps: ["Commit", "Check", "Deploy", "Monitor"],
    captions: [
      "Start with a versioned change to your application.",
      "Check the build before it reaches your users.",
      "Connect the application, APIs, and database in production.",
      "Use logs and monitoring to understand how the product runs.",
    ],
  },
  support: {
    title: "A better product with every release.",
    steps: ["Observe", "Prioritize", "Improve", "Release"],
    captions: [
      "Review product issues and user feedback.",
      "Choose improvements around business impact.",
      "Validate the fix and check the affected journeys.",
      "Deliver the update with a clear record of what changed.",
    ],
  },
  commerce: {
    title: "From discovery to delivery.",
    steps: ["Browse", "Choose", "Pay", "Track"],
    captions: [
      "Help shoppers find the right product.",
      "Keep the selection and order summary clear.",
      "Connect checkout with a payment provider.",
      "Give customers a clear confirmation and order status.",
    ],
  },
  marketplace: {
    title: "Two sides. One connected platform.",
    steps: ["Discover", "Compare", "Book", "Confirm"],
    captions: [
      "Connect customers with relevant providers.",
      "Make availability and offerings easy to compare.",
      "Bring selection and booking into one journey.",
      "Keep both sides informed with a shared booking record.",
    ],
  },
};

const BY_SLUG: Record<string, Story> = {
  "web-development": "web",
  "web-applications": "software",
  "mobile-app-development": "mobile",
  "ai-automation": "ai",
  "custom-software": "software",
  "saas-development": "saas",
  "ui-ux-design": "design",
  "cloud-integrations": "cloud",
  "maintenance-support": "support",
  "e-commerce": "commerce",
  marketplaces: "marketplace",
};

// ============ Repair presets — homepage electronics-repair concept ============
// Same stage structures and styles; only the story, copy, and icons change.

export type RepairStory =
  | "repair-mobile"
  | "repair-board"
  | "repair-cctv"
  | "repair-web"
  | "repair-tv"
  | "repair-data"
  | "repair-ai"
  | "repair-warranty";

const REPAIR_STORIES: Record<
  RepairStory,
  { eyebrow: string; title: string; steps: string[]; captions: string[] }
> = {
  "repair-mobile": {
    eyebrow: "IN MOTION / SERVICE CONCEPT",
    title: "Every repair, tracked end to end.",
    steps: ["Booked", "Diagnosed", "Repaired", "Ready"],
    captions: [
      "Book your repair in a minute — walk in or request a doorstep pickup.",
      "Technicians diagnose the fault and share a clear, itemised estimate.",
      "The repair is completed on the bench with tested, quality parts.",
      "Collect your device, or get it delivered — with a service warranty.",
    ],
  },
  "repair-board": {
    eyebrow: "IN MOTION / SERVICE CONCEPT",
    title: "A repair bench you can see into.",
    steps: ["Booked", "Diagnosed", "Repaired", "Ready"],
    captions: [
      "Every incoming device becomes a repair job with a clear status.",
      "Diagnosis and the approved estimate are recorded on the job card.",
      "Technicians log parts and progress as the job moves across the bench.",
      "Quality check, pickup, and warranty are recorded before handover.",
    ],
  },
  "repair-cctv": {
    eyebrow: "IN MOTION / SERVICE CONCEPT",
    title: "CCTV that’s installed to actually work.",
    steps: ["Surveyed", "Installed", "Verified", "Secured"],
    captions: [
      "We survey the site and plan camera positions with you.",
      "Cameras, wiring, and the recorder are installed neatly.",
      "Every camera is checked for coverage, night vision, and recording.",
      "You get remote view on your phone, plus a maintenance schedule.",
    ],
  },
  "repair-web": {
    eyebrow: "IN MOTION / SERVICE CONCEPT",
    title: "A service desk for every machine at home.",
    steps: ["Booked", "Assigned", "Repaired", "Delivered"],
    captions: [
      "Book a technician for the appliance that stopped working.",
      "We assign the right specialist and confirm a visit slot.",
      "The fault is fixed with tested parts, on the itemised estimate.",
      "The machine is tested with you before the job is closed.",
    ],
  },
  "repair-tv": {
    eyebrow: "IN MOTION / SERVICE CONCEPT",
    title: "TVs and audio, back to their best.",
    steps: ["Received", "Assessed", "Repaired", "Delivered"],
    captions: [
      "Bring the TV or audio system in, or book a home pickup.",
      "We assess the panel, backlight, board, or speakers and share an estimate.",
      "The faulty module is repaired or replaced with tested parts.",
      "Picture and sound are checked with you before delivery.",
    ],
  },
  "repair-data": {
    eyebrow: "IN MOTION / SERVICE CONCEPT",
    title: "When the data matters more than the device.",
    steps: ["Received", "Assessed", "Recovered", "Handed over"],
    captions: [
      "Bring the drive, phone, or memory card that stopped working.",
      "We assess it without powering it on and tell you what’s possible.",
      "Recoverable photos, files, and contacts are restored to a new drive.",
      "You verify everything before we hand it back.",
    ],
  },
  "repair-ai": {
    eyebrow: "IN MOTION / SERVICE CONCEPT",
    title: "Describe the fault. AI does the rest.",
    steps: ["Received", "Diagnosed", "Checked", "Booked"],
    captions: [
      "Describe the problem in your own words — on chat or WhatsApp.",
      "The assistant recognises the device and the likely fault.",
      "It checks your warranty, parts stock, and the next free bench slot.",
      "You get a diagnosis, an estimate, and a booked slot — without waiting.",
    ],
  },
  "repair-warranty": {
    eyebrow: "IN MOTION / SERVICE CONCEPT",
    title: "AMC plans that keep devices covered.",
    steps: ["Register", "Activate", "Schedule", "Covered"],
    captions: [
      "Register the devices your home or business depends on.",
      "Activate a maintenance plan that matches how you use them.",
      "Preventive checks and priority repairs are scheduled for you.",
      "Something breaks? One call — the plan takes care of the rest.",
    ],
  },
};

function Browser({
  children,
  address = "your-product.app",
}: {
  children: ReactNode;
  address?: string;
}) {
  return (
    <div className="sd-browser">
      <div className="sd-browser-bar">
        <span className="sd-window-dots">
          <i />
          <i />
          <i />
        </span>
        <span>
          <LockKeyhole size={10} />
          {address}
        </span>
        <span>↗</span>
      </div>
      {children}
    </div>
  );
}
function Badge({
  children,
  icon = <Check size={12} />,
}: {
  children: ReactNode;
  icon?: ReactNode;
}) {
  return (
    <span className="sd-badge">
      {icon}
      {children}
    </span>
  );
}

function WebScene({ phase }: { phase: number }) {
  return (
    <div className={`sd-web ${phase === 0 ? "sd-wireframe" : ""}`}>
      <Browser address="your-brand.com">
        <div className="sd-site-nav">
          <b>
            FORMA<span>®</span>
          </b>
          <span>Studio &nbsp; Work &nbsp; About</span>
          <i>Let’s talk ↗</i>
        </div>
        <div className="sd-site-hero">
          <div>
            <span className="sd-eyebrow">THOUGHTFULLY MADE</span>
            <h4>
              A new perspective.
              <br />
              <em>Built around you.</em>
            </h4>
            <p>Good ideas deserve a great first impression.</p>
            <span className="sd-mini-button">
              Explore our work <ArrowRight size={11} />
            </span>
          </div>
          <div className="sd-sculpture">
            <i />
            <i />
            <i />
          </div>
        </div>
        <div className="sd-site-tiles">
          <span>
            01 <b>Considered design</b>
          </span>
          <span>
            02 <b>Clear experience</b>
          </span>
          <span>
            03 <b>Room to grow</b>
          </span>
        </div>
      </Browser>
      <div className={`sd-web-phone sd-appear ${phase >= 2 ? "is-shown" : ""}`}>
        <div className="sd-phone-speaker" />
        <b>FORMA®</b>
        <div className="sd-phone-art" />
        <strong>
          A new
          <br />
          perspective.
        </strong>
        <span className="sd-mini-button">Explore ↗</span>
      </div>
      <div className={`sd-float sd-appear ${phase === 3 ? "is-shown" : ""}`}>
        <Badge icon={<Globe size={12} />}>Ready to launch</Badge>
      </div>
    </div>
  );
}

function MobileScene({ phase }: { phase: number }) {
  return (
    <div className="sd-mobile">
      <div className="sd-orbit sd-orbit-one" />
      <div className="sd-orbit sd-orbit-two" />
      <span className="sd-platform sd-platform-left">
        <Smartphone size={18} />
        iOS
      </span>
      <span className="sd-platform sd-platform-right">
        <Smartphone size={18} />
        Android
      </span>
      <div className="sd-app-phone">
        <div className="sd-phone-top">
          <span>9:41</span>
          <i />
          <span>▰</span>
        </div>
        <div className="sd-app-body">
          <div className="sd-app-greeting">
            Good morning, Alex <span>A</span>
          </div>
          <h4>
            Your day,
            <br />
            <em>organized.</em>
          </h4>
          <div className="sd-app-banner">
            <span>YOUR WORKSPACE</span>
            <strong>
              Make room
              <br />
              for what matters.
            </strong>
            <Layers size={27} />
          </div>
          <div className={`sd-app-task ${phase >= 1 ? "is-selected" : ""}`}>
            <span className="sd-task-check">{phase >= 2 && <Check size={13} />}</span>
            <div>
              <b>Review the new design</b>
              <small>
                {phase >= 2 ? "Completed · synced to your team" : "Today · Product team"}
              </small>
            </div>
          </div>
          <div className="sd-app-task">
            <span className="sd-task-check" />
            <div>
              <b>Plan the next release</b>
              <small>Tomorrow · Workspace</small>
            </div>
          </div>
          <div className="sd-app-bottom">
            <LayoutDashboard size={16} />
            <Search size={16} />
            <Layers size={16} />
          </div>
        </div>
      </div>
      <div className={`sd-mobile-toast sd-appear ${phase >= 2 ? "is-shown" : ""}`}>
        <span>
          <CheckCheck size={17} />
        </span>
        <div>
          <b>{phase === 3 ? "Everything in sync" : "Task completed"}</b>
          <small>
            {phase === 3 ? "One experience. Both platforms." : "A clear result, in one tap."}
          </small>
        </div>
      </div>
    </div>
  );
}

function AIScene({ phase }: { phase: number }) {
  return (
    <div className="sd-ai">
      <div className="sd-message">
        <span className="sd-avatar">A</span>
        <div>
          <small>CUSTOMER REQUEST</small>
          <p>Can you check my order and send me an update?</p>
        </div>
      </div>
      <div className="sd-connector" />
      <div className={`sd-ai-core ${phase >= 1 ? "is-active" : ""}`}>
        <div className="sd-ai-icon">
          <Cpu size={22} strokeWidth={1.5} aria-hidden="true" />
        </div>
        <div>
          <small>YOUR AI ASSISTANT</small>
          <strong>
            {phase === 0
              ? "A request comes in"
              : phase === 1
                ? "Understands the intent"
                : phase === 2
                  ? "Connects the right tools"
                  : "Turns context into action"}
          </strong>
        </div>
        <span className="sd-status-dot" />
      </div>
      <div className="sd-connector" />
      <div className="sd-tool-grid">
        {[
          [Database, "Find order", "Order #1042"],
          [Workflow, "Send update", "Customer notified"],
        ].map(([Icon, title, result], i) => {
          const ToolIcon = Icon as typeof Database;
          return (
            <div key={i} className={phase >= 2 ? "is-active" : ""}>
              <ToolIcon size={18} />
              <b>{String(title)}</b>
              <small>{phase >= 2 ? String(result) : "Connected business tool"}</small>
              {phase >= 2 && <Check size={12} />}
            </div>
          );
        })}
      </div>
      <div className={`sd-ai-result sd-appear ${phase === 3 ? "is-shown" : ""}`}>
        <CheckCheck size={17} />
        <p>
          Your order is on its way.
          <br />
          <b>I’ve sent the tracking details.</b>
        </p>
      </div>
    </div>
  );
}

function SoftwareScene({ phase, support = false }: { phase: number; support?: boolean }) {
  const lane = Math.min(phase, 2);
  return (
    <Browser address={support ? "release.workspace" : "your-team.workspace"}>
      <div className="sd-workspace-top">
        <span>
          <LayoutDashboard size={15} />
          {support ? "Release workspace" : "Team workspace"}
        </span>
        <Badge>{support ? "Product care" : "Shared workflow"}</Badge>
      </div>
      <div className="sd-board">
        <div className="sd-board-labels">
          {(support
            ? ["Reported", "In review", "Released"]
            : ["Requested", "In review", "Approved"]
          ).map((s, i) => (
            <span key={s}>
              <i className={i <= lane ? "is-active" : ""} />
              {s}
            </span>
          ))}
        </div>
        <div className="sd-board-lanes">
          <i />
          <i />
          <i />
        </div>
        <div className="sd-moving-task" style={{ left: `calc(${lane} * (100% / 3) + 6px)` }}>
          <span className="sd-task-category">
            {support ? "PRODUCT UPDATE" : "PURCHASE REQUEST"}
          </span>
          <b>{support ? "Faster search" : "Design tools"}</b>
          <small>{support ? "Improve result loading" : "Team subscription"}</small>
          <div>
            <span className="sd-avatar">AK</span>
            <span>{phase >= 2 ? "✓ Approved" : "Alex K."}</span>
          </div>
        </div>
        <div className="sd-board-ghost sd-ghost-one" />
        <div className="sd-board-ghost sd-ghost-two" />
      </div>
      <div className="sd-audit">
        <ShieldCheck size={16} />
        <div>
          <b>
            {phase === 3
              ? support
                ? "Update released"
                : "Decision recorded"
              : "Every step, accounted for"}
          </b>
          <small>
            {phase === 3
              ? "History saved · Team notified"
              : "Permissions, approvals, and a shared history"}
          </small>
        </div>
        <Check size={15} />
      </div>
    </Browser>
  );
}

function SaaSScene({ phase }: { phase: number }) {
  return (
    <Browser address="your-saas.app">
      <div className="sd-saas-layout">
        <aside>
          <span className="sd-product-mark">
            <Layers size={19} />
          </span>
          <LayoutDashboard size={16} />
          <Layers size={16} />
          <CreditCard size={16} />
          <ShieldCheck size={16} />
        </aside>
        <div className="sd-saas-main">
          <div className="sd-saas-heading">
            <div>
              <small>YOUR PRODUCT</small>
              <h4>Welcome to your workspace.</h4>
            </div>
            <span className="sd-avatar">A</span>
          </div>
          <div className="sd-onboarding">
            {["Account created", "Workspace configured", "Subscription connected"].map((s, i) => (
              <div className={phase >= i ? "is-done" : ""} key={s}>
                <span>{phase >= i ? <Check size={12} /> : i + 1}</span>
                {s}
              </div>
            ))}
          </div>
          <div className="sd-saas-bottom">
            <div className={`sd-plan ${phase >= 2 ? "is-active" : ""}`}>
              <span>GROWTH PLAN</span>
              <strong>Your next chapter.</strong>
              <small>Team access · Shared projects</small>
              <Badge>{phase >= 2 ? "Subscription active" : "Ready when you are"}</Badge>
            </div>
            <div className="sd-usage">
              <span>PRODUCT ACTIVITY</span>
              <div>
                {[28, 45, 34, 64, 52, 82, 70, 96].map((h, i) => (
                  <i
                    key={i}
                    style={{
                      height: phase === 3 ? `${h}%` : "12%",
                      transitionDelay: `${i * 45}ms`,
                    }}
                  />
                ))}
              </div>
              <small>Illustrative workspace</small>
            </div>
          </div>
        </div>
      </div>
    </Browser>
  );
}

function DesignScene({ phase }: { phase: number }) {
  return (
    <div className={`sd-design ${phase < 2 ? "sd-design-wire" : ""}`}>
      <div className="sd-design-toolbar">
        <span>
          <MousePointer2 size={14} />
          Design canvas
        </span>
        <span>FLOW / 01 → 02</span>
      </div>
      <div className="sd-design-canvas">
        <div className="sd-design-screen">
          <span className="sd-frame-label">01 / DISCOVER</span>
          <div className="sd-design-screen-top">
            <b>STUDIO</b>
            <i />
          </div>
          <div className="sd-design-art">
            <i />
            <i />
          </div>
          <h4>
            Find your
            <br />
            next favorite.
          </h4>
          <div className="sd-design-lines">
            <i />
            <i />
          </div>
          <span className="sd-mini-button">
            Explore collection <ArrowRight size={10} />
          </span>
          <div className={`sd-selection ${phase >= 2 ? "is-shown" : ""}`}>
            <i />
            <i />
            <i />
            <i />
            <span>Button / Primary</span>
          </div>
        </div>
        <div className={`sd-design-path ${phase >= 3 ? "is-active" : ""}`}>
          <i />
          <ArrowRight size={16} />
        </div>
        <div className={`sd-design-screen sd-design-second ${phase >= 1 ? "is-shown" : ""}`}>
          <span className="sd-frame-label">02 / EXPLORE</span>
          <div className="sd-design-screen-top">
            <b>COLLECTION</b>
            <i />
          </div>
          <div className="sd-design-grid">
            {[0, 1, 2, 3].map((i) => (
              <div key={i}>
                <i />
                <span />
              </div>
            ))}
          </div>
          <Badge>Made to explore</Badge>
        </div>
        <MousePointer2 className={`sd-design-cursor ${phase >= 3 ? "is-active" : ""}`} size={23} />
      </div>
    </div>
  );
}

function CloudScene({ phase }: { phase: number }) {
  return (
    <div className="sd-cloud">
      <div className="sd-terminal">
        <div>
          <Code2 size={14} />
          <span>release / production</span>
          <span className="sd-status-dot" />
        </div>
        <p>
          <span>$</span> deploy your-product
        </p>
        {["Build validated", "Services connected", "Release is healthy"].map((s, i) => (
          <p key={s} className={phase > i ? "is-shown" : ""}>
            <Check size={12} />
            {s}
          </p>
        ))}
      </div>
      <div className="sd-connector" />
      <div className="sd-cloud-nodes">
        {[
          [Globe, "Application"],
          [Workflow, "API"],
          [Database, "Database"],
        ].map(([Icon, label], i) => {
          const NodeIcon = Icon as typeof Globe;
          return (
            <div key={i} className={phase >= 2 ? "is-active" : ""}>
              <NodeIcon size={22} />
              <b>{String(label)}</b>
              <small>{phase >= 2 ? "Connected" : "Ready to connect"}</small>
            </div>
          );
        })}
      </div>
      <div className={`sd-cloud-result sd-appear ${phase === 3 ? "is-shown" : ""}`}>
        <Badge icon={<ShieldCheck size={13} />}>Production connected · Monitoring enabled</Badge>
      </div>
    </div>
  );
}

function CommerceScene({ phase, marketplace = false }: { phase: number; marketplace?: boolean }) {
  return (
    <Browser address={marketplace ? "your-marketplace.com" : "your-store.com"}>
      <div className="sd-store-top">
        <b>{marketplace ? "Find your specialist." : "Objects for everyday."}</b>
        <ShoppingBag size={17} />
      </div>
      <div className="sd-store-body">
        <div className="sd-store-product">
          <div className="sd-store-object">
            {marketplace ? (
              <span className="sd-provider">AK</span>
            ) : (
              <div className="sd-product-object" />
            )}
          </div>
          <small>{marketplace ? "CREATIVE SERVICES" : "THE EVERYDAY COLLECTION"}</small>
          <b>{marketplace ? "Alex · Brand designer" : "The Everyday Tote"}</b>
          <span>
            {marketplace ? "Portfolio · Availability · Reviews" : "Natural canvas / Studio edition"}
          </span>
        </div>
        <div className="sd-order">
          <small>{marketplace ? "YOUR BOOKING" : "YOUR ORDER"}</small>
          <strong>{marketplace ? "Brand discovery" : "One good choice."}</strong>
          {[
            marketplace ? "Provider selected" : "Added to your bag",
            marketplace ? "Session booked" : "Payment confirmed",
            marketplace ? "Both sides notified" : "Order ready to track",
          ].map((s, i) => (
            <div className={phase > i ? "is-done" : ""} key={s}>
              <span>{phase > i ? <Check size={11} /> : i + 1}</span>
              {s}
            </div>
          ))}
          <span className="sd-mini-button">
            {phase === 3
              ? "You’re all set"
              : marketplace
                ? "Book a session"
                : "Continue to checkout"}
            <ArrowRight size={11} />
          </span>
        </div>
      </div>
    </Browser>
  );
}

export default function ServiceDemo({ slug, href }: { slug: string; href?: string }) {
  const story = BY_SLUG[slug] ?? "software";
  const config = STORIES[story];
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      setReduced(query.matches);
      if (query.matches) setPhase(3);
    };
    sync();
    query.addEventListener("change", sync);
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(Boolean(entry?.isIntersecting)),
      { threshold: 0.3 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => {
      observer.disconnect();
      query.removeEventListener("change", sync);
    };
  }, []);
  useEffect(() => {
    if (!visible || reduced || phase >= 3) return;
    const timer = window.setTimeout(() => setPhase((p) => Math.min(3, p + 1)), 1400);
    return () => window.clearTimeout(timer);
  }, [visible, reduced, phase]);
  let scene: ReactNode;
  switch (story) {
    case "web":
      scene = <WebScene phase={phase} />;
      break;
    case "mobile":
      scene = <MobileScene phase={phase} />;
      break;
    case "ai":
      scene = <AIScene phase={phase} />;
      break;
    case "software":
    case "support":
      scene = <SoftwareScene phase={phase} support={story === "support"} />;
      break;
    case "saas":
      scene = <SaaSScene phase={phase} />;
      break;
    case "design":
      scene = <DesignScene phase={phase} />;
      break;
    case "cloud":
      scene = <CloudScene phase={phase} />;
      break;
    case "commerce":
    case "marketplace":
      scene = <CommerceScene phase={phase} marketplace={story === "marketplace"} />;
      break;
  }
  const visual = (
    <>
      <div className="sd-stage" aria-hidden="true">
        {scene}
      </div>
      <div className="sd-explanation">
        <div className="sd-steps" aria-hidden="true">
          {config.steps.map((step, i) => (
            <span key={step} className={i <= phase ? "is-complete" : ""}>
              <i>{i < phase ? <Check size={10} /> : String(i + 1).padStart(2, "0")}</i>
              {step}
            </span>
          ))}
        </div>
        <p>{config.captions[phase]}</p>
      </div>
    </>
  );
  return (
    <div ref={ref} className="service-demo" data-service={slug} data-phase={phase}>
      <div className="sd-heading">
        <div>
          <span className="sd-eyebrow">IN MOTION / PRODUCT CONCEPT</span>
          <h3>{config.title}</h3>
        </div>
        <button
          type="button"
          className="sd-replay"
          aria-label={`Replay ${config.title}`}
          disabled={reduced || phase < 3}
          onClick={() => setPhase(0)}
        >
          <Play size={13} />
          <span>Replay</span>
        </button>
      </div>
      {href ? (
        <a
          className="sd-scene-link"
          href={href}
          aria-label={`Explore ${slug.replaceAll("-", " ")}`}
        >
          {visual}
          <span className="sd-link-footer">
            Explore this service <ArrowRight size={16} />
          </span>
        </a>
      ) : (
        visual
      )}
      <span className="sr-only">
        {config.steps.join(" → ")}. {config.captions[3]} This is an illustrative product concept.
      </span>
    </div>
  );
}
