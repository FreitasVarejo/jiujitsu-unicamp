import { Product } from '../types/media';
import { resolveImage, resolveGallery } from './adapters.handlers';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const productAdapter = (raw: any): Product => {
  const gallery = resolveGallery(raw.gallery);
  const coverImage = resolveImage(raw.cover) ?? gallery[0] ?? {
    url: '',
    alternativeText: raw.title || '',
  };

  return {
    id: raw.slug,
    title: raw.title || '',
    description: raw.description || '',
    price: raw.price || '',
    category: raw.categoria?.name || raw.categoria?.slug || '',
    sizes: Array.isArray(raw.sizes) ? raw.sizes : [],
    coverImage,
    gallery,
  };
};
