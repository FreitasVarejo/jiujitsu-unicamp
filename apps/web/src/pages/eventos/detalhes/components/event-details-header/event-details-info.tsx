import { Event } from "@/types/event";
import { Calendar, MapPin } from "lucide-react";

type EventDetailsInfoCardProps = {
  details: Event;
};

export const EventDetailsInfoCard = ({
  details,
}: EventDetailsInfoCardProps) => {
  return (
    <div className="flex-1">
      <header>
        <div className="mb-4 flex items-center gap-4 text-sm font-medium text-primary">
          <span className="flex items-center gap-1">
            <Calendar size={16} />
            {new Date(details.date).toLocaleDateString("pt-BR")}
          </span>
          <span className="flex items-center gap-1">
            <MapPin size={16} />
            {details.location}
          </span>
        </div>
        <h1 className="mb-6 font-display text-4xl uppercase tracking-tight text-white md:text-5xl">
          {details.title}
        </h1>
        <p className="max-w-3xl text-lg leading-relaxed text-gray-400">
          {details.description}
        </p>
      </header>
    </div>
  );
};
