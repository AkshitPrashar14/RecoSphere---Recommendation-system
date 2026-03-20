import { fetchTrendingMovies } from "@/lib/fetchers/tmdb";
import { ItemCard } from "@/components/ItemCard";

export default async function MoviesPage() {
  const movies = await fetchTrendingMovies();

  return (
    <div className="space-y-8 pb-10 animate-in fade-in zoom-in-95 duration-500">
      <div className="mb-8 block">
        <h1 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400 mb-2 tracking-tight">
          Trending Movies
        </h1>
        <p className="text-gray-400 text-lg">Top cinematic experiences this week.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
        {movies.map(m => <ItemCard key={m.id} {...m} />)}
      </div>
    </div>
  );
}
