 "use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function CartAnimation() {
  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      const section = document.querySelector<HTMLElement>(".cart-section");
      if (!section) return;

      const ctx = gsap.context(() => {
        const cards    = gsap.utils.toArray<HTMLElement>("[data-card]", section);
        const arrowBtn = section.querySelector<HTMLElement>(".cart-arrow-bar button");
        if (cards.length === 0) return;

        // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        // 1. CARD + IMAGE — الاتنين بيتحركوا مع بعض بمحاور مختلفة
        //    card:  clip-path inset ← (الحدود بتتكشف)
        //    img:   scale + x أسرع من الكارت = parallax داخلي حقيقي
        //    النتيجة: إحساس إن الصورة بتخرج من جوّا الكارت
        // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        cards.forEach((card, i) => {
          const img = card.querySelector<HTMLElement>("img");
          if (!img) return;

          const delay = i * 0.13;

          // الكارت نفسه — بيتكشف من اليمين
          gsap.fromTo(
            card,
            { clipPath: "inset(0 100% 0 0 round 14px)" },
            {
              clipPath: "inset(0 0% 0 0 round 14px)",
              ease: "power3.out",
              duration: 1,
              delay,
              scrollTrigger: {
                trigger: section,
                start: "top 78%",
                toggleActions: "play none none none",
              },
            }
          );

          // الصورة — scale + x أسرع بـ 30% من الكارت
          // ده اللي بيعمل الإحساس بالعمق
          gsap.fromTo(
            img,
            {
              scale: 1.28,
              x: 55,
              filter: "brightness(0.6) blur(4px)",
            },
            {
              scale: 1,
              x: 0,
              filter: "brightness(1) blur(0px)",
              ease: "power3.out",
              duration: 1.15,       // أطول شوية من الكارت
              delay,
              scrollTrigger: {
                trigger: section,
                start: "top 78%",
                toggleActions: "play none none none",
              },
            }
          );
        });

        // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        // 2. PARALLAX مرتبط بالسكرول — بعد ما الكروت تظهر
        //    كل كارت بمعدل مختلف = طبقات بصرية وأنت بتسكرول
        // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        cards.forEach((card, i) => {
          const img = card.querySelector<HTMLElement>("img");
          if (!img) return;

          gsap.fromTo(
            img,
            { y: -10 - i * 4 },
            {
              y: 10 + i * 4,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.4,
              },
            }
          );
        });

        // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        // 3. TEXT — blur + clip-path من الأسفل، بعد الكارت بـ 350ms
        // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        cards.forEach((card, i) => {
          const caption  = card.querySelector<HTMLElement>(".cart-card-caption");
          if (!caption) return;

          const bold = caption.querySelector<HTMLElement>(".cart-card-bold");

          let descSpan = caption.querySelector<HTMLElement>(".cart-desc-span");
          if (!descSpan) {
            const textNodes = [...caption.childNodes].filter(
              (n) => n.nodeType === Node.TEXT_NODE && n.textContent?.trim()
            );
            if (textNodes.length > 0) {
              descSpan = document.createElement("span");
              descSpan.className = "cart-desc-span";
              textNodes.forEach((n) => {
                descSpan!.appendChild(n.cloneNode());
                n.parentNode?.removeChild(n);
              });
              caption.appendChild(descSpan);
            }
          }

          const targets = [bold, descSpan].filter(Boolean) as HTMLElement[];
          if (!targets.length) return;

          gsap.fromTo(
            targets,
            {
              filter: "blur(6px)",
              opacity: 0,
              y: 8,
            },
            {
              filter: "blur(0px)",
              opacity: 1,
              y: 0,
              ease: "power3.out",
              duration: 0.8,
              stagger: 0.14,
              delay: 0.35 + i * 0.13,
              scrollTrigger: {
                trigger: section,
                start: "top 78%",
                toggleActions: "play none none none",
              },
            }
          );
        });

        // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        // 4. ARROW — circle reveal
        // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        if (arrowBtn) {
          gsap.fromTo(
            arrowBtn,
            { clipPath: "circle(0% at 50% 50%)" },
            {
              clipPath: "circle(75% at 50% 50%)",
              ease: "power3.out",
              duration: 0.65,
              delay: 0.75,
              scrollTrigger: {
                trigger: section,
                start: "top 78%",
                toggleActions: "play none none none",
              },
            }
          );
        }

        // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        // 5. HOVER — scale + brightness على الصورة بس
        // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        cards.forEach((card) => {
          const img = card.querySelector<HTMLElement>(".cart-card-img img");
          if (!img) return;

          card.addEventListener("mouseenter", () => {
            gsap.to(img, {
              scale: 1.07,
              filter: "brightness(1.12) saturate(1.2)",
              duration: 0.5,
              ease: "power3.out",
            });
          });

          card.addEventListener("mouseleave", () => {
            gsap.to(img, {
              scale: 1,
              filter: "brightness(1) saturate(1)",
              duration: 0.5,
              ease: "power3.out",
            });
          });
        });

        // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        // 6. REDUCED MOTION
        // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
          gsap.set([...cards, arrowBtn].filter(Boolean), {
            clipPath: "none", filter: "none", opacity: 1, x: 0, y: 0, scale: 1,
          });
        }

      }, section);

      return () => ctx.revert();
    });

    return () => cancelAnimationFrame(raf);
  }, []);

  return null;
}