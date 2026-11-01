import { useEffect, useRef, useState } from "react";
import { useLocation } from "@tanstack/react-router";
import { Menu, X, Grip } from "lucide-react";
import { cn } from "@/lib/utils";
import { BrandLogo } from "./BrandLogo";
import { CategoryToggle } from "./category";

const NAV: [string, string][] = [
  ["SERVICES", "/features"],
  ["PRODUCTS", "/#products"],
  ["PROCESS", "/process"],
  ["TECHNOLOGY", "/technology"],
  ["CONTACT", "/contact"],
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const pathname = useLocation({ select: (location) => location.pathname });

  useEffect(() => {
    setOpen(false);
    setHidden(false);
  }, [pathname]);

  useEffect(() => {
    let lastY = Math.max(0, window.scrollY);
    let travel = 0;
    let direction = 0;
    let frame = 0;
    let heroBottom = window.innerHeight;
    const hero = document.querySelector("main section");
    const measure = () => {
      heroBottom = hero
        ? hero.getBoundingClientRect().bottom + window.scrollY
        : window.innerHeight;
    };
    const update = () => {
      frame = 0;
      // Clamp overscroll so mobile bounce cannot reverse the header unexpectedly.
      const maxY = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
      const y = Math.min(maxY, Math.max(0, window.scrollY));
      const delta = y - lastY;
      lastY = y;
      setScrolled(y > 24);
      if (y < heroBottom || open || headerRef.current?.contains(document.activeElement)) {
        setHidden(false);
        travel = 0;
        direction = 0;
        return;
      }
      if (delta === 0) return;
      const nextDirection = Math.sign(delta);
      travel = nextDirection === direction ? travel + Math.abs(delta) : Math.abs(delta);
      direction = nextDirection;
      // Require deliberate movement, with a quicker reveal than hide.
      if (travel >= (direction > 0 ? 24 : 12)) {
        setHidden(direction > 0);
        travel = 0;
      }
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    const onResize = () => {
      measure();
      onScroll();
    };
    measure();
    update();
    const observer = new ResizeObserver(onResize);
    if (hero) observer.observe(hero);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      observer.disconnect();
      window.cancelAnimationFrame(frame);
    };
  }, [open, pathname]);

  return (
    <header
      ref={headerRef}
      onFocusCapture={() => setHidden(false)}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
        hidden && !open ? "-translate-y-full pointer-events-none" : "translate-y-0",
      )}
    >
      <div
        className={cn(
          "transition-colors duration-300",
          scrolled ? "bg-[#05070c]" : "bg-transparent",
        )}
      >
        <div className="shell flex items-center justify-between py-4">
          <BrandLogo variant="header" className="w-[112px] min-[375px]:w-[140px] sm:w-[180px]" />

          <div className="hidden items-center gap-3 lg:flex">
            <nav
              className={cn(
                "flex items-center gap-1 rounded-2xl border border-white/8 px-3 py-2 transition-all duration-300",
                scrolled ? "bg-[#07111f]/85" : "bg-[#07111f]/55",
              )}
              style={{ backdropFilter: "blur(18px) saturate(140%)" }}
            >
              {NAV.map(([n, href]) => (
                <a
                  key={n}
                  href={href}
                  className="label-mono rounded-xl px-3.5 py-2 text-white/75 transition-colors hover:bg-white/6 hover:text-white"
                >
                  {n}
                </a>
              ))}
              <span className="mx-1 h-5 w-px bg-white/10" />
              <span className="grid h-8 w-8 place-items-center rounded-lg text-white/60 transition-colors hover:bg-white/6 hover:text-white">
                <Grip size={15} />
              </span>
            </nav>

            <CategoryToggle />
            <a
              href="/contact"
              className="label-mono rounded-xl bg-[#1e4ed8] px-5 py-3 text-white transition-all hover:-translate-y-0.5 hover:bg-[#2563eb] hover:shadow-[0_12px_34px_-12px_rgba(59,130,246,0.9)]"
            >
              START PROJECT
            </a>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <a
              href="/contact"
              className="label-mono rounded-lg bg-[#1e4ed8] px-3.5 py-2.5 text-white"
            >
              START PROJECT
            </a>
            <button
              aria-label="Menu"
              aria-expanded={open}
              aria-controls="mobile-navigation"
              onClick={() => setOpen((v) => !v)}
              className="grid h-10 w-10 place-items-center rounded-lg border border-white/10 bg-white/5 text-white"
            >
              {open ? <X size={17} /> : <Menu size={17} />}
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div id="mobile-navigation" className="lg:hidden">
          <div className="mx-6 rounded-2xl border border-white/10 bg-[#07111f]/95 p-4 backdrop-blur-xl">
            <div className="border-b border-white/6 pb-4">
              <CategoryToggle className="w-full justify-center" />
            </div>
            {NAV.map(([n, href]) => (
              <a
                key={n}
                href={href}
                onClick={() => setOpen(false)}
                className="label-mono block border-b border-white/6 py-4 text-white/80 last:border-0"
              >
                {n}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
