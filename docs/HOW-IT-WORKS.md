# How Tabularium Works

## Overview

Tabularium is a pnpm/Turborepo monorepo. The current product is a Next.js 16 application backed by PostgreSQL through Prisma. Workspace packages isolate shared configuration, database access, environment validation, and UI primitives.

## Repository map

```text
tabularium/
├── src/                      # Deployable root Next.js application
│   ├── app/                  # App Router entry points and layouts
│   │   ├── (app)/            # Every product route; wrapped in the sidebar/header shell
│   │   ├── (marketing)/      # Public site (Home, Recursos, Sobre); one nav/footer layout
│   │   └── login/            # Standalone; no real auth yet, see docs/DESIGN-LOG.md
│   ├── components/           # Components owned by the web app
│   │   ├── app-shell/        # Sidebar, header, and shared page-header used by every (app) route
│   │   └── landing/          # Animation primitives and icons used by the (marketing) site
│   └── lib/                   # App-only data/helpers (currently mock data — see docs/SCREENS.md)
├── packages/
│   ├── config/               # Shared TypeScript configuration
│   ├── db/                   # Prisma schema, generated client boundary, and DB access
│   ├── env/                  # Typed server/browser environment validation
│   └── ui/                   # Shared UI primitives, hooks, utilities, and global styles
├── docs/                     # All Markdown documentation except README.md
├── .env                     # Local secrets; ignored by Git
├── .env.example             # Safe environment template
├── package.json             # Root commands
├── pnpm-workspace.yaml       # Workspace and dependency catalog
└── turbo.json                # Task graph and cache policy
```

## Runtime flow

1. Root commands invoke Next.js directly; database commands use Turborepo to target `packages/db`.
2. Root `next.config.ts` loads `.env` before Next.js configuration and environment validation run.
3. The App Router starts at `src/app/layout.tsx` (fonts, theme provider). Every product route lives under the `src/app/(app)/` route group, whose `layout.tsx` wraps `{children}` in `AppShell` — the persistent sidebar and header. `/` renders the Overview page; see `docs/SCREENS.md` for every other route.
4. App-specific React components live in `src/components`. `src/components/app-shell/` holds the sidebar, header (including the Light/Dark/System theme toggle), and the shared `PageHeader` every route uses.
5. Shared styles and UI primitives come from `packages/ui` through `@tabularium/ui/*` imports.
6. Server environment variables are validated by `packages/env/src/server.ts`. Browser variables, when added, must be explicitly declared in `packages/env/src/web.ts`.
7. Database code imports the client boundary from `packages/db`. Prisma reads `packages/db/prisma/schema/schema.prisma` and uses `DATABASE_URL` from the root `.env`.

## Environment variables

There is exactly one local `.env`, at the repository root. Create it from `.env.example`; never commit it or paste its values into documentation, logs, fixtures, or source code.

- `DATABASE_URL` is required by the application and Prisma.
- `HOSTNAME`, `PORT`, and `LOCAL_URL` define the local server at `http://localhost:3000`.
- `NEXT_PUBLIC_APP_URL` defines the canonical public project URL (`https://tabularium-tech.vercel.app`).
- Additional PostgreSQL variables in `.env.example` support local tooling/providers but do not replace `DATABASE_URL`.
- New variables must be added to `.env.example` with safe placeholders and validated in `packages/env` when consumed by application code.

## Main commands

| Command | Purpose |
| --- | --- |
| `pnpm install` | Install all workspace dependencies. |
| `pnpm dev` | Start the root Next.js app at `http://localhost:3000`. |
| `pnpm start` | Start the production server after a successful build. |
| `pnpm check-types` | Type-check the root Next.js application. |
| `pnpm build` | Create production builds. |
| `pnpm db:generate` | Regenerate the Prisma client. |
| `pnpm db:push` | Push the schema to a configured database; changes external data. |
| `pnpm db:migrate` | Run migrations; changes external data. |
| `pnpm db:studio` | Open Prisma Studio for the configured database. |

Database-changing commands require deliberate confirmation and a correctly targeted environment.

## Where new work belongs

- New product route: `src/app/(app)/<route>/page.tsx` — it automatically gets the sidebar/header shell. Add its nav entry in `src/components/app-shell/sidebar.tsx` and document it in `docs/SCREENS.md`.
- New product capability: `src/modules/<feature>` once a domain module is needed.
- App-only visual block: `src/components` or inside its owning feature module.
- Reusable UI primitive: `packages/ui/src/components`.
- Database schema or access: `packages/db`.
- Environment validation: `packages/env`.
- Architecture, policy, design, investigation, or AI guidance: `docs/`.
- Temporary experiments and extracted references: outside canonical source folders and never committed as product code.

Do not create alternate `app`, `src`, `components`, `packages`, or documentation trees. Search first and extend the canonical location.

The Next.js application and its `package.json`, `next.config.ts`, `tsconfig.json`, `postcss.config.mjs`, and `components.json` live at the repository root. Do not recreate `apps/web`.

## Generated and local-only content

The following are disposable and ignored: `node_modules`, `.next`, `.turbo`, `*.tsbuildinfo`, logs, `tmp`, and local `.env` files. They may be deleted and regenerated; they must not be treated as source or copied into another folder.

Prisma output under `packages/db/prisma/generated` is generated by `pnpm db:generate` and is also not hand-edited.

## Vercel deployment

The Vercel project is `luiz-felipe-pacificos-projects/tabularium`. Its Root Directory must remain empty because the Next.js application lives at the repository root. Framework, build, install, and output settings use Vercel's Next.js auto-detection.

`DATABASE_URL` must exist in the Vercel Production, Preview, and Development environments before installation, because `packages/db` generates the Prisma client during `postinstall`. Deploy production from the repository root with `vercel deploy --prod` after `pnpm check-types` and `pnpm build` pass. Never run database migrations automatically as part of the Vercel build.

## Documentation ownership

- `README.md`: quick onboarding and command index.
- `docs/HOW-IT-WORKS.md`: repository map, runtime flow, and placement rules (this document).
- `docs/ARCHITECTURE.md`: layering, dependency direction, request lifecycle, and the reasoning behind the structure.
- `docs/SECURITY.md`: mandatory security rules for credentials, tokens, rate limiting, and access control.
- `docs/DATA_MODEL.md`: data modeling conventions and the domain schema.
- `docs/ROADMAP.md`: MVP scope and the phased plan after it.
- `docs/SCREENS.md`: every route in the app shell — purpose, data it needs, and backend TODOs.
- `docs/DESIGN-LOG.md`: the public marketing site (`src/app/(marketing)/`, `/login`) — decisions, image sources, and the photo-treatment spec.
- `docs/BEST_PRACTICES.md`: engineering and repository policies.
- `docs/BRANDING.md`: visual system and interface rules.
- `docs/CLAUDE.md` and `docs/CODEX.md`: tool-specific working instructions.
- `docs/NEXTJS-AGENT-RULES.md`: version-aware Next.js guidance for coding agents.

When architecture or setup changes, update this document and the README in the same change.
