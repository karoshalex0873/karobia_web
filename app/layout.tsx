import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const siteUrl = "https://karobia.dev";
const siteName = "Karobia Dev";
const siteDescription =
  "Alex Karobia is a software engineer and AI/ML enthusiast building modern web applications, intelligent tools, and practical technology projects.";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Karobia Dev - Portfolio",
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  keywords: [
    "Alex Karobia",
    "Karobia Dev",
    "portfolio",
    "software engineer",
    "web developer",
    "Next.js developer",
    "React developer",
    "software development",
    "artificial intelligence",
    "machine learning",
    "AI projects",
    "ML projects",
  ],
  authors: [{ name: "Alex Karobia", url: siteUrl }],
  creator: "Alex Karobia",
  publisher: "Alex Karobia",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Karobia Dev - Alex Karobia Portfolio",
    description: siteDescription,
    url: "/",
    siteName,
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Karobia Dev portfolio preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Karobia Dev - Alex Karobia Portfolio",
    description: siteDescription,
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
