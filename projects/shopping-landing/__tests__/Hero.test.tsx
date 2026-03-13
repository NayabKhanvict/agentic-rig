import React from "react";
import { render, screen } from "@testing-library/react";
import Hero from "@/app/components/Hero";

describe("Hero section", () => {
  it("renders the main headline", () => {
    render(<Hero />);
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading.textContent).toContain("Shop Smarter");
  });

  it("renders a subheading/description paragraph", () => {
    render(<Hero />);
    expect(
      screen.getByText(/Discover thousands of curated products/i)
    ).toBeInTheDocument();
  });

  it("renders a primary CTA button linking to products", () => {
    render(<Hero />);
    const shopNow = screen.getByRole("link", { name: /shop now/i });
    expect(shopNow).toBeInTheDocument();
    expect(shopNow).toHaveAttribute("href", "#products");
  });

  it("renders a secondary CTA button linking to categories", () => {
    render(<Hero />);
    const explore = screen.getByRole("link", { name: /explore categories/i });
    expect(explore).toBeInTheDocument();
    expect(explore).toHaveAttribute("href", "#categories");
  });

  it("has a landmark region with an accessible label", () => {
    render(<Hero />);
    expect(screen.getByRole("region", { name: /hero section/i })).toBeInTheDocument();
  });
});
