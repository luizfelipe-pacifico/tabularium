import {
  BarChart3,
  Bell,
  CheckCircle2,
  Circle,
  GitBranch,
  History,
  ShieldCheck,
  Users,
  type LucideIcon,
} from "lucide-react";

import { PageHeader } from "@/components/app-shell/page-header";

const mvpChecklist = [
  { label: "Schema and migration", done: false },
  { label: "Data access layer", done: false },
  { label: "Authentication (minimal but real)", done: false },
  { label: "Demand CRUD wired to the UI", done: false },
  { label: "Live metrics", done: false },
  { label: "Scoring v0", done: false },
  { label: "Brand tokens applied", done: true },
  { label: "Security baseline enforced", done: false },
];

const pillars: Array<{ title: string; icon: LucideIcon; description: string }> = [
  { title: "Journey & history", icon: History, description: "Per-demand timeline, filters by date and operator." },
  { title: "Multi-operator collaboration", icon: Users, description: "Invitations, roles, and a real assignment workflow." },
  { title: "Scoring engine v2", icon: GitBranch, description: "Configurable weights and score history over time." },
  { title: "Search, filters & saved views", icon: BarChart3, description: "Indexed search and saved filter presets." },
  { title: "Notifications & alerts", icon: Bell, description: "Real events behind the notification bell already in the UI." },
  { title: "Reporting & analytics", icon: BarChart3, description: "Trends over time beyond the current snapshot cards." },
  { title: "Hardening & operations", icon: ShieldCheck, description: "CI, observability, backups, and enforced CSP." },
];

export default function RoadmapPage() {
  const doneCount = mvpChecklist.filter((item) => item.done).length;

  return (
    <>
      <PageHeader
        eyebrow="Planning"
        title="Roadmap"
        description="A live view of docs/ROADMAP.md — the MVP checklist and what comes after it."
      />

      <article className="panel">
        <div className="panel-heading-row">
          <div className="panel-title">
            <CheckCircle2 size={17} />
            <h3>MVP checklist</h3>
          </div>
          <span className="status-pill">
            {doneCount} / {mvpChecklist.length} done
          </span>
        </div>
        <div className="stage-board" style={{ marginTop: 14 }}>
          {mvpChecklist.map((item) => (
            <div className="stage-card" key={item.label}>
              {item.done ? <CheckCircle2 size={16} color="var(--amber)" /> : <Circle size={16} color="var(--graphite)" />}
              <h3 style={{ fontSize: 13 }}>{item.label}</h3>
            </div>
          ))}
        </div>
      </article>

      <section className="distribution-grid" style={{ gridTemplateColumns: "repeat(3, minmax(0, 1fr))", marginTop: 14 }}>
        {pillars.map((pillar) => (
          <article className="panel" key={pillar.title}>
            <div className="panel-title">
              <pillar.icon size={17} />
              <h3>{pillar.title}</h3>
            </div>
            <p style={{ margin: "10px 0 0", color: "var(--graphite)", fontSize: 12, lineHeight: 1.6 }}>
              {pillar.description}
            </p>
          </article>
        ))}
      </section>
    </>
  );
}
