import Image from "next/image";
import { Laptop, Monitor, Camera, Network, Briefcase, Refrigerator } from "lucide-react";
import { SiteNav } from "@/components/site-nav";
import { HeroWhatsAppCta } from "@/components/hero-whatsapp-cta";
import { CONTACT } from "@/lib/contact";
import heroImg from "@/assets/hero-technician.webp";
import { BookingForm } from "./booking-form";

const FLOATING_CHIPS = [
  { label: "Laptop Repair", Icon: Laptop },
  { label: "Desktop Repair", Icon: Monitor },
  { label: "CCTV", Icon: Camera },
  { label: "Appliance Repair", Icon: Refrigerator },
  { label: "Networking", Icon: Network },
  { label: "AMC", Icon: Briefcase },
];

export function Hero() {
  return (
    <section className="relative flex min-h-[100svh] flex-col overflow-hidden bg-ink text-white">
      <Image
        src={heroImg}
        alt="Numunix engineer repairing a laptop"
        priority
        className="absolute inset-0 h-full w-full object-cover object-center opacity-70"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/40 lg:to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent" />

      <SiteNav variant="dark" />

      <div className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-4 pb-6 pt-28 md:px-8 md:pb-8 md:pt-32 lg:pb-10 lg:pt-32">
        <div className="grid gap-7 md:grid-cols-[minmax(0,1fr)_minmax(300px,380px)] md:items-center md:gap-8 lg:gap-12">
          <div>
            <div className="max-w-2xl">
              <h1 className="mt-6 text-[2rem] font-extrabold leading-[1.05] tracking-tight sm:text-6xl lg:mt-8 lg:text-6xl">
                Reliable IT Support <span className="text-[#0168fd]">&amp; Hardware Repair</span>
              </h1>
              <p className="mt-4 max-w-xl text-sm text-white/75 sm:mt-6 sm:text-lg">
                Laptop Repair, Appliance Repair, CCTV Installation, Networking, AMC and Business IT
                Support.
              </p>
            </div>

            <div className="mt-8 hidden max-w-2xl flex-wrap gap-2 lg:mt-10 lg:flex">
              {FLOATING_CHIPS.map(({ label, Icon }) => (
                <div
                  key={label}
                  className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full bg-white/10 px-3 py-2 text-xs font-medium text-white ring-1 ring-white/20 backdrop-blur-md lg:h-[52px] lg:px-4 lg:text-sm"
                >
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand text-brand-foreground lg:h-7 lg:w-7">
                    <Icon className="h-3.5 w-3.5" />
                  </span>
                  {label}
                </div>
              ))}
            </div>
          </div>

          <div id="hero-booking-form" className="w-full md:max-w-[380px] md:justify-self-end">
            <BookingForm />
            <div className="mt-4">
              <HeroWhatsAppCta href={CONTACT.whatsappUrl} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
