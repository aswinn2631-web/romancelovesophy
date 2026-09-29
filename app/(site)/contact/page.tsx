import type { Metadata } from "next";
import { Video, HeartHandshake } from "lucide-react";
import { ContactForm } from "@/components/site/contact-form";
import { SocialIcon } from "@/components/site/icons";
import { getSocialLinks, getSettings } from "@/lib/queries";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch for discussions, collaborations, or a free 1-on-1 Google Meet session with Aswin Sundharam.",
};

export default async function ContactPage() {
  const [social, settings] = await Promise.all([getSocialLinks(), getSettings()]);

  const defaultSubjects = [
    "1-on-1 Google Meet (Free)",
    "Discussion",
    "Sharing Thoughts",
    "Collab Requests",
  ];
  const subjects = settings?.contact_subjects?.length
    ? (settings.contact_subjects.some((s) => s.toLowerCase().includes("meet"))
        ? settings.contact_subjects
        : ["1-on-1 Google Meet (Free)", ...settings.contact_subjects])
    : defaultSubjects;

  return (
    <div className="container-x py-16 sm:py-24">
      <div className="grid gap-14 md:grid-cols-[1fr_1.2fr]">
        <div>
          <p className="eyebrow">Say hello</p>
          <h1 className="mt-4 font-serif text-4xl font-medium leading-tight sm:text-5xl">
            Let us talk
          </h1>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted">
            Whether it is a thoughtful reflection, a question, or a request for a personal conversation, this reaches me directly.
          </p>

          {/* 1-on-1 Google Meet Box */}
          <div className="mt-8 rounded-2xl border border-line bg-card/40 p-6 space-y-3.5 max-w-md shadow-sm">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl border border-line bg-[var(--bg)] text-[var(--fg)]">
                <Video size={18} />
              </span>
              <div>
                <p className="font-serif text-base font-medium text-[var(--fg)]">1-on-1 Google Meet Sessions</p>
                <p className="text-xs text-muted">Personal, one-on-one conversations</p>
              </div>
            </div>

            <p className="text-xs sm:text-sm leading-relaxed text-muted">
              I conduct one-on-one Google Meet sessions for people who want to reach out, share what they are experiencing, or explore deeper questions on life, romance, and philosophy.
            </p>

            <div className="rounded-xl border border-line/60 bg-[var(--bg)]/90 p-3.5 text-xs text-[var(--fg)] space-y-1">
              <p className="font-medium flex items-center gap-1.5 text-[var(--fg)]">
                <HeartHandshake size={15} className="shrink-0 text-[var(--fg)]" />
                Always 100% Free
              </p>
              <p className="text-muted leading-relaxed">
                I do not charge any money for Google Meet sessions or for sharing wisdom. If you would like to speak, choose <strong>&ldquo;1-on-1 Google Meet (Free)&rdquo;</strong> in the subject dropdown and write a few lines about what you would like to talk about.
              </p>
            </div>
          </div>

          <div className="mt-8 flex items-center gap-4">
            {social.map((s) => (
              <a
                key={s.id}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="text-muted transition hover:text-[var(--fg)]"
              >
                <SocialIcon platform={s.platform} className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>
        <ContactForm subjects={subjects} />
      </div>
    </div>
  );
}
