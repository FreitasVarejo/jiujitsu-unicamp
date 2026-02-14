import { useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ProductInfo } from '@/services/mediaService';
import { ProductCard } from './ProductCard';

interface ProductCarouselProps {
  products: ProductInfo[];
  categories: Record<string, string>;
  onProductClick: (product: ProductInfo) => void;
}

export const ProductCarousel = ({ products, categories, onProductClick }: ProductCarouselProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    containScroll: 'trimSnaps',
    dragFree: true,
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
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
              className="flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] pl-4 py-2"
            >
              <ProductCard 
                product={product} 
                categoryLabel={categories[product.categoria]}
                onClick={onProductClick}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      {products.length > 1 && (
        <>
          <button
            onClick={scrollPrev}
            className="absolute -left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-zinc-900 border border-zinc-800 text-white shadow-xl opacity-0 group-hover/carousel:opacity-100 transition-opacity hover:bg-zinc-800 hidden md:block"
            aria-label="Anterior"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={scrollNext}
            className="absolute -right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-zinc-900 border border-zinc-800 text-white shadow-xl opacity-0 group-hover/carousel:opacity-100 transition-opacity hover:bg-zinc-800 hidden md:block"
            aria-label="Próximo"
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}

      {/* Gradient masks for better UX on mobile */}
      <div className="absolute top-0 right-0 bottom-0 w-8 bg-gradient-to-l from-black/20 to-transparent pointer-events-none md:hidden" />
    </div>
  );
};
