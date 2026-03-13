# ShopZen — Shopping Website Landing Page

A sleek, modern shopping website landing page built with Next.js 15, React 19, and Tailwind CSS v4. Features a hero section, featured products, categories, promotional banner, newsletter signup, and footer — all fully responsive and accessible.

## Prerequisites

- **Node.js** 20 or later ([nodejs.org](https://nodejs.org))
- **npm** 10 or later (bundled with Node 20)

Verify your versions:
```bash
node -v   # should be v20.x.x or higher
npm -v    # should be 10.x.x or higher
```

## Local Setup

```bash
# 1. Clone the repository (if not already done)
git clone <repo-url>
cd agentic-rig

# 2. Navigate to the project directory
cd projects/shopping-landing

# 3. Copy environment file (no real values needed for local dev)
cp .env.example .env.local

# 4. Install dependencies
npm install

# 5. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Running Tests

```bash
# From the projects/shopping-landing directory:
npm test

# Run tests in watch mode:
npm test -- --watch
```

## Building for Production

```bash
npm run build
npm start
```

## Project Structure

```
projects/shopping-landing/
├── app/
│   ├── components/
│   │   ├── Hero.tsx            # Full-height hero with CTA
│   │   ├── FeaturedProducts.tsx # Product grid (6+ products)
│   │   ├── Categories.tsx      # Category grid (6 categories)
│   │   ├── PromoBanner.tsx     # Free shipping promo strip
│   │   ├── Newsletter.tsx      # Email signup (client component)
│   │   └── Footer.tsx          # Footer with nav + social links
│   ├── data/
│   │   ├── products.ts         # Static product data (8 products)
│   │   └── categories.ts       # Static category data (6 categories)
│   ├── globals.css             # Tailwind v4 CSS entry + theme tokens
│   ├── layout.tsx              # Root layout with metadata
│   └── page.tsx                # Landing page composition
├── __tests__/                  # Jest + React Testing Library tests
├── __mocks__/                  # next/image mock for tests
├── jest.config.ts
├── jest.setup.ts
├── next.config.ts
├── postcss.config.mjs
├── tsconfig.json
└── package.json
```

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **UI Library:** React 19
- **Styling:** Tailwind CSS v4 (CSS-first configuration)
- **Language:** TypeScript 5
- **Testing:** Jest 29 + React Testing Library
- **Images:** next/image with picsum.photos placeholders

## External Services

No external services are required. All product and category data is static. Images are served from [picsum.photos](https://picsum.photos) — a free placeholder image service. No API key is needed.
