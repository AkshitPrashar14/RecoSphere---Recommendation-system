import { fetchTrendingMovies } from "@/lib/fetchers/tmdb";
import { fetchTrendingBooks } from "@/lib/fetchers/books";
import { fetchTrendingRepos } from "@/lib/fetchers/github";
import { fetchProducts } from "@/lib/fetchers/fakestore";
import { ItemCard } from "@/components/ItemCard";

export const dynamic = 'force-dynamic';

export default async function Home() {
  const [movies, books, repos, products] = await Promise.all([
    fetchTrendingMovies(),
    fetchTrendingBooks(),
    fetchTrendingRepos(),
    fetchProducts()
  ]);
  
  return (
    <div className="space-y-12 pb-10">
      <div className="mb-10 block">
        <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 mb-4 tracking-tight">
          Welcome back.
        </h1>
        <p className="text-gray-400 text-lg">Here are your hyper-personalized recommendations today.</p>
      </div>

      <section>
        <h2 className="text-2xl font-bold mb-6 text-white tracking-tight flex items-center gap-2">
          <span className="w-2 h-8 bg-primary rounded-full inline-block"></span>
          Trending Movies
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
          {movies.map(m => <ItemCard key={m.id} {...m} />)}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6 text-white tracking-tight flex items-center gap-2">
          <span className="w-2 h-8 bg-accent rounded-full inline-block"></span>
          Top Repositories
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
          {repos.map(r => <ItemCard key={r.id} {...r} />)}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6 text-white tracking-tight flex items-center gap-2">
          <span className="w-2 h-8 bg-purple-400 rounded-full inline-block"></span>
          Featured Books
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
          {books.map(b => <ItemCard key={b.id} {...b} />)}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6 text-white tracking-tight flex items-center gap-2">
          <span className="w-2 h-8 bg-pink-400 rounded-full inline-block"></span>
          Recommended Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
          {products.map(p => <ItemCard key={p.id} {...p} />)}
        </div>
      </section>
    </div>
  );
}
