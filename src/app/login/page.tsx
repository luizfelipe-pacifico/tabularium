import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { BiArrowRightCircleFill, BiEmojiSmile } from "@/components/landing/bi-icons";

export const metadata: Metadata = {
  title: "Entrar — Tabularium",
  description: "Entre no Tabularium e comece a organizar tudo com bastante carinho.",
};

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--parchment)] px-6 py-16 text-[var(--ebony)]">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center text-center">
          <Image src="/favicon.ico" width={52} height={52} alt="Símbolo do Tabularium" priority />
          <h1
            className="mt-4 text-2xl font-extrabold"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            Que bom te ver por aqui
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-[var(--graphite)]">
            é só clicar no botão bem colorido logo abaixo, e você já entra direto no seu cantinho
            organizado, sem complicação nenhuma,
          </p>
        </div>

        <div className="rounded-3xl border border-[var(--line)] bg-white/80 p-8 shadow-[0_20px_50px_rgb(26_17_10/10%)]">
          <label className="block text-xs font-bold uppercase tracking-[0.14em] text-[var(--graphite)]">
            Seu nome
          </label>
          <input
            type="text"
            placeholder="como você gosta de ser chamado"
            className="mt-2 mb-5 w-full rounded-xl border border-[var(--line)] bg-[var(--parchment)] px-4 py-3 text-sm outline-none focus:border-[var(--amber)]"
          />

          <label className="block text-xs font-bold uppercase tracking-[0.14em] text-[var(--graphite)]">
            Seu e-mail
          </label>
          <input
            type="email"
            placeholder="nome@exemplo.com"
            className="mt-2 mb-8 w-full rounded-xl border border-[var(--line)] bg-[var(--parchment)] px-4 py-3 text-sm outline-none focus:border-[var(--amber)]"
          />

          <Link
            href="/dashboard"
            className="flex w-full items-center justify-center gap-2 rounded-full bg-[var(--amber)] px-6 py-3.5 text-sm font-bold text-white shadow-[0_10px_28px_rgb(184_119_61/35%)] transition-transform hover:scale-105"
          >
            Entrar no Tabularium <BiArrowRightCircleFill size={18} />
          </Link>

          <p className="mt-4 flex items-center justify-center gap-1.5 text-center text-xs text-[var(--graphite)]">
            <BiEmojiSmile size={14} /> por enquanto, é só clicar, nada mais é preciso,
          </p>
        </div>

        <p className="mt-6 text-center text-xs text-[var(--graphite)]">
          <Link href="/" className="underline underline-offset-4 hover:text-[var(--amber)]">
            voltar para a página inicial
          </Link>
        </p>
      </div>
    </div>
  );
}
