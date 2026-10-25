import type { Metadata, Viewport } from "next";
import { Montserrat, Playfair_Display } from "next/font/google";
import { env } from "@tabularium/env/web";

import "../index.css";
import Providers from "@/components/providers";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const description =
  "Gestão de demandas com prioridade por pontuação, histórico de cada mudança e roadmap visível para toda a equipe.";

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: {
    default: "Tabularium, gestão de demandas com prioridade clara",
    template: "%s | Tabularium",
  },
  description,
  applicationName: "Tabularium",
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Tabularium",
    title: "Tabularium, gestão de demandas com prioridade clara",
    description,
    images: [
      {
        url: "/assets/landing/hero-archive-order.webp",
        width: 1536,
        height: 1024,
        alt: "Arquivo de fichas em madeira, ilustrado à mão",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tabularium, gestão de demandas com prioridade clara",
    description,
    images: ["/assets/landing/hero-archive-order.webp"],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4f1ea" },
    { media: "(prefers-color-scheme: dark)", color: "#211e1a" },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    // The font variables live on <html>, not <body>: `html { font-family }` in globals.css
    // resolves them there, and declaring them one level down left every page in the
    // browser's default serif.
    <html lang="pt-BR" className={`${montserrat.variable} ${playfair.variable}`} suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
