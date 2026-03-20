import { fetchTrendingMovies } from "@/lib/fetchers/tmdb";
import { fetchTrendingBooks } from "@/lib/fetchers/books";
import { fetchTrendingRepos } from "@/lib/fetchers/github";
import { fetchProducts } from "@/lib/fetchers/fakestore";
import { rankItemsBySimilarity } from "@/lib/recommendation";
import { ItemCard, ItemProps } from "@/components/ItemCard";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  const query = searchParams.q || "";

  const [movies, books, repos, products] = await Promise.all([
    fetchTrendingMovies(query),
    fetchTrendingBooks(query || "technology"), 
    fetchTrendingRepos(query), 
    fetchProducts()
  ]);

  const allItems: ItemProps[] = [...movies, ...books, ...repos, ...products];

  const rankedItems = query 
    ? rankItemsBySimilarity([query], allItems).filter(i => (i.similarity || 0) >= 0.0) 
    : allItems;

  return (
    <div className="space-y-8 pb-10">
      <div className="mb-8 block">
        <h1 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 mb-2 tracking-tight">
          Search Results
        </h1>
        <p className="text-gray-400 text-lg">
          {query ? (
            <>AI matching for: <span className="text-primary font-medium">"{query}"</span></>
          ) : (
            "Showing all trending items"
          )}
        </p>
      </div>

      {rankedItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-20 glass rounded-2xl border border-white/5">
          <div className="text-6xl mb-6">🤖</div>
          <h2 className="text-2xl font-bold text-white mb-2">No matches found</h2>
          <p className="text-gray-400 text-center max-w-md">Our AI couldn't find any items matching your cosmic query. Try different keywords.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
          {rankedItems.map(item => (
            <ItemCard key={`${item.type}-${item.id}`} {...item} />
          ))}
        </div>
      )}
    </div>
  );
}
