import Sprite from "@/components/icons/Sprite";
import AppShell from "@/components/shell/AppShell";
import { SITE_CONFIG } from "@/lib/config";
import type { Metadata } from "next";
import { Inter_Tight, Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--ff-display",
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--ff-body",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://digaihelp.com"),
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

/**
 * Aplica o estado do rail antes da primeira pintura, lendo o cookie.
 *
 * Ler o cookie via `cookies()` no servidor tornaria TODAS as rotas dinâmicas —
 * o site inteiro perderia a geração estática por causa de uma preferência de
 * menu. Este script roda como primeiro filho do <body>, então `document.body`
 * já existe e a classe entra antes de qualquer pixel ir para a tela: mesmo
 * resultado, sem abrir mão do estático.
 */
const RAIL_INIT = `(function(){try{if(document.cookie.indexOf("digai_rail=mini")>-1){document.body.classList.add("rail-collapsed")}}catch(e){}})()`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${manrope.variable} ${interTight.variable}`}>
      <body>
        <script dangerouslySetInnerHTML={{ __html: RAIL_INIT }} />
        <Sprite />
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
