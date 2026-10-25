import Image from "next/image";
import Link from "next/link";

import { BackToTop } from "@/components/landing/back-to-top";
import { BiBoxArrowUpRight } from "@/components/landing/bi-icons";
import { REPOSITORY_URL, SiteHeader } from "@/components/landing/site-header";

const productLinks = [
  { href: "/#problema", label: "O problema" },
  { href: "/#metodo", label: "O método" },
  { href: "/#pontuacao", label: "Pontuação" },
  { href: "/#sistema", label: "Telas do sistema" },
  { href: "/#roadmap", label: "Roadmap" },
];

const projectLinks = [
  { href: REPOSITORY_URL, label: "Repositório", external: true },
  { href: `${REPOSITORY_URL}/issues`, label: "Abrir uma issue", external: true },
  { href: "/recursos", label: "Recursos" },
  { href: "/sobre", label: "Sobre" },
  { href: "/login", label: "Entrar" },
];

// The public site is light-only (`.site-light` re-declares the light tokens); Ebony fields
// inside the page are deliberate sections, not a theme.
export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div id="topo" className="site-light min-h-svh">
      <SiteHeader />

      <main>{children}</main>

      <footer className="site-footer">
        <div className="site-container">
          <div className="site-footer-grid">
            <div>
              <Link href="/" className="site-footer-brand">
                <Image src="/brand/icon-tabularium-black.png" width={32} height={32} alt="" />
                Tabularium
              </Link>
              <p className="site-footer-tagline">Prioridade clara, roadmap visível. Gestão de demandas em código aberto.</p>
            </div>
            <nav aria-labelledby="footer-produto">
              <h2 id="footer-produto">Produto</h2>
              <ul>
                {productLinks.map((link) => (
                  <li key={link.href}>
                    <a href={link.href}>{link.label}</a>
                  </li>
                ))}
              </ul>
            </nav>
            <nav aria-labelledby="footer-projeto">
              <h2 id="footer-projeto">Projeto</h2>
              <ul>
                {projectLinks.map((link) => (
                  <li key={link.href}>
                    {link.external ? (
                      <a href={link.href} target="_blank" rel="noreferrer">
                        {link.label}
                        <BiBoxArrowUpRight size={12} />
                      </a>
                    ) : (
                      <a href={link.href}>{link.label}</a>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          <div className="site-footer-meta">
            <p>Projeto pessoal em desenvolvimento aberto, ainda na fase de MVP.</p>
            <p>
              Ícones por{" "}
              <a href="https://icons.getbootstrap.com/" target="_blank" rel="noreferrer">
                Bootstrap Icons
              </a>
              , licença MIT.
            </p>
          </div>
        </div>
      </footer>

      <BackToTop />
    </div>
  );
}
