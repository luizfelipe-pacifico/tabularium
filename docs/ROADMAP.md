responsividade sempre para desktop, tablet e mobile
# Roadmap

This is a living plan, not a commitment with dates. It defines the smallest functional version of Tabularium (the MVP) and the pillars to build after it. Update it whenever scope, priority, or sequencing changes — an out-of-date roadmap is worse than none.

Status legend: `[ ]` not started · `[~]` in progress · `[x]` done.

## MVP: the smallest version that is actually useful

The MVP is: **one operator can log in, register a demand, see it scored and listed on the dashboard, and move it through its status — all backed by a real database, with the security baseline from `docs/SECURITY.md` already in place.** Everything else is deliberately deferred; the current `DashboardShell` (`src/components/dashboard-shell.tsx`) already renders the target UI against hardcoded arrays — the MVP's job is to make that data real, not to redesign it.

- [ ] **Schema and migration**: implement the initial model from `docs/DATA_MODEL.md` (`Operator`, `Demand`, the category/priority/status enums, `DemandStatusChange`) in `packages/db/prisma/schema/schema.prisma` and run the first migration with `pnpm run db:migrate`.
- [ ] **Data access layer**: add typed query/mutation functions in `packages/db` (list demands, create demand, update status, list operators) instead of calling Prisma directly from route code, per `docs/ARCHITECTURE.md`.
- [ ] **Authentication (minimal but real)**: a single-role sign-in (email + password or magic link is enough) issuing an `httpOnly`/`Secure`/rotated session per `docs/SECURITY.md` — no shortcuts here even for v0, because retrofitting token security after real users exist is far more expensive than doing it correctly once.
- [ ] **Demand CRUD wired to the UI**: replace the hardcoded `demands`/`metricCards` arrays in `DashboardShell` with Server Component data fetching and Server Actions for create/update, each with `zod` input validation and a server-side authorization check.
- [ ] **Live metrics**: "Active total", "Open", "In progress", "Completed" computed from the database instead of hardcoded strings.
- [ ] **Scoring v0**: implement the simple weighted formula described in `docs/DATA_MODEL.md` and store it on `Demand.score`; refine the weights later, but the mechanism (stored, server-computed, single place to tune) should exist from the start.
- [ ] **Brand tokens applied**: `packages/ui/src/styles/globals.css` still uses the default shadcn neutral palette; replace it with the tokens defined in `docs/BRANDING.md` so the MVP actually looks like the product, not a template.
- [ ] **Security baseline enforced**: rate limiting on the auth and mutation endpoints, the security headers listed in `docs/SECURITY.md` §6, and the review checklist in `docs/SECURITY.md` §10 passed before this is considered done.
- [ ] **Minimum verification**: type checks and build green (`pnpm run check-types`, `pnpm run build`); at least one automated test covering the create-demand and status-change flows.

Nothing below this line is required to call the MVP done. Resist adding to this list — new ideas go into a pillar below instead.

## Post-MVP pillars

Each pillar is a coherent area of work, not a strict phase — pull from whichever pillar matters most once the MVP ships, based on real usage. They're ordered by how directly they build on what already exists in the codebase and BRANDING.md, not by mandatory sequence.

### 1. Journey & history (demand lifecycle tracking)

The dashboard already reserves a "Journey" and a "History" nav item (`src/components/dashboard-shell.tsx`) with no view behind them yet, and `docs/DATA_MODEL.md` already models `DemandStatusChange` to back this.

- Per-demand timeline view: every status change, who made it, and when.
- A "Journey" screen showing a demand's full lifecycle from creation to completion, not just its current state.
- Filters by date range and by operator on the history view.
- This is the natural home for the roadmap/progress-tracking angle inside the product itself: demands *are* the work items being tracked, and this pillar is what makes their progress visible over time, not just their current snapshot.

### 2. Multi-operator collaboration

- Operator invitations and account management beyond the single MVP login.
- Role enforcement (`ADMIN` vs `MEMBER`, per `docs/DATA_MODEL.md`) in both the UI (hide actions a role can't take) and the API (the real, server-side check per `docs/SECURITY.md` §5 — the UI hiding an action is never the actual control).
- Assignment workflow: assign/reassign a demand, "by operator" grouping (already stubbed in the dashboard's operator panel) becomes real.

### 3. Scoring engine v2

- Move from a fixed formula to configurable weights (priority, category, age-in-queue, and any factor the team decides matters).
- Score history/trend per demand, not just the current value.
- Use the "Highest priority" panel already in the dashboard as the proving ground: it should reflect the refined score, ranked correctly, with no manual curation.

### 4. Search, filters, and saved views

- Wire the existing search box (`⌘K` affordance already in the UI) to a real, indexed query instead of client-side array filtering.
- Build the "Filter" panel already stubbed on the demand list (filter by status, priority, category, operator, date range).
- Saved filter presets per operator once ad hoc filtering is in daily use.

### 5. Notifications and alerts

- The dashboard already reserves a notification bell with a count. Back it with real events: assignment, status change, mention.
- Start in-app only; evaluate email/webhook delivery once in-app notifications are proven useful.
- Any notification-triggering endpoint follows the same rate-limiting rule as every other write endpoint (`docs/SECURITY.md` §3).

### 6. Reporting and analytics

- Trends over time (throughput, aging demands, category/priority distribution over time, not just the current snapshot the distribution cards show today).
- Exportable reports once there's a concrete audience/format requirement — do not build export generically ahead of a real need.

### 7. Hardening and operations

- CI pipeline running type checks, build, and tests on every pull request (none exists yet).
- Move `Content-Security-Policy` from Report-Only to enforced once the header inventory from `docs/SECURITY.md` §6 is stable.
- Move secrets from plain environment variables to a managed secrets store for any real deployment target.
- Backups and a verified restore process for the production database.
- Basic observability (structured server-side logging, error tracking) routed through one shared utility per `docs/ARCHITECTURE.md`.

## How to use this document

- When a pillar item starts, mark it `[~]` and open an issue/branch for it; when it ships, mark it `[x]` and note the date in the entry.
- A decision that's expensive to reverse while working a pillar (a new service boundary, an auth provider choice, a hosting change) gets its own ADR under `docs/decisions/`, per `docs/BEST_PRACTICES.md` — this document stays the plan, the ADR log stays the reasoning.
- If a new idea doesn't fit an existing pillar, add a new pillar rather than bolting it onto an unrelated one.
