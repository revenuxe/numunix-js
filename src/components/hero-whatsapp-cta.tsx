import { WhatsAppIcon } from "@/components/whatsapp-icon";

export function HeroWhatsAppCta({ href }: { href: string }) {
  return (
    <div className="w-full">
      <div className="flex items-center gap-3 text-xs font-medium text-white/60 before:h-px before:flex-1 before:bg-white/20 after:h-px after:flex-1 after:bg-white/20">
        OR
      </div>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#00c47a] px-5 py-4 text-sm font-bold text-white shadow-soft transition hover:brightness-105"
      >
        <WhatsAppIcon className="h-5 w-5" /> Book instantly on WhatsApp
      </a>
    </div>
  );
}
