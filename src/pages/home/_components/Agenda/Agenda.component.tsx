import { useCalendarApp, ScheduleXCalendar } from '@schedule-x/react';
import { createViewWeek } from '@schedule-x/calendar';
import { createEventsServicePlugin } from '@schedule-x/events-service';
import { createCalendarControlsPlugin } from '@schedule-x/calendar-controls';
import { createCurrentTimePlugin } from '@schedule-x/current-time';
import { useState } from 'react';
import { CalendarDays } from 'lucide-react';
import { SectionHeader } from '../shared';
import { TimeGridEvent } from './TimeGridEvent.component';
import { AgendaMobile } from './AgendaMobile.component';
import { useAgendaEvents } from './agenda.hook';
import { calendarService, GoogleCalendarEvent } from '@/services/calendarService';
import { CalendarType, CALENDAR_TYPE_INFO } from '@/constants';
import { inferCalendarType } from './agenda-helpers';
import 'temporal-polyfill/global';
import '@schedule-x/theme-default/dist/index.css';

const CALENDAR_URL =
  'https://calendar.google.com/calendar/embed?src=f481afb9999dfafe1079be33ac43d3ab2695409949b092b3d894ea42cc903f5c%40group.calendar.google.com&ctz=America%2FFortaleza';

/** Paleta de cores para cada tipo de treino (tema escuro). */
const TRAINING_CALENDARS: Record<string, {
  colorName: string;
  label: string;
  darkColors: { main: string; container: string; onContainer: string };
}> = Object.entries(CALENDAR_TYPE_INFO).reduce(
  (acc, [type, info]) => {
    acc[type] = {
      colorName: type,
      label: info.label,
      darkColors: info.darkColors,
    };
    return acc;
  },
  {} as Record<string, {
    colorName: string;
    label: string;
    darkColors: { main: string; container: string; onContainer: string };
  }>
);

/** Itens da legenda de cores (exclui fallback). */
const LEGEND_ITEMS = Object.entries(CALENDAR_TYPE_INFO)
  .filter(([type]) => type !== CalendarType.FALLBACK)
  .map(([_type, info]) => ({
    label: info.label,
    color: info.darkColors.main,
  }));
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
 * Converte um evento do Google Calendar para o formato Schedule-X,
 * incluindo calendarId derivado do tipo de treino.
 */
const toScheduleXEvent = (event: GoogleCalendarEvent) => {
  const startRaw = event.start.dateTime ?? event.start.date ?? '';
  const endRaw = event.end.dateTime ?? event.end.date ?? '';
  const calendarId = inferCalendarType(event.summary || '');

  if (event.start.dateTime) {
    return {
      id: event.id,
      title: event.summary || 'Sem título',
      start: Temporal.ZonedDateTime.from(startRaw.replace(/([+-]\d{2}):(\d{2})$/, '$1:$2[America/Fortaleza]')),
      end: Temporal.ZonedDateTime.from(endRaw.replace(/([+-]\d{2}):(\d{2})$/, '$1:$2[America/Fortaleza]')),
      location: event.location,
      description: event.description,
      calendarId,
      startRaw,
    };
  }

  return {
    id: event.id,
    title: event.summary || 'Sem título',
    start: Temporal.PlainDate.from(startRaw),
    end: Temporal.PlainDate.from(endRaw),
    location: event.location,
    description: event.description,
    calendarId,
    startRaw,
  };
};

export const Agenda = () => {
  const [eventsService] = useState(() => createEventsServicePlugin());
  const [calendarControls] = useState(() => createCalendarControlsPlugin());
  const [currentTime] = useState(() => createCurrentTimePlugin({ fullWeekWidth: true }));

  /* Hook para o layout mobile (cards) */
  const { eventsByDay, loading, error, weekStart, weekEnd, goToPreviousWeek, goToNextWeek } = useAgendaEvents();

  const calendar = useCalendarApp({
    views: [createViewWeek()],
    defaultView: 'week',
    selectedDate: getTargetSunday(),
    isDark: true,
    locale: 'pt-BR',
    timezone: 'America/Fortaleza',
    firstDayOfWeek: 7,
    calendars: TRAINING_CALENDARS,
    dayBoundaries: {
      start: '10:00',
      end: '23:00',
    },
    weekOptions: {
      nDays: 7,
      gridHeight: 500,
      eventWidth: 95,
      timeAxisFormatOptions: { hour: '2-digit', minute: '2-digit' },
    },
    plugins: [eventsService, calendarControls, currentTime],
    callbacks: {
      async fetchEvents(range) {
        try {
          const start = String(range.start).slice(0, 10);
          const end = String(range.end).slice(0, 10);
          const events = await calendarService.getEventsByRange(start, end);
          return events.map(toScheduleXEvent);
        } catch (err) {
          console.error('Erro ao buscar eventos da agenda:', err);
          return [];
        }
      },
    },
  });

  return (
    <section className="container">
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <SectionHeader title="Agenda" icon={CalendarDays} />
        <a
          href={CALENDAR_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-display uppercase tracking-widest text-primary hover:text-orange-400 transition-colors"
        >
          Ver agenda completa →
       </a>
       </div>

       {/* Mobile: cards por dia da semana */}
       <AgendaMobile
         eventsByDay={eventsByDay}
         loading={loading}
         error={error}
         weekStart={weekStart}
         weekEnd={weekEnd}
         onPreviousWeek={goToPreviousWeek}
         onNextWeek={goToNextWeek}
       />

       {/* Desktop: Schedule-X week view */}
       <div className="hidden md:block sx-react-calendar-wrapper">
         <ScheduleXCalendar
           calendarApp={calendar}
           customComponents={{ timeGridEvent: TimeGridEvent }}
         />
       </div>

       {/* Legenda de cores */}
       <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 p-4 bg-zinc-900 rounded-lg border border-zinc-800">
         {LEGEND_ITEMS.map((item) => (
           <div key={item.label} className="flex items-center gap-2">
             <span
               className="inline-block w-3 h-3 rounded shrink-0"
               style={{ backgroundColor: item.color }}
             />
             <span className="text-xs text-zinc-300 font-medium">{item.label}</span>
           </div>
         ))}
       </div>
     </section>
   );
};
