-- RecoSphere Lite Supabase Schema

-- Profiles table
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  email text unique not null,
  full_name text,
  avatar_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.profiles enable row level security;

create policy "Public profiles are viewable by everyone." on profiles
  for select using (true);
create policy "Users can insert their own profile." on profiles
  for insert with check (auth.uid() = id);
create policy "Users can update own profile." on profiles
  for update using (auth.uid() = id);

-- Preferences table
create table if not exists public.preferences (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  keywords jsonb default '[]'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.preferences enable row level security;

create policy "Users can view own preferences." on preferences
  for select using (auth.uid() = user_id);
create policy "Users can insert own preferences." on preferences
  for insert with check (auth.uid() = user_id);
create policy "Users can update own preferences." on preferences
  for update using (auth.uid() = user_id);

-- Feedback table (Likes/Dislikes)
create table if not exists public.feedback (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  item_id text not null,
  item_type text not null,
  is_liked boolean not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, item_id, item_type)
);

alter table public.feedback enable row level security;

create policy "Users can view own feedback." on feedback
  for select using (auth.uid() = user_id);
create policy "Users can insert own feedback." on feedback
  for insert with check (auth.uid() = user_id);
create policy "Users can update own feedback." on feedback
  for update using (auth.uid() = user_id);
