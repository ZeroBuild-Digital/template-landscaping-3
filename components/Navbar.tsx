"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import SmoothLink from "@/components/ui/SmoothLink";

const SCROLL_THRESHOLD = 16;

const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Reviews", href: "#reviews" },
  { label: "FAQ", href: "#faq" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [menuOpen]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-200 ease-out ${
        scrolled
          ? "bg-[#050607]/90 backdrop-blur-md shadow-sm shadow-black/40"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex h-16 md:h-20 items-center justify-between">
          <SmoothLink
            href="#top"
            className="font-display font-bold tracking-tight text-lg md:text-xl text-white transition-colors duration-200"
            aria-label="[TEMPLATE 3] home"
          >
            [TEMPLATE 3]
          </SmoothLink>

          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <SmoothLink
                key={link.href}
                href={link.href}
                className="text-sm font-medium tracking-wide uppercase text-white/80 hover:text-[#E8D4A3] transition-colors duration-200"
              >
                {link.label}
              </SmoothLink>
            ))}
            <SmoothLink
              href="#quote"
              className="inline-flex items-center justify-center h-11 px-6 rounded-md bg-[#D4B679] text-slate-900 text-sm font-bold uppercase tracking-wider shadow-[0_0_30px_rgba(232,212,163,0.35)] hover:bg-[#E8D4A3] hover:shadow-[0_0_44px_rgba(232,212,163,0.55)] transition-all duration-200"
            >
              Get Quote
            </SmoothLink>
          </nav>

          <button
            type="button"
            className={`md:hidden inline-flex items-center justify-center h-11 w-11 rounded-lg transition-colors duration-200 ${
              scrolled ? "text-white hover:bg-white/10" : "text-white hover:bg-white/10"
            }`}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden fixed inset-0 top-16 z-40 bg-[#050607] flex flex-col gap-6 px-6 py-8 border-t border-white/10">
          {NAV_LINKS.map((link) => (
            <SmoothLink
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="font-display font-bold text-2xl uppercase tracking-wide text-white py-2 border-b border-white/10 hover:text-[#E8D4A3] transition-colors"
            >
              {link.label}
            </SmoothLink>
          ))}
          <SmoothLink
            href="#quote"
            onClick={() => setMenuOpen(false)}
            className="mt-4 inline-flex items-center justify-center rounded-md bg-[#D4B679] text-slate-900 font-bold uppercase tracking-wider py-4 text-base shadow-[0_0_30px_rgba(232,212,163,0.5)]"
          >
            Get Quote
          </SmoothLink>
        </div>
      )}
    </header>
  );
}
