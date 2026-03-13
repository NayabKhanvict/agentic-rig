"use client";

import { useState } from "react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface FormFields {
  fullName: string;
  email: string;
  subject: string;
  message: string;
}

type FormErrors = Partial<Record<keyof FormFields, string>>;

// ---------------------------------------------------------------------------
// Validation
// ---------------------------------------------------------------------------

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validate(fields: FormFields): FormErrors {
  const errors: FormErrors = {};

  if (!fields.fullName.trim()) {
    errors.fullName = "Full name is required.";
  }

  if (!fields.email.trim()) {
    errors.email = "Email address is required.";
  } else if (!EMAIL_REGEX.test(fields.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }

  if (!fields.subject.trim()) {
    errors.subject = "Subject is required.";
  }

  if (!fields.message.trim()) {
    errors.message = "Message is required.";
  }

  return errors;
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

interface FieldProps {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}

function Field({ id, label, error, children }: FieldProps) {
  const errorId = `${id}-error`;
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm font-medium text-gray-700">
        {label} <span aria-hidden="true" className="text-red-500">*</span>
      </label>
      {/* Clone children to inject aria-describedby when there is an error */}
      {error
        ? cloneWithAria(children, errorId)
        : children}
      {error && (
        <p
          id={errorId}
          role="alert"
          className="text-sm text-red-600 mt-0.5"
        >
          {error}
        </p>
      )}
    </div>
  );
}

/**
 * Injects `aria-describedby` and `aria-invalid` onto the single React element
 * child when an error is present.
 */
function cloneWithAria(children: React.ReactNode, errorId: string) {
  if (!children || typeof children !== "object") return children;
  const child = children as React.ReactElement<React.HTMLAttributes<HTMLElement>>;
  return {
    ...child,
    props: {
      ...child.props,
      "aria-describedby": errorId,
      "aria-invalid": true,
    },
  };
}

// ---------------------------------------------------------------------------
// Shared input class builders
// ---------------------------------------------------------------------------

function inputClass(hasError: boolean) {
  const base =
    "w-full rounded-lg border px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 " +
    "focus:outline-none focus:ring-2 focus:ring-offset-1 transition-colors";
  return hasError
    ? `${base} border-red-400 focus:ring-red-400`
    : `${base} border-gray-300 focus:ring-blue-500`;
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

const INITIAL_FIELDS: FormFields = {
  fullName: "",
  email: "",
  subject: "",
  message: "",
};

export default function ContactForm() {
  const [fields, setFields] = useState<FormFields>(INITIAL_FIELDS);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
    // Clear per-field error on change
    if (errors[name as keyof FormFields]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmissionError(null);

    const validationErrors = validate(fields);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      // Move focus to the first field with an error for accessibility
      const firstErrorField = Object.keys(validationErrors)[0];
      const el = document.getElementById(firstErrorField);
      el?.focus();
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: fields.fullName.trim(),
          email: fields.email.trim(),
          subject: fields.subject.trim(),
          message: fields.message.trim(),
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(
          (data as { error?: string }).error ||
            "Something went wrong. Please try again."
        );
      }

      setIsSubmitted(true);
    } catch (err) {
      setSubmissionError(
        err instanceof Error
          ? err.message
          : "An unexpected error occurred. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  // ---- Success state -------------------------------------------------------

  if (isSubmitted) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="rounded-xl border border-green-200 bg-green-50 p-8 text-center"
      >
        <div
          aria-hidden="true"
          className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-green-600 text-2xl"
        >
          &#10003;
        </div>
        <h2 className="text-xl font-semibold text-green-800 mb-2">
          Message sent!
        </h2>
        <p className="text-green-700 text-sm">
          Thank you for reaching out. We&apos;ll get back to you as soon as
          possible.
        </p>
      </div>
    );
  }

  // ---- Form state ----------------------------------------------------------

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-label="Contact form"
      className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 sm:p-8 flex flex-col gap-6"
    >
      {/* Submission error banner */}
      {submissionError && (
        <div
          role="alert"
          aria-live="assertive"
          className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          <strong className="font-medium">Error: </strong>
          {submissionError}
        </div>
      )}

      {/* Full Name */}
      <Field id="fullName" label="Full Name" error={errors.fullName}>
        <input
          id="fullName"
          name="fullName"
          type="text"
          autoComplete="name"
          placeholder="Jane Smith"
          value={fields.fullName}
          onChange={handleChange}
          disabled={isSubmitting}
          className={inputClass(!!errors.fullName)}
        />
      </Field>

      {/* Email Address */}
      <Field id="email" label="Email Address" error={errors.email}>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="jane@example.com"
          value={fields.email}
          onChange={handleChange}
          disabled={isSubmitting}
          className={inputClass(!!errors.email)}
        />
      </Field>

      {/* Subject */}
      <Field id="subject" label="Subject" error={errors.subject}>
        <input
          id="subject"
          name="subject"
          type="text"
          placeholder="How can we help?"
          value={fields.subject}
          onChange={handleChange}
          disabled={isSubmitting}
          className={inputClass(!!errors.subject)}
        />
      </Field>

      {/* Message */}
      <Field id="message" label="Message" error={errors.message}>
        <textarea
          id="message"
          name="message"
          rows={5}
          placeholder="Tell us more about your enquiry..."
          value={fields.message}
          onChange={handleChange}
          disabled={isSubmitting}
          className={`${inputClass(!!errors.message)} resize-y`}
        />
      </Field>

      {/* Submit */}
      <div className="flex items-center justify-between gap-4 pt-2">
        <p className="text-xs text-gray-500">
          <span aria-hidden="true" className="text-red-500">*</span>{" "}
          Required fields
        </p>
        <button
          type="submit"
          disabled={isSubmitting}
          aria-busy={isSubmitting}
          className="inline-flex items-center gap-2 bg-blue-600 text-white font-semibold
            px-6 py-2.5 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2
            focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-60
            disabled:cursor-not-allowed transition-colors text-sm"
        >
          {isSubmitting ? (
            <>
              <svg
                aria-hidden="true"
                className="h-4 w-4 animate-spin"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                />
              </svg>
              Sending…
            </>
          ) : (
            "Send Message"
          )}
        </button>
      </div>
    </form>
  );
}
