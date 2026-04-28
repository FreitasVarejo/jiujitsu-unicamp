import { Calendar, MapPin, ChevronRight } from "lucide-react";
import { EventSummaryInfo } from "@/services/mediaService";

interface EventCardInfoProps {
  event: EventSummaryInfo;
}

export const EventCardInfo = ({ event }: EventCardInfoProps) => {
  return (
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
  );
};
