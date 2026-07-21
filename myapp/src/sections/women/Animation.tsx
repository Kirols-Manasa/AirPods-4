 "use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useWomenAnimation() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      if (!section) return;

      const image = section.querySelector<HTMLElement>("[data-image]");
      const label = section.querySelector<HTMLElement>("[data-label]");
      const headlineLines = section.querySelectorAll<HTMLElement>("[data-headline]");
      const desc = section.querySelector<HTMLElement>("[data-desc]");

      if (!image || !label || !desc) return;

      // ── الصورة — scale scrub بتتقرب منك ─────────────────
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

      // ── Parallax خفيف — الصورة تطفو ──────────────────────
      gsap.fromTo(
        image,
        { y: -20 },
        {
          y: 20,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );

      // ── النصوص — واضحة وبطيئة ────────────────────────────
      const textTl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: label,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });

      textTl
        .fromTo(
          label,
          { opacity: 0, clipPath: "inset(0 100% 0 0)" },
          { opacity: 1, clipPath: "inset(0 0% 0 0)", duration: 0.8 }
        );

      headlineLines.forEach((line, i) => {
        textTl.fromTo(
          line,
          { opacity: 0, clipPath: "inset(0 100% 0 0)", skewX: -4 },
          { opacity: 1, clipPath: "inset(0 0% 0 0)", skewX: 0, duration: 0.9 },
          0.15 + i * 0.15
        );
      });

      textTl.fromTo(
        desc,
        { opacity: 0, clipPath: "inset(0 0 100% 0)" },
        { opacity: 1, clipPath: "inset(0 0 0% 0)", duration: 0.8 },
        0.5
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return { sectionRef };
}