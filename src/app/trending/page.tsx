import { fetchTrendingMovies } from "@/lib/fetchers/tmdb";
import { fetchTrendingRepos } from "@/lib/fetchers/github";
import { fetchProducts } from "@/lib/fetchers/fakestore";
import { ItemCard, ItemProps } from "@/components/ItemCard";

export default async function TrendingPage() {
  const [movies, repos, products] = await Promise.all([
    fetchTrendingMovies(),
    fetchTrendingRepos("python"),
    fetchProducts()
  ]);

  const allItems: ItemProps[] = [...movies, ...repos, ...products];
  const trending = allItems.sort((a, b) => (b.rating || 0) - (a.rating || 0)).slice(0, 20);

  return (
    <div className="space-y-8 pb-10 animate-in fade-in zoom-in-95 duration-500">
      <div className="mb-8 block">
        <h1 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500 mb-2 tracking-tight">
          Global Trending
        </h1>
        <p className="text-gray-400 text-lg">The hottest mixed-domain items right now.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
        {trending.map(item => <ItemCard key={`${item.type}-${item.id}`} {...item} />)}
      </div>
    </div>
  );
}
