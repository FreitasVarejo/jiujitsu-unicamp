/**
 * Service para gerenciar mídia e configurações do site via API Strapi.
 */

import { StrapiClient } from "../core/strapi-client";
import { StrapiImage } from "@/types/strapi";

interface HeroImagesResponse {
  imagesDesktop: StrapiImage[];
  imagesMobile: StrapiImage[];
}

export const mediaService = {
  /**
   * Busca as imagens do carrossel hero (desktop e mobile).
   */
  getHeroImages: async (): Promise<HeroImagesResponse> => {
    const response = await StrapiClient.getOne<{
      imagesDesktop: StrapiImage[];
      imagesMobile: StrapiImage[];
    }>("/api/hero-carousel", {
      params: {
        "populate[imagesDesktop]": "true",
        "populate[imagesMobile]": "true",
      },
    });

    return {
      imagesDesktop: response.imagesDesktop || [],
      imagesMobile: response.imagesMobile || [],
    };
  },

  /**
   * Busca o logo do site.
   */
  getLogo: async (): Promise<StrapiImage | null> => {
    try {
      const response = await StrapiClient.getOne<{
        logo: StrapiImage;
      }>("/api/site-config", {
        params: {
          populate: "logo",
        },
      });

      return response.logo || null;
    } catch (error) {
      console.error("Erro ao buscar logo:", error);
      return null;
    }
  },
};
