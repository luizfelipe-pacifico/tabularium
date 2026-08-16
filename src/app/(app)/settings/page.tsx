import { Bell, Database, PanelLeft, Palette } from "lucide-react";

import { PageHeader } from "@/components/app-shell/page-header";
import { ModeToggle } from "@/components/mode-toggle";

export default function SettingsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Preferences"
        title="Settings"
        description="Appearance and workspace preferences. Persisting these per operator is backend-dependent work — see docs/SCREENS.md."
      />

      <div className="distribution-grid" style={{ gridTemplateColumns: "1fr" }}>
        <div className="settings-row">
          <div className="settings-row-label">
            <p>Appearance</p>
            <p>Light, dark, or match the system</p>
          </div>
          <ModeToggle />
        </div>

        <div className="settings-row">
          <div className="settings-row-label">
            <p>Sidebar</p>
            <p>Collapse preference isn't persisted yet</p>
          </div>
          <PanelLeft size={18} color="var(--graphite)" />
        </div>

        <div className="settings-row">
          <div className="settings-row-label">
            <p>Notifications</p>
            <p>Delivery channel preferences ship with the Notifications pillar</p>
          </div>
          <Bell size={18} color="var(--graphite)" />
        </div>

        <div className="settings-row">
          <div className="settings-row-label">
            <p>Database connection</p>
            <p>PostgreSQL (Neon) — configured via the root .env</p>
          </div>
          <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <Database size={16} color="var(--amber)" />
            <span className="status-pill">configured</span>
          </span>
        </div>
      </div>

      <p style={{ marginTop: 14, color: "var(--graphite)", fontSize: 11 }}>
        <Palette size={12} style={{ display: "inline", marginRight: 4 }} />
        Palette tokens live in docs/BRANDING.md and packages/ui/src/styles/globals.css.
      </p>
    </>
  );
}
