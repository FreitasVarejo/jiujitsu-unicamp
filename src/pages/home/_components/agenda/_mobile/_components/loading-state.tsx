import { Loader2 } from "lucide-react";
import { ReactNode } from "react";

interface LoadingStateProps {
  navBar: ReactNode;
}

/**
 * Estado de loading para a agenda mobile.
 * Exibe a barra de navegação e um spinner centralizado.
 */
export const LoadingState = ({ navBar }: LoadingStateProps) => {
  return (
    <div className="flex flex-col md:hidden">
      {navBar}
      <div className="flex flex-1 justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    </div>
  );
};
