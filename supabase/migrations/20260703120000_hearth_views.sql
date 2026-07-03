-- Hearth article view tracking.
--
-- First-party, aggregate view counting for /the-hearth articles. Stored as a
-- per-slug, per-day counter (so any time window — 30-day "most popular",
-- all-time total — can be derived, while keeping row count tiny: slugs × days).
--
-- Writes go ONLY through the SECURITY DEFINER function `increment_hearth_view`,
-- which anon may EXECUTE but not bypass. Anon has no direct table access, so a
-- visitor can add a view but cannot read, edit or delete the counts. Reads
-- (Most Popular list, Studio display) happen server-side with the service-role
-- key, which bypasses RLS.
--
-- No personal data is stored — just a slug, a date and a count.

create table if not exists public.hearth_article_views (
  slug  text    not null,
  day   date    not null,
  views integer not null default 0,
  primary key (slug, day)
);

create index if not exists hearth_article_views_slug_idx on public.hearth_article_views (slug);
create index if not exists hearth_article_views_day_idx  on public.hearth_article_views (day);

alter table public.hearth_article_views enable row level security;

-- No direct table access for anon / authenticated. All increments go through
-- the function below; all reads go through the service-role key.
revoke all on public.hearth_article_views from anon;
revoke all on public.hearth_article_views from authenticated;

-- Atomic per-day increment. SECURITY DEFINER so it can write the table even
-- though the caller (anon) has no table privileges.
create or replace function public.increment_hearth_view(p_slug text)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  -- Basic guard: ignore anything that isn't a plausible slug.
  if p_slug is null or p_slug !~ '^[a-z0-9-]{1,120}$' then
    return;
  end if;
  insert into public.hearth_article_views (slug, day, views)
  values (p_slug, current_date, 1)
  on conflict (slug, day)
  do update set views = public.hearth_article_views.views + 1;
end;
$$;

revoke all on function public.increment_hearth_view(text) from public;
grant execute on function public.increment_hearth_view(text) to anon;
