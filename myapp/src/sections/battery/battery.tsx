 import Image from "next/image";

export default function Battery() {
  return (
    <section id="battery" className="w-full bg-[#f9f9f9] px-8 lg:px-16 py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-16">

        {/* Left */}
        <div className="flex flex-col gap-8 max-w-md w-full">

          {/* 30 hrs */}
          <div>
            <h2 style={{ fontSize: "72px", fontWeight: 700, letterSpacing: "-0.04em", lineHeight: 1.1 }}
              className="text-black">
              30 hrs
            </h2>
            <p style={{ fontSize: "16px", fontWeight: 400, lineHeight: 1.6 }}
              className="text-black/50 mt-2">
              of total listening time with the case.
            </p>
          </div>

          {/* Cards */}
          <div className="flex flex-col gap-4">

            {/* Fast charging */}
            <div className="rounded-2xl px-5 py-5 flex items-center gap-4 border border-black/15 hover:border-black/40 transition-all duration-50 cursor-default"
              style={{ background: "transparent" }}>
              <div className="w-9 h-9 flex items-center justify-center flex-shrink-0">
                <Image
                  src="/icon/lightning.png"
                  alt="Fast charging"
                  width={22}
                  height={22}
                  className="object-contain"
                />
              </div>
              <div>
                <p style={{ fontSize: "16px", fontWeight: 500 }} className="text-black">Fast charging.</p>
                <p style={{ fontSize: "14px", fontWeight: 400, lineHeight: 1.6 }} className="text-black/50">
                  5 minutes in the case provides 1 hour of listening.
                </p>
              </div>
            </div>

            {/* Universal Charging */}
            <div className="rounded-2xl px-5 py-5 flex items-center gap-4 border border-black/15 hover:border-black/40 transition-all duration-50 cursor-default"
              style={{ background: "transparent" }}>
              <div className="w-9 h-9 flex items-center justify-center flex-shrink-0">
                <Image
                  src="/icon/wireless-charger.png"
                  alt="Universal Charging"
                  width={22}
                  height={22}
                  className="object-contain"
                />
              </div>
              <div>
                <p style={{ fontSize: "16px", fontWeight: 500 }} className="text-black">Universal Charging.</p>
                <p style={{ fontSize: "14px", fontWeight: 400, lineHeight: 1.6 }} className="text-black/50">
                  Charge with USB-C or an Apple Watch charger.
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Right */}
        <div className="flex flex-col items-center lg:items-end gap-8">
          <Image
            src="/images/caver.png"
            alt="AirPods Case"
            width={350}
            height={350}
            className="object-contain"
            style={{ filter: "drop-shadow(0px 20px 40px rgba(0,0,0,0.35))" }}
          />
          <Image
            src="/images/battary.jpg"
            alt="Charger"
            width={450}
            height={450}
            className="object-contain"
            style={{ filter: "drop-shadow(0px 10px 25px rgba(0,0,0,0.35))" }}
          />
        </div>

      </div>

      {/* ✅ fade للأبيض في الأسفل */}
      <div className="absolute bottom-0 left-0 w-full h-32 z-10"
        style={{ background: "linear-gradient(to bottom, transparent, #ffffff)" }} />

    </section>
  );
}