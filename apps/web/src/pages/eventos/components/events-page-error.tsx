import { ErrorState } from "@/components/states";

interface EventsPageErrorProps {
  error: Error | string;
}

export const EventsPageError = ({ error }: EventsPageErrorProps) => {
  const errorMessage = error instanceof Error ? error.message : error;

  return <ErrorState title="Ops! Algo deu errado" description={errorMessage} />;
};
