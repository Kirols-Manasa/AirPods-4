 "use client";

import { useRef, useCallback, startTransition } from "react";
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
    cards: HTMLElement[];
    images: HTMLElement[];
  }>({
    headerTitle: null,
    headerDesc: null,
    rows: [],
    cards: [],
    images: [],
  });

  const contextRef = useRef<ReturnType<typeof gsap.context> | null>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const hasAnimatedRef = useRef(false);

  const setupElements = useCallback(() => {
    const section = sectionRef.current;
    if (!section) return null;

    const headerTitle = section.querySelector<HTMLElement>("[data-header-title]");
    const headerDesc = section.querySelector<HTMLElement>("[data-header-desc]");
    const rows = Array.from(
      section.querySelectorAll<HTMLElement>("[data-row]")
    );
    const cards = Array.from(
      section.querySelectorAll<HTMLElement>("[data-card]")
    );
    const images = Array.from(
      section.querySelectorAll<HTMLElement>("[data-card-image]")
    );

    if (!headerTitle || !headerDesc || cards.length === 0) {
      return null;
    }

    elementsRef.current = {
      headerTitle,
      headerDesc,
      rows,
      cards,
      images,
    };

    return elementsRef.current;
  }, []);

  useGSAP(
    () => {
      if (!sectionRef.current || hasAnimatedRef.current) return;

      const animationFrame = requestAnimationFrame(() => {
        startTransition(() => {
          const elements = setupElements();
          if (!elements) return;

          hasAnimatedRef.current = true;

          contextRef.current = gsap.context(() => {
            const { headerTitle, headerDesc, cards, images } = elements;

            const tl = gsap.timeline();
            timelineRef.current = tl;

            // ── Header animation ───────────────────────────────
            tl.fromTo(
              headerTitle,
              { clipPath: "inset(0 100% 0 0)" },
              {
                clipPath: "inset(0 0% 0 0)",
                duration: 0.6,
                ease: "power3.out",
              },
              0
            )
              .fromTo(
                headerDesc,
                { clipPath: "inset(0 100% 0 0)" },
                { clipPath: "inset(0 0% 0 0)", duration: 0.5, ease: "power3.out" },
                0.1
              );

            // ── Cards animation (batched) ──────────────────────
            if (cards.length > 0) {
              cards.forEach((card, i) => {
                const img = images[i];

                tl.fromTo(
                  card,
                  { clipPath: "inset(0 0 100% 0)", borderRadius: "2rem" },
                  {
                    clipPath: "inset(0 0 0% 0)",
                    borderRadius: "1.5rem",
                    duration: 0.7,
                    ease: "power3.out",
                  },
                  0.6 + i * 0.08
                );

                if (img) {
                  tl.fromTo(
                    img,
                    { scale: 1.1 },
                    { scale: 1, duration: 0.7, ease: "power3.out" },
                    0.6 + i * 0.08
                  );
                }
              });
            }

            // ── ScrollTrigger setup ────────────────────────────
            ScrollTrigger.create({
              trigger: sectionRef.current!,
              start: "top 78%",
              onEnter: () => {
                tl.play();
              },
              once: true,
              fastScrollEnd: true,
            });
          }, sectionRef);
        });
      });

      return () => {
        cancelAnimationFrame(animationFrame);
        if (contextRef.current) {
          contextRef.current.revert();
          contextRef.current = null;
        }
        if (timelineRef.current) {
          timelineRef.current.kill();
          timelineRef.current = null;
        }
        hasAnimatedRef.current = false;
      };
    },
    { scope: sectionRef, dependencies: [] }
  );

  return { sectionRef };
}