# Migrating to a new Vercel + Supabase account

This is the full checklist for moving Romancelovesophy off the current
Vercel/Supabase account onto a different one. Written 2026-08-17.

**Do not hand-write the new Supabase schema from the `.sql` files in this
repo.** They've drifted from what's actually live — `articles.unpublish_at`,
`quotes.published_at`/`unpublish_at`, and `settings.comments_enabled` /
`site_live` / `nav_items` were all added directly via the Supabase
dashboard/SQL editor at some point and were never committed. Worse, the
`comments`, `events`, and `read_time` tables are used throughout the app
(comment threads, share-count tracking, reading-time analytics) but don't
exist in **any** tracked schema file at all. A dump of the real database is
the only reliable source of truth — see Step 1.

## Inventory (verified from code, 2026-08-17)

**Tables the app queries** — confirm all of these exist post-migration:
`articles`, `categories`, `comments`, `contacts`, `contact_messages`,
`doing_good_posts`, `downloads`, `enquiries`, `events`, `fonts`,
`page_views`, `profiles`, `quotes`, `read_time`, `settings`, `social_links`,
`subscribers`, `videos_cache`.

**Storage buckets**: `quote-images`, `article-images`, `doing-good-images`,
`portraits`, `downloads`, `header`, `fonts`.

**Environment variables** (from `.env.example` + actual `process.env.*`
usage in code):

| Variable | Needs a NEW value from the new Supabase project? |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | **Yes** |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | **Yes** |
| `SUPABASE_SERVICE_ROLE_KEY` | **Yes** |
| `NEXT_PUBLIC_SITE_URL` | No — copy as-is (unless the domain is also changing) |
| `NEXT_PUBLIC_YOUTUBE_HANDLE` | No — copy as-is |
| `YOUTUBE_API_KEY` | No — copy as-is |
| `YOUTUBE_CHANNEL_ID` | No — copy as-is (can be blank) |
| `SPOTIFY_CLIENT_ID` / `SPOTIFY_CLIENT_SECRET` | No — copy as-is |
| `RESEND_API_KEY` | No — copy as-is |
| `RESEND_INBOUND_TOKEN` | No — copy as-is (used in code, missing from `.env.example` — add it there too) |
| `CONTACT_FROM` / `CONTACT_OWNER_EMAIL` / `CONTACT_REPLY_DOMAIN` | No — copy as-is |

Only the 3 Supabase variables actually change; everything else is a
straight copy from the old Vercel project's env vars into the new one.

**One hardcoded reference to update in code**: `next.config.ts` has the old
Supabase hostname hardcoded in `images.remotePatterns`:
```ts
{ protocol: "https", hostname: "zzefwntpcqdgddzopdjr.supabase.co" },
```
Change this to the new project's `<ref>.supabase.co` once you have it (send
it to me and I'll make this edit + build-verify it).

## Step 1 — Dump the real schema + data from the old Supabase project

From **Project Settings → Database → Connection string** on the *old*
project, get the direct (non-pooled) connection string. Then, with
`postgresql-client` installed locally:

```bash
pg_dump "postgresql://postgres:[PASSWORD]@db.zzefwntpcqdgddzopdjr.supabase.co:5432/postgres" \
  --schema=public --no-owner --no-privileges \
  -f romancelovesophy_dump.sql
```

This captures the actual live structure — including the undocumented
columns/tables above — plus all your data, with no guessing involved.

If you don't have `pg_dump` locally, the Supabase CLI works too:
```bash
supabase link --project-ref zzefwntpcqdgddzopdjr
supabase db dump -f romancelovesophy_dump.sql
```

## Step 2 — Restore into the new Supabase project

Create the new project first (note its ref/URL), then:
```bash
psql "postgresql://postgres:[NEW_PASSWORD]@db.[NEW_REF].supabase.co:5432/postgres" \
  -f romancelovesophy_dump.sql
```

Afterwards, verify against the table list above — `select tablename from
pg_tables where schemaname='public';` — and spot-check that `auth.uid()`
and `is_admin()` still work (the dump includes functions/RLS policies since
they live in `public` and are referenced by policies).

## Step 3 — Migrate storage buckets (files don't come across in a SQL dump)

Storage objects have to be copied separately — there's no one-click export.
Simplest approach: a small script using `@supabase/supabase-js` against
both projects, looping each bucket in the inventory above, listing objects
in the old project and re-uploading to the new one under the same path. Say
the word and I'll write that script — I'd need both projects' service-role
keys to run it, or you can run it yourself with the keys kept local.

## Step 4 — Re-establish the admin login

Supabase Auth users (`auth.users`) generally can't be copied via SQL dump
across projects (password hashes/salts don't transfer cleanly, and
Supabase restricts direct writes to `auth.users`). Simplest path: your
brother signs up fresh on the new project with the same email, then you
insert a matching row into `profiles` (same email) to re-grant admin —
mirroring how `is_admin()` already checks `profiles`.

## Step 5 — New Vercel project

1. Import the GitHub repo (`retrodaddy/romancelovesophy` — already public,
   so this works cleanly under the new account's Hobby tier too) into the
   new Vercel account.
2. Set the env vars from the table above.
3. Deploy once to confirm it builds.
4. Move the custom domain: remove it from the old Vercel project's Domains
   settings, add it to the new project's Domains settings. DNS itself
   doesn't need to change if you're pointing at Vercel's nameservers/A
   records either way — this is just re-assigning which Vercel project the
   domain routes to.

## Step 6 — Cutover order (minimize downtime)

1. Do steps 1–4 (Supabase) fully, and confirm the new DB looks right,
   **before** touching Vercel or DNS — the old site keeps running the
   whole time.
2. Deploy the new Vercel project pointed at the new Supabase project,
   verify it end-to-end on its `*.vercel.app` preview URL first.
3. Only once verified, move the domain over (Step 5.4). This is the
   only step with any visitor-facing downtime, and it's typically seconds
   to a few minutes.
4. Keep the old Vercel project + Supabase project around (don't delete)
   for a week or two as a rollback safety net before decommissioning them.
