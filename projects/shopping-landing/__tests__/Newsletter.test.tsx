import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Newsletter from "@/app/components/Newsletter";

describe("Newsletter section", () => {
  it("renders the section heading", () => {
    render(<Newsletter />);
    const heading = screen.getByRole("heading", { level: 2, name: /get exclusive deals/i });
    expect(heading).toBeInTheDocument();
  });

  it("renders the email input with a label", () => {
    render(<Newsletter />);
    const input = screen.getByLabelText(/email address/i);
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("type", "email");
  });

  it("renders the subscribe button", () => {
    render(<Newsletter />);
    const button = screen.getByRole("button", { name: /subscribe/i });
    expect(button).toBeInTheDocument();
  });

  it("shows an error when submitting with an empty email", async () => {
    render(<Newsletter />);
    const button = screen.getByRole("button", { name: /subscribe/i });
    fireEvent.click(button);
    await waitFor(() => {
      expect(screen.getByRole("alert")).toBeInTheDocument();
      expect(screen.getByRole("alert")).toHaveTextContent(/please enter your email/i);
    });
  });

  it("shows an error when submitting with an invalid email", async () => {
    render(<Newsletter />);
    const input = screen.getByLabelText(/email address/i);
    fireEvent.change(input, { target: { value: "not-an-email" } });
    const button = screen.getByRole("button", { name: /subscribe/i });
    fireEvent.click(button);
    await waitFor(() => {
      expect(screen.getByRole("alert")).toHaveTextContent(/valid email/i);
    });
  });

  it("shows success message after valid email submission", async () => {
    render(<Newsletter />);
    const input = screen.getByLabelText(/email address/i);
    fireEvent.change(input, { target: { value: "user@example.com" } });
    const button = screen.getByRole("button", { name: /subscribe/i });
    fireEvent.click(button);
    await waitFor(() => {
      expect(screen.getByRole("status")).toBeInTheDocument();
      expect(screen.getByText(/you're subscribed/i)).toBeInTheDocument();
    });
  });

  it("hides the form after successful submission", async () => {
    render(<Newsletter />);
    const input = screen.getByLabelText(/email address/i);
    fireEvent.change(input, { target: { value: "user@example.com" } });
    fireEvent.click(screen.getByRole("button", { name: /subscribe/i }));
    await waitFor(() => {
      expect(screen.queryByRole("form")).not.toBeInTheDocument();
    });
  });

  it("clears error message when user starts typing after an error", async () => {
    render(<Newsletter />);
    const button = screen.getByRole("button", { name: /subscribe/i });
    fireEvent.click(button);
    await waitFor(() => {
      expect(screen.getByRole("alert")).toBeInTheDocument();
    });
    const input = screen.getByLabelText(/email address/i);
    fireEvent.change(input, { target: { value: "a" } });
    await waitFor(() => {
      expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    });
  });

  it("input has aria-invalid when there is an error", async () => {
    render(<Newsletter />);
    const button = screen.getByRole("button", { name: /subscribe/i });
    fireEvent.click(button);
    await waitFor(() => {
      const input = screen.getByLabelText(/email address/i);
      expect(input).toHaveAttribute("aria-invalid", "true");
    });
  });
});
