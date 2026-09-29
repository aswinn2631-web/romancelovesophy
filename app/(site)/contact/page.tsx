import type { Metadata } from "next";
import { Feather } from "lucide-react";
import { getSocialLinks } from "@/lib/queries";
import { SocialIcon } from "@/components/site/icons";
import { DirectContact } from "@/components/site/direct-contact";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Contact · Romancelovesophy",
  description:
    "Direct contact for reflections, questions, or a free 1-on-1 Google Meet session with Aswin Sundharam.",
};

const CONTACT_EMAIL = process.env.CONTACT_OWNER_EMAIL || "romancelovesophy@gmail.com";

export default async function ContactPage() {
  const social = await getSocialLinks();

  return (
    <div className="container-x py-16 sm:py-24">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
        <div>
          <p className="eyebrow">Direct Contact</p>
          <h1 className="mt-4 font-serif text-4xl font-medium leading-tight sm:text-5xl">
            Let us talk
          </h1>
          <p className="mt-5 text-sm sm:text-base leading-relaxed text-muted">
            Whether it is a thoughtful reflection, a question, or a request for a personal conversation, you can reach me directly via email.
          </p>

          <div className="mt-8 rounded-2xl border border-line bg-card/30 p-6 space-y-3 max-w-md">
            <div className="flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-lg border border-line bg-[var(--bg)] text-muted">
                <Feather size={16} />
              </span>
              <div>
                <p className="font-serif text-sm font-medium">Aswin Sundharam</p>
                <p className="text-xs text-muted">Creator of Romancelovesophy</p>
              </div>
            </div>
            <p className="text-xs leading-relaxed text-muted">
              I read and reply to every message personally. No automated bots, phone screenings, or forms.
            </p>
          </div>

          <div className="mt-10">
            <p className="text-xs font-medium uppercase tracking-wider text-muted mb-3">
              Connect on Social
            </p>
            <div className="flex flex-wrap items-center gap-3">
              {social.map((s) => (
                <a
                  key={s.id}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="rounded-lg border border-line p-2.5 text-muted transition hover:border-[var(--fg)] hover:text-[var(--fg)]"
                >
                  <SocialIcon platform={s.platform} className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <DirectContact email={CONTACT_EMAIL} />
      </div>
    </div>
  );
}
