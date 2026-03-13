---
# Task Spec — Contact Us Form

objective: >
  Build a fully functional Contact Us page with a validated form using
  Next.js 15, React 19, and Tailwind CSS v4. The output is a complete,
  runnable Next.js project that starts with `npm run dev`.

acceptance_criteria:
  1. Running `npm run dev` from the project directory starts the app with no errors
  2. A /contact route renders a Contact Us page with a form
  3. Form fields: Full Name, Email Address, Subject, Message — all required
  4. Client-side validation — each field shows an inline error if left blank or invalid
  5. Email field validates format (must contain @ and a valid domain)
  6. On successful submission, the form is replaced with a success confirmation message
  7. On submission failure (network/server error), an inline error banner is shown without clearing the form
  8. Submit button shows a loading state while the request is in flight
  9. Form is fully keyboard-navigable and screen-reader accessible (proper labels, aria attributes)
  10. Layout is responsive — works on mobile (< 640px), tablet, and desktop
  11. Unit tests cover: field validation logic, successful submission, and error state

project_setup:
  type: new
  stack:
    framework: nextjs-15
    language: typescript
    styling: tailwindcss-v4
    package_manager: npm
    runtime: node-20
  output_directory: projects/contact-us-app
  run_command: cd projects/contact-us-app && npm run dev

constraints:
  - Use Next.js 15 (App Router), React 19, Tailwind CSS v4 — no older versions
  - No external form libraries (e.g. no React Hook Form, Formik) — use React state and native validation
  - No external UI component libraries (e.g. no shadcn, MUI) — build components from scratch with Tailwind
  - Form submission should POST to a Next.js Route Handler at /api/contact
  - The Route Handler must validate server-side as well (do not trust client-only validation)
  - No database required — the Route Handler can log the submission and return a success response
  - Use TypeScript throughout
  - The project must include a README.md with setup and run instructions

output_format: >
  Full Next.js 15 project at projects/contact-us-app/ including:
    - package.json                         (Next.js 15, React 19, Tailwind CSS v4, TypeScript)
    - tsconfig.json
    - next.config.ts
    - postcss.config.mjs                   (Tailwind v4 CSS-first config)
    - .env.example                         (all env vars documented with descriptions)
    - app/globals.css                      (Tailwind v4 @import)
    - app/layout.tsx                       (root layout with metadata)
    - app/page.tsx                         (home page with link to /contact)
    - app/contact/page.tsx                 (Contact Us page)
    - app/contact/ContactForm.tsx          (form component)
    - app/api/contact/route.ts             (Route Handler)
    - app/contact/page.test.tsx            (unit tests)
    - jest.config.ts                       (Jest + @testing-library/react)
    - jest.setup.ts
    - README.md                            (prerequisites, install steps, run command, test command)

ticket_id: AG-1

owner: dev-1

priority: medium

required_access:
  # No external services needed — Route Handler logs to stdout only.
  # Wire up an email provider here when ready for production:
  # - name: SENDGRID_API_KEY
  #   why: To actually send emails from the contact form
  #   where_to_get: https://app.sendgrid.com/settings/api_keys

notes: >
  This is a demo task to validate the agentic pipeline end-to-end.
  The goal is a clean, production-quality implementation that runs locally
  out of the box with `npm install && npm run dev`.
  Tailwind CSS v4 uses CSS-first config — import via `@import "tailwindcss"`
  in globals.css, no tailwind.config.js needed.
  The Coder agent must scaffold ALL files listed in output_format so the
  project is self-contained and runnable without any manual setup.

---
