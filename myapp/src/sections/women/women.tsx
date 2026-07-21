 "use client";

import Image from "next/image";
import { useWomenAnimation } from "./Animation";

export default function Women() {
  const { sectionRef } = useWomenAnimation();

  return (
    <section
      ref={sectionRef}
      className="w-full flex flex-col items-center px-6 pt-0 pb-16 relative"
      style={{
        background: "linear-gradient(to bottom, #ffffff 0%, #F5EEF9 30%, #EDE0F5 60%, #E2D0EB 80%, #f9f9f9 100%)",
      }}
    >
      {/* Image */}
      <div
        data-image
        className="w-full max-w-2xl relative z-10"
      >
        <Image
          src="/images/women.webp"
          alt="Interact with Siri"
          width={1280}
          height={1400}
          className="w-full h-auto object-contain"
          priority
        />
      </div>

      {/* Text */}
      <div className="text-center mt-10 flex flex-col gap-4 relative z-10">
        <p
          data-label
          style={{
            opacity: 0,
            clipPath: "inset(0 100% 0 0)",
            fontSize: "12px",
            fontWeight: 600,
            letterSpacing: "0.08em",
            lineHeight: 1,
          }}
          className="text-purple-900/60 uppercase"
        >
          Deeply Personal
        </p>

        <h2
          style={{ letterSpacing: "-0.02em", lineHeight: 1.2 }}
          className="font-semibold text-purple-950"
        >
          <span
            data-headline
            style={{ opacity: 0, clipPath: "inset(0 100% 0 0)", fontSize: "40px", display: "block" }}
            className="hidden sm:block"
          >
            Interact with Siri. Without a word.
          </span>
          <span
            data-headline
            style={{ opacity: 0, clipPath: "inset(0 100% 0 0)", fontSize: "32px", display: "block" }}
            className="block sm:hidden"
          >
            Interact with Siri. Without a word.
          </span>
        </h2>

        <p
          data-desc
          style={{ opacity: 0, clipPath: "inset(0 0 100% 0)", color: "rgba(60,0,80,0.5)" }}
          className="siri-text"
        >
          Siri Interactions let you nod your head yes or shake your head no to respond to Siri
          <br />
          announcements. Whether you're in a crowded space or your hands are full, you're always in
          <br />
          control.
        </p>
      </div>
    </section>
  );
}