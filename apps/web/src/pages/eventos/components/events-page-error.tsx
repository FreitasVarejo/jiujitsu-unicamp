import { AlertCircle } from "lucide-react";

interface EventsPageErrorProps {
  error: Error | string;
}

export const EventsPageError = ({ error }: EventsPageErrorProps) => {
  const errorMessage = error instanceof Error ? error.message : error;

  return (
    <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-8 text-center">
      <AlertCircle className="mx-auto mb-4 h-12 w-12 text-red-500" />
      <h3 className="mb-2 font-display text-xl text-white">
        Ops! Algo deu errado
      </h3>
      <p className="mx-auto max-w-md text-gray-400">{errorMessage}</p>
    </div>
  );
};
