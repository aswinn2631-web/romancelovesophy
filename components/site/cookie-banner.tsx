"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export function CookieBanner() {
  const [mounted, setMounted] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const consent = localStorage.getItem("cookie_consent");
      if (!consent) {
        setShow(true);
      }
    } catch {
      // localStorage may be restricted in private browsing
    }
  }, []);

  const handleChoice = (accepted: boolean) => {
    try {
      localStorage.setItem("cookie_consent", accepted ? "accepted" : "declined");
    } catch {}
    setShow(false);
  };

  if (!mounted || !show) return null;

  return (
    <aside
      aria-label="Cookie and Privacy Consent"
      className="fixed bottom-0 inset-x-0 z-50 p-4 sm:p-6 pointer-events-none"
    >
      <div className="container-x max-w-4xl pointer-events-auto">
        <div className="rounded-xl border border-line bg-[var(--bg)]/95 p-5 shadow-2xl backdrop-blur-md flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1 text-xs sm:text-sm text-muted max-w-xl">
            <p className="font-serif text-[var(--fg)] text-sm sm:text-base font-medium">
              Cookie &amp; Privacy Choices
            </p>
            <p className="leading-relaxed">
              We and our partners (including Google AdSense) use cookies to personalize content and ads, analyze traffic, and ensure site security. Review our{" "}
              <Link href="/privacy" className="text-[var(--fg)] underline hover:opacity-80">
                Privacy Policy
              </Link>{" "}
              and{" "}
              <Link href="/terms" className="text-[var(--fg)] underline hover:opacity-80">
                Terms
              </Link>
              .
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
            <button
              onClick={() => handleChoice(false)}
              className="rounded-md border border-line px-4 py-2 text-xs font-medium text-muted transition hover:text-[var(--fg)] hover:border-[var(--fg)]"
            >
              Essential only
            </button>
            <button
              onClick={() => handleChoice(true)}
              className="rounded-md border border-[var(--fg)] bg-[var(--fg)] px-4 py-2 text-xs font-medium text-[var(--bg)] transition hover:opacity-90"
            >
              Accept all
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
