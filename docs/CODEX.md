# Codex Instructions

## Start here

Read, in order, the root `README.md`, `docs/HOW-IT-WORKS.md`, and `docs/BEST_PRACTICES.md` before changing the project. Read `docs/BRANDING.md` for interface work.

## Project context

Tabularium is an early-stage TypeScript monorepo using pnpm, Turborepo, Next.js, PostgreSQL, and Prisma. Do not invent undocumented requirements, commands, dependencies, APIs, credentials, or infrastructure.

## Canonical organization

- `apps/` is only for independently deployable applications; the current application is `apps/web`.
- `packages/` is only for reusable workspace capabilities: `config`, `db`, `env`, and `ui`.
- `docs/` contains every Markdown document except the root `README.md`.
- The root `.env` is the single local source of environment variables; `.env.example` contains names and safe placeholders only.
- Never create parallel folders such as another `src`, `components`, `docs`, `app`, or copied project tree when an existing canonical location can be extended.
- Search before creating. Reuse or update an equivalent file or directory instead of adding a duplicate.

## Working rules

- Preserve user changes and remain within the requested scope.
- Keep business capabilities feature-based under `apps/web/src/modules` as they are introduced.
- Keep app-only components in `apps/web/src/components` and shared UI primitives in `packages/ui/src/components`.
- Keep database schema/client concerns in `packages/db` and environment validation in `packages/env`.
- Never expose or version secrets.
- Update `README.md` and `docs/HOW-IT-WORKS.md` whenever setup, architecture, commands, or behavior changes.
- Use Bootstrap Icons for new UI icons when available and document any exception.

## Quality and verification

- Add or update tests in proportion to the change.
- Run available type checks and builds, plus relevant linting/tests when introduced.
- Clearly report validations and remaining limitations.
- Use Conventional Commits only when the user requests a commit.
