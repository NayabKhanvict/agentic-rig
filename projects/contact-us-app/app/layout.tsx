import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with our team",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 text-gray-900 antialiased">
        <header className="bg-white border-b border-gray-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4">
            <a
              href="/"
              className="text-lg font-semibold text-blue-600 hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
            >
              TopTechHouse
            </a>
          </div>
        </header>
        <main className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
          {children}
        </main>
        <footer className="mt-16 border-t border-gray-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 text-center text-sm text-gray-500">
            &copy; {new Date().getFullYear()} TopTechHouse. All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  );
}
