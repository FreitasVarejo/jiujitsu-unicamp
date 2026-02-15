import { Product } from "../types/media";
import { BaseMediaService } from "../services/baseMediaService";
import { MEDIA_PATHS, MediaType } from "../constants/media";
import { resolveFullCoverUrl } from "./adapters.handlers";

export const productAdapter = (raw: any, id: string): Product => {
  const rootPath = MEDIA_PATHS[MediaType.PRODUCTS].root;
  const gallery = BaseMediaService.processGallery(
    rootPath,
    id,
    raw.gallery || [],
  );

  return {
    id,
    slug: id,
    title: raw.title,
    description: raw.description,
    price: raw.price,
    category: raw.category,
    sizes: raw.sizes || [],
    gallery,
    coverImage: resolveFullCoverUrl(raw, id, rootPath, gallery),
  };
};
