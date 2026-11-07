import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { REPAIR_PAGES, repairPageHref, repairCategoryPath } from "@/content/repair-services";
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
  CalendarDays,
  Users,
  ClipboardList,
} from "lucide-react";
import "./ServiceDemo.css";
import { useCategory } from "./category";
import RepairVisual from "./RepairVisual";
import { REPAIR_SERVICES, HOMEPAGE_REPAIR } from "@/content/homepage-repairs";

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
  | "repair-warranty"
  | "workspace-leads"
  | "workspace-bookings"
  | "workspace-jobs"
  | "workspace-technicians"
  | "workspace-invoices"
  | "workspace-overview";

const REPAIR_STORIES: Record<
  RepairStory,
  { eyebrow: string; title: string; steps: string[]; captions: string[] }
> = {
  "repair-mobile": {
    eyebrow: "IN MOTION / SERVICE CONCEPT",
    title: "Every repair, tracked end to end.",
    steps: ["Booked", "Diagnosed", "Repaired", "Ready"],
    captions: [
      "Book your repair in a minute, walk in or request a doorstep pickup.",
      "Technicians diagnose the fault and share a clear, itemised estimate.",
      "The repair is completed on the bench with tested, quality parts.",
      "Collect your device, or get it delivered, with a service warranty.",
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
      "Describe the problem in your own words, on chat or WhatsApp.",
      "The assistant recognises the device and the likely fault.",
      "It checks your warranty, parts stock, and the next free bench slot.",
      "You get a diagnosis, an estimate, and a booked slot, without waiting.",
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
      "Something breaks? One call, the plan takes care of the rest.",
    ],
  },
  "workspace-leads": {
    eyebrow: "ILLUSTRATIVE WORKSPACE",
    title: "Lead inbox",
    steps: ["Capture", "Review", "Follow up", "Book"],
    captions: [
      "Record the customer's service request and the details the team needs.",
      "Review new enquiries and the service they need.",
      "Track follow-up through clear lead statuses.",
      "Move qualified enquiries into a service booking.",
    ],
  },
  "workspace-bookings": {
    eyebrow: "ILLUSTRATIVE WORKSPACE",
    title: "Booking schedule",
    steps: ["Request", "Schedule", "Assign", "Confirm"],
    captions: [
      "Keep booking requests and service details together.",
      "Review appointment information in one workspace.",
      "Connect a booking with the service job and technician.",
      "Keep the next service step clear for your team.",
    ],
  },
  "workspace-jobs": {
    eyebrow: "ILLUSTRATIVE WORKSPACE",
    title: "Service job board",
    steps: ["Create", "Assign", "Progress", "Complete"],
    captions: [
      "Turn a service request into a trackable service job.",
      "Keep technician assignment with the job record.",
      "Review job status as service work moves forward.",
      "Record completion as part of the service workflow.",
    ],
  },
  "workspace-technicians": {
    eyebrow: "ILLUSTRATIVE WORKSPACE",
    title: "Technician assignments",
    steps: ["Assign", "Receive", "Update", "Complete"],
    captions: [
      "Assign service jobs through the repair workspace.",
      "Technicians can review their assigned work.",
      "Keep job progress connected to its service details.",
      "Record completed work for the team.",
    ],
  },
  "workspace-invoices": {
    eyebrow: "ILLUSTRATIVE WORKSPACE",
    title: "Service invoices",
    steps: ["Review", "Prepare", "Share", "Record"],
    captions: [
      "Bring invoice records into the service workflow.",
      "Prepare service invoices from completed work.",
      "Keep billing information connected to the job.",
      "Review invoice status in the workspace.",
    ],
  },
  "workspace-overview": {
    eyebrow: "ILLUSTRATIVE WORKSPACE",
    title: "Daily overview",
    steps: ["Enquiries", "Bookings", "Jobs", "Invoices"],
    captions: [
      "Bring new service enquiries into a shared view.",
      "Keep bookings and service details together.",
      "Follow assigned jobs through completion.",
      "Keep invoice records connected to the work.",
    ],
  },
};

function MobileRepairScene({ phase }: { phase: number }) {
  return (
    <div className="sd-mobile">
      <div className="sd-orbit sd-orbit-one" />
      <div className="sd-orbit sd-orbit-two" />
      <span className="sd-platform sd-platform-left">
        <Smartphone size={18} />
        Walk-in
      </span>
      <span className="sd-platform sd-platform-right">
        <Smartphone size={18} />
        Doorstep
      </span>
      <div className="sd-app-phone">
        <div className="sd-phone-top">
          <span>9:41</span>
          <i />
          <span>▰</span>
        </div>
        <div className="sd-app-body">
          <div className="sd-app-greeting">
            Hi Priya <span>A</span>
          </div>
          <h4>
            Your repair,
            <br />
            <em>tracked live.</em>
          </h4>
          <div className="sd-app-banner">
            <span>YOUR DEVICE</span>
            <strong>
              iPhone 12
              <br />
              Screen replacement.
            </strong>
            <Wrench size={27} />
          </div>
          <div className={`sd-app-task ${phase >= 1 ? "is-selected" : ""}`}>
            <span className="sd-task-check">{phase >= 2 && <Check size={13} />}</span>
            <div>
              <b>Screen replacement</b>
              <small>{phase >= 2 ? "Completed · quality checked" : "In progress · Bench 04"}</small>
            </div>
          </div>
          <div className="sd-app-task">
            <span className="sd-task-check" />
            <div>
              <b>Battery service</b>
              <small>Booked · Tomorrow, 11:00 AM</small>
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
          <b>{phase === 3 ? "Ready for pickup" : "Repair completed"}</b>
          <small>
            {phase === 3 ? "90-day service warranty included." : "Quality checked on the bench."}
          </small>
        </div>
      </div>
    </div>
  );
}

function RepairBoardScene({ phase }: { phase: number }) {
  const lane = Math.min(phase, 2);
  return (
    <Browser address="bench.workspace">
      <div className="sd-workspace-top">
        <span>
          <LayoutDashboard size={15} />
          Repair bench
        </span>
        <Badge>Live job board</Badge>
      </div>
      <div className="sd-board">
        <div className="sd-board-labels">
          {["Booked", "In repair", "Ready for pickup"].map((s, i) => (
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
          <span className="sd-task-category">REPAIR JOB</span>
          <b>MacBook Air · no display</b>
          <small>Liquid damage · Board-level</small>
          <div>
            <span className="sd-avatar">RK</span>
            <span>{phase >= 2 ? "✓ Ready for pickup" : "Rahul K."}</span>
          </div>
        </div>
        <div className="sd-board-ghost sd-ghost-one" />
        <div className="sd-board-ghost sd-ghost-two" />
      </div>
      <div className="sd-audit">
        <ShieldCheck size={16} />
        <div>
          <b>{phase === 3 ? "Job completed" : "Every job, accounted for"}</b>
          <small>
            {phase === 3
              ? "Quality checked · Customer notified"
              : "Estimates, parts, and a shared job history"}
          </small>
        </div>
        <Check size={15} />
      </div>
    </Browser>
  );
}

function RepairCctvScene({ phase }: { phase: number }) {
  return (
    <div className="sd-cloud">
      <div className="sd-terminal">
        <div>
          <Cctv size={14} />
          <span>cameras / site 07</span>
          <span className="sd-status-dot" />
        </div>
        <p>
          <span>$</span> sync cameras site-07
        </p>
        {["12 cameras online", "Recorder storage verified", "Live view is active"].map((s, i) => (
          <p key={s} className={phase > i ? "is-shown" : ""}>
            <Check size={12} />
            {s}
          </p>
        ))}
      </div>
      <div className="sd-connector" />
      <div className="sd-cloud-nodes">
        {[
          [Cctv, "Cameras"],
          [Workflow, "Recorder"],
          [Globe, "Remote view"],
        ].map(([Icon, label], i) => {
          const NodeIcon = Icon as typeof Globe;
          return (
            <div key={i} className={phase >= 2 ? "is-active" : ""}>
              <NodeIcon size={22} />
              <b>{String(label)}</b>
              <small>{phase >= 2 ? "Streaming" : "Ready to connect"}</small>
            </div>
          );
        })}
      </div>
      <div className={`sd-cloud-result sd-appear ${phase === 3 ? "is-shown" : ""}`}>
        <Badge icon={<ShieldCheck size={13} />}>Site secured · Monitoring enabled</Badge>
      </div>
    </div>
  );
}

function WebRepairScene({ phase }: { phase: number }) {
  return (
    <div className={`sd-web ${phase === 0 ? "sd-wireframe" : ""}`}>
      <Browser address="your-home-service.in">
        <div className="sd-site-nav">
          <b>
            NUMUNIX<span>®</span>
          </b>
          <span>Repairs &nbsp; Status &nbsp; AMC</span>
          <i>Book a repair ↗</i>
        </div>
        <div className="sd-site-hero">
          <div>
            <span className="sd-eyebrow">REPAIRS FOR EVERYDAY MACHINES</span>
            <h4>
              Every appliance.
              <br />
              <em>Back to work.</em>
            </h4>
            <p>Doorstep diagnosis and repair for the machines your home runs on.</p>
            <span className="sd-mini-button">
              Book a technician <ArrowRight size={11} />
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
            01 <b>Washing machines</b>
          </span>
          <span>
            02 <b>Microwaves & chimneys</b>
          </span>
          <span>
            03 <b>AMC plans</b>
          </span>
        </div>
      </Browser>
      <div className={`sd-web-phone sd-appear ${phase >= 2 ? "is-shown" : ""}`}>
        <div className="sd-phone-speaker" />
        <b>NUMUNIX®</b>
        <div className="sd-phone-art" />
        <strong>
          Technician
          <br />
          arriving today.
        </strong>
        <span className="sd-mini-button">Track ↗</span>
      </div>
      <div className={`sd-float sd-appear ${phase === 3 ? "is-shown" : ""}`}>
        <Badge icon={<Globe size={12} />}>Doorstep visit booked</Badge>
      </div>
    </div>
  );
}

function RepairTvScene({ phase }: { phase: number }) {
  return (
    <div className={`sd-design ${phase < 2 ? "sd-design-wire" : ""}`}>
      <div className="sd-design-toolbar">
        <span>
          <Tv size={14} />
          Repair bay
        </span>
        <span>UNIT / 01 → 02</span>
      </div>
      <div className="sd-design-canvas">
        <div className="sd-design-screen">
          <span className="sd-frame-label">01 / ASSESS</span>
          <div className="sd-design-screen-top">
            <b>YOUR TV</b>
            <i />
          </div>
          <div className="sd-design-art">
            <i />
            <i />
          </div>
          <h4>
            Picture and
            <br />
            sound, restored.
          </h4>
          <div className="sd-design-lines">
            <i />
            <i />
          </div>
          <span className="sd-mini-button">
            View estimate <ArrowRight size={10} />
          </span>
          <div className={`sd-selection ${phase >= 2 ? "is-shown" : ""}`}>
            <i />
            <i />
            <i />
            <i />
            <span>Panel / Backlight</span>
          </div>
        </div>
        <div className={`sd-design-path ${phase >= 3 ? "is-active" : ""}`}>
          <i />
          <ArrowRight size={16} />
        </div>
        <div className={`sd-design-screen sd-design-second ${phase >= 1 ? "is-shown" : ""}`}>
          <span className="sd-frame-label">02 / REPAIR</span>
          <div className="sd-design-screen-top">
            <b>ON THE BENCH</b>
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
          <Badge>Backlight replaced</Badge>
        </div>
        <MousePointer2 className={`sd-design-cursor ${phase >= 3 ? "is-active" : ""}`} size={23} />
      </div>
    </div>
  );
}

function RepairDataScene({ phase }: { phase: number }) {
  return (
    <div className={`sd-design ${phase < 2 ? "sd-design-wire" : ""}`}>
      <div className="sd-design-toolbar">
        <span>
          <HardDrive size={14} />
          Recovery bay
        </span>
        <span>DRIVE / 01 → 02</span>
      </div>
      <div className="sd-design-canvas">
        <div className="sd-design-screen">
          <span className="sd-frame-label">01 / ASSESS</span>
          <div className="sd-design-screen-top">
            <b>YOUR DRIVE</b>
            <i />
          </div>
          <div className="sd-design-art">
            <i />
            <i />
          </div>
          <h4>
            Photos you
            <br />
            thought were gone.
          </h4>
          <div className="sd-design-lines">
            <i />
            <i />
          </div>
          <span className="sd-mini-button">
            Preview files <ArrowRight size={10} />
          </span>
          <div className={`sd-selection ${phase >= 2 ? "is-shown" : ""}`}>
            <i />
            <i />
            <i />
            <i />
            <span>Files / Preview</span>
          </div>
        </div>
        <div className={`sd-design-path ${phase >= 3 ? "is-active" : ""}`}>
          <i />
          <ArrowRight size={16} />
        </div>
        <div className={`sd-design-screen sd-design-second ${phase >= 1 ? "is-shown" : ""}`}>
          <span className="sd-frame-label">02 / RECOVER</span>
          <div className="sd-design-screen-top">
            <b>RECOVERED</b>
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
          <Badge>2,148 files restored</Badge>
        </div>
        <MousePointer2 className={`sd-design-cursor ${phase >= 3 ? "is-active" : ""}`} size={23} />
      </div>
    </div>
  );
}

function AIRepairScene({ phase }: { phase: number }) {
  return (
    <div className="sd-ai">
      <div className="sd-message">
        <span className="sd-avatar">A</span>
        <div>
          <small>CUSTOMER MESSAGE</small>
          <p>My laptop gets hot and shuts down after a few minutes.</p>
        </div>
      </div>
      <div className="sd-connector" />
      <div className={`sd-ai-core ${phase >= 1 ? "is-active" : ""}`}>
        <div className="sd-ai-icon">
          <Cpu size={22} strokeWidth={1.5} aria-hidden="true" />
        </div>
        <div>
          <small>AI REPAIR ASSISTANT</small>
          <strong>
            {phase === 0
              ? "A device issue comes in"
              : phase === 1
                ? "Identifies the likely fault"
                : phase === 2
                  ? "Checks parts and bench slots"
                  : "Books the repair for you"}
          </strong>
        </div>
        <span className="sd-status-dot" />
      </div>
      <div className="sd-connector" />
      <div className="sd-tool-grid">
        {[
          [Database, "Check parts stock", "Display module available"],
          [Workflow, "Book bench slot", "Tomorrow · 10:30 AM"],
        ].map(([Icon, title, result], i) => {
          const ToolIcon = Icon as typeof Database;
          return (
            <div key={i} className={phase >= 2 ? "is-active" : ""}>
              <ToolIcon size={18} />
              <b>{String(title)}</b>
              <small>{phase >= 2 ? String(result) : "Connected to the workshop"}</small>
              {phase >= 2 && <Check size={12} />}
            </div>
          );
        })}
      </div>
      <div className={`sd-ai-result sd-appear ${phase === 3 ? "is-shown" : ""}`}>
        <CheckCheck size={17} />
        <p>
          Overheating battery detected.
          <br />
          <b>Diagnostic visit booked.</b>
        </p>
      </div>
    </div>
  );
}

function RepairWarrantyScene({ phase }: { phase: number }) {
  return (
    <Browser address="your-amc-plan.in">
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
              <small>YOUR COVER PLAN</small>
              <h4>Every device, covered.</h4>
            </div>
            <span className="sd-avatar">A</span>
          </div>
          <div className="sd-onboarding">
            {["Devices registered", "Plan activated", "Service visits scheduled"].map((s, i) => (
              <div className={phase >= i ? "is-done" : ""} key={s}>
                <span>{phase >= i ? <Check size={12} /> : i + 1}</span>
                {s}
              </div>
            ))}
          </div>
          <div className="sd-saas-bottom">
            <div className={`sd-plan ${phase >= 2 ? "is-active" : ""}`}>
              <span>ANNUAL MAINTENANCE</span>
              <strong>One plan. Zero surprises.</strong>
              <small>Phones · Laptops · CCTV · Appliances</small>
              <Badge>{phase >= 2 ? "Plan active" : "Ready when you are"}</Badge>
            </div>
            <div className="sd-usage">
              <span>SERVICE VISITS</span>
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
              <small>Illustrative plan</small>
            </div>
          </div>
        </div>
      </div>
    </Browser>
  );
}

type WorkspaceModule = "leads" | "bookings" | "jobs" | "technicians" | "invoices" | "overview";

const WORKSPACE_TITLES: Record<WorkspaceModule, string> = {
  leads: "Leads",
  bookings: "Bookings",
  jobs: "Jobs",
  technicians: "Technicians",
  invoices: "Invoices",
  overview: "Dashboard",
};

function WorkspaceFrame({ module, action, children }: { module: WorkspaceModule; action: string; children: ReactNode }) {
  const title = WORKSPACE_TITLES[module];
  return (
    <div className="sd-dashboard">
      <div className="sd-dashboard-main">
        <div className="sd-dashboard-topbar">
          <span><LayoutDashboard size={10} /> Workspace <b>/</b> {title}</span>
          <span className="sd-dashboard-sample">ILLUSTRATIVE</span>
        </div>
        <div className="sd-dashboard-content">
          <div className="sd-dashboard-heading">
            <div><h4>{title}</h4><p>Repair service workspace</p></div>
            <button type="button" tabIndex={-1}>{action}</button>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}

function LeadWorkspacePreview({ phase }: { phase: number }) {
  const screens = [
    <div className="sd-lead-list" key="inbox">
      <div className="sd-module-toolbar"><span>Recent enquiries</span><span><Search size={10} /> Search leads</span></div>
      {["New service request", "Booking enquiry", "Follow-up needed"].map((item, i) => (
        <div className={`sd-lead-row ${i === 0 ? "is-selected" : ""}`} key={item}><i>{i === 0 ? "S" : "E"}</i><span><b>{item}</b><small>{i === 0 ? "Customer details received" : "Service details captured"}</small></span><em>{i === 0 ? "NEW" : "OPEN"}</em></div>
      ))}
    </div>,
    <div className="sd-lead-detail" key="detail">
      <div className="sd-detail-back">‹ All enquiries <span>NEW ENQUIRY</span></div>
      <h5>New service request</h5><p>Customer request and service details</p>
      <div className="sd-detail-grid"><span>Service type<b>On-site service</b></span><span>Customer<b>Contact details</b></span><span>Request<b>Review needed</b></span><span>Lead status<b>New enquiry</b></span></div>
      <div className="sd-lead-action"><span>Next step</span><b>Review and follow up <ArrowRight size={10} /></b></div>
    </div>,
    <div className="sd-lead-status-screen" key="status">
      <div className="sd-status-heading"><span className="sd-large-icon"><Users size={16} /></span><div><b>Update lead status</b><small>Keep the enquiry moving through your workflow</small></div></div>
      <div className="sd-status-options">{["New", "Contacted", "Qualified", "Booking ready"].map((label, i) => <span key={label} className={i === 1 ? "is-current" : ""}><i>{i === 1 ? <Check size={9} /> : i + 1}</i>{label}</span>)}</div>
      <div className="sd-status-note">Customer follow-up is recorded with the lead.</div>
    </div>,
    <div className="sd-success-screen" key="converted"><span><Check size={17} /></span><h5>Enquiry moved forward</h5><p>The qualified lead is ready to continue as a service booking.</p><div>LEAD STATUS <b>BOOKING READY</b></div></div>,
  ];
  return <WorkspaceFrame module="leads" action="+ New lead"><div key={phase} className="sd-workspace-screen">{screens[phase]}</div></WorkspaceFrame>;
}

function BookingWorkspacePreview({ phase }: { phase: number }) {
  const screens = [
    <div className="sd-booking-request" key="request"><div className="sd-module-toolbar"><span>New service booking</span><span>Step 1 of 3</span></div><div className="sd-booking-fields"><label>Service type<b>On-site service <ChevronRight size={10} /></b></label><label>Customer details<b>Request information <ChevronRight size={10} /></b></label><label>Availability<b>Select a suitable time <ChevronRight size={10} /></b></label></div><div className="sd-booking-footnote">Booking details stay connected to the service request.</div></div>,
    <div className="sd-calendar-screen" key="calendar"><div className="sd-module-toolbar"><span>Choose an appointment</span><span>Availability</span></div><div className="sd-calendar-week">{["MON", "TUE", "WED", "THU", "FRI"].map((day, i) => <span className={i === 2 ? "is-selected" : ""} key={day}><small>{day}</small><b>{i === 2 ? "Select" : "Choose"}</b></span>)}</div><div className="sd-slot-list"><span>Morning visit <b>Available</b></span><span className="is-selected">Afternoon visit <b>Selected</b></span><span>Another time <b>View options</b></span></div></div>,
    <div className="sd-booking-assign" key="assign"><div className="sd-module-toolbar"><span>Service booking</span><span>Appointment details</span></div><div className="sd-appointment-card"><span className="sd-large-icon"><CalendarDays size={16} /></span><div><small>SERVICE VISIT</small><b>Customer appointment</b><span>Appointment time selected</span></div></div><div className="sd-assignment-line"><span>Technician</span><b>Choose team member <ChevronRight size={10} /></b></div><div className="sd-assignment-line"><span>Booking status</span><b>Ready to confirm</b></div></div>,
    <div className="sd-success-screen" key="confirmed"><span><Check size={17} /></span><h5>Booking ready</h5><p>Appointment and service details are together in the workspace.</p><div>BOOKING STATUS <b>CONFIRMED</b></div></div>,
  ];
  return <WorkspaceFrame module="bookings" action="+ New booking"><div key={phase} className="sd-workspace-screen">{screens[phase]}</div></WorkspaceFrame>;
}

function JobWorkspacePreview({ phase }: { phase: number }) {
  const columns = ["New", "Assigned", "In progress", "Complete"];
  return (
    <WorkspaceFrame module="jobs" action="+ New job">
      <div key={phase} className="sd-workspace-screen sd-job-board">
        <div className="sd-module-toolbar"><span>Service job board</span><span>Job status</span></div>
        <div className="sd-kanban-columns">{columns.map((label, i) => <div className={i === phase ? "is-active" : ""} key={label}><small>{label}</small>{i === phase && <article><span>SERVICE JOB</span><b>Scheduled service</b><em>{["Request received", "Technician assigned", "Service underway", "Work completed"][phase]}</em><div><i>ST</i> Service team</div></article>}</div>)}</div>
        <div className="sd-job-footer"><ClipboardList size={12} /> Job details and progress stay on one record.</div>
      </div>
    </WorkspaceFrame>
  );
}

function TechnicianWorkspacePreview({ phase }: { phase: number }) {
  const screens = [
    <div className="sd-tech-queue" key="queue"><div className="sd-module-toolbar"><span>Assigned jobs</span><span>Technician view</span></div>{["Service visit", "Follow-up appointment"].map((job, i) => <div className={`sd-tech-row ${i === 0 ? "is-selected" : ""}`} key={job}><span className="sd-large-icon"><Wrench size={14} /></span><div><b>{job}</b><small>{i === 0 ? "Customer and schedule ready" : "Review job information"}</small></div><ArrowRight size={11} /></div>)}</div>,
    <div className="sd-tech-detail" key="detail"><div className="sd-module-toolbar"><span>Assigned job</span><span>JOB DETAILS</span></div><h5>Service visit</h5><p>Review the request before starting the appointment.</p><div className="sd-tech-detail-grid"><span>Customer<b>Contact details</b></span><span>Schedule<b>Appointment information</b></span><span>Service notes<b>Work details</b></span></div></div>,
    <div className="sd-tech-progress" key="progress"><div className="sd-module-toolbar"><span>Update job progress</span><span>IN PROGRESS</span></div><div className="sd-progress-track"><i /><i className="is-active" /><i /><i /></div><div className="sd-progress-labels"><span>Assigned</span><b>In progress</b><span>Complete</span></div><div className="sd-tech-note">Add a progress update to the job record.</div></div>,
    <div className="sd-success-screen" key="completed"><span><Check size={17} /></span><h5>Job completed</h5><p>Technician progress and completion are recorded with the service job.</p><div>JOB STATUS <b>COMPLETE</b></div></div>,
  ];
  return <WorkspaceFrame module="technicians" action="View team"><div key={phase} className="sd-workspace-screen">{screens[phase]}</div></WorkspaceFrame>;
}

function OverviewWorkspacePreview({ phase }: { phase: number }) {
  const attention = [
    ["New enquiries", "Review service requests", "LEADS"],
    ["Bookings to confirm", "Check service appointments", "BOOKINGS"],
    ["Jobs to assign", "Connect work with technicians", "JOBS"],
    ["Invoices to review", "Keep billing moving", "INVOICES"],
  ];
  return (
    <WorkspaceFrame module="overview" action="+ Create">
      <div key={phase} className="sd-workspace-screen sd-overview-screen">
        <div className="sd-overview-welcome"><div><small>WORKSPACE OVERVIEW</small><b>Your service day</b></div><span>Today <ChevronRight size={10} /></span></div>
        <div className="sd-overview-cards">{[["Leads", "Review requests"], ["Bookings", "Manage visits"], ["Jobs", "Track service work"], ["Invoices", "Review billing"]].map(([title, copy], i) => <div className={i === phase ? "is-active" : ""} key={title}><small>{title}</small><b>{copy}</b></div>)}</div>
        <div className="sd-overview-attention"><div className="sd-module-toolbar"><span>Needs attention</span><span>Open items</span></div>{attention.slice(0, phase + 1).map(([title, copy, tag], i) => <div className="sd-attention-row" key={title}><i>{i + 1}</i><span><b>{title}</b><small>{copy}</small></span><em>{tag}</em><ArrowRight size={10} /></div>)}</div>
      </div>
    </WorkspaceFrame>
  );
}

function InvoiceGenerationPreview({ phase }: { phase: number }) {
  const generated = phase === 3;
  return (
    <div className="sd-dashboard sd-invoice-preview">
      <div className="sd-dashboard-main">
        <div className="sd-dashboard-topbar">
          <span><LayoutDashboard size={10} /> Workspace <b>/</b> Invoices</span>
          <span className="sd-dashboard-sample">ILLUSTRATIVE</span>
        </div>
        <div className="sd-dashboard-content">
          <div className="sd-dashboard-heading">
            <div><h4>{generated ? "Invoice preview" : "Create invoice"}</h4><p>Prepare an invoice from completed service work</p></div>
            <span className="sd-invoice-draft">{generated ? "READY TO REVIEW" : "DRAFT"}</span>
          </div>
          <div className="sd-invoice-progress">
            {["Service job", "Invoice details", "Preview"].map((label, index) => (
              <span key={label} className={index <= (generated ? 2 : phase > 0 ? 1 : 0) ? "is-active" : ""}>
                <i>{index < (generated ? 3 : phase > 0 ? 2 : 1) ? <Check size={9} /> : index + 1}</i>{label}
              </span>
            ))}
          </div>
          {generated ? (
            <div className="sd-invoice-paper">
              <div className="sd-invoice-paper-head"><div><small>NUMUNIX SERVICE WORKSPACE</small><b>Service invoice</b></div><span>PREVIEW</span></div>
              <div className="sd-invoice-meta"><div><small>BILL TO</small><b>Customer record</b></div><div><small>SERVICE JOB</small><b>Completed service</b></div></div>
              <div className="sd-invoice-line"><b>Service description</b><span>Completed work</span><span>Amount from job</span></div>
              <div className="sd-invoice-total"><span>Total</span><b>Review service charges</b></div>
              <div className="sd-invoice-ready"><Check size={10} /> Invoice prepared for review</div>
            </div>
          ) : (
            <div className="sd-invoice-form">
              <div className="sd-invoice-form-head"><b>Invoice details</b><span>Linked service job</span></div>
              <label><span>Customer</span><b className={phase > 0 ? "is-filled" : ""}>{phase > 0 ? "Customer record" : "Select a customer"}<ChevronRight size={10} /></b></label>
              <label><span>Service job</span><b className={phase > 0 ? "is-filled" : ""}>{phase > 0 ? "Completed service" : "Choose a completed job"}<ChevronRight size={10} /></b></label>
              <div className="sd-invoice-charge"><span>Service charges</span><b>{phase > 0 ? "From linked job" : "Added from service details"}</b></div>
              <div className="sd-invoice-actions"><span>Save draft</span><button type="button" tabIndex={-1}>{phase >= 2 ? "Generating invoice" : "Generate invoice"}<ArrowRight size={10} /></button></div>
              {phase === 2 && <MousePointer2 className="sd-invoice-cursor" size={22} />}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const REPAIR_SCENES: Record<RepairStory, (props: { phase: number }) => ReactNode> = {
  "repair-mobile": MobileRepairScene,
  "repair-board": RepairBoardScene,
  "repair-cctv": RepairCctvScene,
  "repair-web": WebRepairScene,
  "repair-tv": RepairTvScene,
  "repair-data": RepairDataScene,
  "repair-ai": AIRepairScene,
  "repair-warranty": RepairWarrantyScene,
  "workspace-leads": ({ phase }) => <LeadWorkspacePreview phase={phase} />,
  "workspace-bookings": ({ phase }) => <BookingWorkspacePreview phase={phase} />,
  "workspace-jobs": ({ phase }) => <JobWorkspacePreview phase={phase} />,
  "workspace-technicians": ({ phase }) => <TechnicianWorkspacePreview phase={phase} />,
  "workspace-invoices": ({ phase }) => <InvoiceGenerationPreview phase={phase} />,
  "workspace-overview": ({ phase }) => <OverviewWorkspacePreview phase={phase} />,
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

export default function ServiceDemo({
  slug,
  href,
  preset,
}: {
  slug: string;
  href?: string;
  preset?: RepairStory;
}) {
  const categoryContext = useCategory();
  const category = categoryContext?.category ?? "electronics";
  const serviceMatch = slug.match(/(?:electronics|appliances)-repair-(\d+)/);
  const serviceIndex = serviceMatch ? Number(serviceMatch[1]) : 0;
  const service = REPAIR_SERVICES[category][serviceIndex] ?? REPAIR_SERVICES[category][0];
  const linkedRepair = REPAIR_PAGES.find(item => href === repairPageHref(item));
  const story: Story = preset ? "software" : (BY_SLUG[slug] ?? "software");
  const originalConfig = preset ? REPAIR_STORIES[preset] : STORIES[story];
  const isWorkspaceDemo = Boolean(preset?.startsWith("workspace-"));
  const isHomepageDemo = Boolean(preset && categoryContext);
  const isHomepageRepair = Boolean(preset && categoryContext && !isWorkspaceDemo);
  const isWarranty = preset === "repair-warranty";
  const isDiagnostic = preset === "repair-ai";
  const config = isHomepageRepair ? {
    eyebrow: "REPAIR JOURNEY / ILLUSTRATIVE",
    title: isWarranty ? (category === "appliances" ? "Maintenance for everyday appliances." : "Maintenance for everyday devices.") : isDiagnostic ? "Symptoms first. Diagnosis next." : (service?.title ?? originalConfig.title),
    steps: isWarranty ? ["Register", "Inspect", "Service", "Review"] : ["Inspect", "Estimate", "Repair", "Test"],
    captions: isWarranty ? ["List the items you want assessed for maintenance.", `Discuss checks for ${HOMEPAGE_REPAIR[category].maintenance.toLowerCase()}.`, "Confirm visit frequency and covered work before selecting a plan.", "Keep a record of service visits and recommended follow-up."] : [service?.body ?? "Describe the fault for assessment.", "Review the fault assessment and estimate before approving work.", "The agreed repair is carried out and the affected functions are checked.", "Review the test results and any aftercare or warranty terms at handover."],
  } : originalConfig;
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
    if (!visible || reduced || (phase >= 3 && !isHomepageDemo)) return;
    const timer = window.setTimeout(
      () => setPhase((current) => (current >= 3 ? 0 : current + 1)),
      phase >= 3 ? 1600 : 1400,
    );
    return () => window.clearTimeout(timer);
  }, [visible, reduced, phase, isHomepageDemo]);
  let scene: ReactNode;
  if (isHomepageRepair) {
    scene = <RepairVisual category={category} service={serviceIndex} phase={phase} />;
  } else if (isWorkspaceDemo && preset) {
    const WorkspaceScene = REPAIR_SCENES[preset];
    scene = <WorkspaceScene phase={phase} />;
  } else if (preset) {
    const RepairScene = REPAIR_SCENES[preset];
    scene = <RepairScene phase={phase} />;
  } else
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
  const linkedVisual = <>{visual}<span className="sd-link-footer">{isWorkspaceDemo ? "Open Numunix workspace" : linkedRepair ? `Explore ${linkedRepair.name}` : isWarranty ? "Explore repair aftercare" : "Explore fault assessment"}<ArrowRight size={16} /></span></>;
  return (
    <div ref={ref} className="service-demo" data-service={slug} data-phase={phase}>
      <div className="sd-heading">
        <div>
          {!isHomepageDemo && <span className="sd-eyebrow">{config.eyebrow ?? "IN MOTION / PRODUCT CONCEPT"}</span>}
          <h3>{config.title}</h3>
        </div>
        <button
          type="button"
          className="sd-replay"
          aria-label={`Restart ${config.title} preview`}
          disabled={reduced}
          onClick={() => setPhase(0)}
        >
          <Play size={13} />
          <span>Replay</span>
        </button>
      </div>
      {linkedRepair ? <Link className="sd-scene-link" to="/$category/repairs/$slug" params={{ category: repairCategoryPath(linkedRepair.category), slug: linkedRepair.slug }} aria-label={`Explore ${linkedRepair.name}`}>{linkedVisual}</Link>
        : href === "https://app.numunix.com" ? <a className="sd-scene-link" href="https://app.numunix.com">{linkedVisual}</a>
        : href ? <Link className="sd-scene-link" to={isWarranty ? "/repair-aftercare" : "/repair-assessment"}>{linkedVisual}</Link> : visual}
      <span className="sr-only">
        {config.steps.join(" → ")}. {config.captions[3]} This preview is illustrative.
      </span>
    </div>
  );
}
