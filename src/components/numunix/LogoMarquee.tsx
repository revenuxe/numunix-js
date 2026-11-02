import { useCategory } from "./category";
import { REPAIR_SERVICES } from "@/content/homepage-repairs";

export function LogoMarquee() {
  const ctx = useCategory();
  const services = REPAIR_SERVICES[ctx?.category ?? "electronics"];
  const row = [...services, ...services];
  return (
    <section className="relative overflow-hidden border-t border-white/10 bg-[#05070c] py-12">
      <div className="shell">
        <div className="label-mono text-[#8fb4e8]">WHAT WE REPAIR</div>
      </div>
      <div className="relative mt-10 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
        <div
          className="flex w-max items-center gap-20 whitespace-nowrap"
          style={{ animation: "marquee 48s linear infinite" }}
        >
          {row.map((n, i) => (
            <span
              key={`${n}-${i}`}
              className="text-[clamp(1.2rem,2vw,1.8rem)] font-medium tracking-[-0.02em] text-white/30"
            >
              {n}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

export default LogoMarquee;
