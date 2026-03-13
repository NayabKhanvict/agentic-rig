/**
 * RootLayout — top-level layout wrapping every page in the app (App Router).
 *
 * Sets the HTML `lang` attribute to "en" for screen reader language detection
 * and defines the global `<head>` metadata via Next.js `Metadata` export.
 *
 * The `antialiased` body class improves font rendering on macOS/retina screens.
 * `globals.css` is imported here (once) rather than in each page so Tailwind's
 * base styles and theme tokens are available app-wide.
 */

import type { Metadata } from "next";
import "./globals.css";

/** OpenGraph-ready metadata surfaced by Next.js in the document <head>. */
export const metadata: Metadata = {
  title: "ShopZen — Modern Shopping Experience",
  description:
    "Discover the latest trends in fashion, electronics, home decor, and more at ShopZen. Free shipping on orders over $50.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900 antialiased">{children}</body>
    </html>
  );
}
