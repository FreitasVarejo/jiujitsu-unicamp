/**
 * Adapter para transformar StrapiProduct em Product (domain model).
 */

import { StrapiProduct } from "@/types/strapi";
import { Product } from "@/types/product";
import { resolveImage, resolveGallery } from "./media.adapter";

/**
 * Converte StrapiProduct para Product (domain model).
 */
export const productAdapter = (raw: StrapiProduct): Product => {
  const gallery = resolveGallery(raw.gallery);
  const coverImage = resolveImage(raw.cover) ??
    gallery[0] ?? {
      url: "",
      alternativeText: raw.title || "",
      focalPoint: null,
    };

  return {
    id: raw.slug,
    title: raw.title || "",
    description: raw.description || "",
    price:
      raw.price != null
        ? `R$ ${Number(raw.price).toFixed(2).replace(".", ",")}`
        : "",
    category: raw.categoria?.slug || raw.categoria?.name || "",
    sizes: Array.isArray(raw.sizes) ? raw.sizes : [],
    coverImage,
    gallery,
    formsLink: raw.formsLink || undefined,
  };
};
