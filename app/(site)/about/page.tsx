import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, Compass, Heart, Sparkles, Feather, ShieldCheck } from "lucide-react";
import { getSettings, getSocialLinks } from "@/lib/queries";
import { storageUrl } from "@/lib/supabase/admin";
import { SocialIcon } from "@/components/site/icons";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "About Us · Romancelovesophy",
  description:
    "Learn about Romancelovesophy, founded by Aswin Sundharam — a quiet sanctuary for reflections on love, classical philosophy, mindfulness, and the examined life.",
};

export default async function AboutPage() {
  const [settings, social] = await Promise.all([getSettings(), getSocialLinks()]);
  const portraitUrl = storageUrl("portraits", settings?.portrait_path);

  return (
    <div className="container-x py-16 sm:py-24">
      {/* Hero Header */}
      <header className="mx-auto max-w-3xl text-center">
        <p className="eyebrow">Romance · Love · Philosophy</p>
        <h1 className="mt-4 font-serif text-4xl font-medium tracking-tight sm:text-6xl">
          Romancelovesophy
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg leading-relaxed text-muted">
          Romance, Love, and Philosophy are three of my main qualities. Here you will find all my works in one place, including activities that I do.
        </p>
      </header>

      {/* Author Section */}
      <section className="mx-auto mt-16 max-w-4xl rounded-2xl border border-line bg-card/40 p-8 sm:p-12">
        <div className="grid gap-10 md:grid-cols-[200px_1fr] md:items-center">
          {portraitUrl ? (
            <div className="relative mx-auto h-52 w-40 overflow-hidden rounded-xl border border-line shadow-md sm:h-60 sm:w-48">
              <Image
                src={portraitUrl}
                alt="Aswin Sundharam — Founder of Romancelovesophy"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 160px, 192px"
              />
            </div>
          ) : (
            <div className="mx-auto grid h-48 w-40 place-items-center rounded-xl border border-line bg-[var(--bg)] text-muted">
              <Feather size={36} />
            </div>
          )}

          <div>
            <p className="eyebrow">The Creator &amp; Voice</p>
            <h2 className="mt-2 font-serif text-2xl sm:text-3xl font-medium">Aswin Sundharam</h2>
            <p className="mt-3 font-serif italic text-sm text-muted">
              &ldquo;You are the Self-aware Reality on which the entire drama of the world exists.&rdquo;
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              I share my writings, thoughts, and reflections on romance, love, and life. Across this website, YouTube, Spotify, Instagram, and Pinterest, all of my works and creative activities are gathered together in one home.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              {social.map((s) => (
                <a
                  key={s.id}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="rounded-md border border-line p-2 text-muted transition hover:border-[var(--fg)] hover:text-[var(--fg)]"
                >
                  <SocialIcon platform={s.platform} className="h-4 w-4" />
                </a>
              ))}
              <Link
                href="/contact"
                className="ml-auto inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-[var(--fg)] underline underline-offset-4 hover:opacity-80"
              >
                Send a note <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Core Themes */}
      <section className="mx-auto mt-20 max-w-4xl">
        <div className="text-center">
          <p className="eyebrow">Our Focus</p>
          <h2 className="mt-3 font-serif text-3xl font-medium">What We Explore</h2>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          <div className="rounded-xl border border-line p-6 bg-card/20">
            <span className="grid h-10 w-10 place-items-center rounded-lg border border-line text-[var(--fg)]">
              <Heart size={20} />
            </span>
            <h3 className="mt-4 font-serif text-lg font-medium">Romantic Philosophy</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Moving beyond superficial dating culture to examine devotion, vulnerability, attachment, heartbreak, and love as a spiritual practice.
            </p>
          </div>

          <div className="rounded-xl border border-line p-6 bg-card/20">
            <span className="grid h-10 w-10 place-items-center rounded-lg border border-line text-[var(--fg)]">
              <Compass size={20} />
            </span>
            <h3 className="mt-4 font-serif text-lg font-medium">Self-Inquiry &amp; Awareness</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Examining the observer rather than the thought, dismantling psychological illusions, and resting in timeless presence.
            </p>
          </div>

          <div className="rounded-xl border border-line p-6 bg-card/20">
            <span className="grid h-10 w-10 place-items-center rounded-lg border border-line text-[var(--fg)]">
              <BookOpen size={20} />
            </span>
            <h3 className="mt-4 font-serif text-lg font-medium">Long-Form Essays &amp; Reflections</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              In-depth, carefully researched writings designed for deliberate reading — no clickbait, no algorithmic noise, just genuine contemplation.
            </p>
          </div>

          <div className="rounded-xl border border-line p-6 bg-card/20">
            <span className="grid h-10 w-10 place-items-center rounded-lg border border-line text-[var(--fg)]">
              <Sparkles size={20} />
            </span>
            <h3 className="mt-4 font-serif text-lg font-medium">Media &amp; Reflections</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Sharing thoughts, discussions, and visual reflections across YouTube, the Spotify podcast, Instagram, and Pinterest.
            </p>
          </div>
        </div>
      </section>

      {/* Editorial Standards & Trust */}
      <section className="mx-auto mt-20 max-w-3xl border-t border-line pt-16">
        <div className="flex items-center gap-3">
          <ShieldCheck size={24} className="text-[var(--fg)]" />
          <h2 className="font-serif text-2xl font-medium">Editorial Independence &amp; Quality</h2>
        </div>
        <div className="mt-6 space-y-4 text-sm leading-relaxed text-muted">
          <p>
            Romancelovesophy is committed to original authorship and rigorous editorial integrity. Every article, quote interpretation, and media curation on this website is written and reviewed by real human authors with personal passion and philosophical rigor.
          </p>
          <p>
            We do not publish automated, scraped, or unverified AI summaries. When we reference classical authors, philosophers, or poets, we provide accurate attributions and genuine contextual analysis.
          </p>
          <p>
            For transparency, we host standard, privacy-friendly advertising through partners like Google AdSense to sustain our independent writing and production costs. You can review how user privacy is guarded in our{" "}
            <Link href="/privacy" className="text-[var(--fg)] underline hover:opacity-80">
              Privacy Policy
            </Link>{" "}
            and{" "}
            <Link href="/terms" className="text-[var(--fg)] underline hover:opacity-80">
              Terms of Service
            </Link>
            .
          </p>
        </div>

        {/* Action Callouts */}
        <div className="mt-12 flex flex-wrap items-center gap-4">
          <Link
            href="/articles"
            className="rounded-md border border-[var(--fg)] bg-[var(--fg)] px-6 py-3 text-sm font-medium text-[var(--bg)] transition hover:opacity-90"
          >
            Read Our Writings
          </Link>
          <Link
            href="/contact"
            className="rounded-md border border-line px-6 py-3 text-sm font-medium text-muted transition hover:border-[var(--fg)] hover:text-[var(--fg)]"
          >
            Contact Aswin
          </Link>
          <Link
            href="/quotes"
            className="rounded-md border border-line px-6 py-3 text-sm font-medium text-muted transition hover:border-[var(--fg)] hover:text-[var(--fg)]"
          >
            Explore Quotes
          </Link>
        </div>
      </section>
    </div>
  );
}
