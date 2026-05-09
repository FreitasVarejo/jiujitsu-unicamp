/**
 * Service para gerenciar eventos via API Strapi.
 */

import { StrapiClient } from "../core/strapi-client";
import { StrapiEvent, StrapiEventSummary } from "@/types/strapi";

export const eventsService = {
  /**
   * Busca todos os eventos (apenas sumário com capa).
   */
  getAll: async (): Promise<StrapiEventSummary[]> => {
    return StrapiClient.getList<StrapiEventSummary>("/api/eventos", {
      params: {
        "populate[cover]": "true",
        "fields[0]": "slug",
        "fields[1]": "title",
        "fields[2]": "date",
        "fields[3]": "location",
        "sort[0]": "date:desc",
        "pagination[limit]": "250",
      },
    });
  },

  /**
   * Busca um evento específico por slug (com galeria completa).
   */
  getBySlug: async (slug: string): Promise<StrapiEvent> => {
    return StrapiClient.getOne<StrapiEvent>("/api/eventos", {
      params: {
        "filters[slug][$eq]": slug,
        "populate[cover]": "true",
        "populate[gallery]": "true",
      },
    });
  },
};
