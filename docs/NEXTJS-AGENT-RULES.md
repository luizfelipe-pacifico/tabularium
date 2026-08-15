# Next.js Agent Rules

This project uses Next.js 16, whose APIs and conventions may differ from an agent's training data. Before changing Next.js code, inspect the relevant local documentation under `apps/web/node_modules/next/dist/docs/` and follow current deprecation notices.

Next.js may generate `apps/web/AGENTS.md` while the development server runs. That file is generated guidance, not canonical project documentation. Keep this document as the durable rule and remove generated copies from change sets when they contain no additional project-specific information.
