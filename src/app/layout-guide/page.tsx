import type { Metadata } from "next";
import {
  ArrowRight,
  Bell,
  CheckCircle2,
  LayoutGrid,
  Layers,
  ListChecks,
  Palette,
  Ruler,
  Smartphone,
  Sparkles,
  Type,
  Workflow,
} from "lucide-react";
import type { ComponentType } from "react";

import { Button } from "@tabularium/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@tabularium/ui/components/card";
import { Checkbox } from "@tabularium/ui/components/checkbox";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@tabularium/ui/components/empty";
import { Input } from "@tabularium/ui/components/input";
import { Label } from "@tabularium/ui/components/label";

export const metadata: Metadata = {
  title: "Layout Guide — Tabularium",
  description: "Internal reference for Tabularium's design foundations and components.",
  robots: { index: false, follow: false },
};

type IconType = ComponentType<{ size?: number; className?: string }>;

const NAV = [
  { href: "#fundacao", label: "Fundação" },
  { href: "#componentes", label: "Componentes" },
  { href: "#padroes", label: "Padrões de uso" },
  { href: "#responsividade", label: "Responsividade" },
  { href: "#planejamento", label: "Planejamento" },
];

const COLORS = [
  { name: "Alabaster / Parchment", role: "Dominante", css: "var(--parchment)", hex: "#F4F1EA", use: "Fundo da aplicação, grandes superfícies" },
  { name: "Ebony", role: "Secundária", css: "var(--ebony)", hex: "#1A110A", use: "Texto principal, navegação, estrutura" },
  { name: "Classical Amber", role: "Destaque", css: "var(--amber)", hex: "#B8773D", use: "Ações primárias, estados ativos" },
  { name: "Graphite", role: "Suporte", css: "var(--graphite)", hex: "#4A4A4A", use: "Texto secundário, metadados" },
  { name: "Walnut", role: "Suporte", css: "var(--walnut)", hex: "#5C4033", use: "Profundidade, ênfase secundária" },
];

const TYPE_SCALE = [
  { token: "display-lg", size: "48px", line: "56px", family: "Playfair Display", use: "Título de marketing" },
  { token: "heading-xl", size: "36px", line: "44px", family: "Playfair Display", use: "Título de página" },
  { token: "heading-lg", size: "28px", line: "36px", family: "Playfair Display", use: "Seção principal" },
  { token: "heading-md", size: "22px", line: "30px", family: "Playfair Display", use: "Grupo de cards" },
  { token: "body-lg", size: "18px", line: "28px", family: "Montserrat", use: "Texto introdutório" },
  { token: "body-md", size: "16px", line: "24px", family: "Montserrat", use: "Texto padrão" },
  { token: "body-sm", size: "14px", line: "20px", family: "Montserrat", use: "Metadados, suporte de tabela" },
  { token: "label", size: "12px", line: "16px", family: "Montserrat", use: "Rótulos, status compacto" },
] as const;

const SPACING = [4, 8, 12, 16, 24, 32, 48, 64, 96];

const RADII = [
  { token: "radius-sm", value: "4px", use: "Controles compactos, tags, células" },
  { token: "radius-md", value: "6px", use: "Botões, inputs, cards padrão" },
  { token: "radius-lg", value: "8px", use: "Painéis grandes, diálogos" },
];

const COMPOSITION_STEPS = [
  "Navegação principal",
  "Cabeçalho com título e ação",
  "Filtros ou métricas",
  "Visão principal (tabela/board)",
  "Painel contextual",
];

const BREAKPOINTS = [
  { range: "< 620px", note: "Coluna única, ações do topo reduzidas, colunas da lista de demandas cortadas" },
  { range: "620–800px", note: "Grade de métricas e distribuição em 1 coluna" },
  { range: "800–1120px", note: "Sidebar fixa reaparece; métricas em 2 colunas; atividade em 2 colunas" },
  { range: "≥ 1120px", note: "Layout completo: métricas em 4 colunas, atividade em 3 colunas" },
];

const PILLARS = [
  "Journey & histórico",
  "Colaboração multi-operador",
  "Scoring v2",
  "Busca, filtros e views salvas",
  "Notificações e alertas",
  "Relatórios e analytics",
  "Hardening e operações",
];

export default function LayoutGuidePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-4">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.13em] text-[var(--amber)]">
              Referência interna · noindex
            </p>
            <h1 className="mt-1 font-[family-name:var(--font-playfair)] text-2xl">
              Tabularium — Layout Guide
            </h1>
          </div>
          <nav className="flex flex-wrap gap-1 text-xs">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-md px-2.5 py-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10">
        <p className="max-w-2xl text-sm/relaxed text-muted-foreground">
          Este documento espelha, em código vivo, as regras definidas em{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-xs">docs/BRANDING.md</code>. Use-o para
          conferir cor, tipografia, espaçamento e componentes antes de construir uma nova tela — nenhum
          token é redefinido aqui, apenas lido do tema global em{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-xs">
            packages/ui/src/styles/globals.css
          </code>
          .
        </p>

        {/* FUNDAÇÃO */}
        <section id="fundacao" className="mt-14 scroll-mt-20">
          <SectionHeading icon={Layers} eyebrow="01" title="Fundação" />

          <SubHeading icon={Palette} title="Paleta de cores" className="mt-6" />
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {COLORS.map((color) => (
              <div key={color.name} className="overflow-hidden rounded-lg border border-border bg-card">
                <div className="h-20" style={{ background: color.css }} />
                <div className="space-y-1 p-3">
                  <p className="text-xs font-semibold">{color.name}</p>
                  <p className="text-[10px] uppercase tracking-wide text-muted-foreground">
                    {color.role} · {color.hex}
                  </p>
                  <p className="text-[11px] text-muted-foreground">{color.use}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 flex h-3 overflow-hidden rounded-full border border-border">
            <div className="w-[60%] bg-[var(--parchment)]" title="60% Alabaster" />
            <div className="w-[30%] bg-[var(--ebony)]" title="30% Ebony" />
            <div className="w-[10%] bg-[var(--amber)]" title="10% Amber" />
          </div>
          <p className="mt-2 text-[11px] text-muted-foreground">
            Regra 60–30–10: Alabaster domina, Ebony estrutura, Amber pontua com ação e status.
          </p>

          <SubHeading icon={Type} title="Tipografia" className="mt-10" />
          <div className="mt-4 grid gap-6 sm:grid-cols-2">
            <div className="rounded-lg border border-border bg-card p-5">
              <p className="text-[10px] uppercase tracking-wide text-muted-foreground">
                Display — Playfair Display
              </p>
              <p className="mt-2 font-[family-name:var(--font-playfair)] text-3xl">
                Ordem antes da decoração
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card p-5">
              <p className="text-[10px] uppercase tracking-wide text-muted-foreground">
                Funcional — Montserrat
              </p>
              <p className="mt-2 text-base">
                Texto corrido, navegação, tabelas e status usam Montserrat para manter a leitura
                operacional.
              </p>
            </div>
          </div>
          <div className="mt-4 overflow-hidden rounded-lg border border-border">
            <table className="w-full border-collapse text-left text-xs">
              <thead className="bg-muted text-muted-foreground">
                <tr>
                  <th className="px-3 py-2 font-medium">Token</th>
                  <th className="px-3 py-2 font-medium">Amostra</th>
                  <th className="px-3 py-2 font-medium">Tamanho / linha</th>
                  <th className="px-3 py-2 font-medium">Uso</th>
                </tr>
              </thead>
              <tbody>
                {TYPE_SCALE.map((row) => (
                  <tr key={row.token} className="border-t border-border">
                    <td className="px-3 py-3 align-middle font-mono text-[11px] text-muted-foreground">
                      {row.token}
                    </td>
                    <td
                      className="px-3 py-3 align-middle"
                      style={{
                        fontFamily:
                          row.family === "Playfair Display"
                            ? "var(--font-playfair)"
                            : "var(--font-montserrat)",
                        fontSize: row.size,
                        lineHeight: row.line,
                      }}
                    >
                      Tabularium
                    </td>
                    <td className="px-3 py-3 align-middle text-muted-foreground">
                      {row.size} / {row.line}
                    </td>
                    <td className="px-3 py-3 align-middle text-muted-foreground">{row.use}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <SubHeading icon={Ruler} title="Espaçamento e grid" className="mt-10" />
          <div className="mt-4 flex flex-wrap items-end gap-3">
            {SPACING.map((value) => (
              <div key={value} className="flex flex-col items-center gap-1.5">
                <div className="w-6 bg-[var(--amber)]" style={{ height: value }} />
                <span className="text-[10px] text-muted-foreground">{value}</span>
              </div>
            ))}
          </div>
          <p className="mt-3 text-[11px] text-muted-foreground">
            Grade de 12 colunas (desktop), 8 (tablet) e 4 (mobile). Largura máxima de conteúdo: 1440px.
          </p>

          <SubHeading icon={Sparkles} title="Geometria" className="mt-10" />
          <div className="mt-4 flex flex-wrap gap-4">
            {RADII.map((radius) => (
              <div
                key={radius.token}
                className="flex items-center gap-3 rounded-lg border border-border bg-card p-3"
              >
                <div
                  className="size-12 border-2 border-[var(--amber)] bg-[var(--amber)]/10"
                  style={{ borderRadius: radius.value }}
                />
                <div>
                  <p className="text-xs font-semibold">{radius.token}</p>
                  <p className="text-[11px] text-muted-foreground">
                    {radius.value} · {radius.use}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* COMPONENTES */}
        <section id="componentes" className="mt-16 scroll-mt-20">
          <SectionHeading icon={LayoutGrid} eyebrow="02" title="Componentes" />

          <SubHeading title="Botões" className="mt-6" />
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <Button>Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="link">Link</Button>
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <Button size="sm">Small</Button>
            <Button size="default">Default</Button>
            <Button size="lg">Large</Button>
            <Button size="icon" aria-label="Notificações">
              <Bell />
            </Button>
          </div>

          <SubHeading title="Formulário" className="mt-8" />
          <div className="mt-4 grid max-w-sm gap-4 rounded-lg border border-border bg-card p-5">
            <div className="grid gap-1.5">
              <Label htmlFor="lg-demo-input">Área</Label>
              <Input id="lg-demo-input" placeholder="Ex.: Cadastro de clientes" />
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="lg-demo-checkbox" />
              <Label htmlFor="lg-demo-checkbox">Notificar operadores responsáveis</Label>
            </div>
          </div>

          <SubHeading title="Cards" className="mt-8" />
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>TB-0001</CardTitle>
                <CardDescription>Acesso ao sistema indisponível</CardDescription>
              </CardHeader>
              <CardContent className="text-xs text-muted-foreground">
                Autenticação · Não atribuído
              </CardContent>
              <CardFooter className="gap-2">
                <span className="tag priority-critical">Crítico</span>
                <span className="tag priority-high">Alto</span>
              </CardFooter>
            </Card>
            <Empty className="rounded-lg border border-dashed border-border bg-card">
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <CheckCircle2 />
                </EmptyMedia>
                <EmptyTitle>Nenhuma demanda encontrada</EmptyTitle>
                <EmptyDescription>
                  Ajuste os filtros ou aguarde a próxima sincronização.
                </EmptyDescription>
              </EmptyHeader>
            </Empty>
          </div>

          <SubHeading title="Status e prioridade" className="mt-8" />
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="tag priority-critical">Crítico</span>
            <span className="tag priority-high">Alto</span>
            <span className="tag priority-medium">Médio</span>
            <span className="status-tag">Em progresso</span>
          </div>
          <p className="mt-2 text-[11px] text-muted-foreground">
            Classes vivas de{" "}
            <code className="rounded bg-muted px-1 py-0.5">packages/ui/src/styles/globals.css</code>,
            as mesmas usadas em{" "}
            <code className="rounded bg-muted px-1 py-0.5">src/components/dashboard-shell.tsx</code>.
          </p>
        </section>

        {/* PADRÕES DE USO */}
        <section id="padroes" className="mt-16 scroll-mt-20">
          <SectionHeading icon={Workflow} eyebrow="03" title="Padrões de uso" />

          <SubHeading title="Composição de página" className="mt-6" />
          <ol className="mt-4 grid gap-2 text-xs text-muted-foreground sm:grid-cols-5">
            {COMPOSITION_STEPS.map((step, index) => (
              <li key={step} className="rounded-md border border-border bg-card p-3">
                <span className="text-[10px] font-bold text-[var(--amber)]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="mt-1">{step}</p>
              </li>
            ))}
          </ol>
          <p className="mt-3 text-[11px] text-muted-foreground">
            Implementação de referência:{" "}
            <code className="rounded bg-muted px-1 py-0.5">
              src/components/dashboard-shell.tsx
            </code>
            .
          </p>

          <SubHeading title="Movimento" className="mt-8" />
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <MotionCard label="Micro-interações" range="120–200ms" />
            <MotionCard label="Transições de painel" range="200–300ms" />
            <MotionCard label="prefers-reduced-motion" range="Sempre respeitado" />
          </div>
        </section>

        {/* RESPONSIVIDADE */}
        <section id="responsividade" className="mt-16 scroll-mt-20">
          <SectionHeading icon={Smartphone} eyebrow="04" title="Responsividade" />
          <p className="mt-6 max-w-2xl text-xs text-muted-foreground">
            Mobile-first, com os breakpoints reais usados em{" "}
            <code className="rounded bg-muted px-1 py-0.5">
              packages/ui/src/styles/globals.css
            </code>
            .
          </p>
          <div className="mt-4 overflow-hidden rounded-lg border border-border">
            <table className="w-full border-collapse text-left text-xs">
              <thead className="bg-muted text-muted-foreground">
                <tr>
                  <th className="px-3 py-2 font-medium">Faixa</th>
                  <th className="px-3 py-2 font-medium">Comportamento</th>
                </tr>
              </thead>
              <tbody>
                {BREAKPOINTS.map((bp) => (
                  <tr key={bp.range} className="border-t border-border">
                    <td className="px-3 py-3 align-middle font-mono text-[11px] text-muted-foreground">
                      {bp.range}
                    </td>
                    <td className="px-3 py-3 align-middle text-muted-foreground">{bp.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* PLANEJAMENTO */}
        <section id="planejamento" className="mt-16 scroll-mt-20 pb-16">
          <SectionHeading icon={ListChecks} eyebrow="05" title="Planejamento" />
          <p className="mt-6 max-w-2xl text-xs text-muted-foreground">
            O escopo completo vive em{" "}
            <code className="rounded bg-muted px-1 py-0.5">docs/ROADMAP.md</code>. Resumo:
          </p>
          <div className="mt-4 rounded-lg border border-border bg-card p-5">
            <p className="text-xs font-semibold">MVP</p>
            <p className="mt-1 text-[11px] text-muted-foreground">
              Schema real, autenticação mínima e segura, CRUD de demandas ligado a este layout,
              métricas reais, score v0 e baseline de segurança aplicados sobre os tokens de marca já
              em produção.
            </p>
          </div>
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            {PILLARS.map((pillar) => (
              <div
                key={pillar}
                className="flex items-center gap-2 rounded-md border border-border bg-card px-3 py-2 text-xs"
              >
                <ArrowRight size={13} className="text-[var(--amber)]" />
                {pillar}
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

function SectionHeading({
  icon: Icon,
  eyebrow,
  title,
}: {
  icon: IconType;
  eyebrow: string;
  title: string;
}) {
  return (
    <div className="flex items-center gap-3 border-b border-border pb-3">
      <span className="flex size-9 items-center justify-center rounded-md bg-muted text-[var(--amber)]">
        <Icon size={18} />
      </span>
      <div>
        <p className="text-[10px] font-bold uppercase tracking-[0.13em] text-muted-foreground">
          {eyebrow}
        </p>
        <h2 className="font-[family-name:var(--font-playfair)] text-2xl">{title}</h2>
      </div>
    </div>
  );
}

function SubHeading({
  icon: Icon,
  title,
  className,
}: {
  icon?: IconType;
  title: string;
  className?: string;
}) {
  return (
    <h3 className={`flex items-center gap-2 text-sm font-semibold ${className ?? ""}`}>
      {Icon ? <Icon size={15} className="text-[var(--amber)]" /> : null}
      {title}
    </h3>
  );
}

function MotionCard({ label, range }: { label: string; range: string }) {
  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <p className="text-xs font-semibold">{label}</p>
      <p className="mt-1 text-[11px] text-muted-foreground">{range}</p>
    </div>
  );
}
