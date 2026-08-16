"use client";

import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navLinks = [
  { href: "/", label: "Início" },
  { href: "/recursos", label: "Recursos" },
  { href: "/sobre", label: "Sobre" },
] as const;

export function SiteHeader() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (!isHome) return;

    const onScroll = () => setScrolled(window.scrollY > 64);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Opening the mobile menu forces the solid header state, even over the hero —
  // light text/icons on a transparent bar would be unreadable against the open panel.
  const transparent = isHome && !scrolled && !mobileOpen;

  return (
    <header className={`site-header ${transparent ? "site-header-transparent" : ""}`}>
      <nav className="site-nav">
        <Link href="/" className="site-brand">
          <Image
            src={transparent ? "/brand/icon-tabularium.png" : "/brand/icon-tabularium-black.png"}
            width={28}
            height={28}
            alt="Símbolo do Tabularium"
            priority
          />
          <span>Tabularium</span>
        </Link>

        <div className="site-nav-links">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </div>

        <Link href="/login" className="button-primary">
          Entrar
        </Link>

        <button
          type="button"
          className="site-mobile-toggle"
          aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((open) => !open)}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {mobileOpen ? (
        <div className="site-mobile-panel">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)}>
              {link.label}
            </Link>
          ))}
          <Link href="/login" className="button-primary" onClick={() => setMobileOpen(false)}>
            Entrar
          </Link>
        </div>
      ) : null}
    </header>
  );
}
