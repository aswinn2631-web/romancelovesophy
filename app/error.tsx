"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, RefreshCw } from "lucide-react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[Site Error Boundary]:", error);
  }, [error]);

  return (
    <div className="container-x flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <p className="eyebrow">Notice</p>
      <h1 className="mt-4 font-serif text-3xl font-medium sm:text-4xl">
        Something unexpected occurred
      </h1>
      <p className="mt-4 max-w-md text-sm text-muted">
        We encountered a momentary issue while loading this page. You can try refreshing the page or
        returning to the home page.
      </p>

      {error.message && process.env.NODE_ENV !== "production" && (
        <pre className="mt-6 max-w-xl overflow-x-auto rounded-lg border border-line bg-card p-4 text-left font-mono text-xs text-red-400">
          {error.message}
        </pre>
      )}

      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <button
          onClick={() => reset()}
          className="inline-flex items-center gap-2 rounded-md border border-[var(--fg)] px-5 py-2.5 text-sm transition hover:bg-[var(--fg)] hover:text-[var(--bg)]"
        >
          <RefreshCw size={14} /> Try again
        </button>
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-md border border-line px-5 py-2.5 text-sm text-muted transition hover:border-[var(--fg)] hover:text-[var(--fg)]"
        >
          <ArrowLeft size={14} /> Back to Home
        </Link>
      </div>
    </div>
  );
}
