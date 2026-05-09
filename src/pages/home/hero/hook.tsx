import { useHeroImages } from "@/hooks/data/use-hero.hook";
import { useCarousel } from "./_hooks/use-carousel.hook";
import { Image } from "@/types";

interface UseHeroCarouselReturn {
  imagesToShow: Image[];
  logo: Image | null;
  current: number;
  next: number | null;
  nextVisible: boolean;
  isLoaded: boolean;
  error: Error | null;
  fadeDuration: number;
}

export const useHeroCarousel = (): UseHeroCarouselReturn => {
  const { imagesToShow, logo, isLoaded, error } = useHeroImages();
  const { current, next, nextVisible, fadeDuration } =
    useCarousel(imagesToShow);

  return {
    imagesToShow,
    logo,
    current,
    next,
    nextVisible,
    isLoaded,
    error,
    fadeDuration,
  };
};
