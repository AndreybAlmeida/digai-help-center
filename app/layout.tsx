import Footer from "@/components/layout/Footer";
import TopNav from "@/components/layout/TopNav";
import Providers from "@/components/shared/Providers";
import WhatsAppButton from "@/components/shared/WhatsAppButton";
import { SITE_CONFIG } from "@/lib/config";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: SITE_CONFIG.name,
    template: `%s — ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  icons: {
    icon: "/favicon-digai-32.png",
    apple: "/favicon-digai-32.png",
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
