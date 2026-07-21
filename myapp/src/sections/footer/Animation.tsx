"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function useFooterAnimations() {
  const footer      = useRef<HTMLElement>(null);
  const brand       = useRef<HTMLDivElement>(null);
  const colHeaders  = useRef<HTMLParagraphElement[]>([]);
  const colLinks    = useRef<HTMLUListElement[]>([]);
  const divider     = useRef<HTMLHRElement>(null);
  const bottomBar   = useRef<HTMLDivElement>(null);

  const addColHeader = (el: HTMLParagraphElement | null) => {
    if (el && !colHeaders.current.includes(el)) colHeaders.current.push(el);
  };
  const addColLinks = (el: HTMLUListElement | null) => {
    if (el && !colLinks.current.includes(el)) colLinks.current.push(el);
  };

  useGSAP(
    () => {
      if (!footer.current) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: footer.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });

      // ── 1. Brand — clip-path reveal من اليسار ──────────────────────────
      tl.fromTo(
        brand.current,
        { clipPath: "inset(0 100% 0 0)" },
        { clipPath: "inset(0 0% 0 0)", duration: 0.8, ease: "power3.out" }
      )

      // ── 2. Column headers — reveal من تحت بـ stagger ───────────────────
      .fromTo(
        colHeaders.current,
        { clipPath: "inset(100% 0 0 0)", opacity: 0 },
        {
          clipPath: "inset(0% 0 0 0)",
          opacity: 1,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.08,
        },
        "-=0.5"
      )

      // ── 3. Links — y + opacity بـ stagger داخل كل عمود ────────────────
      .fromTo(
        colLinks.current,
        { y: 8, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.07,
        },
        "-=0.4"
      )

      // ── 4. Divider — scaleX من اليسار ──────────────────────────────────
      .fromTo(
        divider.current,
        { scaleX: 0, transformOrigin: "left" },
        { scaleX: 1, duration: 0.7, ease: "power3.out" },
        "-=0.3"
      )

      // ── 5. Bottom bar — clip-path من فوق لتحت ──────────────────────────
      .fromTo(
        bottomBar.current,
        { clipPath: "inset(0 0 100% 0)", opacity: 0 },
        {
          clipPath: "inset(0 0 0% 0)",
          opacity: 1,
          duration: 0.6,
          ease: "power3.out",
        },
        "-=0.3"
      );
    },
    { scope: footer }
  );

  return {
    footer,
    brand,
    addColHeader,
    addColLinks,
    divider,
    bottomBar,
  };
}