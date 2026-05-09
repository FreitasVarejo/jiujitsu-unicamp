interface ProductSizesProps {
  sizes: string[];
}

export const ProductSizes = ({ sizes }: ProductSizesProps) => {
  if (!sizes || sizes.length === 0) return null;

  return (
    <div className="mb-4 md:mb-6">
      <h4 className="mb-2 text-xs font-bold uppercase tracking-widest text-gray-400">
        Tamanhos Disponíveis
      </h4>
      <div className="flex flex-wrap gap-2">
        {sizes.map((tamanho) => (
          <span
            key={tamanho}
            className="rounded-md border border-zinc-700 bg-zinc-800 px-3 py-1 text-sm font-bold text-white"
          >
            {tamanho}
          </span>
        ))}
      </div>
    </div>
  );
};
