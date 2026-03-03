import { Loader2, AlertCircle, MapPin, User, ChevronLeft, ChevronRight } from 'lucide-react';
import { AgendaEvent, EventsByDay } from './agenda.hook';
import { CALENDAR_TYPE_INFO, buildMapsUrl } from '@/constants';

/* ── Constantes ── */

const DAY_LABELS: Record<number, string> = {
  0: 'Domingo',
  1: 'Segunda-feira',
  2: 'Terça-feira',
  3: 'Quarta-feira',
  4: 'Quinta-feira',
  5: 'Sexta-feira',
  6: 'Sábado',
};

const ALL_DAYS = [0, 1, 2, 3, 4, 5, 6];

/* ── Helpers ── */

/**
 * Adiciona `days` a uma data YYYY-MM-DD e retorna o Date resultante.
 */
const addDays = (dateStr: string, days: number): Date => {
  const [year, month, day] = dateStr.split('-').map(Number);
  const d = new Date(year, month - 1, day);
  d.setDate(d.getDate() + days);
  return d;
};

/**
 * Formata um Date como "DD/MM".
 */
const fmtDDMM = (d: Date): string =>
  `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}`;

/* ── Sub-componentes ── */

const EventCard = ({ event }: { event: AgendaEvent }) => {
  const colors = (CALENDAR_TYPE_INFO[event.calendarId as keyof typeof CALENDAR_TYPE_INFO] ?? CALENDAR_TYPE_INFO.fallback).darkColorsRgba;

  return (
    <div
      className="flex items-start justify-between gap-3 rounded-md p-3"
      style={{ backgroundColor: colors.container, borderLeft: `3px solid ${colors.main}` }}
    >
      <div className="flex flex-col gap-0.5 min-w-0">
        <span className="text-sm font-semibold" style={{ color: colors.onContainer }}>
          {event.type}
        </span>
        <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs" style={{ color: colors.onContainer }}>
          {event.instructor && (
            <span className="inline-flex items-center gap-0.5 opacity-80">
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
              style={{ color: colors.onContainer }}
            >
              <MapPin size={10} className="shrink-0" />
              <span>{event.location}</span>
            </a>
          )}
        </div>
      </div>
      <span
        className="text-sm font-medium whitespace-nowrap shrink-0"
        style={{ color: colors.onContainer }}
      >
        {event.endTime && event.endTime !== event.startTime
          ? `${event.startTime} – ${event.endTime}`
          : event.startTime}
      </span>
    </div>
  );
};

/* ── Componente principal ── */

interface AgendaMobileProps {
  eventsByDay: EventsByDay;
  loading: boolean;
  error: string | null;
  weekStart: string;
  weekEnd: string;
  onPreviousWeek: () => void;
  onNextWeek: () => void;
}

export const AgendaMobile = ({
  eventsByDay,
  loading,
  error,
  weekStart,
  weekEnd,
  onPreviousWeek,
  onNextWeek,
}: AgendaMobileProps) => {
  const weekStartDate = addDays(weekStart, 0);
  const weekEndDate = addDays(weekEnd, 0);
  const rangeLabel = `${fmtDDMM(weekStartDate)} – ${fmtDDMM(weekEndDate)}`;

  const navBar = (
    <div className="flex items-center justify-between mb-4">
      <button
        onClick={onPreviousWeek}
        aria-label="Semana anterior"
        className="p-2 rounded-md text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
      >
        <ChevronLeft size={20} />
      </button>
      <span className="text-sm font-display uppercase tracking-widest text-zinc-300">
        {rangeLabel}
      </span>
      <button
        onClick={onNextWeek}
        aria-label="Próxima semana"
        className="p-2 rounded-md text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );

  if (loading) {
    return (
      <div className="md:hidden">
        {navBar}
        <div className="flex justify-center py-12">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="md:hidden">
        {navBar}
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-8 text-center">
          <AlertCircle className="w-10 h-10 text-red-500 mx-auto mb-3" />
          <h3 className="text-lg font-display text-white mb-1">Ops! Algo deu errado</h3>
          <p className="text-gray-400 text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="md:hidden">
      {navBar}
      <div className="space-y-4">
        {ALL_DAYS.map((dayOffset) => {
          const dayDate = addDays(weekStart, dayOffset);
          const dayOfWeek = dayDate.getDay(); // 0=Dom..6=Sáb
          const events = eventsByDay[dayOfWeek] ?? [];
          const dateLabel = fmtDDMM(dayDate);

          return (
            <div
              key={dayOffset}
              className="rounded-lg border border-zinc-800 bg-zinc-900 p-4"
            >
              <h3 className="font-display text-lg text-white mb-3 flex items-baseline gap-2">
                {DAY_LABELS[dayOfWeek]}
                <span className="text-sm font-sans normal-case text-zinc-500 tracking-normal">
                  {dateLabel}
                </span>
              </h3>

              {events.length > 0 ? (
                <div className="space-y-2">
                  {events.map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500">Sem treino neste dia.</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
