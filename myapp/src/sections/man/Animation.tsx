"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useManAnimation() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      if (!section) return;

      const label = section.querySelector<HTMLElement>("[data-label]");
      const headlineLines = section.querySelectorAll<HTMLElement>("[data-headline]");
      const description = section.querySelector<HTMLElement>("[data-description]");
      const badge = section.querySelector<HTMLElement>("[data-badge]");
      const image = section.querySelector<HTMLElement>("[data-image]");

      if (!label || !description || !badge || !image) return;

      // الصورة — parallax scrub مستمر
     

      // النصوص — triggered مرة واحدة
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });

      tl.fromTo(
        label,
        { clipPath: "inset(0 100% 0 0)" },
        { clipPath: "inset(0 0% 0 0)", duration: 0.7 }
      );

      headlineLines.forEach((line, i) => {
        tl.fromTo(
          line,
          { clipPath: "inset(0 100% 0 0)", skewX: -5 },
          { clipPath: "inset(0 0% 0 0)", skewX: 0, duration: 0.9 },
          0.15 + i * 0.15
        );
      });

      tl.fromTo(
        description,
        { clipPath: "inset(0 0 100% 0)" },
        { clipPath: "inset(0 0 0% 0)", duration: 0.6 },
        "-=0.3"
      );

      tl.fromTo(
        badge,
        { clipPath: "inset(0 100% 0 0)" },
        { clipPath: "inset(0 0% 0 0)", duration: 0.5 },
        "-=0.15"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return { sectionRef };
}