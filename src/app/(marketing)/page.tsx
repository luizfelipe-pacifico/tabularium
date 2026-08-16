import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { BiGraphUp, BiKanban, BiSignpost } from "@/components/landing/bi-icons";
import { CountUp } from "@/components/landing/count-up";
import { Parallax } from "@/components/landing/parallax";
import { Reveal } from "@/components/landing/reveal";
import { TiltCard } from "@/components/landing/tilt-card";

export const metadata: Metadata = {
  title: "Tabularium",
  description: "Gestão de demandas com acompanhamento de prioridade e progresso de roadmap.",
};

const pillars = [
  {
    icon: BiKanban,
    image: "/assets/landing/feature-organized-records.webp",
    title: "Quadro",
    text: "Veja todas as demandas ativas organizadas por status, do pedido novo até a entrega.",
  },
  {
    icon: BiSignpost,
    image: "/assets/landing/feature-workflow-clarity.webp",
    title: "Jornada",
    text: "Acompanhe o histórico de cada demanda, cada mudança de status registrada e datada.",
  },
  {
    icon: BiGraphUp,
    image: "/assets/landing/feature-priority-balance.webp",
    title: "Pontuação",
    text: "Prioridade, categoria e tempo de espera viram uma pontuação, para saber o que resolver primeiro.",
  },
];

const stats = [
  { value: 4, label: "recursos no produto" },
  { value: 7, label: "pilares no roadmap" },
  { value: 9, label: "etapas até o MVP" },
];

export default function HomePage() {
  return (
    <>
      {/* HERO — background video (falls back to the archive illustration if no source
          loads yet or the visitor prefers reduced motion), minimal centered copy. */}
      <section className="hero-under-header relative flex min-h-[92svh] items-center justify-center overflow-hidden">
        <div className="hero-media">
          <video className="hero-video" autoPlay muted loop playsInline poster="/assets/landing/hero-archive-order.webp">
            <source src="/videos/hero.mp4" type="video/mp4" />
          </video>
          <div
            className="hero-media-still"
            style={{ backgroundImage: "url(/assets/landing/hero-archive-order.webp)" }}
          />
          <div className="absolute inset-0 bg-[var(--ebony)]/55" />
        </div>

        <div className="relative z-10 mx-auto max-w-xl px-6 text-center text-white">
          <Reveal>
            <p className="text-xs font-bold tracking-[0.2em] text-white/70 uppercase">gestão de demandas</p>
            <h1
              className="mt-4 text-4xl leading-tight font-extrabold sm:text-5xl"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              Prioridade clara, roadmap visível,
            </h1>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link href="/login" className="button-primary !bg-[var(--amber)]">
                Entrar
              </Link>
              <a href="mailto:contato@tabularium.dev" className="button-secondary !border-white/30 !bg-transparent !text-white">
                Contato
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* WHAT IT IS */}
      <section className="site-section max-w-2xl text-center">
        <Reveal>
          <p className="text-[15px] leading-relaxed text-[var(--graphite)]">
            o Tabularium reúne demandas, equipe e progresso do produto numa mesma tela, para que uma
            prioridade nunca dependa de planilha solta ou mensagem perdida, tudo guardado num banco
            de dados PostgreSQL, com arquitetura documentada desde o primeiro commit,
          </p>
        </Reveal>
      </section>

      {/* MODULAR GRID */}
      <section className="site-section border-t border-[var(--line)]">
        <Reveal>
          <p className="site-eyebrow">como funciona</p>
          <h2 className="mt-3 text-2xl font-extrabold" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
            Três peças, um mesmo fluxo
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {pillars.map((pillar, index) => (
            <Reveal key={pillar.title} delay={index * 90}>
              <TiltCard className="site-card h-full overflow-hidden">
                <div className="relative aspect-[3/2]">
                  <Image src={pillar.image} alt="" fill className="object-cover" />
                </div>
                <div className="p-6">
                  <span className="inline-flex size-10 items-center justify-center rounded-md bg-[var(--amber)]/12 text-[var(--amber)]">
                    <pillar.icon size={20} />
                  </span>
                  <h3 className="mt-4 font-bold">{pillar.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--graphite)]">{pillar.text}</p>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>

        <Reveal delay={280}>
          <Link
            href="/recursos"
            className="mt-8 inline-block text-sm font-semibold text-[var(--amber)] underline underline-offset-4"
          >
            Ver todos os recursos
          </Link>
        </Reveal>
      </section>

      {/* GROUNDED STATS */}
      <section className="border-y border-[var(--line)] bg-white/60">
        <div className="site-section grid grid-cols-3 gap-6 text-center">
          {stats.map((stat, index) => (
            <Reveal key={stat.label} delay={index * 100}>
              <p
                className="text-4xl font-extrabold text-[var(--amber)]"
                style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
              >
                <CountUp target={stat.value} />
              </p>
              <p className="mt-2 text-xs leading-snug text-[var(--graphite)]">{stat.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* SUPPORTING IMAGE */}
      <section className="site-section grid items-center gap-12 md:grid-cols-2">
        <Reveal from="left">
          <Parallax speed={0.08}>
            <div className="relative aspect-[3/2] overflow-hidden rounded-lg border border-[var(--line)] shadow-[0_1px_2px_rgb(26_17_10/8%)]">
              <Image src="/assets/landing/feature-operational-intelligence.webp" alt="Instrumento observando uma rede de pontos conectados" fill className="object-cover" />
            </div>
          </Parallax>
        </Reveal>
        <Reveal from="right" delay={100}>
          <p className="site-eyebrow">roadmap</p>
          <h2 className="mt-3 text-2xl font-extrabold" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
            O plano fica público, não numa gaveta
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-[var(--graphite)]">
            o roadmap do Tabularium é documentado junto com o código, com cada etapa do MVP marcada
            conforme avança, sem promessa vaga de "em breve",
          </p>
        </Reveal>
      </section>

      {/* CLOSING CTA */}
      <section className="site-section border-t border-[var(--line)] text-center">
        <Reveal>
          <h2 className="text-2xl font-extrabold" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
            Entre e veja como está a fila hoje,
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-[var(--graphite)]">
            acesso rápido, sem burocracia, direto para o painel de demandas,
          </p>
          <Link href="/login" className="button-primary mt-6 inline-flex">
            Entrar no Tabularium
          </Link>
        </Reveal>
      </section>
    </>
  );
}
