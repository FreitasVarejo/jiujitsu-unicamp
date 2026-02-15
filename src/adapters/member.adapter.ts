import { Member } from "../types/media";
import { MEDIA_PATHS, MediaType } from "../constants/media";
import { resolveFullCoverUrl } from "./adapters.handlers";

export const memberAdapter = (raw: any, id: string): Member => {
  const rootPath = MEDIA_PATHS[MediaType.MEMBERS].root;

  return {
    id,
    slug: id,
    title: raw.title,
    year: raw.year,
    course: raw.course,
    belt: raw.belt,
    coverImage: resolveFullCoverUrl(raw, id, rootPath),
  };
};
