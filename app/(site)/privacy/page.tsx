import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy and information regarding data collection, cookies, and advertising on Romancelovesophy.",
};

export default function PrivacyPolicyPage() {
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
          <p className="eyebrow">Legal & Compliance</p>
          <h1 className="mt-3 font-serif text-3xl font-medium sm:text-5xl">Privacy Policy</h1>
          <p className="mt-4 text-sm text-muted">Last updated: September 14, 2026</p>
        </header>

        <div className="prose-editorial text-[15px] leading-relaxed text-[var(--fg)]/90 space-y-6">
          <p>
            At <strong>Romancelovesophy</strong> (accessible from{" "}
            <a href="https://romancelovesophy.com" className="underline">
              https://romancelovesophy.com
            </a>
            ), the privacy of our visitors is of paramount importance to us. This Privacy Policy document outlines the types of personal information that is received and collected by Romancelovesophy and how it is used.
          </p>

          <h2 className="font-serif text-2xl font-medium text-[var(--fg)] pt-4">1. Information We Collect</h2>
          <p>
            When you visit our website, subscribe to our newsletter, or submit a message through our contact form, we may collect:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted">
            <li><strong>Contact details:</strong> Name and email address when voluntarily provided by you.</li>
            <li><strong>Log Files & Usage Data:</strong> IP addresses, browser types, Internet Service Provider (ISP), referring/exit pages, date/time stamps, and page interaction metrics.</li>
          </ul>

          <h2 className="font-serif text-2xl font-medium text-[var(--fg)] pt-4">2. Cookies and Web Beacons</h2>
          <p>
            Romancelovesophy uses cookies to store information about visitors&apos; preferences, record user-specific information on which pages the user accesses or visits, and customize web page content based on visitors&apos; browser type or other information that the visitor sends via their browser.
          </p>

          <h2 className="font-serif text-2xl font-medium text-[var(--fg)] pt-4">3. Google AdSense & DoubleClick DART Cookies</h2>
          <p>
            Google is a third-party vendor on our site. It uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to <code>romancelovesophy.com</code> and other sites on the internet.
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted">
            <li>
              Third-party vendors, including Google, use cookies to serve ads based on a user&apos;s prior visits to your website or other websites.
            </li>
            <li>
              Google&apos;s use of advertising cookies enables it and its partners to serve ads to users based on their visit to your sites and/or other sites on the Internet.
            </li>
            <li>
              Visitors may opt out of personalized advertising by visiting{" "}
              <a
                href="https://www.google.com/settings/ads"
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-[var(--fg)]"
              >
                Google Ads Settings
              </a>
              . Alternatively, users can opt out of third-party vendor cookies for personalized advertising by visiting{" "}
              <a
                href="https://www.aboutads.info/choices/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-[var(--fg)]"
              >
                aboutads.info
              </a>
              .
            </li>
          </ul>

          <h2 className="font-serif text-2xl font-medium text-[var(--fg)] pt-4">4. Third-Party Privacy Policies</h2>
          <p>
            Romancelovesophy&apos;s Privacy Policy does not apply to other advertisers or websites. Thus, we advise you to consult the respective Privacy Policies of these third-party ad servers for more detailed information. It may include their practices and instructions about how to opt-out of certain options.
          </p>

          <h2 className="font-serif text-2xl font-medium text-[var(--fg)] pt-4">5. Children&apos;s Information</h2>
          <p>
            Another part of our priority is adding protection for children while using the internet. We encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity. Romancelovesophy does not knowingly collect any Personal Identifiable Information from children under the age of 13.
          </p>

          <h2 className="font-serif text-2xl font-medium text-[var(--fg)] pt-4">6. Consent</h2>
          <p>
            By using our website, you hereby consent to our Privacy Policy and agree to its Terms and Conditions.
          </p>

          <h2 className="font-serif text-2xl font-medium text-[var(--fg)] pt-4">7. Contact Us</h2>
          <p>
            If you have any additional questions or require more information about our Privacy Policy, do not hesitate to contact us through our{" "}
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
