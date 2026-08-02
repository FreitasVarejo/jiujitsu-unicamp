/**
 * Service para gerenciar produtos via API Strapi.
 */

import { StrapiClient } from "../core/strapi-client";
import { StrapiProduct, StrapiProductCategory } from "@/types/strapi";

export const productsService = {
  /**
   * Busca todos os produtos com capa, galeria e categoria.
   */
  getAll: async (): Promise<StrapiProduct[]> => {
    return StrapiClient.getList<StrapiProduct>("/api/produtos", {
      params: {
        "populate[cover]": "true",
        "populate[gallery]": "true",
        "populate[categoria]": "true",
        "sort[0]": "order:asc",
        "sort[1]": "createdAt:asc",
        "pagination[limit]": "250",
      },
    });
  },

  /**
   * Busca as categorias de produtos.
   */
  getCategories: async (): Promise<StrapiProductCategory[]> => {
    return StrapiClient.getList<StrapiProductCategory>(
      "/api/categoria-produtos",
      {
        params: {
          "sort[0]": "order:asc",
          "sort[1]": "createdAt:asc",
          "pagination[limit]": "250",
        },
      }
    );
  },
};
