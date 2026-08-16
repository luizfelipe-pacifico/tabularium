"use client";

import { Filter, Search } from "lucide-react";
import { useMemo, useState } from "react";

import { PageHeader } from "@/components/app-shell/page-header";
import { demands, type DemandStatus } from "@/lib/mock-data";

export function DemandList({
  statuses,
  eyebrow,
  title,
  description,
}: {
  statuses: DemandStatus[];
  eyebrow: string;
  title: string;
  description: string;
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [priority, setPriority] = useState("");
  const [operator, setOperator] = useState("");

  const scoped = useMemo(() => demands.filter((demand) => statuses.includes(demand.status)), [statuses]);

  const categories = useMemo(() => Array.from(new Set(scoped.map((demand) => demand.category))), [scoped]);
  const priorities = useMemo(() => Array.from(new Set(scoped.map((demand) => demand.priority))), [scoped]);
  const assignees = useMemo(
    () => Array.from(new Set(scoped.map((demand) => demand.assignedTo ?? "Unassigned"))),
    [scoped],
  );

  const filtered = useMemo(
    () =>
      scoped.filter((demand) => {
        const matchesQuery = `${demand.id} ${demand.title} ${demand.area}`
          .toLowerCase()
          .includes(query.toLowerCase());
        const matchesCategory = !category || demand.category === category;
        const matchesPriority = !priority || demand.priority === priority;
        const matchesOperator = !operator || (demand.assignedTo ?? "Unassigned") === operator;

        return matchesQuery && matchesCategory && matchesPriority && matchesOperator;
      }),
    [scoped, query, category, priority, operator],
  );

  return (
    <>
      <PageHeader eyebrow={eyebrow} title={title} description={description} />

      <div className="filters-row">
        <div className="search-box">
          <Search size={17} />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search by ID, title, or area" />
        </div>
        <select className="field-select" value={category} onChange={(event) => setCategory(event.target.value)}>
          <option value="">All categories</option>
          {categories.map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
        <select className="field-select" value={priority} onChange={(event) => setPriority(event.target.value)}>
          <option value="">All priorities</option>
          {priorities.map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
        <select className="field-select" value={operator} onChange={(event) => setOperator(event.target.value)}>
          <option value="">All operators</option>
          {assignees.map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
      </div>

      <article className="panel demand-list-panel">
        <div className="panel-heading-row">
          <div className="panel-title">
            <Filter size={17} />
            <h3>
              {filtered.length} of {scoped.length} demand{scoped.length === 1 ? "" : "s"}
            </h3>
          </div>
        </div>
        <div className="demand-list">
          {filtered.map((demand) => (
            <button className="demand-row" key={demand.id}>
              <strong>{demand.id}</strong>
              <span className="tag category-tag">{demand.category}</span>
              <span className={`tag priority-${demand.priority.toLowerCase()}`}>{demand.priority}</span>
              <span className="demand-area">{demand.title}</span>
              <span className="status-tag">{demand.assignedTo ?? "Unassigned"}</span>
            </button>
          ))}
          {filtered.length === 0 ? <p className="empty-state">No demands match this filter.</p> : null}
        </div>
      </article>
    </>
  );
}
