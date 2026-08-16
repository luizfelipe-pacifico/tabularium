import { DemandList } from "@/components/demand-list";

export default function HistoryPage() {
  return (
    <DemandList
      statuses={["Completed"]}
      eyebrow="Closed queue"
      title="History"
      description="Completed demands, kept for audit and pattern review."
    />
  );
}
