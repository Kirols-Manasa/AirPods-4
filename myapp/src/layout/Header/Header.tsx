 "use client";

import { useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import Link from "next/link";
import Container from "@/Container";

const links = [
  { href: "#overview",   label: "Overview"   },
  { href: "#design",     label: "Design"     },
  { href: "#features",   label: "Features"   },
  { href: "#tech-specs", label: "Tech Specs" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full border-b border-black/10">

      {/* Top Bar */}
      <Container>
        <div className="flex items-center justify-between py-3 sm:py-4">

          {/* Left — Brand */}
          <span className="text-[15px] sm:text-[17px] lg:text-[19px] xl:text-[20px] font-semibold">
            AirPods 4
          </span>

          {/* Right */}
          <div className="flex items-center gap-3 sm:gap-5 lg:gap-8">

            {/* Nav — Tablet sm: + Desktop lg: + Large xl: */}
            <nav className="hidden sm:flex items-center gap-3 lg:gap-5 xl:gap-6" aria-label="Main navigation">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-[12px] lg:text-[13px] xl:text-[14px] hover:opacity-60 transition-opacity"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Buy Button — Desktop */}
            <Link
              href="#"
              className="hidden sm:flex items-center px-4 sm:px-5 lg:px-6 py-1.5 lg:py-2 bg-black text-white text-[12px] lg:text-[13px] xl:text-[14px] rounded-full hover:opacity-80 transition-opacity"
            >
              Buy
            </Link>

            {/* Chevron — Mobile only */}
            <button
              className="sm:hidden p-1 cursor-pointer"
              onClick={() => setOpen((v) => !v)}
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
        className={`sm:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          open ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <Container>
          <nav className="flex flex-col gap-4 py-4" aria-label="Mobile navigation">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[15px] hover:opacity-60 transition-opacity"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            {/* Buy Button — Mobile */}
            <Link
              href="#"
              className="mt-2 w-full py-3 bg-black text-white text-[15px] font-semibold rounded-full hover:opacity-80 transition-opacity text-center"
            >
              Buy
            </Link>
          </nav>
        </Container>
      </div>

    </header>
  );
}