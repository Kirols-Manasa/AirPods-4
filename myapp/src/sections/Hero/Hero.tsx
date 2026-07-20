 "use client";

import Image from "next/image";
import Link from "next/link";
import Container from "@/Container";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const reveals = containerRef.current?.querySelectorAll("[data-reveal]");
      const cta = containerRef.current?.querySelector<HTMLElement>("[data-hero-cta]");
      const image = containerRef.current?.querySelector<HTMLElement>("[data-hero-image]");

      if (!cta || !image) return;

      const tl = gsap.timeline({ defaults: { ease: "power4.inOut" } });

      reveals?.forEach((el, i) => {
        tl.fromTo(
          el,
          { clipPath: "inset(0 100% 0 0)", x: -14, skewX: -4 },
          { clipPath: "inset(0 0% 0 0)", x: 0, skewX: 0, duration: 0.95 },
          i * 0.16
        );
      });

      tl.fromTo(
        cta,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" },
        "-=0.3"
      );

      tl.fromTo(
        image,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        0.2
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="hero" className="w-full py-8 sm:py-12 lg:py-16">
      <Container>
        {/* ✅ ref على div واحد يشمل النص والصورة مع بعض */}
        <div ref={containerRef}>

          <div className="flex flex-col items-center text-center gap-4">
            <div className="overflow-hidden">
              <p
                data-reveal
                style={{ clipPath: "inset(0 100% 0 0)" }}
                className="text-display"
              >
                AirPods 4
              </p>
            </div>

            <div className="overflow-hidden">
              <h1
                data-reveal
                style={{ clipPath: "inset(0 100% 0 0)" }}
                className="text-display font-semibold text-black/70"
              >
                Iconic. Now supersonic.
              </h1>
            </div>

            <div
              data-hero-cta
              style={{ opacity: 0 }}
              className="flex items-center gap-6 mt-2"
            >
              <Link
                href="#"
                className="flex items-center px-6 py-2.5 bg-black text-white text-[14px] font-semibold rounded-full hover:opacity-80 transition-opacity"
              >
                Buy
              </Link>
              <span className="text-[14px] text-black/50 font-medium">From $129</span>
            </div>
          </div>

          {/* ✅ الصورة جوا نفس الـ ref div */}
          <div
            data-hero-image
            style={{ opacity: 0 }}
            className="mt-12 sm:mt-16 lg:mt-20 w-full flex justify-center"
          >
            <Image
              src="/images/Airpods.webp"
              alt="AirPods 4"
              width={800}
              height={600}
              className="w-full max-w-[600px] sm:max-w-[700px] lg:max-w-[500px] h-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.15)]"
              priority
            />
          </div>

        </div>
      </Container>
    </section>
  );
}