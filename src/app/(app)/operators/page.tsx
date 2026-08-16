import { Mail, ShieldCheck, UserRound } from "lucide-react";

import { PageHeader } from "@/components/app-shell/page-header";
import { demands, initials, operators } from "@/lib/mock-data";

export default function OperatorsPage() {
  const unassignedCount = demands.filter((demand) => demand.assignedTo === null).length;

  return (
    <>
      <PageHeader
        eyebrow="Team"
        title="Operators"
        description="Who is working the queue, and how much of it currently sits with each person."
      />

      <div className="distribution-grid" style={{ gridTemplateColumns: "repeat(3, minmax(0, 1fr))" }}>
        {operators.map((operator) => {
          const active = demands.filter(
            (demand) => demand.assignedTo === operator.name && demand.status !== "Completed",
          ).length;
          const completed = demands.filter(
            (demand) => demand.assignedTo === operator.name && demand.status === "Completed",
          ).length;

          return (
            <article className="panel" key={operator.email}>
              <div className="panel-title">
                <span className="profile-avatar">{initials(operator.name)}</span>
                <div>
                  <h3>{operator.name}</h3>
                  <p style={{ margin: "2px 0 0", color: "var(--graphite)", fontSize: 11 }}>{operator.role}</p>
                </div>
              </div>
              <div className="compact-panel" style={{ marginTop: 14 }}>
                <dl>
                  <div>
                    <dt>Active demands</dt>
                    <dd>{active}</dd>
                  </div>
                  <div>
                    <dt>Completed</dt>
                    <dd>{completed}</dd>
                  </div>
                </dl>
              </div>
              <div className="panel-note" style={{ marginTop: 12 }}>
                <Mail size={14} /> {operator.email}
              </div>
            </article>
          );
        })}

        <article className="panel operator-panel">
          <div className="panel-title">
            <UserRound size={17} />
            <h3>Unassigned</h3>
          </div>
          <div className="operator-row">
            <span className="profile-avatar small">—</span>
            <div>
              <strong>Needs triage</strong>
              <small>No operator assigned yet</small>
            </div>
            <span className="operator-count">{unassignedCount}</span>
          </div>
          <div className="panel-note">
            <ShieldCheck size={15} /> Assignment workflow is tracked as a Roadmap pillar — see docs/ROADMAP.md.
          </div>
        </article>
      </div>
    </>
  );
}
