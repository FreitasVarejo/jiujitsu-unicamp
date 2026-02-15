import { ChevronRight } from "lucide-react";
import { EventFolder, EventInfo, mediaService } from "@/services/mediaService";

interface SeeMoreCardProps {
  folder: EventFolder;
  info?: EventInfo;
  year: string;
  remaining: number;
  onClick: (year: string) => void;
}

export const SeeMoreCard = ({ folder, info, year, remaining, onClick }: SeeMoreCardProps) => {
  const thumb = info?.coverImage || mediaService.getMediaUrl(`/eventos/${folder.id}/0000.webp`);

  return (
    <button
      onClick={() => onClick(year)}
      className="group relative h-64 overflow-hidden rounded-xl bg-zinc-900 border border-zinc-800 flex items-end text-left"
    >
      <div className="absolute inset-0">
        <img
          src={thumb}
          alt={info?.title || folder.id}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 grayscale blur-[2px]"
        />
        <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors"></div>
      </div>

      <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
        <div className="bg-primary/20 p-4 rounded-full mb-3 group-hover:scale-110 transition-transform">
          <ChevronRight size={32} className="text-primary rotate-90" />
        </div>
        <span className="text-white font-display text-xl uppercase tracking-widest">
          Ver mais {year}
        </span>
        <span className="text-primary/80 text-sm font-sans mt-1">
          +{remaining} eventos registrados
        </span>
      </div>
    </button>
  );
};
