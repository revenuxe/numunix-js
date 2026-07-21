import Image from "next/image";
import numunixIcon from "@/assets/numunix-icon.png";

export function PageLoader({ label, minHeight = "60vh" }: { label?: string; minHeight?: string }) {
  return (
    <div className="grid animate-in fade-in place-items-center duration-300" style={{ minHeight }}>
      <div className="flex flex-col items-center gap-4">
        <div className="relative grid h-16 w-16 place-items-center">
          <span className="absolute inset-0 animate-spin rounded-full border-2 border-brand/15 border-t-brand" />
          <Image src={numunixIcon} alt="" className="h-7 w-7 animate-pulse" priority />
        </div>
        {label && <p className="text-sm font-semibold text-muted-foreground">{label}</p>}
      </div>
    </div>
  );
}
