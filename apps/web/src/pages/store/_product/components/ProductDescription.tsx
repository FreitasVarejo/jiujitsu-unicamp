import { Product } from "@/types/product";
import { Badge } from "@/components/ui/badge";
import { DialogTitle } from "@/components/ui/dialog";

interface ProductDescriptionProps {
  product: Product;
  categoryLabel?: string;
}

/** Cabeçalho do modal do produto; o título é o `DialogTitle` do diálogo. */
export const ProductDescription = ({
  product,
  categoryLabel,
}: ProductDescriptionProps) => {
  return (
    <div className="mb-4 md:mb-6">
      <span className="text-xs font-bold tracking-wider text-primary-text uppercase md:text-sm">
        {categoryLabel || "Coleção Oficial"}
      </span>
      <DialogTitle className="mt-1 mb-2 text-2xl leading-8 text-white uppercase md:text-4xl md:leading-10">
        {product.title}
      </DialogTitle>
      <Badge className="h-auto border-2 border-primary bg-black px-4 py-1.5 text-lg font-bold text-white shadow-lg md:text-xl">
        {product.price}
      </Badge>

      {product.description && (
        <div className="mt-6 mb-4 md:mb-6">
          <h4 className="mb-2 text-xs font-bold tracking-widest text-gray-400 uppercase">
            Informações
          </h4>
          <p className="text-sm leading-relaxed text-gray-300 md:text-base">
            {product.description}
          </p>
        </div>
      )}
    </div>
  );
};
