/**
 * Tipos intermediários para recursos de mídia do Strapi.
 * Representam a estrutura raw retornada pela API antes da conversão para domain models.
 */

export interface StrapiMediaFile {
  url: string;
  alternativeText?: string;
  focalPoint?: { x: number; y: number } | null;
  formats?: {
    thumbnail?: { url: string };
    small?: { url: string };
    medium?: { url: string };
    large?: { url: string };
  };
}

export interface StrapiImage {
  url: string;
  alternativeText?: string;
  focalPoint?: { x: number; y: number } | null;
}
