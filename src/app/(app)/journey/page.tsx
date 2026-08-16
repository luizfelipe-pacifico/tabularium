import { CheckCircle2, CircleDot, Clock3 } from "lucide-react";

import { PageHeader } from "@/components/app-shell/page-header";
import { demands, statusChanges, type DemandStatus } from "@/lib/mock-data";

const stages: Array<{ status: DemandStatus; icon: typeof Clock3; description: string }> = [
  { status: "Open", icon: CircleDot, description: "Registered, waiting to start" },
  { status: "In progress", icon: Clock3, description: "In active execution" },
  { status: "Completed", icon: CheckCircle2, description: "Reached its conclusion" },
];

function formatWhen(iso: string) {
  return new Date(iso).toLocaleString("en-US", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function JourneyPage() {
  const sortedChanges = [...statusChanges].sort((a, b) => (a.at < b.at ? 1 : -1));

  return (
    <>
      <PageHeader
        eyebrow="Lifecycle"
        title="Journey"
        description="How demands move through the system, and a feed of every status change so far."
      />

      <div className="stage-board">
        {stages.map((stage, index) => {
          const count = demands.filter((demand) => demand.status === stage.status).length;

          return (
            <div className="stage-card" key={stage.status}>
              <p className="stage-card-index">Stage {index + 1}</p>
              <h3>{stage.status}</h3>
              <p>{stage.description}</p>
              <strong>{count}</strong>
            </div>
          );
        })}
      </div>

      <article className="panel" style={{ marginTop: 14 }}>
        <div className="panel-title">
          <Clock3 size={17} />
          <h3>Recent activity</h3>
        </div>
        <div className="timeline" style={{ marginTop: 14 }}>
          {sortedChanges.map((change, index) => (
            <div className="timeline-item" key={`${change.demandId}-${index}`}>
              <time>{formatWhen(change.at)}</time>
              <p>
                <strong>{change.demandId}</strong> moved from{" "}
                <span className="tag">{change.from}</span> to <span className="tag">{change.to}</span> by{" "}
                {change.by}
                {change.note ? ` — ${change.note}` : ""}
              </p>
            </div>
          ))}
        </div>
      </article>
    </>
  );
}
