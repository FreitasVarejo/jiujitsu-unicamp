import { X } from "lucide-react";
import { Product } from "@/types/product";
import { useIsDesktop } from "@/hooks/ui";
import { useProductModalEscape } from "./hooks/use-product-modal-escape.hook";
import { ProductGalleryCarousel } from "./components/ProductGalleryCarousel";
import { ProductDescription } from "./components/ProductDescription";
import { ProductSizes } from "./components/ProductSizes";
import { ProductStatus } from "./components/ProductStatus";
import { ProductActions } from "./components/ProductActions";

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  categoryLabel?: string;
}

export const ProductModal = ({
  product,
  onClose,
  categoryLabel,
}: ProductModalProps) => {
  const isDesktop = useIsDesktop();
  useProductModalEscape(onClose);

  if (!product) return null;

  const formsOpen = Boolean(product.formsLink);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 md:p-8">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/90 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div
        className={`relative flex max-h-[95vh] w-full max-w-5xl overflow-hidden rounded-2xl bg-zinc-900 shadow-2xl ${
          isDesktop ? "max-h-[90vh] flex-row" : "flex-col"
        }`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-3 top-3 z-[110] rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-black/80"
        >
          <X size={20} />
        </button>

        {/* Left Side: Images */}
        <ProductGalleryCarousel
          images={product.gallery}
          title={product.title}
          isDesktop={isDesktop}
        />

        {/* Right Side: Details */}
        <div
          className={`flex w-full flex-col overflow-y-auto p-5 ${isDesktop ? "w-2/5 p-8" : ""}`}
        >
          <ProductDescription product={product} categoryLabel={categoryLabel} />

          <div className="flex-grow">
            <ProductSizes sizes={product.sizes} />
            <ProductStatus formsOpen={formsOpen} />
          </div>

          <ProductActions product={product} />
        </div>
      </div>
    </div>
  );
};
