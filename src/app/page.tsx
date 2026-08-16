import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import {
  BiArrowRightCircleFill,
  BiCheckCircle,
  BiEmojiSmile,
  BiGraphUp,
  BiKanban,
  BiLightningFill,
  BiPeople,
  BiRocket,
  BiSignpost,
  BiStars,
} from "@/components/landing/bi-icons";
import { CountUp } from "@/components/landing/count-up";
import { Parallax } from "@/components/landing/parallax";
import { Reveal } from "@/components/landing/reveal";
import { TiltCard } from "@/components/landing/tilt-card";

export const metadata: Metadata = {
  title: "Tabularium",
  description: "Um lugar bem gostoso para guardar, organizar e acompanhar todas as suas tarefinhas.",
};

const stats = [
  { value: 1280, suffix: "+", label: "tarefinhas guardadinhas com carinho" },
  { value: 350, suffix: "+", label: "pessoas sorrindo enquanto organizam" },
  { value: 42, suffix: "", label: "caixinhas coloridas de ideias" },
  { value: 99, suffix: "%", label: "de tudo arrumado certinho" },
];

const features = [
  {
    icon: BiKanban,
    title: "Um quadro cheio de cor",
    text: "Aqui você vê todas as suas tarefinhas coladas que nem adesivos numa parede bem colorida, e pode ir movendo cada uma delas de um cantinho para outro, igualzinho quando você arruma os brinquedos em fileirinhas antes de dormir,",
  },
  {
    icon: BiSignpost,
    title: "Uma jornada para seguir",
    text: "A gente mostra para você o caminho inteirinho que cada pedido percorre, desde quando ele nasce todo pequenininho e cheio de dúvidas, até o momento em que fica prontinho e todo mundo bate palma,",
  },
  {
    icon: BiGraphUp,
    title: "Estrelinhas de importância",
    text: "Cada tarefinha ganha uma pontuação especial, para você sempre saber qual delas precisa de atenção primeiro, igual escolher qual brinquedo guardar antes quando está com pressa,",
  },
  {
    icon: BiPeople,
    title: "Um time só de amigos",
    text: "Toda a sua equipe de ajudantes fica reunidinha num só lugar, prontinha para dividir as tarefas e trabalhar em conjunto, que nem um time inteiro jogando bola todo animado no domingo,",
  },
];

const showcase = [
  {
    image: "https://images.unsplash.com/photo-1751257983922-a627088d4c21?fm=jpg&q=80&w=1600&auto=format&fit=crop",
    alt: "Uma mesa bem organizada com computador e plantinhas verdes",
    eyebrow: "arrumação",
    title: "Cada coisinha no seu devido lugar",
    text: "Assim como você gosta de deixar o seu quartinho bem arrumado, com cada brinquedo na sua caixinha certa, o Tabularium deixa cada tarefinha guardada exatamente onde ela precisa estar, sem bagunça nenhuma, sem confusão nenhuma, só organização e paz,",
    side: "left" as const,
  },
  {
    image: "https://images.unsplash.com/photo-1758876019380-0e5f636376b2?fm=jpg&q=80&w=1600&auto=format&fit=crop",
    alt: "Uma parede cheia de notinhas coloridas de planejamento",
    eyebrow: "planejamento",
    title: "Ideias coloridas por todo lado",
    text: "Toda ideia boa merece um lugar bonito para morar, então aqui você pode colar suas notinhas, escrever seus planos e ver tudo se transformando em tarefas de verdade, quase como mágica acontecendo bem debaixo dos seus olhinhos,",
    side: "right" as const,
  },
  {
    image: "https://images.unsplash.com/photo-1723754166046-6d55777d54d0?fm=jpg&q=80&w=1600&auto=format&fit=crop",
    alt: "Uma mesa calma com caderno, flores e uma canetinha",
    eyebrow: "calma",
    title: "Devagarinho, com carinho",
    text: "Não precisa ter pressa nenhuma para organizar a vida, porque cada passinho pequeno já conta um montão, e aos poucos você vai vendo tudo ficar bonito, arrumado e cheio de flores, do jeitinho que você sempre sonhou,",
    side: "left" as const,
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[var(--parchment)] text-[var(--ebony)]">
      <nav className="fixed inset-x-0 top-0 z-50 border-b border-[var(--line)] bg-[var(--parchment)]/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <Image src="/favicon.ico" width={34} height={34} alt="Símbolo do Tabularium" priority className="drop-shadow-sm" />
            <span
              className="text-lg font-bold tracking-tight"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              Tabularium
            </span>
          </div>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 rounded-full bg-[var(--amber)] px-5 py-2.5 text-sm font-bold text-white shadow-[0_8px_24px_rgb(184_119_61/35%)] transition-transform hover:scale-105"
          >
            Entrar <BiArrowRightCircleFill size={16} />
          </Link>
        </div>
      </nav>

      {/* HERO */}
      <header className="relative flex min-h-[100svh] items-center overflow-hidden pt-24">
        <Parallax speed={0.25} className="pointer-events-none absolute inset-0">
          <div className="relative h-[120%] w-full -translate-y-[8%]">
            <Image
              src="https://images.unsplash.com/photo-1758873268745-dd2cf0d677b5?fm=jpg&q=80&w=2200&auto=format&fit=crop"
              alt="Um time de pessoas sorrindo e trabalhando juntas em volta de um computador"
              fill
              priority
              className="object-cover"
            />
          </div>
        </Parallax>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--parchment)] via-[var(--parchment)]/70 to-[var(--parchment)]/20" />
        <div className="pointer-events-none absolute inset-0 bg-[var(--ebony)]/10" />

        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--amber)]/30 bg-white/70 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[var(--amber)] shadow-sm">
              <BiStars size={14} /> seu caderninho mágico de tarefinhas
            </span>
          </Reveal>

          <Reveal delay={120}>
            <h1
              className="mt-6 text-4xl leading-tight font-extrabold sm:text-5xl md:text-6xl"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              Aqui é o lugar onde cada ideia, cada pedido e cada tarefinha ganha uma casinha bem
              organizada, para você nunca mais esquecer de nada,
            </h1>
          </Reveal>

          <Reveal delay={240}>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[var(--graphite)]">
              é bem fácil de usar, é bem bonito de olhar, e ainda ajuda você a lembrar de tudo que
              precisa fazer, igualzinho quando alguém guarda os brinquedos em caixinhas certinhas, cada
              um no seu lugar,
            </p>
          </Reveal>

          <Reveal delay={360}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/login"
                className="inline-flex items-center gap-2 rounded-full bg-[var(--amber)] px-8 py-4 text-base font-bold text-white shadow-[0_12px_32px_rgb(184_119_61/40%)] transition-transform hover:scale-105"
              >
                Entrar e começar a brincadeira <BiRocket size={18} />
              </Link>
              <a
                href="#mostrar"
                className="inline-flex items-center gap-2 rounded-full border border-[var(--ebony)]/15 bg-white/70 px-8 py-4 text-base font-semibold text-[var(--ebony)] backdrop-blur transition-colors hover:bg-white"
              >
                Ver como funciona <BiEmojiSmile size={18} />
              </a>
            </div>
          </Reveal>
        </div>
      </header>

      {/* STATS */}
      <section className="relative border-y border-[var(--line)] bg-white/60 py-16">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-8 px-6 md:grid-cols-4">
          {stats.map((stat, index) => (
            <Reveal key={stat.label} delay={index * 100}>
              <div className="text-center">
                <p
                  className="text-4xl font-extrabold text-[var(--amber)] md:text-5xl"
                  style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                >
                  <CountUp target={stat.value} suffix={stat.suffix} />
                </p>
                <p className="mt-2 text-sm leading-snug text-[var(--graphite)]">{stat.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section id="mostrar" className="mx-auto max-w-6xl px-6 py-24">
        <Reveal>
          <p className="text-center text-xs font-bold uppercase tracking-[0.24em] text-[var(--amber)]">
            tudo que o tabularium faz por você
          </p>
          <h2
            className="mx-auto mt-4 max-w-2xl text-center text-3xl font-extrabold sm:text-4xl"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            Quatro jeitinhos de deixar sua rotina mais leve e mais gostosa
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {features.map((feature, index) => (
            <Reveal key={feature.title} delay={index * 90}>
              <TiltCard className="h-full rounded-3xl border border-[var(--line)] bg-white/80 p-8 shadow-[0_4px_20px_rgb(26_17_10/6%)]">
                <span className="inline-flex size-14 items-center justify-center rounded-2xl bg-[var(--amber)]/12 text-[var(--amber)]">
                  <feature.icon size={26} />
                </span>
                <h3
                  className="mt-6 text-xl font-bold"
                  style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                >
                  {feature.title}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-[var(--graphite)]">{feature.text}</p>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* SHOWCASE */}
      <section className="mx-auto max-w-6xl space-y-28 px-6 py-16">
        {showcase.map((row) => (
          <div
            key={row.title}
            className={`grid items-center gap-10 md:grid-cols-2 ${row.side === "right" ? "md:[&>*:first-child]:order-2" : ""}`}
          >
            <Reveal from={row.side === "right" ? "right" : "left"}>
              <Parallax speed={0.12}>
                <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-[0_20px_50px_rgb(26_17_10/12%)]">
                  <Image src={row.image} alt={row.alt} fill className="object-cover" />
                </div>
              </Parallax>
            </Reveal>
            <Reveal from={row.side === "right" ? "left" : "right"} delay={120}>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--amber)]">{row.eyebrow}</p>
                <h3
                  className="mt-3 text-3xl font-extrabold"
                  style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                >
                  {row.title}
                </h3>
                <p className="mt-4 text-[15px] leading-relaxed text-[var(--graphite)]">{row.text}</p>
              </div>
            </Reveal>
          </div>
        ))}
      </section>

      {/* PARALLAX BANNER */}
      <section className="relative flex min-h-[70vh] items-center overflow-hidden">
        <Parallax speed={0.3} className="pointer-events-none absolute inset-0">
          <div className="relative h-[130%] w-full -translate-y-[12%]">
            <Image
              src="https://images.unsplash.com/photo-1759266292555-9f5bd88408ee?fm=jpg&q=80&w=2200&auto=format&fit=crop"
              alt="Um fundo colorido e suave, cheio de tons pastel"
              fill
              className="object-cover"
            />
          </div>
        </Parallax>
        <div className="pointer-events-none absolute inset-0 bg-[var(--ebony)]/35" />
        <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
          <Reveal>
            <p
              className="text-3xl leading-snug font-extrabold text-white sm:text-4xl md:text-5xl"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              Organizar pode ser tão gostoso quanto brincar, principalmente quando cada tarefinha
              encontra o seu lugarzinho certo, sem esforço nenhum,
            </p>
          </Reveal>
        </div>
      </section>

      {/* JOY */}
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-28 md:grid-cols-2">
        <Reveal from="left">
          <Parallax speed={0.1}>
            <div className="relative aspect-square overflow-hidden rounded-3xl shadow-[0_20px_50px_rgb(26_17_10/12%)]">
              <Image
                src="https://images.unsplash.com/photo-1443916568596-df5a58c445e9?fm=jpg&q=80&w=1400&auto=format&fit=crop"
                alt="Uma pessoa pulando de alegria contra o céu"
                fill
                className="object-cover"
              />
            </div>
          </Parallax>
        </Reveal>
        <Reveal from="right" delay={120}>
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-[var(--amber)]/12 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[var(--amber)]">
              <BiLightningFill size={14} /> aquele gostinho bom
            </span>
            <h3
              className="mt-5 text-3xl font-extrabold sm:text-4xl"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              Quando tudo fica arrumadinho, o coraçãozinho fica quentinho
            </h3>
            <p className="mt-4 text-[15px] leading-relaxed text-[var(--graphite)]">
              a sensação de terminar uma tarefinha é igualzinha à sensação de pular bem alto de tanta
              felicidade, sabe aquele gostinho de dever cumprido que deixa qualquer dia mais bonito,
              pois é exatamente esse gostinho que o Tabularium quer te dar todos os dias, sem parar,
            </p>
            <ul className="mt-6 space-y-3">
              {["Nada fica esquecido, nunca mais", "Cada tarefinha tem a sua vez certinha", "Todo mundo do time trabalha junto e feliz"].map(
                (item) => (
                  <li key={item} className="flex items-center gap-3 text-sm font-medium">
                    <BiCheckCircle size={18} className="shrink-0 text-[var(--amber)]" />
                    {item}
                  </li>
                ),
              )}
            </ul>
          </div>
        </Reveal>
      </section>

      {/* FINAL CTA */}
      <section className="mx-auto max-w-4xl px-6 pb-28 text-center">
        <Reveal>
          <div className="rounded-[2.5rem] border border-[var(--line)] bg-[var(--ebony)] px-8 py-16 text-white shadow-[0_30px_70px_rgb(26_17_10/25%)] sm:px-16">
            <h2
              className="text-3xl font-extrabold sm:text-4xl"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              Vem comigo, vem entrar, vem ver como é gostoso organizar a sua vidinha,
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-white/70">
              é rapidinho, é bem simples, e o seu cantinho organizado já está te esperando bem aqui,
            </p>
            <Link
              href="/login"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-[var(--amber)] px-8 py-4 text-base font-bold text-white shadow-[0_12px_32px_rgb(184_119_61/45%)] transition-transform hover:scale-105"
            >
              Entrar no Tabularium <BiArrowRightCircleFill size={18} />
            </Link>
          </div>
        </Reveal>
      </section>

      <footer className="border-t border-[var(--line)] py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 text-sm text-[var(--graphite)] sm:flex-row">
          <div className="flex items-center gap-2">
            <Image src="/favicon.ico" width={22} height={22} alt="Símbolo do Tabularium" />
            <span className="font-semibold text-[var(--ebony)]">Tabularium</span>
          </div>
          <p>um projeto pessoal, feito com bastante carinho, para organizar tudo de um jeitinho gostoso</p>
        </div>
      </footer>
    </div>
  );
}
