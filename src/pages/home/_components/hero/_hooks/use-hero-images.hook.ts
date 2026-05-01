import { useState, useEffect, useMemo } from "react";
import { mediaService } from "@/services/mediaService";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { Image } from "@/types";

type HeroImages = {
  desktop: Image[];
  mobile: Image[];
};

interface UseHeroImagesReturn {
  imagesToShow: Image[];
  logo: Image | null;
  isLoaded: boolean;
  error: string | null;
  carouselKey: "desktop" | "mobile";
}

export const useHeroImages = (): UseHeroImagesReturn => {
  const [images, setImages] = useState<HeroImages>({
    desktop: [],
    mobile: [],
  });
  const [logo, setLogo] = useState<Image | null>(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [logoLoaded, setLogoLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isMediumOrLarger = useMediaQuery("(min-width: 768px)");

  const isLoaded = imagesLoaded && logoLoaded;

  const carouselKey: "desktop" | "mobile" = useMemo(
    () => (isMediumOrLarger ? "desktop" : "mobile"),
    [isMediumOrLarger]
  );

  const imagesToShow = useMemo(
    () => (isMediumOrLarger ? images.desktop : images.mobile),
    [isMediumOrLarger, images]
  );

  // Busca de dados inicial
  useEffect(() => {
    const loadData = async () => {
      try {
        const [imgs, logoData] = await Promise.all([
          mediaService.getHeroImages(),
          mediaService.getLogo(),
        ]);

        if (imgs.desktop.length > 0 || imgs.mobile.length > 0) {
          setImages(imgs);
        } else {
          setError("Nenhuma imagem disponível para o carrossel");
        }

        if (logoData) {
          setLogo(logoData);
        } else {
          setError("Logo não disponível");
        }
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Erro desconhecido";
        setError(`Erro ao carregar Hero: ${message}`);
        console.error("Erro ao carregar dados do Hero:", err);
      } finally {
        setImagesLoaded(true);
        setLogoLoaded(true);
      }
    };
    loadData();
  }, []);

  // Preload das imagens do carousel
  useEffect(() => {
    if (imagesToShow.length === 0) return;

    imagesToShow.forEach((img) => {
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "image";
      link.href = img.url;
      document.head.appendChild(link);
    });
  }, [imagesToShow]);

  // Preload do logo
  useEffect(() => {
    if (!logo) return;

    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.href = logo.url;
    document.head.appendChild(link);
  }, [logo]);

  return {
    imagesToShow,
    logo,
    isLoaded,
    error,
    carouselKey,
  };
};
