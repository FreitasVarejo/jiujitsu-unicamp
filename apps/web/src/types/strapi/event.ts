/**
 * Tipos intermediários para eventos do Strapi.
 * Representam a estrutura raw retornada pela API antes da conversão para domain models.
 */

import { StrapiMediaFile } from "./media";

export interface StrapiEventSummary {
  slug: string;
  title: string;
  date: string;
  location: string;
  cover?: StrapiMediaFile;
}

export interface StrapiEvent extends StrapiEventSummary {
  description: string;
  category: string;
  gallery?: StrapiMediaFile[];
}
