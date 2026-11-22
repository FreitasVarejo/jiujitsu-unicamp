import { EmptyState } from "@/components/states";

export const EventsPageNone = () => {
  return (
    <EmptyState
      title="Nenhum evento registrado no momento."
      description=""
      className="border bg-card"
    />
  );
};
