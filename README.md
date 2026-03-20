# RecoSphere Lite 🌌

A production-ready, ultra-modern AI Recommendation Platform built with Next.js 14 App Router, Tailwind CSS, Framer Motion, and Supabase.

## Features ✨
- **Multiverse Search**: Discover trending Movies, Books, GitHub Repos, and Products.
- **AI Recommendation Engine**: Uses Content-based Filtering via Cosine Similarity vector mapping.
- **Glassmorphism UI**: Premium dark mode design with neon glow and micro-interactions.
- **Supabase Auth**: Ready-to-use authentication and relational database setup.
- **100% Free Tier API Stack**: Uses free APIs (TMDB, Google Books, Github API, FakeStore).

## Tech Stack 🛠️
- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS, ShadCN UI
- **Animations**: Framer Motion
- **Database / Auth**: Supabase
- **Deployment**: Vercel

## Local Setup & Installation 🚀

### 1. Clone & Install
```bash
npm install
```

### 2. Environment Variables
Rename `.env.example` to `.env.local` and add your keys:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
TMDB_API_KEY=your_tmdb_api_key
```
*(TMDB API key is free: https://www.themoviedb.org/settings/api)*

### 3. Database Setup (Supabase)
Run the SQL queries from `supabase_schema.sql` into your Supabase project's SQL Editor to set up the schemas and Row Level Security (RLS) policies.

### 4. Run Development Server
```bash
npm run dev
```
Open `http://localhost:3000` to see your matrix unfold.

## Vercel Deployment 🌍
This app is ready to drop right into Vercel. 
1. Create a new project in Vercel.
2. Link this repository.
3. Add the environment variables into the Vercel Dashboard directly.
4. Deploy!
