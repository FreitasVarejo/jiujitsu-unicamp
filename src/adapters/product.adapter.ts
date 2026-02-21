import { Product } from "../types/media";
import { BaseMediaService } from "../services/baseMediaService";
import { MEDIA_INFO, MediaType } from "../constants";
import { resolveFullCoverUrl } from "./adapters.handlers";

export const productAdapter = (raw: any, id: string): Product => {
  const rootPath = MEDIA_INFO[MediaType.PRODUCTS].root;
  const gallery = BaseMediaService.processGallery(
    rootPath,
    id,
    raw.gallery || [],
  );

  return {
    id,
    title: raw.title,
    description: raw.description,
    price: raw.price,
    category: raw.category,
    sizes: raw.sizes || [],
    gallery,
    coverImage: resolveFullCoverUrl(raw, id, rootPath, gallery),
  };
};
