import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Parallax } from "@/components/landing/parallax";
import { Reveal } from "@/components/landing/reveal";

export const metadata: Metadata = {
  title: "Sobre",
  description: "O que é o Tabularium, como ele é construído e em que estágio o projeto está.",
  alternates: { canonical: "/sobre" },
};

export default function SobrePage() {
  return (
    <>
      <section className="site-section site-feature" aria-labelledby="sobre-title">
        <Reveal className="site-feature-copy">
          <h1 id="sobre-title" className="site-display">
            Um projeto pessoal, construído em público.
          </h1>
          <p className="site-lead text-[var(--graphite)]">
            O Tabularium nasceu como estudo de arquitetura, produto e design, para resolver um
            problema conhecido: organizar as demandas de uma equipe pequena sem depender de
            planilhas soltas.
          </p>
        </Reveal>
        <Reveal from="right" delay={120}>
          <Parallax speed={0.06}>
            <div className="site-feature-media">
              <Image
                src="/assets/landing/hero-archive-order.webp"
                alt="Arquivo antigo com fichas e caderno organizados"
                fill
                priority
                sizes="(min-width: 900px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </Parallax>
        </Reveal>
      </section>

      <section className="site-band" aria-labelledby="arquitetura-title">
        <div className="site-section site-split">
          <Reveal>
            <h2 id="arquitetura-title" className="site-h2">
              Arquitetura sólida, evoluindo em etapas.
            </h2>
          </Reveal>
          <Reveal delay={90} className="space-y-5">
            <p className="site-body">
              O Tabularium roda sobre PostgreSQL e Prisma, com o modelo de dados, as regras de
              segurança e a arquitetura documentados desde o início.
            </p>
            <p className="site-body">
              Cada nova etapa segue um roadmap público, então dá para acompanhar exatamente o que
              está sendo construído e o que vem a seguir.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="site-cta" aria-labelledby="sobre-cta-title">
        <div className="site-container site-cta-inner">
          <Reveal>
            <h2 id="sobre-cta-title" className="site-h2">
              Quer ver por dentro?
            </h2>
            <p className="site-lead">Entre no painel ou leia o código, os dois estão abertos.</p>
          </Reveal>
          <Reveal delay={90} className="site-cta-actions">
            <Link href="/login" className="button-accent">
              Entrar no Tabularium
            </Link>
            <a
              href="https://github.com/luizfelipe-pacifico/tabularium"
              target="_blank"
              rel="noreferrer"
              className="button-ghost"
            >
              Ver o código
            </a>
          </Reveal>
        </div>
      </section>
    </>
  );
}
