/**
 * Hero — full-viewport landing section at the top of the page.
 *
 * Renders a dark gradient background with two blurred decorative circles
 * (aria-hidden), a badge, the main headline, a subheading, two CTA anchors
 * (smooth-scroll to #products and #categories), a stats row, and an animated
 * scroll indicator.
 *
 * This is a Server Component (no "use client" directive needed) — all
 * animations are pure CSS (Tailwind animate-bounce, CSS transitions).
 *
 * The gradient text on "Live Better" uses WebkitBackgroundClip with a
 * transparent fill because CSS `background-clip: text` alone lacks sufficient
 * Safari support without the -webkit- prefix.
 */
export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #0f172a 0%, #1e1b4b 40%, #312e81 70%, #4c1d95 100%)",
      }}
      aria-label="Hero section"
    >
      {/* Decorative background circles — purely visual, hidden from assistive tech */}
      <div
        className="absolute top-[-10%] right-[-5%] w-96 h-96 rounded-full opacity-20 blur-3xl"
        style={{ background: "radial-gradient(circle, #818cf8, transparent)" }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-[-10%] left-[-5%] w-80 h-80 rounded-full opacity-20 blur-3xl"
        style={{ background: "radial-gradient(circle, #ec4899, transparent)" }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Badge — communicates freshness/recency to draw attention */}
        <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 mb-8 backdrop-blur-sm">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" aria-hidden="true" />
          <span className="text-white/90 text-sm font-medium">
            New arrivals every week
          </span>
        </div>

        {/* H1 — only one per page; sets the document's primary heading */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-white leading-tight mb-6">
          Shop Smarter,{" "}
          <span
            className="inline-block"
            style={{
              background: "linear-gradient(90deg, #818cf8, #ec4899)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Live Better
          </span>
        </h1>

        {/* Subheading — expands the value proposition with more detail */}
        <p className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed">
          Discover thousands of curated products across fashion, electronics,
          home decor, and more — delivered straight to your door.
        </p>

        {/* CTA buttons — anchor tags for smooth-scroll; styled as buttons for visual weight */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#products"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-white font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-indigo-400/50"
            style={{
              background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
            }}
          >
            Shop Now
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
          <a
            href="#categories"
            className="inline-flex items-center justify-center px-8 py-4 rounded-full text-white font-semibold text-lg border border-white/30 bg-white/10 backdrop-blur-sm transition-all duration-300 hover:bg-white/20 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-white/30"
          >
            Explore Categories
          </a>
        </div>

        {/* Social proof stats — builds trust before the visitor scrolls further */}
        <div className="mt-16 flex flex-wrap justify-center gap-8 sm:gap-16">
          {[
            { value: "50K+", label: "Products" },
            { value: "2M+", label: "Happy Customers" },
            { value: "4.9★", label: "Avg. Rating" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl font-bold text-white">{stat.value}</p>
              <p className="text-white/60 text-sm mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator — aria-hidden because it conveys no information to screen reader users */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce" aria-hidden="true">
        <span className="text-white/40 text-xs tracking-widest uppercase">Scroll</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-white/40"
        >
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </div>
    </section>
  );
}
