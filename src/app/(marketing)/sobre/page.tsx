import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Parallax } from "@/components/landing/parallax";
import { Reveal } from "@/components/landing/reveal";

export const metadata: Metadata = {
  title: "Sobre — Tabularium",
  description: "O que é o Tabularium e em que estágio o projeto está.",
};

export default function SobrePage() {
  return (
    <>
      <section className="site-section grid items-center gap-14 md:grid-cols-2">
        <Reveal>
          <p className="site-eyebrow">sobre o projeto</p>
          <h1
            className="mt-4 text-4xl leading-tight font-extrabold sm:text-5xl"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            Um projeto pessoal, construído em público,
          </h1>
          <p className="mt-5 max-w-md text-[15px] leading-relaxed text-[var(--graphite)]">
            o Tabularium nasceu como estudo de arquitetura, produto e design, para resolver um
            problema conhecido, organizar demandas de uma equipe pequena sem depender de planilhas
            soltas,
          </p>
        </Reveal>
        <Reveal from="right" delay={120}>
          <Parallax speed={0.08}>
            <div className="relative aspect-[3/2] overflow-hidden rounded-lg border border-[var(--line)] shadow-[0_1px_2px_rgb(26_17_10/8%)]">
              <Image src="/assets/landing/hero-archive-order.webp" alt="Arquivo antigo com fichas e caderno organizados" fill className="object-cover" />
            </div>
          </Parallax>
        </Reveal>
      </section>

      <section className="site-section max-w-2xl border-t border-[var(--line)]">
        <Reveal>
          <p className="site-eyebrow">arquitetura</p>
          <h2 className="mt-3 text-2xl font-extrabold" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
            Construído com arquitetura sólida, evoluindo em etapas
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-[var(--graphite)]">
            o Tabularium roda sobre PostgreSQL e Prisma, com o modelo de dados, as regras de
            segurança e a arquitetura documentados desde o início, cada nova etapa segue um roadmap
            público, então dá para acompanhar exatamente o que está sendo construído e o que vem a
            seguir,
          </p>
        </Reveal>
      </section>

      <section className="site-section border-t border-[var(--line)] text-center">
        <Reveal>
          <h2 className="text-2xl font-extrabold" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
            Quer ver por dentro,
          </h2>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link href="/login" className="button-primary">
              Entrar no Tabularium
            </Link>
            <a
              href="https://github.com/luizfelipe-pacifico/tabularium"
              target="_blank"
              rel="noreferrer"
              className="button-secondary"
            >
              Ver o código
            </a>
          </div>
        </Reveal>
      </section>
    </>
  );
}
