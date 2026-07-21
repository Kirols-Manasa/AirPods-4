 "use client";

import { useState, useCallback } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import Link from "next/link";
import Container from "@/Container";
import { useHeader } from "./HeaderAnimation";

const links = [
  { href: "#hero",       label: "Overview" },
  { href: "#engineered", label: "Sound"    },
  { href: "#details",    label: "Design"   },
  { href: "#battery",    label: "Battery"  },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const {
    headerRef,
    brandRef,
    addNavLink,
    buyBtnRef,
    headerClass,
    textColor,
    isScrolled,
    activeSection,
  } = useHeader();

  const isLight = open && !isScrolled;
  const activeTextColor = isLight ? "text-black" : textColor;
  const isDarkButton = activeTextColor !== "text-white";

  const scrollToSection = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      const target = document.querySelector(href);
      if (!target) return;

      if (typeof window === "undefined") {
        target.scrollIntoView({ behavior: "smooth" });
        return;
      }

      const lenis = (window as unknown as Record<string, unknown>).lenis as
        | { scrollTo: (target: Element, options?: object) => void }
        | undefined;

      if (lenis) {
        lenis.scrollTo(target, { offset: -60, duration: 1.2 });
      } else {
        target.scrollIntoView({ behavior: "smooth" });
      }
    },
    []
  );

  const handleClose  = useCallback(() => setOpen(false), []);
  const handleToggle = useCallback(() => setOpen((v) => !v), []);

  const headerBgOverride = isLight
    ? "bg-white/80 backdrop-blur-md border-b border-black/10"
    : "";

  return (
    <header
      className={`${headerClass} ${headerBgOverride}`}
      ref={headerRef}
    >
      <Container>
        <div className="flex items-center justify-between py-3 sm:py-4">

          {/* Brand */}
          <span
            ref={brandRef}
            className={`text-[15px] sm:text-[17px] lg:text-[19px] xl:text-[20px] font-semibold transition-colors duration-300 ${activeTextColor}`}
            style={{ willChange: "clip-path" }}
          >
            AirPods 4
          </span>

          <div className="flex items-center gap-3 sm:gap-5 lg:gap-8">

            {/* Desktop Nav */}
            <nav className="hidden sm:flex items-center gap-3 lg:gap-5 xl:gap-6" aria-label="Main navigation">
              {links.map((link) => {
                const isActive = activeSection === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    ref={addNavLink}
                    onClick={(e) => scrollToSection(e, link.href)}
                    className={`
                      text-[12px] lg:text-[13px] xl:text-[14px]
                      transition-[color,opacity] duration-300
                      ${activeTextColor}
                      ${isActive ? "opacity-100 font-bold" : "opacity-40 hover:opacity-50"}
                    `}
                    style={{ willChange: "clip-path, opacity" }}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Buy button */}
            <Link
              ref={buyBtnRef}
              href="#"
              className={`hidden sm:flex items-center px-4 sm:px-5 lg:px-6 py-1.5 lg:py-2 text-[12px] lg:text-[13px] xl:text-[14px] rounded-full hover:opacity-80 transition-all duration-300 border ${
                isDarkButton
                  ? "bg-black text-white border-black"
                  : "bg-white text-black border-white"
              }`}
              style={{ willChange: "clip-path, opacity" }}
            >
              Buy
            </Link>

            {/* Mobile toggle */}
            <button
              className={`sm:hidden p-1 cursor-pointer transition-colors duration-300 ${activeTextColor}`}
              onClick={handleToggle}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              {open ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>

          </div>
        </div>
      </Container>

      {/* Mobile Menu */}
      <div
        className="sm:hidden"
        style={{
          display: "grid",
          gridTemplateRows: open ? "1fr" : "0fr",
          opacity: open ? 1 : 0,
          transition: "grid-template-rows 0.3s ease-in-out, opacity 0.3s ease-in-out",
        }}
      >
        <div style={{ overflow: "hidden" }}>
          <Container>
            <nav className="flex flex-col gap-4 py-4" aria-label="Mobile navigation">
              {links.map((link) => {
                const isActive = activeSection === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={(e) => { scrollToSection(e, link.href); handleClose(); }}
                    className={`
                      text-[32px] font-semibold tracking-[-0.02em] leading-[1.2]
                      transition-[color,opacity] duration-300
                      ${activeTextColor}
                      ${isActive ? "opacity-100" : "opacity-40 hover:opacity-60"}
                    `}
                  >
                    {link.label}
                  </Link>
                );
              })}

              <Link
                href="#"
                className={`mt-2 w-full py-3 text-[15px] font-semibold rounded-full hover:opacity-80 transition-all duration-300 text-center border ${
                  isDarkButton
                    ? "bg-black text-white border-black"
                    : "bg-white text-black border-white"
                }`}
              >
                Buy
              </Link>
            </nav>
          </Container>
        </div>
      </div>

    </header>
  );
}