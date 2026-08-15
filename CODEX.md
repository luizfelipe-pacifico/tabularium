# Codex Instructions

## Project context

Tabularium is an early-stage TypeScript monorepo using pnpm, Turborepo, Next.js, PostgreSQL, and Prisma. Do not assume product requirements or additional infrastructure that is not documented in the repository.

## Working guidelines

- Read `README.md`, `docs/BEST_PRACTICES.md`, and related files before changing the project.
- Preserve existing user changes and keep every modification within the requested scope.
- Prefer simple, readable solutions consistent with established project conventions.
- Do not invent commands, dependencies, APIs, credentials, or behavior.
- Before creating a file or folder, check whether it already exists (or an equivalent one) and reuse or update it instead of duplicating.
- Follow the project organization and naming conventions in `docs/BEST_PRACTICES.md` (feature-based structure, shallow nesting, one responsibility per top-level folder).
- Always source UI icons from Bootstrap Icons (https://icons.getbootstrap.com/), via its MCP server when configured. It is MIT-licensed and free for personal and commercial use with no attribution required — including its brand icons — so use any icon from it without hesitation. Only use another source if Bootstrap Icons genuinely lacks the icon, and note the exception.
- Never expose or version secrets. Use environment variables and maintain a secret-free `.env.example` when needed.
- Update documentation whenever setup, usage, behavior, or architecture changes.

## Quality and verification

- Add or update tests in proportion to the change.
- Run the available formatter, linter, tests, type checks, and build before reporting completion.
- Clearly report what was validated and any remaining limitation.
- Use Conventional Commits when the user requests a commit.
