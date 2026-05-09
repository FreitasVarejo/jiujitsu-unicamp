/**
 * Tipos intermediários para instrutores do Strapi.
 * Representam a estrutura raw retornada pela API antes da conversão para domain models.
 */

import { StrapiMediaFile } from "./media";

export interface StrapiInstructor {
  slug: string;
  title: string;
  year: string;
  course: string;
  belt: string;
  photo?: StrapiMediaFile;
}
