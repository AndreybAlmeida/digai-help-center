import Footer from "@/components/layout/Footer";
import TopNav from "@/components/layout/TopNav";
import Providers from "@/components/shared/Providers";
import WhatsAppButton from "@/components/shared/WhatsAppButton";
import { SITE_CONFIG } from "@/lib/config";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "DigAI — The First Talent Intelligence Platform in Brazil",
    template: `%s — Central de Ajuda DigAI`,
  },
  description: SITE_CONFIG.description,
  icons: {
    icon: "/favicon-digai-32.png",
    apple: "/favicon-digai-32.png",
  },
  openGraph: {
    title: "DigAI — The First Talent Intelligence Platform in Brazil",
    description: SITE_CONFIG.description,
    url: "https://digaihelp.com",
    siteName: "Central de Ajuda DigAI",
    images: [
      {
        url: "https://digaihelp.com/opengraph-image",
        width: 1200,
        height: 630,
        alt: "DigAI — The First Talent Intelligence Platform in Brazil",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DigAI — The First Talent Intelligence Platform in Brazil",
    description: SITE_CONFIG.description,
    images: ["https://digaihelp.com/opengraph-image"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body style={{ background: "var(--bg)", color: "var(--fg)", WebkitFontSmoothing: "antialiased" }}>
        <Providers>
          <div style={{ display: "flex", minHeight: "100vh", flexDirection: "column" }}>
            <TopNav />
            <main style={{ flex: 1, background: "var(--bg)" }}>
              {children}
            </main>
            <Footer />
          </div>
          <WhatsAppButton />
        </Providers>
      </body>
    </html>
  );
}
