import Script from "next/script";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { SponsorBar } from "@/components/site/sponsor-bar";
import { FontFaces } from "@/components/site/font-faces";
import { PageTracker } from "@/components/site/page-tracker";
import { getSocialLinks, getSettings } from "@/lib/queries";
import { resolveNav } from "@/lib/nav";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [social, settings] = await Promise.all([
    getSocialLinks(),
    getSettings(),
  ]);

  const nav = resolveNav(settings?.nav_items)
    .filter((n) => n.visible)
    .filter((n) => n.href !== "/shorts" || settings?.shorts_enabled);

  const isAdsEnabled = settings?.ads_enabled !== false;
  const rawAdClient = isAdsEnabled
    ? settings?.adsense_client || process.env.NEXT_PUBLIC_ADSENSE_CLIENT || "ca-pub-9602292967626980"
    : null;

  const adsense = rawAdClient
    ? rawAdClient.startsWith("ca-pub-")
      ? rawAdClient
      : `ca-${rawAdClient.replace(/^pub-/, "pub-")}`
    : null;

  return (
    <div className="flex min-h-screen flex-col">
      <FontFaces />
      <PageTracker />
      {adsense && (
        <Script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsense}`}
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      )}
      <SponsorBar settings={settings} />
      <Header social={social} nav={nav} />
      <main className="flex-1">{children}</main>
      <Footer social={social} />
    </div>
  );
}
