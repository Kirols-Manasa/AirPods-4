 import Image from "next/image";

export default function Details() {
  return (
    <section id="details" className="w-full py-12 px-6 lg:px-10">

      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-xl sm:text-2xl font-semibold text-black mb-2">
          Redesigned for comfort. How fitting.
        </h2>
        <p className="text-sm text-black/50 max-w-md mx-auto">
          AirPods 4 provide exceptional fit, all-day comfort, and greater stability with your every move.
        </p>
      </div>

      {/* Grid Wrapper */}
      <div className="flex flex-col gap-4">

        {/* Row 1 */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">

          {/* Card 1 — Large */}
          <div className="sm:col-span-7 bg-[#F5F5F7] rounded-3xl flex flex-col items-center justify-between py-14 px-10 min-h-[480px]">
            <div className="flex-1 flex items-center justify-center">
              <Image
                src="/images/5.webp"
                alt="Physical fit-ness"
                width={260}
                height={320}
                className="object-contain mix-blend-multiply"
              />
            </div>
            <div className="text-center mt-8">
              <p className="text-sm font-semibold text-black mb-2">Physical fit-ness.</p>
              <p className="text-xs text-black/50 max-w-[260px]">
                The internal architecture and a refined contour provide a natural and secure fit for more people than ever.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="sm:col-span-5 bg-[#F5F5F7] rounded-3xl flex flex-col items-center justify-between py-14 px-10 min-h-[480px]">
            <div className="flex-1 flex items-center justify-center">
              <Image
                src="/images/2.webp"
                alt="Refined Acoustic Venting"
                width={220}
                height={220}
                className="object-contain mix-blend-multiply"
              />
            </div>
            <div className="text-center mt-8">
              <p className="text-sm font-semibold text-black">
                Refined Acoustic Venting for pressure equalization
              </p>
            </div>
          </div>

        </div>

        {/* Row 2 — 3 equal cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

          <div className="bg-[#F5F5F7] rounded-3xl flex flex-col items-center justify-between py-12 px-10 min-h-[360px]">
            <div className="flex-1 flex items-center justify-center">
              <Image
                src="/images/1.webp"
                alt="Contoured for every ear"
                width={180}
                height={180}
                className="object-contain mix-blend-multiply"
              />
            </div>
            <p className="text-sm font-semibold text-black mt-8 text-center">
              Contoured for every ear
            </p>
          </div>

          <div className="bg-[#F5F5F7] rounded-3xl flex flex-col items-center justify-between py-12 px-10 min-h-[360px]">
            <div className="flex-1 flex items-center justify-center">
              <Image
                src="/images/6.webp"
                alt="Dust, sweat, and water resistant"
                width={180}
                height={180}
                className="object-contain mix-blend-multiply"
              />
            </div>
            <p className="text-sm font-semibold text-black mt-8 text-center">
              Dust, sweat, and water resistant (IP54 rating)
            </p>
          </div>

          <div className="bg-[#F5F5F7] rounded-3xl flex flex-col items-center justify-between py-12 px-10 min-h-[360px]">
            <div className="flex-1 flex items-center justify-center">
              <Image
                src="/images/3.webp"
                alt="Precision machined geometry"
                width={180}
                height={180}
                className="object-contain mix-blend-multiply"
              />
            </div>
            <p className="text-sm font-semibold text-black mt-8 text-center">
              Precision machined geometry
            </p>
          </div>

        </div>

        {/* Row 3 */}
        <div className="bg-[#F5F5F7] rounded-3xl flex flex-col lg:flex-row items-center justify-between p-10 lg:p-14 gap-10">
          <div className="max-w-sm">
            <p className="text-sm font-semibold text-black mb-3">
              Total control at your fingertips.
            </p>
            <p className="text-xs text-black/60 leading-relaxed">
              The{" "}
              <span className="font-medium text-black">updated stem with force sensor</span>{" "}
              lets you control everything with a{" "}
              <span className="font-medium text-black">simple pinch</span>.
              <br />
              Quickly play or pause media, mute or end calls, and use the new camera remote
              <br />
              functionality for the perfect group photo.
            </p>
          </div>
          <Image
            src="/images/4.webp"
            alt="Force sensor stem"
            width={180}
            height={240}
            className="object-contain mix-blend-multiply flex-shrink-0"
          />
        </div>

      </div>
    </section>
  );
}