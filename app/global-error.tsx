"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[Global Error]:", error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          padding: 0,
          background: "#0c0a09",
          color: "#fafaf9",
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          display: "flex",
          minHeight: "100vh",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: 480, padding: 24 }}>
          <h1 style={{ fontSize: 24, fontWeight: 500, margin: "0 0 12px 0" }}>
            Application Error
          </h1>
          <p
            style={{
              fontSize: 14,
              color: "#a8a29e",
              lineHeight: 1.6,
              margin: "0 0 24px 0",
            }}
          >
            A momentary issue occurred while loading this page. Please try refreshing.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
            <button
              onClick={() => reset()}
              style={{
                cursor: "pointer",
                padding: "10px 20px",
                fontSize: 14,
                borderRadius: 6,
                background: "#fafaf9",
                color: "#0c0a09",
                border: "none",
                fontWeight: 500,
              }}
            >
              Try again
            </button>
            <a
              href="/"
              style={{
                display: "inline-block",
                padding: "10px 20px",
                fontSize: 14,
                borderRadius: 6,
                background: "transparent",
                color: "#a8a29e",
                border: "1px solid #292524",
                textDecoration: "none",
              }}
            >
              Home
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}
