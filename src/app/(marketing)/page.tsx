import { existsSync } from "node:fs";
import path from "node:path";

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { env } from "@tabularium/env/web";

import { CountUp } from "@/components/landing/count-up";
import { Parallax } from "@/components/landing/parallax";
import { Reveal } from "@/components/landing/reveal";
import { TiltCard } from "@/components/landing/tilt-card";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

// The hero video is optional (see docs/DESIGN-LOG.md). Only render <video> once the file
// exists, so visitors never pay for a 404 and the optimized still stays the LCP image.
const HERO_VIDEO = "/videos/hero.mp4";
const hasHeroVideo = existsSync(path.join(process.cwd(), "public", HERO_VIDEO));

const pillars = [
  {
    image: "/assets/landing/feature-organized-records.webp",
    alt: "Fichas saindo em fila de um arquivo de gavetas",
    title: "Quadro",
    text: "Veja todas as demandas ativas organizadas por status, do pedido novo até a entrega.",
  },
  {
    image: "/assets/landing/feature-workflow-clarity.webp",
    alt: "Um traço emaranhado que se desfaz num caminho reto até o alvo",
    title: "Jornada",
    text: "Acompanhe o histórico de cada demanda, com cada mudança de status registrada e datada.",
  },
  {
    image: "/assets/landing/feature-priority-balance.webp",
    alt: "Balança antiga pesando fichas contra uma moeda",
    title: "Pontuação",
    text: "Prioridade, categoria e tempo de espera viram uma pontuação, para saber o que resolver primeiro.",
  },
];

// Grounded numbers only (docs/DESIGN-LOG.md, "Grounded numbers rule").
const stats = [
  { value: 4, label: "recursos no produto" },
  { value: 7, label: "pilares no roadmap" },
  { value: 9, label: "etapas até o MVP" },
];

const siteUrl = env.NEXT_PUBLIC_APP_URL.replace(/\/$/, "");
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      name: "Tabularium",
      url: siteUrl,
      inLanguage: "pt-BR",
    },
    {
      "@type": "SoftwareApplication",
      name: "Tabularium",
      url: siteUrl,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      inLanguage: "pt-BR",
      description:
        "Gestão de demandas com prioridade por pontuação, histórico de cada mudança e roadmap visível para toda a equipe.",
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <section className="site-hero" aria-labelledby="hero-title">
        <div className="site-hero-media">
          <Image
            src="/assets/landing/hero-archive-order.webp"
            alt=""
            fill
            priority
            sizes="100vw"
            quality={70}
            className="site-hero-image"
          />
          {hasHeroVideo ? (
            <video className="site-hero-video" autoPlay muted loop playsInline preload="none" aria-hidden="true">
              <source src={HERO_VIDEO} type="video/mp4" />
            </video>
          ) : null}
          <div className="site-hero-scrim" />
        </div>

        <div className="site-container relative">
          <div className="site-hero-copy">
            <h1 id="hero-title" className="site-display">
              Prioridade clara, roadmap visível.
            </h1>
            <p className="site-lead">
              Demandas, equipe e progresso do produto numa mesma tela, para que nenhuma prioridade
              dependa de planilha solta ou mensagem perdida.
            </p>
            <div className="site-hero-actions">
              <Link href="/login" className="button-accent">
                Entrar no Tabularium
              </Link>
              <a href="mailto:contato@tabularium.dev" className="button-ghost">
                Falar com a gente
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="site-section" aria-labelledby="pillars-title">
        <div className="site-split">
          <Reveal className="site-split-aside">
            <h2 id="pillars-title" className="site-h2">
              Três peças, um mesmo fluxo.
            </h2>
            <p className="site-lead text-[var(--graphite)]">
              Quadro, jornada e pontuação compartilham os mesmos dados, vistos de ângulos
              diferentes.
            </p>
            <p>
              <Link href="/recursos" className="site-link">
                Ver todos os recursos
              </Link>
            </p>
          </Reveal>

          <ul className="pillar-list">
            {pillars.map((pillar, index) => (
              <li key={pillar.title}>
                <Reveal delay={index * 70}>
                  <article className="pillar">
                    <TiltCard className="pillar-media">
                      <Image
                        src={pillar.image}
                        alt={pillar.alt}
                        fill
                        sizes="(min-width: 1024px) 280px, (min-width: 640px) 38vw, 100vw"
                        className="object-cover"
                      />
                    </TiltCard>
                    <div className="pillar-copy">
                      <h3 className="site-h3">{pillar.title}</h3>
                      <p className="site-body">{pillar.text}</p>
                    </div>
                  </article>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="site-band" aria-labelledby="roadmap-title">
        <div className="site-section site-feature">
          <Reveal from="left">
            <Parallax speed={0.06}>
              <div className="site-feature-media">
                <Image
                  src="/assets/landing/feature-operational-intelligence.webp"
                  alt="Instrumento antigo observando uma rede de pontos conectados"
                  fill
                  sizes="(min-width: 900px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            </Parallax>
          </Reveal>

          <Reveal from="right" delay={90} className="site-feature-copy">
            <h2 id="roadmap-title" className="site-h2">
              O plano fica público, não numa gaveta.
            </h2>
            <p className="site-body">
              O roadmap do Tabularium é documentado junto com o código, sobre PostgreSQL e uma
              arquitetura registrada desde o primeiro commit. Cada etapa do MVP é marcada conforme
              avança, sem promessa vaga de &ldquo;em breve&rdquo;.
            </p>
            <dl className="site-stats">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <dt>{stat.label}</dt>
                  <dd>
                    <CountUp target={stat.value} />
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      <section className="site-cta" aria-labelledby="cta-title">
        <div className="site-container site-cta-inner">
          <Reveal>
            <h2 id="cta-title" className="site-h2">
              Entre e veja como está a fila hoje.
            </h2>
            <p className="site-lead">Acesso rápido, sem burocracia, direto para o painel de demandas.</p>
          </Reveal>
          <Reveal delay={90} className="site-cta-actions">
            <Link href="/login" className="button-accent">
              Entrar no Tabularium
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
