const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface Product {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
  markets: {
  market: string;
  division: string;
  min: number;
  max: number;
}[];
}

export const getProductsByCategory = async (
  slug: string
): Promise<Product[]> => {
  const res = await fetch(
    `${API_URL}/products?category=${slug}`
  );

  if (!res.ok) {
    throw new Error("Products fetch failed");
  }

  return res.json();
};
export const getProductById = async (
  id: string
): Promise<Product> => {
  const res = await fetch(`${API_URL}/products/${id}`);

  if (!res.ok) {
    throw new Error("Product fetch failed");
  }

  return res.json();
};