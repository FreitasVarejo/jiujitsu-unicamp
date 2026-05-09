import { AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";

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
    <div className="container py-24 text-center">
      <AlertCircle className="mx-auto mb-4 h-12 w-12 text-red-500" />
      <p className="text-xl text-white">{errorMessage}</p>
      <Link
        to="/eventos"
        className="mt-4 inline-block text-primary hover:underline"
      >
        Voltar para Eventos
      </Link>
    </div>
  );
};
