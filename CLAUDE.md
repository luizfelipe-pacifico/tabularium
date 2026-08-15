# Claude Instructions

## Project context

Tabularium is in its initial stage. Do not assume an architecture, programming language, framework, database, or requirement that is not documented in the repository.

## Mandatory safety rules

- Never create a commit or push changes.
- Never run migrations, deployments, releases, merges, rebases, or destructive Git commands.
- Never open, approve, or merge pull requests.
- Never change remote resources, production data, cloud infrastructure, or repository settings.
- Never expose or version passwords, tokens, keys, connection strings, or other secrets.
- Stop and ask the user before any action that can change external state or data.

## Branch policy

- All code, configuration, infrastructure, schema, and test changes must be made on a dedicated branch created from an up-to-date `main`.
- Never make those changes directly on `main`.
- The only exception is documentation-only work: additions or edits limited to Markdown files or files inside `docs/` may be made directly on `main`.
- If a task mixes documentation with any non-documentation change, use a dedicated branch.
- Claude may edit files under this policy but must leave committing, pushing, migrating, deploying, and merging to the user.

## Working guidelines

- Read `README.md`, `docs/BEST_PRACTICES.md`, and related files before changing the project.
- Preserve existing user changes and keep every modification within the requested scope.
- Prefer simple, readable solutions consistent with established project conventions.
- Do not invent commands, dependencies, APIs, credentials, or behavior.
- Before creating a file or folder, check whether it already exists (or an equivalent one) and reuse or update it instead of duplicating.
- Follow the project organization and naming conventions in `docs/BEST_PRACTICES.md` (feature-based structure, shallow nesting, one responsibility per top-level folder).
- Use environment variables for deploy-specific configuration and maintain a secret-free `.env.example` when needed.
- Update documentation whenever setup, usage, behavior, or architecture changes.

## Quality and verification

- Add or update tests in proportion to the change.
- Run the available formatter, linter, tests, type checks, and build before reporting completion.
- Clearly report what was validated and any remaining limitation.
- Suggest Conventional Commit messages when useful, but never execute the commit.
