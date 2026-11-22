import { LoadingState } from "@/components/states";
import { StoreHeader } from "./StoreHeader";

export const StoreSkeleton = () => (
  <div className="container py-12">
    <StoreHeader />

    <LoadingState variant="cards" count={4} label="Carregando a loja…" />
  </div>
);
