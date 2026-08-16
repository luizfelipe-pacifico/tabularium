"use client";

import {
  BarChart3,
  BookOpenCheck,
  ChevronUp,
  Columns3,
  FileClock,
  LayoutDashboard,
  LifeBuoy,
  ListChecks,
  Milestone,
  PlugZap,
  Settings,
  StickyNote,
  TrendingUp,
  User,
  UsersRound,
  X,
} from "lucide-react";
import Image from "next/image";
import type { Route } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@tabularium/ui/components/dropdown-menu";

const primaryNav = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/demands", label: "Active demands", icon: ListChecks },
  { href: "/board", label: "Board", icon: Columns3 },
  { href: "/journey", label: "Journey", icon: TrendingUp },
  { href: "/history", label: "History", icon: FileClock },
  { href: "/operators", label: "Operators", icon: UsersRound },
  { href: "/notes", label: "Notes", icon: StickyNote },
] as const;

const systemMenu = [
  { href: "/roadmap", label: "Roadmap", icon: Milestone },
  { href: "/reports", label: "Reports", icon: BarChart3 },
  { href: "/support", label: "Support", icon: LifeBuoy },
  { href: "/integrations", label: "Integrations", icon: PlugZap },
  { href: "/manual", label: "Manual", icon: BookOpenCheck },
  { href: "/profile", label: "Profile", icon: User },
  { href: "/settings", label: "Settings", icon: Settings },
] as const;

export function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const pathname = usePathname();

  return (
    <aside className={`app-sidebar ${open ? "is-open" : ""}`}>
      <div className="brand-lockup">
        <Image src="/brand/icon-tabularium.png" width={46} height={46} alt="Tabularium symbol" priority />
        <div>
          <p className="brand-name">Tabularium</p>
          <p className="brand-kicker">Demand registry</p>
        </div>
        <button className="sidebar-close" aria-label="Close navigation" onClick={onClose}>
          <X size={18} />
        </button>
      </div>

      <div className="sidebar-section-label">Workspace</div>
      <nav className="sidebar-nav" aria-label="Primary navigation">
        {primaryNav.map((item) => {
          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href as Route}
              className={active ? "active" : ""}
              onClick={onClose}
            >
              <item.icon size={18} strokeWidth={1.8} />
              <span>{item.label}</span>
              {active ? <span className="active-dot" /> : null}
            </Link>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <DropdownMenu>
          <DropdownMenuTrigger render={<button />}>
            <span className="profile-avatar">OP</span>
            <span className="profile-copy">
              <strong>Operador</strong>
              <small>Conta do sistema</small>
            </span>
            <ChevronUp size={16} />
          </DropdownMenuTrigger>
          <DropdownMenuContent side="top" align="start" className="w-[240px]">
            <DropdownMenuLabel>System menu</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {systemMenu.map((item) => (
              <DropdownMenuItem
                key={item.href}
                render={<Link href={item.href as Route} onClick={onClose} />}
              >
                <item.icon className="mr-2 h-4 w-4" /> {item.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </aside>
  );
}
