# House forms → unified `form_submissions` table (for your automation)

Mirrors the inbound-forms structure from `willowalexandercleaners.co.uk` so your
existing automation (dedupe → legitimacy → source-from-url/utm) can read the
House site with the **same 25-column shape**.

---

## 1. What you need to do (one-time)

The code is wired. You just need to **create the table in Supabase**:

1. Supabase → the **House Website** project → **SQL Editor**.
2. Paste and run the SQL below (also saved at
   `supabase/migrations/20260703000000_form_submissions.sql`).
3. Done — the next form submission on the live site writes a row.

```sql
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
  source                text,
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
```

> **RLS**: the site inserts with the anon key (insert-only). Your automation reads
> / updates / dedupes with the **service_role** key, which bypasses RLS — same as
> the cleaners site.

---

## 2. The 25 standard columns (identical shape to cleaners)

| Column | Filled from | Notes |
|---|---|---|
| `name` | form name (waitlist: first + last) | |
| `email` | form email | |
| `phone` | consultation phone | others null |
| `postcode` | consultation / waitlist postcode | |
| `service` | the service/interest | see mapping below |
| `message` | the free-text message | see mapping below |
| `source` | **which form**: `consultation` \| `contact` \| `waitlist` | |
| `page_url` | the page they submitted from (`sourcePage`, else landing page) | |
| `utm_source/medium/campaign/content/term` | first-touch UTM captured client-side | for your source logic |
| `user_agent` | request header | for legitimacy checks |
| `ip` | request IP | for legitimacy / dedupe |
| `status` | always `'new'` on insert | your automation advances it |
| `notes` | null on insert | for your automation to write |
| `marketing_consent` | **the "opt into marketing" checkbox on the form** | boolean |
| `marketing_consent_at` | timestamp when they ticked it (else null) | |
| `company_name`, `role`, `site_count` | null for House forms | present for shared shape; use later if a B2B form needs them |
| `context` (extra, jsonb) | House-only extras — ignore in your automation | `form_type`, `gclid`, `referrer`, `tier`, `property_type`, `preferred_dates` |

### Per-form field mapping
| Form (`source`) | `service` = | `message` = |
|---|---|---|
| `consultation` (homepage/services enquiry) | `serviceType` (window-cleaning, gardening, …) | the notes textarea |
| `contact` (/contact) | `topic` (general, press, partnership…) | the message |
| `waitlist` (register-interest: insurance/protect/HoWA/steward) | `product` | the note (steward) |

---

## 3. Marketing consent

Per your note: `marketing_consent` = the **explicit opt-in checkbox on the form**
(email-marketing consent), NOT the site's cookie/tracking consent. I added the
checkbox to all three enquiry forms:

> *"I'd like to hear from House of Willow Alexander occasionally about home,
> garden and seasonal tips and offers."*

- Ticked → `marketing_consent = true` + `marketing_consent_at = <timestamp>`.
- Unticked (default) → `false`, `marketing_consent_at = null`.

---

## 4. How it's wired (for reference / future changes)

- **Table shape**: `supabase/migrations/20260703000000_form_submissions.sql`
- **Insert + field mapping**: `src/lib/forms/submit.ts` → `buildInboundRow()`
- **Checkbox field**: `marketingOptIn` in `src/lib/forms/schemas.ts`, rendered in
  `EnquiryForm.tsx`, `ContactForm.tsx`, `WaitlistMini.tsx`
- **UTM / gclid / referrer**: captured first-touch client-side
  (`src/lib/google/gclid.ts`) and attached to every submission as `tracking`

### Important: this is a DUAL-WRITE (safe by design)
The site **still writes to the old per-type tables** (`consultation_bookings`,
`contact_submissions`, `waitlist_interests`) as before — the unified
`form_submissions` row is written **in addition**, and its failure never breaks a
submission. Once you've confirmed your automation is happy reading
`form_submissions`, you can retire the old tables (tell me and I'll remove the
old-table writes). Newsletter signups are **not** mirrored here — they're a
subscriber list, not an inbound enquiry.

---

## 5. Quick test after creating the table
1. Submit an enquiry on the live site (tick the marketing box).
2. In Supabase → `form_submissions`, you should see a row with
   `source`, `service`, `message`, `page_url`, `utm_*` (if the visit had UTMs),
   `user_agent`, `ip`, `marketing_consent`, `status='new'`.
