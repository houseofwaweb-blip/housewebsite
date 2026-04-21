-- House of Willow Alexander — form submission tables
-- Spec: PLAN.md §4.2 / §15 Finding S1
-- RLS: anon can INSERT only; SELECT/UPDATE/DELETE via service_role only.
-- Note: CREATE INDEX statements are flattened onto single lines because
-- Supabase SQL Editor's splitter can choke on multi-line form.

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- consultation_bookings
-- ---------------------------------------------------------------------------
create table public.consultation_bookings (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  phone text,
  postcode text,
  service_type text,
  preferred_dates text,
  notes text,
  source_page text,
  status text not null default 'new'
);

create index consultation_bookings_created_idx on public.consultation_bookings (created_at desc);
create index consultation_bookings_status_idx on public.consultation_bookings (status);

alter table public.consultation_bookings enable row level security;

-- Anon may only insert.
create policy "anon insert consultation_bookings" on public.consultation_bookings for insert to anon with check (true);

-- Service role bypasses RLS entirely. No other role gets SELECT/UPDATE/DELETE.
revoke select, update, delete on public.consultation_bookings from anon;
revoke select, update, delete on public.consultation_bookings from authenticated;
grant insert on public.consultation_bookings to anon;

-- ---------------------------------------------------------------------------
-- waitlist_interests
-- ---------------------------------------------------------------------------
create table public.waitlist_interests (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  email text not null,
  product text not null check (product in ('steward','protect_review','insurance','howa_app','other')),
  context jsonb default '{}'::jsonb,
  source_page text
);

create index waitlist_interests_created_idx on public.waitlist_interests (created_at desc);
create index waitlist_interests_product_idx on public.waitlist_interests (product);

alter table public.waitlist_interests enable row level security;

create policy "anon insert waitlist_interests" on public.waitlist_interests for insert to anon with check (true);

revoke select, update, delete on public.waitlist_interests from anon;
revoke select, update, delete on public.waitlist_interests from authenticated;
grant insert on public.waitlist_interests to anon;

-- ---------------------------------------------------------------------------
-- contact_submissions
-- ---------------------------------------------------------------------------
create table public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  subject text,
  message text not null,
  source_page text,
  topic text
);

create index contact_submissions_created_idx on public.contact_submissions (created_at desc);

alter table public.contact_submissions enable row level security;

create policy "anon insert contact_submissions" on public.contact_submissions for insert to anon with check (true);

revoke select, update, delete on public.contact_submissions from anon;
revoke select, update, delete on public.contact_submissions from authenticated;
grant insert on public.contact_submissions to anon;

-- ---------------------------------------------------------------------------
-- newsletter_subscribers
-- ---------------------------------------------------------------------------
create table public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  email text not null unique,
  source_page text,
  confirmed_at timestamptz
);

create index newsletter_subscribers_confirmed_idx on public.newsletter_subscribers (confirmed_at);

alter table public.newsletter_subscribers enable row level security;

create policy "anon insert newsletter_subscribers" on public.newsletter_subscribers for insert to anon with check (true);

revoke select, update, delete on public.newsletter_subscribers from anon;
revoke select, update, delete on public.newsletter_subscribers from authenticated;
grant insert on public.newsletter_subscribers to anon;
