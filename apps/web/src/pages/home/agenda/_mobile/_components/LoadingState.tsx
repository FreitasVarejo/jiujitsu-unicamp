import { ReactNode } from "react";
import { LoadingState as LoadingBlock } from "@/components/states";
import { useIsDesktop } from "@/hooks/ui";

interface LoadingStateProps {
  navBar: ReactNode;
}

/**
 * Estado de loading para a agenda mobile.
 * Exibe a barra de navegação e o esqueleto de carregamento.
 */
export const LoadingState = ({ navBar }: LoadingStateProps) => {
  const isDesktop = useIsDesktop();

  if (isDesktop) {
    return null;
  }

  return (
    <div className="flex flex-col">
      {navBar}
      <div className="min-h-[70vh]">
        <LoadingBlock variant="list" count={5} label="Carregando a agenda…" />
      </div>
    </div>
  );
};
