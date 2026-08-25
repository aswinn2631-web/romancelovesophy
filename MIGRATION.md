# Migrating to a new GitHub + Vercel + Supabase account

Step-by-step for moving Romancelovesophy off the current accounts onto new
ones for all three (GitHub, Vercel, Supabase). Written 2026-08-17, updated
now that all three new accounts exist.

**Do not hand-write the new Supabase schema from the `.sql` files in this
repo.** They've drifted from what's actually live — `articles.unpublish_at`,
`quotes.published_at`/`unpublish_at`, and `settings.comments_enabled` /
`site_live` / `nav_items` were all added directly via the Supabase
dashboard/SQL editor at some point and were never committed. Worse, the
`comments`, `events`, and `read_time` tables are used throughout the app
(comment threads, share-count tracking, reading-time analytics) but don't
exist in **any** tracked schema file at all. A dump of the real database
(Step 2) is the only reliable source of truth.

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
| `RESEND_INBOUND_TOKEN` | No — copy as-is |
| `CONTACT_FROM` / `CONTACT_OWNER_EMAIL` / `CONTACT_REPLY_DOMAIN` | No — copy as-is |

Only the 3 Supabase variables actually change; everything else is a
straight copy from the old Vercel project's env vars into the new one.

---

## Step 1 — Move the GitHub repo to the new account

Two ways to do this — pick one:

**Option A: Transfer ownership (recommended — keeps full commit history, one step)**
1. On the *old* account, go to `github.com/retrodaddy/romancelovesophy` →
   **Settings** → scroll to the bottom **Danger Zone** → **Transfer
   ownership**.
2. Enter the new account's username, confirm.
3. Log into the *new* GitHub account and accept the transfer (via the email
   GitHub sends, or the notification banner).
4. Locally, point your existing clone at the new location:
   ```bash
   git remote set-url origin https://github.com/<new-username>/romancelovesophy.git
   git fetch origin
   ```

**Option B: Push a fresh copy (if you want to keep the old repo around separately)**
1. On the new GitHub account, create a new **empty** repository (no README,
   no `.gitignore` — this repo already has those) named `romancelovesophy`.
2. Locally:
   ```bash
   git remote set-url origin https://github.com/<new-username>/romancelovesophy.git
   git push -u origin main
   ```

Either way, decide now whether the new repo should be public or private —
it was made public earlier specifically to work around a Vercel Hobby-tier
limitation on the old account. If the new Vercel account is also on Hobby,
keep it public for the same reason (or upgrade to Pro if you want it
private).

## Step 2 — Dump the real schema + data from the old Supabase project

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

## Step 3 — Create the new Supabase project and restore into it

1. In the new Supabase account, **create a new project**. Pick a region
   close to where most readers actually are — the old project's traffic
   skewed heavily toward Mumbai (~50% of image requests), so `ap-south-1`
   (Mumbai) is worth considering if it's offered, rather than defaulting to
   a US/EU region.
2. Note its project ref and database password (set at creation).
3. Restore the dump:
   ```bash
   psql "postgresql://postgres:[NEW_PASSWORD]@db.[NEW_REF].supabase.co:5432/postgres" \
     -f romancelovesophy_dump.sql
   ```
4. Verify: `select tablename from pg_tables where schemaname='public';`
   against the table list above, and spot-check that `is_admin()` and RLS
   policies came through (they're plain SQL objects, so the dump includes
   them).

## Step 4 — Migrate storage buckets (files don't come across in a SQL dump)

Storage objects have to be copied separately — there's no one-click export.
Tell me when you're at this step and I'll write a small script (using
`@supabase/supabase-js` against both projects) that loops each bucket in
the inventory above, lists objects in the old project, and re-uploads them
to the new one under the same path. You'd run it locally with both
projects' service-role keys kept in your own `.env.local`, never shared
with me.

## Step 5 — Re-establish the admin login

Supabase Auth users (`auth.users`) generally can't be copied via SQL dump
across projects (password hashes/salts don't transfer cleanly, and
Supabase restricts direct writes to `auth.users`). Simplest path: your
brother signs up fresh on the new project with the same email, then you
insert a matching row into `profiles` (same email) to re-grant admin —
mirroring how `is_admin()` already checks `profiles`.

## Step 6 — New Vercel project

1. In the new Vercel account, connect it to the new GitHub account (Vercel
   for GitHub app install/authorize).
2. **Import Project** → select `romancelovesophy` from the new GitHub
   account.
3. Before deploying, add the env vars from the table above — the 3
   Supabase ones from the *new* project, everything else copied from the
   old Vercel project's env vars (old dashboard → Project → Settings →
   Environment Variables, to read the current values).
4. Deploy. It'll land on a `*.vercel.app` URL first — verify the site works
   end-to-end there (browse articles/quotes, log into `/admin`, try
   creating a test scheduled post) before touching the domain.

## Step 7 — Update the one hardcoded reference in code

`next.config.ts` has the old Supabase hostname hardcoded:
```ts
{ protocol: "https", hostname: "zzefwntpcqdgddzopdjr.supabase.co" },
```
Send me the new project's ref once Step 3 is done and I'll update this,
rebuild, and verify — needs to happen before the new Vercel deployment can
actually load any images.

## Step 8 — Move the domain, then decommission the old accounts

1. Once the new deployment is verified on its `.vercel.app` URL, remove the
   custom domain from the *old* Vercel project's Domains settings, then add
   it to the *new* project's Domains settings. DNS records themselves don't
   need to change if both point at Vercel — this just reassigns which
   project the domain routes to. Expect a few seconds to minutes of
   downtime during the switch.
2. Watch the new site on the real domain for a day or two.
3. Keep the old Vercel project and old Supabase project around (don't
   delete) for a week or two as a rollback safety net before shutting them
   down for good.
