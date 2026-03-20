import { ItemProps } from "@/components/ItemCard";

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_BASE_URL = "https://api.themoviedb.org/3";

export async function fetchTrendingMovies(query?: string): Promise<ItemProps[]> {
  const mockMovie: ItemProps = {
    id: "mock1",
    type: "movie",
    title: "Inception (Mock)",
    description: "A thief who steals corporate secrets through the use of dream-sharing technology.",
    imageUrl: "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
    rating: 8.8,
    tags: ["Action", "Sci-Fi"],
    link: "https://www.themoviedb.org/movie/27205"
  };

  if (!TMDB_API_KEY) {
    console.warn("TMDB_API_KEY is missing. Returning mock data.");
    return [mockMovie];
  }
  try {
    const endpoint = query 
      ? `${TMDB_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}` 
      : `${TMDB_BASE_URL}/trending/movie/week?api_key=${TMDB_API_KEY}`;
    const res = await fetch(endpoint, { 
      cache: "no-store",
    });
    const data = await res.json();
    if (!data.results) {
      console.warn("TMDB returned invalid data (check API key!). Returning mock data.");
      return [mockMovie];
    }
    let results = data.results;
    if (!query) results = results.sort(() => 0.5 - Math.random());
    
    return results.slice(0, 10).map((m: any) => ({
      id: m.id,
      type: "movie",
      title: m.title || m.name,
      description: m.overview,
      imageUrl: m.poster_path ? `https://image.tmdb.org/t/p/w500${m.poster_path}` : undefined,
      rating: m.vote_average,
      tags: [],
      link: `https://www.themoviedb.org/movie/${m.id}`
    }));
  } catch (error) {
    console.error("TMDB error:", error);
    return [mockMovie];
  }
}
