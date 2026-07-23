 "use client";

import Image from "next/image";
import { memo, useCallback } from "react";
import Container from "@/Container";
import { useEngineeredAnimations } from "./Animation";

const HEADLINE_WORDS = ["Performance", "you", "can", "hear."];

const Engineered = memo(function Engineered() {
  const {
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
  } = useEngineeredAnimations();

  const handleWordRef = useCallback(addWordRef, [addWordRef]);

  return (
    <section
      ref={section}
      id="engineered"
      className="w-full mt-8 sm:mt-12 lg:mt-16 py-16 sm:py-24 lg:py-32 bg-white overflow-hidden"
      style={{ perspective: "1200px" }}
    >
      <Container>
        <div className="
          grid
          grid-cols-4 gap-x-4 gap-y-8
          sm:grid-cols-8 sm:gap-x-6
          lg:grid-cols-12 lg:gap-x-8
          xl:grid-cols-12 xl:gap-x-8
        ">

          {/* ═══ Left — Text ═══ */}
          <div className="
            col-span-4 flex flex-col gap-6
            sm:col-span-8
            lg:col-span-5
          ">
            <p
              ref={label}
              className="text-label-sm tracking-widest text-black/50 uppercase"
            >
              Engineered for Sound
            </p>

            <h2
              ref={headline}
              className="text-headline-lg font-semibold flex flex-wrap gap-x-[0.3em]"
            >
              {HEADLINE_WORDS.map((word, i) => (
                <span key={i} className="overflow-hidden inline-block pb-1">
                  <span ref={handleWordRef} className="inline-block will-change-transform">
                    {word}
                  </span>
                </span>
              ))}
            </h2>

            {/* Card */}
            <div
              ref={card}
              className="flex flex-col gap-3 rounded-2xl p-6 border border-black/[0.12] hover:border-black/[0.28] transition-colors duration-300 cursor-default"
            >
              <p className="text-body-md font-semibold">
                A massive leap in capabilities.
              </p>

              <p className="text-body-md text-black/60">
                The powerful H2 chip comes to AirPods 4, making audio
                and calls sound better than ever. With intelligent
                features, AirPods 4 adapt to any listening environment
                — even when you want complete silence.
              </p>

              {/* Badge */}
              <div className="flex items-center gap-2 mt-1">
                <div className="w-6 h-6 bg-black rounded-md flex items-center justify-center">
                  <span className="text-white text-[8px] font-bold">H2</span>
                </div>
                <span className="text-label-sm tracking-widest uppercase text-black/60">
                  H2 Computational Audio
                </span>
              </div>
            </div>
          </div>

          {/* ═══ Right — Images Grid ═══ */}
          <div
            ref={imagesGrid}
            className="
              col-span-4 flex flex-col gap-4
              sm:col-span-8
              lg:col-span-7
            "
            style={{ transformStyle: "preserve-3d" }}
          >

            {/* Top — hello.webp */}
            <div
              ref={bigImageWrapper}
              className="
                w-full rounded-[16px] overflow-hidden
                aspect-[16/9] sm:aspect-[16/8] lg:aspect-[16/9]
                relative
              "
            >
              <div ref={bigImageInner} className="absolute inset-0 will-change-transform">
                <Image
                  src="/images/hello.webp"
                  alt="Acoustics"
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 58vw"
                  className="object-cover object-center"
                  priority
                  quality={80}
                  decoding="async"
                  placeholder="empty"
                />
              </div>
            </div>

            {/* Bottom — 2 Images */}
            <div className="grid grid-cols-2 gap-4">

              <div
                ref={airpodWrapper}
                className="
                  rounded-[16px] overflow-hidden
                  aspect-[3/4] sm:aspect-[4/5] lg:aspect-[3/5]
                  relative
                "
              >
                <div ref={airpodInner} className="absolute inset-0 will-change-transform">
                  <Image
                    src="/images/airpod.webp"
                    alt="AirPod"
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 29vw"
                    className="object-cover object-center"
                    loading="lazy"
                    quality={75}
                    decoding="async"
                    placeholder="empty"
                  />
                </div>
              </div>

              <div
                ref={h2Wrapper}
                className="
                  rounded-[16px] overflow-hidden
                  aspect-[3/4] sm:aspect-[4/5] lg:aspect-[3/5]
                  relative
                "
              >
                <div ref={h2Inner} className="absolute inset-0 will-change-transform">
                  <Image
                    src="/images/H2.webp"
                    alt="H2 Chip"
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 29vw"
                    className="object-cover object-center"
                    loading="lazy"
                    quality={75}
                    decoding="async"
                    placeholder="empty"
                  />
                </div>
              </div>

            </div>
          </div>

        </div>
      </Container>
    </section>
  );
});

export default Engineered;