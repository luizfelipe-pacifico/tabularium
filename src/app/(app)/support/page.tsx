import { Clock3, LifeBuoy, ShieldAlert, TimerReset } from "lucide-react";

import { PageHeader } from "@/components/app-shell/page-header";
import { demands } from "@/lib/mock-data";

const slaByPriority = [
  { priority: "Critical", sla: "15–30 min", rule: "Blocking issue with no workaround. Page whoever owns the area." },
  { priority: "High", sla: "2h – 1 day", rule: "Meaningful impact with a workaround. Prioritize over Medium/Low work." },
  { priority: "Medium", sla: "1 – 3 days", rule: "Real but non-blocking. Schedule into the current cycle." },
  { priority: "Low", sla: "Best effort", rule: "Nice to have. Pull in when nothing higher-priority is waiting." },
] as const;

export default function SupportPage() {
  const openCritical = demands.filter((demand) => demand.priority === "Critical" && demand.status !== "Completed");

  return (
    <>
      <PageHeader
        eyebrow="SLA reference"
        title="Support"
        description="Expected response time by priority, and what's currently at risk of breaching it."
      />

      <div className="distribution-grid" style={{ gridTemplateColumns: "repeat(4, minmax(0, 1fr))" }}>
        {slaByPriority.map((tier) => (
          <article className="panel" key={tier.priority}>
            <div className="panel-title">
              <span className={`tag priority-${tier.priority.toLowerCase()}`}>{tier.priority}</span>
            </div>
            <p style={{ margin: "12px 0 0", fontFamily: "var(--font-playfair), Georgia, serif", fontSize: 20 }}>
              {tier.sla}
            </p>
            <p style={{ margin: "8px 0 0", color: "var(--graphite)", fontSize: 11, lineHeight: 1.6 }}>{tier.rule}</p>
          </article>
        ))}
      </div>

      <article className="panel" style={{ marginTop: 14 }}>
        <div className="panel-title">
          <ShieldAlert size={17} />
          <h3>Critical queue</h3>
        </div>
        <div className="demand-list" style={{ margin: "14px -18px -18px" }}>
          {openCritical.map((demand) => (
            <div className="demand-row" key={demand.id} style={{ cursor: "default" }}>
              <strong>{demand.id}</strong>
              <span className="tag priority-critical">{demand.priority}</span>
              <span className="demand-area">{demand.title}</span>
              <span className="status-tag">
                <Clock3 size={12} style={{ display: "inline", marginRight: 4 }} />
                {demand.status}
              </span>
            </div>
          ))}
          {openCritical.length === 0 ? (
            <p className="empty-state">
              <LifeBuoy size={14} style={{ display: "inline", marginRight: 6 }} />
              No open critical demands right now.
            </p>
          ) : null}
        </div>
      </article>
      <p style={{ marginTop: 10, color: "var(--graphite)", fontSize: 11 }}>
        <TimerReset size={12} style={{ display: "inline", marginRight: 4 }} />
        SLA timers and breach alerts are backend-dependent work — see docs/SCREENS.md.
      </p>
    </>
  );
}
