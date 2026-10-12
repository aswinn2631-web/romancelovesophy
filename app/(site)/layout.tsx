import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { SponsorBar } from "@/components/site/sponsor-bar";
import { FontFaces } from "@/components/site/font-faces";
import { PageTracker } from "@/components/site/page-tracker";
import { CookieBanner } from "@/components/site/cookie-banner";
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

  return (
    <div className="flex min-h-screen flex-col">
      <FontFaces />
      <PageTracker />
      <SponsorBar settings={settings} />
      <Header social={social} nav={nav} />
      <main className="flex-1">{children}</main>
      <Footer social={social} />
      <CookieBanner />
    </div>
  );
}

