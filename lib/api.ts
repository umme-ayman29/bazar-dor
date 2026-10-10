import type { Category, Product } from "./types";

const BASES = [
  process.env.NEXT_PUBLIC_API_URL ?? "https://api.api-store.workers.dev/api/bazardor",
  "https://api.abcz.workers.dev/api/bazardor", // বিকল্প
];

async function get<T>(path: string): Promise<T | null> {
  for (const base of BASES) {
    try {
      const res = await fetch(`${base}${path}`, { next: { revalidate: 60 } });
      if (res.ok) return (await res.json()) as T;
    } catch {
      // try next base
    }
  }
  return null;
}

export const getProducts = (category?: string) =>
  get<Product[]>(category ? `/products?category=${category}` : "/products");

export const getCategories = () => get<Category[]>("/categories");

export async function getProduct(slug: string) {
  const all = await getProducts();
  return all?.find((p) => p.slug === slug) ?? null;
}