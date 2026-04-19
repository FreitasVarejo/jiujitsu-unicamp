import { Eye } from "lucide-react";
import { CSSProperties } from "react";
import { ProductInfo } from "@/services/mediaService";

interface ProductCardProps {
  product: ProductInfo;
  categoryLabel?: string;
  onClick: (product: ProductInfo) => void;
}

const imgStyle = (
  focalPoint: ProductInfo["coverImage"]["focalPoint"]
): CSSProperties => ({
  objectFit: "cover",
  objectPosition: focalPoint ? `${focalPoint.x}% ${focalPoint.y}%` : "center",
});

export const ProductCard = ({
  product,
  categoryLabel: _categoryLabel,
  onClick,
}: ProductCardProps) => {
  const coverImage =
    product.coverImage?.url ||
    `https://placehold.co/500x400/18181b/d26030?text=${product.title.replace(/ /g, "+")}`;

  return (
    <div
      onClick={() => onClick(product)}
      className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900 transition-all hover:translate-y-[-4px] hover:border-primary/50"
    >
      <div className="relative aspect-[3/4] shrink-0 overflow-hidden bg-zinc-800">
        <img
          src={coverImage}
          alt={product.title}
          className="h-full w-full transition-transform duration-500 group-hover:scale-110"
          style={imgStyle(product.coverImage?.focalPoint)}
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              `https://placehold.co/500x400/18181b/d26030?text=${product.title.replace(/ /g, "+")}`;
          }}
        />

        {/* Overlay on hover */}
        <div className="pointer-events-none absolute inset-0 bg-black/40 opacity-0 transition-opacity group-hover:opacity-100" />

        {/* Price Tag */}
        <div className="absolute right-3 top-3 z-10 rounded-full border-2 border-primary bg-black px-3 py-1 text-sm font-bold text-white shadow-lg">
          {product.price}
        </div>

        {/* Badge for multiple photos */}
        {product.gallery.length > 1 && (
          <div className="absolute bottom-3 right-3 rounded border border-white/5 bg-zinc-900/80 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-white/70 backdrop-blur">
            +{product.gallery.length - 1} fotos
          </div>
        )}
      </div>

      <div className="flex flex-grow flex-col p-4">
        <h3 className="mb-3 line-clamp-1 font-display text-lg text-white transition-colors group-hover:text-primary">
          {product.title}
        </h3>

        <div className="mt-auto flex items-center justify-between">
          <span className="text-sm font-medium text-zinc-500">
            Ver detalhes
          </span>
          <div className="text-primary transition-transform group-hover:translate-x-1">
            <Eye size={18} />
          </div>
        </div>
      </div>
    </div>
  );
};
