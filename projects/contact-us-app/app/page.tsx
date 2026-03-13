import Link from "next/link";

export default function Home() {
  return (
    <div className="text-center py-20">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        Welcome to Agentic Rig
      </h1>
      <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto">
        We build great software. Have a question or want to work with us?
      </p>
      <Link
        href="/contact"
        className="inline-block bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
      >
        Contact Us
      </Link>
    </div>
  );
}
