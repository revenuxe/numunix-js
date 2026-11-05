import type { PURIFIER_BRANDS } from "@/content/purifier-brands";

export function PurifierBrandLogo({ brand }: { brand: (typeof PURIFIER_BRANDS)[number] }) {
  return (
    <img
      src={`/brands/water-purifiers/${brand.file}`}
      alt={`${brand.name} logo`}
      loading="lazy"
      decoding="async"
      className={`h-full w-full object-contain${brand.file === "native.png" ? " invert" : ""}`}
    />
  );
}
