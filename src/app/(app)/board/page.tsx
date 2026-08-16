import { CheckCircle2, CircleDot, Clock3 } from "lucide-react";

import { PageHeader } from "@/components/app-shell/page-header";
import { demands, type DemandStatus } from "@/lib/mock-data";

const columns: Array<{ status: DemandStatus; icon: typeof Clock3; description: string }> = [
  { status: "Open", icon: CircleDot, description: "Awaiting assignment or triage" },
  { status: "In progress", icon: Clock3, description: "Actively being worked" },
  { status: "Completed", icon: CheckCircle2, description: "Delivered and closed" },
];

export default function BoardPage() {
  return (
    <>
      <PageHeader
        eyebrow="Workflow"
        title="Board"
        description="Every demand, grouped by where it stands right now. Drag-and-drop and per-card actions are backend-dependent work, tracked in docs/SCREENS.md."
      />

      <div className="kanban-columns">
        {columns.map((column) => {
          const items = demands.filter((demand) => demand.status === column.status);

          return (
            <div className="kanban-column" key={column.status}>
              <div className="kanban-column-head">
                <div className="panel-title">
                  <column.icon size={16} />
                  <h3>{column.status}</h3>
                </div>
                <span className="kanban-count">{items.length}</span>
              </div>
              {items.map((demand) => (
                <div className="kanban-card" key={demand.id}>
                  <strong>{demand.id}</strong>
                  <p>{demand.title}</p>
                  <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
                    <span className={`tag priority-${demand.priority.toLowerCase()}`}>{demand.priority}</span>
                    <span className="tag category-tag">{demand.category}</span>
                  </div>
                </div>
              ))}
              {items.length === 0 ? (
                <p className="empty-state">No demands in this column.</p>
              ) : null}
            </div>
          );
        })}
      </div>
    </>
  );
}
