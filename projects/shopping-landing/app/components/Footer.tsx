/**
 * Footer — site-wide footer with brand info, navigation columns, social links,
 * and a legal bottom bar.
 *
 * Static Server Component — no interactivity required.
 *
 * Link data is defined in module-level constants (`footerLinks`, `socialLinks`)
 * so they can be updated without touching JSX. All href values are "#"
 * placeholders — replace with real route strings when those pages exist.
 *
 * Social icons use inline SVG paths rather than an icon library to avoid
 * adding a dependency for only four icons. Facebook and Pinterest use
 * fill="currentColor" (filled style); Twitter/X and Instagram use
 * stroke="currentColor" (outline style) — this distinction is captured in the
 * `socialLinks` data so the rendering logic stays consistent.
 */

/** Navigation link groups rendered as three separate `<nav>` columns. */
const footerLinks = {
  Shop: ["New Arrivals", "Best Sellers", "Sale", "Gift Cards"],
  Company: ["About Us", "Careers", "Press", "Blog"],
  Support: ["FAQ", "Shipping Policy", "Returns", "Contact Us"],
};

/**
 * Social link descriptor.
 * `path` is the primary SVG `<path>` `d` attribute.
 * `extraPaths` is an optional array of additional paths (used for Instagram's
 * rounded-square outline which requires two separate path elements).
 */
const socialLinks = [
  {
    name: "Twitter / X",
    href: "#",
    path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L2.25 2.25h6.945l4.265 5.638L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117z",
  },
  {
    name: "Instagram",
    href: "#",
    path: "M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z M17.5 6.5h.01",
    extraPaths: ["M7.5 2h9a5.5 5.5 0 0 1 5.5 5.5v9a5.5 5.5 0 0 1-5.5 5.5h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2z"],
  },
  {
    name: "Facebook",
    href: "#",
    path: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z",
  },
  {
    name: "Pinterest",
    href: "#",
    path: "M12 2C6.477 2 2 6.477 2 12c0 4.236 2.636 7.855 6.356 9.312-.088-.791-.167-2.005.035-2.868.181-.78 1.172-4.97 1.172-4.97s-.299-.598-.299-1.482c0-1.388.806-2.428 1.808-2.428.852 0 1.265.64 1.265 1.408 0 .858-.546 2.14-.828 3.33-.236.995.499 1.806 1.476 1.806 1.772 0 3.136-1.866 3.136-4.562 0-2.387-1.715-4.057-4.164-4.057-2.837 0-4.5 2.127-4.5 4.326 0 .857.33 1.774.741 2.276a.3.3 0 0 1 .069.286c-.076.315-.245.995-.278 1.134-.044.183-.145.222-.334.134-1.249-.581-2.03-2.407-2.03-3.874 0-3.154 2.292-6.052 6.608-6.052 3.469 0 6.165 2.473 6.165 5.776 0 3.447-2.173 6.22-5.19 6.22-1.013 0-1.966-.527-2.292-1.148l-.623 2.378c-.226.869-.835 1.958-1.244 2.621.937.29 1.931.446 2.962.446 5.523 0 10-4.477 10-10S17.523 2 12 2z",
  },
];

/**
 * Footer — renders the full site footer including brand column, link columns,
 * social icons, and legal bottom bar.
 *
 * Each link column is wrapped in a `<nav>` with an aria-label so screen reader
 * users can distinguish between "Shop links", "Company links", etc. when
 * navigating by landmarks.
 */
export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400" aria-label="Site footer">
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand column — logo, tagline, social icons */}
          <div>
            <a
              href="/"
              className="inline-flex items-center gap-2 mb-4 group focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded"
              aria-label="ShopZen home"
            >
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
              </div>
              <span className="text-white font-bold text-xl tracking-tight group-hover:text-indigo-400 transition-colors">
                ShopZen
              </span>
            </a>
            <p className="text-sm leading-relaxed mb-6">
              Your go-to destination for curated shopping experiences. Quality
              products, unbeatable prices, and fast delivery.
            </p>

            {/* Social links — icon-only; aria-label on each <a> provides the accessible name */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  aria-label={social.name}
                  className="w-9 h-9 rounded-lg bg-gray-800 flex items-center justify-center text-gray-400 transition-all duration-200 hover:bg-indigo-600 hover:text-white hover:scale-110 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    // Facebook and Pinterest icons use a filled style; others are stroked outlines
                    fill={social.name === "Facebook" || social.name === "Pinterest" ? "currentColor" : "none"}
                    stroke={social.name === "Facebook" || social.name === "Pinterest" ? "none" : "currentColor"}
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d={social.path} />
                    {social.extraPaths?.map((p, i) => (
                      <path key={i} d={p} />
                    ))}
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Link columns — one <nav> per category group for landmark navigation */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <nav key={heading} aria-label={`${heading} links`}>
              <h3 className="text-white font-semibold text-sm uppercase tracking-widest mb-5">
                {heading}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm transition-colors duration-200 hover:text-white focus:outline-none focus:text-white"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Bottom bar — copyright and legal links */}
        <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>
            &copy; 2026 ShopZen, Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {["Privacy Policy", "Terms of Service", "Cookie Settings"].map((item) => (
              <a
                key={item}
                href="#"
                className="transition-colors duration-200 hover:text-white focus:outline-none focus:text-white"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
