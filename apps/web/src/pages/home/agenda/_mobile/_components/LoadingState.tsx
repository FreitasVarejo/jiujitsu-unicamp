import { Loader2 } from "lucide-react";
import { ReactNode } from "react";
import { useIsDesktop } from "@/hooks/ui";

interface LoadingStateProps {
  navBar: ReactNode;
}

/**
 * Estado de loading para a agenda mobile.
 * Exibe a barra de navegação e um spinner centralizado.
 */
export const LoadingState = ({ navBar }: LoadingStateProps) => {
  const isDesktop = useIsDesktop();

  if (isDesktop) {
    return null;
  }

  return (
    <div className="flex flex-col">
      {navBar}
      <div className="flex min-h-[70vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    </div>
  );
};
