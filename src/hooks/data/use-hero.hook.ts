/**
 * Hooks para gerenciar Hero e Logo.
 */

import { useMemo } from "react";
import { useFetch } from "@/hooks/core";
import { useIsDesktop } from "@/hooks/ui/use-is-desktop.hook";
import { mediaService } from "@/services/strapi/media.service";
import { StrapiClient } from "@/services/core/strapi-client";
import { Image } from "@/types/base";

interface HeroImages {
  desktop: Image[];
  mobile: Image[];
}

interface UseHeroImagesReturn {
  imagesToShow: Image[];
  logo: Image | null;
  isLoading: boolean;
  error: Error | null;
  carouselKey: "desktop" | "mobile";
}

/**
 * Hook para buscar e gerenciar imagens do Hero carousel.
 */
export const useHeroImages = (): UseHeroImagesReturn => {
  const isMediumOrLarger = useIsDesktop();

  const {
    data: rawImages,
    loading: loadingImages,
    error: errorImages,
  } = useFetch(() => mediaService.getHeroImages(), [], {
    cache: true,
    cacheKey: "hero-images",
  });

  const {
    data: rawLogo,
    loading: loadingLogo,
    error: errorLogo,
  } = useFetch(() => mediaService.getLogo(), [], {
    cache: true,
    cacheKey: "site-logo",
  });

  const images: HeroImages = useMemo(() => {
    if (!rawImages) return { desktop: [], mobile: [] };

    return {
      desktop: (rawImages.imagesDesktop || []).map((img) => ({
        url: StrapiClient.resolveMediaUrl(img.url),
        alternativeText: img.alternativeText || "",
        focalPoint: img.focalPoint ?? null,
      })),
      mobile: (rawImages.imagesMobile || []).map((img) => ({
        url: StrapiClient.resolveMediaUrl(img.url),
        alternativeText: img.alternativeText || "",
        focalPoint: img.focalPoint ?? null,
      })),
    };
  }, [rawImages]);

  const logo: Image | null = useMemo(() => {
    if (!rawLogo) return null;

    return {
      url: StrapiClient.resolveMediaUrl(rawLogo.url),
      alternativeText: rawLogo.alternativeText || "Logo Jiu-Jitsu Unicamp",
      focalPoint: rawLogo.focalPoint ?? null,
    };
  }, [rawLogo]);

  const carouselKey: "desktop" | "mobile" = useMemo(
    () => (isMediumOrLarger ? "desktop" : "mobile"),
    [isMediumOrLarger]
  );

  const imagesToShow = useMemo(
    () => (isMediumOrLarger ? images.desktop : images.mobile),
    [isMediumOrLarger, images]
  );

  const isLoading = !loadingImages && !loadingLogo;
  const error = errorImages || errorLogo;

  return {
    imagesToShow,
    logo,
    isLoading,
    error,
    carouselKey,
  };
};
