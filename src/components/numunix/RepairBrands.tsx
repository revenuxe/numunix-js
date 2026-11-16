import { ACBrands } from "./ACBrands";
import { CCTVBrands } from "./CCTVBrands";
import { LaptopBrands } from "./LaptopBrands";
import { MobileBrands } from "./MobileBrands";
import { PurifierBrands } from "./PurifierBrands";
import { RefrigeratorBrands } from "./RefrigeratorBrands";
import { WashingMachineBrands } from "./WashingMachineBrands";

/** Reuse the curated brand destinations for the page's repair service. */
export function RepairBrands({ serviceSlug }: { serviceSlug: string }) {
  switch (serviceSlug) {
    case "ac-repair": return <ACBrands />;
    case "cctv-service": return <CCTVBrands />;
    case "laptop-repair": return <LaptopBrands />;
    case "mobile-repair": return <MobileBrands />;
    case "water-purifier-service": return <PurifierBrands />;
    case "refrigerator-repair": return <RefrigeratorBrands />;
    case "washing-machine-repair": return <WashingMachineBrands />;
    default: return null;
  }
}
