import { Link } from "react-router-dom";
import { Calendar, MapPin, ChevronRight } from "lucide-react";
import { EventSummaryInfo } from "@/services/mediaService";

interface EventCardProps {
  event: EventSummaryInfo;
}

export const EventCard = ({ event }: EventCardProps) => {
  return (
    <Link
      to={`/evento/${event.id}`}
      className="group relative flex h-64 items-end overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900"
    >
      <div className="absolute inset-0">
        {event.coverImage.url && (
          <img
            src={event.coverImage.url}
            alt={event.coverImage.alternativeText || event.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            style={
              event.coverImage.focalPoint
                ? {
                    objectPosition: `${event.coverImage.focalPoint.x}% ${event.coverImage.focalPoint.y}%`,
                  }
                : undefined
            }
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent opacity-90"></div>
      </div>

      <div className="relative z-10 flex w-full items-end justify-between p-6 md:p-8">
        <div className="max-w-2xl">
          <div className="mb-2 flex items-center gap-4 text-sm font-semibold text-primary">
            <span className="flex items-center gap-1">
              <Calendar size={14} />
              {new Date(event.date).toLocaleDateString("pt-BR")}
            </span>
            {event.location && (
              <span className="flex items-center gap-1">
                <MapPin size={14} />
                {event.location}
              </span>
            )}
          </div>
          <h3 className="font-display text-2xl uppercase tracking-tight text-white drop-shadow-sm md:text-3xl">
            {event.title}
          </h3>
        </div>

        <div className="hidden items-center gap-2 text-white/90 transition-colors group-hover:text-primary md:flex">
          <span className="font-display text-sm font-medium uppercase tracking-widest">
            Ver Fotos
          </span>
          <ChevronRight size={20} />
        </div>
      </div>
    </Link>
  );
};
