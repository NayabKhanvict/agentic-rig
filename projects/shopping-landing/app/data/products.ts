/**
 * Product data for the ShopZen landing page.
 *
 * Products are static seed data — no API or database backing at this stage.
 * Images are fetched from picsum.photos using `product.id` as the seed,
 * which guarantees a consistent (deterministic) image per product across builds.
 *
 * To add or remove products: edit the `products` array below and update the
 * corresponding tests in `__tests__/FeaturedProducts.test.tsx`.
 */

/** Shape of a single product displayed on the landing page. */
export interface Product {
  /** Unique numeric identifier; also used as the picsum.photos image seed. */
  id: number;
  name: string;
  /** Display price in USD — rendered with two decimal places via `toFixed(2)`. */
  price: number;
  /**
   * Optional badge overlaid on the product image.
   * "Sale" renders in rose-500; any other value renders in indigo-600.
   */
  badge?: string;
  /** Integer 1–5; drives the filled/unfilled star display in StarRating. */
  rating: number;
  /** Total review count shown in parentheses next to the stars. */
  reviewCount: number;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Wireless Noise-Cancelling Headphones",
    price: 129.99,
    badge: "New",
    rating: 5,
    reviewCount: 248,
  },
  {
    id: 2,
    name: "Premium Leather Crossbody Bag",
    price: 89.99,
    badge: "Sale",
    rating: 4,
    reviewCount: 173,
  },
  {
    id: 3,
    name: "Minimalist Mechanical Keyboard",
    price: 149.99,
    rating: 5,
    reviewCount: 312,
  },
  {
    id: 4,
    name: "Organic Cotton Comfort Hoodie",
    price: 59.99,
    badge: "New",
    rating: 4,
    reviewCount: 95,
  },
  {
    id: 5,
    name: "Stainless Steel Water Bottle",
    price: 34.99,
    badge: "Sale",
    rating: 5,
    reviewCount: 521,
  },
  {
    id: 6,
    name: "Smart LED Desk Lamp",
    price: 79.99,
    rating: 4,
    reviewCount: 187,
  },
  {
    id: 7,
    name: "Polarized Sunglasses",
    price: 44.99,
    badge: "New",
    rating: 4,
    reviewCount: 63,
  },
  {
    id: 8,
    name: "Portable Bluetooth Speaker",
    price: 99.99,
    rating: 5,
    reviewCount: 404,
  },
];
