import type { Metadata } from "next";
import { Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
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
        url: "/og-image.png",
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
    images: ["/og-image.png"],
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
    <html lang="es" className={`${outfit.variable} ${jetbrains.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "SoftGroup",
              url: "https://softgroup.com",
              logo: "https://softgroup.com/logo.png",
              description:
                "Desarrollo de software, agentes de Inteligencia Artificial, infraestructura tecnológica y soluciones empresariales de alto rendimiento.",
              sameAs: [
                "https://linkedin.com/company/softgroup",
                "https://instagram.com/softgroup",
                "https://github.com/softgroup",
              ],
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "customer service",
                availableLanguage: ["Spanish", "English"],
              },
            }),
          }}
        />
      </head>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
