import { Event } from "@/types/media";
import { Dispatch, SetStateAction } from "react";

type EventDetailsThumbnailProps = {
  setSelectedImage: Dispatch<SetStateAction<string | null>>;
  details: Event;
};

export const EventDetailsThumbnail = ({
  setSelectedImage,
  details,
}: EventDetailsThumbnailProps) => {
  return (
    <div
      className="group relative aspect-[16/10] cursor-pointer overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 lg:w-2/5"
      onClick={() => setSelectedImage(details.coverImage?.url || null)}
    >
      {details.coverImage ? (
        <img
          src={details.coverImage.url}
          alt={details.coverImage.alternativeText || details.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          style={
            details.coverImage.focalPoint
              ? {
                  objectPosition: `${details.coverImage.focalPoint.x}% ${details.coverImage.focalPoint.y}%`,
                }
              : undefined
          }
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center text-zinc-700">
          Sem Imagem
        </div>
      )}
      <div className="absolute inset-0 bg-black/20 transition-colors duration-300 group-hover:bg-transparent"></div>
      <div className="absolute bottom-4 right-4 rounded-full bg-black/60 px-3 py-1.5 text-[10px] uppercase tracking-widest text-white opacity-0 backdrop-blur-md transition-opacity group-hover:opacity-100">
        Ver em destaque
      </div>
    </div>
  );
};
