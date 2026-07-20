import Image from "next/image";
import logo from "@/assets/numunix-logo.webp";

export function LogoMark({ className = "h-9 w-auto" }: { className?: string }) {
  return (
    <Image
      src={logo}
      alt="Numunix — We Keep IT Running"
      className={`${className} object-contain`}
      priority
    />
  );
}
