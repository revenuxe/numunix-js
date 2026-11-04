import type { CCTV_BRANDS } from "@/content/cctv-brands";

export function CCTVBrandLogo({ brand }: { brand: (typeof CCTV_BRANDS)[number] }) {
  return (
    <span className="relative flex h-full w-full items-center justify-center">
      <img
        src={`/brands/cctv/${brand.file}`}
        alt={`${brand.name} logo`}
        width={brand.width}
        height={brand.height}
        decoding="async"
        className={`h-full w-full object-contain${brand.monochromeLogo ? " brightness-0" : ""}`}
      />
      {brand.name === "Hi-Focus" && (
        <img
          src={`/brands/cctv/${brand.file}`}
          alt=""
          aria-hidden="true"
          width={brand.width}
          height={brand.height}
          decoding="async"
          className="absolute inset-0 h-full w-full object-contain brightness-0 [clip-path:inset(0_0_0_21%)]"
        />
      )}
    </span>
  );
}
