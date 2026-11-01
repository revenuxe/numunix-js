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
        <path d="m156 54 24 30-20 22 33 18-15 26" className="repair-fault" />
        <path d="m156 101 17 17 34-36" className="repair-check" />
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
        <path d="m133 117-30 52h-43m43 0v28" className="repair-outline" /><path d="m96 64 128-15 47 54-120 30Z" className="repair-shell" /><ellipse cx="244" cy="87" rx="23" ry="31" transform="rotate(-35 244 87)" className="repair-screen" /><circle cx="243" cy="87" r="12" className="repair-outline" /><path d="m284 96 32 28m-38-13 24 36" className="repair-outline repair-air" />
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
  return <div className="repair-visual">
    <div className="repair-visual-top"><span><Wrench size={14} /> {item.name} · diagnostic bench</span><span className="repair-status">{phase >= 3 ? "TESTED" : "ASSESSING"}</span></div>
    <DeviceVisual kind={item.kind} repaired={phase >= 2} />
    <div className="repair-checks">{item.checks.map((check, i) => <div key={check}><span>{check}</span><span>{phase > i ? <Check size={14} /> : "—"}</span></div>)}</div>
  </div>;
}