import { cn } from "@/lib/utils";

export function BrandLogo({ className, variant = "full" }: { className?: string; variant?: "full" | "header" }) {
  return (
    <a
      href="/"
      aria-label="Numunix home"
      className={cn("inline-flex shrink-0 items-center", className)}
    >
      <img
        src={variant === "header" ? "/numunix-logo-header.webp" : "/numunix-logo.webp"}
        alt="Numunix"
        width={variant === "header" ? 1680 : 2000}
        height={variant === "header" ? 208 : 325}
        className="block h-auto w-full"
      />
    </a>
  );
}
