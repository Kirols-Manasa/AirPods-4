 "use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export function useBatteryAnimation() {
  const sectionRef = useRef<HTMLElement>(null);
  const elementsRef = useRef<{
    heading: HTMLElement | null;
    headingDesc: HTMLElement | null;
    cards: HTMLElement[];
    caseImg: HTMLElement | null;
    chargerImg: HTMLElement | null;
  }>({
    heading: null,
    headingDesc: null,
    cards: [],
    caseImg: null,
    chargerImg: null,
  });
  const animationSetupRef = useRef(false);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section || animationSetupRef.current) return;

      const heading = section.querySelector<HTMLElement>("[data-heading]");
      const headingDesc = section.querySelector<HTMLElement>("[data-heading-desc]");
      const cards = Array.from(section.querySelectorAll<HTMLElement>("[data-card]"));
      const caseImg = section.querySelector<HTMLElement>("[data-case-img]");
      const chargerImg = section.querySelector<HTMLElement>("[data-charger-img]");

      if (!heading || !headingDesc || cards.length === 0 || !caseImg || !chargerImg) return;

      elementsRef.current = {
        heading,
        headingDesc,
        cards,
        caseImg,
        chargerImg,
      };

      animationSetupRef.current = true;

      const ctx = gsap.context(() => {
        // ── Main text animation timeline ─────────────────────
        const textTl = gsap.timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            toggleActions: "play none none none",
            fastScrollEnd: true,
          },
        });

        textTl
          .fromTo(
            heading,
            { clipPath: "inset(0 100% 0 0)" },
            { clipPath: "inset(0 0% 0 0)", duration: 0.9 }
          )
          .fromTo(
            headingDesc,
            { clipPath: "inset(0 100% 0 0)" },
            { clipPath: "inset(0 0% 0 0)", duration: 0.7 },
            0.15
          );

        // ── Cards animation (batched into timeline) ─────────
        cards.forEach((card, i) => {
          textTl.fromTo(
            card,
            { clipPath: "inset(0 0 100% 0)" },
            { clipPath: "inset(0 0 0% 0)", duration: 0.8, ease: "power3.out" },
            0.3 + i * 0.15
          );
        });

        // ── Case image: scale + opacity ──────────────────────
        gsap.fromTo(
          caseImg,
          { scale: 0.9, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 75%",
              toggleActions: "play none none none",
              fastScrollEnd: true,
            },
          }
        );

        // ── Charger image: Parallax ──────────────────────────
        gsap.fromTo(
          chargerImg,
          { y: 40 },
          {
            y: 0,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
              fastScrollEnd: true,
            },
          }
        );
      }, sectionRef);

      return () => {
        ctx.revert();
      };
    },
    { scope: sectionRef }
  );

  return { sectionRef };
}