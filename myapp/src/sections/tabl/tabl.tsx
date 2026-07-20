 "use client";

export default function Tabl() {
  return (
    <>
      {/* Section 2 - Say it in a way only you can */}
      <section className="w-full bg-[#f5f5f7] py-20 px-4 overflow-hidden">
        <div className="max-w-[1280px] mx-auto flex flex-col items-center">

          {/* النص فوق */}
          <div className="text-center mb-10">
            <h2 className="text-[40px] max-lg:text-[32px] max-md:text-[28px] font-semibold tracking-[-0.02em] leading-[1.2] text-[#1d1d1f]">
              Say it in a way only you can.
            </h2>
            <p className="text-[17px] max-md:text-[15px] text-[#1d1d1f]/80 mt-3 leading-[1.6]">
              Discover engraving options for AirPods.<br />
              Mix emoji, names, initials, and numbers.
            </p>
            <button
  onClick={() => {}}
  className="mt-3 text-[17px] text-[#0071e3] hover:underline cursor-pointer bg-transparent border-none p-0"
>
  Buy AirPods &rsaquo;
</button>
          </div>

          {/* الصورة */}
          <img
            src="/images/tabl.jpg"
            alt="AirPods engraving"
            className="w-full max-w-[900px] object-contain"
          />

        </div>
      </section>
    </>
  );
}