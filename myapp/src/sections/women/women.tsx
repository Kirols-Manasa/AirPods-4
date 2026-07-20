 import Image from "next/image";

export default function Women() {
  return (
 <section className="w-full flex flex-col items-center px-6 pt-0 pb-16 relative overflow-hidden"
   style={{ 
  background: "linear-gradient(to bottom, #ffffff 0%, #F5EEF9 30%, #EDE0F5 60%, #E2D0EB 80%, #f9f9f9 100%)" 
}}>

  {/* Image */}
  <div className="w-full max-w-2xl relative z-10">
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
    <p style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "0.08em", lineHeight: 1 }}
      className="text-purple-900/60 uppercase">
      Deeply Personal
    </p>
    <h2 style={{ letterSpacing: "-0.02em", lineHeight: 1.2 }} className="font-semibold text-purple-950">
      <span className="hidden sm:block" style={{ fontSize: "40px" }}>Interact with Siri. Without a word.</span>
      <span className="block sm:hidden" style={{ fontSize: "32px" }}>Interact with Siri. Without a word.</span>
    </h2>
    <p className="siri-text" style={{ color: "rgba(60,0,80,0.5)" }}>
      Siri Interactions let you nod your head yes or shake your head no to respond to Siri<br />
      announcements. Whether you're in a crowded space or your hands are full, you're always in<br />
      control.
    </p>
  </div>
  

</section>
  );
}