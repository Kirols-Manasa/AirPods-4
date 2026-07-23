 "use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export function useGirls2Animation() {
  const sectionRef = useRef<HTMLElement>(null);
  const elementsRef = useRef<{
    label: HTMLElement | null;
    headline: HTMLElement | null;
    description: HTMLElement | null;
    features: HTMLElement[];
  }>({
    label: null,
    headline: null,
    description: null,
    features: [],
  });
  const animationSetupRef = useRef(false);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section || animationSetupRef.current) return;

      const label = section.querySelector<HTMLElement>("[data-label]");
      const headline = section.querySelector<HTMLElement>("[data-headline]");
      const description = section.querySelector<HTMLElement>("[data-description]");
      const features = Array.from(
        section.querySelectorAll<HTMLElement>("[data-feature]")
      );

      if (!label || !headline || !description || features.length === 0) return;

      elementsRef.current = {
        label,
        headline,
        description,
        features,
      };

      animationSetupRef.current = true;

      const ctx = gsap.context(() => {
        // ── Top text animation timeline ──────────────────────
        const topTl = gsap.timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none none",
            fastScrollEnd: true,
          },
        });

        topTl
          .fromTo(
            label,
            { clipPath: "inset(0 100% 0 0)" },
            { clipPath: "inset(0 0% 0 0)", duration: 0.7 }
          )
          .fromTo(
            headline,
            { clipPath: "inset(0 100% 0 0)", skewX: -4 },
            { clipPath: "inset(0 0% 0 0)", skewX: 0, duration: 0.9 },
            0.15
          )
          .fromTo(
            description,
            { clipPath: "inset(0 0 100% 0)" },
            { clipPath: "inset(0 0 0% 0)", duration: 0.7 },
            0.35
          );

        // ── Features animation (batched into one timeline) ───
        features.forEach((feature, i) => {
          topTl.fromTo(
            feature,
            { clipPath: "inset(0 100% 0 0)" },
            { clipPath: "inset(0 0% 0 0)", duration: 0.7 },
            0.5 + i * 0.15
          );
        });
      }, sectionRef);

      return () => {
        ctx.revert();
      };
    },
    { scope: sectionRef }
  );

  return { sectionRef };
}