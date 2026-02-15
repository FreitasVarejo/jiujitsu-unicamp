import { Member } from "../types/media";
import { MEDIA_PATHS, MediaType } from "../constants/media";
import { BaseMediaService } from "../services/baseMediaService";

export const memberAdapter = (raw: any, id: string): Member => {
  const rootPath = MEDIA_PATHS[MediaType.MEMBERS].root;
  const coverFile = raw.cover || raw.coverImage;
  
  let finalCoverImage = undefined;
  if (coverFile) {
    if (coverFile.startsWith("http") || coverFile.startsWith("/")) {
        finalCoverImage = coverFile;
    } else {
        finalCoverImage = BaseMediaService.getUrl(`${rootPath}/${coverFile}`);
    }
  }

  return {
    id,
    slug: id,
    title: raw.title,
    year: raw.year,
    course: raw.course,
    belt: raw.belt,
    coverImage: finalCoverImage,
  };
};
