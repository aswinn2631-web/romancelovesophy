"use client";

import { useEffect } from "react";
import Link from "next/link";
import { RefreshCw, LayoutDashboard } from "lucide-react";

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[Admin Error]:", error);
  }, [error]);

  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center p-8 text-center">
      <div className="max-w-md rounded-xl border border-line bg-card p-6">
        <h2 className="font-serif text-2xl font-medium">Dashboard error</h2>
        <p className="mt-2 text-sm text-muted">
          An error occurred while loading this section of the admin panel. Your saved data is
          intact.
        </p>

        {error.message && process.env.NODE_ENV !== "production" && (
          <pre className="mt-4 max-h-40 overflow-auto rounded border border-line bg-black/40 p-3 text-left font-mono text-xs text-red-400">
            {error.message}
          </pre>
        )}

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => reset()}
            className="inline-flex items-center gap-1.5 rounded-md border border-[var(--fg)] px-4 py-2 text-sm transition hover:bg-[var(--fg)] hover:text-[var(--bg)]"
          >
            <RefreshCw size={14} /> Try again
          </button>
          <Link
            href="/admin"
            className="inline-flex items-center gap-1.5 rounded-md border border-line px-4 py-2 text-sm text-muted transition hover:border-[var(--fg)] hover:text-[var(--fg)]"
          >
            <LayoutDashboard size={14} /> Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
