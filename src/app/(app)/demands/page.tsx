import { DemandList } from "@/components/demand-list";

export default function DemandsPage() {
  return (
    <DemandList
      statuses={["Open", "In progress"]}
      eyebrow="Active queue"
      title="Active demands"
      description="Everything currently open or in progress, across every category and priority."
    />
  );
}
