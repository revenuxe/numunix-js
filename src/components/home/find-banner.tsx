"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight, Phone } from "lucide-react";
import { CONTACT } from "@/lib/contact";
import { setSavedPincode } from "@/lib/session-quote";
import findBanner from "@/assets/find-banner.webp";

export function FindBanner() {
  const [postalCode, setPostalCode] = useState("");
  const [showEngineer, setShowEngineer] = useState(false);

  function findSupport(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setShowEngineer(Boolean(postalCode.trim()));
    if (postalCode.trim()) setSavedPincode(postalCode.trim());
  }

  return (
    <section id="book" className="bg-white px-4 pb-16 md:px-8">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem]">
        <Image
          src={findBanner}
          alt="Numunix data center"
          className={`${showEngineer ? "h-[590px] sm:h-[520px]" : "h-[420px] sm:h-[460px]"} w-full object-cover md:h-[500px]`}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-ink/50 to-ink/30" />
        <div className="absolute inset-0 flex items-center px-6 md:px-12 lg:px-16">
          <div className="w-full max-w-lg rounded-3xl bg-white/10 p-6 text-white sm:p-7 ring-1 ring-white/25 shadow-card backdrop-blur-xl md:p-10">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium ring-1 ring-white/20">
              <span className="h-1.5 w-1.5 rounded-full bg-brand" />
              Nearby Support
            </span>
            <h3 className="mt-4 text-2xl font-bold leading-tight md:text-3xl lg:text-4xl">
              Find Numunix Support <span className="text-brand">Near You</span>
            </h3>
            <p className="mt-3 text-sm text-white/80 md:text-base">
              Discover a Numunix engineer today for expert, reliable and friendly IT service.
            </p>
            <form
              onSubmit={findSupport}
              className="mt-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-2 sm:rounded-full sm:bg-white/10 sm:p-1.5 sm:ring-1 sm:ring-white/25"
            >
              <input
                type="text"
                value={postalCode}
                onChange={(event) => setPostalCode(event.target.value)}
                required
                maxLength={12}
                placeholder="Enter your PIN / ZIP"
                className="w-full rounded-full bg-white/10 px-5 py-3 text-sm text-white ring-1 ring-white/20 placeholder:text-white/60 focus:outline-none focus:ring-brand sm:bg-transparent sm:ring-0 sm:focus:ring-0"
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-ink transition hover:bg-white/90"
              >
                Find Now
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
            {showEngineer && (
              <div className="mt-3 rounded-2xl bg-white/15 p-4 text-center ring-1 ring-white/25">
                <p className="text-sm font-semibold">Support is available in your area</p>
                <p className="mt-1 text-sm font-bold text-brand-foreground">
                  {CONTACT.phoneDisplay}
                </p>
                <a
                  href={CONTACT.telUrl}
                  className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand px-4 py-3 text-sm font-semibold text-brand-foreground transition hover:brightness-110"
                >
                  <Phone className="h-4 w-4" />
                  Call Our Engineer
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
