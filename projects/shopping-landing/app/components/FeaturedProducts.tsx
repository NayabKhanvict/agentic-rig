/**
 * FeaturedProducts — displays a responsive grid of product cards.
 *
 * Accepts a `products` array from the parent (page.tsx) rather than fetching
 * data itself, keeping it a pure Server Component and making it straightforward
 * to swap the data source (API, CMS, etc.) later without touching this file.
 *
 * Layout: 1 column on mobile → 2 on sm → 3 on lg (Tailwind grid).
 */

import Image from "next/image";
import type { Product } from "@/app/data/products";

interface FeaturedProductsProps {
  products: Product[];
}

/**
 * StarRating — renders 5 SVG stars, filling those up to `rating` in amber.
 *
 * Uses aria-label on the wrapper so screen readers announce the rating as
 * plain text rather than reading out five individual SVG elements.
 */
function StarRating({ rating, reviewCount }: { rating: number; reviewCount: number }) {
  return (
    <div className="flex items-center gap-1" aria-label={`${rating} out of 5 stars, ${reviewCount} reviews`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          // Fill amber for stars up to `rating`; leave hollow for the rest
          fill={i < rating ? "#f59e0b" : "none"}
          stroke="#f59e0b"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
      <span className="text-gray-500 text-xs ml-1">({reviewCount})</span>
    </div>
  );
}

/**
 * ProductCard — single product tile used inside the FeaturedProducts grid.
 *
 * The image uses `next/image` for automatic optimisation (WebP conversion,
 * lazy loading, correct sizing). The seed-based picsum URL ensures the same
 * placeholder image is served consistently per product during development.
 *
 * The "Add to Cart" button is intentionally non-functional in this landing
 * page MVP — it exists for visual completeness and keyboard/focus testing.
 * Wire it up to a cart store (Zustand, Redux, etc.) when adding e-commerce logic.
 */
function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col">
      {/* Product Image */}
      <div className="relative overflow-hidden bg-gray-50 aspect-[4/3]">
        <Image
          src={`https://picsum.photos/seed/${product.id}/400/300`}
          alt={product.name}
          width={400}
          height={300}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {product.badge && (
          <span
            className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold text-white ${
              product.badge === "Sale"
                ? "bg-rose-500"
                : "bg-indigo-600"
            }`}
          >
            {product.badge}
          </span>
        )}
      </div>

      {/* Product Info */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-semibold text-gray-900 text-sm leading-snug mb-2 line-clamp-2">
          {product.name}
        </h3>
        <StarRating rating={product.rating} reviewCount={product.reviewCount} />
        {/* mt-auto pushes the price/CTA row to the bottom regardless of title length */}
        <div className="mt-auto pt-4 flex items-center justify-between">
          <span className="text-xl font-bold text-gray-900">
            ${product.price.toFixed(2)}
          </span>
          <button
            type="button"
            className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-white transition-all duration-200 hover:scale-105 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}
            aria-label={`Add ${product.name} to cart`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            Add to Cart
          </button>
        </div>
      </div>
    </article>
  );
}

/**
 * FeaturedProducts — section wrapper that renders the header copy and the
 * product grid. Data is injected via props so the component has no direct
 * dependency on the data module and can be reused with any Product array.
 */
export default function FeaturedProducts({ products }: FeaturedProductsProps) {
  return (
    <section id="products" className="py-20 px-6 bg-gray-50" aria-label="Featured products">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-12">
          <span className="inline-block text-indigo-600 font-semibold text-sm uppercase tracking-widest mb-3">
            Handpicked for You
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Featured Products
          </h2>
          <p className="text-gray-500 max-w-lg mx-auto">
            Our most popular picks, loved by thousands of happy shoppers.
          </p>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* View all — placeholder CTA; link to a full catalogue page when one exists */}
        <div className="text-center mt-12">
          <button
            type="button"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full border-2 border-indigo-600 text-indigo-600 font-semibold transition-all duration-200 hover:bg-indigo-600 hover:text-white hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            View All Products
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
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
          </button>
        </div>
      </div>
    </section>
  );
}
