import React from "react";
import { render, screen } from "@testing-library/react";
import Footer from "@/app/components/Footer";

describe("Footer section", () => {
  it("renders the ShopZen brand link", () => {
    render(<Footer />);
    const brand = screen.getByRole("link", { name: /shopzen home/i });
    expect(brand).toBeInTheDocument();
  });

  it("renders navigation link sections", () => {
    render(<Footer />);
    expect(screen.getByRole("navigation", { name: /shop links/i })).toBeInTheDocument();
    expect(screen.getByRole("navigation", { name: /company links/i })).toBeInTheDocument();
    expect(screen.getByRole("navigation", { name: /support links/i })).toBeInTheDocument();
  });

  it("renders social media links with accessible labels", () => {
    render(<Footer />);
    expect(screen.getByRole("link", { name: /twitter/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /instagram/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /facebook/i })).toBeInTheDocument();
  });

  it("renders copyright text", () => {
    render(<Footer />);
    expect(screen.getByText(/2026 shopzen/i)).toBeInTheDocument();
  });

  it("renders navigation links for Shop category", () => {
    render(<Footer />);
    expect(screen.getByRole("link", { name: /new arrivals/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /best sellers/i })).toBeInTheDocument();
  });

  it("renders the footer as a landmark", () => {
    render(<Footer />);
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });
});
