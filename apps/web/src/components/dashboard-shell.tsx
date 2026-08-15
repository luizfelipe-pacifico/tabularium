"use client";

import {
  Archive,
  Bell,
  BookOpenText,
  CheckCircle2,
  ChevronDown,
  CircleGauge,
  Clock3,
  FileClock,
  Filter,
  LayoutDashboard,
  ListChecks,
  Menu,
  RefreshCw,
  Search,
  Settings,
  SlidersHorizontal,
  Sparkles,
  TrendingUp,
  UserRound,
  UsersRound,
  X,
} from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";

const navigation = [
  { label: "Overview", icon: LayoutDashboard },
  { label: "Active demands", icon: ListChecks },
  { label: "Journey", icon: TrendingUp },
  { label: "History", icon: FileClock },
  { label: "Operators", icon: UsersRound },
];

const demands = [
  { id: "TB-0010", category: "Suggestion", priority: "Critical", area: "Access structure", status: "Open" },
  { id: "TB-0009", category: "Suggestion", priority: "Critical", area: "Workspace settings", status: "Open" },
  { id: "TB-0008", category: "Improvement", priority: "High", area: "Client records", status: "Open" },
  { id: "TB-0007", category: "Improvement", priority: "Medium", area: "Client records", status: "In progress" },
];

const metricCards = [
  { label: "Active total", value: "10", note: "Open and in progress", tone: "amber", icon: CircleGauge },
  { label: "Open", value: "10", note: "Awaiting assignment", tone: "ebony", icon: Clock3 },
  { label: "In progress", value: "0", note: "In execution", tone: "walnut", icon: TrendingUp },
  { label: "Completed", value: "0", note: "Historical total", tone: "graphite", icon: CheckCircle2 },
];

export function DashboardShell() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeNav, setActiveNav] = useState("Overview");
  const [query, setQuery] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  const filteredDemands = useMemo(
    () => demands.filter((demand) => `${demand.id} ${demand.category} ${demand.area}`.toLowerCase().includes(query.toLowerCase())),
    [query],
  );

  const handleRefresh = () => {
    setRefreshing(true);
    window.setTimeout(() => setRefreshing(false), 900);
  };

  return (
    <div className="tabularium-shell">
      {sidebarOpen ? (
        <button className="sidebar-scrim" aria-label="Close navigation" onClick={() => setSidebarOpen(false)} />
      ) : null}

      <aside className={`app-sidebar ${sidebarOpen ? "is-open" : ""}`}>
        <div className="brand-lockup">
          <Image src="/favicon.ico" width={46} height={46} alt="Tabularium symbol" priority />
          <div>
            <p className="brand-name">Tabularium</p>
            <p className="brand-kicker">Demand registry</p>
          </div>
          <button className="sidebar-close" aria-label="Close navigation" onClick={() => setSidebarOpen(false)}>
            <X size={18} />
          </button>
        </div>

        <div className="sidebar-section-label">Workspace</div>
        <nav className="sidebar-nav" aria-label="Primary navigation">
          {navigation.map((item) => (
            <button
              key={item.label}
              className={activeNav === item.label ? "active" : ""}
              onClick={() => {
                setActiveNav(item.label);
                setSidebarOpen(false);
              }}
            >
              <item.icon size={18} strokeWidth={1.8} />
              <span>{item.label}</span>
              {activeNav === item.label ? <span className="active-dot" /> : null}
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button>
            <span className="profile-avatar">LF</span>
            <span className="profile-copy">
              <strong>Luiz Felipe</strong>
              <small>Administrator</small>
            </span>
            <ChevronDown size={16} />
          </button>
        </div>
      </aside>

      <div className="app-main">
        <header className="topbar">
          <div className="topbar-title">
            <button className="mobile-menu" aria-label="Open navigation" onClick={() => setSidebarOpen(true)}>
              <Menu size={20} />
            </button>
            <div>
              <p className="eyebrow">Operational intelligence</p>
              <h1>Demand overview</h1>
            </div>
          </div>

          <div className="topbar-actions">
            <span className="sync-status"><CheckCircle2 size={15} /> Synced moments ago</span>
            <button className="icon-button" aria-label="Filters"><SlidersHorizontal size={18} /></button>
            <button className="refresh-button" onClick={handleRefresh} disabled={refreshing}>
              <RefreshCw size={17} className={refreshing ? "spin" : ""} />
              <span>{refreshing ? "Refreshing" : "Refresh"}</span>
            </button>
            <button className="icon-button notification-button" aria-label="Notifications">
              <Bell size={18} />
              <span>3</span>
            </button>
          </div>
        </header>

        <main className="dashboard-content">
          <section className="dashboard-intro">
            <div>
              <p className="section-overline">System record · 15 August 2026</p>
              <h2>Good afternoon, Luiz.</h2>
              <p>Monitor priorities, assignments, and the rhythm of your operation.</p>
            </div>
            <div className="search-box">
              <Search size={17} />
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search demands" />
              <span>⌘ K</span>
            </div>
          </section>

          <section className="metrics-grid" aria-label="Demand metrics">
            {metricCards.map((metric) => (
              <article className={`metric-card tone-${metric.tone}`} key={metric.label}>
                <div className="metric-heading">
                  <span>{metric.label}</span>
                  <metric.icon size={18} />
                </div>
                <strong>{metric.value}</strong>
                <p>{metric.note}</p>
              </article>
            ))}
          </section>

          <section className="distribution-grid">
            <DistributionCard
              title="Priority"
              icon={TrendingUp}
              rows={[
                ["Critical", 2, 40, "critical"],
                ["High", 3, 60, "high"],
                ["Medium", 5, 100, "medium"],
                ["Low", 0, 4, "low"],
              ]}
            />
            <DistributionCard
              title="Category"
              icon={Archive}
              rows={[
                ["Critical bug", 2, 40, "critical"],
                ["Minor bug", 1, 20, "high"],
                ["Improvement", 2, 40, "walnut"],
                ["Suggestion", 5, 100, "amber"],
              ]}
            />
            <article className="panel operator-panel">
              <PanelTitle icon={UsersRound} title="By operator" />
              <div className="operator-row">
                <span className="profile-avatar small">—</span>
                <div><strong>Unassigned</strong><small>Needs triage</small></div>
                <span className="operator-count">10</span>
              </div>
              <div className="panel-note"><Sparkles size={15} /> All active demands still need an owner.</div>
            </article>
          </section>

          <section className="activity-grid">
            <article className="panel demand-list-panel">
              <div className="panel-heading-row">
                <PanelTitle icon={ListChecks} title="Latest demands" />
                <button className="text-button"><Filter size={15} /> Filter</button>
              </div>
              <div className="demand-list">
                {filteredDemands.map((demand) => (
                  <button className="demand-row" key={demand.id}>
                    <strong>{demand.id}</strong>
                    <span className={`tag category-${demand.category.toLowerCase()}`}>{demand.category}</span>
                    <span className={`tag priority-${demand.priority.toLowerCase()}`}>{demand.priority}</span>
                    <span className="demand-area">{demand.area}</span>
                    <span className="status-tag">{demand.status}</span>
                  </button>
                ))}
                {filteredDemands.length === 0 ? <p className="empty-state">No demands match this search.</p> : null}
              </div>
            </article>

            <article className="panel priority-panel">
              <PanelTitle icon={TrendingUp} title="Highest priority" />
              <div className="priority-card">
                <div className="priority-card-top"><span>TB-0001</span><strong>212 pts</strong></div>
                <h3>Access to the system is unavailable</h3>
                <p>Authentication · Unassigned</p>
                <div><span className="tag priority-critical">Critical</span><span className="tag priority-high">High</span></div>
              </div>
              <div className="priority-card secondary">
                <div className="priority-card-top"><span>TB-0002</span><strong>174 pts</strong></div>
                <h3>Record validation needs review</h3>
                <p>Client records · Unassigned</p>
              </div>
            </article>

            <aside className="right-stack">
              <article className="panel compact-panel">
                <PanelTitle icon={CircleGauge} title="Operation status" />
                <dl><div><dt>Connection</dt><dd>Stable</dd></div><div><dt>Last reading</dt><dd>Today, 14:48</dd></div><div><dt>Source</dt><dd>PostgreSQL</dd></div></dl>
              </article>
              <article className="panel compact-panel insight-panel">
                <PanelTitle icon={BookOpenText} title="Insight" />
                <p>Suggestions represent half of the active queue. Review them before the next planning cycle.</p>
              </article>
            </aside>
          </section>
        </main>
      </div>
    </div>
  );
}

function PanelTitle({ icon: Icon, title }: { icon: typeof Settings; title: string }) {
  return <div className="panel-title"><Icon size={17} /><h3>{title}</h3></div>;
}

function DistributionCard({
  title,
  icon,
  rows,
}: {
  title: string;
  icon: typeof Settings;
  rows: Array<[string, number, number, string]>;
}) {
  return (
    <article className="panel distribution-card">
      <PanelTitle icon={icon} title={title} />
      <div className="distribution-rows">
        {rows.map(([label, value, width, tone]) => (
          <div className="distribution-row" key={label}>
            <span>{label}</span>
            <div className="progress-track"><span className={`bar-${tone}`} style={{ width: `${Math.max(width, 2)}%` }} /></div>
            <strong>{value}</strong>
          </div>
        ))}
      </div>
    </article>
  );
}
