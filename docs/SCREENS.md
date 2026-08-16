# Screens

One entry per route in the app shell (`src/app/(app)/`). Every page currently renders **static mock data** from `src/lib/mock-data.ts` — there is no backend yet (see `docs/ROADMAP.md`'s MVP checklist). This document is the spec for replacing that mock data with real queries: what each screen shows, which fields it needs from `docs/DATA_MODEL.md`, and what's explicitly deferred.

The persistent chrome (sidebar + header, including the theme toggle) lives in `src/components/app-shell/` and wraps every route below via `src/app/(app)/layout.tsx`. `/layout-guide` is the only route outside this group — it's a standalone internal style reference, not part of the product navigation.

## Primary navigation

### `/` — Overview
- **Purpose**: landing dashboard — headline metrics, priority/category distribution, latest demands, top-priority demands, operation status.
- **Component**: `src/components/overview.tsx`.
- **Data needed**: aggregate counts of `Demand` by status; count/percentage breakdowns by `priority` and `category`; the N most recent `Demand` rows; the top-`score` `Demand` rows; operator assignment summary (count unassigned).
- **Backend TODO**: all of the above are aggregation queries — good candidates for the `packages/db` data-access layer (`docs/ARCHITECTURE.md`), not per-request client computation.

### `/demands` — Active demands
- **Purpose**: filterable list of demands with status `Open` or `In progress`.
- **Component**: `src/components/demand-list.tsx` (shared with History).
- **Data needed**: `Demand` rows filtered by `status`, with client-side search/category/priority/operator filters — should become server-side filtered queries once the list is large.
- **Backend TODO**: paginate; move filtering server-side; the demand row's click target should open a demand detail view (not built yet — no route/modal exists for a single demand).

### `/board` — Board
- **Purpose**: kanban snapshot of all demands grouped by `status` (Open / In progress / Completed).
- **Data needed**: same `Demand` fields as Active demands, grouped by status.
- **Backend TODO**: drag-and-drop status changes (writing to `Demand.status` and inserting a `DemandStatusChange` row) — currently display-only.

### `/journey` — Journey
- **Purpose**: lifecycle view — a stage-count summary plus a chronological feed of status changes across all demands.
- **Data needed**: `DemandStatusChange` rows (`fromStatus`, `toStatus`, `changedBy`, `note`, `changedAt`), joined to the parent `Demand` for its display code.
- **Backend TODO**: this page is the primary reason `DemandStatusChange` exists in `docs/DATA_MODEL.md` — implementing it is close to a direct 1:1 translation of the mock `statusChanges` array. Consider a per-demand drill-down (its own timeline) as a fast-follow once this list view is real.

### `/history` — History
- **Purpose**: same list UI as Active demands, filtered to `status = Completed`.
- **Component**: `src/components/demand-list.tsx` (shared with Active demands).
- **Data needed**: same as Active demands.
- **Backend TODO**: same as Active demands.

### `/operators` — Operators
- **Purpose**: team roster — each operator's active/completed demand counts, plus an "Unassigned" summary card.
- **Data needed**: `Operator` rows; `Demand` counts grouped by `assignedTo` and `status`.
- **Backend TODO**: operator invitation/management UI doesn't exist yet (Roadmap pillar "Multi-operator collaboration").

### `/notes` — Notes
- **Purpose**: lightweight capture (draft textarea → list), no categorization.
- **Data needed**: none from `docs/DATA_MODEL.md` today — notes aren't a modeled entity.
- **Backend TODO**: not persisted at all (in-memory React state, lost on refresh). Needs its own `Note` model (author, text, createdAt, optionally a link to a `Demand` it was promoted from) before it can be real.

## System menu

### `/roadmap` — Roadmap
- **Purpose**: in-app mirror of `docs/ROADMAP.md` — MVP checklist and the 7 post-MVP pillars.
- **Data needed**: none from the data model; content is currently hand-duplicated from `docs/ROADMAP.md`.
- **Backend TODO**: not a database concern — the real gap is that this page's content can drift from `docs/ROADMAP.md` since it's copied, not rendered from the source file. Consider parsing/rendering the actual markdown at build time if this drifts in practice.

### `/reports` — Reports
- **Purpose**: date-range + operator performance summary (demands in scope, completed count, average score, top closer).
- **Data needed**: `Demand` rows filtered by `createdAt`/`assignedTo`, aggregated.
- **Backend TODO**: date-range presets are currently decorative (they don't actually filter the mock data by date). PDF/PPTX export from the DêConta reference was deliberately dropped — revisit only if a real export requirement shows up.

### `/support` — Support
- **Purpose**: SLA reference table keyed by `DemandPriority`, plus a live list of open Critical demands.
- **Data needed**: `Demand` rows filtered by `priority = Critical` and `status != Completed`.
- **Backend TODO**: SLA countdowns/breach alerts are not implemented — this page is a static reference plus a filtered list today.

### `/integrations` — Integrations
- **Purpose**: status cards for planned integrations (Notifications, Webhooks, SSO/RBAC, Public API).
- **Data needed**: none — purely informational, all four are "planned."
- **Backend TODO**: each card corresponds to a Roadmap pillar; there is nothing to wire up until that pillar starts.

### `/manual` — Manual
- **Purpose**: static in-app help content explaining Tabularium's own concepts (demands, priority/category, journey, operators).
- **Data needed**: none.
- **Backend TODO**: none — content-only page.

### `/profile` — Profile
- **Purpose**: the signed-in operator's own info (name, email, role) and an appearance reminder.
- **Data needed**: the current `Operator` row, once authentication exists.
- **Backend TODO**: entirely placeholder today ("Not set — connect authentication to populate this") since there is no auth session to read from yet.

### `/settings` — Settings
- **Purpose**: appearance (the real, working theme toggle), sidebar-collapse preference, notification preference, and a database-connection status indicator.
- **Data needed**: a per-operator preferences record (theme choice, sidebar state, notification channel) once accounts exist; connection status could read `packages/env`'s validated `DATABASE_URL` presence.
- **Backend TODO**: only Appearance is functionally real today (it's the header's `ModeToggle`, working via `next-themes`). Sidebar/notification rows are display-only.

## Cross-cutting notes

- **Icons**: every screen uses `lucide-react` exclusively, matching the shadcn config (`components.json`: `"iconLibrary": "lucide"`) and every existing component in `packages/ui`.
- **Styling**: every screen reuses the CSS classes already established for the Overview page (`packages/ui/src/styles/globals.css`: `.panel`, `.tag`, `.status-tag`, `.priority-*`, plus new shared primitives added for this pass: `.page-intro`, `.field-select`, `.stage-board`, `.kanban-columns`, `.timeline`, `.settings-row`, `.status-pill`) rather than a second, parallel styling approach.
- **Dark mode**: see `docs/BRANDING.md`'s "Dark mode" section for the token rationale.
