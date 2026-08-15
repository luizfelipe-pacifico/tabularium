# Architecture

`docs/HOW-IT-WORKS.md` maps the repository and its commands. This document covers the layer, so it explains *why* the system is shaped the way it is: layering, boundaries, request lifecycle, and the rules that keep the codebase coherent as it grows. Read `docs/HOW-IT-WORKS.md` first for orientation, then this document for the reasoning behind it.

## Architectural style

Tabularium is a **modular monolith inside a pnpm/Turborepo monorepo**: one deployable application (`apps/web`) backed by shared, independently versionable packages (`packages/*`). There is no separate backend service — Next.js's App Router acts as its own backend-for-frontend (BFF): Server Components, Route Handlers, and Server Actions run exclusively on the server and are the only code allowed to touch the database or hold secrets.

This style was chosen because the product (a single-team demand tracking and scoring system) does not yet have a reason to pay for the operational cost of separate services. Package boundaries inside the monorepo exist so that splitting a package into its own deployable later — if the product ever needs it — is a refactor, not a rewrite.

## Layers and dependency direction

```text
┌─────────────────────────────────────────────┐
│ apps/web                                     │
│  ┌─────────────┐   ┌───────────────────────┐ │
│  │ app/ (routes)│──▶│ components/ (app-only)│ │
│  └──────┬──────┘   └───────────────────────┘ │
│         │ imports                             │
└─────────┼─────────────────────────────────────┘
          ▼
┌───────────────────┐  ┌───────────────────┐  ┌───────────────────┐
│ packages/ui        │  │ packages/db        │  │ packages/env       │
│ shared components,  │  │ Prisma client       │  │ validated server/  │
│ styles, primitives  │  │ boundary, queries   │  │ client env vars    │
└───────────────────┘  └─────────┬──────────┘  └───────────────────┘
                                  ▼
                         ┌────────────────┐
                         │ PostgreSQL (Neon)│
                         └────────────────┘
```

Rules that keep this graph acyclic and enforceable:

- **Dependencies point one way**: `apps/*` depend on `packages/*`; packages never import from `apps/*`. A package that needs app-specific behavior takes it as a parameter/prop, it does not reach back into the app.
- **Packages don't depend on each other except through `packages/env` and `packages/config`**, which are foundational (env validation, shared TS config) and may be imported by any other package. `packages/ui` does not import `packages/db`, and vice versa — UI stays render-only and framework-agnostic of the data layer.
- **Only `packages/db` talks to PostgreSQL.** Application code (`apps/web`) never imports `@prisma/client` or holds a raw connection string; it imports the typed client boundary from `packages/db` (`packages/db/src/index.ts`). This is the Data Access Layer: as query complexity grows, add query functions in `packages/db` (e.g. `packages/db/src/demands.ts`) rather than calling the Prisma client ad hoc from route code, so authorization and validation rules for a given entity live in one place instead of being re-implemented at every call site.
- **Only `packages/env`, via `server.ts`, is allowed to read `process.env` for secrets.** Everything else receives already-validated, typed config.

## Request lifecycle

A typical read (e.g. loading the dashboard) and a typical write (e.g. creating a demand) both stay entirely server-side except for the final render:

```text
Read (Server Component):
  Browser → Next.js route (app/page.tsx, a Server Component)
          → packages/db query function
          → PostgreSQL
          ← rows
  ← rendered HTML/RSC payload (no client-side fetch, no exposed query)

Write (Server Action or Route Handler):
  Browser → form submit / fetch to a Server Action or Route Handler
          → auth check (session cookie, validated server-side)
          → zod validation of the input
          → authorization check (is this user allowed to act on this record?)
          → packages/db mutation function
          → PostgreSQL
  ← redirect / revalidated data / JSON response
```

Client components (`"use client"`) exist only where interactivity requires them (the current `DashboardShell` is one — it holds local UI state such as the open sidebar and the search query). They receive already-fetched, already-authorized data as props; they do not independently decide what they're allowed to see. See `docs/SECURITY.md` for the authentication/authorization rules this lifecycle depends on.

## Where new logic belongs

This restates and sharpens `docs/HOW-IT-WORKS.md`'s placement rules from an architectural angle:

| Concern | Location |
| --- | --- |
| Route/page composition, layouts | `apps/web/src/app` |
| App-only UI (not reused elsewhere) | `apps/web/src/components` |
| A business capability (e.g. "demands", "scoring") once it has real logic | `apps/web/src/modules/<feature>`, feature-based (see `docs/BEST_PRACTICES.md`) |
| Reusable, presentation-only UI primitive | `packages/ui/src/components` |
| Database schema, queries, mutations | `packages/db` |
| Environment variable declaration/validation | `packages/env` |
| Shared TypeScript config | `packages/config` |
| Architecture/policy/design decisions | `docs/` |

A module under `apps/web/src/modules/<feature>` should itself stay layered internally as it grows: keep its own data-access calls (thin wrappers around `packages/db` functions), its business/scoring logic, and its components separated within the module rather than as one large file — but do not pre-create that internal structure before a module actually needs it (see `docs/BEST_PRACTICES.md`, "Do not create empty directories in advance").

## Non-functional principles

- **Types are the contract.** Prisma generates types from the schema (`packages/db/prisma/generated`); `packages/env` generates types from validated environment variables. Do not hand-write types that duplicate a generated source of truth.
- **Server-first.** Prefer Server Components and server-side data fetching over client-side `fetch` + `useEffect`. This keeps queries, secrets, and authorization on the server by construction, not by discipline (see `docs/SECURITY.md`, section 2).
- **Fail closed.** Missing configuration, a failed validation, or an unauthorized request must block the operation, not degrade silently. `packages/env`'s `skipValidation` escape hatch exists for CI/tooling edge cases, not as a way to bypass a real misconfiguration.
- **Observability grows with the system.** There is no logging/monitoring infrastructure yet; when it's introduced, route it through a single shared utility (likely a new `packages/observability` or an addition to `packages/config`) rather than ad hoc `console.log` calls scattered through routes.

## Architecture decisions

Record decisions that are expensive to reverse (choice of ORM, auth strategy, hosting, a new service boundary) as Architecture Decision Records under `docs/decisions/`, sequentially numbered (`0001-use-postgresql.md`, per `docs/BEST_PRACTICES.md`). A short ADR — context, decision, consequences — is enough; this document should stay a description of the *current* shape, and let the ADR log carry the history of *why* it changed.

## References

- [C4 model](https://c4model.com/)
- [arc42 template](https://arc42.org/)
- [arc42 + C4 + Documentation as Code example](https://bitsmuggler.github.io/arc42-c4-software-architecture-documentation-example/)
- [Next.js: Data Security guide](https://nextjs.org/docs/app/guides/data-security)
