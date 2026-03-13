import React from "react";
import { render, screen } from "@testing-library/react";
import Categories from "@/app/components/Categories";
import { categories } from "@/app/data/categories";

describe("Categories section", () => {
  it("renders the section heading", () => {
    render(<Categories categories={categories} />);
    const heading = screen.getByRole("heading", { level: 2, name: /shop by category/i });
    expect(heading).toBeInTheDocument();
  });

  it("renders at least 4 category cards", () => {
    render(<Categories categories={categories} />);
    const cards = screen.getAllByRole("button");
    expect(cards.length).toBeGreaterThanOrEqual(4);
  });

  it("each category card shows the category name", () => {
    render(<Categories categories={categories} />);
    expect(screen.getByText("Electronics")).toBeInTheDocument();
    expect(screen.getByText("Fashion")).toBeInTheDocument();
    expect(screen.getByText("Home & Living")).toBeInTheDocument();
    expect(screen.getByText("Sports & Outdoors")).toBeInTheDocument();
  });

  it("each category card shows item count", () => {
    render(<Categories categories={categories} />);
    expect(screen.getByText("1,240 items")).toBeInTheDocument();
    expect(screen.getByText("3,580 items")).toBeInTheDocument();
  });

  it("category cards are keyboard accessible via button role", () => {
    render(<Categories categories={categories} />);
    const cards = screen.getAllByRole("button");
    // button elements are naturally keyboard focusable; verify they are present
    expect(cards.length).toBeGreaterThanOrEqual(4);
    cards.forEach((card) => {
      // buttons are focusable by default (tabIndex 0 is implicit)
      expect(card.tagName.toLowerCase()).toBe("button");
    });
  });

  it("category cards have accessible aria-labels", () => {
    render(<Categories categories={categories} />);
    const electronicsCard = screen.getByRole("button", { name: /browse electronics/i });
    expect(electronicsCard).toBeInTheDocument();
  });
});
