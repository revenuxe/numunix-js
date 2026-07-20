import Image from "next/image";
import { ArrowRight } from "lucide-react";
import resSlow from "@/assets/res-slow-laptop.webp";
import resBsod from "@/assets/res-bsod.webp";
import resCctv from "@/assets/res-cctv.webp";

const CARDS = [
  {
    image: resSlow,
    title: "Laptop Running Slow",
    desc: "Simple fixes that can bring your laptop back to speed without spending on new hardware.",
  },
  {
    image: resBsod,
    title: "Blue Screen Fixes",
    desc: "How to diagnose and safely fix the most common Windows blue-screen errors at home.",
  },
  {
    image: resCctv,
    title: "Best CCTV Guide",
    desc: "Choosing the right CCTV — resolution, storage and coverage for homes and small offices.",
  },
];

export function Resources() {
  return (
    <section id="resources" className="bg-white px-4 py-24 md:px-8 md:py-32">
      <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2 md:items-end">
        <h2 className="text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
          Quick Help &<br />
          <span className="text-brand">Useful Resources</span>
        </h2>
        <p className="text-muted-foreground md:max-w-md md:justify-self-end">
          Use our helpful resources to maintain performance, extend lifespan and avoid unnecessary
          IT replacements.
        </p>
      </div>

      <div className="mx-auto mt-12 grid max-w-6xl gap-6 md:grid-cols-3">
        {CARDS.map((c) => (
          <article
            key={c.title}
            className="group relative overflow-hidden rounded-3xl ring-1 ring-border shadow-soft"
          >
            <Image
              src={c.image}
              alt={c.title}
              className="aspect-[4/5] w-full object-cover transition duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/90 via-ink/50 to-transparent p-6 text-white">
              <h3 className="text-lg font-bold md:text-xl">{c.title}</h3>
              <p className="mt-2 text-sm text-white/80">{c.desc}</p>
            </div>
          </article>
        ))}
      </div>
      <div className="mt-10 flex justify-center">
        <a
          href="#resources"
          className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white"
        >
          View All Resources <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </section>
  );
}
