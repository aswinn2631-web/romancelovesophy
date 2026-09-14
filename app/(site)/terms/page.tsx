import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms and conditions of use for Romancelovesophy.",
};

export default function TermsPage() {
  return (
    <div className="container-x py-14 sm:py-20">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-muted transition hover:text-[var(--fg)]"
        >
          <ArrowLeft size={14} /> Back to Home
        </Link>

        <header className="mt-8 mb-12">
          <p className="eyebrow">Legal</p>
          <h1 className="mt-3 font-serif text-3xl font-medium sm:text-5xl">Terms of Service</h1>
          <p className="mt-4 text-sm text-muted">Last updated: September 14, 2026</p>
        </header>

        <div className="prose-editorial text-[15px] leading-relaxed text-[var(--fg)]/90 space-y-6">
          <p>
            Welcome to <strong>Romancelovesophy</strong>. By accessing or using our website located at{" "}
            <a href="https://romancelovesophy.com" className="underline">
              https://romancelovesophy.com
            </a>
            , you agree to be bound by these Terms of Service.
          </p>

          <h2 className="font-serif text-2xl font-medium text-[var(--fg)] pt-4">1. Use of Content</h2>
          <p>
            All original quotes, reflections, essays, videos, and artistic graphics published on Romancelovesophy are protected by copyright and intellectual property laws. You may share excerpts or downloadable quotes for personal, non-commercial use provided appropriate credit is given to Romancelovesophy.
          </p>

          <h2 className="font-serif text-2xl font-medium text-[var(--fg)] pt-4">2. User Conduct</h2>
          <p>
            When interacting with the site (including submitting comments or contact requests), you agree not to transmit any unlawful, harassing, defamatory, or harmful content.
          </p>

          <h2 className="font-serif text-2xl font-medium text-[var(--fg)] pt-4">3. Disclaimer</h2>
          <p>
            The content on Romancelovesophy is provided for informational, philosophical, and reflective purposes only. The website does not offer medical, legal, or psychological counseling.
          </p>

          <h2 className="font-serif text-2xl font-medium text-[var(--fg)] pt-4">4. Changes to Terms</h2>
          <p>
            We reserve the right to modify these terms at any time. Continued use of the website following any changes constitutes acceptance of those changes.
          </p>

          <h2 className="font-serif text-2xl font-medium text-[var(--fg)] pt-4">5. Contact</h2>
          <p>
            If you have questions concerning these Terms, please reach out via our{" "}
            <Link href="/contact" className="underline text-[var(--fg)]">
              Contact page
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
