import { Member } from "../types/media";
import { MEDIA_INFO, MediaType } from "../constants";
import { BaseMediaService } from "../services/baseMediaService";
import { Belt } from "@/constants";

export const memberAdapter = (raw: any, id: string): Member => {
  const rootPath = MEDIA_INFO[MediaType.MEMBERS].root;
  const coverFile = raw.cover || raw.coverImage;

  let finalCoverImage = undefined;
  if (coverFile) {
    if (coverFile.startsWith("http") || coverFile.startsWith("/")) {
      finalCoverImage = coverFile;
    } else {
      finalCoverImage = BaseMediaService.getUrl(`${rootPath}/${coverFile}`);
    }
  }

  const belt =
    raw.belt && Object.values(Belt).includes(raw.belt as Belt)
      ? (raw.belt as Belt)
      : Belt.Branca;

  return {
    id,
    title: raw.title,
    year: raw.year,
    course: raw.course,
    belt: belt,
    coverImage: finalCoverImage,
  };
};
