import { Event } from '../types/media';
import { resolveMediaUrl, resolveGalleryUrls } from './adapters.handlers';

export const eventAdapter = (raw: any): Event => {
  const gallery = resolveGalleryUrls(raw.gallery?.images);

  return {
    id: raw.slug,
    title: raw.title,
    date: raw.date,
    location: raw.location || '',
    description: raw.description || '',
    category: raw.category || '',
    gallery,
    coverImage: resolveMediaUrl(raw.gallery?.coverImage) ?? gallery[0],
  };
};
