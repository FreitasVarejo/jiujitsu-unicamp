interface ProductStatusProps {
  formsOpen: boolean;
}

export const ProductStatus = ({ formsOpen }: ProductStatusProps) => {
  return (
    <div className="mt-4 space-y-3 md:mt-6">
      <div className="flex items-center gap-3 text-xs text-gray-400 md:text-sm">
        <div
          className={`h-2 w-2 shrink-0 rounded-full ${formsOpen ? "bg-green-500" : "bg-zinc-500"}`}
        />
        {formsOpen ? "Encomendas abertas" : "Encomendas encerradas no momento"}
      </div>
    </div>
  );
};
