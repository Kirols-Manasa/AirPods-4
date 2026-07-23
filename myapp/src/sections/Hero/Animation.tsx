 "use client";

import { useEffect, useRef, useCallback, startTransition } from "react";
import gsap from "gsap";
import { useIntro } from "@/context/IntroContext";

export function useHeroAnimation() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const hasAnimatedRef = useRef(false);
  const contextRef = useRef<ReturnType<typeof gsap.context> | null>(null);
  const { introComplete } = useIntro();

  const querySelectorsSafe = useCallback(() => {
    if (!containerRef.current) return null;

    const reveals = Array.from(
      containerRef.current.querySelectorAll<HTMLElement>("[data-reveal]")
    );
    const cta = containerRef.current.querySelector<HTMLElement>("[data-hero-cta]");
    const image = containerRef.current.querySelector<HTMLElement>("[data-hero-image]");

    if (!cta || !image || reveals.length === 0) return null;

    return { reveals, cta, image };
  }, []);

  const setupAnimation = useCallback(() => {
    if (hasAnimatedRef.current) return;

    const elements = querySelectorsSafe();
    if (!elements) return;

    const { reveals, cta, image } = elements;
    hasAnimatedRef.current = true;

    const container = containerRef.current!;
    contextRef.current = gsap.context(() => {
      const tl = gsap.timeline({ 
        defaults: { ease: "expo.out" },
        paused: false,
      });
      timelineRef.current = tl;

      reveals.forEach((el, i) => {
        tl.fromTo(
          el,
          { clipPath: "inset(0 100% 0 0)", skewX: -8 },
          { clipPath: "inset(0 0% 0 0)", skewX: 0, duration: 0.9 },
          i * 0.15
        );
      });

      tl.fromTo(
        image,
        { opacity: 0, scale: 0.88 },
        { opacity: 1, scale: 1, duration: 1.0 },
        0
      );

      tl.fromTo(
        cta,
        { clipPath: "inset(0 0 100% 0)", opacity: 0 },
        { clipPath: "inset(0 0 0% 0)", opacity: 1, duration: 0.5 },
        "-=0.25"
      );
    }, container);
  }, [querySelectorsSafe]);

  const cleanup = useCallback(() => {
    if (contextRef.current) {
      contextRef.current.revert();
      contextRef.current = null;
    }
    if (timelineRef.current) {
      timelineRef.current.kill();
      timelineRef.current = null;
    }
    hasAnimatedRef.current = false;
  }, []);

  useEffect(() => {
    if (!introComplete) {
      cleanup();
      return;
    }

    // Defer animation setup to next frame
    const animationFrame = requestAnimationFrame(() => {
      startTransition(() => {
        setupAnimation();
      });
    });

    return () => {
      cancelAnimationFrame(animationFrame);
      cleanup();
    };
  }, [introComplete, setupAnimation, cleanup]);

  return { containerRef };
}