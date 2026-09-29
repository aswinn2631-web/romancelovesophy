import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const rawBase = process.env.NEXT_PUBLIC_SITE_URL || "https://www.romancelovesophy.com";
  const base = rawBase.includes("romancelovesophy.com") && !rawBase.includes("www.")
    ? "https://www.romancelovesophy.com"
    : rawBase;

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/api"],
      },
      {
        userAgent: "Mediapartners-Google",
        allow: "/",
      },
    ],
    sitemap: `${base}/sitemap.xml`,
  };
}

