import type { ReactNode } from "react";
import {
  ArrowUpRight,
  Check,
  ChevronRight,
  CreditCard,
  Package,
  Play,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { industryScenes } from "@/content/industry-scenes";
import "./IndustryScene.css";

function Tile({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`is-tile ${className}`}>{children}</div>;
}
function Row({ title, detail, status }: { title: string; detail: string; status: string }) {
  return (
    <div className="is-row">
      <div>
        <strong>{title}</strong>
        <small>{detail}</small>
      </div>
      <span className="is-status">{status}</span>
    </div>
  );
}

function Scene({ index }: { index: number }) {
  switch (index) {
    case 0:
      return (
        <>
          <Tile className="is-bank-card">
            <div className="is-between">
              <span>Business account</span>
              <CreditCard size={22} />
            </div>
            <small>Available balance</small>
            <strong className="is-balance">
              ₹ 24,80,000<span>.00</span>
            </strong>
            <div className="is-between">
              <span>•••• 2048</span>
              <span>INR ↗</span>
            </div>
          </Tile>
          <Tile>
            <div className="is-between">
              <strong>Payment activity</strong>
              <span className="is-live">Live</span>
            </div>
            <div className="is-bars">
              {[35, 52, 42, 70, 54, 84, 66, 96, 74, 88, 65, 100].map((height, i) => (
                <span key={i} style={{ height: `${height}%` }} />
              ))}
            </div>
            <Row title="Vendor payment" detail="Account ending 0832" status="Processed" />
          </Tile>
        </>
      );
    case 1:
      return (
        <>
          <Tile>
            <div className="is-between">
              <span className="is-kicker">CLAIM / CL-2048</span>
              <ShieldCheck size={22} color="#2459e0" />
            </div>
            <h4>Protection, in progress.</h4>
            <p>Motor insurance · Document review</p>
            <div className="is-steps">
              {["Submitted", "Verified", "Review", "Decision"].map((s, i) => (
                <div key={s} className={i < 3 ? "is-step-active" : ""}>
                  <span>{i < 2 ? <Check size={13} /> : i + 1}</span>
                  <small>{s}</small>
                </div>
              ))}
            </div>
          </Tile>
          <Tile>
            <Row title="Policy documents" detail="Identity & coverage" status="Verified" />
            <Row title="Damage assessment" detail="Assigned to reviewer" status="In review" />
            <div className="is-note">
              <ShieldCheck size={16} /> Fraud screening included in the workflow
            </div>
          </Tile>
        </>
      );
    case 2:
      return (
        <>
          <div className="is-map">
            <svg viewBox="0 0 500 240" fill="none">
              <path
                d="M-20 45 520 195M-20 180 520 40M100-20 230 260M350-20 300 260M-20 120 520 130"
                stroke="#fff"
                strokeWidth="16"
              />
              <path
                d="M95 180 175 125 295 128 390 65"
                stroke="#2459e0"
                strokeWidth="5"
                strokeDasharray="8 6"
              />
              <circle cx="95" cy="180" r="9" fill="#2459e0" />
              <circle cx="390" cy="65" r="9" fill="#0b1b38" />
            </svg>
            <div className="is-map-label">
              <span className="is-live">On route</span>
              <strong>EV-024</strong>
              <small>North depot → City hub</small>
            </div>
          </div>
          <div className="is-two">
            <Tile>
              <Zap size={20} color="#2459e0" />
              <strong className="is-metric">82%</strong>
              <small>Battery level</small>
              <div className="is-progress">
                <span style={{ width: "82%" }} />
              </div>
            </Tile>
            <Tile>
              <span className="is-kicker">NEXT STOP</span>
              <h4>City hub</h4>
              <small>Delivery & charging</small>
              <span className="is-status">Route assigned</span>
            </Tile>
          </div>
        </>
      );
    case 3:
      return (
        <>
          <div className="is-commerce">
            <div className="is-product">
              <div className="is-bottle" />
              <span>
                EVERYDAY
                <br />
                ESSENTIALS
              </span>
            </div>
            <Tile>
              <span className="is-kicker">ORDER #ORD-1024</span>
              <h4>
                Ready for its
                <br />
                next destination.
              </h4>
              <p>Storefront → OMS → Fulfilment</p>
              <div className="is-note">
                <Package size={17} /> Packed & ready
              </div>
            </Tile>
          </div>
          <Tile>
            <Row title="Everyday essentials" detail="2 items · Online storefront" status="Packed" />
            <Row title="Gift collection" detail="1 item · Marketplace" status="Confirmed" />
          </Tile>
        </>
      );
    case 4:
      return (
        <>
          <div className="is-lesson">
            <span className="is-kicker">YOUR NEXT CHAPTER</span>
            <h4>
              Build skills.
              <br />
              <span>Open possibilities.</span>
            </h4>
            <div className="is-play">
              <Play size={23} fill="currentColor" />
            </div>
            <small>Course preview · Product thinking</small>
          </div>
          <Tile>
            <div className="is-between">
              <strong>Your learning path</strong>
              <span className="is-status">In progress</span>
            </div>
            <Row title="01 / Foundations" detail="Concepts & guided practice" status="Complete" />
            <Row
              title="02 / Put it into practice"
              detail="Projects & skill assessment"
              status="Continue"
            />
            <div className="is-progress">
              <span style={{ width: "56%" }} />
            </div>
          </Tile>
        </>
      );
    case 5:
      return (
        <>
          <Tile className="is-console">
            <div className="is-between">
              <span>platform / workspaces</span>
              <span className="is-live">Connected</span>
            </div>
            <div className="is-code">
              <span>workspace.create({"{"}</span>
              <br />
              &nbsp; name: <em>"Your next product"</em>,<br />
              &nbsp; tenancy: <em>"isolated"</em>,<br />
              &nbsp; modules: [<em>"auth", "billing"</em>]<br />
              <span>{"}"})</span>
            </div>
            <div className="is-console-footer">
              <Check size={14} /> Workspace provisioned
            </div>
          </Tile>
          <div className="is-two">
            <Tile>
              <span className="is-avatar">A</span>
              <h4>Acme workspace</h4>
              <small>Independent roles & data</small>
              <span className="is-status">Active tenant</span>
            </Tile>
            <Tile>
              <span className="is-avatar is-avatar-purple">N</span>
              <h4>Nova workspace</h4>
              <small>Independent roles & data</small>
              <span className="is-status">Active tenant</span>
            </Tile>
          </div>
        </>
      );
    case 6:
      return (
        <>
          <div className="is-travel">
            <div className="is-sun" />
            <div className="is-mountain is-mountain-back" />
            <div className="is-mountain" />
            <div className="is-travel-copy">
              <span className="is-kicker">EXPLORE THE POSSIBILITIES</span>
              <h4>
                Your next journey
                <br />
                starts here.
              </h4>
              <span className="is-travel-pill">
                Discover stays <ArrowUpRight size={14} />
              </span>
            </div>
          </div>
          <Tile>
            <div className="is-itinerary">
              <div>
                <small>CHECK IN</small>
                <strong>12 Nov</strong>
              </div>
              <div className="is-route-line" />
              <div>
                <small>CHECK OUT</small>
                <strong>16 Nov</strong>
              </div>
              <span className="is-status">4 nights</span>
            </div>
            <Row
              title="Your itinerary"
              detail="Stay · Experiences · Transfers"
              status="Connected"
            />
          </Tile>
        </>
      );
    default:
      return (
        <>
          <Tile>
            <div className="is-between">
              <span className="is-kicker">CITIZEN SERVICE PORTAL</span>
              <ShieldCheck size={22} color="#2459e0" />
            </div>
            <h4>How can we help today?</h4>
            <div className="is-search">
              Find a public service <ChevronRight size={16} />
            </div>
            <div className="is-service-links">
              {["Applications", "Documents", "Tourism"].map((s) => (
                <span key={s}>
                  {s}
                  <ArrowUpRight size={14} />
                </span>
              ))}
            </div>
          </Tile>
          <Tile>
            <span className="is-kicker">APPLICATION / REQ-1082</span>
            <h4>Every step, visible.</h4>
            <div className="is-steps">
              {["Received", "Verification", "Review", "Issued"].map((s, i) => (
                <div key={s} className={i < 3 ? "is-step-active" : ""}>
                  <span>{i < 2 ? <Check size={13} /> : i + 1}</span>
                  <small>{s}</small>
                </div>
              ))}
            </div>
          </Tile>
        </>
      );
  }
}

export default function IndustryScene({ index }: { index: number }) {
  const scene = industryScenes[index]!;
  return (
    <div className={`industry-scene industry-scene-${index}`}>
      <div className="is-heading">
        <div>
          <span className="is-kicker">{scene.eyebrow}</span>
          <h4>{scene.title}</h4>
        </div>
        <span className="is-scene-number">0{index + 1}</span>
      </div>
      <div className="is-stage" aria-hidden="true">
        <div className="is-window">
          <div className="is-window-bar">
            <div className="is-dots">
              <i />
              <i />
              <i />
            </div>
            <span>{scene.app}</span>
            <span className="is-window-dot" />
          </div>
          <div className="is-window-body">
            <Scene index={index} />
          </div>
        </div>
      </div>
      <div className="is-footer">
        <div>
          {scene.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
        <small>Illustrative concept</small>
      </div>
    </div>
  );
}
