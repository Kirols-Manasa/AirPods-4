 // Animation.tsx
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useCartAnimation() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      if (!section) return;

      const label       = section.querySelector<HTMLElement>("[data-cart-label]");
      const heading     = section.querySelector<HTMLElement>("[data-cart-heading]");
      const grid        = section.querySelector<HTMLElement>("[data-cart-grid]");
      const hero        = section.querySelector<HTMLElement>("[data-cart-hero]");
      const heroImg     = section.querySelector<HTMLElement>("[data-cart-hero-img]");
      const heroPhoto   = section.querySelector<HTMLElement>("[data-cart-hero-photo]");
      const heroCaption = section.querySelector<HTMLElement>("[data-cart-hero-caption]");
      const minis       = section.querySelectorAll<HTMLElement>("[data-cart-mini]");

      const ST = {
        trigger: section,
        start: "top 80%",
        toggleActions: "play none none none",
      };

      // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      // 0. القسم كله — دخول بعمق بصري (scale + blur خفيف)
      // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      if (grid) {
        gsap.fromTo(
          grid,
          { opacity: 0, scale: 0.97, filter: "blur(6px)" },
          {
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            ease: "power3.out",
            duration: 1.3,
            scrollTrigger: {
              trigger: section,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      // 1. HEADER — clip-path من اليسار
      // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      const headerTl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: ST,
      });

      if (label) {
        headerTl.fromTo(
          label,
          { opacity: 0, clipPath: "inset(0 100% 0 0)" },
          { opacity: 1, clipPath: "inset(0 0% 0 0)", duration: 0.7 }
        );
      }
      if (heading) {
        headerTl.fromTo(
          heading,
          { opacity: 0, clipPath: "inset(0 100% 0 0)" },
          { opacity: 1, clipPath: "inset(0 0% 0 0)", duration: 0.85 },
          0.12
        );
      }

      // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      // 2. HERO IMAGE — clip-path أفقي + scale
      // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      if (heroImg && heroPhoto) {
        gsap.fromTo(
          heroImg,
          { clipPath: "inset(0 100% 0 0)" },
          {
            clipPath: "inset(0 0% 0 0)",
            ease: "power3.out",
            duration: 1.1,
            delay: 0.2,
            scrollTrigger: ST,
          }
        );

        gsap.fromTo(
          heroPhoto,
          { scale: 1.15, filter: "brightness(0.7) blur(5px)" },
          {
            scale: 1,
            filter: "brightness(1) blur(0px)",
            ease: "power3.out",
            duration: 1.25,
            delay: 0.2,
            scrollTrigger: ST,
          }
        );

        gsap.fromTo(
          heroPhoto,
          { y: -12 },
          {
            y: 12,
            ease: "none",
            scrollTrigger: {
              trigger: hero,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.5,
            },
          }
        );
      }

      // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      // 3. HERO CAPTION — blur fade
      // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      if (heroCaption) {
        gsap.fromTo(
          heroCaption,
          { filter: "blur(8px)", opacity: 0, y: 12 },
          {
            filter: "blur(0px)",
            opacity: 1,
            y: 0,
            ease: "power3.out",
            duration: 0.8,
            delay: 0.45,
            scrollTrigger: ST,
          }
        );
      }

      // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      // 4. MINIS — stagger reveal
      // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      minis.forEach((mini, i) => {
        const miniImg     = mini.querySelector<HTMLElement>("[data-cart-mini-img]");
        const miniPhoto   = mini.querySelector<HTMLElement>("[data-cart-mini-photo]");
        const miniCaption = mini.querySelector<HTMLElement>("[data-cart-mini-caption]");

        gsap.fromTo(
          mini,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            ease: "power3.out",
            duration: 0.75,
            delay: 0.5 + i * 0.1,
            scrollTrigger: ST,
          }
        );

        if (miniImg && miniPhoto) {
          gsap.fromTo(
            miniImg,
            { clipPath: "inset(100% 0 0 0 round 12px)" },
            {
              clipPath: "inset(0% 0 0 0 round 12px)",
              ease: "power3.out",
              duration: 0.9,
              delay: 0.5 + i * 0.1,
              scrollTrigger: ST,
            }
          );

          gsap.fromTo(
            miniPhoto,
            { scale: 1.18, filter: "brightness(0.7) blur(4px)" },
            {
              scale: 1,
              filter: "brightness(1) blur(0px)",
              ease: "power3.out",
              duration: 1.05,
              delay: 0.5 + i * 0.1,
              scrollTrigger: ST,
            }
          );

          gsap.fromTo(
            miniPhoto,
            { y: -8 },
            {
              y: 8,
              ease: "none",
              scrollTrigger: {
                trigger: mini,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.2,
              },
            }
          );

          mini.addEventListener("mouseenter", () => {
            gsap.to(miniPhoto, {
              scale: 1.07,
              filter: "brightness(1.08) saturate(1.1)",
              duration: 0.5,
              ease: "power3.out",
            });
          });
          mini.addEventListener("mouseleave", () => {
            gsap.to(miniPhoto, {
              scale: 1,
              filter: "brightness(1) saturate(1)",
              duration: 0.5,
              ease: "power3.out",
            });
          });
        }

        if (miniCaption) {
          gsap.fromTo(
            miniCaption,
            { opacity: 0, y: 8 },
            {
              opacity: 1,
              y: 0,
              ease: "power3.out",
              duration: 0.6,
              delay: 0.6 + i * 0.1,
              scrollTrigger: ST,
            }
          );
        }
      });

      // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      // 5. REDUCED MOTION
      // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set("[data-cart-grid]",         { opacity: 1, scale: 1, filter: "none" });
        gsap.set("[data-cart-hero-img]",     { clipPath: "none" });
        gsap.set("[data-cart-hero-photo]",   { scale: 1, filter: "none" });
        gsap.set("[data-cart-hero-caption]", { filter: "none", opacity: 1, y: 0 });
        gsap.set("[data-cart-mini]",         { opacity: 1, y: 0 });
        gsap.set("[data-cart-mini-img]",     { clipPath: "none" });
        gsap.set("[data-cart-mini-photo]",   { scale: 1, filter: "none" });
        gsap.set("[data-cart-mini-caption]", { opacity: 1, y: 0 });
        gsap.set("[data-cart-label],[data-cart-heading]", { opacity: 1, clipPath: "none" });
      }

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return { sectionRef };
}