import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Label({
  children,
  tone = "dark",
  className,
}: {
  children: ReactNode;
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "label-mono flex items-center gap-2",
        tone === "dark" ? "text-[#8fb4e8]" : "text-[#5d76a3]",
        className,
      )}
    >
      <span
        className={cn(
          "inline-block h-1.5 w-1.5 rounded-full",
          tone === "dark" ? "bg-[#3b82f6]" : "bg-[#1e4ed8]",
        )}
      />
      {children}
    </div>
  );
}

export function Heading({
  children,
  className,
  tone = "dark",
  size = "lg",
}: {
  children: ReactNode;
  className?: string;
  tone?: "dark" | "light";
  size?: "lg" | "xl";
}) {
  return (
    <h2
      style={{ lineHeight: 1.04 }}
      className={cn(
        "font-light tracking-[-0.03em]",
        size === "xl"
          ? "text-[clamp(2.4rem,6.4vw,6.6rem)]"
          : "text-[clamp(2rem,4.6vw,4.9rem)]",
        tone === "dark" ? "text-white" : "text-[#102a63]",
        className,
      )}
    >
      {children}
    </h2>
  );
}

export function Accent({ children }: { children: ReactNode }) {
  return <span className="text-[#3b82f6]">{children}</span>;
}

export function Btn({
  children,
  variant = "primary",
  as = "button",
  href,
  className,
}: {
  children: ReactNode;
  variant?: "primary" | "ghostDark" | "ghostLight";
  as?: "button" | "a";
  href?: string;
  className?: string;
}) {
  const base =
    "label-mono inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 transition-all duration-250 will-change-transform hover:-translate-y-0.5";
  const styles = {
    primary:
      "bg-[#1e4ed8] text-white hover:bg-[#2563eb] hover:shadow-[0_12px_38px_-10px_rgba(59,130,246,0.75)]",
    ghostDark:
      "border border-white/12 bg-white/[0.04] text-white/90 hover:border-[#3b82f6]/50 hover:bg-white/[0.08]",
    ghostLight:
      "border border-[#dbe5f2] bg-white text-[#102a63] hover:border-[#3b82f6]/50 hover:shadow-[0_10px_30px_-14px_rgba(16,42,99,0.4)]",
  }[variant];
  const C: any = as;
  return (
    <C href={href} className={cn(base, styles, className)}>
      {children}
    </C>
  );
}

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "none" : "translateY(20px)",
        transition: `opacity 700ms ease ${delay}ms, transform 700ms cubic-bezier(.2,.7,.3,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

export function Waveform({ bars = 28, tone = "light" }: { bars?: number; tone?: "light" | "dark" }) {
  return (
    <div className="flex h-8 items-center gap-[3px]">
      {Array.from({ length: bars }).map((_, i) => (
        <span
          key={i}
          className={cn(
            "w-[3px] rounded-full",
            tone === "light" ? "bg-[#1e4ed8]/70" : "bg-[#3b82f6]",
          )}
          style={{
            height: `${20 + Math.abs(Math.sin(i * 1.1)) * 70}%`,
            animation: `nx-pulse-dot ${900 + (i % 7) * 140}ms ease-in-out ${i * 40}ms infinite`,
          }}
        />
      ))}
    </div>
  );
}

export function Pill({
  children,
  tone = "blue",
}: {
  children: ReactNode;
  tone?: "blue" | "green" | "grey" | "amber";
}) {
  const map = {
    blue: "bg-[#e7eefb] text-[#1747b8]",
    green: "bg-[#e3f4ec] text-[#1f7a52]",
    grey: "bg-[#eef1f6] text-[#5d76a3]",
    amber: "bg-[#fdf1e0] text-[#9a6412]",
  }[tone];
  return (
    <span className={cn("label-mono rounded-md px-2.5 py-1", map)}>{children}</span>
  );
}
