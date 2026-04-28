import { AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";

type ErrorEventNotFoundProp = {
  error: string | null;
};

export const ErrorEventNotFound = ({ error }: ErrorEventNotFoundProp) => {
  return (
    <div className="container py-24 text-center">
      <AlertCircle className="mx-auto mb-4 h-12 w-12 text-red-500" />
      <p className="text-xl text-white">{error || "Evento não encontrado."}</p>
      <Link
        to="/eventos"
        className="mt-4 inline-block text-primary hover:underline"
      >
        Voltar para Eventos
      </Link>
    </div>
  );
};
