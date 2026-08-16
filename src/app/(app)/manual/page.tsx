import { BookOpenCheck, Columns3, History, TrendingUp, UsersRound } from "lucide-react";

import { PageHeader } from "@/components/app-shell/page-header";

const manualSections = [
  {
    title: "Demands",
    icon: Columns3,
    items: [
      "A demand is any tracked request: a bug, an improvement, or a suggestion.",
      "Every demand has a category, a priority, an area, and a status.",
      "Status moves Open → In progress → Completed. See Board for the live view.",
    ],
  },
  {
    title: "Priority & category",
    icon: TrendingUp,
    items: [
      "Priority (Critical/High/Medium/Low) drives the suggested SLA — see Support.",
      "Category (Critical bug/Minor bug/Improvement/Suggestion) drives reporting and triage.",
      "Score combines priority, category, and time in queue into a single ranking number.",
    ],
  },
  {
    title: "Journey & history",
    icon: History,
    items: [
      "Journey shows every status change across the whole queue as a timeline.",
      "History is the list of demands that already reached Completed.",
      "Use Journey to understand pace; use History to audit what shipped.",
    ],
  },
  {
    title: "Operators",
    icon: UsersRound,
    items: [
      "Operators are the people working the queue.",
      "A demand can be Unassigned or held by exactly one operator at a time.",
      "Multi-operator roles and permissions are tracked as a Roadmap pillar.",
    ],
  },
];

export default function ManualPage() {
  return (
    <>
      <PageHeader
        eyebrow="Reference"
        title="Manual"
        description="How Tabularium's own concepts fit together — for anyone new to the workspace."
      />

      <div className="distribution-grid" style={{ gridTemplateColumns: "repeat(2, minmax(0, 1fr))" }}>
        {manualSections.map((section) => (
          <article className="panel" key={section.title}>
            <div className="panel-title">
              <section.icon size={17} />
              <h3>{section.title}</h3>
            </div>
            <ul style={{ margin: "12px 0 0", paddingLeft: 18, color: "var(--graphite)", fontSize: 12, lineHeight: 1.8 }}>
              {section.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <p style={{ marginTop: 14, color: "var(--graphite)", fontSize: 11 }}>
        <BookOpenCheck size={12} style={{ display: "inline", marginRight: 4 }} />
        Product terminology is defined in full in docs/BRANDING.md and docs/DATA_MODEL.md.
      </p>
    </>
  );
}
