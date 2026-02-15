import { Link } from "react-router-dom";
import { Calendar, MapPin, ChevronRight } from "lucide-react";
import { EventFolder, EventInfo, mediaService } from "@/services/mediaService";

interface EventCardProps {
  folder: EventFolder;
  info?: EventInfo;
}

export const EventCard = ({ folder, info }: EventCardProps) => {
  const thumb = info?.coverImage || mediaService.getMediaUrl(`/eventos/${folder.id}/0000.webp`);

  return (
    <Link
      to={`/evento/${folder.id}`}
      className="group relative h-64 overflow-hidden rounded-xl bg-zinc-900 border border-zinc-800 flex items-end"
    >
      <div className="absolute inset-0">
        <img
          src={thumb}
          alt={info?.title || folder.id}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent opacity-90"></div>
      </div>

      <div className="relative z-10 p-6 md:p-8 w-full flex justify-between items-end">
        <div className="max-w-2xl">
          <div className="flex items-center gap-4 text-primary mb-2 text-sm font-semibold">
            <span className="flex items-center gap-1">
              <Calendar size={14} />
              {new Date(folder.date).toLocaleDateString("pt-BR")}
            </span>
            {info && (
              <span className="flex items-center gap-1">
                <MapPin size={14} />
                {info.location}
              </span>
            )}
          </div>
          <h3 className="text-2xl md:text-3xl font-display text-white uppercase tracking-tight drop-shadow-sm">
            {info?.title || "Carregando..."}
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
