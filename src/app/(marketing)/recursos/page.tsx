import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Reveal } from "@/components/landing/reveal";
import { TiltCard } from "@/components/landing/tilt-card";

export const metadata: Metadata = {
  title: "Recursos",
  description: "O que o Tabularium faz: quadro de demandas, jornada de cada pedido, pontuação de prioridade e operadores.",
  alternates: { canonical: "/recursos" },
};

const features = [
  {
    image: "/assets/landing/feature-organized-records.webp",
    alt: "Fichas saindo em fila de um arquivo de gavetas",
    title: "Quadro",
    text: "As demandas ficam organizadas por status, aberta, em andamento ou concluída, e é possível ver a fila inteira num único quadro, sem abrir cada item separadamente.",
  },
  {
    image: "/assets/landing/feature-workflow-clarity.webp",
    alt: "Um traço emaranhado que se desfaz num caminho reto até o alvo",
    title: "Jornada",
    text: "Cada mudança de status fica registrada, quem mudou, quando mudou e por quê, formando o histórico completo de cada demanda, da abertura até a entrega.",
  },
  {
    image: "/assets/landing/feature-priority-balance.webp",
    alt: "Balança antiga pesando fichas contra uma moeda",
    title: "Pontuação",
    text: "Prioridade, categoria e tempo de espera se combinam numa pontuação única, para que a fila mostre primeiro o que realmente precisa de atenção.",
  },
  {
    image: "/assets/landing/feature-team-collaboration.webp",
    alt: "Quatro mãos organizando fichas em grade sobre uma mesa",
    title: "Operadores",
    text: "A equipe responsável pelas demandas fica visível, com quantas estão ativas e quantas já foram concluídas por cada pessoa.",
  },
];

export default function RecursosPage() {
  return (
    <>
      <section className="lp-hero" aria-labelledby="recursos-title">
        <div className="site-container lp-hero-copy">
          <p className="lp-eyebrow">Recursos</p>
          <h1 id="recursos-title" className="site-display lp-narrow-display">
            Quatro peças que sustentam o fluxo de trabalho.
          </h1>
          <p className="site-lead">Cada recurso resolve uma parte do problema de acompanhar demandas em equipe.</p>
        </div>
      </section>

      <section className="lp-field lp-parchment" aria-label="Lista de recursos">
        <div className="site-container feature-grid">
          {features.map((feature, index) => (
            <Reveal key={feature.title} delay={(index % 2) * 80}>
              <article className="feature-item">
                <TiltCard className="site-feature-media">
                  <Image
                    src={feature.image}
                    alt={feature.alt}
                    fill
                    sizes="(min-width: 1680px) 680px, (min-width: 768px) 46vw, 100vw"
                    className="object-cover"
                  />
                </TiltCard>
                <h2 className="site-h3">{feature.title}</h2>
                <p className="site-body">{feature.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="lp-field lp-tone" aria-labelledby="organizacao-title">
        <div className="site-container site-feature">
          <Reveal from="left">
            <div className="site-feature-media">
              <Image
                src="/assets/landing/philosophy-classical-library.webp"
                alt="Sala de biblioteca clássica com estantes, escada e mesa de estudo"
                fill
                sizes="(min-width: 900px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal from="right" delay={90} className="site-feature-copy">
            <h2 id="organizacao-title" className="site-h2">
              Cada demanda no lugar certo.
            </h2>
            <p className="site-body">
              O objetivo não é acumular ferramentas, é reduzir a quantidade de lugares onde uma
              informação pode se perder. Quadro, jornada, pontuação e operadores compartilham os
              mesmos dados, vistos de ângulos diferentes.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="lp-field lp-surface" aria-labelledby="planejamento-title">
        <div className="site-container site-feature site-feature-reverse">
        <Reveal from="right">
          <div className="site-feature-media">
            <Image
              src="/assets/landing/philosophy-ruins-journey.webp"
              alt="Caminho de pedra entre ruínas antigas seguindo até o sol no horizonte"
              fill
              sizes="(min-width: 900px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </Reveal>
        <Reveal from="left" delay={90} className="site-feature-copy">
          <h2 id="planejamento-title" className="site-h2">
            O roadmap nasce da fila real.
          </h2>
          <p className="site-body">
            As demandas registradas dia a dia alimentam o roadmap do produto. O que entra em
            planejamento reflete o que a equipe realmente enfrenta, não uma lista separada e
            desatualizada.
          </p>
        </Reveal>
        </div>
      </section>

      <section className="site-cta" aria-labelledby="recursos-cta-title">
        <div className="site-container site-cta-inner">
          <Reveal>
            <h2 id="recursos-cta-title" className="site-h2">
              Veja esses recursos funcionando.
            </h2>
            <p className="site-lead">A fila de demandas, ordenada por pontuação, a um clique.</p>
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
