import { Mail, Palette, ShieldCheck, User } from "lucide-react";

import { PageHeader } from "@/components/app-shell/page-header";

export default function ProfilePage() {
  return (
    <>
      <PageHeader
        eyebrow="Account"
        title="Profile"
        description="Your own information. Team-wide roster management lives on Operators."
      />

      <div className="distribution-grid" style={{ gridTemplateColumns: "0.6fr 1.4fr" }}>
        <article className="panel" style={{ textAlign: "center" }}>
          <span
            className="profile-avatar"
            style={{ margin: "0 auto", width: 64, height: 64, fontSize: 18 }}
          >
            OP
          </span>
          <h3 style={{ marginTop: 14, fontFamily: "var(--font-playfair), Georgia, serif" }}>Operator</h3>
          <p style={{ margin: "4px 0 0", color: "var(--graphite)", fontSize: 11 }}>System account</p>
        </article>

        <div className="distribution-grid" style={{ gridTemplateColumns: "1fr" }}>
          <div className="settings-row">
            <div className="settings-row-label">
              <p>Name</p>
              <p>Not set — connect authentication to populate this</p>
            </div>
            <User size={18} color="var(--graphite)" />
          </div>
          <div className="settings-row">
            <div className="settings-row-label">
              <p>Email</p>
              <p>Not set — connect authentication to populate this</p>
            </div>
            <Mail size={18} color="var(--graphite)" />
          </div>
          <div className="settings-row">
            <div className="settings-row-label">
              <p>Role</p>
              <p>Assigned once multi-operator roles ship</p>
            </div>
            <ShieldCheck size={18} color="var(--graphite)" />
          </div>
          <div className="settings-row">
            <div className="settings-row-label">
              <p>Appearance</p>
              <p>Light, Dark, or System — use the toggle in the header</p>
            </div>
            <Palette size={18} color="var(--graphite)" />
          </div>
        </div>
      </div>
    </>
  );
}
