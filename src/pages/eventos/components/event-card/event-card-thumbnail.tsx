import { Image } from "@/types/media";

type EventCardThumbnailProps = {
  coverImage: Image;
};

export const EventCardThumbnail = ({ coverImage }: EventCardThumbnailProps) => {
  return (
    <div className="absolute inset-0">
      {coverImage.url && (
        <img
          src={coverImage.url}
          alt={coverImage.alternativeText}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          style={
            coverImage.focalPoint
              ? {
                  objectPosition: `${coverImage.focalPoint.x}% ${coverImage.focalPoint.y}%`,
                }
              : undefined
          }
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent opacity-90"></div>
    </div>
  );
};
