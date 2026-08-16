import { Bell, KeyRound, PlugZap, Webhook } from "lucide-react";

import { PageHeader } from "@/components/app-shell/page-header";

const integrations = [
  {
    name: "Notifications",
    description: "Email and in-app alerts for assignment, status change, and SLA risk.",
    status: "planned",
    icon: Bell,
  },
  {
    name: "Webhooks",
    description: "Outbound events for demand created, updated, and completed.",
    status: "planned",
    icon: Webhook,
  },
  {
    name: "SSO / RBAC",
    description: "Single sign-on and role-based access once multi-operator work lands.",
    status: "planned",
    icon: KeyRound,
  },
  {
    name: "Public API",
    description: "Read/write access to demands for external tools and scripts.",
    status: "planned",
    icon: PlugZap,
  },
];

export default function IntegrationsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Ecosystem"
        title="Integrations"
        description="What's planned to connect Tabularium to the rest of the operation. Nothing here is wired up yet — see docs/ROADMAP.md."
      />

      <div className="distribution-grid" style={{ gridTemplateColumns: "repeat(4, minmax(0, 1fr))" }}>
        {integrations.map((integration) => (
          <article className="panel" key={integration.name}>
            <span
              style={{
                display: "grid",
                width: 44,
                height: 44,
                placeItems: "center",
                borderRadius: 8,
                background: "rgb(184 119 61 / 12%)",
                color: "var(--amber)",
              }}
            >
              <integration.icon size={20} />
            </span>
            <h3 style={{ margin: "14px 0 0", fontFamily: "var(--font-playfair), Georgia, serif", fontSize: 16 }}>
              {integration.name}
            </h3>
            <p style={{ margin: "8px 0 14px", minHeight: 56, color: "var(--graphite)", fontSize: 11, lineHeight: 1.6 }}>
              {integration.description}
            </p>
            <span className="status-pill">{integration.status}</span>
          </article>
        ))}
      </div>
    </>
  );
}
