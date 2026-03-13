/**
 * Categories — displays a browsable grid of shopping categories.
 *
 * Each card is a `<button>` rather than an `<a>` because the landing page has
 * no category sub-pages yet; using a button signals "no navigation" to
 * assistive tech and avoids a href="#" anti-pattern. Replace with `<a>` and a
 * real href once category pages exist.
 *
 * Layout: 2 columns on mobile → 3 on sm → 6 on lg (all six fit in one row
 * on desktop without horizontal scrolling).
 */

import type { Category } from "@/app/data/categories";

interface CategoriesProps {
  categories: Category[];
}

/**
 * CategoryCard — interactive tile for a single shopping category.
 *
 * The SVG icon path is stored in data (`category.iconPath`) so the card
 * component stays generic and doesn't need to know the icon shape — only
 * the viewBox dimensions (24×24) and stroke colour are hardcoded here.
 *
 * `group-hover:scale-110` on the icon container gives a subtle depth effect
 * without animating the whole card, which would be visually noisy.
 */
function CategoryCard({ category }: { category: Category }) {
  return (
    <button
      type="button"
      className={`group w-full ${category.color} rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border border-transparent hover:border-indigo-100 flex flex-col items-center text-center focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
      aria-label={`Browse ${category.name} — ${category.itemCount.toLocaleString()} items`}
    >
      {/* Icon container — white background creates contrast against tinted card bg */}
      <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:shadow-md">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#6366f1"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d={category.iconPath} />
        </svg>
      </div>

      {/* Text */}
      <h3 className="font-bold text-gray-900 text-base mb-1">{category.name}</h3>
      <p className="text-gray-500 text-sm mb-3">{category.description}</p>
      {/* Item count badge — uses toLocaleString() for thousands separators */}
      <span className="text-xs font-semibold text-indigo-600 bg-white px-3 py-1 rounded-full shadow-sm">
        {category.itemCount.toLocaleString()} items
      </span>
    </button>
  );
}

/**
 * Categories — section wrapper that renders the header copy and the
 * category grid. Data is injected via props for the same reasons as
 * FeaturedProducts — no direct data dependency in the component.
 */
export default function Categories({ categories }: CategoriesProps) {
  return (
    <section id="categories" className="py-20 px-6 bg-white" aria-label="Shopping categories">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-12">
          <span className="inline-block text-indigo-600 font-semibold text-sm uppercase tracking-widest mb-3">
            Browse by Interest
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Shop by Category
          </h2>
          <p className="text-gray-500 max-w-lg mx-auto">
            Find exactly what you need from our wide selection of curated categories.
          </p>
        </div>

        {/* Category grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
}
