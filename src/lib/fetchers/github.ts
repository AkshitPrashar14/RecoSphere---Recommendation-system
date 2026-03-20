import { ItemProps } from "@/components/ItemCard";

export async function fetchTrendingRepos(query?: string): Promise<ItemProps[]> {
  try {
    const q = query ? encodeURIComponent(query) : "language:javascript";
    const res = await fetch(`https://api.github.com/search/repositories?q=${q}&sort=stars&order=desc&per_page=40`, { cache: "no-store" });
    const data = await res.json();
    let items = data.items || [];
    if (!query) items = items.sort(() => 0.5 - Math.random());
    return items.slice(0, 10).map((r: any) => ({
      id: r.id,
      type: "repo",
      title: r.full_name,
      description: r.description || "No description provided.",
      imageUrl: r.owner?.avatar_url,
      rating: r.stargazers_count ? parseFloat((r.stargazers_count / 1000).toFixed(1)) : undefined, // UI 10.5k format
      link: r.html_url,
      tags: r.topics || [],
    }));
  } catch (error) {
    console.error("GitHub error:", error);
    return [];
  }
}
