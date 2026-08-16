"use client";

import { Bell, CheckCircle2, Menu, RefreshCw } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { ModeToggle } from "@/components/mode-toggle";

const PAGE_META: Record<string, { eyebrow: string; title: string }> = {
  "/dashboard": { eyebrow: "Operational intelligence", title: "Demand overview" },
  "/demands": { eyebrow: "Active queue", title: "Active demands" },
  "/board": { eyebrow: "Workflow", title: "Board" },
  "/journey": { eyebrow: "Lifecycle", title: "Journey" },
  "/history": { eyebrow: "Closed queue", title: "History" },
  "/operators": { eyebrow: "Team", title: "Operators" },
  "/notes": { eyebrow: "Quick capture", title: "Notes" },
  "/roadmap": { eyebrow: "Planning", title: "Roadmap" },
  "/reports": { eyebrow: "Performance", title: "Reports" },
  "/support": { eyebrow: "SLA reference", title: "Support" },
  "/integrations": { eyebrow: "Ecosystem", title: "Integrations" },
  "/manual": { eyebrow: "Reference", title: "Manual" },
  "/profile": { eyebrow: "Account", title: "Profile" },
  "/settings": { eyebrow: "Preferences", title: "Settings" },
};

export function Header({ onOpenSidebar }: { onOpenSidebar: () => void }) {
  const pathname = usePathname();
  const [refreshing, setRefreshing] = useState(false);
  const meta = PAGE_META[pathname] ?? { eyebrow: "Tabularium", title: "Workspace" };

  const handleRefresh = () => {
    setRefreshing(true);
    window.setTimeout(() => setRefreshing(false), 900);
  };

  return (
    <header className="topbar">
      <div className="topbar-title">
        <button className="mobile-menu" aria-label="Open navigation" onClick={onOpenSidebar}>
          <Menu size={20} />
        </button>
        <div>
          <p className="eyebrow">{meta.eyebrow}</p>
          <h1>{meta.title}</h1>
        </div>
      </div>

      <div className="topbar-actions">
        <span className="sync-status">
          <CheckCircle2 size={15} /> Synced moments ago
        </span>
        <button className="refresh-button" onClick={handleRefresh} disabled={refreshing}>
          <RefreshCw size={17} className={refreshing ? "spin" : ""} />
          <span>{refreshing ? "Refreshing" : "Refresh"}</span>
        </button>
        <button className="icon-button notification-button" aria-label="Notifications">
          <Bell size={18} />
          <span>3</span>
        </button>
        <ModeToggle />
      </div>
    </header>
  );
}
