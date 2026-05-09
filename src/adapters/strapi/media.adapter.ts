/**
 * Adapter para transformar StrapiMediaFile em Image (domain model).
 */

import { StrapiClient } from "@/services/core/strapi-client";
import { StrapiMediaFile } from "@/types/strapi";
import { Image } from "@/types/base";

/**
 * Converte um arquivo de mídia do Strapi para o formato de Image do domínio.
 */
export const resolveImage = (
  file: StrapiMediaFile | null | undefined
): Image | undefined => {
  if (!file?.url) return undefined;
  return {
    url: StrapiClient.resolveMediaUrl(file.url),
    alternativeText: file.alternativeText || "",
    focalPoint: file.focalPoint ?? null,
  };
};

/**
 * Converte uma galeria de arquivos do Strapi para array de Images.
 */
export const resolveGallery = (
  files: StrapiMediaFile[] | null | undefined
): Image[] => {
  if (!files || !Array.isArray(files)) return [];
  return files
    .map((f) => resolveImage(f))
    .filter((img): img is Image => img !== undefined);
};
