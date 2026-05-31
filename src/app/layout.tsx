import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "Khandelwal Real Estate — Luxury Properties in Vrindavan & Mathura",
  description: "Find your dream property in the sacred land of Braj. Trusted plots, villas, flats and commercial spaces in Vrindavan and Mathura — title-verified and devotionally curated.",
  openGraph: {
    title: "Khandelwal Real Estate — Vrindavan & Mathura Luxury Properties",
    description: "Curated plots, villas and homes in the sacred land of Braj.",
    type: "website",
    url: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Inter:wght@300;400;500;600;700&family=Cinzel:wght@400;600;700&display=swap" />
      </head>
      <body>
        {children}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}

