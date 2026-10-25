import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { env } from "@tabularium/env/web";

import {
  BiArrowRight,
  BiBoxArrowUpRight,
  BiCalculator,
  BiCheck2,
  BiChevronDoubleDown,
  BiClockHistory,
  BiCodeSlash,
  BiConeStriped,
  BiDatabase,
  BiEyeSlash,
  BiGithub,
  BiGrid1x2,
  BiHddStack,
  BiInbox,
  BiJournalBookmark,
  BiJournalText,
  BiKanban,
  BiListCheck,
  BiMegaphone,
  BiPencilSquare,
  BiPeople,
  BiShieldLock,
  BiSignpostSplit,
  BiSpeedometer2,
  BiTags,
  BiTerminal,
  BiWindow,
} from "@/components/landing/bi-icons";
import { Carousel, type CarouselSlide } from "@/components/landing/carousel";
import { CountUp } from "@/components/landing/count-up";
import {
  EmblemColumn,
  Ornament,
  PlateCompass,
  PlateHourglass,
  PlateLedger,
  PlateTabularium,
  PlateVault,
  Rings,
} from "@/components/landing/plates";
import { Reveal } from "@/components/landing/reveal";
import { REPOSITORY_URL } from "@/components/landing/site-header";
import { TiltCard } from "@/components/landing/tilt-card";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const problems = [
  {
    icon: BiMegaphone,
    title: "A urgência mais alta",
    text: "A demanda de quem insiste mais passa na frente. A que realmente pesa espera calada até virar incêndio.",
  },
  {
    icon: BiInbox,
    title: "A fila espalhada",
    text: "Um pedido na conversa, outro na reunião, outro na planilha de alguém. Nenhuma tela mostra a fila inteira.",
  },
  {
    icon: BiEyeSlash,
    title: "O histórico que some",
    text: "Quem mudou o status, quando e por quê? Sem registro, cada retomada começa do zero.",
  },
  {
    icon: BiSignpostSplit,
    title: "O plano na gaveta",
    text: "O roadmap vive num documento separado e desatualizado, sem ligação com o que a equipe enfrenta no dia a dia.",
  },
];

const steps = [
  {
    icon: BiPencilSquare,
    title: "Registrar",
    text: "A demanda entra com título, área e descrição, e ganha um código legível, como TB-0001.",
  },
  {
    icon: BiTags,
    title: "Classificar",
    text: "Categoria (sugestão, melhoria, bug crítico ou bug menor) e prioridade, de baixa a crítica.",
  },
  {
    icon: BiCalculator,
    title: "Pontuar",
    text: "Prioridade, categoria e tempo na fila viram uma pontuação calculada no servidor, sempre pela mesma regra.",
  },
  {
    icon: BiKanban,
    title: "Acompanhar",
    text: "No quadro, cada demanda passa de aberta para em andamento e concluída, à vista de toda a equipe.",
  },
  {
    icon: BiClockHistory,
    title: "Lembrar",
    text: "Cada mudança de status guarda quem mudou, quando e por quê. O histórico não se apaga.",
  },
];

const screens = [
  {
    key: "dashboard",
    label: "Visão geral",
    icon: BiSpeedometer2,
    text: "Métricas da fila, distribuição por prioridade e categoria, últimas demandas e as de maior pontuação, numa tela só.",
  },
  {
    key: "demands",
    label: "Demandas ativas",
    icon: BiListCheck,
    text: "Tudo que está aberto ou em andamento, com busca e filtros por categoria, prioridade e operador.",
  },
  {
    key: "journey",
    label: "Jornada",
    icon: BiSignpostSplit,
    text: "Quantas demandas estão em cada etapa do ciclo e o registro cronológico de cada mudança de status.",
  },
  {
    key: "history",
    label: "Histórico",
    icon: BiClockHistory,
    text: "As demandas concluídas, com a mesma lista e os mesmos filtros, para consultar o que já foi entregue.",
  },
];

const areas = [
  { icon: BiSpeedometer2, title: "Visão geral", text: "Métricas da fila, distribuição por prioridade e categoria e as demandas de maior pontuação." },
  { icon: BiListCheck, title: "Demandas ativas", text: "Tudo que está aberto ou em andamento, com busca e filtros por categoria, prioridade e operador." },
  { icon: BiKanban, title: "Quadro", text: "Uma coluna por status, de aberta a concluída, para ver a fila inteira de uma vez." },
  { icon: BiSignpostSplit, title: "Jornada", text: "As etapas do ciclo e o registro cronológico de cada mudança de status." },
  { icon: BiClockHistory, title: "Histórico", text: "O que já foi concluído, com os mesmos filtros da lista ativa." },
  { icon: BiPeople, title: "Operadores", text: "Quem cuida de cada demanda, quantas estão ativas e quantas cada pessoa já concluiu." },
];

// Post-MVP pillars, in the order of the public roadmap.
const pillars = [
  { numeral: "I", title: "Jornada e histórico", text: "Linha do tempo de cada demanda, com filtros por período e por operador." },
  { numeral: "II", title: "Colaboração", text: "Convites, papéis de administrador e membro, e atribuição de demandas." },
  { numeral: "III", title: "Pontuação v2", text: "Pesos configuráveis e a evolução da pontuação de cada demanda." },
  { numeral: "IV", title: "Busca e filtros", text: "Busca indexada, filtros completos e visões salvas por operador." },
  { numeral: "V", title: "Notificações", text: "Avisos de atribuição, mudança de status e menção, começando dentro do app." },
  { numeral: "VI", title: "Relatórios", text: "Tendências ao longo do tempo: vazão, envelhecimento e distribuição." },
  { numeral: "VII", title: "Operação", text: "Integração contínua, política de segurança aplicada, backups e observabilidade." },
];

const serverSide = [
  "Acesso ao banco de dados, só pela camada de dados",
  "Segredos e credenciais, validados no servidor",
  "Autorização checada em cada registro, não só na rota",
  "O cálculo da pontuação",
  "A sessão, num cookie protegido fora do alcance de scripts",
];

const browserSide = [
  "Páginas já renderizadas no servidor",
  "Somente os dados que a pessoa pode ver",
  "Nenhum token em armazenamento local",
  "Nenhum segredo em variável pública",
  "Formulários que o servidor revalida antes de gravar",
];

const principles = [
  { icon: BiGrid1x2, title: "Ordem antes da decoração", text: "Hierarquia clara, alinhamento previsível e nada competindo com a informação na tela." },
  { icon: BiShieldLock, title: "Segurança como princípio", text: "Regras de credencial, sessão e acesso escritas antes do código, não depois do primeiro incidente." },
  { icon: BiJournalBookmark, title: "Documentado desde o início", text: "Arquitetura, modelo de dados e roadmap registrados junto com o código, à vista de quem quiser ler." },
];

const plates = [
  { image: "philosophy-armillary-knowledge", numeral: "I", title: "A esfera armilar", alt: "Esfera armilar e astrolábio sobre uma mesa com papéis e pena", text: "Instrumentos de medir o céu sobre a mesa de trabalho. Antes de decidir, é preciso medir." },
  { image: "philosophy-classical-bust", numeral: "II", title: "O busto", alt: "Busto clássico ao lado de um livro e de um ramo de oliveira", text: "O pensamento clássico ao lado do livro e do ramo de oliveira. Ordem também é uma ideia antiga." },
  { image: "philosophy-classical-library", numeral: "III", title: "A biblioteca", alt: "Sala de biblioteca clássica com estantes, escada e mesa de estudo", text: "Estantes, escada e mesa de estudo. Tudo tem lugar, e é o lugar que torna possível encontrar." },
  { image: "philosophy-hourglass-time", numeral: "IV", title: "A ampulheta", alt: "Ampulheta sobre um muro de pedra diante de uma paisagem", text: "O tempo na fila também pesa. Uma demanda esquecida fica mais cara a cada dia." },
  { image: "philosophy-lantern-reason", numeral: "V", title: "A lanterna", alt: "Lanterna acesa iluminando um caminho no meio de traços emaranhados", text: "Uma luz no meio do emaranhado mostra o caminho. Prioridade é clareza no meio do ruído." },
  { image: "philosophy-olive-tree-wisdom", numeral: "VI", title: "A oliveira", alt: "Oliveira antiga com raízes expostas sobre uma grade geométrica, ao lado de um banco de pedra", text: "Raízes fundas e geometria por baixo. O que dura cresce sobre uma base medida." },
  { image: "philosophy-ruins-journey", numeral: "VII", title: "A estrada", alt: "Caminho de pedra entre ruínas antigas seguindo até o sol no horizonte", text: "Um caminho de pedra até o horizonte. O roadmap é a estrada, não a promessa." },
  { image: "philosophy-ship-continuity", numeral: "VIII", title: "O navio", alt: "Navio de madeira em reforma no estaleiro, com tábuas novas e ferramentas", text: "Um casco reformado tábua por tábua. Um produto melhora assim, uma demanda de cada vez." },
];

const collection = [
  { image: "hero-archive-order", numeral: "IX", title: "O arquivo", alt: "Arquivo de gavetas com fichas, livros e tinteiro", text: "Fichas, gavetas e caderno. O ponto de partida de qualquer ordem." },
  { image: "feature-organized-records", numeral: "X", title: "A fila de fichas", alt: "Fichas saindo em fila de um arquivo de gavetas", text: "As demandas saem da gaveta e entram em fila, uma atrás da outra." },
  { image: "feature-workflow-clarity", numeral: "XI", title: "O traço desfeito", alt: "Um traço emaranhado que se desfaz num caminho reto até o alvo", text: "O emaranhado vira caminho reto até o alvo. É o que o quadro faz com a fila." },
  { image: "feature-priority-balance", numeral: "XII", title: "A balança", alt: "Balança antiga pesando fichas contra uma moeda", text: "Fichas de um lado, peso do outro. A pontuação é uma balança honesta." },
  { image: "feature-team-collaboration", numeral: "XIII", title: "As mãos", alt: "Quatro mãos organizando fichas em grade sobre uma mesa", text: "Quatro mãos organizando a mesma grade. A equipe divide a fila, não a confusão." },
  { image: "feature-operational-intelligence", numeral: "XIV", title: "O observatório", alt: "Instrumento antigo observando uma rede de pontos conectados", text: "Um instrumento observando uma rede de pontos. Relatórios enxergam o padrão." },
];

// The nine MVP steps, mirrored from the public roadmap.
const mvp = [
  { title: "Identidade visual aplicada", done: true },
  { title: "Esquema e primeira migração do banco" },
  { title: "Camada de acesso a dados" },
  { title: "Autenticação mínima e segura" },
  { title: "Cadastro de demandas ligado ao painel" },
  { title: "Métricas calculadas pelo banco" },
  { title: "Pontuação v0 guardada no servidor" },
  { title: "Base de segurança aplicada" },
  { title: "Verificação: tipos, build e testes" },
];

const siteUrl = env.NEXT_PUBLIC_APP_URL.replace(/\/$/, "");
const description =
  "Gestão de demandas com prioridade por pontuação, histórico de cada mudança e roadmap visível para toda a equipe.";
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "WebSite", name: "Tabularium", url: siteUrl, inLanguage: "pt-BR" },
    {
      "@type": "SoftwareApplication",
      name: "Tabularium",
      url: siteUrl,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      inLanguage: "pt-BR",
      description,
    },
  ],
};

function Section({
  id,
  field,
  labelledBy,
  className = "",
  children,
}: {
  id?: string;
  field: "parchment" | "surface" | "tone" | "dark";
  labelledBy: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={`lp-field lp-${field} ${className}`}>
      <div className="site-container relative">{children}</div>
    </section>
  );
}

export default function HomePage() {
  const screenSlides: CarouselSlide[] = screens.map((screen, i) => ({
    key: screen.key,
    label: screen.label,
    counter: `Tela ${i + 1} de ${screens.length}: ${screen.label}`,
    icon: <screen.icon size={16} />,
    content: (
      <div className="lp-slide">
        <div className="lp-slide-media lp-screen">
          <Image
            src={`/assets/landing/screens/${screen.key}.webp`}
            alt={`Tela ${screen.label} do painel do Tabularium, com dados de exemplo`}
            fill
            sizes="(min-width: 1360px) 760px, (min-width: 900px) 58vw, 92vw"
            className="object-cover"
            style={{ objectPosition: "left top" }}
          />
        </div>
        <div className="lp-slide-caption">
          <span className="lp-slide-icon">
            <screen.icon size={20} />
          </span>
          <div>
            <h3 className="site-h3">{screen.label}</h3>
            <p>{screen.text}</p>
          </div>
        </div>
      </div>
    ),
  }));

  const plateSlides: CarouselSlide[] = plates.map((plate) => ({
    key: plate.image,
    label: `Prancha ${plate.numeral}: ${plate.title}`,
    counter: `Prancha ${plate.numeral} de VIII · ${plate.title}`,
    content: (
      <div className="lp-slide lp-slide-prints">
        <div className="lp-slide-media lp-print">
          <Image
            src={`/assets/landing/${plate.image}.webp`}
            alt={plate.alt}
            fill
            sizes="(min-width: 1360px) 680px, (min-width: 900px) 52vw, 92vw"
            className="object-cover"
          />
        </div>
        <div className="lp-slide-caption no-icon">
          <div>
            <p className="lp-numeral-label">Prancha {plate.numeral}</p>
            <h3 className="site-h3">{plate.title}</h3>
            <p>{plate.text}</p>
          </div>
        </div>
      </div>
    ),
  }));

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      {/* Hero (Ebony) */}
      <section className="lp-hero" aria-labelledby="hero-title">
        <div className="site-container lp-hero-grid">
          <div className="lp-hero-copy">
            <p className="lp-eyebrow">Gestão de demandas · Roadmap público · Código aberto</p>
            <h1 id="hero-title" className="site-display">
              Prioridade clara.
              <br />
              <em>Roadmap visível.</em>
            </h1>
            <p className="site-lead">
              O Tabularium reúne as demandas da equipe numa fila só, atribui a cada uma pontuação de
              prioridade e mostra o caminho de cada pedido até a entrega. Sem planilha solta, sem
              mensagem perdida, sem urgência decidida por quem fala mais alto.
            </p>
            <div className="lp-hero-actions">
              <Link href="/login" className="button-accent">
                Entrar no painel
                <BiArrowRight size={16} />
              </Link>
              <a href={REPOSITORY_URL} target="_blank" rel="noreferrer" className="button-ghost">
                Ler o código
                <BiBoxArrowUpRight size={14} />
              </a>
            </div>
            <div>
              <p className="lp-hero-note">
                <BiConeStriped size={14} />
                Em construção: o painel usa dados de exemplo até o MVP chegar ao banco.
              </p>
              <ul className="lp-trust" aria-label="Base técnica">
                <li>
                  <BiDatabase size={16} />
                  PostgreSQL e Prisma
                </li>
                <li>
                  <BiJournalText size={16} />
                  Arquitetura documentada
                </li>
                <li>
                  <BiCodeSlash size={16} />
                  Código aberto
                </li>
              </ul>
            </div>
            <a href="#problema" className="lp-scroll-cue">
              <BiChevronDoubleDown size={14} />
              Role para ler
            </a>
          </div>
          <Reveal className="lp-emblem" delay={120}>
            <EmblemColumn />
          </Reveal>
        </div>
      </section>

      {/* The problem */}
      <Section id="problema" field="parchment" labelledBy="problema-title">
        <div className="lp-split">
          <Reveal>
            <p className="lp-eyebrow">O problema</p>
            <h2 id="problema-title" className="site-h2">
              Prioridade que mora em planilha solta não é prioridade.
            </h2>
            <p className="site-lead">
              Pedidos chegam por mensagem, por reunião, por planilha e de cabeça. Cada pessoa guarda a
              própria lista, e a ordem do que fazer primeiro acaba decidida por quem pediu por último ou
              por quem insistiu mais. A equipe trabalha muito, entrega bastante e mesmo assim ninguém
              sabe dizer o que ficou para trás.
            </p>
            <p className="lp-statement">
              Fila não se perde por preguiça. Se perde porque manter uma ordem que muda todo dia exige um
              tempo que ninguém tem.
            </p>
          </Reveal>
          <Reveal className="lp-figure" delay={120}>
            <PlateHourglass />
          </Reveal>
        </div>
        <ul className="lp-cards lp-cards-4 m-0 list-none p-0">
          {problems.map((item, i) => (
            <li key={item.title}>
              <Reveal delay={i * 70} className="h-full">
                <article className="lp-card">
                  <item.icon size={22} />
                  <h3 className="site-h3">{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </Section>

      {/* The method */}
      <Section id="metodo" field="surface" labelledBy="metodo-title">
        <Reveal>
          <p className="lp-eyebrow">O método</p>
          <h2 id="metodo-title" className="site-h2">
            Cinco passos, do pedido à entrega.
          </h2>
          <p className="site-lead">
            O fluxo é o mesmo para qualquer demanda. A pontuação faz a parte repetitiva, e a equipe entra
            onde o julgamento humano é insubstituível.
          </p>
        </Reveal>
        <ol className="lp-steps">
          {steps.map((step, i) => (
            <li key={step.title}>
              <Reveal delay={i * 70} className="h-full">
                <article className="lp-step">
                  <span className="lp-step-number">{String(i + 1).padStart(2, "0")}</span>
                  <step.icon size={22} />
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </article>
              </Reveal>
            </li>
          ))}
        </ol>
        <Ornament className="lp-ornament" />
      </Section>

      {/* The score */}
      <Section id="pontuacao" field="tone" labelledBy="pontuacao-title">
        <div className="lp-split lp-split-reverse">
          <Reveal from="right">
            <p className="lp-eyebrow">A métrica central</p>
            <h2 id="pontuacao-title" className="site-h2">
              Uma pontuação, uma fila honesta.
            </h2>
            <p className="site-lead">
              A pontuação transforma prioridade, categoria e tempo de espera num único número. A fila
              passa a ser ordenada por ele, e não pela memória de quem está na reunião.
            </p>
            <ul className="lp-checks">
              <li>
                <BiCheck2 size={16} />
                A fórmula vive num lugar só e roda no servidor, nunca no navegador.
              </li>
              <li>
                <BiCheck2 size={16} />
                O número fica guardado e é recalculado quando um fator muda, então ordenar a fila é uma
                consulta simples.
              </li>
              <li>
                <BiCheck2 size={16} />
                Os pesos podem ser ajustados sem refazer o sistema, porque a regra é uma só.
              </li>
            </ul>
          </Reveal>
          <Reveal from="left" delay={120} className="w-full">
            <figure className="lp-sheet m-0">
              <figcaption className="lp-sheet-head">Exemplo ilustrativo · não representa uma demanda real</figcaption>
              <div className="lp-sheet-body">
                <p className="lp-sheet-title">TB-0001 · Acesso ao sistema indisponível</p>
                <dl>
                  <div>
                    <dt>Prioridade crítica</dt>
                    <dd>+ 120</dd>
                  </div>
                  <div>
                    <dt>Categoria: bug crítico</dt>
                    <dd>+ 60</dd>
                  </div>
                  <div>
                    <dt>16 dias na fila</dt>
                    <dd>+ 32</dd>
                  </div>
                  <div className="lp-sheet-total">
                    <dt>Pontuação</dt>
                    <dd>212 pts</dd>
                  </div>
                </dl>
                <p className="lp-sheet-note">
                  Os pesos ainda são decisão de produto e serão calibrados no MVP. O mecanismo, guardado e
                  calculado no servidor, vem primeiro.
                </p>
              </div>
            </figure>
          </Reveal>
        </div>
      </Section>

      {/* The system today */}
      <Section id="sistema" field="surface" labelledBy="sistema-title">
        <Reveal>
          <p className="lp-eyebrow">O sistema hoje</p>
          <h2 id="sistema-title" className="site-h2">
            Telas reais, dados de exemplo.
          </h2>
          <p className="site-lead">
            As imagens abaixo são capturas do painel em desenvolvimento. Os números vêm de um conjunto de
            exemplo até o MVP ligar tudo ao PostgreSQL. Nada aqui é maquete de marketing.
          </p>
        </Reveal>
        <Reveal delay={120}>
          <Carousel slides={screenSlides} label="Telas do painel" variant="tabs" autoplayMs={6000} />
        </Reveal>
      </Section>

      {/* Six areas */}
      <Section field="tone" labelledBy="areas-title">
        <Reveal>
          <h2 id="areas-title" className="site-h2">
            Seis áreas, um mesmo arquivo.
          </h2>
          <p className="site-lead">
            Cada área cuida de uma parte do ciclo da demanda. Notas, relatórios, suporte e o próprio
            roadmap atravessam todas elas.
          </p>
        </Reveal>
        <ul className="lp-cards lp-cards-3 lp-swipe m-0 list-none p-0">
          {areas.map((area, i) => (
            <li key={area.title}>
              <Reveal delay={(i % 3) * 70} className="h-full">
                <article className="lp-card">
                  <area.icon size={22} />
                  <h3 className="site-h3">{area.title}</h3>
                  <p>{area.text}</p>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </Section>

      {/* Pillars */}
      <Section field="parchment" labelledBy="pilares-title">
        <div className="lp-split">
          <Reveal>
            <p className="lp-eyebrow">Depois do MVP</p>
            <h2 id="pilares-title" className="site-h2">
              Sete colunas sustentam o que vem depois.
            </h2>
            <p className="site-lead">
              O MVP prova o essencial: entrar, registrar, pontuar e mover uma demanda com tudo guardado no
              banco. O resto já tem lugar marcado, em sete pilares que crescem conforme o uso real pede.
            </p>
          </Reveal>
          <Reveal className="lp-figure lp-figure-wide" delay={120}>
            <PlateTabularium />
          </Reveal>
        </div>
        <ul className="lp-pillars lp-swipe">
          {pillars.map((pillar, i) => (
            <li key={pillar.numeral}>
              <Reveal delay={(i % 4) * 70} className="h-full">
                <article className="lp-pillar">
                  <span className="lp-pillar-numeral" aria-hidden="true">
                    {pillar.numeral}
                  </span>
                  <h3>{pillar.title}</h3>
                  <p>{pillar.text}</p>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </Section>

      {/* Security (Ebony) */}
      <Section field="dark" labelledBy="seguranca-title">
        <PlateVault className="lp-dark-plate" />
        <Reveal>
          <p className="lp-eyebrow">Segurança</p>
          <h2 id="seguranca-title" className="site-h2 lp-narrow">
            O navegador recebe a página, não as chaves.
          </h2>
          <p className="site-lead">
            Um sistema de prioridades guarda o retrato de como a equipe trabalha: pedidos, pessoas e
            prazos. Por isso a separação abaixo não é promessa de marketing, é a regra que o código segue.
          </p>
        </Reveal>
        <div className="lp-cards relative">
          <Reveal className="h-full">
            <article className="lp-card">
              <BiHddStack size={22} />
              <h3 className="site-h3">Fica no servidor</h3>
              <ul className="lp-ledger-list">
                {serverSide.map((item) => (
                  <li key={item}>
                    <BiCheck2 size={16} />
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
          <Reveal className="h-full" delay={90}>
            <article className="lp-card">
              <BiWindow size={22} />
              <h3 className="site-h3">Chega ao navegador</h3>
              <ul className="lp-ledger-list">
                {browserSide.map((item) => (
                  <li key={item}>
                    <BiCheck2 size={16} />
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        </div>
        <Reveal delay={160}>
          <p className="lp-notice">
            <BiConeStriped size={16} />
            <span>
              Autenticação real, limite de requisições e cabeçalhos de segurança estão no checklist do MVP.
              Não serão anunciados como prontos antes de existirem e passarem pela revisão de segurança.
            </span>
          </p>
        </Reveal>
      </Section>

      {/* Quote */}
      <section className="lp-field lp-tone lp-quote" aria-label="Citação">
        <Rings className="lp-quote-rings" />
        <div className="site-container">
          <Reveal>
            <blockquote>“Prioridade não é quem pede mais alto. É o que pesa mais na balança.”</blockquote>
            <Ornament className="lp-ornament" />
          </Reveal>
        </div>
      </section>

      {/* The name (Ebony) */}
      <Section id="projeto" field="dark" labelledBy="projeto-title">
        <Rings className="lp-dark-rings" />
        <Reveal>
          <p className="lp-eyebrow">O nome</p>
          <h2 id="projeto-title" className="lp-name">
            <em>Tabularium</em>, do latim: o arquivo público da Roma antiga, onde ficavam guardadas as
            tábuas de registro do Estado.
          </h2>
          <p className="site-lead">
            A escolha do nome é uma tese. Uma demanda não é um recado, é um registro, com origem, prazo e
            responsável. O Tabularium existe para que esse registro tenha lugar, ordem e memória, como
            tinha o arquivo no Capitólio.
          </p>
        </Reveal>
        <ul className="lp-cards lp-cards-3 relative m-0 list-none p-0">
          {principles.map((item, i) => (
            <li key={item.title}>
              <Reveal delay={i * 70} className="h-full">
                <article className="lp-card">
                  <item.icon size={22} />
                  <h3 className="site-h3">{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </Section>

      {/* Plates carousel */}
      <Section field="tone" labelledBy="pranchas-title">
        <Reveal>
          <h2 id="pranchas-title" className="site-h2">
            Oito pranchas para explicar um produto.
          </h2>
          <p className="site-lead">
            Cada gravura desta coleção foi desenhada para o projeto. Navegue pelas setas, pelos pontos ou
            pelas teclas esquerda e direita.
          </p>
        </Reveal>
        <Reveal delay={120}>
          <Carousel slides={plateSlides} label="Pranchas ilustradas" variant="dots" />
        </Reveal>
      </Section>

      {/* Collection */}
      <Section field="surface" labelledBy="colecao-title">
        <Reveal>
          <p className="lp-eyebrow">A coleção</p>
          <h2 id="colecao-title" className="site-h2">
            Um vocabulário de imagens.
          </h2>
          <p className="site-lead">
            Mais seis gravuras do mesmo traço. Nenhuma vem de banco de imagens: cada uma existe para
            explicar uma ideia, não para preencher espaço.
          </p>
        </Reveal>
        <ul className="lp-prints lp-swipe m-0 list-none p-0">
          {collection.map((print, i) => (
            <li key={print.image}>
              <Reveal delay={(i % 3) * 70} className="h-full">
                <article className="lp-print">
                  <TiltCard className="lp-print-media">
                    <Image
                      src={`/assets/landing/${print.image}.webp`}
                      alt={print.alt}
                      fill
                      sizes="(min-width: 1360px) 420px, (min-width: 1024px) 31vw, (min-width: 640px) 46vw, 92vw"
                      className="object-cover"
                    />
                  </TiltCard>
                  <div className="lp-print-copy">
                    <p className="lp-numeral-label">Prancha {print.numeral}</p>
                    <h3>{print.title}</h3>
                    <p>{print.text}</p>
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </Section>

      {/* Roadmap */}
      <Section id="roadmap" field="parchment" labelledBy="roadmap-title">
        <div className="lp-split">
          <Reveal>
            <p className="lp-eyebrow">Onde estamos</p>
            <h2 id="roadmap-title" className="site-h2">
              MVP em construção, e dizendo isso em voz alta.
            </h2>
            <p className="site-lead">
              O repositório já tem a arquitetura documentada, a identidade visual, a base Next.js com
              PostgreSQL e Prisma, o banco local em Docker e todas as telas do painel com dados de exemplo.
              O MVP liga essas peças ao banco, nesta ordem:
            </p>
            <ol className="lp-roadmap">
              {mvp.map((item) => (
                <li key={item.title}>
                  <span className="lp-roadmap-dot" data-done={item.done ? "" : undefined} aria-hidden="true" />
                  {item.title}
                  <span className="lp-badge" data-tone={item.done ? "done" : undefined}>
                    {item.done ? "Concluído" : "Planejado"}
                  </span>
                </li>
              ))}
            </ol>
          </Reveal>
          <Reveal className="w-full" delay={120}>
            <div className="lp-figure lp-figure-ledger">
              <PlateLedger />
            </div>
            <dl className="lp-stats">
              <div>
                <dt>áreas no painel</dt>
                <dd>
                  <CountUp target={6} />
                </dd>
              </div>
              <div>
                <dt>pilares no roadmap</dt>
                <dd>
                  <CountUp target={7} />
                </dd>
              </div>
              <div>
                <dt>etapas até o MVP</dt>
                <dd>
                  <CountUp target={9} />
                </dd>
              </div>
            </dl>
          </Reveal>
        </div>
        <div className="lp-platforms">
          <Reveal className="h-full">
            <article className="lp-platform">
              <BiTerminal size={26} />
              <div>
                <h3>Rodar localmente</h3>
                <p>Docker com PostgreSQL e pnpm, passo a passo no README do repositório.</p>
              </div>
              <span className="lp-badge" data-tone="done">
                Disponível
              </span>
            </article>
          </Reveal>
          <Reveal className="h-full" delay={90}>
            <article className="lp-platform">
              <BiWindow size={26} />
              <div>
                <h3>Painel na web</h3>
                <p>Abre para acesso público junto com a autenticação real do MVP.</p>
              </div>
              <span className="lp-badge">Planejado</span>
            </article>
          </Reveal>
        </div>
      </Section>

      {/* Closing */}
      <Section field="tone" labelledBy="final-title" className="lp-closing">
        <Reveal>
          <div className="lp-figure">
            <PlateCompass />
          </div>
          <h2 id="final-title" className="site-h2">
            Um sistema de prioridades precisa poder ser lido.
          </h2>
          <p className="site-lead">
            Código aberto aqui não é etiqueta. É a forma honesta de pedir que uma equipe confie a própria
            fila a um programa. Leia, critique, abra uma issue, sugira uma melhoria.
          </p>
          <div className="lp-closing-actions">
            <a href={REPOSITORY_URL} target="_blank" rel="noreferrer" className="button-accent">
              <BiGithub size={16} />
              Ver o repositório
            </a>
            <a href={`${REPOSITORY_URL}/issues`} target="_blank" rel="noreferrer" className="button-secondary">
              Abrir uma issue
            </a>
          </div>
          <p className="lp-closing-note">
            A licença definitiva ainda será formalizada num arquivo de licença antes da primeira versão
            pública.
          </p>
        </Reveal>
      </Section>
    </>
  );
}
