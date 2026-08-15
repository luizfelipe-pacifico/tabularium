# Data Model

`packages/db/prisma/schema/schema.prisma` currently only declares the datasource and generator — no models exist yet. This document sets the modeling conventions the schema must follow, then proposes the initial domain model to implement for the MVP (see `docs/ROADMAP.md`). Treat the proposal as a starting point to refine during implementation, not a frozen spec.

## Modeling conventions

- **Normalize to 3NF by default.** Every non-key column should depend on the primary key, the whole primary key, and nothing else. Split repeated, independently-meaningful data (an operator's profile, a demand's category) into its own table/enum rather than repeating it inline.
- **Denormalize deliberately, not by accident.** Stable, rarely-changing lookup values (status, priority, category) are modeled as Prisma `enum`s, not join tables — the extra join would buy nothing for values that don't need their own metadata yet. If a lookup value later needs metadata (a color, a description, an owner), promote it to a real table at that point.
- **Atomic columns.** One value per column — no comma-separated lists, no JSON blobs standing in for a relation you'll want to query or filter later. Reach for a related table before reaching for a JSON column.
- **Explicit keys and constraints.** Every table has a primary key; every relation is a real foreign key (Prisma's `@relation`), not an unenforced convention. Add `@@unique`/`@@index` for every column combination the app actually queries or filters by.
- **Choose types for the data, not convenience.** Use `Int`/`Float`/`Decimal` for numbers instead of stringly-typed numerics, `DateTime` for timestamps, and bounded strings only where a real bound exists (e.g. a status code), not `String` everywhere.
- **Audit columns on every table:** `createdAt DateTime @default(now())` and `updatedAt DateTime @updatedAt` at minimum. Add `createdById`/`updatedById` relations where "who did this" matters (it does for demands).
- **ID strategy:** use `cuid()` (Prisma's default-friendly collision-resistant ID) as the primary key for all tables. Where a human-readable identifier is also needed (e.g. the `TB-0001` codes shown in the dashboard mock), store it as a separate, indexed, sequential display field — never overload the primary key with display formatting.
- **Soft delete only where "undo" or audit history is a real product requirement.** Default to hard deletes with cascading rules made explicit (`onDelete: Restrict` for anything that should block deletion, `Cascade` only where losing the child data is genuinely correct). If a table needs soft delete, add `deletedAt DateTime?` and filter it consistently at the data-access layer — never rely on every call site remembering to add the filter.
- **Index for the queries you actually run.** Index foreign keys and any column used in a `WHERE`/`ORDER BY` on a list view (e.g. `status`, `priority`, `assignedToId` on `Demand`). Keep it to what's justified by a real query; unused indexes cost write performance and storage for nothing.
- **Naming:** `PascalCase` for Prisma model names, `camelCase` for fields (Prisma convention, already used across the codebase's TypeScript). Let Prisma map to the database's own `snake_case` via `@@map`/`@map` only if a specific reason requires it; otherwise keep Prisma's default mapping to avoid a second naming scheme to maintain.

## Migration discipline

- Schema changes always go through `pnpm run db:migrate` (wraps `prisma migrate dev`), never a manual `ALTER TABLE` against the database and never a hand-edit of a generated migration file.
- Generated output (`packages/db/prisma/generated`, migration SQL files once they exist) is build output — read it to understand what will run, but the schema file is the source of truth to edit.
- Every migration should be reviewable on its own: prefer several small, named migrations over one large one that bundles unrelated schema changes.
- `pnpm run db:push` (schema push without a migration file) is for local prototyping only — it must not be how schema changes reach a shared or production database once the project has real data to preserve.

## Proposed initial domain model

Scope: the entities needed to make the current dashboard (`apps/web/src/components/dashboard-shell.tsx`) real, matching the "demand tracking and scoring system" framing in `docs/BRANDING.md`.

```text
Operator
├─ id            String   @id @default(cuid())
├─ name          String
├─ email         String   @unique
├─ role          OperatorRole   @default(MEMBER)
├─ createdAt     DateTime @default(now())
├─ updatedAt     DateTime @updatedAt
└─ demands       Demand[]   (via assignedToId)

enum OperatorRole { ADMIN, MEMBER }

Demand
├─ id              String   @id @default(cuid())
├─ code            String   @unique          // display id, e.g. "TB-0001"; generated sequentially
├─ title           String
├─ description     String?
├─ area            String                    // free-text area/module, e.g. "Client records" — candidate to become its own lookup table once areas need owners/metadata
├─ category        DemandCategory
├─ priority        DemandPriority
├─ status          DemandStatus  @default(OPEN)
├─ score           Int           @default(0) // see "Scoring" below
├─ assignedToId    String?
├─ assignedTo      Operator?     @relation(fields: [assignedToId], references: [id])
├─ createdById     String
├─ createdBy       Operator      @relation(fields: [createdById], references: [id])
├─ createdAt       DateTime      @default(now())
├─ updatedAt       DateTime      @updatedAt
└─ statusHistory   DemandStatusChange[]

enum DemandCategory { SUGGESTION, IMPROVEMENT, CRITICAL_BUG, MINOR_BUG }
enum DemandPriority { LOW, MEDIUM, HIGH, CRITICAL }
enum DemandStatus   { OPEN, IN_PROGRESS, COMPLETED }

DemandStatusChange                             // audit trail backing "History" and "Journey"
├─ id           String   @id @default(cuid())
├─ demandId     String
├─ demand       Demand   @relation(fields: [demandId], references: [id], onDelete: Cascade)
├─ fromStatus   DemandStatus?
├─ toStatus     DemandStatus
├─ changedById  String
├─ changedBy    Operator @relation(fields: [changedById], references: [id])
├─ note         String?
└─ changedAt    DateTime @default(now())
```

Indexes to add once implemented: `Demand(status)`, `Demand(priority)`, `Demand(assignedToId)`, `DemandStatusChange(demandId)` — these back the list/filter views already implied by the dashboard (filter by status/priority, "by operator" grouping, per-demand history).

### Scoring

The dashboard mock shows a numeric score per demand ("212 pts", "174 pts") used to rank priority. Model it as a stored, recomputed integer (`Demand.score`) rather than a value computed on every read, so sorting/filtering by score stays a plain indexed query. Recompute it server-side (in the `packages/db` data-access layer, never client-side) whenever a factor changes — start with a simple weighted formula (e.g. priority weight + category weight + age-in-queue) and treat the exact weights as a product decision to refine, not an architectural one; keep the formula in one place so it's a single point to tune.

### Deliberately out of scope for the initial model

- **Attachments/comments on a demand** — no evidence yet this is required; add a `DemandAttachment`/`DemandComment` table when the feature is actually being built, following the same conventions above.
- **Authentication tables** (sessions, credentials) — belong with whatever auth approach is chosen (see `docs/SECURITY.md` for the constraints that choice must satisfy) and are deliberately not modeled here to avoid guessing at a library-specific shape prematurely.

## References

- [Database Design Principles & Best Practices](https://www.exasol.com/hub/database/design-principles/)
- [Database Schema Design Best Practices for 2026](https://erflow.io/en/blog/database-schema-design-best-practices)
- [Prisma schema reference](https://www.prisma.io/docs/orm/prisma-schema)
