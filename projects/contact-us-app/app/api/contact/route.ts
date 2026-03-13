import { NextRequest, NextResponse } from "next/server";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface ContactPayload {
  fullName: string;
  email: string;
  subject: string;
  message: string;
}

interface ValidationErrors {
  [field: string]: string;
}

// ---------------------------------------------------------------------------
// Validation helpers (mirrors client-side logic)
// ---------------------------------------------------------------------------

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validatePayload(body: unknown): {
  data?: ContactPayload;
  errors?: ValidationErrors;
} {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return { errors: { _form: "Invalid request body." } };
  }

  const raw = body as Record<string, unknown>;
  const errors: ValidationErrors = {};

  const fullName =
    typeof raw.fullName === "string" ? raw.fullName.trim() : "";
  const email = typeof raw.email === "string" ? raw.email.trim() : "";
  const subject = typeof raw.subject === "string" ? raw.subject.trim() : "";
  const message = typeof raw.message === "string" ? raw.message.trim() : "";

  if (!fullName) errors.fullName = "Full name is required.";
  if (!email) {
    errors.email = "Email address is required.";
  } else if (!EMAIL_REGEX.test(email)) {
    errors.email = "Please enter a valid email address.";
  }
  if (!subject) errors.subject = "Subject is required.";
  if (!message) errors.message = "Message is required.";

  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  return { data: { fullName, email, subject, message } };
}

// ---------------------------------------------------------------------------
// Route handler
// ---------------------------------------------------------------------------

export async function POST(request: NextRequest) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON in request body." },
      { status: 400 }
    );
  }

  const { data, errors } = validatePayload(body);

  if (errors || !data) {
    return NextResponse.json(
      { error: "Validation failed.", details: errors },
      { status: 422 }
    );
  }

  // Log the submission (replace with email/CRM integration as needed)
  console.log("[contact] New submission received:", {
    fullName: data.fullName,
    email: data.email,
    subject: data.subject,
    message: data.message,
    timestamp: new Date().toISOString(),
  });

  return NextResponse.json({ success: true }, { status: 200 });
}
