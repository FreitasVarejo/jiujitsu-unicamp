import { ReactNode } from "react";
import { ErrorState as ErrorBlock } from "@/components/states";
import { useIsDesktop } from "@/hooks/ui";

interface ErrorStateProps {
  navBar: ReactNode;
  error: string;
}

/**
 * Estado de erro para a agenda mobile.
 * Exibe a barra de navegação e uma mensagem de erro.
 */
export const ErrorState = ({ navBar, error }: ErrorStateProps) => {
  const isDesktop = useIsDesktop();

  if (isDesktop) {
    return null;
  }

  return (
    <div className="flex flex-col">
      {navBar}
      <ErrorBlock title="Ops! Algo deu errado" description={error} />
    </div>
  );
};
