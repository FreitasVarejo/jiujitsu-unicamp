import { Product } from "@/types/product";

interface ProductDescriptionProps {
  product: Product;
  categoryLabel?: string;
}

export const ProductDescription = ({
  product,
  categoryLabel,
}: ProductDescriptionProps) => {
  return (
    <div className="mb-4 md:mb-6">
      <span className="text-xs font-bold uppercase tracking-wider text-primary md:text-sm">
        {categoryLabel || "Coleção Oficial"}
      </span>
      <h2 className="mb-2 mt-1 font-display text-2xl text-white md:text-4xl">
        {product.title}
      </h2>
      <div className="inline-block rounded-full border-2 border-primary bg-black px-4 py-1.5 text-lg font-bold text-white shadow-lg md:text-xl">
        {product.price}
      </div>

      {product.description && (
        <div className="mb-4 mt-6 md:mb-6">
          <h4 className="mb-2 text-xs font-bold uppercase tracking-widest text-gray-400">
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
