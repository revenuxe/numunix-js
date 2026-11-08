"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";

const links = [
  ["overview", "Overview"],
  ["capabilities", "What we build"],
  ["workflow", "The workflow"],
  ["delivery", "Delivery approach"],
  ["faq", "FAQs"],
] as const;

export default function IndustrySectionNav() {
  const scroller = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState({ left: false, right: false });

  useEffect(() => {
    const element = scroller.current;
    if (!element) return;
    const update = () =>
      setEdges({
        left: element.scrollLeft > 2,
        right: element.scrollLeft + element.clientWidth < element.scrollWidth - 2,
      });
    update();
    element.addEventListener("scroll", update, { passive: true });
    const observer = new ResizeObserver(update);
    observer.observe(element);
    const content = element.firstElementChild;
    if (content) observer.observe(content);
    return () => {
      element.removeEventListener("scroll", update);
      observer.disconnect();
    };
  }, []);

  function scroll(direction: number) {
    const element = scroller.current;
    if (!element) return;
    element.scrollBy({
      left: direction * element.clientWidth * 0.7,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
  }

  return (
    <nav aria-label="On this page" className="border-y border-[#dfe7f1] bg-white">
      <div className="shell relative">
        <div
          ref={scroller}
          id="industry-section-links"
          className="overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          <div className="flex min-w-full w-max items-center gap-7 px-12 py-5 text-xs whitespace-nowrap text-[#5d76a3] sm:gap-10 lg:px-0">
            {links.map(([id, label]) => (
              <a
                key={id}
                href={`#${id}`}
                className="shrink-0 rounded-sm py-1 transition-colors hover:text-[#1e4ed8] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2459e0]"
              >
                {label}
              </a>
            ))}
            <a
              href="#enquiry"
              className="ml-auto flex shrink-0 items-center gap-2 rounded-sm py-1 text-[#1e4ed8] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2459e0]"
            >
              Start a conversation <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
        {edges.left && (
          <div className="pointer-events-none absolute inset-y-0 left-6 flex w-14 items-center bg-gradient-to-r from-white via-white to-transparent lg:left-12">
            <button
              type="button"
              onClick={() => scroll(-1)}
              aria-label="Scroll section links left"
              aria-controls="industry-section-links"
              className="pointer-events-auto grid h-10 w-10 place-items-center rounded-full border border-[#dce5f1] bg-white text-[#2459e0] shadow-sm transition-colors hover:border-[#2459e0] hover:bg-[#eef3fb] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2459e0]"
            >
              <ChevronLeft size={18} aria-hidden="true" />
            </button>
          </div>
        )}
        {edges.right && (
          <div className="pointer-events-none absolute inset-y-0 right-6 flex w-14 items-center justify-end bg-gradient-to-l from-white via-white to-transparent lg:right-12">
            <button
              type="button"
              onClick={() => scroll(1)}
              aria-label="Scroll section links right"
              aria-controls="industry-section-links"
              className="pointer-events-auto grid h-10 w-10 place-items-center rounded-full border border-[#dce5f1] bg-white text-[#2459e0] shadow-sm transition-colors hover:border-[#2459e0] hover:bg-[#eef3fb] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2459e0]"
            >
              <ChevronRight size={18} aria-hidden="true" />
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
