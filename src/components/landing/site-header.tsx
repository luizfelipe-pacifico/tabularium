"use client";

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

  useEffect(() => {
    if (!isHome) return;

    const onScroll = () => setScrolled(window.scrollY > 64);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  const transparent = isHome && !scrolled;

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
      </nav>
    </header>
  );
}
