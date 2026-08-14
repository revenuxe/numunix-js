import { PhoneCall } from "lucide-react";

import { CONTACT } from "@/lib/contact";

export function FloatingCallWidget() {
  return (
    <a
      href={CONTACT.telUrl}
      aria-label={`Call Numunix at ${CONTACT.phoneDisplay}`}
      className="fixed bottom-5 right-5 z-40 flex items-center gap-3 rounded-full border border-emerald-200 bg-white py-2 pl-2 pr-4 shadow-card transition hover:-translate-y-1 hover:border-emerald-400 hover:shadow-lg"
    >
      <span className="grid h-11 w-11 place-items-center rounded-full bg-brand text-brand-foreground shadow-brand">
        <PhoneCall className="h-5 w-5" />
      </span>
      <span className="pr-1">
        <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-700">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" /> Available
        </span>
        <span className="mt-0.5 block text-sm font-bold text-ink">Call now</span>
      </span>
    </a>
  );
}
