import { useEffect } from "react";
import { X } from "lucide-react";
import { Product } from "@/types/product";
import { useIsDesktop } from "@/hooks/ui";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { ProductGalleryCarousel } from "./components/ProductGalleryCarousel";
import { ProductDescription } from "./components/ProductDescription";
import { ProductSizes } from "./components/ProductSizes";
import { ProductStatus } from "./components/ProductStatus";
import { ProductActions } from "./components/ProductActions";
import { telemetry } from "@/services/telemetry";

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

  useEffect(() => {
    if (product) {
      telemetry.trackEvent("product_modal_open", {
        productId: product.id,
        productTitle: product.title,
        category: categoryLabel,
      });
    }
  }, [product, categoryLabel]);

  if (!product) return null;

  const formsOpen = Boolean(product.formsLink);

  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        showCloseButton={false}
        className={cn(
          "z-100 flex max-h-[95vh] w-full max-w-[calc(100%-1rem)] gap-0 overflow-hidden rounded-2xl bg-zinc-900 p-0 shadow-2xl ring-0 sm:max-w-5xl",
          isDesktop ? "max-h-[90vh] flex-row" : "flex-col"
        )}
      >
        {/* Close Button */}
        <DialogClose
          render={
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-3 right-3 z-110 rounded-full bg-black/50 text-white hover:bg-black/80 hover:text-white"
            />
          }
        >
          <X className="size-5" />
          <span className="sr-only">Fechar</span>
        </DialogClose>

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

          <div className="grow">
            <ProductSizes sizes={product.sizes} />
            <ProductStatus formsOpen={formsOpen} />
          </div>

          <ProductActions product={product} />
        </div>
      </DialogContent>
    </Dialog>
  );
};
