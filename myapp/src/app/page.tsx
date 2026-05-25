export default function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white px-6">
      <section className="text-center max-w-2xl">
        <h1 className="text-5xl font-bold text-gray-900 leading-tight">
          Build Something Fast 🚀
        </h1>

        <p className="mt-6 text-lg text-gray-600">
          A simple, scalable hero section built with Next.js and Tailwind CSS.
          Clean structure, production-ready foundation, and easy to extend.
        </p>

        <div className="mt-8 flex items-center justify-center gap-4">
          <button className="px-6 py-3 rounded-xl bg-black text-white hover:bg-gray-800 transition">
            Get Started
          </button>

          <button className="px-6 py-3 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 transition">
            Learn More
          </button>
        </div>
      </section>
    </main>
  );
}