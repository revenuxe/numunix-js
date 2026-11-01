import { Check, Wrench } from "lucide-react";
import { REPAIR_SERVICES, type DeviceKind, type RepairCategory } from "@/content/homepage-repairs";

export function DeviceVisual({ kind, repaired = true }: { kind: DeviceKind; repaired?: boolean }) {
  const screen = ["phone", "tablet", "laptop", "tv", "console"].includes(kind);
  return (
    <svg viewBox="0 0 360 230" role="img" aria-label={`${kind} repair illustration`} className={`repair-device ${repaired ? "is-repaired" : ""}`}>
      <ellipse cx="180" cy="207" rx="100" ry="7" className="repair-ground" />
      {screen ? <>
        <rect x={kind === "phone" ? 133 : 74} y="24" width={kind === "phone" ? 94 : 212} height="155" rx={kind === "phone" || kind === "tablet" ? 14 : 5} className="repair-shell" />
        <rect x={kind === "phone" ? 141 : 83} y="35" width={kind === "phone" ? 78 : 194} height="130" rx="4" className="repair-screen" />
        {kind === "phone" || kind === "tablet" ? <>
          <rect x={kind === "phone" ? 150 : 101} y="48" width={kind === "phone" ? 60 : 158} height="38" rx="5" className="repair-screen-panel" />
          <path d={kind === "phone" ? "M151 101h38m-38 10h52" : "M102 101h89m-89 11h148"} className="repair-interface-line" />
          {[0, 1, 2].map(i => <rect key={i} x={(kind === "phone" ? 151 : 103) + i * (kind === "phone" ? 19 : 52)} y="133" width={kind === "phone" ? 13 : 40} height="17" rx="3" className="repair-screen-panel" />)}
        </> : <>
          <rect x="96" y="48" width="168" height="10" rx="3" className="repair-screen-panel" />
          <rect x="96" y="69" width="42" height="80" rx="3" className="repair-screen-panel" />
          <path d="M152 79h94m-94 13h61m-61 13h83" className="repair-interface-line" />
          <path d="M153 143v-18m18 18v-29m18 29v-21m18 21v-36m18 36v-27m18 27v-42" className="repair-interface-line" />
        </>}
        {kind === "laptop" ? <path d="M74 179H286L314 198H46Z" className="repair-shell" /> : kind === "tv" ? <path d="M170 179v18h-40m40 0h60m-40-18v18" className="repair-outline" /> : <circle cx="180" cy="173" r="2" className="repair-detail" />}
      </> : kind === "washer" ? <>
        <rect x="108" y="24" width="144" height="178" rx="8" className="repair-shell" />
        <path d="M108 62h144" className="repair-outline" /><rect x="122" y="37" width="48" height="11" rx="2" className="repair-screen" /><circle cx="230" cy="44" r="7" className="repair-outline" />
        <circle cx="180" cy="127" r="49" className="repair-outline" /><circle cx="180" cy="127" r="38" className="repair-screen" />
        <g className="repair-drum"><path d="M151 134q29-25 58 0M159 109q22 31 42 0M167 154q13-17 27 0" className="repair-outline" /></g>
      </> : kind === "ac" ? <>
        <rect x="47" y="47" width="266" height="84" rx="12" className="repair-shell" /><path d="M60 99h240M74 110h212" className="repair-outline" /><circle cx="283" cy="66" r="3" className="repair-detail" />
        <g className="repair-air"><path d="M115 140q-15 25 0 50m65-50q-15 25 0 50m65-50q-15 25 0 50" className="repair-outline" /></g>
      </> : kind === "fridge" ? <>
        <rect x="120" y="16" width="120" height="186" rx="8" className="repair-shell" /><path d="M120 80h120M222 40v22m0 39v40" className="repair-outline" /><path d="m170 108 20 40m-20 0 20-40m-29 20h38" className="repair-outline repair-air" />
      </> : kind === "microwave" ? <>
        <rect x="63" y="66" width="234" height="126" rx="8" className="repair-shell" /><rect x="77" y="79" width="156" height="95" rx="4" className="repair-screen" /><circle cx="264" cy="132" r="13" className="repair-outline" /><path d="M249 91h29M112 153h82m-65-15q-8-12 0-24m28 24q-8-12 0-24" className="repair-outline" />
      </> : kind === "cctv" ? <>
        <rect x="61" y="106" width="12" height="69" rx="3" className="repair-shell" />
        <path d="M73 140h35l35-37" className="repair-camera-mount" />
        <circle cx="141" cy="103" r="8" className="repair-shell" />
        <g transform="rotate(12 190 83)">
          <rect x="104" y="52" width="155" height="62" rx="12" className="repair-shell" />
          <path d="M99 49h157q13 0 15 13H102Z" className="repair-screen" />
          <ellipse cx="255" cy="83" rx="18" ry="31" className="repair-screen" />
          <ellipse cx="255" cy="83" rx="10" ry="17" className="repair-camera-lens" />
          <ellipse cx="255" cy="83" rx="4" ry="7" className="repair-detail" />
          <path d="M115 100h95" className="repair-interface-line" />
          {[0, 1, 2].map(i => <circle key={i} cx="255" cy={61 + i * 22} r="1.7" className="repair-detail" />)}
        </g>
        <path d="M66 175v20m209-66 34 14m-37-33 41-1" className="repair-interface-line" />
      </> : <>
        <rect x="103" y="39" width="154" height="158" rx="10" className="repair-shell" /><rect x="120" y="57" width="120" height="31" rx="4" className="repair-screen" />
        {kind === "drive" ? <><circle cx="180" cy="136" r="36" className="repair-outline" /><circle cx="180" cy="136" r="9" className="repair-outline" /><path d="m180 136 50-27" className="repair-outline" /></> : kind === "purifier" ? <><path d="M145 104v44m35-44v44m35-44v44M169 166h22v12h-8" className="repair-outline" /><path d="M183 188q-9 13 0 13t0-13" className="repair-screen" /></> : <><path d="m189 105-26 37h22l-9 34 29-44h-24Z" className="repair-screen" /><path d="M129 185v12m102-12v12" className="repair-outline" /></>}
      </>}
      <path d="M68 199h224" className="repair-outline repair-bench" />
    </svg>
  );
}

export default function RepairVisual({ category, service = 0, phase = 3 }: { category: RepairCategory; service?: number; phase?: number }) {
  const item = REPAIR_SERVICES[category][service] ?? REPAIR_SERVICES[category][0];
  if (!item) return null;
  return <div className="repair-visual">
    <div className="repair-visual-top"><span><Wrench size={14} /> {item.name} · diagnostic bench</span><span className="repair-status">{phase >= 3 ? "TESTED" : "ASSESSING"}</span></div>
    <DeviceVisual kind={item.kind} repaired={phase >= 2} />
    <div className="repair-checks">{item.checks.map((check, i) => <div key={check}><span>{check}</span><span>{phase > i ? <Check size={14} /> : "—"}</span></div>)}</div>
  </div>;
}