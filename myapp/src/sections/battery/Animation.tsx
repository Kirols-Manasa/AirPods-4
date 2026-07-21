"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useBatteryAnimation() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      if (!section) return;

      const heading = section.querySelector<HTMLElement>("[data-heading]");
      const headingDesc = section.querySelector<HTMLElement>("[data-heading-desc]");
      const cards = section.querySelectorAll<HTMLElement>("[data-card]");
      const caseImg = section.querySelector<HTMLElement>("[data-case-img]");
      const chargerImg = section.querySelector<HTMLElement>("[data-charger-img]");

      if (!heading || !headingDesc || !caseImg || !chargerImg) return;

      // ── النص الكبير + الوصف ──────────────────────────────
      const textTl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          toggleActions: "play none none none",
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

      // ── الكارتين — stagger ───────────────────────────────
      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { clipPath: "inset(0 0 100% 0)" },
          {
            clipPath: "inset(0 0 0% 0)",
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 75%",
              toggleActions: "play none none none",
            },
            delay: 0.3 + i * 0.15,
          }
        );
      });

      // ── صورة الـ case — scale + opacity ──────────────────
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
          },
        }
      );

      // ── صورة الـ charger — parallax مستمر ────────────────
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
          },
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return { sectionRef };
}