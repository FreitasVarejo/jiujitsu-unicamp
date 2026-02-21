import { Event } from "../types/media";
import { BaseMediaService } from "../services/baseMediaService";
import { MEDIA_INFO, MediaType } from "../constants";
import { resolveFullCoverUrl } from "./adapters.handlers";

export const eventAdapter = (raw: any, id: string): Event => {
  const rootPath = MEDIA_INFO[MediaType.EVENTS].root;
  const gallery = BaseMediaService.processGallery(
    rootPath,
    id,
    raw.gallery || [],
  );

  return {
    id,
    title: raw.title,
    date: raw.date,
    location: raw.location,
    description: raw.description,
    category: raw.category,
    gallery,
    coverImage: resolveFullCoverUrl(raw, id, rootPath, gallery),
  };
};
