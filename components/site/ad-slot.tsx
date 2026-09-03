"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

// Google AdSense slot. Renders nothing until a publisher id + ads are enabled,
// so the layout stays clean before/while AdSense approval is pending.
export function AdSlot({
  client,
  slot,
  enabled,
  format = "auto",
  className = "",
  label = "Advertisement",
}: {
  client: string | null;
  slot?: string;
  enabled?: boolean | null;
  format?: string;
  className?: string;
  label?: string;
}) {
  const adRef = useRef<HTMLModElement | null>(null);
  const pushedRef = useRef(false);

  const isEnabled = enabled !== false;
  const rawClient = client || process.env.NEXT_PUBLIC_ADSENSE_CLIENT || "ca-pub-9602292967626980";
  // Normalize publisher ID so both pub-XXXXX and ca-pub-XXXXX work smoothly
  const clientId = rawClient
    ? rawClient.startsWith("ca-pub-")
      ? rawClient
      : `ca-${rawClient.replace(/^pub-/, "pub-")}`
    : null;

  useEffect(() => {
    if (!clientId || !isEnabled || pushedRef.current) return;
    try {
      if (typeof window !== "undefined" && adRef.current) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        pushedRef.current = true;
      }
    } catch {
      /* ignore adblocker or duplicate push errors */
    }
  }, [clientId, isEnabled]);

  if (!clientId || !isEnabled) return null;

  return (
    <div className={`my-8 text-center ${className}`.trim()}>
      <p className="mb-1 text-center text-[10px] uppercase tracking-widest2 text-muted">
        {label}
      </p>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={clientId}
        {...(slot ? { "data-ad-slot": slot } : {})}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}
