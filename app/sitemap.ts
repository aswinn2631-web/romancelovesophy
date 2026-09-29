import type { MetadataRoute } from "next";
import { getArticles, getQuotes } from "@/lib/queries";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const rawBase = process.env.NEXT_PUBLIC_SITE_URL || "https://www.romancelovesophy.com";
  const base = rawBase.includes("romancelovesophy.com") && !rawBase.includes("www.")
    ? "https://www.romancelovesophy.com"
    : rawBase;

  const [articles, quotes] = await Promise.all([getArticles(), getQuotes()]);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}`, lastModified: new Date(), changeFrequency: "daily", priority: 1.0 },
    { url: `${base}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/articles`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${base}/quotes`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/videos`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/connect`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/contact`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.7 },
    { url: `${base}/privacy`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.5 },
    { url: `${base}/terms`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.5 },
  ];

  const articleRoutes: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${base}/articles/${a.slug}`,
    lastModified: new Date(a.updated_at || a.created_at),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const quoteRoutes: MetadataRoute.Sitemap = quotes.map((q) => ({
    url: `${base}/quotes/${q.id}`,
    lastModified: new Date(q.created_at),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...articleRoutes, ...quoteRoutes];
}
