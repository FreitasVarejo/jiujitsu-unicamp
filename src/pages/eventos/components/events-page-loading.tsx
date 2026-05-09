import { Loader2 } from "lucide-react";

export const EventsPageLoading = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-16">
      <Loader2 className="h-12 w-12 animate-spin text-primary" />
      <h3 className="font-display text-xl text-white">Carregando eventos...</h3>
    </div>
  );
};
