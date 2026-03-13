import React from "react";
import { render, screen } from "@testing-library/react";
import PromoBanner from "@/app/components/PromoBanner";

describe("PromoBanner section", () => {
  it("renders the promotional heading", () => {
    render(<PromoBanner />);
    const heading = screen.getByRole("heading", { level: 2 });
    expect(heading.textContent).toContain("Free Shipping");
  });

  it("displays the $50 threshold", () => {
    render(<PromoBanner />);
    expect(screen.getByText(/\$50/i)).toBeInTheDocument();
  });

  it("shows the promo code FREESHIP", () => {
    render(<PromoBanner />);
    expect(screen.getByText("FREESHIP")).toBeInTheDocument();
  });

  it("renders a CTA link that leads to products", () => {
    render(<PromoBanner />);
    const cta = screen.getByRole("link", { name: /shop.*save/i });
    expect(cta).toBeInTheDocument();
    expect(cta).toHaveAttribute("href", "#products");
  });

  it("has a landmark region with accessible label", () => {
    render(<PromoBanner />);
    expect(screen.getByRole("region", { name: /promotional banner/i })).toBeInTheDocument();
  });
});
