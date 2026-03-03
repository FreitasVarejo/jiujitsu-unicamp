import { MapPin, User } from 'lucide-react';
import { CALENDAR_TYPE_INFO } from '@/constants';
import { parseEventTitle, getDisplayLocation, buildMapsUrl, isPastEventFromDateTime } from './agenda-helpers';

/* ── Tipos ── */

interface CalendarEventProps {
  id: string | number;
  title?: string;
  location?: string;
  description?: string;
  calendarId?: string;
  start?: string;
  startRaw?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

interface TimeGridEventProps {
  calendarEvent: CalendarEventProps;
}

/**
 * Componente customizado para eventos no time grid do Schedule-X.
 * Aplica as cores do calendário manualmente (Schedule-X remove os estilos
 * inline do wrapper quando um componente customizado é fornecido).
 * Exibe nome do instrutor (ou tipo do treino como fallback) e localização
 * como link clicável para o Google Maps. O tipo do treino é comunicado
 * pela cor do card — uma legenda externa mapeia cores a tipos.
 *
 * Deve ser definido no escopo do módulo (fora de componentes React)
 * conforme exigido pelo Schedule-X.
 */
export const TimeGridEvent = ({ calendarEvent }: TimeGridEventProps) => {
  const isPast = isPastEventFromDateTime(calendarEvent.startRaw);
  const colors = isPast
    ? (CALENDAR_TYPE_INFO[calendarEvent.calendarId as keyof typeof CALENDAR_TYPE_INFO] ?? CALENDAR_TYPE_INFO.fallback).darkColorsRgbaPast
    : (CALENDAR_TYPE_INFO[calendarEvent.calendarId as keyof typeof CALENDAR_TYPE_INFO] ?? CALENDAR_TYPE_INFO.fallback).darkColorsRgba;
  const { type, instructor } = parseEventTitle(calendarEvent.title ?? 'Sem título');

  return (
    <div
      className="flex flex-col gap-px p-1 h-full overflow-hidden text-xs leading-tight rounded"
      style={{
        backgroundColor: colors.container,
        borderLeft: `3px solid ${colors.main}`,
        color: colors.onContainer,
      }}
    >
      <span className="inline-flex items-center gap-0.5 font-semibold truncate">
        {instructor ? (
          <>
            <User size={10} className="shrink-0" />
            <span className="truncate">{instructor}</span>
          </>
        ) : (
          <span className="font-bold uppercase truncate">{type}</span>
        )}
      </span>

      {calendarEvent.location && (
        <a
          href={buildMapsUrl(calendarEvent.location)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-0.5 opacity-80 hover:opacity-100 underline underline-offset-2 transition-opacity"
          onClick={(e) => e.stopPropagation()}
          title={calendarEvent.location}
          style={{ color: colors.onContainer }}
        >
          <MapPin size={10} className="shrink-0" />
          <span className="truncate">{getDisplayLocation(calendarEvent.location)}</span>
        </a>
      )}
    </div>
  );
};
