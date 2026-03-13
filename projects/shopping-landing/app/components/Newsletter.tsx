"use client";

/**
 * Newsletter — email subscription form with client-side validation.
 *
 * This is the only "use client" component in the project because it needs
 * React state (email value, submission status, validation error). All other
 * sections are Server Components.
 *
 * Submission behaviour (MVP): validation runs client-side only; on success the
 * form is replaced with a confirmation message. There is no backend integration
 * — wire `handleSubmit` to a mailing-list API (e.g. Mailchimp, SendGrid) when
 * that service is available.
 *
 * Accessibility:
 * - The label is visually hidden (sr-only) but present for screen readers.
 * - `aria-invalid` and `aria-describedby` link the input to the error message.
 * - The success state uses `role="status"` and `aria-live="polite"` so screen
 *   readers announce the confirmation without interrupting the user.
 * - `noValidate` disables the browser's native tooltip to ensure our styled
 *   error message is always shown instead.
 */

import { useState } from "react";

/**
 * isValidEmail — lightweight regex check for a plausible email address.
 *
 * Intentionally simple: it rejects obvious non-emails (no @, no dot after @)
 * while accepting edge cases like "user+tag@sub.domain.co". Full RFC 5322
 * validation is not needed for a marketing sign-up form.
 */
function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  /**
   * handleSubmit — validates the email and transitions to the success state.
   *
   * Clears any previous error on each submission attempt so stale messages
   * don't persist if the user corrects then re-submits.
   */
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    if (!isValidEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    // TODO: POST to mailing-list API here before setting submitted state
    setSubmitted(true);
  }

  return (
    <section
      className="py-20 px-6 bg-gray-50"
      aria-label="Newsletter signup"
    >
      <div className="max-w-2xl mx-auto text-center">
        {/* Icon */}
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6" style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M3 8l7.89 5.26a2 2 0 0 0 2.22 0L21 8M5 19h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2z" />
          </svg>
        </div>

        <span className="inline-block text-indigo-600 font-semibold text-sm uppercase tracking-widest mb-3">
          Stay in the Loop
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          Get Exclusive Deals
        </h2>
        <p className="text-gray-500 mb-8 leading-relaxed">
          Subscribe to our newsletter and be the first to know about new arrivals,
          flash sales, and members-only discounts. No spam, ever.
        </p>

        {/* Show success state once the form has been submitted successfully */}
        {submitted ? (
          <div
            className="flex flex-col items-center gap-3 p-8 rounded-2xl bg-green-50 border border-green-200"
            role="status"
            aria-live="polite"
          >
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#16a34a"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <p className="font-bold text-green-800 text-lg">You&apos;re subscribed!</p>
            <p className="text-green-700 text-sm">
              Thanks for joining. Watch your inbox for exclusive deals.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            noValidate
            aria-label="Newsletter subscription form"
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <div className="flex-1">
              {/* Label is sr-only — the placeholder provides visual affordance,
                  while the label is needed for accessibility */}
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                name="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  // Clear the error as soon as the user starts correcting their input
                  if (error) setError("");
                }}
                placeholder="Enter your email address"
                autoComplete="email"
                aria-describedby={error ? "newsletter-error" : undefined}
                aria-invalid={!!error}
                className={`w-full px-5 py-4 rounded-full border text-gray-900 placeholder-gray-400 bg-white text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                  error ? "border-red-400" : "border-gray-200"
                }`}
              />
              {error && (
                <p
                  id="newsletter-error"
                  role="alert"
                  className="mt-2 text-sm text-red-600 text-left px-2"
                >
                  {error}
                </p>
              )}
            </div>
            <button
              type="submit"
              className="px-7 py-4 rounded-full text-white font-semibold text-sm transition-all duration-200 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 whitespace-nowrap"
              style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}
            >
              Subscribe
            </button>
          </form>
        )}

        {/* Trust signals — reassure the user before they hand over their email */}
        <div className="mt-8 flex flex-wrap justify-center gap-6 text-gray-400 text-xs">
          {["No spam, ever", "Unsubscribe anytime", "100K+ subscribers"].map((item) => (
            <span key={item} className="flex items-center gap-1.5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
