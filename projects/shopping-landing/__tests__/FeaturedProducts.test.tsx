import React from "react";
import { render, screen } from "@testing-library/react";
import FeaturedProducts from "@/app/components/FeaturedProducts";
import { products } from "@/app/data/products";

describe("FeaturedProducts section", () => {
  it("renders the section heading", () => {
    render(<FeaturedProducts products={products} />);
    const heading = screen.getByRole("heading", { level: 2, name: /featured products/i });
    expect(heading).toBeInTheDocument();
  });

  it("renders at least 6 product cards", () => {
    render(<FeaturedProducts products={products} />);
    const articles = screen.getAllByRole("article");
    expect(articles.length).toBeGreaterThanOrEqual(6);
  });

  it("each product card has a name", () => {
    render(<FeaturedProducts products={products} />);
    expect(screen.getByText("Wireless Noise-Cancelling Headphones")).toBeInTheDocument();
    expect(screen.getByText("Premium Leather Crossbody Bag")).toBeInTheDocument();
  });

  it("each product card shows a price", () => {
    render(<FeaturedProducts products={products} />);
    expect(screen.getByText("$129.99")).toBeInTheDocument();
    expect(screen.getByText("$89.99")).toBeInTheDocument();
  });

  it("renders Add to Cart buttons for each product", () => {
    render(<FeaturedProducts products={products} />);
    const addToCartButtons = screen.getAllByRole("button", { name: /add .* to cart/i });
    expect(addToCartButtons.length).toBeGreaterThanOrEqual(6);
  });

  it("product images have alt text", () => {
    render(<FeaturedProducts products={products} />);
    const images = screen.getAllByRole("img");
    images.forEach((img) => {
      expect(img).toHaveAttribute("alt");
      expect(img.getAttribute("alt")).not.toBe("");
    });
  });

  it("renders product badges when present", () => {
    render(<FeaturedProducts products={products} />);
    const newBadges = screen.getAllByText("New");
    const saleBadges = screen.getAllByText("Sale");
    expect(newBadges.length).toBeGreaterThanOrEqual(1);
    expect(saleBadges.length).toBeGreaterThanOrEqual(1);
  });

  it("renders star ratings with accessible labels", () => {
    render(<FeaturedProducts products={products} />);
    const ratings = screen.getAllByLabelText(/\d out of 5 stars/i);
    expect(ratings.length).toBeGreaterThanOrEqual(6);
  });
});
