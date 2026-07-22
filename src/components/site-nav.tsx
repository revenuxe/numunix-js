"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { LogoMark } from "@/components/logo-mark";
import { CONTACT } from "@/lib/contact";
import { WhatsAppIcon } from "@/components/whatsapp-icon";

const NAV_LINKS: { label: string; href: string }[] = [
  { label: "Home", href: "/" },
  { label: "Repair Laptop", href: "/repair-laptop" },
  { label: "About", href: "/about" },
  { label: "Why Us", href: "/why-us" },
  { label: "Contact", href: "/contact" },
];

export function SiteNav({ variant = "light" }: { variant?: "light" | "dark" }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isDark = variant === "dark";

  function isActive(href: string) {
    return href === "/" ? pathname === "/" : pathname.startsWith(href);
  }

  return (
    <header
      className={
        isDark
          ? "absolute inset-x-0 top-0 z-30"
          : "sticky top-0 z-30 border-b border-border bg-white/80 backdrop-blur-xl"
      }
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 md:px-8 md:py-4">
        <Link
          href="/"
          className="flex h-12 items-center rounded-2xl bg-white/95 px-4 shadow-soft backdrop-blur md:h-14 md:rounded-full md:px-6"
        >
          <LogoMark className="h-7 w-auto md:h-9" />
        </Link>

        <nav
          className={`hidden h-14 items-center gap-1 rounded-full px-2 backdrop-blur-md lg:flex ${
            isDark ? "bg-white/10 ring-1 ring-white/20" : "bg-secondary ring-1 ring-border"
          }`}
        >
          {NAV_LINKS.map((l) => {
            const active = isActive(l.href);
            const inactiveClasses = isDark
              ? "text-white/90 hover:bg-white/15 hover:text-white"
              : "text-ink/80 hover:bg-white hover:text-ink";
            const activeClasses = isDark
              ? "font-semibold bg-white/20 text-white"
              : "font-semibold bg-white text-ink shadow-soft";
            return (
              <Link
                key={l.label}
                href={l.href}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${active ? activeClasses : inactiveClasses}`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <a
            href={CONTACT.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex h-14 items-center gap-2 rounded-full border px-6 text-sm font-semibold shadow-soft transition ${
              isDark
                ? "border-white/30 bg-ink/55 text-white backdrop-blur hover:bg-white hover:text-ink"
                : "border-ink/20 bg-ink text-white hover:bg-brand"
            }`}
          >
            <WhatsAppIcon className="h-4 w-4" />
            WhatsApp Us
          </a>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={() => setOpen(true)}
            className={`grid h-12 w-12 place-items-center rounded-2xl shadow-soft ${
              isDark ? "bg-white/95 text-ink" : "bg-ink text-white"
            }`}
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 bg-ink/95 backdrop-blur-xl lg:hidden">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex h-12 items-center rounded-2xl bg-white/95 px-4 shadow-soft">
              <LogoMark className="h-7 w-auto" />
            </div>
            <button
              onClick={() => setOpen(false)}
              className="grid h-12 w-12 place-items-center rounded-2xl bg-white/10 text-white"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="flex flex-col gap-2 px-6 py-8">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-2xl px-4 py-4 text-2xl font-semibold text-white hover:bg-white/10"
              >
                {l.label}
              </Link>
            ))}
            <a
              href={CONTACT.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-ink px-5 py-4 text-base font-semibold text-white transition hover:bg-brand"
            >
              <WhatsAppIcon className="h-5 w-5" />
              WhatsApp Us
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
