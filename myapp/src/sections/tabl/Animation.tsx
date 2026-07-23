 "use client";

import { useRef, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function useTabIAnimations() {
  const section    = useRef<HTMLElement>(null);
  const headline   = useRef<HTMLHeadingElement>(null);
  const paragraph  = useRef<HTMLParagraphElement>(null);
  const button     = useRef<HTMLButtonElement>(null);
  const imgWrapper = useRef<HTMLDivElement>(null);
  const imgInner   = useRef<HTMLImageElement>(null);

  const wordRefs = useRef<HTMLSpanElement[]>([]);

  const addWordRef = useCallback((el: HTMLSpanElement | null) => {
    if (!el) return;
    const currentRefs = wordRefs.current;
    if (!currentRefs.includes(el)) {
      currentRefs.push(el);
    }
  }, []);

  useGSAP(
    () => {
      const sectionEl = section.current;
      if (!sectionEl) return;

      const currentWordRefs = wordRefs.current;
      const paragraphEl = paragraph.current;
      const buttonEl = button.current;
      const imgWrapperEl = imgWrapper.current;
      const imgInnerEl = imgInner.current;

      // ── النصوص ─────────────────────────────────────────────────────────
      if (currentWordRefs.length > 0 || paragraphEl || buttonEl) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionEl,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        });

        if (currentWordRefs.length > 0) {
          tl.fromTo(
            currentWordRefs,
            { y: 24, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.7, ease: "power3.out", stagger: 0.055 }
          );
        }

        if (paragraphEl) {
          tl.fromTo(
            paragraphEl,
            { y: 14, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
            "-=0.35"
          );
        }

        if (buttonEl) {
          tl.fromTo(
            buttonEl,
            { y: 10, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" },
            "-=0.3"
          );
        }
      }

      // ── الصورة — clip-path reveal ───────────────────────────────────────
      if (imgWrapperEl) {
        gsap.fromTo(
          imgWrapperEl,
          { clipPath: "inset(8% 0 8% 0 round 16px)" },
          {
            clipPath: "inset(0% 0 0% 0 round 16px)",
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: imgWrapperEl,
              start: "top 78%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // ── الصورة — parallax على imgInner ─────────────────────────────────
      if (imgInnerEl && imgWrapperEl) {
        gsap.set(imgInnerEl, { scale: 1.1, yPercent: -5 });

        gsap.to(imgInnerEl, {
          yPercent: 5,
          ease: "none",
          scrollTrigger: {
            trigger: imgWrapperEl,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
        });
      }
    },
    { scope: section, dependencies: [] }
  );

  return {
    section,
    headline,
    paragraph,
    button,
    imgWrapper,
    imgInner,
    addWordRef,
  };
}