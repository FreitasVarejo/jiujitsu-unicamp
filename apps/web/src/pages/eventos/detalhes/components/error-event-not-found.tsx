import { Link } from "react-router-dom";
import { ErrorState } from "@/components/states";
import { Button } from "@/components/ui/button";

type ErrorEventNotFoundProp = {
  error: Error | null;
};

export const ErrorEventNotFound = ({ error }: ErrorEventNotFoundProp) => {
  const errorMessage = error
    ? error instanceof Error
      ? error.message
      : String(error)
    : "Evento não encontrado.";

  return (
    <div className="container py-24">
      <ErrorState
        title={errorMessage}
        description=""
        action={
          <Button
            variant="link"
            nativeButton={false}
            render={<Link to="/eventos" />}
          >
            Voltar para Eventos
          </Button>
        }
      />
    </div>
  );
};
