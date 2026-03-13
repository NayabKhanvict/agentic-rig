# Contact Us App

A fully functional Contact Us page built with **Next.js 15**, **React 19**, and **Tailwind CSS v4**.

## Prerequisites

- Node.js 20 or later
- npm 10 or later

## Getting Started

### Install dependencies

```bash
npm install
```

### Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

Navigate to [http://localhost:3000/contact](http://localhost:3000/contact) to see the Contact Us page.

### Run tests

```bash
npm test
```

### Run tests with coverage

```bash
npm test -- --coverage
```

### Build for production

```bash
npm run build
npm run start
```

## Project Structure

```
app/
  layout.tsx              Root layout with header and footer
  page.tsx                Home page with link to /contact
  globals.css             Tailwind CSS v4 import
  contact/
    page.tsx              /contact route
    ContactForm.tsx       Client-side form component with validation
    page.test.tsx         Unit tests for form logic and UI states
  api/
    contact/
      route.ts            POST /api/contact — server-side validation + logging
__mocks__/
  styleMock.ts            CSS mock for Jest
jest.config.ts            Jest configuration
jest.setup.ts             @testing-library/jest-dom setup
```

## Environment Variables

No environment variables are required for basic operation. See `.env.example` for optional configuration (e.g., SMTP credentials if you extend the app to send emails).

## Notes

- The `/api/contact` route handler logs submissions to the console. Extend it to send emails, write to a database, or integrate with a CRM.
- Tailwind CSS v4 uses a CSS-first approach — configuration is in `app/globals.css` via `@import "tailwindcss"`. There is no `tailwind.config.js`.
