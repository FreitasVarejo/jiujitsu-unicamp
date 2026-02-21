import { Product } from '../types/media';
import { resolveMediaUrl, resolveGalleryUrls } from './adapters.handlers';

export const productAdapter = (raw: any): Product => {
  const gallery = resolveGalleryUrls(raw.gallery);

  return {
    id: raw.slug,
    title: raw.title,
    description: raw.description || '',
    price: raw.price,
    category: raw.categoria?.name || raw.categoria?.slug || '',
    sizes: Array.isArray(raw.sizes) ? raw.sizes : [],
    gallery,
    coverImage: resolveMediaUrl(raw.cover) ?? gallery[0],
  };
};
