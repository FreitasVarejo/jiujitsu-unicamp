import { Loader2 } from "lucide-react";

export const StoreSkeleton = () => (
  <div className="container py-12">
    <div className="mb-8 text-center">
      <h1 className="mb-4 font-display text-5xl text-white">Loja Oficial</h1>
      <p className="mx-auto max-w-2xl text-xl text-gray-400">
        Peças sob demanda com a identidade da nossa equipe. Clique em um produto
        para ver detalhes e encomendar.
      </p>
    </div>

    <div className="flex justify-center py-20">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
    </div>
  </div>
);
