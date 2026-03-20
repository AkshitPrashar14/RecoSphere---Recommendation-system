import { ItemProps } from "@/components/ItemCard";

export async function fetchTrendingBooks(query: string = "technology"): Promise<ItemProps[]> {
  try {
    const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=40`, { cache: "no-store" });
    const data = await res.json();
    let items = data.items || [];
    if (query === "technology" || query === "bestsellers" || !query) {
      items = items.sort(() => 0.5 - Math.random());
    }
    return items.slice(0, 10).map((b: any) => ({
      id: b.id,
      type: "book",
      title: b.volumeInfo?.title || "Unknown Book",
      description: b.volumeInfo?.description || "No description available.",
      imageUrl: b.volumeInfo?.imageLinks?.thumbnail?.replace('http:', 'https:'),
      rating: b.volumeInfo?.averageRating,
      tags: b.volumeInfo?.categories || [],
      link: b.volumeInfo?.infoLink
    }));
  } catch (error) {
    console.error("Google Books error:", error);
    return [];
  }
}
