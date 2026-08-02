import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";

interface UseProductGalleryCarouselReturn {
  emblaRef: ReturnType<typeof useEmblaCarousel>[0];
  emblaApi: ReturnType<typeof useEmblaCarousel>[1];
  currentSlide: number;
  scrollPrev: () => void;
  scrollNext: () => void;
}

/**
 * Hook que gerencia o carrossel Embla para galeria de produtos
 */
export const useProductGalleryCarousel = (
  loop = true
): UseProductGalleryCarouselReturn => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop });
  const [currentSlide, setCurrentSlide] = useState(0);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  // Track current slide index
  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setCurrentSlide(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  return {
    emblaRef,
    emblaApi,
    currentSlide,
    scrollPrev,
    scrollNext,
  };
};
