import type { Metadata } from "next";
import "./globals.css";
import ErrorBoundary from "@/components/shared/ErrorBoundary";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Mouse Test Online - Free Mouse Button Test & CPS Test Tool | No Download",
  description: "FREE online mouse test tool for instant mouse button testing, click speed test (CPS), and gaming mouse diagnostics. Test mouse buttons, scroll wheel, and performance in seconds. Works with wireless mice and all browsers - no download required!",
  authors: [{ name: "Mouse Test" }],
  openGraph: {
    title: "Mouse Test Online - Free Mouse Button Test & CPS Test Tool",
    description: "FREE online mouse test tool for instant mouse button testing, click speed test (CPS), and gaming mouse diagnostics. No download required!",
    url: "https://mousetest.com",
    siteName: "Mouse Test Online",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mouse Test Online - Free Mouse Button Test & CPS Test Tool",
    description: "FREE online mouse test tool for instant mouse button testing, click speed test (CPS), and gaming mouse diagnostics. Works with all browsers!",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* 🔍 Google Analytics：追蹤網站訪問數據 */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-GMT50SJTRV"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-GMT50SJTRV');
          `}
        </Script>
      </head>
      <body className="antialiased">
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
      </body>
    </html>
  );
}
