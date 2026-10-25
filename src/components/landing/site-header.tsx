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

  useEffect(() => {
    if (!mobileOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mobileOpen]);

  // Opening the mobile menu forces the solid header state, even over the hero —
  // light text/icons on a transparent bar would be unreadable against the open panel.
  const transparent = isHome && !scrolled && !mobileOpen;

  return (
    <header className={`site-header ${transparent ? "site-header-transparent" : ""}`}>
      <nav className="site-nav" aria-label="Principal">
        <Link href="/" className="site-brand" aria-label="Tabularium, página inicial">
          {/* Off-white mark over the hero and in dark mode, black mark on light surfaces. */}
          <Image
            src="/brand/icon-tabularium-black.png"
            width={28}
            height={28}
            alt=""
            className={transparent ? "hidden" : "dark:hidden"}
            priority
          />
          <Image
            src="/brand/icon-tabularium.png"
            width={28}
            height={28}
            alt=""
            className={transparent ? undefined : "hidden dark:block"}
            priority
          />
          <span>Tabularium</span>
        </Link>

        <div className="site-nav-links">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} aria-current={pathname === link.href ? "page" : undefined}>
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
          aria-controls="site-mobile-panel"
          onClick={() => setMobileOpen((open) => !open)}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {mobileOpen ? (
        <div id="site-mobile-panel" className="site-mobile-panel">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={pathname === link.href ? "page" : undefined}
              onClick={() => setMobileOpen(false)}
            >
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
