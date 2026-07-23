 "use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export function useDetailsAnimation() {
  const sectionRef = useRef<HTMLElement>(null);
  const elementsRef = useRef<{
    headerTitle: HTMLElement | null;
    headerDesc: HTMLElement | null;
    rows: HTMLElement[];
  }>({
    headerTitle: null,
    headerDesc: null,
    rows: [],
  });
  const animationSetupRef = useRef(false);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section || animationSetupRef.current) return;

      animationSetupRef.current = true;

      const ctx = gsap.context(() => {
        // ── Cache elements ─────────────────────────────────
        const headerTitle = section.querySelector<HTMLElement>("[data-header-title]");
        const headerDesc = section.querySelector<HTMLElement>("[data-header-desc]");
        const rows = Array.from(
          section.querySelectorAll<HTMLElement>("[data-row]")
        );

        elementsRef.current = {
          headerTitle,
          headerDesc,
          rows,
        };

        // ── Header animation ───────────────────────────────
        if (headerTitle && headerDesc) {
          const headerTl = gsap.timeline({
            defaults: { ease: "power3.out" },
            scrollTrigger: {
              trigger: headerTitle,
              start: "top 85%",
              toggleActions: "play none none none",
              fastScrollEnd: true,
            },
          });

          headerTl.fromTo(
            headerTitle,
            { clipPath: "inset(0 100% 0 0)" },
            { clipPath: "inset(0 0% 0 0)", duration: 0.8 }
          )
            .fromTo(
              headerDesc,
              { clipPath: "inset(0 100% 0 0)" },
              { clipPath: "inset(0 0% 0 0)", duration: 0.7 },
              0.15
            );
        }

        // ── Rows & cards animation ─────────────────────────
        rows.forEach((row) => {
          const cards = Array.from(
            row.querySelectorAll<HTMLElement>("[data-card]")
          );

          if (cards.length === 0) return;

          cards.forEach((card, i) => {
            const img = card.querySelector<HTMLElement>("[data-card-image]");

            const cardTl = gsap.timeline({
              scrollTrigger: {
                trigger: row,
                start: "top 78%",
                toggleActions: "play none none none",
                fastScrollEnd: true,
              },
              delay: i * 0.15,
            });

            // Card: clip from bottom to top
            cardTl.fromTo(
              card,
              { clipPath: "inset(0 0 100% 0)", borderRadius: "2rem" },
              {
                clipPath: "inset(0 0 0% 0)",
                borderRadius: "1.5rem",
                duration: 0.85,
                ease: "power3.out",
              }
            );

            // Image: scale down to natural size
            if (img) {
              cardTl.fromTo(
                img,
                { scale: 1.1 },
                { scale: 1, duration: 0.85, ease: "power3.out" },
                0
              );
            }
          });
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