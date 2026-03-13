---
# Task Spec — Contact Us Form

objective: >
  Build a fully functional Contact Us page with a validated form using
  Next.js 15, React 19, and Tailwind CSS v4.

acceptance_criteria:
  1. A /contact route renders a Contact Us page with a form
  2. Form fields: Full Name, Email Address, Subject, Message — all required
  3. Client-side validation — each field shows an inline error if left blank or invalid
  4. Email field validates format (must contain @ and a valid domain)
  5. On successful submission, the form is replaced with a success confirmation message
  6. On submission failure (network/server error), an inline error banner is shown without clearing the form
  7. Submit button shows a loading state while the request is in flight
  8. Form is fully keyboard-navigable and screen-reader accessible (proper labels, aria attributes)
  9. Layout is responsive — works on mobile (< 640px), tablet, and desktop
  10. Unit tests cover: field validation logic, successful submission, and error state

codebase_context:
  # New project — no existing files to reference.
  # Agents should scaffold from scratch using Next.js 15 App Router conventions.

constraints:
  - Use Next.js 15 (App Router), React 19, Tailwind CSS v4 — no older versions
  - No external form libraries (e.g. no React Hook Form, Formik) — use React state and native validation
  - No external UI component libraries (e.g. no shadcn, MUI) — build components from scratch with Tailwind
  - Form submission should POST to a Next.js Route Handler at /api/contact
  - The Route Handler must validate server-side as well (do not trust client-only validation)
  - No database required — the Route Handler can log the submission and return a success response
  - Use TypeScript throughout

output_format: >
  New files:
    - app/contact/page.tsx         (Contact Us page)
    - app/contact/ContactForm.tsx  (form component)
    - app/api/contact/route.ts     (Route Handler)
    - app/contact/page.test.tsx    (unit tests)
  All files follow Next.js 15 App Router structure.

owner: dev-1

priority: medium

notes: >
  This is a demo task to validate the agentic pipeline end-to-end.
  The goal is a clean, production-quality implementation — not a placeholder.
  Tailwind CSS v4 uses the new CSS-first config (no tailwind.config.js unless needed).
  Assume the Next.js project is already initialised — agents should only create
  the files listed in output_format, not scaffold the entire project.

---
