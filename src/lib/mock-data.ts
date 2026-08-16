// Static placeholder data for UI/layout work. No backend exists yet — see
// docs/DATA_MODEL.md for the schema this mirrors and docs/ROADMAP.md for the
// MVP task that replaces this with real Prisma queries.

export type DemandCategory = "Suggestion" | "Improvement" | "Critical bug" | "Minor bug";
export type DemandPriority = "Critical" | "High" | "Medium" | "Low";
export type DemandStatus = "Open" | "In progress" | "Completed";

export type MockDemand = {
  id: string;
  title: string;
  category: DemandCategory;
  priority: DemandPriority;
  status: DemandStatus;
  area: string;
  score: number;
  assignedTo: string | null;
  createdAt: string;
};

export const operators = [
  { name: "Luiz Felipe", role: "Administrator", email: "luiz@tabularium.dev" },
  { name: "Marina Duarte", role: "Operator", email: "marina@tabularium.dev" },
  { name: "Igor Santana", role: "Operator", email: "igor@tabularium.dev" },
] as const;

export const demands: MockDemand[] = [
  { id: "TB-0001", title: "Access to the system is unavailable", category: "Critical bug", priority: "Critical", status: "Open", area: "Authentication", score: 212, assignedTo: null, createdAt: "2026-08-10" },
  { id: "TB-0002", title: "Record validation needs review", category: "Improvement", priority: "High", status: "Open", area: "Client records", score: 174, assignedTo: null, createdAt: "2026-08-11" },
  { id: "TB-0007", title: "Bulk export truncates long notes", category: "Improvement", priority: "Medium", status: "In progress", area: "Client records", score: 96, assignedTo: "Marina Duarte", createdAt: "2026-08-09" },
  { id: "TB-0008", title: "Allow custom fields per workspace", category: "Improvement", priority: "High", status: "Open", area: "Client records", score: 132, assignedTo: null, createdAt: "2026-08-12" },
  { id: "TB-0009", title: "Sidebar collapses on small screens", category: "Suggestion", priority: "Critical", status: "Open", area: "Workspace settings", score: 118, assignedTo: null, createdAt: "2026-08-13" },
  { id: "TB-0010", title: "Add role field to access structure", category: "Suggestion", priority: "Critical", status: "Open", area: "Access structure", score: 108, assignedTo: null, createdAt: "2026-08-14" },
  { id: "TB-0011", title: "Score recalculates on every render", category: "Minor bug", priority: "Low", status: "In progress", area: "Scoring engine", score: 41, assignedTo: "Igor Santana", createdAt: "2026-08-08" },
  { id: "TB-0004", title: "Password reset email arrives late", category: "Critical bug", priority: "High", status: "Completed", area: "Authentication", score: 152, assignedTo: "Igor Santana", createdAt: "2026-07-30" },
  { id: "TB-0005", title: "Operator avatar upload fails silently", category: "Minor bug", priority: "Medium", status: "Completed", area: "Operators", score: 64, assignedTo: "Marina Duarte", createdAt: "2026-07-28" },
  { id: "TB-0006", title: "Add CSV export for reports", category: "Suggestion", priority: "Low", status: "Completed", area: "Reports", score: 33, assignedTo: "Luiz Felipe", createdAt: "2026-07-25" },
];

export const statusChanges = [
  { demandId: "TB-0011", from: "Open" as const, to: "In progress" as const, by: "Igor Santana", note: "Picked up after triage", at: "2026-08-14T09:20:00" },
  { demandId: "TB-0007", from: "Open" as const, to: "In progress" as const, by: "Marina Duarte", note: "Reproduced locally", at: "2026-08-13T15:40:00" },
  { demandId: "TB-0004", from: "In progress" as const, to: "Completed" as const, by: "Igor Santana", note: "Fixed queue delay in the email worker", at: "2026-08-12T11:05:00" },
  { demandId: "TB-0005", from: "Open" as const, to: "In progress" as const, by: "Marina Duarte", note: null, at: "2026-08-11T10:00:00" },
  { demandId: "TB-0005", from: "In progress" as const, to: "Completed" as const, by: "Marina Duarte", note: "Switched to signed upload URLs", at: "2026-08-11T17:30:00" },
  { demandId: "TB-0006", from: "Open" as const, to: "Completed" as const, by: "Luiz Felipe", note: "Shipped with the reports MVP", at: "2026-08-09T14:00:00" },
];

export function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}
