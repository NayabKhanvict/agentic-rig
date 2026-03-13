import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ContactForm, { validate } from "./ContactForm";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function setup() {
  const user = userEvent.setup();
  render(<ContactForm />);
  return { user };
}

async function fillForm(
  user: ReturnType<typeof userEvent.setup>,
  overrides: Partial<{
    fullName: string;
    email: string;
    subject: string;
    message: string;
  }> = {}
) {
  const values = {
    fullName: "Jane Smith",
    email: "jane@example.com",
    subject: "Hello",
    message: "This is a test message.",
    ...overrides,
  };

  if (values.fullName) {
    await user.type(screen.getByLabelText(/full name/i), values.fullName);
  }
  if (values.email) {
    await user.type(screen.getByLabelText(/email address/i), values.email);
  }
  if (values.subject) {
    await user.type(screen.getByLabelText(/subject/i), values.subject);
  }
  if (values.message) {
    await user.type(screen.getByLabelText(/message/i), values.message);
  }
}

// ---------------------------------------------------------------------------
// validate() unit tests
// ---------------------------------------------------------------------------

describe("validate()", () => {
  it("returns no errors for valid input", () => {
    const errors = validate({
      fullName: "Jane Smith",
      email: "jane@example.com",
      subject: "Hello",
      message: "Test message",
    });
    expect(errors).toEqual({});
  });

  it("returns an error when fullName is empty", () => {
    const errors = validate({
      fullName: "",
      email: "jane@example.com",
      subject: "Hello",
      message: "Test message",
    });
    expect(errors.fullName).toBeTruthy();
  });

  it("returns an error when fullName is only whitespace", () => {
    const errors = validate({
      fullName: "   ",
      email: "jane@example.com",
      subject: "Hello",
      message: "Test message",
    });
    expect(errors.fullName).toBeTruthy();
  });

  it("returns an error when email is empty", () => {
    const errors = validate({
      fullName: "Jane",
      email: "",
      subject: "Hello",
      message: "Test message",
    });
    expect(errors.email).toBeTruthy();
  });

  it("returns an error for email without @", () => {
    const errors = validate({
      fullName: "Jane",
      email: "notanemail",
      subject: "Hello",
      message: "Test message",
    });
    expect(errors.email).toBeTruthy();
  });

  it("returns an error for email without domain", () => {
    const errors = validate({
      fullName: "Jane",
      email: "jane@",
      subject: "Hello",
      message: "Test message",
    });
    expect(errors.email).toBeTruthy();
  });

  it("accepts a valid email with subdomain", () => {
    const errors = validate({
      fullName: "Jane",
      email: "jane@mail.example.com",
      subject: "Hello",
      message: "Test message",
    });
    expect(errors.email).toBeUndefined();
  });

  it("returns an error when subject is empty", () => {
    const errors = validate({
      fullName: "Jane",
      email: "jane@example.com",
      subject: "",
      message: "Test message",
    });
    expect(errors.subject).toBeTruthy();
  });

  it("returns an error when message is empty", () => {
    const errors = validate({
      fullName: "Jane",
      email: "jane@example.com",
      subject: "Hello",
      message: "",
    });
    expect(errors.message).toBeTruthy();
  });

  it("returns errors for all empty fields", () => {
    const errors = validate({
      fullName: "",
      email: "",
      subject: "",
      message: "",
    });
    expect(Object.keys(errors)).toHaveLength(4);
  });
});

// ---------------------------------------------------------------------------
// ContactForm rendering tests
// ---------------------------------------------------------------------------

describe("ContactForm", () => {
  it("renders all four form fields", () => {
    setup();
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/subject/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
  });

  it("renders a submit button", () => {
    setup();
    expect(
      screen.getByRole("button", { name: /send message/i })
    ).toBeInTheDocument();
  });

  // ---- Validation UI -------------------------------------------------------

  it("shows inline errors when submitting an empty form", async () => {
    const { user } = setup();
    await user.click(screen.getByRole("button", { name: /send message/i }));

    expect(await screen.findAllByRole("alert")).not.toHaveLength(0);
    expect(screen.getByText(/full name is required/i)).toBeInTheDocument();
    expect(screen.getByText(/email address is required/i)).toBeInTheDocument();
    expect(screen.getByText(/subject is required/i)).toBeInTheDocument();
    expect(screen.getByText(/message is required/i)).toBeInTheDocument();
  });

  it("shows an email format error for an invalid email", async () => {
    const { user } = setup();
    await user.type(screen.getByLabelText(/full name/i), "Jane");
    await user.type(screen.getByLabelText(/email address/i), "notvalid");
    await user.type(screen.getByLabelText(/subject/i), "Hello");
    await user.type(screen.getByLabelText(/message/i), "Test");
    await user.click(screen.getByRole("button", { name: /send message/i }));

    expect(
      await screen.findByText(/valid email address/i)
    ).toBeInTheDocument();
  });

  it("clears a field error once the user types into that field", async () => {
    const { user } = setup();
    // Trigger validation
    await user.click(screen.getByRole("button", { name: /send message/i }));
    await screen.findByText(/full name is required/i);

    // Start typing into the field
    await user.type(screen.getByLabelText(/full name/i), "J");
    expect(screen.queryByText(/full name is required/i)).not.toBeInTheDocument();
  });

  // ---- Successful submission -----------------------------------------------

  it("shows success message on successful submission", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ success: true }),
    });

    const { user } = setup();
    await fillForm(user);
    await user.click(screen.getByRole("button", { name: /send message/i }));

    expect(await screen.findByText(/message sent/i)).toBeInTheDocument();
    expect(screen.queryByRole("form")).not.toBeInTheDocument();
  });

  it("shows loading state while submitting", async () => {
    let resolve: (value: unknown) => void;
    const pending = new Promise((res) => {
      resolve = res;
    });

    global.fetch = jest.fn().mockReturnValue(pending);

    const { user } = setup();
    await fillForm(user);
    await user.click(screen.getByRole("button", { name: /send message/i }));

    expect(await screen.findByText(/sending/i)).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeDisabled();

    // Resolve and clean up
    resolve!({
      ok: true,
      json: async () => ({ success: true }),
    });
  });

  // ---- Error state ---------------------------------------------------------

  it("shows error banner and retains form on server error", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      json: async () => ({ error: "Server error. Please try again." }),
    });

    const { user } = setup();
    await fillForm(user);
    await user.click(screen.getByRole("button", { name: /send message/i }));

    expect(
      await screen.findByText(/server error\. please try again\./i)
    ).toBeInTheDocument();

    // Form should still be present
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    // Field values should be retained
    expect(screen.getByLabelText(/full name/i)).toHaveValue("Jane Smith");
  });

  it("shows error banner on network failure", async () => {
    global.fetch = jest.fn().mockRejectedValue(new Error("Network error"));

    const { user } = setup();
    await fillForm(user);
    await user.click(screen.getByRole("button", { name: /send message/i }));

    expect(await screen.findByText(/network error/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
  });

  // ---- Accessibility -------------------------------------------------------

  it("associates error messages with inputs via aria-describedby", async () => {
    const { user } = setup();
    await user.click(screen.getByRole("button", { name: /send message/i }));

    await screen.findByText(/full name is required/i);

    const nameInput = screen.getByLabelText(/full name/i);
    const errorId = nameInput.getAttribute("aria-describedby");
    expect(errorId).toBeTruthy();
    expect(document.getElementById(errorId!)).toBeInTheDocument();
  });

  it("marks invalid inputs with aria-invalid", async () => {
    const { user } = setup();
    await user.click(screen.getByRole("button", { name: /send message/i }));

    await screen.findByText(/full name is required/i);

    const nameInput = screen.getByLabelText(/full name/i);
    expect(nameInput).toHaveAttribute("aria-invalid");
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });
});
