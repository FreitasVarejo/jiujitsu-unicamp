import { BaseMediaService } from "../services/baseMediaService";

export const resolveFullCoverUrl = (
  raw: any,
  id: string,
  rootPath: string,
  galleryUrls?: string[],
): string | undefined => {
  const coverFile = raw.cover || raw.coverImage;
  if (coverFile && typeof coverFile === "string") {
    if (coverFile.startsWith("http") || coverFile.startsWith("/")) {
      return coverFile;
    }
    return BaseMediaService.getUrl(`${rootPath}/${id}/${coverFile}`);
  }
  return galleryUrls?.[0];
};
