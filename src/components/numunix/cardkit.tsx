import type { ReactNode } from "react";

/**
 * Architectural / technical card system.
 * Edge-to-edge hairline sections, mono micro-labels, one dark action bar.
 */

export function Card({
  children,
  className = "",
  tone = "light",
}: {
  children: ReactNode;
  className?: string;
  tone?: "light" | "dark";
}) {
  return (
    <div
      className={`w-full overflow-hidden rounded-[24px] ${
        tone === "dark"
          ? "border border-white/10 bg-[#07111f]/85 backdrop-blur-xl shadow-[0_40px_120px_-50px_rgba(2,8,23,0.9)]"
          : "border border-[#e6ecf4] bg-white shadow-[0_20px_50px_rgba(11,27,56,0.05)]"
      } ${className}`}
    >
      {children}
    </div>
  );
}

export function Chip({
  children,
  tone = "light",
}: {
  children: ReactNode;
  tone?: "light" | "dark";
}) {
  return (
    <span
      className={`label-mono rounded-md px-2 py-1 ${
        tone === "dark" ? "bg-white/[0.06] text-[#6fb3ff]" : "bg-[#eef3f8] text-[#2563eb]"
      }`}
    >
      {children}
    </span>
  );
}

export function Status({
  children,
  tone = "light",
  live = true,
}: {
  children: ReactNode;
  tone?: "light" | "dark";
  live?: boolean;
}) {
  return (
    <span className="flex shrink-0 items-center gap-2">
      {live && (
        <span
          className="h-2 w-2 rounded-full bg-[#3b82f6]"
          style={{ animation: "nx-pulse-dot 2.4s ease-in-out infinite" }}
        />
      )}
      <span className={`label-mono ${tone === "dark" ? "text-white/45" : "text-[#8190aa]"}`}>
        {children}
      </span>
    </span>
  );
}

export function CardHead({
  chip,
  status,
  title,
  tone = "light",
  live = true,
}: {
  chip: string;
  status?: string;
  title?: ReactNode;
  tone?: "light" | "dark";
  live?: boolean;
}) {
  return (
    <div
      className={`px-5 pt-5 pb-4 sm:px-6 sm:pt-6 ${
        tone === "dark" ? "border-b border-white/10" : "border-b border-[#eef3f8]"
      }`}
    >
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
        <span className="min-w-0 truncate">
          <Chip tone={tone}>{chip}</Chip>
        </span>
        {status && (
          <Status tone={tone} live={live}>
            {status}
          </Status>
        )}
      </div>
      {title && (
        <h3
          className={`mt-4 text-[20px] leading-[1.2] font-medium tracking-[-0.02em] sm:text-[22px] ${
            tone === "dark" ? "text-white" : "text-[#05070c]"
          }`}
        >
          {title}
        </h3>
      )}
    </div>
  );
}

/** Edge-to-edge metric grid with internal hairlines. */
export function MetricGrid({
  items,
  tone = "light",
  cols = 2,
}: {
  items: { k: string; v: ReactNode }[];
  tone?: "light" | "dark";
  cols?: 2 | 3;
}) {
  const line = tone === "dark" ? "border-white/10" : "border-[#eef3f8]";
  return (
    <div className={`grid border-b ${line} ${cols === 3 ? "grid-cols-3" : "grid-cols-2"}`}>
      {items.map((it, i) => (
        <div
          key={it.k}
          className={`min-w-0 px-5 py-4 sm:px-6 sm:py-5 ${
            (i + 1) % cols !== 0 ? `border-r ${line}` : ""
          } ${i >= cols ? `border-t ${line}` : ""}`}
        >
          <p className={`label-mono ${tone === "dark" ? "text-white/35" : "text-[#8190aa]"}`}>
            {it.k}
          </p>
          <p
            className={`mt-1.5 truncate text-[15px] sm:text-[17px] ${
              tone === "dark" ? "text-white" : "text-[#07111f]"
            }`}
          >
            {it.v}
          </p>
        </div>
      ))}
    </div>
  );
}

export function CardBody({
  children,
  tone = "light",
  tint = true,
  divide = false,
}: {
  children: ReactNode;
  tone?: "light" | "dark";
  tint?: boolean;
  divide?: boolean;
}) {
  return (
    <div
      className={`px-5 py-5 sm:px-6 sm:py-6 ${
        tint ? (tone === "dark" ? "bg-white/[0.02]" : "bg-[#f7f9fc]/70") : ""
      } ${divide ? (tone === "dark" ? "border-b border-white/10" : "border-b border-[#eef3f8]") : ""}`}
    >
      {children}
    </div>
  );
}

export function Quote({
  children,
  tone = "light",
}: {
  children: ReactNode;
  tone?: "light" | "dark";
}) {
  return (
    <div className="flex gap-3">
      <span className="w-[3px] shrink-0 rounded-full bg-[#3b82f6]" />
      <p
        className={`text-[14px] leading-relaxed ${
          tone === "dark" ? "text-white/75" : "text-[#102a63]/85"
        }`}
      >
        {children}
      </p>
    </div>
  );
}

export function Tag({
  children,
  dot = "#38bdf8",
  tone = "light",
}: {
  children: ReactNode;
  dot?: string;
  tone?: "light" | "dark";
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[12px] ${
        tone === "dark"
          ? "border border-white/10 bg-white/[0.04] text-white/80"
          : "border border-[#eef3f8] bg-white text-[#102a63] shadow-[0_1px_2px_rgba(11,27,56,0.05)]"
      }`}
    >
      <span className="h-1.5 w-1.5 rounded-full" style={{ background: dot }} />
      {children}
    </span>
  );
}

export function CardAction({
  children,
  tone = "light",
}: {
  children: ReactNode;
  tone?: "light" | "dark";
}) {
  return (
    <div className="p-4">
      <span
        className={`group flex w-full items-center justify-center gap-2 rounded-xl py-3 text-[14px] transition-colors ${
          tone === "dark"
            ? "bg-[#1e4ed8] text-white hover:bg-[#2563eb]"
            : "bg-[#07111f] text-white hover:bg-[#102a63]"
        }`}
      >
        {children}
        <span className="hover-arrow">→</span>
      </span>
    </div>
  );
}
