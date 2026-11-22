import { Eye } from "lucide-react";
import { Product } from "@/types/product";
import { getImageStyle, getPlaceholderUrl } from "./helpers/image-helpers";
import { telemetry } from "@/services/telemetry";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

interface ProductCardProps {
  product: Product;
  categoryLabel?: string;
  onClick: (product: Product) => void;
}

export const ProductCard = ({
  product,
  categoryLabel: _categoryLabel,
  onClick,
}: ProductCardProps) => {
  const coverImage =
    product.coverImage?.url || getPlaceholderUrl(product.title);

  return (
    <Card
      onClick={() => {
        telemetry.trackEvent("product_card_click", {
          productId: product.id,
          productTitle: product.title,
        });
        onClick(product);
      }}
      className="group h-full cursor-pointer gap-0 rounded-lg border border-border py-0 ring-0 transition-all hover:-translate-y-1 hover:border-primary/50"
    >
      <div className="relative aspect-3/4 shrink-0 overflow-hidden bg-zinc-800">
        <img
          src={coverImage}
          alt={product.title}
          className="h-full w-full transition-transform duration-500 group-hover:scale-110"
          style={getImageStyle(product.coverImage?.focalPoint)}
          onError={(e) => {
            (e.target as HTMLImageElement).src = getPlaceholderUrl(
              product.title
            );
          }}
        />

        {/* Overlay on hover */}
        <div className="pointer-events-none absolute inset-0 bg-black/40 opacity-0 transition-opacity group-hover:opacity-100" />

        {/* Price Tag */}
        <Badge className="absolute top-3 right-3 z-10 h-auto border-2 border-primary bg-black px-3 py-1 text-sm font-bold text-white shadow-lg">
          {product.price}
        </Badge>

        {/* Badge for multiple photos */}
        {product.gallery.length > 1 && (
          <Badge
            variant="outline"
            className="absolute right-3 bottom-3 h-auto rounded-sm border-white/5 bg-zinc-900/80 px-2 py-0.5 text-[10px] font-bold tracking-widest text-white/70 uppercase backdrop-blur-sm"
          >
            +{product.gallery.length - 1} fotos
          </Badge>
        )}
      </div>

      <div className="flex grow flex-col p-4">
        <h3 className="mb-3 line-clamp-1 font-display text-lg text-white transition-colors group-hover:text-primary-text">
          {product.title}
        </h3>

        <div className="mt-auto flex items-center justify-between">
          <span className="text-sm font-medium text-zinc-500">
            Ver detalhes
          </span>
          <div className="text-primary-text transition-transform group-hover:translate-x-1">
            <Eye size={18} />
          </div>
        </div>
      </div>
    </Card>
  );
};
