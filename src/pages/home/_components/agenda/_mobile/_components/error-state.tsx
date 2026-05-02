import { AlertCircle } from "lucide-react";
import { ReactNode } from "react";

interface ErrorStateProps {
  navBar: ReactNode;
  error: string;
}

/**
 * Estado de erro para a agenda mobile.
 * Exibe a barra de navegação e uma mensagem de erro.
 */
export const ErrorState = ({ navBar, error }: ErrorStateProps) => {
  return (
    <div className="flex flex-col md:hidden">
      {navBar}
      <div className="flex-1 rounded-lg border border-red-500/20 bg-red-500/10 p-8 text-center">
        <AlertCircle className="mx-auto mb-3 h-10 w-10 text-red-500" />
        <h3 className="mb-1 font-display text-lg text-white">
          Ops! Algo deu errado
        </h3>
        <p className="text-sm text-gray-400">{error}</p>
      </div>
    </div>
  );
};
