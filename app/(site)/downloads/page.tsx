import type { Metadata } from "next";
import { Download as DownloadIcon, FileText } from "lucide-react";
import { getDownloads } from "@/lib/queries";
import { storageUrl } from "@/lib/supabase/admin";

export const revalidate = 86400; // 1-day ISR for downloads (rarely changes)

export const metadata: Metadata = {
  title: "Downloads",
  description: "Free wallpapers, PDFs, and resources from Romancelovesophy.",
};

export default async function DownloadsPage() {
  const files = await getDownloads();

  return (
    <div className="container-x py-16 sm:py-24">
      <div className="mb-12 text-center">
        <p className="eyebrow">For you</p>
        <h1 className="mt-4 font-serif text-4xl font-medium sm:text-5xl">Downloads</h1>
        <p className="mx-auto mt-4 max-w-md text-sm text-muted">
          Wallpapers, reading lists, and resources — free to keep.
        </p>
      </div>

      {files.length === 0 ? (
        <div className="mx-auto max-w-2xl space-y-10">
          <div className="rounded-2xl border border-line bg-card/40 p-8 sm:p-10 text-center">
            <h2 className="font-serif text-2xl font-medium">Contemplative Reading Guide</h2>
            <p className="mt-4 text-sm sm:text-base leading-relaxed text-muted">
              We curate reading companions and digital reflections to accompany your personal journey through philosophy and mindful solitude. Explore these recommended foundational texts:
            </p>
          </div>

          <div className="divide-y divide-[var(--line)] border-y border-line">
            <div className="py-5 flex items-start gap-4">
              <span className="font-serif text-xl text-muted font-medium w-8">01</span>
              <div>
                <p className="font-medium">Letters from a Stoic — Seneca</p>
                <p className="text-sm text-muted mt-1">Timeless advice on grief, friendship, wealth, and the brevity of life.</p>
              </div>
            </div>
            <div className="py-5 flex items-start gap-4">
              <span className="font-serif text-xl text-muted font-medium w-8">02</span>
              <div>
                <p className="font-medium">The Prophet — Kahlil Gibran</p>
                <p className="text-sm text-muted mt-1">A poetic exploration of love, marriage, sorrow, passion, and freedom.</p>
              </div>
            </div>
            <div className="py-5 flex items-start gap-4">
              <span className="font-serif text-xl text-muted font-medium w-8">03</span>
              <div>
                <p className="font-medium">The Wisdom of Insecurity — Alan Watts</p>
                <p className="text-sm text-muted mt-1">A message for an age of anxiety on accepting the present moment without resistance.</p>
              </div>
            </div>
          </div>

          <div className="text-center pt-2">
            <p className="text-sm text-muted mb-4">
              Looking for something specific or want to request a guide?
            </p>
            <a
              href="/contact"
              className="inline-block rounded-md border border-[var(--fg)] px-6 py-2.5 text-sm font-medium transition hover:bg-[var(--fg)] hover:text-[var(--bg)]"
            >
              Reach Out to Us
            </a>
          </div>
        </div>
      ) : (
        <div className="mx-auto max-w-2xl divide-y divide-[var(--line)] border-y border-line">
          {files.map((f) => (
            <a
              key={f.id}
              href={storageUrl("downloads", f.file_path)!}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between gap-4 py-5"
            >
              <div className="flex items-center gap-4">
                <FileText size={20} className="text-muted" />
                <div>
                  <p className="font-medium">{f.title}</p>
                  {f.description && (
                    <p className="text-sm text-muted">{f.description}</p>
                  )}
                </div>
              </div>
              <DownloadIcon
                size={18}
                className="text-muted transition group-hover:text-[var(--fg)]"
              />
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
