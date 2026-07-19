 "use client";

export default function Tabl() {
  return (
    <section
      className="relative w-full min-h-screen flex items-center overflow-hidden"
      style={{
        backgroundImage: "url('/images/tabl.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
      }}
    >

      {/* Gradient fade للـ Footer */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 h-44 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent 0%, #f5f5f7 100%)" }}
      />

      {/* Content */}
      <div className="relative z-20 w-full max-w-[1280px] mx-auto px-16 py-[120px] flex justify-end max-lg:px-8 max-lg:py-20 max-md:px-4 max-md:py-16 max-md:justify-center max-md:items-end">
        <div className="flex flex-col gap-5 max-w-[440px] max-md:max-w-full">

          <p className="text-[12px] font-semibold tracking-[0.08em] uppercase text-white/75">
            Deeply Personal
          </p>

          <h2
            className="text-[40px] max-lg:text-[32px] max-md:text-[28px] font-semibold tracking-[-0.02em] leading-[1.2] text-white m-0"
            style={{ textShadow: "0 1px 8px rgba(0,0,0,0.18)" }}
          >
            Interact with Siri.<br />
            Without a word.
          </h2>

          <p className="text-[16px] max-md:text-[15px] font-normal leading-[1.6] text-white/85 m-0">
            Siri Interactions let you nod your head yes or shake your head no
            to respond to Siri announcements. Whether you&apos;re in a crowded
            space or your hands are full, you&apos;re always in control.
          </p>

          <div className="flex flex-col gap-4 mt-2">

            <div className="flex items-center gap-[10px] text-[16px] max-md:text-[15px] font-normal text-white">
              <svg className="w-5 h-5 shrink-0 text-white" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.5" />
                <path d="M6.5 10L9 12.5L13.5 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Nod to accept calls
            </div>

            <div className="flex items-center gap-[10px] text-[16px] max-md:text-[15px] font-normal text-white">
              <svg className="w-5 h-5 shrink-0 text-white" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.5" />
                <path d="M7.5 7.5L12.5 12.5M12.5 7.5L7.5 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              Shake to dismiss notifications
            </div>

          </div>
        </div>
      </div>

    </section>
  );
}