"use client";

import { useState } from "react";

import { Header } from "@/components/app-shell/header";
import { Sidebar } from "@/components/app-shell/sidebar";

export function AppShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="tabularium-shell">
      {sidebarOpen ? (
        <button
          className="sidebar-scrim"
          aria-label="Close navigation"
          onClick={() => setSidebarOpen(false)}
        />
      ) : null}

      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="app-main">
        <Header onOpenSidebar={() => setSidebarOpen(true)} />
        <main className="dashboard-content">{children}</main>
      </div>
    </div>
  );
}
