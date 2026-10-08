import type { Metadata } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Kalyan Manda | Sitecore Developer",
  description:
    "Sitecore Certified AI CMS Developer specializing in Sitecore XP, XM, XM Cloud, SXA, Sitecore MVC, .NET, and enterprise CMS platform delivery.",
  icons: {
    icon: "/developer-icon.svg",
  },
  openGraph: {
    url: siteUrl,
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
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full bg-slate-950 text-white">{children}</body>
    </html>
  );
}
