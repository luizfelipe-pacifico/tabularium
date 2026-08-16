import Image from "next/image";

import { SiteHeader } from "@/components/landing/site-header";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[var(--parchment)] text-[var(--foreground)]">
      <SiteHeader />

      <main>{children}</main>

      <footer className="site-footer">
        <div className="site-footer-inner">
          <div className="flex items-center gap-2">
            <Image
              src="/brand/icon-tabularium-black.png"
              width={18}
              height={18}
              alt="Símbolo do Tabularium"
              className="dark:hidden"
            />
            <Image
              src="/brand/icon-tabularium.png"
              width={18}
              height={18}
              alt="Símbolo do Tabularium"
              className="hidden dark:block"
            />
            <span className="font-semibold text-[var(--foreground)]">Tabularium</span>
          </div>
          <p>Projeto pessoal em desenvolvimento, ainda na fase de MVP.</p>
        </div>
      </footer>
    </div>
  );
}
