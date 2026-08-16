import Image from "next/image";
import Link from "next/link";

const navLinks = [
  { href: "/", label: "Início" },
  { href: "/recursos", label: "Recursos" },
  { href: "/sobre", label: "Sobre" },
] as const;

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[var(--parchment)] text-[var(--ebony)]">
      <header className="site-header">
        <nav className="site-nav">
          <Link href="/" className="site-brand">
            <Image src="/brand/icon-tabularium-black.png" width={28} height={28} alt="Símbolo do Tabularium" priority />
            <span>Tabularium</span>
          </Link>
          <div className="site-nav-links">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                {link.label}
              </Link>
            ))}
            <Link href="/login" className="button-primary">
              Entrar
            </Link>
          </div>
        </nav>
      </header>

      <main>{children}</main>

      <footer className="site-footer">
        <div className="site-footer-inner">
          <div className="flex items-center gap-2">
            <Image src="/brand/icon-tabularium-black.png" width={18} height={18} alt="Símbolo do Tabularium" />
            <span className="font-semibold text-[var(--ebony)]">Tabularium</span>
          </div>
          <p>Projeto pessoal em desenvolvimento, ainda na fase de MVP.</p>
        </div>
      </footer>
    </div>
  );
}
