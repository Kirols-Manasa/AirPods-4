 "use client";

import { useRef, useCallback, startTransition } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export function useManAnimation() {
  const sectionRef = useRef<HTMLElement>(null);
  const elementsRef = useRef<{
    label: HTMLElement | null;
    headlineLines: HTMLElement[];
    description: HTMLElement | null;
    badge: HTMLElement | null;
  }>({
    label: null,
    headlineLines: [],
    description: null,
    badge: null,
  });

  const contextRef = useRef<ReturnType<typeof gsap.context> | null>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const hasAnimatedRef = useRef(false);

  const setupElements = useCallback(() => {
    const section = sectionRef.current;
    if (!section) return null;

    const label = section.querySelector<HTMLElement>("[data-label]");
    const headlineLines = Array.from(
      section.querySelectorAll<HTMLElement>("[data-headline]")
    );
    const description = section.querySelector<HTMLElement>("[data-description]");
    const badge = section.querySelector<HTMLElement>("[data-badge]");

    if (!label || headlineLines.length === 0 || !description || !badge) {
      return null;
    }

    elementsRef.current = {
      label,
      headlineLines,
      description,
      badge,
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
            const { label, headlineLines, description, badge } = elements;

            const tl = gsap.timeline({
              defaults: { ease: "power3.out" },
              scrollTrigger: {
                trigger: sectionRef.current!,
                start: "top 75%",
                toggleActions: "play none none none",
                fastScrollEnd: true,
              },
            });
            timelineRef.current = tl;

            tl.fromTo(
              label,
              { clipPath: "inset(0 100% 0 0)" },
              { clipPath: "inset(0 0% 0 0)", duration: 0.55 }
            );

            headlineLines.forEach((line, i) => {
              tl.fromTo(
                line,
                { clipPath: "inset(0 100% 0 0)", skewX: -5 },
                { clipPath: "inset(0 0% 0 0)", skewX: 0, duration: 0.75 },
                0.1 + i * 0.12
              );
            });

            tl.fromTo(
              description,
              { clipPath: "inset(0 0 100% 0)" },
              { clipPath: "inset(0 0 0% 0)", duration: 0.55 },
              "-=0.25"
            );

            tl.fromTo(
              badge,
              { clipPath: "inset(0 100% 0 0)" },
              { clipPath: "inset(0 0% 0 0)", duration: 0.45 },
              "-=0.1"
            );
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