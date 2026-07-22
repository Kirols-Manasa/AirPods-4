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

  const onCompleteRef = useRef(onComplete);
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    const overlay = overlayRef.current;
    const logo = logoRef.current;
    if (!overlay || !logo) return;

    // ============================
    window.scrollTo(0, 0);
    // ============================
    document.body.style.overflow = "hidden";

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = "";
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
  }, []);

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
        opacity: 0,
        willChange: "opacity",
      }}
    >
      <div
        ref={logoRef}
        style={{
          opacity: 0,
          willChange: "opacity",
        }}
      >
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