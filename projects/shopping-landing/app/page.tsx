/**
 * HomePage — root page for the ShopZen landing site (App Router: app/page.tsx).
 *
 * This is a Server Component. It imports static data arrays and passes them as
 * props to the relevant section components. Keeping data fetching at the page
 * level (rather than inside individual components) makes it easier to swap in
 * async data sources (e.g. `fetch()` from a CMS) without touching the
 * component files — just change the `products` and `categories` assignments here.
 *
 * Section order mirrors a standard e-commerce landing page flow:
 *   1. Hero         — grabs attention, states value proposition
 *   2. Products     — shows the catalogue immediately below the fold
 *   3. Categories   — helps users self-sort into browsing paths
 *   4. PromoBanner  — conversion nudge (free shipping incentive)
 *   5. Newsletter   — retention / re-engagement capture
 *   6. Footer       — navigation, trust signals, legal
 */

import Hero from "@/app/components/Hero";
import FeaturedProducts from "@/app/components/FeaturedProducts";
import Categories from "@/app/components/Categories";
import PromoBanner from "@/app/components/PromoBanner";
import Newsletter from "@/app/components/Newsletter";
import Footer from "@/app/components/Footer";
import { products } from "@/app/data/products";
import { categories } from "@/app/data/categories";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <FeaturedProducts products={products} />
      <Categories categories={categories} />
      <PromoBanner />
      <Newsletter />
      <Footer />
    </main>
  );
}
