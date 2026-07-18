 import Image from "next/image";

export default function Man() {
  return (
    <section className="relative w-full overflow-hidden rounded-3xl" style={{ height: "800px" }}>
      
      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center px-10 sm:px-16 max-w-[520px]">
        
        {/* Label */}
<p className="text-label-sm text-black/40 uppercase tracking-widest mb-6">
  Theater-Like Sound
</p>

{/* Headline */}
<h2 className="text-display text-black mb-6">
  Personalized <br /> Spatial Audio.
</h2>

{/* Description */}
<p className="text-body-md text-black/60 mb-10 max-w-[360px]">
  Sound that surrounds you. With dynamic head tracking, Personalized Spatial Audio places sound all around you to create a three-dimensional listening experience for music, TV shows, and movies.
</p>

{/* Badge */}
<div className="flex items-center gap-3">
  <div className="w-9 h-9 rounded-full bg-black/10 backdrop-blur-sm flex items-center justify-center">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="1.5">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>
  </div>
  <span className="text-label-sm text-black/40 uppercase tracking-widest">
    Dynamic Head Tracking
  </span>
</div>

      </div>

      {/* Image - right side */}
      <div className="absolute top-0 right-0 h-full w-[60%]">
        <Image
          src="/images/man.png"
          alt="Personalized Spatial Audio"
          fill
          className="object-cover object-left"
          priority
        />
      </div>

    </section>
  );
}