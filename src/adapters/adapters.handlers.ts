import { BaseMediaService, StrapiMediaFile } from '../services/baseMediaService';
import { Image } from '../types/media';

export const resolveImage = (file: StrapiMediaFile | null | undefined): Image | undefined => {
  if (!file?.url) return undefined;
  return {
    url: BaseMediaService.resolveMediaUrl(file.url),
    alternativeText: file.alternativeText || '',
    focalPoint: file.focalPoint ?? null,
  };
};

export const resolveGallery = (files: StrapiMediaFile[] | null | undefined): Image[] => {
  if (!files || !Array.isArray(files)) return [];
  return files
    .map((f) => resolveImage(f))
    .filter((img): img is Image => img !== undefined);
};
