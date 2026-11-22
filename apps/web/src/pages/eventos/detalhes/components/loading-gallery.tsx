import { LoadingState } from "@/components/states";

export const LoadingGallery = () => {
  return (
    <div className="container py-12">
      <LoadingState variant="detail" label="Carregando galeria..." />
    </div>
  );
};
