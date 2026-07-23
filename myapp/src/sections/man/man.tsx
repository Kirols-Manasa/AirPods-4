 "use client";

import Image from "next/image";
import { memo } from "react";
import { useManAnimation } from "./Animation";

const Man = memo(function Man() {
  const { sectionRef } = useManAnimation();

  return (
    <div className="grid grid-cols-4 sm:grid-cols-8 lg:grid-cols-12 xl:grid-cols-12">
      <section
        ref={sectionRef}
        className="
          col-span-4 sm:col-span-8 lg:col-span-12 xl:col-span-12
          relative w-full overflow-hidden rounded-3xl
          h-[560px] sm:h-[680px] lg:h-[800px]
        "
      >
        <div
          className="
            relative z-10 h-full flex flex-col justify-center
            px-6 sm:px-10 lg:px-16
            max-w-[280px] sm:max-w-[380px] lg:max-w-[520px]
          "
        >
          <p data-label style={{ clipPath: "inset(0 100% 0 0)" }}
            className="text-black/40 uppercase tracking-widest mb-4 sm:mb-6 text-[10px] sm:text-xs lg:text-label-sm"
          >
            Theater-Like Sound
          </p>

          <h2 className="font-semibold text-black mb-4 sm:mb-6 text-2xl sm:text-4xl lg:text-display leading-tight">
            <span data-headline style={{ clipPath: "inset(0 100% 0 0)" }} className="block">Personalized</span>
            <span data-headline style={{ clipPath: "inset(0 100% 0 0)" }} className="block">Spatial Audio.</span>
          </h2>

          <p data-description style={{ clipPath: "inset(0 0 100% 0)" }}
            className="text-black/60 mb-6 sm:mb-10 hidden sm:block text-sm lg:text-body-md max-w-[260px] sm:max-w-[300px] lg:max-w-[360px]"
          >
            Sound that surrounds you. With dynamic head tracking, Personalized
            Spatial Audio places sound all around you to create a
            three-dimensional listening experience for music, TV shows, and
            movies.
          </p>

          <div data-badge style={{ clipPath: "inset(0 100% 0 0)" }} className="flex items-center gap-2 sm:gap-3">
            <div className="rounded-full bg-black/10 backdrop-blur-sm flex items-center justify-center w-7 h-7 sm:w-9 sm:h-9">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="1.5" className="sm:w-[18px] sm:h-[18px]">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
              </svg>
            </div>
            <span className="text-black/40 uppercase tracking-widest text-[9px] sm:text-[10px] lg:text-label-sm">
              Dynamic Head Tracking
            </span>
          </div>
        </div>

        <div data-image className="absolute top-0 right-0 h-full w-[55%] sm:w-[58%] lg:w-[60%]">
          <Image
            src="/images/man.webp"
            alt="Personalized Spatial Audio"
            fill
            sizes="(max-width: 640px) 55vw, (max-width: 1024px) 58vw, 60vw"
            className="object-cover object-left"
            loading="lazy"
            quality={75}
            decoding="async"
            placeholder="empty"
          />
        </div>
      </section>
    </div>
  );
});

export default Man;