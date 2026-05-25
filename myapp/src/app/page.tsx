export default function HomePage() {
  return (
    <main className="relative min-h-screen flex items-center justify-center bg-white overflow-hidden px-6">
      
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-purple-300 blur-3xl opacity-30 rounded-full" />
        <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-blue-300 blur-3xl opacity-30 rounded-full" />
      </div>

      {/* Content */}
      <section className="relative text-center max-w-3xl">
        
        <span className="inline-block px-4 py-2 rounded-full bg-gray-100 text-gray-600 text-sm mb-6">
          🚀 Next-Gen Landing Experience
        </span>

        <h1 className="text-6xl font-extrabold tracking-tight text-gray-900 leading-tight">
          Build Products That Scale Effortlessly
        </h1>

        <p className="mt-6 text-lg text-gray-600 leading-relaxed">
          A modern, production-ready foundation built with Next.js and Tailwind CSS.
          Optimized for performance, scalability, and clean UI systems.
        </p>

        <div className="mt-10 flex items-center justify-center gap-4">
          <button className="px-7 py-3 rounded-2xl bg-black text-white font-medium hover:scale-105 transition">
            Get Started
          </button>

          <button className="px-7 py-3 rounded-2xl border border-gray-300 text-gray-700 hover:bg-gray-50 transition">
            View Docs
          </button>
        </div>

        {/* Optional subtle stats row */}
        <div className="mt-12 flex items-center justify-center gap-10 text-sm text-gray-500">
          <div>
            <span className="block text-lg font-semibold text-gray-900">99.9%</span>
            Uptime
          </div>
          <div>
            <span className="block text-lg font-semibold text-gray-900">Fast</span>
            Performance
          </div>
          <div>
            <span className="block text-lg font-semibold text-gray-900">Scalable</span>
            Architecture
          </div>
        </div>

      </section>
    </main>
  );
}