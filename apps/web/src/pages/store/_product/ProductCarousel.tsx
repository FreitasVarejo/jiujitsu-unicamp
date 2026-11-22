import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Product } from "@/types/product";
import { ProductCard } from "./ProductCard";
import { useIsDesktop } from "@/hooks/ui";

interface ProductCarouselProps {
  products: Product[];
  onProductClick: (product: Product) => void;
}

export const ProductCarousel = ({
  products,
  onProductClick,
}: ProductCarouselProps) => {
  const isDesktop = useIsDesktop();
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "keepSnaps",
    dragFree: false,
  });

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    const updateButtons = () => {
      setCanScrollPrev(emblaApi.canScrollPrev());
      setCanScrollNext(emblaApi.canScrollNext());
    };

    emblaApi.on("select", updateButtons);
    emblaApi.on("init", updateButtons);
    emblaApi.on("reInit", updateButtons);
    updateButtons();

    return () => {
      emblaApi.off("select", updateButtons);
      emblaApi.off("init", updateButtons);
      emblaApi.off("reInit", updateButtons);
    };
  }, [emblaApi]);

  return (
    <div className="group/carousel relative">
      {/* Viewport */}
      <div className="overflow-hidden" ref={emblaRef}>
        {/* Container */}
        <div className="-ml-4 flex">
          {products.map((product) => (
            <div
              key={product.id}
              className="flex-[0_0_85%] py-2 pl-4 sm:flex-[0_0_46%] lg:flex-[0_0_31%] xl:flex-[0_0_23%]"
            >
              <ProductCard product={product} onClick={onProductClick} />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons — only shown in the direction the user can scroll */}
      {isDesktop && canScrollPrev && (
        <Button
          variant="outline"
          size="icon-lg"
          onClick={scrollPrev}
          className="absolute top-1/2 -left-4 z-20 size-12 -translate-y-1/2 rounded-full border-zinc-800 bg-zinc-900 text-white opacity-0 shadow-xl transition-opacity group-hover/carousel:opacity-100 hover:bg-zinc-800 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:bg-zinc-800"
          aria-label="Anterior"
        >
          <ChevronLeft className="size-6" />
        </Button>
      )}
      {isDesktop && canScrollNext && (
        <Button
          variant="outline"
          size="icon-lg"
          onClick={scrollNext}
          className="absolute top-1/2 -right-4 z-20 size-12 -translate-y-1/2 rounded-full border-zinc-800 bg-zinc-900 text-white opacity-0 shadow-xl transition-opacity group-hover/carousel:opacity-100 hover:bg-zinc-800 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:bg-zinc-800"
          aria-label="Próximo"
        >
          <ChevronRight className="size-6" />
        </Button>
      )}
    </div>
  );
};
