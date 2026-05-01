import { MapPin, User } from "lucide-react";
import { CALENDAR_TYPE_INFO } from "@/constants/home";
import {
  parseEventTitle,
  getDisplayLocation,
  buildMapsUrl,
  isPastEventFromDateTime,
  isCancelledEvent,
  isNoGiEvent,
} from "../agenda-helpers";

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

const CANCELLED_COLORS = {
  container: "rgba(30, 30, 30, 0.7)",
  main: "rgba(100, 100, 100, 0.6)",
  onContainer: "rgba(160, 160, 160, 0.7)",
};

export const TimeGridEvent = ({ calendarEvent }: TimeGridEventProps) => {
  const cancelled = isCancelledEvent(calendarEvent.title ?? "");
  const noGi = isNoGiEvent(calendarEvent.title ?? "");
  const isPast = isPastEventFromDateTime(calendarEvent.startRaw);
  const colors = cancelled
    ? CANCELLED_COLORS
    : isPast
      ? (
          CALENDAR_TYPE_INFO[
            calendarEvent.calendarId as keyof typeof CALENDAR_TYPE_INFO
          ] ?? CALENDAR_TYPE_INFO.fallback
        ).darkColorsRgbaPast
      : (
          CALENDAR_TYPE_INFO[
            calendarEvent.calendarId as keyof typeof CALENDAR_TYPE_INFO
          ] ?? CALENDAR_TYPE_INFO.fallback
        ).darkColorsRgba;
  const { type, instructor, eventName } = parseEventTitle(
    calendarEvent.title ?? "Sem título"
  );

  return (
    <div
      className="flex h-full flex-col gap-px overflow-hidden rounded p-1 text-xs leading-tight"
      style={{
        backgroundColor: colors.container,
        borderLeft: `3px solid ${colors.main}`,
        color: colors.onContainer,
      }}
    >
      {cancelled && (
        <span
          className="inline-block truncate text-xs font-bold tracking-wider"
          style={{ color: "#ef4444" }}
        >
          CANCELADO
        </span>
      )}
      <span
        className="inline-flex items-center gap-1 truncate font-semibold"
        style={{ textDecoration: cancelled ? "line-through" : "none" }}
      >
        {eventName ? (
          <span className="truncate">{eventName}</span>
        ) : instructor ? (
          <>
            <User size={10} className="shrink-0" />
            <span className="truncate">{instructor}</span>
          </>
        ) : (
          <span className="truncate font-bold uppercase">{type}</span>
        )}
      </span>

      {(calendarEvent.location || noGi) && (
        <span className="inline-flex items-center gap-1">
          {calendarEvent.location && (
            <a
              href={buildMapsUrl(calendarEvent.location)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-0.5 underline underline-offset-2 opacity-80 transition-opacity hover:opacity-100"
              onClick={(e) => e.stopPropagation()}
              title={calendarEvent.location}
              style={{
                color: colors.onContainer,
                textDecoration: cancelled ? "line-through" : "underline",
              }}
            >
              <MapPin size={10} className="shrink-0" />
              <span className="truncate">
                {getDisplayLocation(calendarEvent.location)}
              </span>
            </a>
          )}
          {noGi && (
            <span
              className="shrink-0 rounded px-1 py-px text-xs font-medium"
              style={{
                backgroundColor: "rgba(255,255,255,0.08)",
                color: colors.onContainer,
                opacity: 0.85,
              }}
            >
              NoGi
            </span>
          )}
        </span>
      )}
    </div>
  );
};
