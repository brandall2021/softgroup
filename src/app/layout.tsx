import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "600", "700"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://softgroup.com";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "SoftGroup | Soluciones Digitales Inteligentes",
    template: "%s | SoftGroup",
  },
  description:
    "Desarrollo de software, agentes de Inteligencia Artificial, infraestructura tecnológica y soluciones empresariales de alto rendimiento.",
  keywords: [
    "desarrollo web",
    "inteligencia artificial",
    "agentes IA",
    "automatización",
    "sistemas informáticos",
    "ciberseguridad",
    "cloud computing",
    "redes",
    "networking",
    "consultoría tecnológica",
    "SoftGroup",
  ],
  authors: [{ name: "SoftGroup" }],
  creator: "SoftGroup",
  publisher: "SoftGroup",
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "SoftGroup",
  },
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      { url: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
    ],
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://softgroup.com",
    siteName: "SoftGroup",
    title: "SoftGroup | Soluciones Digitales Inteligentes",
    description:
      "Desarrollo de software, agentes de IA, infraestructura tecnológica y soluciones empresariales de alto rendimiento.",
    images: [
      {
        url: "/logo-full.png",
        width: 1200,
        height: 630,
        alt: "SoftGroup - Soluciones Digitales Inteligentes",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SoftGroup | Soluciones Digitales Inteligentes",
    description:
      "Desarrollo de software, agentes de IA, infraestructura tecnológica y soluciones empresariales de alto rendimiento.",
    images: ["/logo-full.png"],
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} ${jetbrains.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "SoftGroup",
              url: "https://softgroup.com",
              logo: "https://softgroup.com/logo-full.png",
              description:
                "Desarrollo de software, agentes de Inteligencia Artificial, infraestructura tecnológica y soluciones empresariales de alto rendimiento.",
              sameAs: [
                "https://linkedin.com/company/softgroup",
                "https://instagram.com/softgroup",
                "https://github.com/softgroup",
                "https://facebook.com/softgroup",
              ],
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "customer service",
                availableLanguage: ["Spanish", "English"],
              },
              address: {
                "@type": "PostalAddress",
                addressCountry: "MX",
                addressRegion: "CDMX",
              },
              priceRange: "$$-$$$",
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "SoftGroup",
              url: "https://softgroup.com",
              potentialAction: {
                "@type": "SearchAction",
                target: "https://softgroup.com/?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </head>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
