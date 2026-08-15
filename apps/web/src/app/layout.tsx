import type { Metadata } from "next";
import { Montserrat, Playfair_Display } from "next/font/google";

import "../index.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tabularium",
  description: "Demand intelligence and operational overview.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body className={`${montserrat.variable} ${playfair.variable}`}>{children}</body>
    </html>
  );
}
