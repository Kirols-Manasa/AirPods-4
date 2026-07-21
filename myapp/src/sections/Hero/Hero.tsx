 "use client";

import Image from "next/image";
import Link from "next/link";
import Container from "@/Container";

// ============================
// الـ animation في ملف منفصل
// ============================
import { useHeroAnimation } from "./Animation";

export default function Hero() {
  const { containerRef } = useHeroAnimation();

  return (
    <section id="hero" className="w-full py-8 sm:py-12 lg:py-16">
      <Container>
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