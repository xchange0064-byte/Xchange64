-- Run this in Supabase Dashboard → SQL Editor → New query → paste all → Run

-- Profiles table (one row per user, linked to phone-auth user)
create table profiles (
  id uuid references auth.users on delete cascade primary key,
  phone text,
  display_name text,
  created_at timestamp with time zone default now()
);

-- Listings table (items for sale)
create table listings (
  id uuid default gen_random_uuid() primary key,
  seller_id uuid references profiles(id) on delete cascade,
  title text not null,
  description text,
  price numeric not null,
  category text,
  location text,
  image_url text,
  status text default 'active', -- active | sold
  created_at timestamp with time zone default now()
);

-- Messages table (buyer <-> seller chat per listing)
create table messages (
  id uuid default gen_random_uuid() primary key,
  listing_id uuid references listings(id) on delete cascade,
  sender_id uuid references profiles(id) on delete cascade,
  body text not null,
  created_at timestamp with time zone default now()
);

-- Enable Row Level Security
alter table profiles enable row level security;
alter table listings enable row level security;
alter table messages enable row level security;

-- Anyone can view listings; only the seller can edit/delete their own
create policy "Listings are viewable by everyone" on listings for select using (true);
create policy "Users can insert their own listings" on listings for insert with check (auth.uid() = seller_id);
create policy "Users can update their own listings" on listings for update using (auth.uid() = seller_id);
create policy "Users can delete their own listings" on listings for delete using (auth.uid() = seller_id);

-- Profiles: viewable by everyone, editable only by owner
create policy "Profiles are viewable by everyone" on profiles for select using (true);
create policy "Users can insert their own profile" on profiles for insert with check (auth.uid() = id);
create policy "Users can update their own profile" on profiles for update using (auth.uid() = id);

-- Messages: only participants (sender or listing seller) can view/insert
create policy "Users can view messages they sent or received" on messages for select
  using (
    auth.uid() = sender_id
    or auth.uid() in (select seller_id from listings where listings.id = messages.listing_id)
  );
create policy "Users can send messages" on messages for insert with check (auth.uid() = sender_id);

-- Storage bucket for listing photos (run separately in Storage UI if this fails)
insert into storage.buckets (id, name, public) values ('listing-photos', 'listing-photos', true)
on conflict (id) do nothing;

create policy "Anyone can view listing photos" on storage.objects for select using (bucket_id = 'listing-photos');
create policy "Authenticated users can upload listing photos" on storage.objects for insert
  with check (bucket_id = 'listing-photos' and auth.role() = 'authenticated');
