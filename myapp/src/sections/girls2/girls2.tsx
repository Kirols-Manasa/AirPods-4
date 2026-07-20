 import Image from "next/image";
 export default function Girls2() {
  return (
    <div className="w-full overflow-hidden">
      <section
        className="relative w-full mt-16 sm:mt-24 lg:mt-32"
        style={{ minHeight: "120svh" }}
      >
        <Image
          src="/images/girls.webp"
          alt="For your ears only"
          fill
          sizes="100vw"
          className="object-cover object-center sm:object-top"
          priority
        />

        {/* fade فوق */}
        <div
          className="absolute top-0 left-0 w-full z-10"
          style={{
            height: "30%",
            background: "linear-gradient(to bottom, #ffffff, transparent)",
          }}
        />

        {/* fade تحت */}
        <div
          className="absolute bottom-0 left-0 w-full z-10"
          style={{
            height: "30%",
            background: "linear-gradient(to bottom, transparent, #ffffff)",
          }}
        />

        {/* النص فوق الصورة */}
         <div className="absolute -top-8 sm:top-0 lg:-top-32 left-0 w-full z-20 flex flex-col items-center px-4 sm:px-6">

          {/* label */}
          <p className="text-label-sm text-black/50 uppercase mb-2 sm:mb-4">
            Personalized listening
          </p>

          {/* headline */}
          <h2
            className="text-black mb-3 sm:mb-6 text-center font-bold"
            style={{
              fontSize: "clamp(22px, 5vw, 72px)",
              letterSpacing: "-0.04em",
              lineHeight: 1.1,
            }}
          >
            For your ears only.
          </h2>

          {/* description */}
          <p
            className="text-black/60 text-center mx-auto"
            style={{
              fontSize: "clamp(12px, 3.5vw, 16px)",
              maxWidth: "min(90%, 560px)",
              lineHeight: 1.5,
            }}
          >
            AirPods 4 feature next-generation Adaptive EQ, which customizes a
            sound signature for your unique ear geometry and fit. And
            Personalized Volume uses machine learning to understand your
            listening patterns and adapt to your preferences over time.
          </p>
        </div>

        {/* الكلام التحت */}
        <div className="absolute bottom-4 sm:bottom-8 left-0 w-full z-20 px-3 sm:px-8 lg:px-16">
          <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-10">

            {/* 1 */}
            <div className="flex flex-row gap-2 items-start">
              <div
                className="flex-shrink-0 mt-0.5"
                style={{ width: "clamp(18px, 5vw, 32px)", height: "clamp(18px, 5vw, 32px)" }}
                aria-hidden="true"
              >
                <svg viewBox="0 0 24 24" fill="black" xmlns="http://www.w3.org/2000/svg">
                  <rect x="2" y="6" width="2" height="12" rx="1" />
                  <rect x="6" y="4" width="2" height="16" rx="1" />
                  <rect x="10" y="8" width="2" height="8" rx="1" />
                  <rect x="14" y="4" width="2" height="16" rx="1" />
                  <rect x="18" y="6" width="2" height="12" rx="1" />
                </svg>
              </div>
              <p className="text-black/80" style={{ fontSize: "clamp(11px, 3vw, 16px)" }}>
                <span className="font-semibold text-black">Adaptive EQ</span>{" "}
                tunes music to your ears in real time based on the fit of your AirPods.
              </p>
            </div>

            {/* 2 */}
            <div className="flex flex-row gap-2 items-start">
              <div
                className="flex-shrink-0 mt-0.5"
                style={{ width: "clamp(18px, 5vw, 32px)", height: "clamp(18px, 5vw, 32px)" }}
                aria-hidden="true"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="1.5" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="8" r="4" />
                  <path d="M6 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
                  <path d="M3 10c0 1.5.4 2.9 1 4.1M21 10c0 1.5-.4 2.9-1 4.1" />
                </svg>
              </div>
              <p className="text-black/80" style={{ fontSize: "clamp(11px, 3vw, 16px)" }}>
                <span className="font-semibold text-black">Personalized Spatial Audio</span>{" "}
                uses the TrueDepth camera to create a custom profile based on the geometry of your head.
              </p>
            </div>

            {/* 3 */}
            <div className="flex flex-row gap-2 items-start">
              <div
                className="flex-shrink-0 mt-0.5"
                style={{ width: "clamp(18px, 5vw, 32px)", height: "clamp(18px, 5vw, 32px)" }}
                aria-hidden="true"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="1.5" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="8" r="4" />
                  <path d="M6 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
                  <path d="M5 7c-.6.9-1 2-1 3.1M19 7c.6.9 1 2 1 3.1" />
                </svg>
              </div>
              <p className="text-black/80" style={{ fontSize: "clamp(11px, 3vw, 16px)" }}>
                <span className="font-semibold text-black">Dynamic head tracking</span>{" "}
                makes conversations feel like they're happening in the same room.
              </p>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}