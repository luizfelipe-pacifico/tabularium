"use client";

import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { BiGithub } from "./bi-icons";

export const REPOSITORY_URL = "https://github.com/luizfelipe-pacifico/tabularium";

// Section anchors on the home page; from any other route they navigate back to it.
const sections = [
  { id: "problema", label: "O problema" },
  { id: "metodo", label: "O método" },
  { id: "pontuacao", label: "Pontuação" },
  { id: "sistema", label: "O sistema" },
  { id: "roadmap", label: "Roadmap" },
  { id: "projeto", label: "O projeto" },
] as const;

export function SiteHeader() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [active, setActive] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Scrollspy: the section crossing the middle band of the viewport is the active one.
  useEffect(() => {
    if (!isHome) return;

    const targets = sections
      .map(({ id }) => document.getElementById(id))
      .filter((node): node is HTMLElement => node !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );

    targets.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [isHome]);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!mobileOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mobileOpen]);

  const links = sections.map((section) => ({
    ...section,
    href: isHome ? `#${section.id}` : `/#${section.id}`,
    current: isHome && active === section.id,
  }));

  return (
    <header className="site-header">
      <nav className="site-nav" aria-label="Principal">
        <Link href="/" className="site-brand" aria-label="Tabularium, página inicial">
          <Image src="/brand/icon-tabularium.png" width={30} height={30} alt="" priority />
          <span>Tabularium</span>
        </Link>

        <div className="site-nav-links">
          {links.map((link) => (
            <a key={link.id} href={link.href} aria-current={link.current ? "location" : undefined}>
              {link.label}
            </a>
          ))}
        </div>

        <div className="site-nav-actions">
          <a href={REPOSITORY_URL} target="_blank" rel="noreferrer" className="site-icon-link" aria-label="Repositório no GitHub">
            <BiGithub size={18} />
          </a>
          <Link href="/login" className="button-outline-light">
            Entrar
          </Link>
          <button
            type="button"
            className="site-mobile-toggle"
            aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={mobileOpen}
            aria-controls="site-mobile-panel"
            onClick={() => setMobileOpen((open) => !open)}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {mobileOpen ? (
        <div id="site-mobile-panel" className="site-mobile-panel">
          {links.map((link) => (
            <a
              key={link.id}
              href={link.href}
              aria-current={link.current ? "location" : undefined}
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <div className="site-mobile-actions">
            <Link href="/login" className="button-accent" onClick={() => setMobileOpen(false)}>
              Entrar no Tabularium
            </Link>
            <a href={REPOSITORY_URL} target="_blank" rel="noreferrer" className="button-outline-light">
              <BiGithub size={16} />
              Repositório
            </a>
          </div>
        </div>
      ) : null}
    </header>
  );
}
