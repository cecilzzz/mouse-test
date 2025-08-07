import type { Metadata } from "next";
import "./globals.css";
import ErrorBoundary from "@/components/shared/ErrorBoundary";

export const metadata: Metadata = {
  title: "Mouse Test - Complete Mouse Testing Tools Online | CPS Test, DPI Test, Button Test",
  description: "Complete mouse testing suite with button test, CPS test, DPI analyzer, double click test, and scroll wheel test. Professional diagnostics for gaming mice, wireless mice, and all mouse types. Check performance, accuracy, and speed online instantly.",
  authors: [{ name: "Mouse Test" }],
  openGraph: {
    title: "Mouse Test - Complete Mouse Testing Tools Online",
    description: "Test your mouse buttons, measure CPS, check DPI, and diagnose performance issues with our professional mouse testing suite.",
    url: "https://mousetest.com",
    siteName: "Mouse Test",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mouse Test - Complete Mouse Testing Tools Online",
    description: "Professional mouse testing tools for button functionality, CPS measurement, DPI analysis, and performance optimization.",
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
      <body className="antialiased">
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
      </body>
    </html>
  );
}
