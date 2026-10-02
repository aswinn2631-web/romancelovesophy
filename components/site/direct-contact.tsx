"use client";

import { useState } from "react";
import { Mail, Copy, Check, Video, HeartHandshake, ArrowUpRight } from "lucide-react";

interface DirectContactProps {
  email: string;
}

export function DirectContact({ email }: DirectContactProps) {
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // Fallback if clipboard API is not permitted
      setCopied(false);
    }
  }

  const meetSubject = encodeURIComponent("1-on-1 Google Meet Session");
  const meetBody = encodeURIComponent(
    "Hi Aswin,\n\nI would love to schedule a free 1-on-1 Google Meet session with you.\n\nMy location / time zone and preferred days or times:\n\n"
  );
  const generalSubject = encodeURIComponent("Hello Aswin — Romancelovesophy");

  return (
    <div className="space-y-6">
      {/* Primary Direct Email Card */}
      <div className="rounded-2xl border border-line bg-card/60 p-6 sm:p-8 shadow-sm">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-xl border border-line bg-[var(--bg)] text-[var(--fg)]">
            <Mail size={18} />
          </span>
          <div>
            <h2 className="font-serif text-lg font-medium text-[var(--fg)]">Direct Email</h2>
            <p className="text-xs text-muted">Reaches my personal inbox without any website forms</p>
          </div>
        </div>

        <div className="mt-5 rounded-xl border border-line bg-[var(--bg)] p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <a
            href={`mailto:${email}?subject=${generalSubject}`}
            className="font-mono text-sm sm:text-base font-medium text-[var(--fg)] underline underline-offset-4 decoration-line hover:decoration-[var(--fg)] break-all transition"
          >
            {email}
          </a>
          <button
            type="button"
            onClick={copyEmail}
            className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-line px-3.5 py-1.5 text-xs font-medium text-muted transition hover:border-[var(--fg)] hover:text-[var(--fg)] shrink-0"
            aria-label="Copy email address"
          >
            {copied ? (
              <>
                <Check size={14} className="text-emerald-500" />
                <span className="text-emerald-500 font-medium">Copied!</span>
              </>
            ) : (
              <>
                <Copy size={14} />
                <span>Copy address</span>
              </>
            )}
          </button>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <a
            href={`mailto:${email}?subject=${generalSubject}`}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-[var(--fg)] bg-[var(--fg)] px-5 py-2.5 text-sm font-medium text-[var(--bg)] transition hover:opacity-90"
          >
            Open in Email App <ArrowUpRight size={15} />
          </a>
        </div>
      </div>

      {/* 1-on-1 Google Meet Card */}
      <div className="rounded-2xl border border-line bg-card/40 p-6 sm:p-8 space-y-4 shadow-sm">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-xl border border-line bg-[var(--bg)] text-[var(--fg)]">
            <Video size={18} />
          </span>
          <div>
            <h2 className="font-serif text-lg font-medium text-[var(--fg)]">1-on-1 Google Meet Sessions</h2>
            <p className="text-xs text-muted">Personal, one-on-one contemplative conversations</p>
          </div>
        </div>

        <p className="text-sm leading-relaxed text-muted">
          I conduct one-on-one Google Meet sessions for people who want to reach out, share what they are experiencing, or explore deeper questions on life, romance, and philosophy.
        </p>

        <div className="rounded-xl border border-line/60 bg-[var(--bg)]/90 p-4 space-y-1.5 text-xs sm:text-sm text-[var(--fg)]">
          <div className="flex items-center gap-2 font-medium">
            <HeartHandshake size={16} className="shrink-0 text-[var(--fg)]" />
            <span>Always 100% Free</span>
          </div>
          <p className="text-xs text-muted leading-relaxed">
            I do not charge any money for Google Meet sessions or for sharing wisdom. It is purely an open, quiet space to connect and discuss.
          </p>
        </div>

        <div className="pt-2 space-y-3">
          <p className="text-xs text-muted leading-relaxed">
            To request a session, email me directly with your general timezone and preferred days or times:
          </p>
          <a
            href={`mailto:${email}?subject=${meetSubject}&body=${meetBody}`}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-line bg-[var(--bg)] px-5 py-2.5 text-sm font-medium text-[var(--fg)] transition hover:border-[var(--fg)]"
          >
            Request Google Meet via Email <ArrowUpRight size={15} />
          </a>
        </div>
      </div>
    </div>
  );
}
