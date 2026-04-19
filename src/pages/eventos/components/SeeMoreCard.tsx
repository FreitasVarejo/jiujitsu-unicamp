import { ChevronRight } from "lucide-react";
import { EventSummaryInfo } from "@/services/mediaService";

interface SeeMoreCardProps {
  event: EventSummaryInfo;
  year: string;
  remaining: number;
  onClick: (year: string) => void;
}

export const SeeMoreCard = ({
  event,
  year,
  remaining,
  onClick,
}: SeeMoreCardProps) => {
  return (
    <button
      onClick={() => onClick(year)}
      className="group relative flex h-64 items-end overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 text-left"
    >
      <div className="absolute inset-0">
        {event.coverImage.url && (
          <img
            src={event.coverImage.url}
            alt={event.coverImage.alternativeText || event.title}
            loading="lazy"
            className="h-full w-full object-cover blur-[2px] grayscale transition-transform duration-700"
          />
        )}
        <div className="absolute inset-0 bg-black/60 transition-colors group-hover:bg-black/40"></div>
      </div>

      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center">
        <div className="mb-3 rounded-full bg-primary/20 p-4 transition-transform group-hover:scale-110">
          <ChevronRight size={32} className="rotate-90 text-primary" />
        </div>
        <span className="font-display text-xl uppercase tracking-widest text-white">
          Ver mais {year}
        </span>
        <span className="mt-1 font-sans text-sm text-primary/80">
          +{remaining} eventos registrados
        </span>
      </div>
    </button>
  );
};
