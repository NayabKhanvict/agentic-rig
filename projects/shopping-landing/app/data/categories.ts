/**
 * Category data for the ShopZen landing page.
 *
 * Each category card in the Categories section is driven by this array.
 * Icons are rendered as inline SVG `<path>` elements — no icon library
 * dependency. `iconPath` holds the raw SVG path `d` attribute value,
 * drawn at 28×28 with stroke "#6366f1" (brand indigo).
 *
 * `color` is a Tailwind background utility (e.g. "bg-indigo-50") applied
 * directly to the card, giving each category a distinct tinted background
 * without needing custom CSS.
 *
 * To add a category: append an entry and source a matching SVG path from
 * Heroicons or a similar outline set.
 */

/** Shape of a single shopping category displayed in the Categories section. */
export interface Category {
  /** Unique numeric identifier used as the React list key. */
  id: number;
  name: string;
  /** Short subtitle shown below the category name (e.g. "Gadgets & Tech"). */
  description: string;
  /**
   * Raw SVG path `d` attribute for the category icon.
   * Rendered inside a 24×24 viewBox with stroke colour #6366f1.
   */
  iconPath: string;
  /**
   * Tailwind background colour class for the card background.
   * Keeps category colours in data so the CategoryCard component stays generic.
   */
  color: string;
  /** Approximate number of products in this category; displayed on the badge. */
  itemCount: number;
}

export const categories: Category[] = [
  {
    id: 1,
    name: "Electronics",
    description: "Gadgets & Tech",
    iconPath:
      "M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2v-4M9 21H5a2 2 0 0 1-2-2v-4m0 0h18",
    color: "bg-indigo-50",
    itemCount: 1240,
  },
  {
    id: 2,
    name: "Fashion",
    description: "Clothing & Accessories",
    iconPath:
      "M16 11V7a4 4 0 0 0-8 0v4M5 9h14l1 12H4L5 9z",
    color: "bg-pink-50",
    itemCount: 3580,
  },
  {
    id: 3,
    name: "Home & Living",
    description: "Decor & Furniture",
    iconPath:
      "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 0 0 1 1h3m10-11l2 2m-2-2v10a1 1 0 0 0-1 1h-3m-6 0a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1m-6 0h16",
    color: "bg-amber-50",
    itemCount: 870,
  },
  {
    id: 4,
    name: "Sports & Outdoors",
    description: "Gear & Equipment",
    iconPath:
      "M3.055 11H5a2 2 0 0 1 2 2v1a2 2 0 0 0 2 2 2 2 0 0 1 2 2v2.945M8 3.935V5.5A2.5 2.5 0 0 0 10.5 8h.5a2 2 0 0 1 2 2 2 2 0 1 0 4 0 2 2 0 0 1 2-2h1.064M15 20.488V18a2 2 0 0 1 2-2h3.064M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z",
    color: "bg-green-50",
    itemCount: 645,
  },
  {
    id: 5,
    name: "Beauty",
    description: "Skincare & Cosmetics",
    iconPath:
      "M4.318 6.318a4.5 4.5 0 0 0 0 6.364L12 20.364l7.682-7.682a4.5 4.5 0 0 0-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 0 0-6.364 0z",
    color: "bg-rose-50",
    itemCount: 1120,
  },
  {
    id: 6,
    name: "Books & Media",
    description: "Reading & Entertainment",
    iconPath:
      "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
    color: "bg-blue-50",
    itemCount: 2300,
  },
];
