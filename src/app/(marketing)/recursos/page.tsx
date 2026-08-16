import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { BiGraphUp, BiKanban, BiPeople, BiSignpost } from "@/components/landing/bi-icons";
import { Reveal } from "@/components/landing/reveal";
import { TiltCard } from "@/components/landing/tilt-card";

export const metadata: Metadata = {
  title: "Recursos — Tabularium",
  description: "O que o Tabularium faz: quadro, jornada, pontuação e operadores.",
};

const features = [
  {
    icon: BiKanban,
    image: "/assets/landing/feature-organized-records.webp",
    title: "Quadro",
    text: "As demandas ficam organizadas por status, aberta, em andamento ou concluída, e é possível ver a fila inteira num único quadro, sem precisar abrir cada item separadamente.",
  },
  {
    icon: BiSignpost,
    image: "/assets/landing/feature-workflow-clarity.webp",
    title: "Jornada",
    text: "Cada mudança de status fica registrada, quem mudou, quando mudou e por quê, formando um histórico completo de cada demanda desde a abertura até a entrega.",
  },
  {
    icon: BiGraphUp,
    image: "/assets/landing/feature-priority-balance.webp",
    title: "Pontuação",
    text: "Prioridade, categoria e tempo de espera se combinam numa pontuação única, para que a fila mostre primeiro o que realmente precisa de atenção.",
  },
  {
    icon: BiPeople,
    image: "/assets/landing/feature-team-collaboration.webp",
    title: "Operadores",
    text: "A equipe responsável pelas demandas fica visível, com quantas estão ativas e quantas já foram concluídas por cada pessoa.",
  },
];

export default function RecursosPage() {
  return (
    <>
      <section className="site-section pt-16 pb-8 text-center md:pt-24">
        <Reveal>
          <p className="site-eyebrow">recursos</p>
          <h1
            className="mx-auto mt-4 max-w-2xl text-4xl font-extrabold sm:text-5xl"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            Quatro peças que sustentam o fluxo de trabalho
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-[15px] text-[var(--graphite)]">
            cada recurso resolve uma parte do problema de acompanhar demandas em equipe,
          </p>
        </Reveal>
      </section>

      <section className="site-section grid gap-6 pt-0 sm:grid-cols-2">
        {features.map((feature, index) => (
          <Reveal key={feature.title} delay={index * 90}>
            <TiltCard className="site-card h-full overflow-hidden">
              <div className="relative aspect-[3/2]">
                <Image src={feature.image} alt="" fill className="object-cover" />
              </div>
              <div className="p-8">
                <span className="inline-flex size-12 items-center justify-center rounded-md bg-[var(--amber)]/12 text-[var(--amber)]">
                  <feature.icon size={24} />
                </span>
                <h2
                  className="mt-5 text-xl font-bold"
                  style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                >
                  {feature.title}
                </h2>
                <p className="mt-3 text-[15px] leading-relaxed text-[var(--graphite)]">{feature.text}</p>
              </div>
            </TiltCard>
          </Reveal>
        ))}
      </section>

      <section className="site-section grid items-center gap-12 border-t border-[var(--line)] md:grid-cols-2">
        <Reveal from="left">
          <div className="relative aspect-[3/2] overflow-hidden rounded-lg border border-[var(--line)] shadow-[0_1px_2px_rgb(26_17_10/8%)]">
            <Image src="/assets/landing/feature-organized-records.webp" alt="Fichas organizadas saindo de um arquivo" fill className="object-cover" />
          </div>
        </Reveal>
        <Reveal from="right" delay={100}>
          <p className="site-eyebrow">organização</p>
          <h2 className="mt-3 text-2xl font-extrabold" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
            Cada demanda no lugar certo
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-[var(--graphite)]">
            o objetivo não é acumular ferramentas, é reduzir a quantidade de lugares onde uma
            informação pode se perder, então quadro, jornada, pontuação e operadores compartilham os
            mesmos dados, vistos de ângulos diferentes,
          </p>
        </Reveal>
      </section>

      <section className="site-section grid items-center gap-12 border-t border-[var(--line)] md:grid-cols-2">
        <Reveal from="left" className="md:order-2">
          <div className="relative aspect-[3/2] overflow-hidden rounded-lg border border-[var(--line)] shadow-[0_1px_2px_rgb(26_17_10/8%)]">
            <Image src="/assets/landing/feature-workflow-clarity.webp" alt="Caminho confuso se transformando num caminho claro até um alvo" fill className="object-cover" />
          </div>
        </Reveal>
        <Reveal from="right" delay={100} className="md:order-1">
          <p className="site-eyebrow">planejamento</p>
          <h2 className="mt-3 text-2xl font-extrabold" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
            O roadmap nasce da fila real
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-[var(--graphite)]">
            as demandas registradas dia a dia alimentam o roadmap do produto, então o que entra em
            planejamento reflete o que a equipe realmente enfrenta, não uma lista separada e
            desatualizada,
          </p>
        </Reveal>
      </section>

      <section className="site-section border-t border-[var(--line)] text-center">
        <Reveal>
          <h2 className="text-2xl font-extrabold" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
            Ver esses recursos funcionando,
          </h2>
          <Link href="/login" className="button-primary mt-6 inline-flex">
            Entrar no Tabularium
          </Link>
        </Reveal>
      </section>
    </>
  );
}
