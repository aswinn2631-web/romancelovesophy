import type { Metadata } from "next";
import { DoingGoodCard } from "@/components/site/doing-good-card";
import { AdSlot } from "@/components/site/ad-slot";
import { getDoingGoodPosts, getSettings } from "@/lib/queries";

// Always render fresh so scheduled posts (gated by published_at) appear the
// moment their scheduled time passes, instead of waiting on stale ISR.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Doing Good",
  description: "Stories from the ground — small acts, real impact.",
};

export default async function DoingGoodPage() {
  const [posts, settings] = await Promise.all([getDoingGoodPosts(), getSettings()]);

  return (
    <div className="container-x py-16 sm:py-24">
      <div className="mb-12 text-center">
        <p className="eyebrow">Beyond the words</p>
        <h1 className="mt-4 font-serif text-4xl font-medium sm:text-5xl">Doing Good</h1>
        <p className="mx-auto mt-4 max-w-md text-sm text-muted">
          Stories from the ground — small acts, real impact.
        </p>
      </div>

      {posts.length === 0 ? (
        <div className="mx-auto max-w-2xl space-y-12">
          <div className="rounded-2xl border border-line bg-card/40 p-8 sm:p-10 text-center">
            <h2 className="font-serif text-2xl font-medium">Philosophy in Action</h2>
            <p className="mt-4 text-sm sm:text-base leading-relaxed text-muted">
              We believe philosophy should not remain trapped in books or abstract contemplation. &ldquo;Doing Good&rdquo; is our commitment to quiet impact — highlighting human kindness, supporting thoughtful grassroots initiatives, and celebrating those who bring grace into everyday life.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-xl border border-line p-6 bg-card/20">
              <h3 className="font-serif text-lg font-medium">Quiet Generosity</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Documenting self-effacing individuals who serve their local communities without seeking recognition or viral attention.
              </p>
            </div>
            <div className="rounded-xl border border-line p-6 bg-card/20">
              <h3 className="font-serif text-lg font-medium">Wisdom &amp; Literacy</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Supporting the distribution of contemplative books, notebooks, and educational resources to open minds and young thinkers.
              </p>
            </div>
          </div>

          <div className="text-center pt-4">
            <p className="text-sm text-muted mb-4">
              Know of an inspiring community initiative or a quiet act of kindness worth sharing?
            </p>
            <a
              href="/contact"
              className="inline-block rounded-md border border-[var(--fg)] px-6 py-2.5 text-sm font-medium transition hover:bg-[var(--fg)] hover:text-[var(--bg)]"
            >
              Share a Story with Us
            </a>
          </div>
        </div>
      ) : (
        <>
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((p) => (
              <DoingGoodCard key={p.id} post={p} />
            ))}
          </div>

          <AdSlot
            client={settings?.adsense_client ?? null}
            enabled={settings?.ads_enabled}
            className="pt-12"
          />
        </>
      )}
    </div>
  );
}
