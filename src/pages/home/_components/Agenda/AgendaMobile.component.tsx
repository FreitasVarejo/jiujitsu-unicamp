import { useEffect, useRef } from 'react';
import { Loader2, AlertCircle, MapPin, User, ChevronLeft, ChevronRight } from 'lucide-react';
import { AgendaEvent, EventsByDay } from './agenda.hook';
import { CALENDAR_TYPE_INFO } from '@/constants';
import { buildMapsUrl, isPastEventFromDateTime } from './agenda-helpers';

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

/**
 * Formata um Date como "YYYY-MM-DD".
 */
const fmtDate = (d: Date): string =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

/* ── Sub-componentes ── */

const CANCELLED_COLORS = {
  container: 'rgba(30, 30, 30, 0.7)',
  main: 'rgba(100, 100, 100, 0.6)',
  onContainer: 'rgba(160, 160, 160, 0.7)',
};

const EventCard = ({ event }: { event: AgendaEvent }) => {
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
          className="text-sm font-semibold"
          style={{
            color: colors.onContainer,
            textDecoration: event.cancelled ? 'line-through' : 'none',
          }}
        >
          {event.type}
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

/* ── Componente principal ── */

interface AgendaMobileProps {
  eventsByDay: EventsByDay;
  loading: boolean;
  error: string | null;
  weekStart: string;
  weekEnd: string;
  today: string;
  onPreviousWeek: () => void;
  onNextWeek: () => void;
}

export const AgendaMobile = ({
  eventsByDay,
  loading,
  error,
  weekStart,
  weekEnd,
  today,
  onPreviousWeek,
  onNextWeek,
}: AgendaMobileProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const todayRef = useRef<HTMLDivElement>(null);

  const weekStartDate = addDays(weekStart, 0);
  const weekEndDate = addDays(weekEnd, 0);
  const rangeLabel = `${fmtDDMM(weekStartDate)} – ${fmtDDMM(weekEndDate)}`;

  /**
   * Auto-scroll para o dia de hoje quando a semana contém today.
   * Posicionamento adaptativo: domingo = topo, seg-sex = 35% do topo, sábado = máximo possível.
   */
  useEffect(() => {
    // Verifica se hoje está na semana sendo exibida
    const isTodayInWeek = today >= weekStart && today <= weekEnd;
    if (!isTodayInWeek || !containerRef.current || !todayRef.current) return;

    // Aguarda DOM estar pronto (50ms de margem de segurança)
    const scrollTimer = setTimeout(() => {
      const container = containerRef.current;
      const todayCard = todayRef.current;

      if (!container || !todayCard) return;

      // Calcula a posição do card dentro do container
      const cardOffsetTop = todayCard.offsetTop;
      const containerHeight = container.clientHeight;
      const maxScroll = container.scrollHeight - containerHeight;

      // Determina dia da semana (0=Dom..6=Sáb)
      const todayDate = new Date(today);
      const dayOfWeek = todayDate.getDay();

      let targetScroll: number;

      if (dayOfWeek === 0) {
        // Domingo (primeiro card): scroll para topo
        targetScroll = 0;
      } else if (dayOfWeek === 6) {
        // Sábado (último card): scroll máximo (mostra sábado no final do viewport)
        targetScroll = maxScroll;
      } else {
        // Segunda-feira a sexta-feira: posiciona card em 35% do topo
        targetScroll = Math.max(0, Math.min(maxScroll, cardOffsetTop - containerHeight * 0.35));
      }

      // Executa scroll suave
      container.scrollTo({ top: targetScroll, behavior: 'smooth' });
    }, 50);

    return () => clearTimeout(scrollTimer);
  }, [today, weekStart, weekEnd]);

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
      <div className="md:hidden flex flex-col">
        {navBar}
        <div className="flex justify-center py-12 flex-1">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="md:hidden flex flex-col">
        {navBar}
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-8 text-center flex-1">
          <AlertCircle className="w-10 h-10 text-red-500 mx-auto mb-3" />
          <h3 className="text-lg font-display text-white mb-1">Ops! Algo deu errado</h3>
          <p className="text-gray-400 text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="md:hidden flex flex-col">
      {navBar}
      <div className="max-h-[70vh] overflow-y-auto" ref={containerRef}>
        <div className="space-y-4">
          {ALL_DAYS.map((dayOffset) => {
            const dayDate = addDays(weekStart, dayOffset);
            const dayOfWeek = dayDate.getDay(); // 0=Dom..6=Sáb
            const events = eventsByDay[dayOfWeek] ?? [];
            const dateLabel = fmtDDMM(dayDate);
            const dayDateStr = fmtDate(dayDate);
            const isToday = dayDateStr === today;

            return (
              <div
                key={dayOffset}
                ref={isToday ? todayRef : null}
                className={`rounded-lg border-2 p-4 ${
                  isToday
                    ? 'border-primary bg-zinc-800'
                    : 'border-zinc-800 bg-zinc-900'
                }`}
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
    </div>
  );
};
