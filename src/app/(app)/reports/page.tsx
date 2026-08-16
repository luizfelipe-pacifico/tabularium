"use client";

import { CalendarRange, CheckCircle2, TrendingUp, Users } from "lucide-react";
import { useMemo, useState } from "react";

import { PageHeader } from "@/components/app-shell/page-header";
import { demands, operators } from "@/lib/mock-data";

const presets = [
  { id: "last7", label: "Last 7 days" },
  { id: "last14", label: "Last 14 days" },
  { id: "month", label: "This month" },
] as const;

export default function ReportsPage() {
  const [preset, setPreset] = useState<(typeof presets)[number]["id"]>("last7");
  const [operator, setOperator] = useState("");

  const scoped = useMemo(
    () => (operator ? demands.filter((demand) => demand.assignedTo === operator) : demands),
    [operator],
  );

  const completed = scoped.filter((demand) => demand.status === "Completed");
  const avgScore = scoped.length
    ? Math.round(scoped.reduce((total, demand) => total + demand.score, 0) / scoped.length)
    : 0;
  const topOperator = operators
    .map((op) => ({
      name: op.name,
      completed: demands.filter((demand) => demand.assignedTo === op.name && demand.status === "Completed").length,
    }))
    .sort((a, b) => b.completed - a.completed)[0];

  return (
    <>
      <PageHeader
        eyebrow="Performance"
        title="Reports"
        description="Summary stats for a date range and operator. Export (PDF/PPTX) is backend-dependent work — see docs/SCREENS.md."
      />

      <div className="filters-row">
        {presets.map((item) => (
          <button
            key={item.id}
            className="text-button"
            style={{
              border: "1px solid var(--line)",
              borderRadius: 6,
              padding: "8px 12px",
              background: preset === item.id ? "rgb(184 119 61 / 12%)" : "var(--surface)",
              color: preset === item.id ? "var(--amber)" : "var(--graphite)",
            }}
            onClick={() => setPreset(item.id)}
          >
            <CalendarRange size={14} /> {item.label}
          </button>
        ))}
        <select className="field-select" value={operator} onChange={(event) => setOperator(event.target.value)}>
          <option value="">All operators</option>
          {operators.map((op) => (
            <option key={op.email} value={op.name}>
              {op.name}
            </option>
          ))}
        </select>
      </div>

      <section className="metrics-grid" aria-label="Report metrics">
        <article className="metric-card tone-amber">
          <div className="metric-heading">
            <span>In scope</span>
            <TrendingUp size={18} />
          </div>
          <strong>{scoped.length}</strong>
          <p>Demands matching the current filter</p>
        </article>
        <article className="metric-card tone-ebony">
          <div className="metric-heading">
            <span>Completed</span>
            <CheckCircle2 size={18} />
          </div>
          <strong>{completed.length}</strong>
          <p>Closed within scope</p>
        </article>
        <article className="metric-card tone-walnut">
          <div className="metric-heading">
            <span>Average score</span>
            <TrendingUp size={18} />
          </div>
          <strong>{avgScore}</strong>
          <p>Mean priority score</p>
        </article>
        <article className="metric-card tone-graphite">
          <div className="metric-heading">
            <span>Top closer</span>
            <Users size={18} />
          </div>
          <strong style={{ fontSize: 20 }}>{topOperator?.name ?? "—"}</strong>
          <p>{topOperator ? `${topOperator.completed} completed` : "No data yet"}</p>
        </article>
      </section>
    </>
  );
}
