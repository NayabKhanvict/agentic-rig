---
# Task Spec — Shopping Website Landing Page

objective: >
  Build a sleek, modern landing page for a shopping website using
  Next.js 15, React 19, and Tailwind CSS v4. The output is a complete,
  runnable Next.js project that starts with `npm run dev`.

acceptance_criteria:
  1. Running `npm run dev` from the project directory starts the app with no errors
  2. A hero section with a headline, subheading, and a prominent CTA button
  3. A featured products section displaying at least 6 product cards (name, image placeholder, price, "Add to Cart" button)
  4. A categories section showcasing at least 4 shopping categories with icons or visuals
  5. A promotional banner section (e.g. "Free shipping on orders over $50")
  6. A newsletter signup section with an email input and subscribe button
  7. A footer with navigation links, social media icons, and copyright
  8. Fully responsive — works on mobile (< 640px), tablet, and desktop
  9. Smooth hover effects and transitions on interactive elements
  10. Accessible — proper heading hierarchy, alt text on images, keyboard-navigable CTAs

project_setup:
  type: new
  stack:
    framework: nextjs-15
    language: typescript
    styling: tailwindcss-v4
    package_manager: npm
    runtime: node-20
  output_directory: projects/shopping-landing
  run_command: cd projects/shopping-landing && npm run dev

constraints:
  - Use Next.js 15 (App Router), React 19, Tailwind CSS v4 — no older versions
  - No external UI component libraries (no shadcn, MUI, Chakra) — build from scratch with Tailwind
  - No real backend or database — all product/category data is static (hardcoded or in a local data file)
  - Use TypeScript throughout
  - Product images should use placeholder URLs (e.g. picsum.photos)
  - The project must include a README.md with setup and run instructions
  - No external icon libraries — use inline SVGs or Unicode symbols

output_format: >
  Full Next.js 15 project at projects/shopping-landing/ including:
    - package.json                        (Next.js 15, React 19, Tailwind CSS v4, TypeScript)
    - tsconfig.json
    - next.config.ts
    - postcss.config.mjs                  (Tailwind v4 CSS-first config)
    - .env.example
    - .gitignore
    - app/globals.css                     (Tailwind v4 @import)
    - app/layout.tsx                      (root layout with metadata)
    - app/page.tsx                        (landing page — composes all sections)
    - app/components/Hero.tsx
    - app/components/FeaturedProducts.tsx
    - app/components/Categories.tsx
    - app/components/PromoBanner.tsx
    - app/components/Newsletter.tsx
    - app/components/Footer.tsx
    - app/data/products.ts                (static product data)
    - app/data/categories.ts              (static category data)
    - README.md

ticket_id: AG-2

owner: dev-1

priority: medium

required_access:
  # No external services needed — all data is static.

notes: >
  Focus on a clean, modern aesthetic — minimal, high-contrast design
  with good use of whitespace. The page should look like a real storefront.
  Tailwind CSS v4 uses CSS-first config — import via `@import "tailwindcss"`
  in globals.css, no tailwind.config.js needed.

---
