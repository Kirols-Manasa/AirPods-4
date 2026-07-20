 "use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";

interface IntroProps {
  onComplete?: () => void;
}

export default function Intro({ onComplete }: IntroProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  // [FIX 1] نحفظ onComplete في ref عشان نفصل stability الـ prop
  // عن timing الـ animation ونتجنب إعادة تشغيل الـ effect
  const onCompleteRef = useRef(onComplete);
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    const overlay = overlayRef.current;
    const logo = logoRef.current;
    if (!overlay || !logo) return;

    document.body.style.overflow = "hidden";

    // [FIX 3] شلنا gsap.set لأن opacity:0 اتحطت inline في الـ JSX
    // عشان نضمن مفيش flash قبل ما GSAP يشتغل

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = "";
        // [FIX 1] بنكلم الـ ref مش الـ prop مباشرة
        onCompleteRef.current?.();
      },
    });

    tl
      .to(overlay, {
        opacity: 1,
        duration: 0.4,
        ease: "power2.out",
      })
      .to(
        logo,
        {
          opacity: 1,
          duration: 0.3,
          ease: "power2.out",
        },
        "-=0.1"
      )
      .to({}, { duration: 0.35 })
      .to([overlay, logo], {
        opacity: 0,
        duration: 0.55,
        ease: "power1.inOut",
      });

    return () => {
      document.body.style.overflow = "";
      tl.kill();
    };
  }, []); // [FIX 1] deps array فاضية آمنة دلوقتي

  return (
    <div
      ref={overlayRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "#ffffff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: "none",
        // [FIX 3] opacity:0 هنا بدل gsap.set عشان نمنع أي flash أول render
        opacity: 0,
        // [FIX 5] بنرفع الـ overlay على GPU layer لـ smooth animation
        willChange: "opacity",
      }}
    >
      <div
        ref={logoRef}
        style={{
          // [FIX 3] نفس الحكاية للوجو
          opacity: 0,
          // [FIX 5] GPU layer للوجو كمان
          willChange: "opacity",
        }}
      >
        {/* [FIX 4] بدلنا fill بـ width/height صريحين:
            - بيوفر bandwidth (Next.js بيجيب الحجم الصح من الـ srcset)
            - بيمنع CLS لأن المساحة محجوزة من الأول */}
        <Image
          src="/images/image.png"
          alt="Jones logo"
          width={72}
          height={72}
          style={{ objectFit: "contain" }}
          priority
        />
      </div>
    </div>
  );
}