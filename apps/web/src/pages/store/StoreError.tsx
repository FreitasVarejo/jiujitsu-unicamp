import { ErrorState } from "@/components/states";
import { StoreHeader } from "./StoreHeader";

type StoreErrorProps = {
  error: Error;
};

export const StoreError = ({ error }: StoreErrorProps) => {
  return (
    <div className="container py-12">
      <StoreHeader />

      <ErrorState title="Ops! Algo deu errado" description={error.message} />
    </div>
  );
};
