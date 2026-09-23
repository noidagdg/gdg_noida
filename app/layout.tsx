import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import SmoothScroll from "@/components/providers/smooth-scroll";
import "./globals.css";

export const metadata: Metadata = {
  title: "GDG Noida",
  description:
    "GDG Noida is a community of developers who are passionate about technology and innovation.",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "GDG Noida",
    description:
      "GDG Noida is a community of developers who are passionate about technology and innovation.",
    url: "https://gdgnoida.com",
    siteName: "GDG Noida",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://iili.io/fdmbmil.png",
        width: 1200,
        height: 630,
        alt: "GDG Noida hero preview",
      },
    ],
  },
  other: {
    "og:logo": "https://gdgnoida.com/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta property="og:type" content="website" />
        <meta property="og:title" content="GDG Noida" />
        <meta property="og:url" content="https://gdgnoida.com" />
        <meta property="og:image" content="https://iili.io/fdmbmil.png" />
        <meta
          property="og:description"
          content="GDG Noida is a community of developers who are passionate about technology and innovation."
        />
        <meta property="og:logo" content="https://iili.io/fdmbmil.png" />
      </head>
      <body
        className="antialiased"
        suppressHydrationWarning
      >
        <SmoothScroll>{children}</SmoothScroll>
        <Analytics />
      </body>
    </html>
  );
}
