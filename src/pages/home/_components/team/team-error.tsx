import { AlertCircle } from "lucide-react";

type TeamErrorProps = {
  error: Error;
};

export const TeamError = ({ error }: TeamErrorProps) => {
  return (
    <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-8 text-center">
      <AlertCircle className="mx-auto mb-3 h-10 w-10 text-red-500" />
      <h3 className="mb-1 font-display text-lg text-white">
        Ops! Algo deu errado
      </h3>
      <p className="text-sm text-gray-400">{error.message}</p>
    </div>
  );
};
