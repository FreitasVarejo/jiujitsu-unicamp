/**
 * Service para gerenciar instrutores via API Strapi.
 */

import { StrapiClient } from "../core/strapi-client";
import { StrapiInstructor } from "@/types/strapi";

export const instructorsService = {
  /**
   * Busca todos os instrutores com foto.
   */
  getAll: async (): Promise<StrapiInstructor[]> => {
    return StrapiClient.getList<StrapiInstructor>("/api/instrutores", {
      params: {
        populate: "photo",
        "pagination[limit]": "250",
      },
    });
  },
};
