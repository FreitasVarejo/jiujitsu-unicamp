import { useState, useEffect, useRef } from "react";
import { CAROUSEL_CONFIG, CarouselState } from "./carousel-helpers";
import { Image } from "@/types";

interface UseCarouselReturn extends CarouselState {
  fadeDuration: number;
}

export const useCarousel = (imagesToShow: Image[]): UseCarouselReturn => {
  const [current, setCurrent] = useState(0);
  const [next, setNext] = useState<number | null>(null);
  const [nextVisible, setNextVisible] = useState(false);

  const lockRef = useRef(false);

  // Lógica do Carrossel (Troca de imagens)
  useEffect(() => {
    if (imagesToShow.length <= 1) return;

    const interval = setInterval(() => {
      if (lockRef.current) return;
      lockRef.current = true;

      const nextIndex = (current + 1) % imagesToShow.length;

      setNext(nextIndex);
      setNextVisible(false);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setNextVisible(true);

          setTimeout(() => {
            setCurrent(nextIndex);
            setNext(null);
            setNextVisible(false);
            lockRef.current = false;
          }, CAROUSEL_CONFIG.FADE_MS);
        });
      });
    }, CAROUSEL_CONFIG.INTERVAL_MS);

    return () => clearInterval(interval);
  }, [imagesToShow, current]);

  return {
    current,
    next,
    nextVisible,
    fadeDuration: CAROUSEL_CONFIG.FADE_MS,
  };
};
