import { GoogleCalendarEvent } from "@/services/calendarService";
import { AgendaEvent } from "@/types/home";
import {
  inferCalendarType,
  parseEventTitle,
  getDisplayLocation,
  isCancelledEvent,
  isNoGiEvent,
} from "./agenda-helpers";
import { extractTime, getDayOfWeek } from "./date-helpers";

/**
 * Converte um evento do Google Calendar para o formato AgendaEvent usado no mobile.
 *
 * @param event - Evento do Google Calendar
 * @returns Evento no formato AgendaEvent
 */
export const convertGoogleEventToAgendaEvent = (
  event: GoogleCalendarEvent
): AgendaEvent => {
  const { type, instructor, eventName } = parseEventTitle(
    event.summary || "Sem título"
  );
  const calendarId = inferCalendarType(event.summary || "");
  const cancelled = isCancelledEvent(event.summary || "");
  const noGi = isNoGiEvent(event.summary || "");

  return {
    id: event.id,
    type,
    instructor,
    eventName,
    startTime: extractTime(event.start.dateTime, event.start.date),
    endTime: extractTime(event.end.dateTime, event.end.date),
    location: event.location ? getDisplayLocation(event.location) : undefined,
    rawLocation: event.location,
    calendarId,
    startDateTime: event.start.dateTime,
    cancelled,
    noGi,
  };
};

/**
 * Converte um evento do Google Calendar para o formato Schedule-X usado no desktop.
 * Usa Temporal API para manipulação de datas/horários.
 *
 * @param event - Evento do Google Calendar
 * @returns Evento no formato Schedule-X
 */
export const convertToScheduleXEvent = (event: GoogleCalendarEvent) => {
  const startRaw = event.start.dateTime ?? event.start.date ?? "";
  const endRaw = event.end.dateTime ?? event.end.date ?? "";
  const calendarId = inferCalendarType(event.summary || "");

  if (event.start.dateTime) {
    return {
      id: event.id,
      title: event.summary || "Sem título",
      start: Temporal.ZonedDateTime.from(
        startRaw.replace(/([+-]\d{2}):(\d{2})$/, "$1:$2[America/Fortaleza]")
      ),
      end: Temporal.ZonedDateTime.from(
        endRaw.replace(/([+-]\d{2}):(\d{2})$/, "$1:$2[America/Fortaleza]")
      ),
      location: event.location,
      description: event.description,
      calendarId,
      startRaw,
    };
  }

  return {
    id: event.id,
    title: event.summary || "Sem título",
    start: Temporal.PlainDate.from(startRaw),
    end: Temporal.PlainDate.from(endRaw),
    location: event.location,
    description: event.description,
    calendarId,
    startRaw,
  };
};

/**
 * Extrai o dia da semana de um evento do Google Calendar.
 *
 * @param event - Evento do Google Calendar
 * @returns Dia da semana (0=Dom..6=Sáb)
 */
export const getEventDayOfWeek = (event: GoogleCalendarEvent): number => {
  return getDayOfWeek(event.start.dateTime, event.start.date);
};
