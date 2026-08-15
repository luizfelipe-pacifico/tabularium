# Development Best Practices

This guide establishes the development baseline for Tabularium. It must evolve with the product requirements, architecture, and technology stack.

## Project organization

Use a predictable structure and keep responsibilities separated. This stack-neutral target layout should be adapted only when the selected framework provides a stronger convention:

```text
tabularium/
├── docs/                 # Architecture, decisions, guides, and project policies
│   └── BEST_PRACTICES.md
├── src/                  # Production source code
│   ├── modules/          # Business capabilities grouped by domain
│   ├── shared/           # Reusable code with no domain ownership
│   └── config/           # Versioned, non-secret application configuration
├── tests/                # Integration, end-to-end, fixtures, and test helpers
├── scripts/              # Repeatable development and maintenance scripts
├── public/               # Static public assets, when applicable
├── migrations/           # Versioned database migrations, when applicable
├── .github/              # CI workflows and GitHub templates
├── CLAUDE.md            # Claude-specific working rules
├── CODEX.md             # Codex-specific working rules
├── README.md            # Project overview and onboarding
└── .gitignore           # Files excluded from version control
```

Organization rules:

- Group business code by domain or capability instead of generic file type as the application grows.
- Keep entry points thin and move business rules into independently testable modules.
- Put code in `shared/` only when it is genuinely reused; do not turn it into a catch-all.
- Keep unit tests close to their source when supported by the ecosystem. Use `tests/` for cross-module, integration, and end-to-end tests.
- Store architectural decision records under `docs/decisions/` with sequential names such as `0001-use-postgresql.md`.
- Never store secrets in `config/`, fixtures, examples, logs, or documentation.
- Do not create empty directories in advance. Add each directory when it has a real responsibility.
- Before creating a new file or directory, check whether an equivalent one already exists and reuse or extend it instead of duplicating structure.

### Layer-based vs. feature-based organization

There are two common ways to group source code, and the right choice depends on project size:

- **Layer-based** (a.k.a. package-by-type): files are grouped by technical role (`controllers/`, `models/`, `services/`). Simple and fine for small projects, but related code for a single feature ends up scattered across many folders as the app grows.
- **Feature-based** (a.k.a. package-by-feature or domain-driven): files are grouped by business capability (e.g. `modules/billing/`, `modules/auth/`), with each feature folder holding its own logic, tests, and types. This keeps related code together, reduces merge conflicts between contributors, and scales better with team size.

Tabularium's target layout (`src/modules/`) is feature-based. Start each module with a flat, simple internal structure and only add sub-layers (e.g. `modules/billing/http/`, `modules/billing/domain/`) once a module is large enough to need them — do not pre-create layered scaffolding for empty modules.

General naming and depth conventions:

- Use short, descriptive, unambiguous names (`email-templates`, not `templates`); avoid vague suffixes like `new`, `final`, or `v2`.
- Keep folder nesting shallow — three or four levels deep is a reasonable ceiling before it should be reconsidered.
- Use consistent casing per ecosystem convention (e.g. `kebab-case` for folders/files in JS/TS projects) and keep it uniform across the repository.
- Give every top-level folder a single, clear responsibility; do not mix source code, documentation, configuration, and generated assets in the same directory.

## Product and planning

- Record the problem, target audience, constraints, and expected outcome before implementation.
- Split large requirements into small, independently verifiable deliveries.
- Define objective acceptance criteria for every feature.
- Record important architectural decisions and their trade-offs.

## Repository and dependencies

- Keep `README.md` synchronized with setup, commands, configuration, and behavior.
- Declare and lock dependencies through the selected ecosystem's manifest and lockfile.
- Do not rely on globally installed packages or undocumented machine state.
- Keep deploy-specific configuration in environment variables and provide a secret-free `.env.example`.
- Do not version generated artifacts, caches, installed dependencies, or personal editor settings.

## Branches and review

- Keep `main` stable and use short-lived branches for features and fixes.
- Make pull requests small and include context, scope, risks, and verification instructions.
- Require automated checks and review before merging application changes.
- Resolve review conversations and avoid unrelated refactors in the same change.
- Protect `main` against deletion, force pushes, and merges that bypass required checks.
- Documentation-only changes may go directly to `main`; all other changes must use a dedicated branch.

Suggested branch names:

```text
feat/short-name
fix/short-name
docs/short-name
refactor/short-name
```

## Commits

Keep commits small and self-contained. Use Conventional Commits:

```text
<type>(<optional-scope>): <description>
```

Common types include `feat`, `fix`, `docs`, `test`, `refactor`, `chore`, and `ci`.

Example: `feat(auth): add password recovery`.

## Automated quality

- Use reproducible formatting and linting rules.
- Cover business rules with unit tests and critical flows with integration or end-to-end tests.
- Add a regression test for every fixed bug when practical.
- Run formatting, static analysis, tests, and builds in continuous integration.
- Do not use coverage percentage as the only quality measure; verify meaningful behavior and edge cases.

## Security

- Never commit passwords, tokens, keys, credentials, or connection strings.
- Validate all untrusted input on the server, preferably with allowlists.
- Use parameterized queries and context-appropriate output encoding.
- Enforce authentication and authorization on trusted systems and apply least privilege.
- Keep dependencies current and enable dependency alerts, code scanning, and secret scanning.
- Never write sensitive data to logs. Rotate any exposed secret immediately.

## Configuration and operations

- Keep code separate from deploy-specific configuration.
- Make development, staging, and production environments as similar as practical.
- Separate build, release, and run stages.
- Produce structured logs with diagnostic context but no confidential information.
- Design services for fast startup and graceful shutdown.

## Releases

When the project has a public API, use Semantic Versioning in the `MAJOR.MINOR.PATCH` format:

- `MAJOR` for incompatible changes.
- `MINOR` for backward-compatible features.
- `PATCH` for backward-compatible fixes.

Never modify an already published version. Record meaningful changes in a changelog and tag releases in Git.

## Definition of done

- [ ] Acceptance criteria are satisfied.
- [ ] The implementation is simple and readable.
- [ ] Appropriate tests exist and all checks pass.
- [ ] No secrets or known vulnerabilities were introduced.
- [ ] Relevant documentation was updated.
- [ ] The change was reviewed and can be safely released or reverted.

## References

- [GitHub Docs: Best practices for repositories](https://docs.github.com/en/repositories/creating-and-managing-repositories/best-practices-for-repositories)
- [GitHub Docs: Managing and standardizing pull requests](https://docs.github.com/en/pull-requests/reference/managing-and-standardizing-pull-requests)
- [GitHub Docs: Continuous integration](https://docs.github.com/en/actions/get-started/continuous-integration)
- [The Twelve-Factor App](https://12factor.net/)
- [Folder Structure Best Practices: The Complete Guide](https://www.suitefiles.com/guide/the-guide-to-folder-structures-best-practices-for-professional-service-firms-and-more/)
- [Organizing Project Folder Structure: Function-Based vs Feature-Based](https://medium.com/@ikonija.bogojevic/organizing-project-folder-structure-function-based-vs-feature-based-168596b6d169)
- [Standard Go Project Layout](https://github.com/golang-standards/project-layout)
- [OWASP Secure Coding Practices Checklist](https://owasp.org/www-project-secure-coding-practices-quick-reference-guide/stable-en/02-checklist/05-checklist)
- [Conventional Commits 1.0.0](https://www.conventionalcommits.org/en/v1.0.0/)
- [Semantic Versioning 2.0.0](https://semver.org/)
