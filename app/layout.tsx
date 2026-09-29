import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const serif = Fraunces({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});
const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.romancelovesophy.com";
const siteUrl = rawSiteUrl.includes("romancelovesophy.com") && !rawSiteUrl.includes("www.")
  ? "https://www.romancelovesophy.com"
  : rawSiteUrl;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Romancelovesophy — Romance, Love, and Philosophy",
    template: "%s · Romancelovesophy",
  },
  description:
    "Romance, Love, and Philosophy. Quiet reflections on love, meaning, and the art of living — quotes, films, and writing by Aswin Sundharam.",
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    siteName: "Romancelovesophy",
    title: "Romancelovesophy — Romance, Love, and Philosophy",
    description:
      "Romance, Love, and Philosophy. Quiet reflections on love, meaning, and the art of living — quotes, films, and writing by Aswin Sundharam.",
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: "Romancelovesophy — Romance, Love, and Philosophy",
    description:
      "Romance, Love, and Philosophy. Quiet reflections on love, meaning, and the art of living — quotes, films, and writing by Aswin Sundharam.",
  },

  other: {
    "google-adsense-account": "ca-pub-9602292967626980",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9602292967626980"
          crossOrigin="anonymous"
        />
      </head>
      <body className={`${serif.variable} ${sans.variable}`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
