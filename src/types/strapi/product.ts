/**
 * Tipos intermediários para produtos do Strapi.
 * Representam a estrutura raw retornada pela API antes da conversão para domain models.
 */

import { StrapiMediaFile } from "./media";

export interface StrapiProductCategory {
  slug: string;
  name: string;
}

export interface StrapiProduct {
  slug: string;
  title: string;
  description: string;
  price: number;
  sizes: string[];
  categoria?: StrapiProductCategory;
  cover?: StrapiMediaFile;
  gallery?: StrapiMediaFile[];
  formsLink?: string;
}
