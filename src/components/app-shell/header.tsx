"use client";

import { Bell, CheckCircle2, Menu, RefreshCw } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@tabularium/ui/components/dropdown-menu";

import { ModeToggle } from "@/components/mode-toggle";

const notifications = [
  {
    title: "Demanda #1042 escalada",
    detail: "Prioridade alterada para Crítica pelo operador Ana Souza.",
    time: "há 12 min",
  },
  {
    title: "Nova demanda registrada",
    detail: "\"Falha de sincronização no módulo de notas\" aguardando triagem.",
    time: "há 47 min",
  },
  {
    title: "Etapa da jornada concluída",
    detail: "Demanda #1029 avançou para Validação.",
    time: "há 2 h",
  },
] as const;

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
        <DropdownMenu>
          <DropdownMenuTrigger
            render={<button className="icon-button notification-button" aria-label="Notifications" />}
          >
            <Bell size={18} />
            <span>{notifications.length}</span>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="bottom" align="end" className="w-[320px]">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {notifications.map((item) => (
              <DropdownMenuItem key={item.title} className="flex-col items-start gap-1 whitespace-normal">
                <div className="flex w-full items-center justify-between gap-2">
                  <strong className="text-foreground">{item.title}</strong>
                  <span className="shrink-0 text-[10px] text-muted-foreground">{item.time}</span>
                </div>
                <span className="text-muted-foreground">{item.detail}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <ModeToggle />
      </div>
    </header>
  );
}
