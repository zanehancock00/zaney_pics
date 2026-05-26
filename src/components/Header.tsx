"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/data/site";

const NAV = [
  { label: "STILLS", href: "/" },
  { label: "ABOUT", href: "/about" },
  { label: "CONTACT", href: "/contact" },
] as const;

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 2);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      style={{
        borderBottomColor: "var(--color-line)",
        backgroundColor: "var(--color-bg)",
      }}
      className={[
        "fixed top-0 right-0 left-0 z-30 flex h-14 items-center justify-between px-4 transition-[border-color] duration-200 sm:px-6 lg:px-8",
        scrolled ? "border-b" : "border-b border-transparent",
      ].join(" ")}
    >
      {/* Wordmark / site name */}
      <Link
        href="/"
        className="caps text-xs font-medium tracking-[0.15em]"
        style={{ color: "var(--color-fg)" }}
      >
        {site.name}
      </Link>

      {/* Navigation */}
      <nav className="flex items-center gap-6">
        {NAV.map(({ label, href }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={[
                "caps text-xs transition-opacity",
                active
                  ? "underline underline-offset-4"
                  : "opacity-60 hover:opacity-100",
              ].join(" ")}
              style={{ color: "var(--color-fg)" }}
            >
              {label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
