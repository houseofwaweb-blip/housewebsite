-- House of Willow Alexander — unified inbound form-submissions table.
--
-- Mirrors the 25-column shape used on willowalexandercleaners.co.uk so the same
-- automation (dedupe → legitimacy → source-from-url/utm) can read both sites
-- with one query shape. House-specific extras (tier, propertyType, gclid,
-- referrer, preferred_dates…) live in `context` jsonb, OUTSIDE the 25 standard
-- columns, so the shared automation can ignore them.
--
-- RLS: anon may INSERT only; SELECT/UPDATE/DELETE happen via service_role (the
-- automation), which bypasses RLS. Same policy shape as the other form tables.

create extension if not exists "pgcrypto";

create table if not exists public.form_submissions (
  id                    uuid primary key default gen_random_uuid(),
  created_at            timestamptz not null default now(),
  updated_at            timestamptz not null default now(),
  name                  text,
  email                 text,
  phone                 text,
  postcode              text,
  service               text,
  message               text,
  source                text,          -- form identifier: consultation | contact | waitlist
  page_url              text,
  utm_source            text,
  utm_medium            text,
  utm_campaign          text,
  utm_content           text,
  utm_term              text,
  user_agent            text,
  ip                    text,
  status                text not null default 'new',
  notes                 text,
  marketing_consent     boolean not null default false,
  marketing_consent_at  timestamptz,
  company_name          text,
  role                  text,
  site_count            integer,
  context               jsonb not null default '{}'::jsonb
);

create index form_submissions_created_idx on public.form_submissions (created_at desc);
create index form_submissions_status_idx on public.form_submissions (status);
create index form_submissions_email_idx on public.form_submissions (email);
create index form_submissions_source_idx on public.form_submissions (source);

-- Keep updated_at fresh on any UPDATE (the automation writes status/notes).
create or replace function public.set_updated_at() returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end;
$$;

drop trigger if exists form_submissions_set_updated_at on public.form_submissions;
create trigger form_submissions_set_updated_at before update on public.form_submissions for each row execute function public.set_updated_at();

alter table public.form_submissions enable row level security;

create policy "anon insert form_submissions" on public.form_submissions for insert to anon with check (true);

revoke select, update, delete on public.form_submissions from anon;
revoke select, update, delete on public.form_submissions from authenticated;
grant insert on public.form_submissions to anon;
