import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://example.com"),
  title: "Kalyan Manda | Sitecore Developer",
  description:
    "Sitecore Certified AI CMS Developer specializing in Sitecore XP, XM, XM Cloud, SXA, Sitecore MVC, .NET, and enterprise CMS platform delivery.",
  openGraph: {
    title: "Kalyan Manda | Sitecore Developer",
    description:
      "Portfolio and resume for a Sitecore Developer focused on digital experience platforms, CMS innovation, and enterprise web solutions.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kalyan Manda | Sitecore Developer",
    description:
      "Sitecore Certified AI CMS Developer with enterprise experience across Sitecore XP, XM, XMC, SXA, and ASP.NET solutions.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-slate-950 text-white">{children}</body>
    </html>
  );
}
