import Link from "next/link";
import Image, { type StaticImageData } from "next/image";
import { ArrowRight } from "lucide-react";
import svcLaptop from "@/assets/service-laptop.webp";
import svcDesktop from "@/assets/service-desktop.webp";
import svcCctv from "@/assets/service-cctv.webp";
import svcBusiness from "@/assets/service-business.webp";

function ShowcaseCard({
  title,
  desc,
  image,
  cta,
  badge,
  href,
}: {
  title: string;
  desc: string;
  image: StaticImageData;
  cta?: string;
  badge?: string;
  href: string;
}) {
  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-3xl bg-white ring-1 ring-border shadow-soft transition hover:-translate-y-1 hover:shadow-card">
      <div className="relative overflow-hidden">
        <Image
          src={image}
          alt={title}
          className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-105"
        />
        {badge && (
          <div className="absolute bottom-3 right-3 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-ink shadow-soft">
            {badge}
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-xl font-bold text-ink md:text-2xl">{title}</h3>
        <p className="mt-3 text-sm text-muted-foreground">{desc}</p>
        <Link
          href={href}
          className="mt-auto inline-flex w-fit items-center gap-2 pt-6 text-sm font-semibold text-ink transition group-hover:text-brand"
        >
          {cta ?? "Learn more"} <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}

export function Showcase() {
  return (
    <section id="showcase" className="bg-white px-4 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-4xl font-extrabold tracking-tight text-ink sm:text-5xl md:text-6xl">
          We Service All <br />
          <span className="text-brand">IT Environments</span>
        </h2>
        <p className="mt-5 text-muted-foreground">
          Quick, professional and reliable — for households, small offices and growing businesses
          across the region.
        </p>
      </div>

      <div className="mx-auto mt-14 grid max-w-6xl gap-6 md:grid-cols-2">
        <ShowcaseCard
          title="Laptop Repair"
          desc="Schedule your laptop repair with certified engineers and genuine parts."
          image={svcLaptop}
          href="/services/laptop-repair"
        />
        <ShowcaseCard
          title="Desktop Repair"
          desc="Expert desktop repair to restore full performance and stability."
          image={svcDesktop}
          href="/services/desktop-repair"
          badge="240+ engineers"
        />
        <ShowcaseCard
          title="CCTV Installation"
          desc="Fast, reliable CCTV installation and remote-access setup, anytime."
          image={svcCctv}
          href="/services/cctv-installation"
          cta="View All Services"
        />
        <ShowcaseCard
          title="Business IT Support"
          desc="Expert commercial IT support for offices, retail and workspaces."
          image={svcBusiness}
          href="/services/business-amc"
        />
      </div>
    </section>
  );
}
