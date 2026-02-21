import { BaseMediaService, StrapiMediaFile } from '../services/baseMediaService';

export const resolveMediaUrl = (file: StrapiMediaFile | null | undefined): string | undefined => {
  if (!file?.url) return undefined;
  return BaseMediaService.resolveMediaUrl(file.url);
};

export const resolveGalleryUrls = (files: StrapiMediaFile[] | null | undefined): string[] => {
  if (!files || !Array.isArray(files)) return [];
  return files
    .map((f) => BaseMediaService.resolveMediaUrl(f.url))
    .filter(Boolean) as string[];
};
