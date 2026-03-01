import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ProductInfo } from '@/services/mediaService';
import { ProductCard } from './ProductCard';

interface ProductCarouselProps {
  products: ProductInfo[];
  onProductClick: (product: ProductInfo) => void;
}

export const ProductCarousel = ({ products, onProductClick }: ProductCarouselProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    containScroll: 'keepSnaps',
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

    emblaApi.on('select', updateButtons);
    emblaApi.on('init', updateButtons);
    emblaApi.on('reInit', updateButtons);
    updateButtons();

    return () => {
      emblaApi.off('select', updateButtons);
      emblaApi.off('init', updateButtons);
      emblaApi.off('reInit', updateButtons);
    };
  }, [emblaApi]);

  return (
    <div className="relative group/carousel">
      {/* Viewport */}
      <div className="overflow-hidden" ref={emblaRef}>
        {/* Container */}
        <div className="flex -ml-4">
          {products.map((product) => (
            <div 
              key={product.id} 
              className="flex-[0_0_85%] sm:flex-[0_0_46%] lg:flex-[0_0_31%] xl:flex-[0_0_23%] pl-4 py-2"
            >
              <ProductCard 
                product={product} 
                onClick={onProductClick}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons — only shown in the direction the user can scroll */}
      {canScrollPrev && (
        <button
          onClick={scrollPrev}
          className="absolute -left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-zinc-900 border border-zinc-800 text-white shadow-xl opacity-0 group-hover/carousel:opacity-100 transition-opacity hover:bg-zinc-800 hidden md:block"
          aria-label="Anterior"
        >
          <ChevronLeft size={24} />
        </button>
      )}
      {canScrollNext && (
        <button
          onClick={scrollNext}
          className="absolute -right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-zinc-900 border border-zinc-800 text-white shadow-xl opacity-0 group-hover/carousel:opacity-100 transition-opacity hover:bg-zinc-800 hidden md:block"
          aria-label="Próximo"
        >
          <ChevronRight size={24} />
        </button>
      )}

    </div>
  );
};
