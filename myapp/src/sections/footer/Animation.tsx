 "use client";

import { useRef, useCallback } from "react";
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

  const addColHeader = useCallback((el: HTMLParagraphElement | null) => {
    if (!el) return;
    const current = colHeaders.current;
    if (!current.includes(el)) {
      current.push(el);
    }
  }, []);

  const addColLinks = useCallback((el: HTMLUListElement | null) => {
    if (!el) return;
    const current = colLinks.current;
    if (!current.includes(el)) {
      current.push(el);
    }
  }, []);

  useGSAP(
    () => {
      const footerEl = footer.current;
      if (!footerEl) return;

      const brandEl = brand.current;
      const headersRefs = colHeaders.current;
      const linksRefs = colLinks.current;
      const dividerEl = divider.current;
      const bottomBarEl = bottomBar.current;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: footerEl,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });

      // ── 1. Brand — clip-path reveal من اليسار ──────────────────────────
      if (brandEl) {
        tl.fromTo(
          brandEl,
          { clipPath: "inset(0 100% 0 0)" },
          { clipPath: "inset(0 0% 0 0)", duration: 0.8, ease: "power3.out" }
        );
      }

      // ── 2. Column headers — reveal من تحت بـ stagger ───────────────────
      if (headersRefs.length > 0) {
        tl.fromTo(
          headersRefs,
          { clipPath: "inset(100% 0 0 0)", opacity: 0 },
          {
            clipPath: "inset(0% 0 0 0)",
            opacity: 1,
            duration: 0.6,
            ease: "power3.out",
            stagger: 0.08,
          },
          "-=0.5"
        );
      }

      // ── 3. Links — y + opacity بـ stagger داخل كل عمود ────────────────
      if (linksRefs.length > 0) {
        tl.fromTo(
          linksRefs,
          { y: 8, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power3.out",
            stagger: 0.07,
          },
          "-=0.4"
        );
      }

      // ── 4. Divider — scaleX من اليسار ──────────────────────────────────
      if (dividerEl) {
        tl.fromTo(
          dividerEl,
          { scaleX: 0, transformOrigin: "left" },
          { scaleX: 1, duration: 0.7, ease: "power3.out" },
          "-=0.3"
        );
      }

      // ── 5. Bottom bar — clip-path من فوق لتحت ──────────────────────────
      if (bottomBarEl) {
        tl.fromTo(
          bottomBarEl,
          { clipPath: "inset(0 0 100% 0)", opacity: 0 },
          {
            clipPath: "inset(0 0 0% 0)",
            opacity: 1,
            duration: 0.6,
            ease: "power3.out",
          },
          "-=0.3"
        );
      }
    },
    { scope: footer, dependencies: [] }
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