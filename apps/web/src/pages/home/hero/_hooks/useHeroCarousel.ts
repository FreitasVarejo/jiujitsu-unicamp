import { useHeroImages } from "@/hooks/data/use-hero.hook";
import { Image } from "@/types";
import { useCarousel } from "./useCarousel";

interface UseHeroCarouselReturn {
  imagesToShow: Image[];
  logo: Image | null;
  current: number;
  next: number | null;
  nextVisible: boolean;
  isLoading: boolean;
  error: Error | null;
  fadeDuration: number;
}

export const useHeroCarousel = (): UseHeroCarouselReturn => {
  const { imagesToShow, logo, isLoading, error } = useHeroImages();
  const { current, next, nextVisible, fadeDuration } =
    useCarousel(imagesToShow);

  return {
    imagesToShow,
    logo,
    current,
    next,
    nextVisible,
    isLoading,
    error,
    fadeDuration,
  };
};
