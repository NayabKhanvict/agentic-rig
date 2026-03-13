/**
 * PromoBanner — full-width promotional strip announcing free shipping.
 *
 * This is a static Server Component with no interactivity. The promo details
 * (threshold, coupon code, expiry date) are currently hardcoded. When these
 * need to be CMS-driven or A/B tested, extract them into a data file or fetch
 * them from a configuration API at build time.
 *
 * The "Shop & Save" CTA uses an anchor tag (href="#products") for smooth-scroll
 * navigation to the FeaturedProducts section — no JavaScript needed.
 */
export default function PromoBanner() {
  return (
    <section
      className="py-16 px-6 relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%)",
      }}
      aria-label="Promotional banner"
    >
      {/* Decorative background shapes — purely visual depth cues, hidden from screen readers */}
      <div
        className="absolute top-[-30%] right-[-5%] w-64 h-64 rounded-full opacity-20"
        style={{ background: "radial-gradient(circle, white, transparent)" }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-[-30%] left-[-5%] w-48 h-48 rounded-full opacity-20"
        style={{ background: "radial-gradient(circle, white, transparent)" }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
        {/* Icon + Text */}
        <div className="flex flex-col sm:flex-row items-center gap-5">
          {/* Shopping bag icon — reinforces the retail context of the offer */}
          <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M5 8h14M5 8a2 2 0 1 0-4 0c0 7 6 12 11 12s11-5 11-12a2 2 0 1 0-4 0M5 8v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8" />
              <path d="M10 12a2 2 0 1 0 4 0 2 2 0 0 0-4 0" />
            </svg>
          </div>
          <div>
            <p className="text-white/80 text-sm font-medium uppercase tracking-widest mb-1">
              Limited Time Offer
            </p>
            {/* h2 here maintains document heading hierarchy (h1 is in Hero) */}
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
              Free Shipping on Orders Over{" "}
              <span className="underline decoration-white/50 underline-offset-4">$50</span>
            </h2>
            {/* Coupon code in monospace + background so it reads as a distinct code token */}
            <p className="text-white/70 text-sm mt-2">
              Use code <strong className="text-white font-mono bg-white/20 px-2 py-0.5 rounded">FREESHIP</strong> at checkout. Valid through March 31.
            </p>
          </div>
        </div>

        {/* CTA — whitespace-nowrap prevents the label from wrapping on narrow screens */}
        <a
          href="#products"
          className="flex-shrink-0 inline-flex items-center gap-2 bg-white text-indigo-700 font-bold px-8 py-4 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-white/50 whitespace-nowrap"
        >
          Shop &amp; Save
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    </section>
  );
}
