import { AlertCircle } from "lucide-react";

type StoreErrorProps = {
  error: Error;
};

export const StoreError = ({ error }: StoreErrorProps) => {
  return (
    <div className="container py-12">
      <div className="mb-8 text-center">
        <h1 className="mb-4 font-display text-5xl text-white">Loja Oficial</h1>
        <p className="mx-auto max-w-2xl text-xl text-gray-400">
          Peças sob demanda com a identidade da nossa equipe. Clique em um
          produto para ver detalhes e encomendar.
        </p>
      </div>

      <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-8 text-center">
        <AlertCircle className="mx-auto mb-3 h-10 w-10 text-red-500" />
        <h3 className="mb-1 font-display text-lg text-white">
          Ops! Algo deu errado
        </h3>
        <p className="text-sm text-gray-400">{error.message}</p>
      </div>
    </div>
  );
};
