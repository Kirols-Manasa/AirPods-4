 // Animation.tsx
"use client";

import { useRef, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export function useCartAnimation() {
  const sectionRef = useRef<HTMLElement>(null);
  const elementsRef = useRef<{
    label: HTMLElement | null;
    heading: HTMLElement | null;
    heroImg: HTMLElement | null;
    heroPhoto: HTMLElement | null;
    hero: HTMLElement | null;
    heroCaption: HTMLElement | null;
    minis: HTMLElement[];
    miniPhotoElements: (HTMLElement | null)[];
    miniCaptionElements: (HTMLElement | null)[];
  }>({
    label: null,
    heading: null,
    heroImg: null,
    heroPhoto: null,
    hero: null,
    heroCaption: null,
    minis: [],
    miniPhotoElements: [],
    miniCaptionElements: [],
  });
  const animationSetupRef = useRef(false);
  const eventListenersRef = useRef<Array<{ element: HTMLElement; handler: any; eventType: string }>>([]);

  const cleanupEventListeners = useCallback(() => {
    eventListenersRef.current.forEach(({ element, handler, eventType }) => {
      element.removeEventListener(eventType, handler);
    });
    eventListenersRef.current = [];
  }, []);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section || animationSetupRef.current) return;

      // ── Batch DOM queries ────────────────────────────────
      const label = section.querySelector<HTMLElement>("[data-cart-label]");
      const heading = section.querySelector<HTMLElement>("[data-cart-heading]");
      const heroImg = section.querySelector<HTMLElement>("[data-cart-hero-img]");
      const heroPhoto = section.querySelector<HTMLElement>("[data-cart-hero-photo]");
      const hero = section.querySelector<HTMLElement>("[data-cart-hero]");
      const heroCaption = section.querySelector<HTMLElement>("[data-cart-hero-caption]");
      const minis = Array.from(section.querySelectorAll<HTMLElement>("[data-cart-mini]"));
      const miniPhotoElements = minis.map(m => m.querySelector<HTMLElement>("[data-cart-mini-photo]"));
      const miniCaptionElements = minis.map(m => m.querySelector<HTMLElement>("[data-cart-mini-caption]"));

      elementsRef.current = {
        label,
        heading,
        heroImg,
        heroPhoto,
        hero,
        heroCaption,
        minis,
        miniPhotoElements,
        miniCaptionElements,
      };

      animationSetupRef.current = true;

      const ctx = gsap.context(() => {
        const {
          label,
          heading,
          heroImg,
          heroPhoto,
          hero,
          heroCaption,
          minis,
          miniPhotoElements,
          miniCaptionElements,
        } = elementsRef.current;

        // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        // GPU optimization — add during animation only
        // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        const elementsToOptimize = [heroImg, heroPhoto, heroCaption, label, heading, ...minis].filter(Boolean) as HTMLElement[];
        gsap.set(elementsToOptimize, {
          willChange: "transform, opacity",
        });

        const ST_BASE = {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none none",
          fastScrollEnd: true,
        };

        // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        // 1. HEADER — label first, heading after
        // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        const headerTl = gsap.timeline({
          scrollTrigger: ST_BASE,
          defaults: { ease: "power4.out" },
        });

        if (label) {
          headerTl.fromTo(
            label,
            { opacity: 0, y: 8 },
            { opacity: 1, y: 0, duration: 0.5 }
          );
        }

        if (heading) {
          headerTl.fromTo(
            heading,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.75 },
            "-=0.25"
          );
        }

        // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        // 2. HERO IMAGE
        // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        if (heroImg) {
          gsap.fromTo(
            heroImg,
            { opacity: 0, y: -40, scale: 0.96 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              ease: "expo.out",
              duration: 1.3,
              delay: 0.2,
              scrollTrigger: ST_BASE,
            }
          );
        }

        if (heroPhoto) {
          gsap.fromTo(
            heroPhoto,
            { scale: 1.1, y: -15 },
            {
              scale: 1,
              y: 0,
              ease: "expo.out",
              duration: 1.5,
              delay: 0.2,
              scrollTrigger: ST_BASE,
            }
          );

          // Parallax during scroll
          gsap.fromTo(
            heroPhoto,
            { y: -25 },
            {
              y: 25,
              ease: "none",
              scrollTrigger: {
                trigger: hero,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.6,
                fastScrollEnd: true,
              },
            }
          );
        }

        // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        // 3. CAPTION
        // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        if (heroCaption) {
          gsap.fromTo(
            heroCaption,
            { opacity: 0, y: 22 },
            {
              opacity: 1,
              y: 0,
              ease: "power3.out",
              duration: 0.85,
              delay: 0.65,
              scrollTrigger: ST_BASE,
            }
          );
        }

        // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        // 4. MINIS — batched animations
        // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        const minisTrigger = section.querySelector("[data-cart-minis]") ?? section;

        minis.forEach((mini, i) => {
          const miniPhoto = miniPhotoElements[i];
          const miniCaption = miniCaptionElements[i];
          const baseDelay = 0.3 + i * 0.1;

          // Mini card entrance
          gsap.fromTo(
            mini,
            { opacity: 0, y: 28, scale: 0.97 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              ease: "power4.out",
              duration: 0.8,
              delay: baseDelay,
              scrollTrigger: {
                trigger: minisTrigger,
                start: "top 85%",
                toggleActions: "play none none none",
                fastScrollEnd: true,
              },
            }
          );

          if (miniPhoto) {
            // Parallax on mini photo
            gsap.fromTo(
              miniPhoto,
              { y: -10 },
              {
                y: 10,
                ease: "none",
                scrollTrigger: {
                  trigger: mini,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: 1,
                  fastScrollEnd: true,
                },
              }
            );

            // Hover interactions
            const handleEnter = () => {
              gsap.to(mini, {
                y: -6,
                duration: 0.45,
                ease: "power3.out",
              });
              gsap.to(miniPhoto, {
                scale: 1.05,
                duration: 0.5,
                ease: "power3.out",
              });
            };

            const handleLeave = () => {
              gsap.to(mini, {
                y: 0,
                duration: 0.5,
                ease: "power3.out",
              });
              gsap.to(miniPhoto, {
                scale: 1,
                duration: 0.5,
                ease: "power3.out",
              });
            };

            mini.addEventListener("mouseenter", handleEnter);
            mini.addEventListener("mouseleave", handleLeave);

            eventListenersRef.current.push(
              { element: mini, handler: handleEnter, eventType: 'mouseenter' },
              { element: mini, handler: handleLeave, eventType: 'mouseleave' }
            );
          }

          // Mini caption
          if (miniCaption) {
            gsap.fromTo(
              miniCaption,
              { opacity: 0, y: 10 },
              {
                opacity: 1,
                y: 0,
                ease: "power3.out",
                duration: 0.6,
                delay: baseDelay + 0.12,
                scrollTrigger: {
                  trigger: minisTrigger,
                  start: "top 85%",
                  toggleActions: "play none none none",
                  fastScrollEnd: true,
                },
              }
            );
          }
        });

        // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        // Reduced motion preference
        // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
          gsap.set("[data-cart-label],[data-cart-heading]", { opacity: 1, y: 0 });
          gsap.set("[data-cart-hero-img]", { opacity: 1, y: 0, scale: 1 });
          gsap.set("[data-cart-hero-photo]", { scale: 1, y: 0 });
          gsap.set("[data-cart-hero-caption]", { opacity: 1, y: 0 });
          gsap.set("[data-cart-mini]", { opacity: 1, y: 0, scale: 1 });
          gsap.set("[data-cart-mini-photo]", { scale: 1, y: 0 });
          gsap.set("[data-cart-mini-caption]", { opacity: 1, y: 0 });
        }
      }, sectionRef);

      return () => {
        cleanupEventListeners();
        ctx.revert();
        const { label, heading, heroImg, heroPhoto, hero, heroCaption, minis } = elementsRef.current;
        const elementsToCleanup = [heroImg, heroPhoto, heroCaption, label, heading, ...minis].filter(Boolean);
        gsap.set(elementsToCleanup, { willChange: "auto" });
      };
    },
    { scope: sectionRef }
  );

  return { sectionRef };
}