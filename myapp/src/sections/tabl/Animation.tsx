 "use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function useTabIAnimations() {
  const section    = useRef<HTMLElement>(null);
  const headline   = useRef<HTMLHeadingElement>(null);
  const paragraph  = useRef<HTMLParagraphElement>(null);
  const button     = useRef<HTMLButtonElement>(null);
  const imgWrapper = useRef<HTMLDivElement>(null);
  const imgInner   = useRef<HTMLImageElement>(null);

  const wordRefs = useRef<HTMLSpanElement[]>([]);
  const addWordRef = (el: HTMLSpanElement | null) => {
    if (el && !wordRefs.current.includes(el)) wordRefs.current.push(el);
  };

  useGSAP(
    () => {
      if (!section.current) return;

      // ── النصوص ─────────────────────────────────────────────────────────
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section.current,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });

      tl.fromTo(
        wordRefs.current,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: "power3.out", stagger: 0.055 }
      )
      .fromTo(
        paragraph.current,
        { y: 14, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
        "-=0.35"
      )
      .fromTo(
        button.current,
        { y: 10, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" },
        "-=0.3"
      );

      // ── الصورة — clip-path reveal ───────────────────────────────────────
      gsap.fromTo(
        imgWrapper.current,
        { clipPath: "inset(8% 0 8% 0 round 16px)" },
        {
          clipPath: "inset(0% 0 0% 0 round 16px)",
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: imgWrapper.current,
            start: "top 78%",
            toggleActions: "play none none none",
          },
        }
      );

      // ── الصورة — parallax على imgInner ─────────────────────────────────
      // imgInner أكبر من الـ wrapper بـ 10% من فوق وتحت (scale 1.1)
      // عشان الـ yPercent يتحرك من غير ما يظهر أي فراغ
      gsap.set(imgInner.current, { scale: 1.1, yPercent: -5 });

      gsap.to(imgInner.current, {
        yPercent: 5,
        ease: "none",
        scrollTrigger: {
          trigger: imgWrapper.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      });
    },
    { scope: section }
  );

  return {
    section,
    headline,
    paragraph,
    button,
    imgWrapper,
    imgInner,
    addWordRef,
  };
}