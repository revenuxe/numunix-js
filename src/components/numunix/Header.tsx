"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, Grip, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CONTACT } from "@/content/site";
import { cn } from "@/lib/utils";
import { BrandLogo } from "./BrandLogo";
import { CategoryToggle, useCategory } from "./category";

const NAV: [string, string][] = [
  ["REPAIR SERVICES", "/services"],
  ["FAULT ASSESSMENT", "/repair-assessment"],
  ["REPAIR PROCESS", "/repair-process"],
  ["REPAIR GUIDES", "/repair-guides"],
  ["CONTACT", "/contact"],
];

export function Header() {
  const categoryContext = useCategory();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const pathname = usePathname();
  const isHomepage = pathname === "/" || pathname === "/appliances";
  const headerAction = isHomepage && categoryContext ? <CategoryToggle /> : <Button asChild size="sm" className="h-8 gap-2 px-3 font-mono text-[10px] tracking-normal shadow-none sm:h-9"><a href={CONTACT.phoneHref}><Phone className="size-3.5" />CALL NOW</a></Button>;

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
          "border-b bg-ink-900",
          scrolled ? "border-primary-foreground/15" : "border-primary-foreground/5",
        )}
      >
        <div className="shell grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 py-4 lg:flex lg:justify-between">
          <BrandLogo variant="header" className="w-[112px] min-[375px]:w-[140px] sm:w-[180px]" />

          <div className="hidden items-center gap-3 lg:flex">
            <nav
              className={cn(
                "flex items-center gap-1 rounded-lg border border-primary-foreground/15 bg-ink-800 px-3 py-2",
              )}
            >
              {NAV.map(([n, href]) => (
                <a
                  key={n}
                  href={href}
                  className="label-mono rounded-md px-3.5 py-2 text-primary-foreground/90 transition-colors hover:bg-primary-foreground/10 hover:text-primary-foreground"
                >
                  {n}
                </a>
              ))}
              <span className="mx-1 h-5 w-px bg-white/10" />
              <span className="grid h-8 w-8 place-items-center rounded-lg text-white/60 transition-colors hover:bg-white/6 hover:text-white">
                <Grip size={15} />
              </span>
            </nav>

            {headerAction}
          </div>

          <div className="flex shrink-0 items-center gap-2 lg:hidden">
            {headerAction}
            <Button
              aria-label="Menu"
              aria-expanded={open}
              aria-controls="mobile-navigation"
              onClick={() => setOpen((v) => !v)}
              variant="ghost"
              size="icon"
              className="h-10 w-10 shrink-0 rounded-lg border border-primary-foreground/20 bg-ink-800 text-primary-foreground hover:bg-primary hover:text-primary-foreground"
            >
              {open ? <X size={17} /> : <Menu size={17} />}
            </Button>
          </div>
        </div>
      </div>

      {open && (
        <div id="mobile-navigation" className="lg:hidden">
          <div className="mx-6 rounded-lg border border-primary-foreground/20 bg-ink-800 p-4">
            {NAV.map(([n, href]) => (
              <a
                key={n}
                href={href}
                onClick={() => setOpen(false)}
                className="label-mono block border-b border-primary-foreground/10 py-4 text-primary-foreground/90 last:border-0"
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
