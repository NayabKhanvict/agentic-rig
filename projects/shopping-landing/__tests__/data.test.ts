import { products } from "@/app/data/products";
import { categories } from "@/app/data/categories";

describe("products data", () => {
  it("exports at least 6 products", () => {
    expect(products.length).toBeGreaterThanOrEqual(6);
  });

  it("each product has required fields", () => {
    products.forEach((product) => {
      expect(typeof product.id).toBe("number");
      expect(typeof product.name).toBe("string");
      expect(product.name.length).toBeGreaterThan(0);
      expect(typeof product.price).toBe("number");
      expect(product.price).toBeGreaterThan(0);
      expect(typeof product.rating).toBe("number");
      expect(product.rating).toBeGreaterThanOrEqual(1);
      expect(product.rating).toBeLessThanOrEqual(5);
      expect(typeof product.reviewCount).toBe("number");
      expect(product.reviewCount).toBeGreaterThan(0);
    });
  });

  it("optional badge is a string when present", () => {
    const badgedProducts = products.filter((p) => p.badge !== undefined);
    expect(badgedProducts.length).toBeGreaterThanOrEqual(1);
    badgedProducts.forEach((p) => {
      expect(typeof p.badge).toBe("string");
    });
  });

  it("all product ids are unique", () => {
    const ids = products.map((p) => p.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });
});

describe("categories data", () => {
  it("exports at least 4 categories", () => {
    expect(categories.length).toBeGreaterThanOrEqual(4);
  });

  it("each category has required fields", () => {
    categories.forEach((category) => {
      expect(typeof category.id).toBe("number");
      expect(typeof category.name).toBe("string");
      expect(category.name.length).toBeGreaterThan(0);
      expect(typeof category.description).toBe("string");
      expect(typeof category.iconPath).toBe("string");
      expect(category.iconPath.length).toBeGreaterThan(0);
      expect(typeof category.color).toBe("string");
      expect(category.color.startsWith("bg-")).toBe(true);
      expect(typeof category.itemCount).toBe("number");
      expect(category.itemCount).toBeGreaterThan(0);
    });
  });

  it("all category ids are unique", () => {
    const ids = categories.map((c) => c.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });
});
