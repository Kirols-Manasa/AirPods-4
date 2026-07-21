 "use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useDetailsAnimation() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      if (!section) return;

      // ── Header ──────────────────────────────────────────
      const headerTitle = section.querySelector<HTMLElement>("[data-header-title]");
      const headerDesc = section.querySelector<HTMLElement>("[data-header-desc]");

      if (headerTitle && headerDesc) {
        gsap.timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: {
            trigger: headerTitle,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        })
          .fromTo(headerTitle,
            { clipPath: "inset(0 100% 0 0)" },
            { clipPath: "inset(0 0% 0 0)", duration: 0.8 }
          )
          .fromTo(headerDesc,
            { clipPath: "inset(0 100% 0 0)" },
            { clipPath: "inset(0 0% 0 0)", duration: 0.7 },
            0.15
          );
      }

      // ── Rows — stagger per row ───────────────────────────
      const rows = section.querySelectorAll<HTMLElement>("[data-row]");

      rows.forEach((row) => {
        const cards = row.querySelectorAll<HTMLElement>("[data-card]");

        cards.forEach((card, i) => {
          const img = card.querySelector<HTMLElement>("[data-card-image]");

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: row,
              start: "top 78%",
              toggleActions: "play none none none",
            },
            delay: i * 0.15,
          });

          // الكارت: clip من تحت لفوق
          tl.fromTo(
            card,
            { clipPath: "inset(0 0 100% 0)", borderRadius: "2rem" },
            {
              clipPath: "inset(0 0 0% 0)",
              borderRadius: "1.5rem",
              duration: 0.85,
              ease: "power3.out",
            }
          );

          // الصورة: scale معاكس — بتترتب جوه الكارت
          if (img) {
            tl.fromTo(
              img,
              { scale: 1.1 },
              { scale: 1, duration: 0.85, ease: "power3.out" },
              0
            );
          }
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return { sectionRef };
}