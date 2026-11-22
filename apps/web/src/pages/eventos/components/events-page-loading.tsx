import { LoadingState } from "@/components/states";

export const EventsPageLoading = () => {
  return (
    <div className="container py-12">
      <LoadingState variant="cards" count={4} label="Carregando eventos..." />
    </div>
  );
};
