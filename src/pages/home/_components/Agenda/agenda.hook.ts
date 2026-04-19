import { useCallback, useEffect, useState } from "react";
import {
  calendarService,
  GoogleCalendarEvent,
} from "@/services/calendarService";
import {
  inferCalendarType,
  parseEventTitle,
  getDisplayLocation,
  isCancelledEvent,
  isNoGiEvent,
} from "./agenda-helpers";

/* ── Tipos ── */

export interface AgendaEvent {
  id: string;
  type: string;
  instructor?: string;
  eventName?: string;
  startTime: string;
  endTime: string;
  location?: string;
  rawLocation?: string;
  calendarId: string;
  startDateTime?: string;
  cancelled: boolean;
  noGi: boolean;
}

export type EventsByDay = Record<number, AgendaEvent[]>;

/* ── Helpers ── */

/**
 * Extrai HH:MM de um datetime ISO.
 * Ex: "2026-03-01T14:00:00-03:00" → "14:00"
 */
const extractTime = (dateTime?: string, date?: string): string => {
  if (dateTime) {
    const match = dateTime.match(/T(\d{2}:\d{2})/);
    return match ? match[1] : "";
  }
  if (date) return "Dia inteiro";
  return "";
};

/**
 * Retorna o dia da semana (0=Dom..6=Sáb) a partir de um datetime ou date ISO.
 */
const getDayOfWeek = (dateTime?: string, date?: string): number => {
  const raw = dateTime ?? date ?? "";
  if (!raw) return 0;

  const dateStr = raw.slice(0, 10);
  const [year, month, day] = dateStr.split("-").map(Number);
  const d = new Date(year, month - 1, day);
  return d.getDay(); // 0=Dom..6=Sáb
};

const convertEvent = (event: GoogleCalendarEvent): AgendaEvent => {
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

/** Formata um Date como YYYY-MM-DD. */
const fmtDate = (d: Date): string =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

/**
 * Retorna a data do domingo da semana que contém `now`.
 * Resultado como YYYY-MM-DD.
 */
const getSundayOf = (now: Date): string => {
  const sunday = new Date(now);
  sunday.setDate(now.getDate() - now.getDay()); // getDay(): 0=Dom
  return fmtDate(sunday);
};

/**
 * Soma `days` a uma data YYYY-MM-DD e retorna YYYY-MM-DD.
 */
const addDays = (dateStr: string, days: number): string => {
  const [year, month, day] = dateStr.split("-").map(Number);
  const d = new Date(year, month - 1, day);
  d.setDate(d.getDate() + days);
  return fmtDate(d);
};

/**
 * Hook que busca os eventos do Google Calendar para uma semana Dom-Sáb navegável.
 *
 * Retorna:
 * - `eventsByDay`       — eventos agrupados por dia (0=Dom..6=Sáb)
 * - `loading` / `error` — estados de carregamento/erro
 * - `weekStart`         — YYYY-MM-DD do domingo da semana exibida
 * - `weekEnd`           — YYYY-MM-DD do sábado da semana exibida
 * - `today`             — YYYY-MM-DD da data de hoje
 * - `goToPreviousWeek`  — navega para a semana anterior
 * - `goToNextWeek`      — navega para a semana seguinte
 */
export const useAgendaEvents = () => {
  const [weekStart, setWeekStart] = useState<string>(() =>
    getSundayOf(new Date())
  );
  const weekEnd = addDays(weekStart, 6);
  const today = fmtDate(new Date());

  const [eventsByDay, setEventsByDay] = useState<EventsByDay>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const events = await calendarService.getEventsByRange(
          weekStart,
          weekEnd
        );

        const grouped: EventsByDay = {};
        for (let i = 0; i <= 6; i++) grouped[i] = [];

        for (const event of events) {
          const day = getDayOfWeek(event.start.dateTime, event.start.date);
          const converted = convertEvent(event);
          grouped[day].push(converted);
        }

        for (const day of Object.keys(grouped)) {
          grouped[Number(day)].sort((a, b) =>
            a.startTime.localeCompare(b.startTime)
          );
        }

        setEventsByDay(grouped);
        setError(null);
      } catch (err) {
        console.error("Erro ao buscar eventos da agenda:", err);
        setError(
          "Não foi possível carregar a agenda. Tente novamente mais tarde."
        );
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [weekStart, weekEnd]); // re-fetch toda vez que a semana mudar

  const goToPreviousWeek = useCallback(() => {
    setWeekStart((prev) => addDays(prev, -7));
  }, []);

  const goToNextWeek = useCallback(() => {
    setWeekStart((prev) => addDays(prev, 7));
  }, []);

  return {
    eventsByDay,
    loading,
    error,
    weekStart,
    weekEnd,
    today,
    goToPreviousWeek,
    goToNextWeek,
  };
};
