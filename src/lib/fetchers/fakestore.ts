import { ItemProps } from "@/components/ItemCard";

export async function fetchProducts(): Promise<ItemProps[]> {
  try {
    const res = await fetch("https://fakestoreapi.com/products", { cache: "no-store" });
    const data = await res.json();
    return data.map((p: any) => ({
      id: p.id,
      type: "product",
      title: p.title,
      description: p.description,
      imageUrl: p.image,
      rating: p.rating?.rate,
      tags: [p.category],
      link: `https://www.amazon.com/s?k=${encodeURIComponent(p.title)}`
    }));
  } catch (error) {
    console.error("FakeStore error:", error);
    return [];
  }
}
