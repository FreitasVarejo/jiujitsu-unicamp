import { Link } from 'react-router-dom';
import { Calendar, MapPin, ChevronRight } from 'lucide-react';
import { EventSummaryInfo } from '@/services/mediaService';

interface EventCardProps {
  event: EventSummaryInfo;
}

export const EventCard = ({ event }: EventCardProps) => {
  return (
    <Link
      to={`/evento/${event.id}`}
      className="group relative h-64 overflow-hidden rounded-xl bg-zinc-900 border border-zinc-800 flex items-end"
    >
      <div className="absolute inset-0">
        {event.coverImage.url && (
          <img
            src={event.coverImage.url}
            alt={event.coverImage.alternativeText || event.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent opacity-90"></div>
      </div>

      <div className="relative z-10 p-6 md:p-8 w-full flex justify-between items-end">
        <div className="max-w-2xl">
          <div className="flex items-center gap-4 text-primary mb-2 text-sm font-semibold">
            <span className="flex items-center gap-1">
              <Calendar size={14} />
              {new Date(event.date).toLocaleDateString('pt-BR')}
            </span>
            {event.location && (
              <span className="flex items-center gap-1">
                <MapPin size={14} />
                {event.location}
              </span>
            )}
          </div>
          <h3 className="text-2xl md:text-3xl font-display text-white uppercase tracking-tight drop-shadow-sm">
            {event.title}
          </h3>
        </div>

        <div className="hidden md:flex items-center gap-2 text-white/90 group-hover:text-primary transition-colors">
          <span className="text-sm font-display uppercase tracking-widest font-medium">
            Ver Fotos
          </span>
          <ChevronRight size={20} />
        </div>
      </div>
    </Link>
  );
};
