import { Event, EventSummary } from '../types/media';
import { resolveImage, resolveGallery } from './adapters.handlers';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const eventSummaryAdapter = (raw: any): EventSummary => {
  const coverImage = resolveImage(raw.cover) ?? {
    url: '',
    alternativeText: raw.title || '',
  };

  return {
    id: raw.slug,
    title: raw.title || '',
    date: raw.date || '',
    location: raw.location || '',
    coverImage,
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const eventAdapter = (raw: any): Event => {
  const summary = eventSummaryAdapter(raw);

  return {
    ...summary,
    description: raw.description || '',
    category: raw.category || '',
    gallery: resolveGallery(raw.gallery),
  };
};
