 "use client";

import { useTabIAnimations } from "./Animation";

const HEADLINE_WORDS = ["Say", "it", "in", "a", "way", "only", "you", "can."];

export default function Tabl() {
  const {
    section,
    headline,
    paragraph,
    button,
    imgWrapper,
    imgInner,
    addWordRef,
  } = useTabIAnimations();

  return (
    <section
      ref={section}
      className="w-full py-20 px-4 overflow-hidden"
      style={{ background: "linear-gradient(to bottom, #ffffff 0%, #f5f5f7 120px)" }}
    >
      <div className="max-w-[1280px] mx-auto flex flex-col items-center">

        {/* ── النص ── */}
        <div className="text-center mb-10">

          <h2
            ref={headline}
            className="
              text-[40px] max-lg:text-[32px] max-md:text-[28px]
              font-semibold tracking-[-0.02em] leading-[1.2] text-[#1d1d1f]
              flex flex-wrap justify-center gap-x-[0.25em]
            "
          >
            {HEADLINE_WORDS.map((word, i) => (
              <span
                key={i}
                ref={addWordRef}
                className="inline-block will-change-transform"
              >
                {word}
              </span>
            ))}
          </h2>

          <p
            ref={paragraph}
            className="text-[17px] max-md:text-[15px] text-[#1d1d1f]/80 mt-3 leading-[1.6]"
          >
            Discover engraving options for AirPods.
            <br />
            Mix emoji, names, initials, and numbers.
          </p>

          <button
            ref={button}
            onClick={() => {}}
            className="
              mt-3 text-[17px] text-[#0071e3]
              hover:underline cursor-pointer
              bg-transparent border-none p-0
            "
          >
            Buy AirPods ›
          </button>
        </div>

        {/* ── الصورة ── */}
        <div
          ref={imgWrapper}
          className="w-full max-w-[900px] relative overflow-hidden rounded-[16px]"
        >
          <img
            ref={imgInner}
            src="/images/tabl.webp"
            alt="AirPods engraving"
            className="w-full object-contain block will-change-transform"
          />
        </div>

      </div>
    </section>
  );
}