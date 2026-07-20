 import Image from "next/image";
import Container from "@/Container";

export default function Engineered() {
  return (
    <section id="engineered" className="w-full mt-8 sm:mt-12 lg:mt-16 py-16 sm:py-24 lg:py-32 bg-white">
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
            <p className="text-label-sm tracking-widest text-black/50 uppercase">
              Engineered for Sound
            </p>

            <h2 className="text-headline-lg font-semibold">
              Performance you can hear.
            </h2>

            {/* Card */}
            <div className="flex flex-col gap-3 rounded-2xl p-6 border border-black/[0.12] hover:border-black/[0.28] transition-colors duration-300 cursor-default">

              <p className="text-body-md font-semibold">
                A massive leap in capabilities.
              </p>

              {/* النص بيجري طبيعي زي الـ Figma بدون كسر قسري */}
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
          <div className="
            col-span-4 flex flex-col gap-4
            sm:col-span-8
            lg:col-span-7
          ">

            {/* Top — hello.jpg */}
            <div className="
              w-full rounded-[16px] overflow-hidden
              aspect-[16/9] sm:aspect-[16/8] lg:aspect-[16/9]
              relative
            ">
              <Image
                src="/images/hello.webp"
                alt="Acoustics"
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 58vw"
                className="object-cover object-center"
                priority
              />
            </div>

            {/* Bottom — 2 Images */}
            <div className="grid grid-cols-2 gap-4">

              <div className="
                rounded-[16px] overflow-hidden
                aspect-[3/4] sm:aspect-[4/5] lg:aspect-[3/5]
                relative
              ">
                <Image
                  src="/images/airpod.webp"
                  alt="AirPod"
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 29vw"
                  className="object-cover object-center"
                />
              </div>

              <div className="
                rounded-[16px] overflow-hidden
                aspect-[3/4] sm:aspect-[4/5] lg:aspect-[3/5]
                relative
              ">
                <Image
                  src="/images/H2.webp"
                  alt="H2 Chip"
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 29vw"
                  className="object-cover object-center"
                />
              </div>

            </div>
          </div>

        </div>
      </Container>
    </section>
  );
}