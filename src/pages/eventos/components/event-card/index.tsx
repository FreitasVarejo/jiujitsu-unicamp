import { Link } from "react-router-dom";
import { EventSummaryInfo } from "@/services/mediaService";
import { EventCardThumbnail } from "./event-card-thumbnail";
import { EventCardInfo } from "./event-card-info";

interface EventCardProps {
  event: EventSummaryInfo;
}

export const EventCard = ({ event }: EventCardProps) => {
  return (
    <Link
      to={`/evento/${event.id}`}
      className="group relative flex h-64 items-end overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900"
    >
      <EventCardThumbnail coverImage={event.coverImage} />
      <EventCardInfo event={event} />
    </Link>
  );
};
