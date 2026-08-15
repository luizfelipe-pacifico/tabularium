# Claude Instructions

## Start here

Read, in order, the root `README.md`, `docs/HOW-IT-WORKS.md`, and `docs/BEST_PRACTICES.md` before changing the project. Read `docs/BRANDING.md` for interface work.

## Project context

Tabularium is an early-stage TypeScript monorepo using pnpm, Turborepo, Next.js, PostgreSQL, and Prisma. Do not assume requirements or infrastructure that are not documented in the repository.

## Canonical organization

- `apps/` contains deployable applications; currently only `apps/web`.
- `packages/` contains reusable workspace packages: `config`, `db`, `env`, and `ui`.
- `docs/` contains every Markdown document except the root `README.md`.
- The root `.env` is the only local environment file. Keep `.env.example` secret-free and synchronized with required variables.
- Generated files, caches, logs, installed dependencies, screenshots, extracted references, and experiments are not source code. Do not duplicate them into `apps/` or `packages/`.
- Before creating any path, search the repository for an existing equivalent and extend it.

## Mandatory safety rules

- Never expose or version secrets.
- Never create commits or push changes unless explicitly requested.
- Never run migrations, deployments, releases, merges, rebases, or destructive Git commands without explicit authorization.
- Never change remote resources, production data, cloud infrastructure, or repository settings without explicit authorization.
- Preserve existing user changes and keep modifications within scope.

## Working guidelines

- Prefer simple, readable solutions consistent with the feature-based layout in `docs/BEST_PRACTICES.md`.
- Put app-owned components and modules in `apps/web/src`; put genuinely shared code in the appropriate package.
- Do not create a second app, package, documentation tree, environment file, or component library for work that fits an existing location.
- Use environment variables for deploy-specific configuration.
- Update `README.md` and `docs/HOW-IT-WORKS.md` when setup, commands, architecture, or runtime flow changes.
- Use Bootstrap Icons for new UI icons when available; document any exception.

## Quality and verification

- Add or update tests in proportion to the change.
- Run available type checks and builds, plus relevant linting/tests when introduced.
- Report what was validated and any remaining limitation.
- Suggest Conventional Commit messages when useful, but do not commit unless requested.
