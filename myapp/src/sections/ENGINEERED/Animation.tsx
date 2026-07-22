"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function useEngineeredAnimations() {
  const section = useRef<HTMLElement>(null);
  const label = useRef<HTMLParagraphElement>(null);
  const headline = useRef<HTMLHeadingElement>(null);
  const wordRefs = useRef<HTMLSpanElement[]>([]);
  const card = useRef<HTMLDivElement>(null);
  const imagesGrid = useRef<HTMLDivElement>(null);
  const bigImageWrapper = useRef<HTMLDivElement>(null);
  const bigImageInner = useRef<HTMLDivElement>(null);
  const airpodWrapper = useRef<HTMLDivElement>(null);
  const airpodInner = useRef<HTMLDivElement>(null);
  const h2Wrapper = useRef<HTMLDivElement>(null);
  const h2Inner = useRef<HTMLDivElement>(null);

  const addWordRef = (el: HTMLSpanElement | null) => {
    if (el && !wordRefs.current.includes(el)) wordRefs.current.push(el);
  };

  useGSAP(
    () => {
      if (!section.current) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section.current,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });

      // ============================
      // Label
      // ============================
      tl.fromTo(
        label.current,
        { clipPath: "inset(0 100% 0 0)" },
        {
          clipPath: "inset(0 0% 0 0)",
          duration: 0.6,
          ease: "power3.out",
        }
      )

      // ============================
      // Headline words
      // ============================
      .fromTo(
        wordRefs.current,
        { clipPath: "inset(0% 0 100% 0)", yPercent: 30 },
        {
          clipPath: "inset(0% 0 0% 0)",
          yPercent: 0,
          duration: 0.65,
          ease: "power3.out",
          stagger: 0.06,
        },
        "-=0.3"
      )

      // ============================
      // Card
      // ============================
      .fromTo(
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
          duration: 0.9,
          ease: "power3.out",
        },
        "-=0.45"
      )

      // ============================
      // Images grid
      // ============================
      .fromTo(
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
          duration: 1.1,
          ease: "power3.out",
        },
        "-=0.55"
      )

      // ============================
      // Big image inner
      // ============================
      .fromTo(
        bigImageInner.current,
        { scale: 1.25 },
        { scale: 1.08, duration: 1.1, ease: "power3.out" },
        "-=1.05"
      )

      // ============================
      // Airpod inner
      // ============================
      .fromTo(
        airpodInner.current,
        { scale: 1.3 },
        { scale: 1.1, duration: 1, ease: "power3.out" },
        "-=1"
      )

      // ============================
      // H2 inner
      // ============================
      .fromTo(
        h2Inner.current,
        { scale: 1.35 },
        { scale: 1.12, duration: 1, ease: "power3.out" },
        "-=1"
      );

      // ============================
      // Big image parallax
      // ============================
      gsap.fromTo(
        bigImageWrapper.current,
        { yPercent: -8 },
        {
          yPercent: 8,
          ease: "none",
          scrollTrigger: {
            trigger: section.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        }
      );

      // ============================
      // Depth layers parallax
      // ============================
      const depthLayers = [
        { el: airpodInner, y: 14, scale: 0.07 },
        { el: h2Inner, y: 20, scale: 0.1 },
      ];

      depthLayers.forEach(({ el, y, scale }) => {
        gsap.fromTo(
          el.current,
          { yPercent: -y, scale: 1.08 + scale },
          {
            yPercent: y,
            scale: 1.08,
            ease: "none",
            scrollTrigger: {
              trigger: section.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          }
        );
      });

      // ============================
      // Micro-tilt
      // ============================
      gsap.fromTo(
        imagesGrid.current,
        { rotateX: -1.5 },
        {
          rotateX: 1.5,
          ease: "none",
          scrollTrigger: {
            trigger: section.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        }
      );
    },
    { scope: section }
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