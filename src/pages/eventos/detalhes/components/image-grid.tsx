import { Event, Image } from "@/types/media";
import { Dispatch, SetStateAction } from "react";

type ImageGridProps = {
  details: Event;
  images: Image[];
  setSelectedImage: Dispatch<SetStateAction<string | null>>;
};
export const ImageGrid = ({
  details,
  images,
  setSelectedImage,
}: ImageGridProps) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {images.map((img, index) => (
        <div
          key={index}
          onClick={() => setSelectedImage(img.url)}
          className="group aspect-[4/3] cursor-pointer overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900"
        >
          <img
            src={img.url}
            alt={img.alternativeText || `${details.title} - Foto ${index + 1}`}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
            style={
              img.focalPoint
                ? {
                    objectPosition: `${img.focalPoint.x}% ${img.focalPoint.y}%`,
                  }
                : undefined
            }
          />
        </div>
      ))}
    </div>
  );
};
