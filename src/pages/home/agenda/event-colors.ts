import { AgendaEvent } from "@/types/home";
import { CALENDAR_TYPE_INFO } from "@/constants/home";
import { isPastEventFromDateTime } from "./agenda-helpers";

/**
 * Esquema de cores para um evento.
 */
export interface EventColorScheme {
  container: string;
  main: string;
  onContainer: string;
}

/**
 * Cores para eventos cancelados (cinza neutro).
 */
const CANCELLED_COLORS: EventColorScheme = {
  container: "rgba(30, 30, 30, 0.7)",
  main: "rgba(100, 100, 100, 0.6)",
  onContainer: "rgba(160, 160, 160, 0.7)",
};

/**
 * Retorna o esquema de cores apropriado para um evento.
 * Considera se o evento foi cancelado, se já passou, e seu tipo (calendarId).
 *
 * Prioridade:
 * 1. Cancelado → cores cinza neutras
 * 2. Passado → cores darkColorsRgbaPast do tipo
 * 3. Normal → cores darkColorsRgba do tipo
 *
 * @param event - Evento da agenda
 * @returns Esquema de cores (container, main, onContainer)
 */
export const getEventColors = (event: AgendaEvent): EventColorScheme => {
  if (event.cancelled) {
    return CANCELLED_COLORS;
  }

  const isPast = isPastEventFromDateTime(event.startDateTime);
  const typeInfo =
    CALENDAR_TYPE_INFO[event.calendarId as keyof typeof CALENDAR_TYPE_INFO] ??
    CALENDAR_TYPE_INFO.fallback;

  return isPast ? typeInfo.darkColorsRgbaPast : typeInfo.darkColorsRgba;
};

/**
 * Retorna o esquema de cores para um evento Schedule-X (desktop).
 * Similar a getEventColors mas recebe parâmetros individuais ao invés de AgendaEvent.
 *
 * @param calendarId - Tipo do calendário
 * @param cancelled - Se o evento foi cancelado
 * @param startDateTime - Data/hora de início (opcional)
 * @returns Esquema de cores
 */
export const getScheduleXEventColors = (
  calendarId: string,
  cancelled: boolean,
  startDateTime?: string
): EventColorScheme => {
  if (cancelled) {
    return CANCELLED_COLORS;
  }

  const isPast = isPastEventFromDateTime(startDateTime);
  const typeInfo =
    CALENDAR_TYPE_INFO[calendarId as keyof typeof CALENDAR_TYPE_INFO] ??
    CALENDAR_TYPE_INFO.fallback;

  return isPast ? typeInfo.darkColorsRgbaPast : typeInfo.darkColorsRgba;
};
