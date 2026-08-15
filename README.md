# Tabularium

This project was created with [Better-T-Stack](https://github.com/AmanVarshney01/create-better-t-stack), a modern TypeScript stack that combines Next.js, Self, and more.

## Features

- **TypeScript** - For type safety and improved developer experience
- **Next.js** - Full-stack React framework
- **TailwindCSS** - Utility-first CSS for rapid UI development
- **Shared UI package** - shadcn/ui primitives live in `packages/ui`
- **Prisma** - TypeScript-first ORM
- **PostgreSQL** - Database engine
- **Turborepo** - Optimized monorepo build system

## Getting Started

First, install the dependencies:

```bash
pnpm install
```

## Database Setup

This project uses PostgreSQL with Prisma.

1. Make sure you have a PostgreSQL database set up.
2. Copy `.env.example` to `.env` in the repository root and fill in your PostgreSQL connection details. The root `.env` is the only local environment file used by the workspace.

3. Apply the schema to your database:

```bash
pnpm run db:push
```

Then, run the development server:

```bash
pnpm run dev
```

Open [http://localhost:3001](http://localhost:3001) in your browser to see the fullstack application.

## UI Customization

React web apps in this stack share shadcn/ui primitives through `packages/ui`.

- Change design tokens and global styles in `packages/ui/src/styles/globals.css`
- Update shared primitives in `packages/ui/src/components/*`
- Adjust shadcn aliases or style config in `packages/ui/components.json` and `apps/web/components.json`

### Add more shared components

Run this from the project root to add more primitives to the shared UI package:

```bash
npx shadcn@latest add accordion dialog popover sheet table -c packages/ui
```

Import shared components like this:

```tsx
import { Button } from "@tabularium/ui/components/button";
```

### Add app-specific blocks

If you want to add app-specific blocks instead of shared primitives, run the shadcn CLI from `apps/web`.

## Project Structure

```text
tabularium/
├── apps/
│   └── web/         # Full-stack Next.js application
├── docs/                # All project documentation except this README
├── packages/
│   ├── config/      # Shared TypeScript configuration
│   ├── db/          # Prisma schema and database client
│   ├── env/         # Validated environment variables
│   └── ui/          # Shared shadcn/ui components and styles
├── .env.example         # Secret-free environment variable template
├── pnpm-workspace.yaml # Workspace and dependency catalog
└── turbo.json          # Monorepo task pipeline
```

## Documentation

- [Development best practices](docs/BEST_PRACTICES.md)
- [Brand and interface guidelines](docs/BRANDING.md)
- [How the system works](docs/HOW-IT-WORKS.md)
- [Claude working instructions](docs/CLAUDE.md)
- [Codex working instructions](docs/CODEX.md)
- [Next.js agent rules](docs/NEXTJS-AGENT-RULES.md)

## Available Scripts

- `pnpm run dev`: Start all applications in development mode
- `pnpm run build`: Build all applications
- `pnpm run dev:web`: Start only the web application
- `pnpm run check-types`: Check TypeScript types across all apps
- `pnpm run db:push`: Push schema changes to database
- `pnpm run db:generate`: Generate database client/types
- `pnpm run db:migrate`: Run database migrations
- `pnpm run db:studio`: Open database studio UI
