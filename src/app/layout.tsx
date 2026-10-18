import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import { site } from "@/lib/content";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { CustomCursor } from "@/components/chrome/CustomCursor";
import { Navbar } from "@/components/chrome/Navbar";
import { Footer } from "@/components/chrome/Footer";
import { ScrollProgress } from "@/components/chrome/ScrollProgress";
import "./globals.css";

const manrope = Manrope({ variable: "--font-manrope", subsets: ["latin"], weight: ["300", "400", "500", "600", "700", "800"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: `%s — ${site.name}` },
  description: site.description,
  applicationName: site.fullName,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.fullName,
    title: site.title,
    description: site.description,
    url: "/",
    locale: "en_IN",
  },
  twitter: { card: "summary_large_image", title: site.title, description: site.description },
};

export const viewport: Viewport = {
  themeColor: "#071A2B",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.fullName,
    alternateName: site.name,
    slogan: site.tagline,
    description: site.description,
    url: site.url,
  };

  return (
    <html lang="en" className={`${manrope.variable} antialiased`}>
      <body>
        <SmoothScroll>
          <ScrollProgress />
          <Navbar />
          <main id="main">{children}</main>
          <Footer />
          <CustomCursor />
        </SmoothScroll>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
