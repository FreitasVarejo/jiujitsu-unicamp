import { MapPin, User } from 'lucide-react';
import { AgendaEvent } from '../agenda.hook';
import { CALENDAR_TYPE_INFO } from '@/constants';
import { buildMapsUrl, isPastEventFromDateTime } from '../agenda-helpers';

const CANCELLED_COLORS = {
  container: 'rgba(30, 30, 30, 0.7)',
  main: 'rgba(100, 100, 100, 0.6)',
  onContainer: 'rgba(160, 160, 160, 0.7)',
};

interface EventCardProps {
  event: AgendaEvent;
}

export const EventCard = ({ event }: EventCardProps) => {
  const isPast = isPastEventFromDateTime(event.startDateTime);
  const colors = event.cancelled
    ? CANCELLED_COLORS
    : isPast
      ? (CALENDAR_TYPE_INFO[event.calendarId as keyof typeof CALENDAR_TYPE_INFO] ?? CALENDAR_TYPE_INFO.fallback).darkColorsRgbaPast
      : (CALENDAR_TYPE_INFO[event.calendarId as keyof typeof CALENDAR_TYPE_INFO] ?? CALENDAR_TYPE_INFO.fallback).darkColorsRgba;

  return (
    <div
      className="flex items-start justify-between gap-3 rounded-md p-3"
      style={{ backgroundColor: colors.container, borderLeft: `3px solid ${colors.main}` }}
    >
      <div className="flex flex-col gap-0.5 min-w-0">
        {event.cancelled && (
          <span
            className="inline-block text-xs font-bold tracking-wider"
            style={{ color: '#ef4444' }}
          >
            CANCELADO
          </span>
        )}
        <span
          className="inline-flex items-center gap-1.5 text-sm font-semibold"
          style={{
            color: colors.onContainer,
            textDecoration: event.cancelled ? 'line-through' : 'none',
          }}
        >
          {event.eventName || event.type}
          {event.noGi && (
            <span
              className="text-xs font-medium px-1 py-px rounded"
              style={{ backgroundColor: 'rgba(255,255,255,0.08)', color: colors.onContainer, opacity: 0.85 }}
            >
              NoGi
            </span>
          )}
        </span>
        <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs" style={{ color: colors.onContainer }}>
          {event.instructor && (
            <span
              className="inline-flex items-center gap-0.5 opacity-80"
              style={{ textDecoration: event.cancelled ? 'line-through' : 'none' }}
            >
              <User size={10} className="shrink-0" />
              <span>{event.instructor}</span>
            </span>
          )}
          {event.location && event.rawLocation && (
            <a
              href={buildMapsUrl(event.rawLocation)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-0.5 opacity-80 hover:opacity-100 underline underline-offset-2 transition-opacity"
              style={{
                color: colors.onContainer,
                textDecoration: event.cancelled ? 'line-through' : 'underline',
              }}
            >
              <MapPin size={10} className="shrink-0" />
              <span>{event.location}</span>
            </a>
          )}
        </div>
      </div>
      <span
        className="text-sm font-medium whitespace-nowrap shrink-0"
        style={{
          color: colors.onContainer,
          textDecoration: event.cancelled ? 'line-through' : 'none',
        }}
      >
        {event.endTime && event.endTime !== event.startTime
          ? `${event.startTime} – ${event.endTime}`
          : event.startTime}
      </span>
    </div>
  );
};
