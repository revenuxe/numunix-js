import { useEffect, useState } from "react";
import { Menu, X, Grip } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV: [string, string][] = [
  ["PRODUCT", "/features"],
  ["SOLUTIONS", "/features"],
  ["PRICING", "/#cta"],
  ["RESOURCES", "/features"],
  ["COMPANY", "/#cta"],
];

function Logo() {
  return (
    <a
      href="/"
      className="text-[1.15rem] font-medium tracking-[-0.02em] text-white"
    >
      NUMUNIX
    </a>
  );
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={cn(
          "transition-colors duration-300",
          scrolled ? "bg-[#05070c]/70 backdrop-blur-xl" : "bg-transparent",
        )}
      >
        <div className="shell flex items-center justify-between py-4">
          <Logo />

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

            <a
              href="#top"
              className="label-mono rounded-xl bg-[#dbe6f8] px-5 py-3 text-[#102a63] transition-all hover:-translate-y-0.5 hover:bg-white"
            >
              LOG IN
            </a>
            <a
              href="#cta"
              className="label-mono rounded-xl bg-[#1e4ed8] px-5 py-3 text-white transition-all hover:-translate-y-0.5 hover:bg-[#2563eb] hover:shadow-[0_12px_34px_-12px_rgba(59,130,246,0.9)]"
            >
              GET STARTED
            </a>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <a
              href="#cta"
              className="label-mono rounded-lg bg-[#1e4ed8] px-3.5 py-2.5 text-white"
            >
              GET STARTED
            </a>
            <button
              aria-label="Menu"
              onClick={() => setOpen((v) => !v)}
              className="grid h-10 w-10 place-items-center rounded-lg border border-white/10 bg-white/5 text-white"
            >
              {open ? <X size={17} /> : <Menu size={17} />}
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="lg:hidden">
          <div className="mx-6 rounded-2xl border border-white/10 bg-[#07111f]/95 p-4 backdrop-blur-xl">
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
            <a href="#top" className="label-mono block pt-4 text-white/80">
              LOG IN
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
