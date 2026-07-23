 "use client";

import { useRef, useCallback, startTransition } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function useEngineeredAnimations() {
  const section = useRef<HTMLElement>(null);
  const label = useRef<HTMLParagraphElement>(null);
  const headline = useRef<HTMLHeadingElement>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const card = useRef<HTMLDivElement>(null);
  const imagesGrid = useRef<HTMLDivElement>(null);
  const bigImageWrapper = useRef<HTMLDivElement>(null);
  const bigImageInner = useRef<HTMLDivElement>(null);
  const airpodWrapper = useRef<HTMLDivElement>(null);
  const airpodInner = useRef<HTMLDivElement>(null);
  const h2Wrapper = useRef<HTMLDivElement>(null);
  const h2Inner = useRef<HTMLDivElement>(null);

  const contextRef = useRef<ReturnType<typeof gsap.context> | null>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const hasAnimatedRef = useRef(false);

  const addWordRef = useCallback((el: HTMLSpanElement | null) => {
    if (el && !wordRefs.current.includes(el)) {
      wordRefs.current.push(el);
    }
  }, []);

  useGSAP(
    () => {
      if (!section.current || hasAnimatedRef.current) return;

      const animationFrame = requestAnimationFrame(() => {
        startTransition(() => {
          hasAnimatedRef.current = true;

          contextRef.current = gsap.context(() => {
            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: section.current!,
                start: "top 90%",
                toggleActions: "play none none none",
                fastScrollEnd: true,
                preventOverlaps: true,
              },
            });
            timelineRef.current = tl;

            if (label.current) {
              tl.fromTo(
                label.current,
                { clipPath: "inset(0 100% 0 0)" },
                {
                  clipPath: "inset(0 0% 0 0)",
                  duration: 0.5,
                  ease: "power3.out",
                }
              );
            }

            const validWordRefs = wordRefs.current.filter(Boolean);
            if (validWordRefs.length > 0) {
              tl.fromTo(
                validWordRefs,
                { clipPath: "inset(0% 0 100% 0)", yPercent: 30 },
                {
                  clipPath: "inset(0% 0 0% 0)",
                  yPercent: 0,
                  duration: 0.6,
                  ease: "power3.out",
                  stagger: 0.05,
                },
                "-=0.25"
              );
            }

            if (card.current) {
              tl.fromTo(
                card.current,
                {
                  clipPath: "circle(0% at 0% 50%)",
                  scale: 0.94,
                  boxShadow: "0 0px 0px rgba(0,0,0,0)",
                  borderColor: "rgba(0,0,0,0)",
                },
                {
                  clipPath: "circle(150% at 0% 50%)",
                  scale: 1,
                  boxShadow: "0 20px 40px -20px rgba(0,0,0,0.15)",
                  borderColor: "rgba(0,0,0,0.12)",
                  duration: 0.8,
                  ease: "power3.out",
                },
                "-=0.4"
              );
            }

            if (imagesGrid.current) {
              tl.fromTo(
                imagesGrid.current,
                {
                  clipPath: "inset(0% 0% 100% 0%)",
                  rotateX: 8,
                  scale: 0.96,
                  transformPerspective: 1000,
                  transformOrigin: "50% 100%",
                },
                {
                  clipPath: "inset(0% 0% 0% 0%)",
                  rotateX: 0,
                  scale: 1,
                  duration: 1,
                  ease: "power3.out",
                },
                "-=0.5"
              );
            }

            if (bigImageInner.current) {
              tl.fromTo(
                bigImageInner.current,
                { scale: 1.25 },
                { scale: 1.08, duration: 1, ease: "power3.out" },
                "-=0.95"
              );
            }

            if (airpodInner.current) {
              tl.fromTo(
                airpodInner.current,
                { scale: 1.3 },
                { scale: 1.1, duration: 0.95, ease: "power3.out" },
                "-=0.95"
              );
            }

            if (h2Inner.current) {
              tl.fromTo(
                h2Inner.current,
                { scale: 1.35 },
                { scale: 1.12, duration: 0.95, ease: "power3.out" },
                "-=0.95"
              );
            }

            if (bigImageWrapper.current) {
              gsap.fromTo(
                bigImageWrapper.current,
                { yPercent: -8 },
                {
                  yPercent: 8,
                  ease: "none",
                  scrollTrigger: {
                    trigger: section.current!,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1,
                    fastScrollEnd: true,
                  },
                }
              );
            }

            if (airpodInner.current) {
              gsap.fromTo(
                airpodInner.current,
                { yPercent: -14, scale: 1.17 },
                {
                  yPercent: 14,
                  scale: 1.08,
                  ease: "none",
                  scrollTrigger: {
                    trigger: section.current!,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1,
                    fastScrollEnd: true,
                  },
                }
              );
            }

            if (h2Inner.current) {
              gsap.fromTo(
                h2Inner.current,
                { yPercent: -20, scale: 1.2 },
                {
                  yPercent: 20,
                  scale: 1.08,
                  ease: "none",
                  scrollTrigger: {
                    trigger: section.current!,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1,
                    fastScrollEnd: true,
                  },
                }
              );
            }

            if (imagesGrid.current) {
              gsap.fromTo(
                imagesGrid.current,
                { rotateX: -1.5 },
                {
                  rotateX: 1.5,
                  ease: "none",
                  scrollTrigger: {
                    trigger: section.current!,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1,
                    fastScrollEnd: true,
                  },
                }
              );
            }
          }, section);
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
    { scope: section, dependencies: [] }
  );

  return {
    section,
    label,
    headline,
    addWordRef,
    card,
    imagesGrid,
    bigImageWrapper,
    bigImageInner,
    airpodWrapper,
    airpodInner,
    h2Wrapper,
    h2Inner,
  };
}