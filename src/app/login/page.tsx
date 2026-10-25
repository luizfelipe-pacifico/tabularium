import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { BiArrowRightCircleFill } from "@/components/landing/bi-icons";

export const metadata: Metadata = {
  title: "Entrar",
  description: "Entre no Tabularium e veja a fila de demandas ordenada por prioridade.",
  alternates: { canonical: "/login" },
};

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--parchment)] px-6 py-16 text-[var(--foreground)]">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center text-center">
          <Image
            src="/brand/icon-tabularium-black.png"
            width={44}
            height={44}
            alt="Símbolo do Tabularium"
            className="dark:hidden"
            priority
          />
          <Image
            src="/brand/icon-tabularium.png"
            width={44}
            height={44}
            alt="Símbolo do Tabularium"
            className="hidden dark:block"
            priority
          />
          <h1
            className="mt-4 text-2xl font-extrabold"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            Entrar no Tabularium
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-[var(--graphite)]">
            acesso rápido, sem burocracia, direto para o seu painel de demandas,
          </p>
        </div>

        <div className="site-card p-8">
          <label className="block text-xs font-bold tracking-[0.1em] text-[var(--graphite)] uppercase">
            Nome
          </label>
          <input
            type="text"
            placeholder="seu nome"
            className="mt-2 mb-5 w-full rounded-md border border-[var(--line)] bg-[var(--parchment)] px-3.5 py-2.5 text-sm outline-none focus:border-[var(--amber)]"
          />

          <label className="block text-xs font-bold tracking-[0.1em] text-[var(--graphite)] uppercase">
            E-mail
          </label>
          <input
            type="email"
            placeholder="nome@exemplo.com"
            className="mt-2 mb-7 w-full rounded-md border border-[var(--line)] bg-[var(--parchment)] px-3.5 py-2.5 text-sm outline-none focus:border-[var(--amber)]"
          />

          <Link href="/dashboard" className="button-primary w-full justify-center">
            Entrar <BiArrowRightCircleFill size={16} />
          </Link>
        </div>

        <p className="mt-6 text-center text-xs text-[var(--graphite)]">
          <Link href="/" className="underline underline-offset-4 hover:text-[var(--amber)]">
            Voltar para a página inicial
          </Link>
        </p>
      </div>
    </div>
  );
}
