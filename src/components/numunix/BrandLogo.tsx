"use client";
import { cn } from "@/lib/utils";
import { useCategorySelection } from "./category";
import { selectedHomepage } from "@/content/category-selection";
import Link from "next/link";
import Image from "next/image";

export function BrandLogo({
  className,
  variant = "full",
}: {
  className?: string;
  variant?: "full" | "header";
}) {
  const selection = useCategorySelection();
  return (
    <Link
      href={selectedHomepage(selection?.category ?? "electronics")}
      aria-label="Numunix home"
      className={cn("inline-flex shrink-0 items-center", className)}
    >
      <Image
        src={variant === "header" ? "/numunix-logo-header.webp" : "/numunix-logo.webp"}
        alt="Numunix"
        width={variant === "header" ? 1571 : 1728}
        height={variant === "header" ? 285 : 345}
        loading={variant === "header" ? "eager" : "lazy"}
        sizes={variant === "header" ? "180px" : "200px"}
        decoding="async"
        className="block h-auto w-full"
      />
    </Link>
  );
}
