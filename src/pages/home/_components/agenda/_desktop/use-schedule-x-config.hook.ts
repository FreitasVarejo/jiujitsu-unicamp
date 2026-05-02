import { useState } from "react";
import { useCalendarApp } from "@schedule-x/react";
import { createViewWeek } from "@schedule-x/calendar";
import { createEventsServicePlugin } from "@schedule-x/events-service";
import { createCalendarControlsPlugin } from "@schedule-x/calendar-controls";
import { createCurrentTimePlugin } from "@schedule-x/current-time";
import { calendarService } from "@/services/calendarService";
import { CALENDAR_TYPE_INFO } from "@/constants/home";
import "temporal-polyfill/global";
import { convertToScheduleXEvent } from "../event-converter";

/**
 * Paleta de cores para cada tipo de treino (tema escuro).
 */
const TRAINING_CALENDARS: Record<
  string,
  {
    colorName: string;
    label: string;
    darkColors: { main: string; container: string; onContainer: string };
  }
> = Object.entries(CALENDAR_TYPE_INFO).reduce(
  (acc, [type, info]) => {
    acc[type] = {
      colorName: type,
      label: info.label,
      darkColors: info.darkColors,
    };
    return acc;
  },
  {} as Record<
    string,
    {
      colorName: string;
      label: string;
      darkColors: { main: string; container: string; onContainer: string };
    }
  >
);

/**
 * Calcula o domingo de referência para exibição:
 * - Dom → hoje
 * - Seg a Sáb → domingo desta semana (volta para o domingo anterior)
 */
const getTargetSunday = (): Temporal.PlainDate => {
  const today = Temporal.Now.plainDateISO();
  const dow = today.dayOfWeek; // 1=Seg … 7=Dom

  if (dow === 7) return today; // Domingo
  return today.subtract({ days: dow }); // Volta para o domingo anterior
};

/**
 * Hook que configura e retorna a instância do Schedule-X calendar para desktop.
 * Encapsula toda a lógica de configuração: plugins, callbacks, views, etc.
 */
export const useScheduleXConfig = (): {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  calendar: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  eventsService: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  calendarControls: any;
} => {
  const [eventsService] = useState(() => createEventsServicePlugin());
  const [calendarControls] = useState(() => createCalendarControlsPlugin());
  const [currentTime] = useState(() =>
    createCurrentTimePlugin({ fullWeekWidth: true })
  );

  const calendar = useCalendarApp({
    views: [createViewWeek()],
    defaultView: "week",
    selectedDate: getTargetSunday(),
    isDark: true,
    locale: "pt-BR",
    timezone: "America/Fortaleza",
    firstDayOfWeek: 7,
    calendars: TRAINING_CALENDARS,
    dayBoundaries: {
      start: "10:00",
      end: "23:00",
    },
    weekOptions: {
      nDays: 7,
      gridHeight: 500,
      eventWidth: 95,
      timeAxisFormatOptions: { hour: "2-digit", minute: "2-digit" },
    },
    plugins: [eventsService, calendarControls, currentTime],
    callbacks: {
      async fetchEvents(range) {
        try {
          const start = String(range.start).slice(0, 10);
          const end = String(range.end).slice(0, 10);
          const events = await calendarService.getEventsByRange(start, end);
          return events.map(convertToScheduleXEvent);
        } catch (err) {
          console.error("Erro ao buscar eventos da agenda:", err);
          return [];
        }
      },
    },
  });

  return {
    calendar,
    eventsService,
    calendarControls,
  };
};
