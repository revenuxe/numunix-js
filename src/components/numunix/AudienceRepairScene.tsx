import { Wrench } from "lucide-react";
import { DeviceVisual } from "./RepairVisual";
import { REPAIR_SERVICES, type RepairCategory } from "@/content/homepage-repairs";

const SETTINGS = ["Home service visit", "Workspace maintenance", "Shop service check", "Classroom equipment care", "Guest-room service", "Reception equipment care", "Warehouse service visit", "Community maintenance"];

export default function AudienceRepairScene({ category, index, service }: { category: RepairCategory; index: number; service: number }) {
  const item = REPAIR_SERVICES[category][service];
  if (!item) return null;
  return <div className="audience-repair-scene">
    <div className="repair-visual-top"><span><Wrench size={14} /> {SETTINGS[index]}</span><span className="repair-status">{category.toUpperCase()}</span></div>
    <div className={`audience-room audience-room-${index}`}>
      <svg viewBox="0 0 480 300" aria-hidden="true" className="audience-room-backdrop">
        <path d="M20 252h440M44 30v222m392-222v222" className="audience-room-line" />
        {index === 0 ? <>
          <rect x="65" y="46" width="105" height="90" rx="3" className="audience-room-window" /><path d="M118 46v90m-53-45h105" className="audience-room-line" />
          <rect x="68" y="180" width="118" height="58" rx="10" className="audience-room-furniture" /><path d="M56 238v-36q0-13 15-13m115 49v-36q0-13-14-13M72 238v14m102-14v14" className="audience-room-line" />
          <path d="M395 206v-65m0 24q-27-20-22-39 25 3 22 39m0-8q23-21 23-38-26 6-23 38" className="audience-room-line" /><path d="M379 206h32l-5 34h-22Z" className="audience-room-furniture" />
        </> : index === 1 ? <>
          <rect x="72" y="50" width="114" height="70" rx="4" className="audience-room-window" /><path d="M80 70h95m-95 15h65m-65 15h82" className="audience-room-line" />
          <path d="M65 196h338M87 196v56m292-56v56" className="audience-room-line" /><rect x="105" y="211" width="44" height="18" rx="6" className="audience-room-furniture" /><path d="M126 229v23" className="audience-room-line" />
        </> : index === 2 ? <>
          <path d="M58 83h156M58 133h156M58 183h156M65 68v153m142-153v153" className="audience-room-line" />
          {[0, 1, 2].map(i => <g key={i}><rect x={77+i*39} y="99" width="25" height="31" rx="3" className="audience-room-furniture" /><rect x={77+i*39} y="151" width="25" height="30" rx="3" className="audience-room-furniture" /></g>)}
          <rect x="256" y="195" width="144" height="57" rx="4" className="audience-room-furniture" /><path d="M271 210h110" className="audience-room-line" />
        </> : index === 3 ? <>
          <rect x="66" y="46" width="160" height="94" rx="4" className="audience-room-window" /><path d="M85 70h117M85 88h86m-86 18h102" className="audience-room-line" />
          {[0, 1, 2].map(i => <g key={i}><path d={`M${66+i*107} 206h85m-73 0v46m62-46v46`} className="audience-room-line" /><rect x={83+i*107} y="225" width="46" height="12" rx="4" className="audience-room-furniture" /></g>)}
        </> : index === 4 ? <>
          <rect x="61" y="193" width="166" height="47" rx="5" className="audience-room-furniture" /><path d="M61 193v-54h14v54m-8 47v12m151-12v12" className="audience-room-line" /><rect x="83" y="175" width="44" height="19" rx="6" className="audience-room-window" />
          <rect x="358" y="207" width="43" height="33" rx="3" className="audience-room-furniture" /><path d="M380 207v-49m-18 0h36l-8-26h-20Z" className="audience-room-line" />
        </> : index === 5 ? <>
          <rect x="61" y="59" width="111" height="67" rx="4" className="audience-room-window" /><path d="M82 78h69m-69 16h45m-45 15h59" className="audience-room-line" />
          <rect x="83" y="196" width="290" height="56" rx="4" className="audience-room-furniture" /><path d="M103 215h248" className="audience-room-line" />
          <rect x="61" y="160" width="39" height="17" rx="5" className="audience-room-window" /><path d="M66 177v26m29-26v26" className="audience-room-line" />
        </> : index === 6 ? <>
          <path d="M63 56v196m141-196v196M63 107h141M63 172h141" className="audience-room-line" />
          {[0, 1, 2, 3].map(i => <rect key={i} x={78+(i%2)*64} y={i<2 ? 73 : 136} width="47" height="31" rx="2" className="audience-room-furniture" />)}
          <path d="M270 211h141m-130 0v41m119-41v41" className="audience-room-line" />
        </> : <>
          {[0, 1, 2].map(i => <g key={i}><rect x={60+i*58} y="54" width="42" height="133" rx="2" className="audience-room-furniture" />{[0,1,2].map(j => <rect key={j} x={68+i*58} y={65+j*36} width="25" height="23" rx="2" className="audience-room-window" />)}</g>)}
          <path d="M259 147h144v105M271 157v95m16-95v95m16-95v95m16-95v95m16-95v95m16-95v95m16-95v95m16-95v95" className="audience-room-line" />
        </>}
      </svg>
      <div className="audience-room-device"><DeviceVisual kind={item.kind} /></div>
    </div>
    <div className="audience-service-summary"><span>{item.name}</span><span>Inspection · Repair · Function check</span></div>
  </div>;
}