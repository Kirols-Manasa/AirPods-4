 "use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useIntro } from "@/context/IntroContext";

export function useHeroAnimation() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { introComplete } = useIntro();

  useEffect(() => {
    if (!introComplete) return;

    const ctx = gsap.context(() => {
      const reveals = containerRef.current?.querySelectorAll("[data-reveal]");
      const cta = containerRef.current?.querySelector<HTMLElement>("[data-hero-cta]");
      const image = containerRef.current?.querySelector<HTMLElement>("[data-hero-image]");

      if (!cta || !image) return;

      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

      // النصوص: clip + skew قوي — العمق من السرعة المختلفة بين العناصر
      reveals?.forEach((el, i) => {
        tl.fromTo(
          el,
          { clipPath: "inset(0 100% 0 0)", skewX: -8 },
          { clipPath: "inset(0 0% 0 0)", skewX: 0, duration: 1 },
          i * 0.2
        );
      });

      // الصورة: scale كبير بيدي عمق حقيقي — تبدأ مع النص الأول
      tl.fromTo(
        image,
        { opacity: 0, scale: 0.88 },
        { opacity: 1, scale: 1, duration: 1.1 },
        0
      );

      // CTA: clip vertical سريع
      tl.fromTo(
        cta,
        { clipPath: "inset(0 0 100% 0)" },
        { clipPath: "inset(0 0 0% 0)", duration: 0.5 },
        "-=0.3"
      );
    }, containerRef);

    return () => ctx.revert();
  }, [introComplete]);

  return { containerRef };
}