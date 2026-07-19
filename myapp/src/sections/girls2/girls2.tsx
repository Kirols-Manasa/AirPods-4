import Image from "next/image";

export default function Girls2() {
  return (
    <section className="relative w-full bg-white overflow-hidden">

      {/* Text فوق */}
      <div className="text-center px-6 pt-20 pb-10 relative z-10">
        <p style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "0.08em", lineHeight: 1 }}
          className="text-black/50 uppercase mb-4">
          Personalized listening
        </p>
        <h2 style={{ fontSize: "64px", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.1 }}
          className="text-black mb-6">
          For your ears only.
        </h2>
        <p style={{ fontSize: "16px", fontWeight: 400, lineHeight: 1.6 }}
          className="text-black/50 max-w-xl mx-auto">
          AirPods 4 feature next-generation Adaptive EQ, which customizes a sound signature
          for your unique ear geometry and fit. And Personalized Volume uses machine learning
          to understand your listening patterns and adapt to your preferences over time.
        </p>
      </div>

      {/* Image كاملة */}
      <div className="relative w-full" style={{ height: "700px" }}>
        <Image
          src="/images/girls.jpg"
          alt="For your ears only"
          fill
          className="object-cover object-top"
          priority
        />
      </div>

    </section>
  );
}