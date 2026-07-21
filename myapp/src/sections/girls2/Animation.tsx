"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useGirls2Animation() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      if (!section) return;

      const image = section.querySelector<HTMLElement>("[data-image]");
      const label = section.querySelector<HTMLElement>("[data-label]");
      const headline = section.querySelector<HTMLElement>("[data-headline]");
      const description = section.querySelector<HTMLElement>("[data-description]");
      const features = section.querySelectorAll<HTMLElement>("[data-feature]");

      if (!image || !label || !headline || !description) return;

     // ── الصورة — scale parallax ───────────────────────────
/*
gsap.fromTo(
  image,
  { scale: 1.08 },
  {
    scale: 1,
    ease: "none",
    scrollTrigger: {
      trigger: section,
      start: "top bottom",
      end: "center center",
      scrub: 1.5,
    },
  }
);
*/
      // ── النص العلوي ───────────────────────────────────────
      const topTl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none none",
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

      // ── الـ 3 features — stagger ──────────────────────────
      features.forEach((feature, i) => {
        gsap.fromTo(
          feature,
          { clipPath: "inset(0 100% 0 0)" },
          {
            clipPath: "inset(0 0% 0 0)",
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "bottom 90%",
              toggleActions: "play none none none",
            },
            delay: i * 0.15,
          }
        );
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return { sectionRef };
}