import Image from "next/image";
import Link from "next/link";

import { SiteHeader } from "@/components/landing/site-header";

const footerLinks = [
  { href: "/", label: "Início" },
  { href: "/recursos", label: "Recursos" },
  { href: "/sobre", label: "Sobre" },
  { href: "/login", label: "Entrar" },
] as const;

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[var(--parchment)] text-[var(--foreground)]">
      <SiteHeader />

      <main>{children}</main>

      {/* Every page ends on a .site-cta field; the footer continues the same Ebony ground. */}
      <footer className="site-footer">
        <div className="site-container">
          <p className="site-footer-wordmark" aria-hidden="true">
            Tabularium
          </p>
          <div className="site-footer-meta">
            <div className="flex items-center gap-3">
              <Image src="/brand/icon-tabularium.png" width={22} height={22} alt="" />
              <p className="m-0">Projeto pessoal em desenvolvimento, ainda na fase de MVP.</p>
            </div>
            <nav aria-label="Rodapé">
              {footerLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
}
