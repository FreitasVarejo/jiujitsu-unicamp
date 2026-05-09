import { useMemo } from "react";
import { Image } from "@/types";
import { useCarousel } from "./_hooks/useCarousel";
import { HeroBackground } from "./HeroBackground";

interface HeroCarouselProps {
  images: Image[];
}

export const HeroCarousel = ({ images }: HeroCarouselProps) => {
  // Encapsula a lógica de carrossel
  const { current, next, nextVisible, fadeDuration } = useCarousel(images);

  // Memoizar para evitar re-renders desnecessários
  const imagesToDisplay = useMemo(() => images, [images]);

  return (
    <HeroBackground
      images={imagesToDisplay}
      currentIndex={current}
      nextIndex={next}
      nextVisible={nextVisible}
      fadeDuration={fadeDuration}
    />
  );
};
